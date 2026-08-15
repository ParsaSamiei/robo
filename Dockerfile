# Docs/27_DEPLOYMENT.md §18-22: Docker is the recommended deployment method.
# Multi-stage build -> minimal runtime image using Next's "standalone" output.

FROM node:20-slim AS deps
WORKDIR /app
# openssl is required by Prisma's query engine on Debian-slim bases.
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund

FROM node:20-slim AS builder
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# §22: "Build Validation" -- prisma generate must run before `next build`
# since server components/actions import the generated client at build time.
RUN npx prisma generate
RUN npm run build

FROM node:20-slim AS runner
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# "standalone" output doesn't include public/ or .next/static automatically.
# We also keep the full node_modules (not just the traced standalone
# subset) so the Prisma CLI itself -- not just the generated client -- is
# available in this image for `prisma migrate deploy` at container start.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

RUN mkdir -p /app/public/uploads && chown -R nextjs:nodejs /app/public/uploads

COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

USER nextjs
EXPOSE 3000
ENV PORT=3000

ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["node", "server.js"]

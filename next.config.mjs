/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Docs/27_DEPLOYMENT.md §18-19: Docker is the recommended deployment
  // method -- "standalone" produces a minimal self-contained server bundle
  // (no full node_modules needed in the final image). Harmless for local
  // dev / Vercel, which ignore it.
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  // Docs/22_SECURITY.md #7-8: TLS/HSTS are explicitly deployment-layer
  // concerns ("TLS configuration should be managed at the reverse proxy/
  // server layer" / "do not enable [HSTS] before confirming HTTPS ...
  // supports HTTPS") -- so HSTS is intentionally NOT set here; add it in
  // the Nginx config once HTTPS is verified in production (see
  // Docs/27_DEPLOYMENT.md). The headers below are safe in every environment.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;

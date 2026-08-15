# IUST Robotics — Web Platform (scaffold)

This is a working Next.js 16 (App Router) + TypeScript + Tailwind + Prisma/PostgreSQL
scaffold built from the specification in `Docs/` (29 files, ~54k lines) — specifically
`00_PROJECT_OVERVIEW.md`, `05_DATABASE_SCHEMA.md`, `06_ADMIN_PANEL.md`,
`09_TECHNICAL_ARCHITECTURE.md`, `10_INFORMATION_ARCHITECTURE.md`, `11_DESIGN_SYSTEM.md`,
and `27_DEPLOYMENT.md`.

It is **real, runnable source code** — not a mockup — but it is a first implementation
pass over a spec sized for a full engineering team, not a finished product. Read
"What's not implemented yet" below before treating any section as done.

> **Migration note:** this was originally built on Next.js 14.2 / React 18. Next 14
> reached end-of-life in October 2025 and will never receive fixes for newly disclosed
> CVEs (`npm audit` will keep flagging it as critical/vulnerable indefinitely). The app
> has since been migrated to **Next.js 16 / React 19** — every `params` (route pages
> and API route handlers), plus every `cookies()` call, had to become `async`/`await`ed,
> since that's the actual breaking change between 14 and 15+ (not just a version bump).
> `useFormState` was also moved from `react-dom` to `react` and renamed `useActionState`
> in React 19. Next 16 also renamed the `middleware.ts` file convention to `proxy.ts`
> (same API, exported function renamed `middleware` → `proxy`) — this repo's proxy file
> lives at `src/proxy.ts`, not `src/middleware.ts`. If you pull an older copy of this
> repo before that migration, `npm audit fix --force` will *not* fix it cleanly — it'll
> bump the package version without making any of these code changes, and the build will
> fail.

## Stack

- Next.js 16 App Router, TypeScript, Tailwind CSS
- PostgreSQL via Prisma ORM (`prisma/schema.prisma` — every entity from the DB spec)
- Session-based admin auth: bcrypt password hashing + signed JWT cookie (`jose`),
  enforced in `src/proxy.ts` (server-side, not just hidden UI — see the migration note
  above for why this isn't called `middleware.ts`)
- Zod validation on both public form endpoints
- `@react-three/fiber` v9 / `@react-three/drei` v10 (the versions that pair with
  React 19) for the homepage's interactive 3D hero, with a static fallback if WebGL fails
- Jimp (v1, promise-based API) for image processing — no Sharp, per `25_API_AND_SERVER_ARCHITECTURE.md` §17
- Cookie-based EN/FA locale + light/dark theme switching, RTL support for Persian

## Getting started (local development)

```bash
cp .env.example .env.local
# fill in DATABASE_URL / DIRECT_URL (any Postgres 15+ instance) and a random AUTH_SECRET,
# e.g. `openssl rand -base64 32`

npm install
npx prisma migrate dev --name init
npm run db:seed          # creates the first admin login + a few sample records
npm run dev
```

Visit `http://localhost:3000` for the public site, `http://localhost:3000/admin/login`
for the admin panel.

If you don't already have a local Postgres, the fastest path is:
```bash
docker run --name iust-postgres -e POSTGRES_PASSWORD=devpassword \
  -e POSTGRES_DB=iust_robotics -p 5432:5432 -d postgres:16-alpine
# then in .env.local:
# DATABASE_URL=postgresql://postgres:devpassword@localhost:5432/iust_robotics
# DIRECT_URL=postgresql://postgres:devpassword@localhost:5432/iust_robotics
```

Seeded admin login defaults to `admin` / `change-me-now` (override via
`SEED_ADMIN_USERNAME` / `SEED_ADMIN_PASSWORD` env vars before seeding). **Change this
password immediately in a real deployment** — there's no password-change UI yet, so for
now that means updating the `Admin` row directly (`npx prisma studio`) with a new
bcrypt hash, or re-seeding with different env vars against a fresh DB.

> **Note on `jimp`:** this sandbox has no network access, so `npm install` was never
> actually run against `src/lib/media.ts`. The code targets Jimp v1's promise-based API
> (`import { Jimp } from "jimp"`, `Jimp.read()`, `image.resize({ w })`,
> `image.getBuffer("image/jpeg")`). Double-check that surface against whatever `jimp`
> version actually resolves on first install — a few method names shifted between
> Jimp v0.x and v1.x.

> **Note on `@uiw/react-md-editor`, `react-markdown`, `remark-gfm`, `@tailwindcss/typography`:**
> same caveat — no network access, no `npm install` was run against these either.
> Versions in `package.json` are a best guess at what's currently compatible with
> Next.js 14 / React 18, not a confirmed install. Worth a quick smoke test on first run.

---

## Deploying to Vercel

**Read this before choosing Vercel:** the media pipeline (`src/lib/storage.ts`) writes
uploaded files to `public/uploads` on local disk. Vercel's serverless functions have an
ephemeral, effectively read-only filesystem outside `/tmp`, and `/tmp` itself doesn't
persist between invocations or across a redeploy. **Uploads will silently fail or
disappear on Vercel as this scaffold stands.** The `StorageAdapter` interface exists
specifically so you can swap in an S3-compatible adapter (Vercel Blob, Cloudflare R2,
AWS S3) instead — only `LocalStorageAdapter` is implemented so far. If you need working
uploads on Vercel, write that adapter first (implement `write`/`delete`/`urlFor` against
your chosen provider's SDK, swap the `storage` export in `src/lib/storage.ts`) before
going further. Everything else in the app works fine on Vercel as-is.

1. **Database.** Vercel doesn't host Postgres itself — provision one separately (Neon,
   Supabase, or Vercel's own Postgres/Neon integration all work) and grab its
   connection string.
2. **Push to a Git repo** (GitHub/GitLab/Bitbucket) and import it in the Vercel
   dashboard as a new project. Vercel auto-detects Next.js; no build command changes
   needed (`output: "standalone"` in `next.config.mjs` is harmless here — Vercel uses
   its own bundling and ignores it).
3. **Environment variables** — in the Vercel project's Settings → Environment
   Variables, set:
   - `DATABASE_URL`, `DIRECT_URL` — your Postgres connection string (`DIRECT_URL` should
     be the same value unless your provider gives you a separate non-pooled connection
     string, e.g. Neon's `_unpooled` variant — Prisma migrations need a direct
     connection)
   - `AUTH_SECRET` — `openssl rand -base64 32`
   - `NEXT_PUBLIC_SITE_URL` — your Vercel URL (or custom domain), e.g.
     `https://your-project.vercel.app`
4. **Run migrations once** before or right after the first deploy, from your machine,
   pointed at the production `DATABASE_URL`:
   ```bash
   DATABASE_URL="<production connection string>" npx prisma migrate deploy
   DATABASE_URL="<production connection string>" npm run db:seed
   ```
5. **Deploy.** Vercel builds and deploys automatically on push. Visit
   `/admin/login` with the seeded credentials and change the password immediately
   (see the note above — no in-app UI for this yet).

---

## Deploying to a VPS

This follows `Docs/27_DEPLOYMENT.md` §16-19's recommended architecture (Nginx →
Next.js, Docker Compose for reproducibility) using the `Dockerfile`,
`docker-compose.yml`, and `deploy/nginx.conf` included in this repo.

1. **Provision the server** — any VPS with Docker installed (Ubuntu 22.04+
   recommended). Point your domain's DNS A record at its IP.
2. **Clone the repo** into the directory `Docs/27` itself uses as an example:
   ```bash
   sudo mkdir -p /opt/robotics-club && cd /opt/robotics-club
   git clone <your-repo-url> .
   ```
3. **Configure environment.** `docker-compose.yml` reads its variables from a `.env`
   file in this same directory (Compose's own convention — separate from the app's
   `.env.local`, which isn't used inside the container):
   ```bash
   cp .env.docker.example .env
   # edit .env: set POSTGRES_PASSWORD, AUTH_SECRET (openssl rand -base64 32),
   # and NEXT_PUBLIC_SITE_URL to your real domain (https://...)
   mkdir -p data/uploads
   ```
4. **Build and start the stack:**
   ```bash
   docker compose up -d --build
   ```
   This builds the app image, starts Postgres, waits for it to be healthy, then runs
   `prisma migrate deploy` automatically (`docker-entrypoint.sh`) before starting the
   Next.js server on `127.0.0.1:3000` (not exposed publicly — Nginx fronts it).
5. **Seed the first admin account** (one-off, against the running container):
   ```bash
   docker compose exec app npx tsx prisma/seed.ts
   ```
6. **Install and configure Nginx** on the host:
   ```bash
   sudo apt update && sudo apt install -y nginx
   sudo cp deploy/nginx.conf /etc/nginx/sites-available/iust-robotics.conf
   # edit that file: replace example.com with your real domain
   sudo ln -s /etc/nginx/sites-available/iust-robotics.conf /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   ```
7. **Get HTTPS** (per `Docs/27` §14-15, TLS termination lives at Nginx):
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d example.com -d www.example.com
   ```
   Certbot rewrites the Nginx config to add the `listen 443 ssl` block and sets up
   auto-renewal. *Only after confirming HTTPS actually works*, add HSTS at the Nginx
   layer per `22_SECURITY.md` §7-8 (deliberately not set anywhere in the app itself).
8. **Verify:** visit `https://your-domain.com`, then `https://your-domain.com/api/health`
   (should return `{"status":"ok"}`) and `/admin/login`. Change the seeded admin
   password immediately.
9. **Redeploying later:**
   ```bash
   cd /opt/robotics-club && git pull
   docker compose up -d --build
   ```
   The entrypoint re-runs `prisma migrate deploy` on every start, so new migrations
   apply automatically; `data/uploads` and the `postgres_data` volume both persist
   across this.

This covers the app itself. `Docs/27_DEPLOYMENT.md` goes further into topics this
scaffold doesn't set up: automated CI, database backup/retention policy, log rotation,
and monitoring (§25-27, §50-53) — worth reading before running this for a real club,
not just a demo.

---

## What's implemented

**Public site** — every route in `Docs/10_INFORMATION_ARCHITECTURE.md`'s sitemap, all
querying real Prisma data (not fixtures): Home, About, Work hub, Projects (list +
detail), Robots (list + detail), Team hub, Current/Alumni, Member detail, Competitions
(list + detail), Awards, Journal hub, News, Blog (list + detail), Gallery, Sponsors,
Join, Contact.

**Admin panel** — login (rate-limited, generic error on failure), server-enforced auth
on every `/admin/*` and `/api/admin/*` route *and* independently inside every mutating
server action (`Docs/22_SECURITY.md` §23-25), dashboard with live counts + actionable
items, and **full create/edit/delete forms for Members, Projects, Robots, Competitions
(with inline Results/Awards management), Departments, Technologies, Blog, News,
Sponsors, Sponsor Tiers, Partners, and Social Links**, plus a key/value Settings screen
and status-management inboxes for Join Applications and Contact Messages. All forms use
auto-suggested slugs (§49), human-readable duplicate-slug errors instead of raw Prisma
codes (§48), unsaved-changes browser warnings (§44) on the larger forms, delete
confirmation dialogs (§45), and toast feedback via react-toastify (§46).

**SEO** (`19_SEO.md`) — per-page canonical URLs, Open Graph/Twitter metadata, title
format (`[Page] | IUST Robotics`), `metadataBase` driven by `NEXT_PUBLIC_SITE_URL`
rather than hardcoded, dynamic `sitemap.xml` covering every published entity,
`robots.txt` disallowing `/admin` and `/api`, and `noindex` on the entire admin section.

**Performance** (`20_PERFORMANCE.md` §10-12) — the 3D hero is dynamically imported
(`next/dynamic`, `ssr:false`) with a lightweight loading placeholder, so it never blocks
the H1/CTA/nav from rendering or bloats the initial JS bundle.

**Accessibility** (`21_ACCESSIBILITY.md` §17) — a "Skip to main content" link, visible
on focus, targeting a `<main id="main-content">` landmark.

**Security** (`22_SECURITY.md` §7-8) — safe response headers (`X-Content-Type-Options`,
`X-Frame-Options`, `Referrer-Policy`) set in `next.config.mjs`. HSTS is intentionally
**not** set in the app — the doc explicitly calls TLS/HSTS a reverse-proxy-layer concern
that shouldn't be enabled before HTTPS is verified in production; add it to the Nginx
config per `27_DEPLOYMENT.md` once that's confirmed.

**3D/Interactions** (`17_3D_AND_INTERACTIONS.md` §16-17) — a `Reveal` component
(opacity + translateY on scroll into view, respecting `prefers-reduced-motion`) applied
as the reference pattern to the homepage's featured-work and journal card grids, with
staggered entrance delays.

**Design system** — dark/light theme, full color/spacing/radius token set from
`11_DESIGN_SYSTEM.md`, EN (Inter) / FA (Vazirmatn) typography split, RTL layout.

**Mobile navigation** (`23_RESPONSIVE_DESIGN.md` §23-25, §31) — below the `md`
breakpoint the header collapses to logo + menu button (a dedicated mobile interaction
model, not a shrunken desktop nav) opening a full-screen panel with every nav link, the
Join CTA, theme/language toggles, and social links; 44×44px touch targets, Escape to
close, focus trap, and body scroll lock while open.

**Media pipeline** (`25_API_AND_SERVER_ARCHITECTURE.md` §14-29) — a working upload
endpoint (`POST /api/admin/media`): validates MIME type, per-purpose file size limits
(§19 — member photos vs. gallery images get different limits), and actual file
contents (a renamed non-image fails the Jimp decode and is rejected, §18). Processes
with **Jimp only, never Sharp** (§17) into thumbnail/medium/large variants generated
once at upload time (§21-22), stored under `public/uploads/<namespace>/<year>/<uuid>.jpg`
— safe, server-generated keys, never the original filename (§26-27) — behind a
`StorageAdapter` interface (§23) so local disk can be swapped for S3-compatible storage
later without touching calling code. Two reusable admin components sit on top of it —
`MediaPicker` (single image) and `MultiMediaPicker` (ordered gallery) — now wired into
every form that has an image field:
- **Member** — photo (`MediaPicker`)
- **Project** — cover/OG image (`MediaPicker`) + image gallery (`MultiMediaPicker`)
- **Robot** — image gallery (`MultiMediaPicker`)
- **Competition** — image gallery (`MultiMediaPicker`)
- **Sponsor, Partner** — logo (`MediaPicker`, via `SimpleEntityForm`'s new `"media"`
  field type)
- **Blog, News** — cover image (`MediaPicker`, via `SimpleEntityForm`)

All of these now render on the public site too — member photos, project/robot/
competition galleries, blog/news cover images, and sponsor/partner logos are real
images, not placeholder blocks.

**Join page** — no résumé upload; instead the page shows the club's phone number
(sourced from `SiteSetting` key `contact_phone`, editable at `/admin/settings`) so
applicants can call directly or arrange to share a resume another way. The line only
renders once that setting has a value.

**Gallery & Timeline** (`18_MEDIA_AND_GALLERY.md` §7-10) — full admin CRUD for both.
Gallery albums (title/slug/description/cover/order/published, per §8) hold an ordered
set of photos added directly through `MultiMediaPicker` — each becomes its own
`GalleryItem` row, reusing the same `Media` a photo already points to elsewhere rather
than duplicating files (§10). The public `/gallery` page and its lightbox now render
real thumbnails and full-size images instead of empty colored boxes. Timeline events
(title/description/date/image/order/published) get the same CRUD treatment via
`SimpleEntityForm`, and published events now render as a chronological history section
on the About page (`10_INFORMATION_ARCHITECTURE.md` §35: "once the club has several
years of activity, the competition timeline can become a dedicated history page" — kept
as a section for now rather than pre-building a route with no content to justify it).

**Rich text content** (`06_ADMIN_PANEL.md` §26-27, `12_CONTENT_SYSTEM.md` §59-60) —
`contentEn`/`contentFa` across Project, Robot, Competition, Blog, and News are now
Markdown, edited via `RichTextEditor` (wraps `@uiw/react-md-editor` — the doc is
explicit that a custom editor shouldn't be hand-built, and that Markdown is "a
reasonable starting point" rather than storing arbitrary HTML) and rendered publicly
via `MarkdownContent` (`react-markdown` + `remark-gfm`, headings/lists/links/tables/code
blocks all via standard Markdown syntax, and safe by default since raw HTML isn't
rendered). Persian fields get `dir="rtl"` on both the editor and the rendered output.
Fixed a real bug in the process: the Competition detail page never rendered
`contentEn` at all — it does now.

**Scroll-reveal, site-wide** — the `Reveal` component from the homepage is now applied
consistently across every card grid and list: Projects, Robots, Competitions, Awards,
Blog, News, Sponsors, Gallery albums, the About page's mission pillars and timeline, and
the shared `MemberGrid` (covering both Team/Current and Team/Alumni). Staggered entrance
delays throughout, capped so long lists don't get an increasingly long wait near the
bottom.

## What's not implemented yet

This scaffold still stops short of the full spec in a few places rather than
half-building them:

- **No résumé upload on the Join form, by design.** The pipeline only handles images,
  and rather than bolt on a parallel document-upload path, applicants who want to share
  a resume (or just talk it through) are given the club's phone number directly on the
  page instead — see "Join page" above.
- **Robots↔Competitions relation editor** — Robot and Competition each have their own
  create/edit form, but the join between them isn't editable from either side yet
  (visible read-only from the competition's own robots/projects lists).
- **Repository/service layer** (`24_COMPONENT_ARCHITECTURE.md` §20-22, `25_API_AND_SERVER_ARCHITECTURE.md`
  §7-8) — pages and server actions call `prisma` directly rather than through a
  data-access layer. Works fine at this scale; would need refactoring before the codebase
  grows much further.
- **CSRF protection and session-fixation rotation on privilege change**
  (`22_SECURITY.md` §16-20) beyond what same-site cookies + a fresh JWT-per-login
  already provide.
- **Deeper accessibility work** (`21_ACCESSIBILITY.md`) — ARIA landmarks beyond
  `<main>`, full heading-hierarchy audit, RTL directional isolation (§9-11). (The
  mobile menu itself already has a focus trap — see "Mobile navigation" above.)
- **Structured data (JSON-LD)** and hreflang alternates (`19_SEO.md` §12-13, later
  sections not yet read in full).
- **Search/filter/pagination** on admin list pages (`06_ADMIN_PANEL.md` §13-15).
- A real 3D robot model — `RobotViewer` renders a simple placeholder mesh built from
  primitives; swapping in an actual rigged/textured model is an asset task, not code.
- **Actual Persian content and translation-status indicators** (`16_INTERNATIONALIZATION.md`
  §18-21) — the FA fields and RTL layout work, but there's no real Persian copy yet.
- **Inline images in Markdown content** — the editor supports `![]()` syntax, but there's
  no toolbar button to open `MediaPicker` and insert an already-uploaded image inline;
  authors currently have to know/paste the URL manually.

## Project structure

```
prisma/schema.prisma       Full data model
prisma/seed.ts             Initial admin + sample content
src/lib/                   prisma client, auth, i18n, validation, server actions
src/proxy.ts               Server-side auth gate for /admin and /api/admin (Next 16's
                            rename of middleware.ts — see migration note near the top)
src/components/            Public UI components
src/components/admin/      Admin shell, table, status controls
src/app/                   Route tree (App Router) — mirrors Docs/10's sitemap
src/app/admin/             Admin panel
src/app/api/                Contact/Join/admin-auth API routes
src/app/api/health/        Health check endpoint (Docs/27 §48-49)
Dockerfile                 Multi-stage production build (Docs/27 §18-22)
docker-compose.yml         App + Postgres stack for VPS deployment
docker-entrypoint.sh       Runs `prisma migrate deploy` before starting the server
deploy/nginx.conf          Sample reverse-proxy config (Docs/27 §14-16)
.env.docker.example        Env vars for docker-compose (separate from .env.local)
```

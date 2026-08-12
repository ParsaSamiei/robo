# `19_DEPLOYMENT.md`

# Deployment & Infrastructure Specification

## 1. Purpose

This document defines the production deployment architecture for the robotics club website.

The deployment must prioritize:

- Reliability
- Security
- Easy maintenance
- Low operational complexity
- Good performance
- Easy content management
- Compatibility with the existing server environment
- Straightforward future scaling

The website is expected to be a **Next.js application with PostgreSQL**, with an admin panel for managing team content and media.

---

# 2. Production Architecture

The recommended architecture is:

```text
                         ┌──────────────────┐
                         │      Users       │
                         │ Desktop / Mobile │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │      DNS         │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │ Reverse Proxy    │
                         │     Nginx        │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │   Next.js App    │
                         │   Node Runtime   │
                         └────────┬─────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    ▼                           ▼
             ┌──────────────┐            ┌──────────────┐
             │ PostgreSQL   │            │ Media / Files│
             │   Database   │            │   Storage    │
             └──────────────┘            └──────────────┘
```

---

# 3. Recommended Production Environment

The application should run on a Linux VPS.

Recommended minimum:

```text
CPU:     2 vCPU
RAM:     2–4 GB
Storage: 40+ GB SSD
OS:      Ubuntu LTS
```

For the initial club website, this is sufficient.

The infrastructure should remain simple enough that one administrator can maintain it.

---

# 4. Operating System

Recommended:

**Ubuntu LTS**

The exact LTS version should be selected according to the hosting provider's currently supported stable release.

Avoid using experimental distributions for production.

---

# 5. Runtime

The application uses:

```text
Node.js
Next.js
PostgreSQL
Nginx
```

The Node.js version should match the version officially supported by the chosen Next.js release.

Do not deploy using an unsupported Node.js version merely because it happens to work locally.

---

# 6. Environment Separation

There should be at least:

```text
Development
Production
```

A staging environment is recommended when the project becomes larger.

---

# 7. Development

Developers should be able to run the complete application locally:

```text
Next.js
PostgreSQL
Admin panel
Media handling
```

without depending on production services.

---

# 8. Production Domain

The final domain is not yet specified.

The application should therefore avoid hardcoding the production domain.

Use environment configuration.

Example:

```env
NEXT_PUBLIC_SITE_URL=https://example.com
```

---

# 9. Environment Variables

Secrets must never be committed to Git.

Use:

```text
.env.local
.env.production
```

or the hosting provider's secret/environment-variable system.

---

# 10. Required Environment Variables

The exact variables depend on the implementation, but the architecture should support values such as:

```env
DATABASE_URL=
NEXT_PUBLIC_SITE_URL=

ADMIN_USERNAME=
ADMIN_PASSWORD_HASH=

MEDIA_STORAGE_PATH=
```

Additional values may be required for:

- Email
- Analytics
- External APIs
- OAuth/social integrations
- Monitoring

---

# 11. Secret Management

Never commit:

```text
.env
.env.local
.env.production
database credentials
admin passwords
API keys
private keys
```

to Git.

The repository must include an example:

```text
.env.example
```

containing variable names but no secrets.

---

# 12. Admin Authentication

The admin panel requires only a username/password system initially.

The production implementation should **not store the administrator password in plaintext**.

Store a secure password hash.

---

# 13. Admin Session Security

Admin authentication should use secure server-side sessions or appropriately protected signed session cookies.

Avoid storing authentication tokens in:

```text
localStorage
```

unless there is a compelling architectural reason.

---

# 14. HTTPS

Production must use HTTPS.

HTTP should redirect to HTTPS.

---

# 15. TLS

TLS certificates should be automatically renewed.

Let's Encrypt is an appropriate option.

The deployment must ensure certificates do not unexpectedly expire.

---

# 16. Nginx

Nginx should act as the public-facing reverse proxy.

Responsibilities:

```text
Internet
   ↓
Nginx
   ↓
Next.js
```

Nginx should handle:

- HTTPS termination
- HTTP → HTTPS redirects
- Domain routing
- Proxying
- Basic request limits where appropriate
- Static asset handling when useful

---

# 17. Next.js Process

The Next.js application should run as a persistent production process.

Recommended options:

```text
systemd
```

or:

```text
Docker
```

The final deployment method should be chosen consistently.

---

# 18. Recommended Deployment Method

For this project, Docker is recommended because it provides:

- Reproducibility.
- Easier server setup.
- Easier PostgreSQL isolation.
- Clear service boundaries.
- Easier migration to another server.

A possible structure:

```text
docker-compose.yml

services:
  app:
    Next.js

  postgres:
    PostgreSQL
```

Nginx may remain on the host or run as another container.

---

# 19. Docker Production Architecture

Recommended:

```text
                    Internet
                       │
                       ▼
                    Nginx
                       │
                       ▼
                 Next.js App
                       │
              ┌────────┴────────┐
              ▼                 ▼
         PostgreSQL         Media Storage
```

---

# 20. Docker Images

Use pinned major/minor versions where practical.

Avoid production builds based on:

```text
node:latest
postgres:latest
```

because `latest` can unexpectedly change.

---

# 21. Next.js Production Build

The production application should use:

```bash
npm ci
npm run build
npm run start
```

rather than:

```bash
npm run dev
```

---

# 22. Build Validation

Before deployment:

```bash
npm run lint
npm run typecheck
npm run build
```

if those scripts exist.

The deployment process should fail if a required build step fails.

---

# 23. Database

PostgreSQL should be the primary relational database.

Database credentials must be supplied through environment variables.

---

# 24. Database Persistence

If PostgreSQL runs in Docker, its data must live in a persistent volume.

Never rely on the container filesystem for database persistence.

---

# 25. PostgreSQL Backup

Production PostgreSQL must be backed up.

At minimum:

```text
Daily database backup
```

Backups should be stored separately from the live database.

---

# 26. Backup Retention

Recommended initial policy:

```text
Daily:    7 copies
Weekly:   4 copies
Monthly:  3 copies
```

This can be adjusted based on actual storage requirements.

---

# 27. Backup Testing

A backup that has never been restored is not considered verified.

Periodically test:

```text
Backup
 ↓
Restore
 ↓
Verify database
```

---

# 28. Media Backup

Database backups alone are insufficient.

Uploaded:

- Images
- Gallery photos
- Sponsor logos
- Team member photos
- Project media

must also be backed up.

---

# 29. Media Storage

The architecture should separate media storage from application code.

Possible initial implementation:

```text
/storage/uploads
```

or a dedicated mounted volume.

---

# 30. Future Object Storage

The media layer should be abstracted enough to later support:

- S3-compatible storage
- Cloud object storage
- CDN-backed storage

without rewriting the entire content system.

---

# 31. Image Processing

The application must use **Jimp**, not Sharp.

This is a hard deployment requirement because Sharp is not compatible with the target server environment.

```text
Image upload
     ↓
Jimp
     ↓
Validation
     ↓
Resize / processing
     ↓
Storage
```

---

# 32. Image Processing Rules

Uploaded images should be:

- Validated.
- Resized where appropriate.
- Converted to efficient formats where supported.
- Given safe filenames.
- Stored outside executable code paths.

---

# 33. Upload Limits

The server should enforce reasonable upload limits.

Different limits may be used for:

```text
Team portraits
Sponsor logos
Gallery images
Article images
```

Do not allow unlimited file uploads.

---

# 34. File Validation

Do not trust the filename extension.

Validate:

- MIME type.
- Actual image format.
- File size.
- Image dimensions.

---

# 35. Dangerous Files

The media system must reject executable files.

For example:

```text
.php
.js
.sh
.exe
```

should never become executable uploads.

---

# 36. Filename Handling

Never directly use user-provided filenames as filesystem paths.

Generate safe identifiers.

Example:

```text
team-member-01.webp
```

or:

```text
c7b7f2c8-....webp
```

---

# 37. Upload Directory Security

Uploaded media must not be executable by the web server.

The server should treat uploaded files as static data.

---

# 38. Deployment Directory

The application should live in a dedicated directory.

Example:

```text
/opt/robotics-club/
```

The exact path may differ.

---

# 39. Git Repository

Production deployments should originate from the Git repository.

Do not manually modify application source files directly on the production server.

---

# 40. Git Branches

Recommended:

```text
main
```

for production.

Additional branches can be used for development and features.

---

# 41. Production Deployment Flow

Recommended:

```text
Developer
   ↓
Feature branch
   ↓
Pull request
   ↓
Review
   ↓
Merge
   ↓
main
   ↓
Build
   ↓
Deploy
   ↓
Health check
```

---

# 42. Automated Deployment

The project should be designed so deployment can eventually be automated with GitHub Actions or another CI/CD system.

Initial manual deployment is acceptable.

---

# 43. CI Checks

CI should eventually verify:

```text
Install dependencies
Lint
TypeScript
Tests
Build
```

before production deployment.

---

# 44. Database Migrations

Database schema changes must use migrations.

Do not casually modify production databases manually.

---

# 45. Migration Flow

Recommended:

```text
Development
   ↓
Create migration
   ↓
Test migration
   ↓
Commit migration
   ↓
Deploy application
   ↓
Run production migration
```

---

# 46. Prisma

If Prisma is used, production database changes should use Prisma migrations rather than relying on:

```bash
prisma db push
```

for production schema evolution.

---

# 47. Production Migration Safety

Before migrations:

```text
Backup database
```

For potentially destructive changes:

```text
Backup
 ↓
Migration
 ↓
Verification
```

---

# 48. Health Check

The application should provide a lightweight health endpoint.

Example:

```text
/api/health
```

It should confirm that the application is running.

It may optionally verify database connectivity.

---

# 49. Health Check Response

Example:

```json
{
  "status": "ok"
}
```

Do not expose sensitive infrastructure information.

---

# 50. Monitoring

At minimum monitor:

- Application availability.
- CPU.
- RAM.
- Disk space.
- Database availability.
- HTTPS certificate status.

---

# 51. Logging

Production logs should capture:

- Application errors.
- Authentication failures.
- Server errors.
- Database errors.
- Upload failures.

Avoid logging sensitive information.

---

# 52. Password Logging

Never log:

```text
Passwords
Session tokens
API keys
Authentication cookies
```

---

# 53. Log Rotation

Logs must not grow indefinitely.

Configure rotation and retention.

---

# 54. Error Handling

Production should not expose stack traces to visitors.

Users should receive a friendly error page.

Developers should receive enough server-side information to debug the issue.

---

# 55. 404 Pages

The website should have a custom 404 experience consistent with the visual identity.

It should provide a useful path back into the site.

---

# 56. 500 Pages

The website should have a custom 500/error experience.

It should remain functional even if parts of the application fail.

---

# 57. CDN

A CDN is not mandatory initially.

The architecture should allow adding one later.

A CDN may eventually serve:

- Images.
- Static assets.
- Fonts.
- Videos.

---

# 58. Caching

Cache content that changes infrequently.

Potential candidates:

```text
Published projects
Published blog posts
Competition pages
Sponsor lists
Team member profiles
```

Admin changes must invalidate or revalidate affected content.

---

# 59. Admin Publishing

Publishing content should trigger appropriate cache invalidation.

Example:

```text
Admin publishes project
       ↓
Database updated
       ↓
Cache revalidated
       ↓
Public website shows project
```

---

# 60. Static vs Dynamic

Use Next.js capabilities appropriately.

Prefer static/generated content where practical.

Use dynamic rendering where necessary:

- Admin.
- Authentication.
- Frequently changing data.
- User-specific functionality.

---

# 61. Server Components

Prefer Next.js Server Components by default.

Use Client Components only when interaction requires them.

This helps maintain performance.

---

# 62. Three.js

The interactive 3D robot must not unnecessarily block initial page rendering.

Load the 3D experience appropriately.

---

# 63. 3D Loading

The page should be usable before the Three.js scene finishes loading.

Provide:

```text
Loading state
Fallback visual
Reduced-motion behavior
```

---

# 64. Mobile 3D

The Three.js robot must work on mobile but should adapt its quality.

Possible reductions:

- Lower model complexity.
- Lower rendering resolution.
- Reduced effects.
- Reduced animation.
- Reduced interaction.

---

# 65. Reduced Motion

If the user prefers reduced motion, disable or significantly reduce:

- Camera animation.
- Robot animation.
- Scroll-based motion.
- Decorative transitions.

---

# 66. Mobile Performance

The site is primarily designed around laptop/desktop usage but must work properly on mobile.

Mobile should not simply receive a shrunken desktop layout.

---

# 67. Responsive Testing

Test at minimum:

```text
320px
375px
390px
430px
768px
1024px
1280px
1440px
1920px
```

---

# 68. Browser Testing

Test current versions of:

- Chrome
- Safari
- Firefox
- Edge

with special attention to Safari because the development environment may include Apple hardware.

---

# 69. Database Security

PostgreSQL should not be exposed directly to the public internet unless absolutely necessary.

Prefer:

```text
Internet
   ↓
Nginx
   ↓
Next.js
   ↓
PostgreSQL
```

---

# 70. PostgreSQL Port

The PostgreSQL port should normally remain inaccessible externally.

Firewall it so only required services can access it.

---

# 71. Server Firewall

Enable a firewall such as UFW.

Allow only required ports, typically:

```text
22    SSH
80    HTTP
443   HTTPS
```

Database ports should remain private.

---

# 72. SSH

SSH should use key-based authentication.

Password-based SSH login should preferably be disabled once key access has been verified.

---

# 73. Root Login

Direct root SSH login should preferably be disabled.

Use a dedicated administrative user with appropriate privileges.

---

# 74. SSH Protection

Consider:

- Fail2ban.
- Rate limiting.
- Key-only authentication.

---

# 75. Dependency Updates

Dependencies should be updated regularly.

However, production updates should not blindly use:

```bash
npm update
```

without testing.

---

# 76. Lockfile

The repository must commit the package manager lockfile.

For npm:

```text
package-lock.json
```

---

# 77. Reproducible Install

Production should use:

```bash
npm ci
```

instead of:

```bash
npm install
```

for deployment.

---

# 78. Node Modules

Do not commit:

```text
node_modules/
```

to Git.

---

# 79. Build Artifacts

Do not commit:

```text
.next/
```

unless there is a specific architectural reason.

---

# 80. Production Secrets

Production secrets should exist only on:

```text
Production server
Secret manager
CI/CD secret store
```

not in source control.

---

# 81. Admin URL

The admin panel may use a dedicated route such as:

```text
/admin
```

or another route defined by the implementation.

Security must come from authentication and authorization, not merely from hiding the URL.

---

# 82. Admin Rate Limiting

Admin login attempts should be rate-limited.

This is especially important because the admin authentication system is intentionally simple.

---

# 83. Session Expiration

Admin sessions should expire after an appropriate period of inactivity.

---

# 84. Logout

The admin panel must provide a clear logout mechanism.

---

# 85. Database Access

Administrators should manage content through the admin panel rather than directly editing PostgreSQL.

Direct database access is for maintenance/development.

---

# 86. Admin Content

The admin should be able to manage at least:

```text
Team members
Projects
Robots
Competitions
Results
Awards
News
Blog
Gallery
Sponsors
Partners
Join applications
Contact information
Social links
Site settings
```

---

# 87. Media Management

Admin media management should support:

```text
Upload
Preview
Metadata
Replace
Delete
Publish/unpublish
```

with appropriate safeguards.

---

# 88. Delete Protection

Destructive operations should require confirmation.

Example:

> Delete this project?

rather than deleting immediately.

---

# 89. Content Drafts

The architecture should support:

```text
Draft
Published
Archived
```

where appropriate.

---

# 90. Publication Scheduling

Not required for the first version.

The architecture may leave room for future:

```text
Publish at
Unpublish at
```

functionality.

---

# 91. Deployment Rollback

The deployment process should make rollback possible.

At minimum, retain the previous application version/image.

---

# 92. Rollback Flow

```text
New deployment
      ↓
Health check fails
      ↓
Stop new version
      ↓
Restore previous version
      ↓
Verify
```

---

# 93. Database Rollbacks

Application rollback and database rollback are not necessarily the same.

Avoid destructive database migrations that make rollback impossible without a backup.

---

# 94. Maintenance Mode

A simple maintenance mechanism may be implemented for major upgrades.

Not required for ordinary deployments.

---

# 95. DNS

DNS should point the production domain to the public server.

The final DNS provider is not prescribed by this document.

---

# 96. WWW

The deployment should define one canonical hostname.

For example:

```text
example.com
```

and redirect:

```text
www.example.com
```

to the canonical host, or vice versa.

---

# 97. Canonical URL

The application should use a single canonical site URL for:

- SEO.
- Open Graph.
- Sitemap.
- Structured data.

---

# 98. Sitemap

The production website should expose:

```text
/sitemap.xml
```

through Next.js.

---

# 99. Robots

The production website should expose:

```text
/robots.txt
```

and should not accidentally block search engines.

---

# 100. Deployment Verification

After every production deployment verify:

```text
[ ] Homepage
[ ] English
[ ] Persian
[ ] RTL
[ ] Admin login
[ ] Database
[ ] Team members
[ ] Projects
[ ] Blog
[ ] Gallery
[ ] Sponsors
[ ] Contact
[ ] Join form
[ ] GitHub links
[ ] Social links
[ ] Three.js robot
[ ] Mobile layout
[ ] HTTPS
[ ] Sitemap
[ ] robots.txt
```

---

# 101. Language Verification

Because the site uses cookie-based language selection rather than `/en` and `/fa` routes:

```text
User
 ↓
Language cookie
 ↓
Next.js
 ↓
English/Persian content
```

Deployment must preserve cookies correctly.

---

# 102. Cookie Security

Language cookies should be configured appropriately.

Authentication cookies must additionally use:

```text
HttpOnly
Secure
SameSite
```

where appropriate.

---

# 103. Reverse Proxy Headers

Nginx must correctly forward relevant headers such as:

```text
Host
X-Real-IP
X-Forwarded-For
X-Forwarded-Proto
```

---

# 104. File Permissions

Production application and media directories should use restrictive permissions.

The application process should only have the filesystem permissions it actually needs.

---

# 105. Database Credentials

Use a dedicated PostgreSQL user for the application.

Do not run the application using the PostgreSQL superuser.

---

# 106. Database Network

The application database connection should use an internal/private network whenever possible.

---

# 107. Server Updates

The operating system should receive security updates regularly.

---

# 108. Automatic Security Updates

Automatic security updates may be enabled where compatible with the hosting environment.

Major OS upgrades should be planned and tested separately.

---

# 109. Time Synchronization

The production server should have correct time synchronization.

This is important for:

- Logs.
- Sessions.
- Certificates.
- Scheduled jobs.
- Database timestamps.

---

# 110. Storage Monitoring

Disk usage should be monitored because media uploads can grow significantly over time.

Set alerts before storage becomes critically low.

---

# 111. Media Growth

Gallery content is likely to be one of the fastest-growing parts of the system.

The deployment architecture must account for this from the beginning.

---

# 112. Future CDN

When traffic or gallery size grows, the preferred evolution is:

```text
Next.js
   +
Object Storage
   +
CDN
```

rather than continuously increasing VPS storage.

---

# 113. Future Scaling

The architecture should allow:

```text
             Load Balancer
                   │
          ┌────────┴────────┐
          ▼                 ▼
       Next.js           Next.js
          │                 │
          └────────┬────────┘
                   ▼
              PostgreSQL
```

if traffic eventually requires it.

This is not necessary for the first deployment.

---

# 114. Initial Scaling Strategy

Do not prematurely introduce:

- Kubernetes.
- Microservices.
- Multiple databases.
- Complex queues.
- Distributed infrastructure.

The initial club website does not require them.

---

# 115. Recommended Initial Stack

```text
Frontend:
Next.js + React

Styling:
Tailwind CSS

3D:
Three.js / React Three Fiber

Database:
PostgreSQL

ORM:
Prisma or equivalent

Image processing:
Jimp

Reverse proxy:
Nginx

Runtime:
Node.js

Containerization:
Docker

Authentication:
Secure username/password admin session

Hosting:
Linux VPS

TLS:
Let's Encrypt
```

---

# 116. Deployment Philosophy

The first deployment should be **boring**.

It should be:

```text
Simple
Predictable
Recoverable
Secure
Easy to understand
```

The visual experience can be ambitious.

The infrastructure should not be unnecessarily complicated.

---

# 117. Production Principle

The website is the public face of the robotics club.

Therefore:

> **The infrastructure should disappear. The visitors should only experience the team, the robots, the engineering, and the story.**

---

# 118. Final Deployment Acceptance Criteria

The deployment is considered production-ready when:

```text
✓ HTTPS works
✓ Domain works
✓ English works
✓ Persian works
✓ RTL works
✓ Admin authentication works
✓ PostgreSQL persists
✓ Backups work
✓ Media uploads work
✓ Jimp processes images
✓ No Sharp dependency exists
✓ Admin content publishing works
✓ Cache invalidation works
✓ Three.js works
✓ Mobile works
✓ Reduced-motion mode works
✓ Errors are handled gracefully
✓ Logs are available
✓ Secrets are not in Git
✓ Database is not publicly exposed
✓ SSH is secured
✓ Health check works
✓ Sitemap works
✓ robots.txt works
✓ Deployment can be rolled back
```

---

# 119. Important Non-Negotiable Requirements

The implementation AI **must not violate these deployment requirements**:

1. **Do not use Sharp.**
2. **Use Jimp for image processing.**
3. **Do not store passwords in plaintext.**
4. **Do not expose PostgreSQL publicly.**
5. **Do not commit secrets.**
6. **Do not use `latest` production images without a deliberate reason.**
7. **Do not use `prisma db push` as the production migration strategy.**
8. **Do not run the Next.js development server in production.**
9. **Do not make uploaded files executable.**
10. **Do not sacrifice mobile support for the desktop experience.**
11. **Do not make Three.js block the entire website.**
12. **Do not introduce unnecessary infrastructure complexity.**

---

# 120. Target End State

The intended production environment is:

```text
                    ┌───────────────────────┐
                    │        Visitors       │
                    │  Desktop / Mobile     │
                    └───────────┬───────────┘
                                │
                              HTTPS
                                │
                                ▼
                    ┌───────────────────────┐
                    │        Nginx          │
                    │ Reverse Proxy + TLS   │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │       Next.js         │
                    │                       │
                    │ Public Website        │
                    │ Admin Panel           │
                    │ API / Server Actions  │
                    └───────┬───────┬───────┘
                            │       │
                  ┌─────────┘       └──────────┐
                  ▼                            ▼
        ┌──────────────────┐        ┌──────────────────┐
        │   PostgreSQL     │        │  Media Storage   │
        │                  │        │                  │
        │ Content          │        │ Jimp processed   │
        │ Members          │        │ images           │
        │ Projects         │        │ gallery          │
        │ Sponsors         │        │ logos            │
        │ Blog             │        │                  │
        └──────────────────┘        └──────────────────┘
                  │
                  ▼
        ┌──────────────────┐
        │     Backups      │
        └──────────────────┘
```

This architecture should be sufficient for the club's first several years while leaving a clean path toward object storage, CDN usage, automated CI/CD, and horizontal scaling if the website eventually grows significantly.

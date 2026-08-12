# 09 — TECHNICAL ARCHITECTURE & IMPLEMENTATION SPECIFICATION

**Document:** `09_TECHNICAL_ARCHITECTURE.md`

This document defines the technical architecture for the robotics club website.

The implementation must prioritize:

- Maintainability.
- Performance.
- SEO.
- Security.
- Bilingual support.
- Admin-managed content.
- Future expansion.
- Compatibility with the team's existing server.

The site should be built as a **single Next.js application**, not as separate frontend/backend applications unless a genuine technical requirement emerges.

---

# 1. Core Stack

Use:

```text
Next.js
React
TypeScript
Tailwind CSS
PostgreSQL
Prisma
Three.js
React Three Fiber
React Toastify
Jimp
Zod
```

Additional libraries may be introduced when they solve a real problem.

Do not add dependencies simply because they are popular.

---

# 2. Framework

Use the modern Next.js App Router.

Recommended:

```text
app/
```

with:

- Server Components by default.
- Client Components only where interactivity requires them.

Do not turn the entire application into a client-side SPA.

---

# 3. Rendering Strategy

Use the appropriate rendering strategy for each page.

### Static / cached

Suitable for:

- Homepage.
- About/team information.
- Projects.
- Robots.
- Competitions.
- Sponsors.

### Dynamic

Suitable for:

- Admin.
- Contact submission.
- Join application.
- Preview pages.
- Content requiring immediate updates.

---

# 4. Server Components

Use Server Components for content-heavy public pages whenever possible.

Example:

```text
Homepage
    ↓
Server Component
    ↓
Fetch published content
    ↓
Render HTML
```

This improves:

- SEO.
- Initial load.
- Crawlability.
- Performance.

---

# 5. Client Components

Use `"use client"` only where necessary.

Examples:

```text
Three.js robot
Language switcher
Mobile menu
Interactive filters
Gallery lightbox
Form interactions
Toast notifications
Admin editors
```

Do not add `"use client"` to entire page trees unnecessarily.

---

# 6. Database

Use PostgreSQL.

The database should contain structured content rather than storing entire pages as arbitrary JSON blobs.

---

# 7. ORM

Use Prisma.

Recommended conceptual architecture:

```text
Next.js
   ↓
Server Actions / Route Handlers
   ↓
Service / validation layer
   ↓
Prisma
   ↓
PostgreSQL
```

Avoid having React components directly manipulate Prisma.

---

# 8. Prisma Architecture

Use a single Prisma client instance appropriate for Next.js development/production behavior.

Avoid creating a new Prisma client on every request.

---

# 9. Environment Variables

Sensitive configuration must be stored in environment variables.

Examples:

```text
DATABASE_URL
DIRECT_URL
AUTH_SECRET
UPLOAD_DIRECTORY
```

Additional variables can be introduced as required.

Never commit secrets.

---

# 10. Environment Files

Use:

```text
.env.local
```

for local development.

Provide:

```text
.env.example
```

containing variable names but no secrets.

Example:

```text
DATABASE_URL=
AUTH_SECRET=
```

---

# 11. Database Schema Philosophy

The schema should represent real entities.

Core entities:

```text
Admin
Member
Department
Technology
Project
Robot
Competition
CompetitionResult
Award
BlogPost
NewsPost
Gallery
GalleryImage
Sponsor
SponsorTier
Partner
TimelineEvent
SocialLink
ContactMessage
JoinApplication
```

Additional entities may be added where necessary.

---

# 12. Entity Relationships

The architecture should support relationships such as:

```text
Member
 ├── Projects
 ├── Robots
 ├── Technologies
 └── Departments

Project
 ├── Members
 ├── Robot
 ├── Technologies
 └── Competitions

Robot
 ├── Projects
 ├── Members
 └── Competitions

Competition
 ├── Robots
 ├── Projects
 ├── Results
 └── Awards
```

---

# 13. Many-to-Many Relationships

Do not assume:

```text
one member = one department
one member = one project
one project = one technology
```

The system must support many-to-many relationships.

Examples:

```text
Member ↔ Department
Member ↔ Technology
Member ↔ Project
Member ↔ Robot
Project ↔ Technology
Project ↔ Competition
```

---

# 14. Member Status

Members should have a status.

Conceptually:

```text
CURRENT
ALUMNI
```

Additional statuses can be added later if necessary.

Do not delete members simply because they leave the team.

Mark them as alumni.

---

# 15. Content Status

Content entities should generally support:

```text
DRAFT
PUBLISHED
ARCHIVED
```

Not every entity needs all three states.

---

# 16. Slugs

Public entities should use unique slugs.

Example:

```text
autonomous-navigation
robotic-arm
robocup-sml-2026
```

Slugs should be unique within their content type.

---

# 17. Timestamps

Major database entities should include:

```text
createdAt
updatedAt
```

Content that has publishing semantics should also consider:

```text
publishedAt
```

---

# 18. Ordering

Entities that appear in curated lists should support manual ordering.

Examples:

```text
Sponsor
Partner
Gallery image
Timeline event
Featured project
Social link
```

Use an integer such as:

```text
order
```

where appropriate.

---

# 19. Featured Content

Do not hard-code homepage content.

Entities can have fields such as:

```text
featured
```

when appropriate.

For example:

```text
Project
featured = true
```

The homepage can then query featured projects.

---

# 20. Avoid Overusing Booleans

Do not create:

```text
isPublished
isArchived
isDeleted
isActive
isVisible
```

for every entity without considering their relationship.

Use clear status models where appropriate.

---

# 21. Soft Deletion

For important content, prefer archive/unpublish over hard deletion.

Hard delete should be reserved for content where deletion is genuinely safe.

---

# 22. Content Relationships

When displaying related content, use actual relationships.

For example:

A robot page should be able to show:

```text
Projects involving this robot
Team members who worked on it
Competitions where it participated
```

Do not duplicate these relationships manually in content text.

---

# 23. Bilingual Database Design

The public website has two languages.

English is preferred.

For bilingual fields, use explicit fields:

```text
titleEn
titleFa

descriptionEn
descriptionFa

contentEn
contentFa
```

rather than putting both languages into one blob.

---

# 24. Why Explicit Language Fields

This makes:

- Validation easier.
- Queries easier.
- SEO easier.
- Admin UI easier.
- RTL handling cleaner.

It also avoids introducing an unnecessarily complex translation framework.

---

# 25. Translation Requirement

English is the canonical language.

For most public content:

```text
English = required
Persian = optional
```

If Persian content is missing, the system should gracefully fall back to English where appropriate.

---

# 26. Language Cookie

The public language should be stored in a cookie.

Example conceptual value:

```text
locale=en
```

or:

```text
locale=fa
```

The exact cookie name is implementation-defined.

---

# 27. Language Switching

When the user switches language:

1. Update cookie.
2. Refresh/re-render current page.
3. Preserve current route.
4. Render RTL if Persian.
5. Render LTR if English.

Do not require a separate `/fa` or `/en` route tree.

---

# 28. Root Direction

English:

```html
<html dir="ltr"></html>
```

Persian:

```html
<html dir="rtl"></html>
```

The direction should be applied at the document/root level rather than manually changing every component.

---

# 29. Component Direction

Some content remains LTR even inside Persian pages.

Examples:

```text
GitHub URLs
Code
Technical identifiers
Email addresses
Version numbers
```

Use localized direction overrides where appropriate.

---

# 30. Content Fetching

Create server-side content access functions.

For example:

```text
getPublishedProjects()
getProjectBySlug()
getCurrentMembers()
getPublishedRobots()
getLatestNews()
```

Do not scatter raw Prisma queries throughout UI components.

---

# 31. Service Layer

A clean structure could be:

```text
lib/
  db/
  auth/
  content/
  validation/
  media/
  seo/
```

For example:

```text
lib/content/projects.ts
lib/content/members.ts
lib/content/robots.ts
```

This makes the system easier to maintain.

---

# 32. Admin Mutations

Admin operations should go through a controlled server-side layer.

Example:

```text
createProject()
updateProject()
publishProject()
deleteProject()
```

Each function should:

1. Authenticate.
2. Validate.
3. Perform mutation.
4. Revalidate relevant pages.
5. Return a safe result.

---

# 33. Revalidation

When an administrator publishes content, public pages should update without requiring a full application restart.

Use appropriate Next.js revalidation mechanisms.

For example:

```text
Project updated
      ↓
Revalidate /projects
      ↓
Revalidate /projects/[slug]
```

---

# 34. Cache Strategy

Do not disable caching globally.

Public content is mostly read-heavy.

Use caching/revalidation where appropriate.

Admin operations should trigger targeted invalidation.

---

# 35. Database Performance

Add indexes to fields commonly queried by:

```text
slug
status
publishedAt
createdAt
order
```

and appropriate relationship keys.

Do not add indexes blindly to every column.

---

# 36. Pagination

Admin lists should be paginated.

Public lists can be:

- Paginated.
- Limited.
- Static/generated.
- Infinite-scroll only if genuinely useful.

For SEO-heavy pages, conventional pagination is preferable.

---

# 37. Public Search

A global search feature can be added later.

Do not make it a version-one requirement unless there is enough content to justify it.

A robotics club with ten projects does not need an enterprise search engine.

---

# 38. SEO Architecture

Every public content page should have metadata.

Examples:

```text
title
description
canonical
Open Graph
Twitter/X metadata
```

The metadata should be generated from database content where appropriate.

---

# 39. SEO Titles

Use a predictable structure.

Example:

```text
Autonomous Navigation | IUST Robotics
```

or:

```text
Autonomous Navigation — IUST Robotics Club
```

Do not repeat the full title excessively.

---

# 40. Meta Descriptions

Descriptions should be:

- Human-readable.
- Relevant.
- Unique where practical.
- Around the typical search-snippet range.

Do not keyword-stuff.

---

# 41. Structured Data

Implement appropriate Schema.org structured data.

Potential types:

```text
Organization
Person
Article
BreadcrumbList
ImageObject
```

Use only types that accurately represent the content.

Do not fabricate organization information.

---

# 42. Organization Schema

The organization schema can eventually include:

```text
name
url
logo
sameAs
description
```

Social links should come from the admin-managed configuration where possible.

---

# 43. Person Schema

Member detail pages can potentially expose:

```text
Person
```

with:

```text
name
image
jobTitle
sameAs
```

only when the information exists.

---

# 44. Article Schema

Blog and news pages should use:

```text
Article
```

or an appropriate subtype.

Include:

```text
headline
description
image
datePublished
dateModified
author
```

when available.

---

# 45. Breadcrumb Schema

Deep pages can use:

```text
BreadcrumbList
```

to help search engines understand hierarchy.

---

# 46. Sitemap

Generate a sitemap containing public URLs.

It must include:

```text
Homepage
Published projects
Published robots
Published competitions
Published articles
Published news
Public member profiles
```

Do not include:

```text
Admin
Drafts
Applications
Contact messages
Private previews
```

---

# 47. Robots.txt

Configure robots.txt so that:

```text
/admin
```

and other private paths are not intended for indexing.

Do not rely on robots.txt as a security mechanism.

Authentication remains mandatory.

---

# 48. Canonical URLs

Public pages should have canonical URLs.

This is particularly important because the language system uses cookies rather than language-specific URLs.

---

# 49. Cookie-Based Language SEO

Because the same URL can render English or Persian depending on a cookie, SEO requires careful handling.

The implementation should avoid creating confusing duplicate indexing behavior.

Recommended initial approach:

- English is the primary crawlable representation.
- Persian availability can be communicated through appropriate metadata/content strategy.
- Do not create fake `/fa` routes merely to solve SEO.

The implementation AI should validate the final strategy against current Next.js SEO behavior before deployment.

---

# 50. Open Graph

Every major public page should generate useful Open Graph metadata.

For example:

```text
Project title
Project image
Description
```

This matters when links are shared through:

- Telegram.
- LinkedIn.
- Instagram where supported.
- Messaging platforms.

---

# 51. Social Preview Images

Do not generate generic social images for everything.

Where possible, use:

```text
Project image
Robot image
Competition image
Article cover
```

with an appropriate fallback.

---

# 52. Performance Target

The website should aim for excellent Core Web Vitals.

Particular attention:

```text
LCP
CLS
INP
```

The Three.js hero is the biggest potential performance risk.

---

# 53. Performance Rule

Never sacrifice the entire website's performance for the hero animation.

The visitor should be able to:

```text
load page
read content
navigate
```

even if the 3D experience is unavailable.

---

# 54. Image Optimization

Use Next.js image handling where compatible.

However, because the server has a known `sharp` compatibility issue:

> Do not assume Next.js's default image optimization pipeline can use Sharp successfully.

The implementation must account for the server constraint.

Use the team's Jimp-based image processing pipeline where required.

---

# 55. Jimp Requirement

Image processing must use:

```text
Jimp
```

and not:

```text
Sharp
```

This is a hard technical constraint.

---

# 56. Image Sizes

The upload system should generate reasonable variants.

For example:

```text
thumbnail
medium
large
original
```

Only create variants that the application actually uses.

---

# 57. Lazy Loading

Images below the fold should generally be lazy-loaded.

Hero/critical images should not be unnecessarily lazy-loaded.

---

# 58. Three.js Bundle

Three.js should not unnecessarily load on pages that don't use it.

The interactive robot should be dynamically imported or otherwise isolated so that:

```text
/projects
```

doesn't need to load the entire 3D stack.

---

# 59. Three.js Dependencies

Use:

```text
three
@react-three/fiber
@react-three/drei
```

where appropriate.

Do not introduce a large collection of unnecessary Three.js helper libraries.

---

# 60. 3D Model Format

Prefer optimized formats such as:

```text
GLB / GLTF
```

for the industrial robot.

The model should be optimized before deployment.

---

# 61. Accessibility of 3D

The 3D scene cannot be the only way to understand the hero.

Provide textual content alongside it.

A visitor should understand:

```text
Who the team is
What it does
```

without interacting with the model.

---

# 62. Forms

Public forms:

```text
Join
Contact
```

must use server-side validation.

Do not trust client validation.

---

# 63. Anti-Spam

At minimum, forms should have reasonable protection against automated spam.

Possible mechanisms:

- Rate limiting.
- Honeypot.
- CAPTCHA/Turnstile if needed.
- Request validation.

Do not immediately introduce a complicated CAPTCHA unless spam becomes a problem.

---

# 64. Email

The contact/join system may eventually send email notifications.

The architecture should allow an email provider to be added later.

Do not hard-code the application around one provider unless necessary.

---

# 65. Admin Notifications

When a new:

```text
Join application
Contact message
```

arrives, the dashboard should indicate it.

Email notification can be added separately.

---

# 66. File Upload Security

Uploads must:

- Validate file types.
- Validate size.
- Sanitize filenames.
- Avoid executable file types.
- Store outside sensitive source directories where possible.
- Avoid exposing private files.

---

# 67. Resume Security

Resume files are private.

They should require authentication to access.

Do not use a predictable public URL like:

```text
/uploads/resumes/parsa.pdf
```

for private resumes.

---

# 68. Public Media

Public images can use stable public URLs.

Private files should use controlled access.

These two categories must not be mixed.

---

# 69. Error Logging

Production errors should be logged.

The system should make it possible to identify:

```text
Database errors
Upload errors
Authentication failures
Server errors
```

without exposing technical details to visitors.

---

# 70. Toast Notifications

React Toastify is required for user feedback.

Use it in:

```text
Admin
Public forms
Interactive actions
```

where feedback is useful.

Avoid excessive toast notifications for ordinary navigation.

---

# 71. Database Migrations

Use Prisma migrations in controlled environments.

Do not rely on:

```text
prisma db push
```

as the production deployment strategy.

Development may use `db push` where appropriate, but production schema changes should be versioned.

---

# 72. Seed Data

Provide a seed strategy for development.

Seed data should include examples for:

```text
Member
Project
Robot
Competition
Sponsor
Blog
News
```

This allows the UI to be developed before the real team data exists.

Clearly distinguish seed data from production data.

---

# 73. Admin Seed

Development should include a safe way to create the initial admin.

Do not commit a production password.

---

# 74. Type Safety

Use TypeScript strictly.

Avoid:

```typescript
any;
```

unless there is a documented reason.

Types should flow from:

```text
Database
↓
Server
↓
Components
```

as cleanly as possible.

---

# 75. Validation Types

Do not duplicate validation logic unnecessarily.

For example, if a project requires:

```text
titleEn
slug
```

the same validation rules should be used consistently by the relevant server action and form.

---

# 76. Component Architecture

Recommended high-level structure:

```text
components/
  ui/
  layout/
  navigation/
  hero/
  projects/
  robots/
  team/
  competitions/
  journal/
  sponsors/
  forms/
  three/
```

The exact structure can differ if the existing repository has a better established convention.

---

# 77. UI Components

Create reusable components for:

```text
Button
Card
Badge
Container
Section
Modal
Dialog
Tabs
Input
Textarea
Select
Pagination
```

Do not reinvent these for every page.

---

# 78. Domain Components

Build domain-specific components:

```text
ProjectCard
RobotCard
MemberCard
SponsorLogo
CompetitionCard
ArticleCard
```

These should encapsulate domain presentation.

---

# 79. Server/Client Boundary

Keep domain data fetching on the server.

Pass only the necessary data to client components.

Avoid:

```text
Client component
 ↓
fetch everything
 ↓
render entire page
```

when the page can be server-rendered.

---

# 80. API Design

Do not create APIs just because APIs are familiar.

If a Server Action is enough for:

```text
admin mutation
form submission
```

use it.

Route Handlers are appropriate when an actual HTTP endpoint is required.

---

# 81. Public API

A public API may eventually be useful for:

- External integrations.
- Mobile applications.
- Competition displays.
- Public data access.

But it is **not required for version one**.

The internal website can read directly through the server architecture.

---

# 82. Admin API

Do not expose unrestricted CRUD endpoints like:

```text
/api/projects/delete?id=...
```

without proper authorization.

Every mutation must verify the authenticated admin server-side.

---

# 83. Security Headers

Configure appropriate production security headers.

Consider:

```text
Content-Security-Policy
X-Content-Type-Options
Referrer-Policy
Permissions-Policy
```

The CSP must account for:

- Three.js.
- Fonts.
- Image sources.
- YouTube embeds if used.
- Analytics if eventually added.

Do not deploy an overly restrictive CSP without testing the actual site.

---

# 84. External Links

External links should be clearly identified when appropriate.

Examples:

```text
GitHub →
Sponsor website →
YouTube →
```

Use safe external-link behavior.

---

# 85. YouTube

Videos can be embedded where useful.

However:

> Do not make video the primary visual medium.

The team specifically does not want a site full of cinematic videos.

Use YouTube mainly for:

- Competition videos.
- Robot demonstrations.
- Talks.
- Technical demonstrations.

---

# 86. YouTube Data

Store:

```text
YouTube URL
```

through the admin panel.

Do not require administrators to enter complicated embed HTML.

The application can convert the URL to the appropriate embed.

---

# 87. GitHub URLs

Projects can contain a GitHub URL.

Members can optionally contain:

```text
GitHub URL
```

The admin manages these links.

---

# 88. Social URLs

All team social URLs should be managed through:

```text
Admin → Settings → Social Links
```

rather than hard-coded into multiple components.

---

# 89. Analytics

Analytics should be architecturally possible but not mandatory in the first implementation.

If added later, prioritize privacy-conscious analytics.

Do not install five analytics systems.

---

# 90. Cookie Usage

Cookies should be limited to necessary functionality.

The language preference cookie is required.

If analytics or other third-party services introduce additional cookies, handle them appropriately.

---

# 91. Deployment

The website is expected to run on the team's existing VPS environment.

The architecture must be compatible with:

```text
Linux
Node.js
PostgreSQL
Nginx
```

and the existing deployment workflow.

---

# 92. Reverse Proxy

The expected architecture is:

```text
Internet
   ↓
Nginx
   ↓
Next.js
   ↓
PostgreSQL
```

The application should not expose the Next.js process directly as the primary public endpoint.

---

# 93. Process Management

Use the existing server's process/deployment strategy.

Possible:

```text
systemd
Docker
PM2
```

depending on the team's existing setup.

Do not introduce a second process-management system without a reason.

---

# 94. PostgreSQL Deployment

PostgreSQL may run:

```text
Docker
```

or as a system service depending on the existing infrastructure.

The application should connect through environment configuration.

---

# 95. Database Backups

The production PostgreSQL database must eventually have automated backups.

This is especially important because the database contains:

```text
Team history
Projects
Competition records
Applications
Contact messages
```

The website should not depend on the database being recoverable only through manual work.

---

# 96. Upload Backups

Media files must also be backed up.

A database backup alone does not protect:

```text
Team photos
Robot images
Gallery
Sponsor logos
Resumes
```

---

# 97. Deployment Safety

Before production deployment:

```text
Build
↓
Migration
↓
Start
↓
Health check
↓
Verify
```

Do not run destructive database operations automatically during every deploy.

---

# 98. Health Check

Provide a lightweight health endpoint or equivalent mechanism.

Example:

```text
/api/health
```

It should indicate whether the application is functioning.

Do not expose sensitive information.

---

# 99. Database Health

The health check may verify database connectivity, but should not perform expensive queries.

---

# 100. Technical Architecture Principle

The system should be:

> **simple enough for a student robotics team to maintain, but structured enough to grow into a serious long-term robotics organization.**

Do not build a startup-scale microservice architecture.

The correct initial architecture is:

```text
                ┌───────────────────┐
                │     Visitors      │
                └─────────┬─────────┘
                          │
                          ▼
                    ┌───────────┐
                    │   Nginx   │
                    └─────┬─────┘
                          │
                          ▼
              ┌─────────────────────┐
              │      Next.js        │
              │                     │
              │ Public Website      │
              │ Admin Panel         │
              │ Server Actions      │
              │ SEO                 │
              └─────────┬───────────┘
                        │
               ┌────────┴────────┐
               ▼                 ▼
        ┌─────────────┐   ┌─────────────┐
        │  PostgreSQL │   │   Storage   │
        │             │   │             │
        │ Prisma      │   │ Images      │
        │ Content     │   │ Gallery     │
        │ Applications│   │ Media       │
        └─────────────┘   └─────────────┘
```

This is the foundation the remaining implementation documents should build upon.

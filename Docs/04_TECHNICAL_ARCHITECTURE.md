Next is **`04_TECHNICAL_ARCHITECTURE.md`**. This one turns the product/IA decisions into an implementation blueprint for Next.js, PostgreSQL, authentication, media, bilingual content, the admin panel, and deployment.

# 04 — Technical Architecture

**Document:** `04_TECHNICAL_ARCHITECTURE.md`
**Project:** IUST Robotics
**Framework:** Next.js + React
**Database:** PostgreSQL
**Language:** TypeScript
**Admin:** Custom admin panel
**Image processing:** Jimp
**Notifications:** React Toastify
**3D:** Three.js / React Three Fiber
**Reference implementation:** PishTalk repository
**Primary deployment target:** VPS

---

# 1. Technical Objective

The website must be built as a production-quality application rather than a static marketing page.

It needs to support:

- A high-quality public website.
- Bilingual content.
- RTL Persian.
- Dynamic content.
- PostgreSQL persistence.
- Media management.
- Admin authentication.
- Content publishing.
- Team/member management.
- Project management.
- Competition management.
- Sponsor management.
- Gallery management.
- Blog/news publishing.
- Three.js visualization.
- SEO.
- Strong performance.
- Future expansion.

The architecture must remain understandable to a student engineering team.

Do not introduce infrastructure complexity without a real requirement.

---

# 2. Technology Stack

The preferred stack is:

```text
Frontend:
React
Next.js
TypeScript

Styling:
Tailwind CSS

Database:
PostgreSQL

ORM:
Prisma

3D:
Three.js
React Three Fiber
@react-three/drei

Notifications:
React Toastify

Image Processing:
Jimp

Validation:
Zod

Forms:
React Hook Form + Zod

Authentication:
Custom secure admin authentication

Deployment:
Linux VPS
```

The exact package versions should be selected according to the current stable versions at implementation time.

Do not blindly copy outdated package versions from this document.

---

# 3. Next.js Architecture

Use the **Next.js App Router**.

The application should take advantage of:

- Server Components.
- Server Actions where appropriate.
- Route Handlers.
- Static rendering where possible.
- Dynamic rendering where required.
- Metadata APIs.
- Image optimization where compatible with the server environment.

Avoid turning the entire application into a client-side SPA.

---

# 4. Server vs Client Components

Default to:

> **Server Components.**

Use Client Components only when interaction requires them.

Examples that may require Client Components:

- Three.js scene.
- Mobile navigation interaction.
- Theme switcher.
- Language switcher interaction.
- Forms with client validation.
- Toast notifications.
- Gallery interactions.
- Interactive filters.

Do not add:

```tsx
"use client";
```

to high-level layouts or pages without a reason.

---

# 5. Data Access

Database access should happen on the server.

Do not expose direct database credentials to the browser.

Preferred flow:

```text
Browser
   ↓
Next.js server
   ↓
Service / repository layer
   ↓
Prisma
   ↓
PostgreSQL
```

The frontend should never directly connect to PostgreSQL.

---

# 6. Repository / Service Layer

Database access should not be scattered across components.

Prefer a structure such as:

```text
src/
├── lib/
│   ├── db/
│   ├── auth/
│   ├── i18n/
│   ├── media/
│   └── validation/
│
├── services/
│   ├── members/
│   ├── projects/
│   ├── robots/
│   ├── competitions/
│   ├── blog/
│   └── sponsors/
```

The exact structure may vary.

The important rule is:

> UI components should not contain raw Prisma queries.

---

# 7. Database

PostgreSQL is the primary persistent datastore.

The database must contain structured entities rather than storing the entire website as one large JSON document.

---

# 8. ORM

Prisma should be used for:

- Schema definition.
- Type-safe database queries.
- Migrations.
- Relations.
- Transactions.
- Generated client.

Avoid raw SQL unless Prisma cannot reasonably express the required query.

---

# 9. Database Design Principle

Model real entities separately.

Do not create one giant table such as:

```text
website_content
```

containing everything.

Prefer:

```text
Member
Project
Robot
Competition
Sponsor
BlogPost
NewsPost
Media
...
```

with relationships between them.

---

# 10. Core Database Entities

The initial schema should be designed around:

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
Media
Gallery
Sponsor
SponsorTier
Partner
TimelineEvent
SiteSetting
SocialLink
ContactSubmission
JoinApplication
```

Not every model needs to be implemented in the first migration if it is not yet required, but the architecture should accommodate them.

---

# 11. Admin Model

The initial admin requirement is intentionally simple.

Conceptually:

```text
Admin
├── id
├── username
├── passwordHash
├── createdAt
└── updatedAt
```

Do not store plaintext passwords.

---

# 12. Admin Authentication

The admin authentication system must:

- Hash passwords securely.
- Use secure session management.
- Use HTTP-only cookies.
- Protect admin routes server-side.
- Expire sessions appropriately.
- Prevent unauthorized API access.

Do not implement:

```text
localStorage.setItem("isAdmin", "true")
```

or similar client-side authentication.

---

# 13. Admin Authorization

At launch there is only one admin role.

However, the architecture should not make future roles impossible.

Potential future roles:

```text
Super Admin
Editor
Media Manager
Team Manager
```

This does not mean these roles need to be implemented now.

---

# 14. Session Security

Admin sessions should:

- Be cryptographically secure.
- Use HTTP-only cookies.
- Use `Secure` in production.
- Use an appropriate `SameSite` policy.
- Be invalidated on logout.
- Have expiration.

Never expose session secrets to client-side JavaScript.

---

# 15. Environment Variables

Secrets must live in environment variables.

Examples:

```text
DATABASE_URL
AUTH_SECRET
MEDIA_STORAGE_PATH
NEXT_PUBLIC_SITE_URL
```

Actual variables may differ.

Never commit:

```text
.env
.env.production
```

containing secrets.

Provide:

```text
.env.example
```

instead.

---

# 16. Database Migrations

Use Prisma migrations for production schema changes.

Do not rely on:

```bash
prisma db push
```

as the production migration strategy.

Development may use `db push` when appropriate, but production must have controlled migrations.

---

# 17. Database Constraints

Use database-level constraints where appropriate.

Examples:

- Unique usernames.
- Unique slugs.
- Unique sponsor tier names where appropriate.
- Foreign key relationships.
- Required fields.
- Unique social identifiers where needed.

Do not rely solely on frontend validation.

---

# 18. Slugs

Public entities should have unique slugs.

For example:

```text
projects.slug
robots.slug
competitions.slug
blogPosts.slug
newsPosts.slug
members.slug
```

Slugs should be generated carefully and remain stable after publication.

---

# 19. Slug Changes

Changing a published slug can break:

- Search engine links.
- External links.
- Social links.
- Internal references.

The admin should either:

1. Discourage changing published slugs, or
2. Implement redirect support.

The second option is preferable as the system matures.

---

# 20. Localization Architecture

Do not create:

```text
/en
/fa
```

routes.

The language is a presentation/content concern.

The same public route should render in the selected language.

Example:

```text
/projects/autonomous-navigation
```

can render either:

```text
English
```

or:

```text
Persian
```

depending on the language cookie.

---

# 21. Language Cookie

Use a dedicated cookie, for example conceptually:

```text
locale=en
```

or:

```text
locale=fa
```

The exact cookie name should be centralized.

Do not duplicate language state across:

- localStorage.
- URL.
- cookies.
- React context.

Use one authoritative mechanism.

---

# 22. Default Language

English is the preferred default.

If no language cookie exists:

```text
English
```

should be selected.

The system may consider browser language as a secondary signal, but it should not unexpectedly switch users between languages after they have explicitly chosen one.

---

# 23. Language Persistence

When a user selects Persian:

```text
locale=fa
```

should persist.

When the user returns:

```text
fa
```

should remain selected.

---

# 24. RTL

When Persian is active:

```text
dir="rtl"
lang="fa"
```

must be applied correctly.

When English is active:

```text
dir="ltr"
lang="en"
```

must be applied.

This should happen at the document/application level.

---

# 25. RTL CSS

Prefer logical CSS properties where possible.

Use:

```css
margin-inline
padding-inline
inset-inline
border-inline
text-align: start
```

instead of unnecessarily hard-coding:

```css
margin-left
margin-right
```

This allows the same components to behave correctly in both directions.

---

# 26. Direction-Aware Icons

Icons such as:

- Arrow right.
- Arrow left.
- Back.
- Forward.

must be direction-aware.

For example:

```text
English:
→

Persian:
←
```

where the meaning is directional.

Icons such as:

- GitHub.
- Instagram.
- YouTube.

should not be mirrored.

---

# 27. Bilingual Database Content

Content requiring translation should store language variants explicitly.

Conceptually:

```text
Project
├── titleEn
├── titleFa
├── excerptEn
├── excerptFa
├── contentEn
└── contentFa
```

For larger systems, a separate translation table can be considered.

For this project, a straightforward bilingual structure is acceptable if implemented consistently.

---

# 28. Translation Status

The admin should be able to see whether content exists in:

```text
English
Persian
```

For example:

```text
Project A

EN ✓
FA ✓

Project B

EN ✓
FA —
```

This makes incomplete translations visible.

---

# 29. Translation Fallback

The application must define a consistent fallback policy.

Recommended:

```text
Requested language available
        ↓
Show requested language

Requested language unavailable
        ↓
Fallback to English
```

The fallback should be deliberate and preferably communicated where necessary.

---

# 30. Rich Text

Blog posts and long-form content should support structured rich text.

The implementation should avoid allowing arbitrary unsafe HTML.

Content should be sanitized before rendering.

Markdown or a controlled rich-text format may be used.

---

# 31. HTML Sanitization

If HTML content is accepted from the admin:

- Sanitize it server-side.
- Restrict dangerous tags.
- Restrict dangerous attributes.
- Prevent script injection.
- Prevent event-handler attributes.

Never trust admin-submitted HTML simply because the admin interface is private.

---

# 32. XSS Protection

Protect against:

- Stored XSS.
- Reflected XSS.
- Malicious URLs.
- Unsafe HTML.
- Dangerous SVG uploads where relevant.

User-controlled content must always be treated as untrusted.

---

# 33. Forms

Use:

```text
React Hook Form
+
Zod
```

for complex forms.

Validation should occur:

```text
Client
+
Server
```

Client validation improves UX.

Server validation provides actual security.

---

# 34. Contact Form

Contact submissions should be persisted.

Conceptually:

```text
ContactSubmission
├── id
├── name
├── email
├── subject
├── message
├── status
├── createdAt
└── reviewedAt
```

Potential status:

```text
New
Reviewed
Archived
```

---

# 35. Join Applications

The Join page should be designed separately from the generic contact form.

Conceptually:

```text
JoinApplication
├── id
├── name
├── email
├── phone (optional)
├── education
├── department
├── message
├── resume
├── portfolio
├── status
└── createdAt
```

The exact fields should be finalized before implementation.

---

# 36. Resume Upload

If resumes are collected:

- Validate file type.
- Validate file size.
- Store outside the public static directory.
- Prevent direct unauthenticated access.
- Restrict downloads to authorized admins.
- Sanitize filenames.
- Generate safe internal storage names.

Never expose uploaded resumes through a predictable public URL.

---

# 37. Media Entity

Media should be represented separately.

Conceptually:

```text
Media
├── id
├── filename
├── originalFilename
├── mimeType
├── size
├── width
├── height
├── storagePath
├── altTextEn
├── altTextFa
├── createdAt
└── uploadedBy
```

---

# 38. Public Media

Public images can be served through controlled public URLs.

Sensitive media must not be placed in the same public storage system.

Examples of sensitive media:

- Resumes.
- Internal documents.
- Private team material.

---

# 39. Image Upload Pipeline

Recommended flow:

```text
Admin
 ↓
Upload
 ↓
Validate file
 ↓
Generate safe filename
 ↓
Jimp processing
 ↓
Store image
 ↓
Create Media record
 ↓
Return media information
```

---

# 40. Jimp Requirement

The project must use:

> **Jimp**

for image processing.

Do not install or introduce:

> **Sharp**

because the target server environment is incompatible with it.

This constraint should be recorded in the project documentation and dependency decisions.

---

# 41. Image Variants

Where useful, generate:

```text
Original
Thumbnail
Medium
Large
```

Do not create dozens of unnecessary variants.

The required sizes should be determined based on actual frontend usage.

---

# 42. Image Validation

Uploaded images should be validated by:

- MIME type.
- File signature where practical.
- File size.
- Image dimensions.

Do not trust only the filename extension.

---

# 43. Sponsor Logos

Sponsor logos should preferably support:

- SVG.
- PNG.
- WebP.

SVG uploads require additional sanitization considerations.

Do not blindly render arbitrary uploaded SVG files.

---

# 44. Media Alt Text

Every public image should support meaningful alt text.

For decorative images:

```text
alt=""
```

may be appropriate.

Do not generate meaningless alt text such as:

```text
image123.jpg
```

---

# 45. Three.js Architecture

The 3D robot should be isolated from the rest of the application.

Conceptually:

```text
components/
└── three/
    ├── RobotScene
    ├── RobotModel
    ├── RobotLights
    ├── RobotControls
    └── RobotFallback
```

The Three.js implementation must not infect unrelated components with client-side rendering requirements.

---

# 46. Three.js Loading

The robot scene should be loaded dynamically where appropriate.

The main HTML/content should not wait unnecessarily for the 3D model.

Potential strategy:

```text
Page loads
 ↓
Hero content appears
 ↓
3D scene loads progressively
```

This improves perceived performance.

---

# 47. 3D Fallback

If WebGL is unavailable or the device is extremely constrained:

```text
3D Robot
↓
Fallback image / simplified visual
```

The page must still communicate the same information.

The 3D scene is an enhancement, not a requirement for understanding the website.

---

# 48. 3D Model

The robot should be an industrial-style robot inspired by the team's actual engineering direction.

It should not pretend to be the team's real robot unless the team actually has that robot.

The initial model is a visual representation of the club's engineering identity.

Once the real robot exists, the model can be replaced.

---

# 49. 3D Interaction

Interaction should be subtle.

Possible interactions:

- Rotate.
- Slight parallax.
- Controlled camera movement.
- Hover/focus details.

Do not require users to manipulate the robot to understand the homepage.

---

# 50. 3D Performance

Performance requirements:

- Lazy load where possible.
- Optimize geometry.
- Compress textures.
- Avoid excessive texture resolution.
- Avoid unnecessary post-processing.
- Avoid dozens of lights.
- Avoid expensive physics.

Target:

> Visually impressive without becoming the largest performance bottleneck on the website.

---

# 51. Animation Philosophy

Animations should communicate hierarchy.

Use motion for:

- Page entrance.
- Section reveal.
- Navigation.
- Interactive feedback.
- 3D robot movement.

Avoid:

- Constantly moving everything.
- Infinite decorative animations.
- Large transitions between every section.

---

# 52. Reduced Motion

Respect:

```text
prefers-reduced-motion
```

Users who request reduced motion should receive a calmer experience.

The 3D scene may:

- Reduce animation.
- Disable automatic motion.
- Reduce camera movement.

---

# 53. Toastify

React Toastify should be integrated centrally.

Toasts may be used for:

```text
Success
Error
Warning
Information
```

Examples:

```text
"Message sent successfully."

"Project saved."

"Image uploaded."

"Could not save changes."
```

Avoid excessive notifications.

---

# 54. Toast Direction

The toast system must support RTL.

When Persian is active:

- Text direction should be RTL.
- Placement should remain visually appropriate.

Do not create a separate notification system for Persian.

---

# 55. SEO Architecture

SEO must be treated as a first-class feature.

Each public entity should have appropriate:

- Title.
- Description.
- Canonical URL.
- OpenGraph metadata.
- Twitter/X metadata where useful.
- Structured data where applicable.

---

# 56. Dynamic Metadata

Dynamic pages should generate metadata from their database content.

For example:

```text
/projects/autonomous-navigation
```

should use the project's actual title and description.

Do not use the same generic title for every page.

---

# 57. Structured Data

Where appropriate, implement Schema.org structured data.

Potential types:

```text
Organization
Person
Article
BlogPosting
Event
BreadcrumbList
```

Only use structured data that accurately describes the page.

Do not invent awards, ratings, reviews, or other data for SEO.

---

# 58. Organization Structured Data

The homepage should eventually provide structured information about:

> IUST Robotics

including appropriate:

- Name.
- Website.
- Social profiles.
- University relationship where accurately represented.

---

# 59. Person Structured Data

Team member pages may use:

```text
Person
```

structured data where appropriate.

Only publicly displayed information should be included.

---

# 60. Sitemap

The application should generate:

```text
/sitemap.xml
```

dynamically or through a supported Next.js mechanism.

It should include published public pages.

It should not include:

```text
/admin
```

or unpublished content.

---

# 61. Robots

Generate:

```text
/robots.txt
```

with appropriate crawl rules.

The admin area should not be indexed.

---

# 62. Canonical URLs

Every public page should have a canonical URL.

This becomes especially important because the same content can be rendered in English or Persian without language-specific paths.

The canonical strategy must be defined carefully so search engines do not interpret the language cookie behavior as duplicate URL content.

---

# 63. Social Sharing

Important pages should have appropriate OpenGraph previews.

Examples:

- Homepage.
- Projects.
- Robots.
- Competitions.
- Blog posts.
- News.

The admin should eventually be able to provide custom social images for important content.

---

# 64. Performance

Performance is a core requirement.

The site should aim for:

- Fast initial HTML.
- Low JavaScript where possible.
- Optimized images.
- Lazy loading.
- Efficient fonts.
- Minimal client components.
- Efficient database queries.

Do not sacrifice all performance for visual effects.

---

# 65. Database Query Optimization

Avoid N+1 queries.

For example, a project listing should not perform:

```text
1 query for projects
+
1 query per project for members
+
1 query per project for images
+
...
```

Use appropriate Prisma relation queries.

---

# 66. Pagination

Content-heavy sections should support pagination or controlled loading.

Potential examples:

- Blog.
- News.
- Gallery.
- Projects.
- Members.

Do not load hundreds of records onto the homepage.

---

# 67. Caching

Public content that changes infrequently can be cached.

Examples:

- Projects.
- Robots.
- Team.
- Sponsors.
- Technologies.

Admin changes should trigger appropriate cache invalidation/revalidation.

---

# 68. Revalidation

When an admin publishes content:

```text
Database update
↓
Invalidate relevant cache
↓
Public page reflects new content
```

Do not require a full application restart after every content edit.

---

# 69. Error Handling

The application must have:

- Global error boundary.
- Page-level not-found handling.
- API error handling.
- Form error handling.
- Database error handling.

Users should not see raw stack traces.

---

# 70. Logging

Production logs should contain useful information without exposing secrets.

Never log:

- Passwords.
- Session secrets.
- Database credentials.
- Private uploaded documents.
- Sensitive form content unnecessarily.

---

# 71. Security Headers

The production application should consider appropriate security headers including:

- Content Security Policy.
- X-Content-Type-Options.
- Referrer Policy.
- Permissions Policy.
- Frame-related protection where appropriate.

The exact policy must account for:

- Three.js.
- YouTube embeds.
- External images.
- Analytics if later added.

---

# 72. Rate Limiting

Public forms should eventually have rate limiting.

At minimum:

```text
Contact
Join
```

should not be unlimited anonymous endpoints.

The implementation can start with a simple strategy and evolve later.

---

# 73. Spam Protection

Contact and join forms should include spam protection.

Possible options:

- Honeypot.
- Rate limiting.
- CAPTCHA/Turnstile if necessary.

Do not add CAPTCHA immediately if simpler protection is sufficient.

---

# 74. External Links

External links such as:

- GitHub.
- YouTube.
- Sponsor websites.
- Personal websites.

should be treated as external navigation.

Where opening a new tab is appropriate, use safe link behavior.

---

# 75. GitHub Links

GitHub repository links should be stored in the database.

They should be editable from the admin panel.

Example:

```text
Project
└── githubUrl
```

The GitHub icon/link should only appear when a valid URL exists.

---

# 76. Social Links

Social links should be centrally managed.

Conceptually:

```text
SocialLink
├── platform
├── url
├── label
└── enabled
```

The footer can consume these settings.

---

# 77. Site Settings

A small settings model can control global values.

Examples:

```text
Site title
Default description
Contact email
Social links
Footer text
Default language
Theme configuration
```

Do not store large arbitrary page content in settings.

---

# 78. Admin Dashboard

The dashboard should prioritize useful information.

Potential widgets:

```text
Published projects
Current members
Pending join applications
Unread contact submissions
Draft content
Recent uploads
```

It should not become an unnecessary analytics dashboard.

---

# 79. Admin Sidebar

Recommended conceptual structure:

```text
Dashboard

Content
├── Team
├── Projects
├── Robots
├── Competitions
├── Technologies
├── News
├── Blog
├── Gallery
├── Sponsors
└── Partners

Communication
├── Contact submissions
└── Join applications

Settings
├── Site
├── Social links
└── Admin
```

---

# 80. Admin CRUD

Each manageable entity should provide appropriate:

```text
Create
Read
Update
Delete / Archive
Publish / Unpublish
```

Not every entity needs all operations.

For example:

- Awards may be deleted.
- Published projects may preferably be archived.
- Contact submissions may be archived.

---

# 81. Admin Forms

Admin forms should be:

- Clearly sectioned.
- Validated.
- Responsive.
- Keyboard accessible.
- Explicit about required fields.
- Safe for destructive actions.

Large forms should use sections or tabs.

---

# 82. Bilingual Admin Editor

For bilingual entities, a clear interface is required.

Possible design:

```text
[ English ] [ Persian ]
```

or:

```text
English Content
----------------
Title
Description
Body

Persian Content
----------------
Title
Description
Body
```

The editor should make accidental language mixing difficult.

---

# 83. Publishing Controls

Admin should be able to choose:

```text
Draft
Published
Archived
```

and where appropriate:

```text
Visible publicly
```

This allows the team to prepare content without immediately exposing it.

---

# 84. Gallery Admin

Gallery management should support:

- Upload multiple images.
- Reorder images.
- Add captions.
- Add alt text.
- Associate images with projects.
- Associate images with competitions.
- Publish/unpublish.
- Delete/archive.

Bulk upload should be considered.

---

# 85. Sponsor Admin

Admin should be able to:

```text
Create sponsor
Upload logo
Set website
Select tier
Set order
Publish/unpublish
```

Sponsor tiers should be manageable.

---

# 86. Member Admin

Admin should be able to manage:

```text
Name
Role
Photo
Bio
Skills
GitHub
Personal site
Education
Departments
Projects
Joined date
Current/alumni status
Public visibility
```

Optional fields should not block publication.

---

# 87. Project Admin

Admin should manage:

```text
Title
Slug
Description
Content
Status
Category
Members
Robot
Technologies
Competition
GitHub
Gallery
Videos
Publication
```

---

# 88. Competition Admin

Admin should manage:

```text
Name
Slug
Organization
League
Year
Description
Website
Location
Date
Robots
Projects
Results
Awards
Media
Publication
```

---

# 89. Blog Admin

Admin should manage:

```text
Title
Slug
Excerpt
Body
Author
Cover
Tags
Related entities
Publish date
Status
SEO metadata
```

---

# 90. SEO Admin Fields

For important content, allow:

```text
SEO title
SEO description
OG image
```

If empty:

> Automatically derive them from the normal content.

This avoids forcing the admin to fill SEO fields for every page.

---

# 91. Accessibility

The application must be accessible.

Requirements include:

- Semantic HTML.
- Keyboard navigation.
- Visible focus.
- Accessible form labels.
- Meaningful alt text.
- Appropriate heading hierarchy.
- Sufficient contrast.
- Reduced-motion support.
- Accessible dialogs.
- Accessible navigation.

Do not treat accessibility as a later optional enhancement.

---

# 92. Mobile Accessibility

Touch targets should be sufficiently large.

Avoid:

- Tiny icon buttons.
- Hover-only information.
- Horizontal overflow.
- Text that becomes unreadable.

---

# 93. Browser Support

The site should support modern browsers.

Priority:

```text
Chrome
Safari
Firefox
Edge
```

Desktop and mobile.

Do not add legacy-browser complexity without a real requirement.

---

# 94. Deployment Architecture

A simple deployment should be preferred.

Conceptually:

```text
Internet
   ↓
Nginx
   ↓
Next.js application
   ↓
PostgreSQL
```

Media storage may exist alongside the application or in a separate storage system later.

---

# 95. Nginx

Nginx should handle:

- HTTPS termination.
- Reverse proxy.
- Static asset delivery where appropriate.
- Security headers where appropriate.
- Request limits where useful.

The Next.js server should not be exposed directly to the public internet if Nginx is already serving as the reverse proxy.

---

# 96. PostgreSQL

PostgreSQL should ideally be isolated from public network access.

The application should connect through an internal/local network path where possible.

Do not expose PostgreSQL publicly unless absolutely necessary.

---

# 97. Production Process

The application should run as a managed service.

Potential options:

```text
systemd
PM2
Docker
```

The final choice should be based on the existing server setup.

Do not introduce Docker solely for fashion if the deployment environment already has a stable process manager.

---

# 98. Deployment Environment

Production environment must have:

```text
NODE_ENV=production
```

and secure environment variables.

The build process should be reproducible.

---

# 99. CI/CD

A GitHub-based workflow is recommended.

At minimum:

```text
Push
 ↓
Lint
 ↓
Typecheck
 ↓
Test
 ↓
Build
 ↓
Deploy
```

The exact deployment automation can be implemented after the first stable production build.

---

# 100. GitHub Repository

The repository should remain organized.

Recommended high-level structure:

```text
src/
├── app/
├── components/
├── lib/
├── services/
├── hooks/
├── types/
└── styles/

prisma/
public/
scripts/
docs/
```

The exact structure may change according to implementation.

---

# 101. Documentation

The repository should contain:

```text
docs/
├── 01_PRODUCT_REQUIREMENTS.md
├── 02_BRAND_AND_VISUAL_DIRECTION.md
├── 03_INFORMATION_ARCHITECTURE.md
├── 04_TECHNICAL_ARCHITECTURE.md
└── ...
```

The documentation should evolve alongside the project.

---

# 102. Reference: PishTalk

The PishTalk repository should be treated as a **reference implementation**, not something to copy blindly.

Reference:

```text
https://github.com/ParsaSamiei/PishTalkrepo
```

The AI implementing the website should inspect the repository when access is available and identify useful patterns for:

- Admin authentication.
- Database access.
- Upload handling.
- Media management.
- Admin UI.
- Toast notifications.
- Deployment.
- Existing Next.js patterns.

---

# 103. PishTalk Reuse Rule

Reuse proven patterns where they make sense.

Do not copy:

- Branding.
- Page structure.
- Content models that do not apply.
- Visual styling.
- Business logic unrelated to robotics.

The robotics website should have its own architecture and identity.

---

# 104. Dependency Philosophy

Every dependency should have a reason.

Before adding a package, ask:

```text
Does Next.js already provide this?
Does React already provide this?
Can a small internal utility solve it?
Does this introduce server compatibility problems?
Does this increase maintenance?
```

Avoid dependency bloat.

---

# 105. Server Compatibility

Before adding packages, verify compatibility with the target VPS.

In particular:

> Do not introduce `sharp`.

Use:

> `jimp`

for required image processing.

---

# 106. TypeScript

TypeScript should be strict.

Avoid:

```ts
any;
```

unless there is a documented reason.

Prefer:

- Explicit types.
- Generated Prisma types.
- Zod-inferred types.
- Discriminated unions where appropriate.

---

# 107. API Architecture

Use Route Handlers or Server Actions depending on the use case.

Do not build a large REST API simply because an API exists.

Public pages can query server-side directly.

API endpoints should exist when they are actually useful, such as:

- Admin operations.
- Client-side interactive operations.
- External integrations.

---

# 108. Admin API Security

Every admin mutation must independently verify authentication.

Do not rely only on middleware.

For example:

```text
POST /api/admin/projects
```

must verify admin authorization before performing the database mutation.

---

# 109. Server Actions Security

Server Actions must also validate:

- Authentication.
- Input schema.
- Authorization.
- Resource ownership/permissions where applicable.

A server action is not automatically safe simply because it executes on the server.

---

# 110. Database Transactions

Use transactions when multiple related records must change atomically.

Example:

```text
Create Project
+
Connect Team Members
+
Connect Technologies
```

If one critical operation fails, the transaction should prevent partial inconsistent state where appropriate.

---

# 111. Data Integrity

The application should prevent orphaned or invalid relationships.

For example:

Deleting a project should have a defined policy for:

- Project members.
- Gallery items.
- Competition references.
- Blog references.

Do not allow accidental cascade deletion of important historical data.

---

# 112. Final Technical Principle

The implementation should be:

> **Simple underneath, sophisticated on the surface.**

The visitor should experience:

- A polished robotics website.
- Smooth interaction.
- Strong visual identity.
- Fast pages.
- Rich content.

The development team should experience:

- Understandable code.
- Predictable data models.
- Minimal unnecessary dependencies.
- Clear separation of concerns.
- Easy future expansion.

The architecture should allow IUST Robotics to grow from:

```text
One club
+
One competition
+
A few members
```

into:

```text
A long-term robotics organization
+
Multiple competitions
+
Multiple robots
+
Research
+
Projects
+
Alumni
+
Sponsors
+
A growing technical archive
```

without requiring a fundamental rewrite.

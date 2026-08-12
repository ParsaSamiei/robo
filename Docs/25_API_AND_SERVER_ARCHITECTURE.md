# `18_API_AND_SERVER_ARCHITECTURE.md`

# API & Server Architecture Specification

## 1. Purpose

This document defines how the robotics club website communicates between:

- Browser
- Next.js
- Server
- PostgreSQL
- File/media storage
- Admin panel
- External services

The architecture must support the current robotics club website while remaining flexible enough for future competitions, projects, research, events, members, and community activities.

---

# 2. Core Principle

The browser must **never communicate directly with PostgreSQL**.

The architecture must follow:

```text
Browser
   ↓
Next.js Server
   ↓
Application / Service Layer
   ↓
Prisma / ORM
   ↓
PostgreSQL
```

For media:

```text
Admin Browser
   ↓
Authenticated Server
   ↓
Validation
   ↓
Jimp processing
   ↓
Storage
   ↓
Database metadata
```

---

# 3. Technology

The server architecture should use:

- Next.js App Router
- TypeScript
- PostgreSQL
- Prisma or the project's selected ORM
- Next.js Server Actions where appropriate
- Route Handlers where an HTTP API is appropriate
- Jimp for image processing
- Toastify for client-side feedback

Do **not** use Sharp.

---

# 4. Server-Side Responsibilities

The server is responsible for:

- Authentication.
- Authorization.
- Database access.
- Input validation.
- Data sanitization.
- File validation.
- Image processing.
- Content publication state.
- Contact form processing.
- Join-team form processing.
- Admin mutations.
- SEO data retrieval.
- Public content retrieval.

---

# 5. Client Responsibilities

The browser is responsible for:

- Rendering UI.
- User interaction.
- Client-side validation.
- Animation.
- Three.js.
- Form interaction.
- Toast notifications.
- Gallery interaction.
- Language switching.

The browser must never be trusted for security decisions.

---

# 6. Server Authority

The server must be the authoritative source for:

```text
Authentication
Authorization
Content visibility
Admin permissions
File validation
Database mutations
```

---

# 7. Architecture Layers

Use the following conceptual architecture:

```text
┌─────────────────────────────┐
│           Browser           │
│ React / Next.js Client      │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│      Next.js Server         │
│ Server Components           │
│ Server Actions              │
│ Route Handlers              │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│       Service Layer         │
│ Team / Project / Gallery    │
│ Competition / Sponsor etc.  │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│      Data Access Layer      │
│ Prisma / ORM                │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│         PostgreSQL          │
└─────────────────────────────┘
```

---

# 8. Recommended Server Structure

A recommended project structure:

```text
src/
├── app/
│   ├── [locale]/
│   ├── admin/
│   └── api/
│
├── server/
│   ├── auth/
│   ├── services/
│   ├── repositories/
│   ├── validation/
│   ├── media/
│   └── utils/
│
├── lib/
│   ├── db/
│   ├── i18n/
│   └── utils/
│
├── components/
├── hooks/
└── types/
```

Exact naming may be adjusted during implementation.

---

# 9. Database Connection

Use a single properly configured database client.

Do not create a new PostgreSQL connection for every request manually.

For Prisma, use a shared Prisma client appropriate for Next.js development and production.

---

# 10. Environment Variables

Sensitive configuration must be stored in environment variables.

Examples:

```text
DATABASE_URL
DIRECT_URL
AUTH_SECRET
STORAGE_ENDPOINT
STORAGE_ACCESS_KEY
STORAGE_SECRET_KEY
```

Only variables explicitly intended for the browser may use a public prefix.

---

# 11. Never Expose Secrets

Never expose:

```text
DATABASE_URL
AUTH_SECRET
Storage secret
Admin credentials
Private API keys
```

to client-side JavaScript.

---

# 12. PostgreSQL

PostgreSQL should be the primary persistent database.

It should store structured information such as:

```text
Team members
Projects
Robots
Competitions
Results
Awards
Sponsors
Partners
Blog posts
News
Gallery metadata
Contact submissions
Join applications
```

---

# 13. Database as Source of Truth

Admin-managed content must be stored in PostgreSQL rather than hardcoded into React components.

---

# 14. Content vs Media

Do not store large binary images directly in normal PostgreSQL records unless there is a deliberate reason.

Prefer:

```text
PostgreSQL
    ↓
metadata + URL/key

Storage
    ↓
actual image
```

---

# 15. Media Metadata

A media record may contain:

```text
id
storageKey
url
mimeType
width
height
size
altText
caption
createdAt
visibility
```

---

# 16. Image Processing

Uploaded images should follow:

```text
Upload
 ↓
Authentication
 ↓
Validation
 ↓
Jimp
 ↓
Generate variants
 ↓
Store files
 ↓
Store metadata
```

---

# 17. Jimp Requirement

Use **Jimp** for image processing.

The project must **not introduce Sharp**.

This requirement exists because Sharp is incompatible with the target server environment.

---

# 18. Image Validation

The server must validate:

- MIME type.
- File extension.
- File size.
- Image dimensions.
- Actual file contents.

Do not rely solely on the extension.

---

# 19. File Size Limits

Set explicit limits for uploads.

Different limits may exist for:

```text
Team portraits
Project images
Gallery images
Sponsor logos
Blog images
```

The exact values should be configurable.

---

# 20. Image Dimensions

Reject or process images that are unreasonably large.

Do not allow an admin upload to accidentally consume excessive server memory.

---

# 21. Image Variants

Where appropriate, generate:

```text
thumbnail
medium
large
```

variants.

The frontend should use the appropriate size.

---

# 22. Image Optimization

Do not repeatedly process the same image on every request.

Process once during upload/update.

---

# 23. Storage

The architecture should abstract storage.

For example:

```text
MediaService
     ↓
StorageAdapter
     ↓
Local / S3-compatible / Object Storage
```

This allows hosting infrastructure to change without rewriting gallery logic.

---

# 24. Local Storage

Local filesystem storage may be used during development.

Do not assume local filesystem persistence is available in every production environment.

---

# 25. Production Storage

Production media storage should ideally use persistent storage appropriate to the hosting environment.

---

# 26. Storage Keys

Do not use user-provided filenames directly as storage paths.

Generate safe unique storage keys.

Example:

```text
gallery/
  2026/
    uuid-image.webp
```

---

# 27. File Names

Sanitize or replace user-provided filenames.

Avoid:

```text
../../../secret.txt
```

style path traversal.

---

# 28. Content Types

Store and validate MIME types.

Do not trust a browser-provided MIME type alone.

---

# 29. Public Media

Only media marked as public/published should be accessible through public pages.

---

# 30. Private Media

Potentially sensitive admin-uploaded files should not be publicly accessible until explicitly published.

---

# 31. Admin Authentication

The current requirement is:

> Simple username/password authentication is sufficient.

However, the implementation must still follow secure password handling.

---

# 32. Password Storage

Never store plaintext passwords.

Passwords must be stored using a modern password hashing algorithm such as:

```text
Argon2id
```

or another strong password hashing mechanism selected during implementation.

---

# 33. Authentication Session

After successful login, use a secure server-managed session.

Do not store the plaintext admin password in:

```text
localStorage
sessionStorage
cookies
```

---

# 34. Admin Cookies

Authentication cookies should use appropriate security attributes:

```text
HttpOnly
Secure
SameSite
```

with settings appropriate for the deployment environment.

---

# 35. Admin Authorization

Every admin mutation must verify the authenticated admin server-side.

Never rely on:

```text
/admin
```

being hidden from normal users.

---

# 36. Admin Route Protection

Admin routes must be protected before sensitive content/actions are rendered.

---

# 37. Admin API Protection

Every protected API endpoint or Server Action must independently verify authorization.

Do not assume that because the admin UI is protected, the endpoint is protected.

---

# 38. CSRF

State-changing operations must have appropriate CSRF protection based on the chosen authentication/session architecture.

Same-origin protections and framework mechanisms should be used where available.

---

# 39. Server Actions

Server Actions may be used for:

- Admin CRUD.
- Form submissions.
- Content publication.
- Gallery management.
- Sponsor management.
- Team management.

---

# 40. Server Action Rule

A Server Action is **not automatically trusted** because it is invoked from a React component.

It must still perform:

```text
Authentication
Authorization
Validation
Business rules
```

---

# 41. Route Handlers

Route Handlers should be used for:

- Public APIs where needed.
- Webhooks.
- External integrations.
- Endpoints that require conventional HTTP semantics.

---

# 42. Avoid API Overengineering

Do not build a REST API for every internal page.

If a feature is entirely internal to the Next.js application, a Server Action or server-side function may be more appropriate.

---

# 43. API Versioning

If a public/external API is introduced later, version it.

Example:

```text
/api/v1/...
```

Do not introduce versioning solely for internal Server Actions.

---

# 44. Public API

The initial website does not require a public developer API.

Do not expose database entities unnecessarily.

---

# 45. API Response Format

API responses should use consistent structures.

For example:

```json
{
  "success": true,
  "data": {}
}
```

and errors:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request."
  }
}
```

Do not expose internal stack traces.

---

# 46. Error Codes

Use stable machine-readable error codes where useful.

Examples:

```text
UNAUTHORIZED
FORBIDDEN
NOT_FOUND
VALIDATION_ERROR
UPLOAD_TOO_LARGE
INVALID_FILE
DATABASE_ERROR
INTERNAL_ERROR
```

---

# 47. Error Messages

Public error messages should be understandable.

Do not expose:

```text
PrismaClientKnownRequestError
PostgreSQL stack traces
Filesystem paths
```

---

# 48. Logging

Server logs should contain useful diagnostic information.

Avoid logging:

```text
Passwords
Authentication tokens
Session secrets
Sensitive form content
```

---

# 49. Error Logging

Unexpected server errors should be logged with enough context for debugging.

---

# 50. Production Logging

Production logs should be structured where practical.

Include information such as:

```text
timestamp
request identifier
route
status
duration
error category
```

but avoid unnecessary personal data.

---

# 51. Request IDs

A request identifier can be used to correlate:

```text
Frontend error
API request
Server log
Database operation
```

where useful.

---

# 52. Database Errors

Do not expose raw PostgreSQL errors to visitors.

Translate them into appropriate application errors.

---

# 53. Transactions

Use database transactions for operations that must succeed or fail together.

Example:

```text
Create project
+
Create project technology relationships
+
Create project team relationships
```

should be atomic when appropriate.

---

# 54. Transaction Scope

Do not keep transactions open while waiting for:

- External HTTP requests.
- Large uploads.
- Long-running processing.

---

# 55. Content Publishing

Publishing content should be atomic.

For example:

```text
Draft
 ↓
Publish
 ↓
Public
```

The database should be the authoritative state.

---

# 56. Content States

Support states such as:

```text
DRAFT
PUBLISHED
HIDDEN
ARCHIVED
```

where appropriate.

---

# 57. Visibility

Admin should be able to control whether content is publicly visible.

This applies especially to:

- Gallery items.
- Team members.
- Projects.
- Sponsors.
- Blog posts.
- News.

---

# 58. Draft Content

Draft content must never accidentally appear on the public website.

Public queries must explicitly filter for published/visible content.

---

# 59. Scheduled Content

The architecture may support future scheduling.

For example:

```text
publishAt
```

can allow future expansion.

It does not need to be implemented in the first version unless required.

---

# 60. Soft Deletion

For important content, consider soft deletion.

Example:

```text
deletedAt
```

This is preferable when accidental deletion would be costly.

---

# 61. Hard Deletion

Hard deletion should be used carefully.

Especially for:

- Gallery media.
- Team records.
- Competition history.
- Published articles.

---

# 62. Referential Integrity

Database relationships must use appropriate foreign keys and deletion behavior.

Do not leave orphaned:

```text
projectTeam
competitionResult
galleryItem
sponsor
```

records.

---

# 63. Slugs

Public content such as:

- Projects.
- Robots.
- Competitions.
- Blog posts.

should generally have stable slugs.

---

# 64. Slug Generation

Generate slugs server-side.

Do not trust client-provided slugs.

---

# 65. Slug Uniqueness

Slugs must be unique within their relevant content type.

---

# 66. Persian Slugs

The architecture should decide whether Persian slugs are allowed.

If English/ASCII slugs are preferred for SEO and sharing, generate stable Latin slugs even when Persian content exists.

The exact policy should follow:

`12_SEO.md`

---

# 67. Localization

The application supports:

```text
English
Persian
```

with language selection stored in a cookie according to:

`09_INTERNATIONALIZATION.md`

---

# 68. Localized Content

Admin content must support both English and Persian where applicable.

The admin interface itself remains English-only.

---

# 69. Localized Database Content

Where a content entity has translated fields, structure them explicitly.

For example:

```text
Project
├── titleEn
├── titleFa
├── descriptionEn
└── descriptionFa
```

or an equivalent translation model.

Do not store arbitrary JSON blobs when strongly typed fields are sufficient.

---

# 70. Missing Translation

If a translation is unavailable, define a predictable fallback policy.

For example:

```text
Requested language
      ↓
Translation exists?
   ├── Yes → use it
   └── No  → fallback language
```

The exact fallback behavior must follow `09_INTERNATIONALIZATION.md`.

---

# 71. RTL Server Rendering

The server must render the correct language and direction from the request context.

Do not wait until hydration to determine RTL/LTR.

---

# 72. Caching

Public content should be cacheable where appropriate.

Examples:

```text
Published projects
Published team members
Sponsors
Awards
Blog posts
```

---

# 73. Admin Freshness

After an admin changes public content, the relevant cached pages must be invalidated/revalidated.

---

# 74. Revalidation

Use Next.js cache invalidation/revalidation mechanisms where appropriate.

For example:

```text
revalidatePath()
revalidateTag()
```

may be used.

Do not blindly invalidate the entire site after every small mutation.

---

# 75. Cache Tags

Domain-based cache tags can be useful:

```text
projects
team
robots
competitions
sponsors
gallery
blog
```

---

# 76. Cache Strategy

Prefer:

```text
Public content
→ cached

Admin content
→ authenticated + fresh

User submissions
→ server processed
```

---

# 77. Dynamic Content

Pages requiring request-specific data should remain dynamic.

Do not cache:

- Admin pages.
- Personalized admin information.
- Sensitive submissions.

---

# 78. Contact Form

Contact form flow:

```text
Visitor
 ↓
ContactForm
 ↓
Server Action / API
 ↓
Validation
 ↓
Rate limiting
 ↓
Store submission
 ↓
Optional notification
 ↓
Success response
 ↓
Toastify
```

---

# 79. Contact Submission Storage

Contact submissions may be stored in PostgreSQL.

Fields may include:

```text
name
email
subject
message
createdAt
status
```

Avoid collecting unnecessary personal information.

---

# 80. Contact Spam Protection

The server should implement appropriate spam prevention.

Possible mechanisms include:

- Rate limiting.
- Honeypot.
- CAPTCHA/Turnstile if needed.

Do not immediately add a complicated CAPTCHA if simpler protection is sufficient.

---

# 81. Join Team Form

The Join Team flow may contain more information than the contact form.

Potential flow:

```text
Applicant
 ↓
Join form
 ↓
Validation
 ↓
Resume upload
 ↓
Storage
 ↓
Database record
 ↓
Admin review
```

---

# 82. Resume Handling

Resume files should be treated as potentially sensitive.

They should not be publicly accessible.

---

# 83. Resume Storage

Store resumes in private storage.

Admin access should require authentication.

---

# 84. Resume File Types

Allow only explicitly supported formats.

For example:

```text
PDF
DOCX
```

if required.

---

# 85. Resume Security

Do not execute uploaded files.

Do not serve them with executable content types.

Validate file contents and enforce size limits.

---

# 86. Join Application Status

The application may support:

```text
NEW
REVIEWING
CONTACTED
ACCEPTED
REJECTED
```

if required.

---

# 87. Contact / Join Notifications

The system may later integrate email notifications.

The architecture should keep notification delivery behind a service abstraction:

```text
NotificationService
```

rather than directly calling an email provider throughout the codebase.

---

# 88. Email Provider

No specific email provider needs to be hardcoded initially.

Possible future providers can be introduced behind the service boundary.

---

# 89. Social Links

The team should support:

```text
Instagram
LinkedIn
YouTube
GitHub
Telegram
```

These should be configurable through admin/settings rather than hardcoded throughout the site.

---

# 90. YouTube

YouTube links should be stored as URLs.

The architecture may later support:

```text
video URL
thumbnail
title
description
```

if a video section is added.

---

# 91. GitHub

GitHub should be represented as:

- Team GitHub.
- Project GitHub URLs.
- Member GitHub URLs.

Do not assume there is only one GitHub URL.

---

# 92. External Links

External URLs entered by admins should be validated.

At minimum:

```text
https://
```

should be required for public external links unless a supported protocol is intentionally allowed.

---

# 93. URL Validation

Do not blindly render arbitrary user-provided URLs into:

```text
href
src
```

without validation.

---

# 94. SSRF

Server-side URL fetching must not accept arbitrary URLs from admins/users without appropriate protections.

This matters if the application later fetches:

- Sponsor logos from URLs.
- GitHub data.
- YouTube metadata.
- External images.

---

# 95. External Image Import

If an admin provides an external image URL and the server downloads it, validate and restrict the destination.

Do not implement arbitrary server-side URL fetching.

---

# 96. GitHub Integration

The initial implementation does not need to fetch GitHub API data automatically.

A project GitHub link can simply be stored and displayed.

---

# 97. Future Integrations

The architecture should allow future services:

```text
GitHub
YouTube
Email
Analytics
Competition APIs
```

without coupling them to UI components.

---

# 98. Service Abstractions

Potential service boundaries:

```text
TeamService
ProjectService
RobotService
CompetitionService
SponsorService
GalleryService
BlogService
ContactService
JoinService
MediaService
NotificationService
```

---

# 99. Avoid Service Overengineering

Do not create 30 service files just because a service architecture is mentioned.

Create services when business logic becomes meaningful or reused.

---

# 100. Repository Abstraction

Repositories may be used for database-specific operations.

Example:

```text
ProjectRepository
TeamRepository
GalleryRepository
```

---

# 101. Repository vs Service

A useful distinction:

```text
Repository
→ database operations

Service
→ business rules
```

Example:

```text
ProjectRepository
→ createProject()

ProjectService
→ validate publication
→ verify related team members
→ create project
→ invalidate cache
```

---

# 102. Business Logic

Business rules should not live inside:

```text
React components
SQL strings
route handlers
```

when they are substantial.

---

# 103. Validation Layer

Use a schema validation library such as Zod if already included/approved.

Validation schemas should be shared where appropriate between:

```text
Client
Server
Admin
```

but server validation remains authoritative.

---

# 104. Example Validation

A project submission might validate:

```text
title
description
slug
status
technologies
GitHub URL
team members
images
```

---

# 105. Sanitization

Any rich text entered through the admin panel must be sanitized before rendering.

Never blindly render raw HTML from an administrator-provided content field without an explicit trust/sanitization strategy.

---

# 106. Markdown

If Markdown is used for blog content, render it through a controlled Markdown pipeline.

Do not execute arbitrary HTML/scripts.

---

# 107. Rich Text Editor

If a rich text editor is used, its output must still be sanitized server-side.

---

# 108. XSS Protection

Protect against:

```text
Stored XSS
Reflected XSS
DOM XSS
```

especially through:

- Blog content.
- Team bios.
- Project descriptions.
- Gallery captions.
- Admin-entered links.

---

# 109. SQL Injection

Use Prisma/parameterized queries.

Never concatenate raw user input into SQL.

---

# 110. Authentication Rate Limiting

Admin login attempts should be rate-limited.

This is especially important because the admin system uses username/password authentication.

---

# 111. Login Error Messages

Do not reveal whether a specific username exists.

Prefer a generic authentication error.

---

# 112. Session Expiration

Admin sessions should expire according to a reasonable security policy.

---

# 113. Logout

Logout must invalidate the server-side session/cookie appropriately.

---

# 114. Password Reset

If password reset is implemented later, it must use secure, short-lived, single-use reset tokens.

Do not implement password reset through predictable URLs.

---

# 115. Admin Audit Log

A future enhancement should be considered:

```text
AdminAuditLog
```

tracking important actions such as:

```text
Created project
Published blog post
Deleted gallery item
Changed sponsor
```

This is not necessarily required for v1.

---

# 116. Rate Limiting

Rate limiting should be applied to endpoints vulnerable to abuse.

Especially:

```text
Login
Contact
Join
File upload
Admin mutations
```

---

# 117. Rate Limit Storage

The implementation should use a mechanism appropriate to the deployment environment.

Do not rely on in-memory rate limiting if the application may run across multiple instances.

---

# 118. File Upload Rate Limiting

File uploads should have stricter limits than ordinary requests.

---

# 119. Request Size Limits

Set explicit request body limits where appropriate.

Do not allow unlimited multipart/form-data requests.

---

# 120. Database Query Limits

Public listing endpoints/pages should avoid loading unlimited records.

Use:

```text
pagination
limit
cursor
```

where appropriate.

---

# 121. Pagination

Blog, gallery, projects, and admin tables should support pagination when the dataset grows sufficiently.

---

# 122. Public Pagination

Public pagination should remain SEO-friendly.

Where appropriate, use crawlable URLs.

---

# 123. Admin Pagination

Admin tables can use more interactive pagination.

---

# 124. Search

A search system is not required initially unless the content volume justifies it.

The architecture should allow it later.

---

# 125. Filtering

Filters should be performed server-side when datasets become large.

For small datasets, client-side filtering may be acceptable.

---

# 126. Sorting

Admin tables should support server-side sorting when necessary.

---

# 127. Statistics

Team statistics should be derived from canonical data.

Avoid storing duplicate counters that can become inconsistent.

Example:

```text
Competition results
       ↓
Calculate
       ↓
Team statistics
```

---

# 128. Counter Caching

If statistics become computationally expensive, introduce caching or materialized data later.

Do not prematurely duplicate data.

---

# 129. Competition Architecture

The server must not assume:

```text
competition = SML
```

as a permanent global constant.

Instead:

```text
Competition
├── name
├── organization
├── league
├── year
├── description
├── status
└── results
```

---

# 130. SML

The current competition is:

> Smart Manufacturing League (SML)

It should simply be the first competition record.

---

# 131. Future Leagues

Future competitions should be added through data rather than code changes.

---

# 132. Robot Relationships

A robot may participate in:

- Multiple competitions.
- Multiple projects.
- Multiple years.

The database model should support many-to-many relationships where required.

---

# 133. Member Relationships

A member may participate in:

- Multiple projects.
- Multiple competitions.
- Multiple responsibilities.

Do not model a member as belonging to exactly one project.

---

# 134. Project Relationships

Projects may contain:

```text
members
robots
technologies
gallery
GitHub
competitions
```

depending on the content model.

---

# 135. Content Reuse

The same entity should be reusable across pages.

Example:

```text
Robot
 ↓
Homepage
 ↓
Project
 ↓
Competition
```

without duplicating robot records.

---

# 136. Data Consistency

If a member changes their name/photo/role, dependent pages should update automatically from the canonical member record.

---

# 137. Database Migrations

Schema changes must be performed through proper migrations.

Do not manually modify production tables without recording the change.

---

# 138. Migration Safety

Before production migrations:

- Backup database where appropriate.
- Test migration.
- Review destructive changes.
- Verify rollback/recovery strategy.

---

# 139. Seed Data

The project should provide development seed data for:

```text
Team members
Projects
Robots
Competitions
Sponsors
Blog posts
Gallery
```

using clearly fictional/demo content where real content is unavailable.

---

# 140. No Fake Production Content

Demo/placeholder data must never accidentally appear in production.

---

# 141. Database Backups

Production PostgreSQL must have an appropriate backup strategy.

Backup configuration belongs to deployment infrastructure but must be considered part of the system architecture.

---

# 142. Database Availability

The application should fail gracefully if PostgreSQL is temporarily unavailable.

Public users should receive a friendly error rather than a raw database error.

---

# 143. Read/Write Separation

Not necessary for v1.

Do not introduce replicas or separate read/write databases until actual scale requires them.

---

# 144. Background Jobs

Long-running operations should not block ordinary HTTP requests.

Potential future jobs:

```text
Image processing
Email sending
Video processing
Statistics generation
```

---

# 145. Initial Background Processing

For v1, Jimp processing may occur during an authenticated upload request if files remain within safe limits.

If processing becomes slow, move it to a background job architecture.

---

# 146. Timeouts

External requests and expensive operations must have appropriate timeouts.

Do not allow requests to hang indefinitely.

---

# 147. External Service Failure

If an optional service fails:

```text
YouTube
GitHub
Email
Analytics
```

the core website should continue working whenever possible.

---

# 148. Graceful Degradation

The website must remain useful if:

```text
Three.js fails
Analytics fails
Optional external API fails
```

---

# 149. 3D Independence

The homepage must not depend on successful Three.js initialization to display:

- Team identity.
- Main heading.
- Main CTA.
- Core information.

---

# 150. Contact Reliability

Contact submission should clearly tell the user whether the server accepted the message.

Do not show a success toast before the server confirms successful processing.

---

# 151. Admin Mutation Reliability

Admin actions should follow:

```text
Submit
 ↓
Server validation
 ↓
Database mutation
 ↓
Cache invalidation
 ↓
Success response
 ↓
Toast
```

---

# 152. Cache Invalidation

Never show an admin "published successfully" state if the database mutation failed.

---

# 153. Atomic Media Publishing

Where appropriate:

```text
Upload media
 ↓
Process media
 ↓
Create metadata
 ↓
Publish
```

must be handled safely so a failed processing step does not leave broken public content.

---

# 154. Orphaned Files

If a database operation fails after media upload, the system should clean up orphaned files where practical.

---

# 155. Orphaned Database Records

Likewise, deleting database records should not leave inaccessible media unless intentionally retained.

---

# 156. Media Deletion

Deleting media should consider:

```text
database metadata
+
all generated variants
```

---

# 157. Admin Preview

Admin previews should not accidentally expose unpublished content publicly.

Use authenticated preview mechanisms if preview is implemented.

---

# 158. Draft URLs

Do not make predictable public draft URLs that expose unpublished content.

---

# 159. Server-Side Rendering

Public pages should favor server rendering for:

- SEO.
- Performance.
- Initial content.
- Accessibility.

---

# 160. Hydration

Client components must produce deterministic markup where required.

Avoid hydration mismatches caused by:

```text
Date.now()
window
random values
browser-only APIs
```

during initial render.

---

# 161. Dates

When rendering dates, use a consistent server/client strategy to avoid hydration mismatch.

---

# 162. Locale

Language and locale should be determined consistently between server and client.

---

# 163. Cookies

The language preference cookie should be read server-side when determining page direction/content.

---

# 164. Cookie Security

The language cookie is not sensitive, but should still use sensible attributes.

Admin authentication cookies require stronger security configuration.

---

# 165. Admin and Public Separation

The public application and admin panel may share infrastructure but must have clearly separated:

```text
routes
permissions
components
data access
```

---

# 166. Admin URL

The exact admin route may be:

```text
/admin
```

or another configured route.

Do not rely on obscurity for security.

---

# 167. Admin Language

The admin interface should be English-only.

It should nevertheless be capable of editing both:

```text
English content
Persian content
```

---

# 168. Admin Translation Editor

For localized entities, the admin UI should make the two languages clear.

Example:

```text
┌───────────────────────────┐
│ English                   │
│ Title:                    │
│ [.......................] │
└───────────────────────────┘

┌───────────────────────────┐
│ Persian                   │
│ عنوان:                    │
│ [.......................] │
└───────────────────────────┘
```

---

# 169. Translation Validation

The admin should clearly identify missing required translations where appropriate.

---

# 170. Public Content Query

Public queries should generally follow:

```text
WHERE published = true
```

plus relevant visibility/date rules.

---

# 171. Admin Query

Admin queries may return:

```text
draft
published
hidden
archived
```

content depending on permissions.

---

# 172. Authorization Model

The initial system only requires an admin role.

Architecture should still leave room for future roles:

```text
ADMIN
EDITOR
MEDIA_MANAGER
```

if the team grows.

---

# 173. Do Not Overbuild Roles

Do not implement a complex RBAC system in v1 unless required.

A simple admin role is sufficient initially.

---

# 174. Admin Ownership

All admin actions should execute under an authenticated admin identity.

---

# 175. Public Read Access

Public visitors can read only content intentionally published.

---

# 176. Public Write Access

Public visitors can only create explicitly permitted submissions:

```text
Contact
Join Team
```

and possibly future event registrations.

---

# 177. Database Access Pattern

Never do this:

```text
Client
 ↓
Prisma
 ↓
PostgreSQL
```

Correct:

```text
Client
 ↓
Next.js Server
 ↓
Service
 ↓
Repository / Prisma
 ↓
PostgreSQL
```

---

# 178. Final Request Flow

A typical public page:

```text
Visitor
   ↓
Next.js Request
   ↓
Locale Detection
   ↓
Server Component
   ↓
Service
   ↓
Database
   ↓
Published Content
   ↓
React Server Components
   ↓
HTML
   ↓
Browser
```

---

# 179. Final Admin Flow

A typical admin mutation:

```text
Admin
   ↓
Login
   ↓
Secure Session
   ↓
Admin Panel
   ↓
Form
   ↓
Server Action / API
   ↓
Authentication
   ↓
Authorization
   ↓
Validation
   ↓
Business Logic
   ↓
Database
   ↓
Media / Cache updates
   ↓
Response
   ↓
Toastify
```

---

# 180. Final Media Flow

```text
Admin
   ↓
Upload
   ↓
Authentication
   ↓
File validation
   ↓
Jimp
   ↓
Generate variants
   ↓
Storage
   ↓
Database metadata
   ↓
Publication state
   ↓
Public website
```

---

# 181. Final Security Boundary

The most important architectural rule is:

> **Anything coming from the browser is untrusted input.**

This includes:

- Forms.
- URLs.
- IDs.
- Status values.
- File metadata.
- Hidden fields.
- Client state.
- Admin UI state.

The server must validate everything important.

---

# 182. Final Server Principle

The server architecture should remain:

```text
Simple enough for a student robotics team
             +
Secure enough for a public production website
             +
Flexible enough for future growth
```

Do **not** build enterprise-scale infrastructure before it is needed.

The initial system should be a clean:

```text
Next.js
   +
PostgreSQL
   +
Prisma
   +
Server Actions / Route Handlers
   +
Jimp
   +
Object/File Storage
```

architecture that can later grow into a more distributed system if the robotics club actually needs it.

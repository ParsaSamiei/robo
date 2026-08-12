# `15_SECURITY.md`

# Security Specification

## 1. Purpose

This document defines the security requirements for the robotics club website.

The website is primarily a public-facing robotics club platform, but it also contains an authenticated admin panel capable of managing:

- Team members.
- Projects.
- Robots.
- Competitions.
- Results.
- Awards.
- News.
- Blog posts.
- Gallery/media.
- Sponsors.
- Partners.
- Recruitment applications.
- Contact submissions.
- Site configuration.

Because the admin panel can modify public content and handle uploaded files, security must be designed into the application from the beginning.

The goal is:

> **Keep the public website open and easy to access while making administrative functionality strictly controlled.**

---

# 2. Security Priorities

Security priorities are:

```text
1. Protect admin access
2. Protect uploaded files
3. Protect user-submitted data
4. Prevent unauthorized content modification
5. Protect database integrity
6. Prevent common web attacks
7. Minimize exposed attack surface
8. Maintain useful auditability
```

---

# 3. Threat Model

The application should assume that attackers may attempt:

```text
Public website
      ↓
Form abuse
      ↓
API abuse
      ↓
File upload attacks
      ↓
Authentication attacks
      ↓
Admin takeover
      ↓
Database compromise
```

The implementation must not assume that users are trustworthy simply because the website represents a university robotics club.

---

# 4. Security Architecture

The intended architecture is:

```text
                    Internet
                       │
             ┌─────────▼─────────┐
             │      Nginx        │
             │ TLS / Rate Limit  │
             └─────────┬─────────┘
                       │
                ┌──────▼──────┐
                │   Next.js   │
                │             │
                │ Public      │
                │ Admin       │
                │ API/Actions │
                └──────┬──────┘
                       │
             ┌─────────▼─────────┐
             │    PostgreSQL     │
             └───────────────────┘
```

---

# 5. HTTPS

Production traffic must use HTTPS.

The website must not expose:

- Admin credentials.
- Session cookies.
- Contact submissions.
- Recruitment data.

over unencrypted HTTP.

---

# 6. HTTP → HTTPS

HTTP should redirect to HTTPS.

The production site should not maintain separate unsecured functionality on HTTP.

---

# 7. TLS

Use modern TLS configuration.

Avoid obsolete protocols and insecure cipher suites.

TLS configuration should be managed at the reverse proxy/server layer.

---

# 8. HSTS

After HTTPS has been correctly configured and verified, production may enable:

```text
Strict-Transport-Security
```

with an appropriate policy.

Do not enable an aggressive HSTS configuration before confirming that every required production subdomain supports HTTPS.

---

# 9. Secure Cookies

The language preference is stored in a cookie.

The language cookie does **not** contain authentication information.

Admin authentication cookies/sessions must use:

```text
Secure
HttpOnly
SameSite
```

with an appropriate SameSite policy.

---

# 10. Authentication

The admin panel requires authentication.

The initial requirement is:

> Username + password is sufficient.

However, the implementation must still use secure authentication practices.

---

# 11. Password Storage

Never store admin passwords in plaintext.

Never store passwords directly in:

```text
PostgreSQL
.env
configuration files
```

as readable values.

---

# 12. Password Hashing

Passwords must be stored using a modern password hashing algorithm.

Recommended options include:

```text
Argon2id
```

or another strong password hashing scheme appropriate to the chosen authentication implementation.

Do not use:

```text
MD5
SHA-1
plain SHA-256
```

for password storage.

---

# 13. Admin Username

The admin username should not be exposed publicly.

Do not expose admin account information through public APIs.

---

# 14. Login Endpoint

The login endpoint must:

- Validate input.
- Rate-limit attempts.
- Avoid revealing whether the username exists.
- Return generic authentication failures.

Avoid responses such as:

> Username exists but password is wrong.

Prefer:

> Invalid credentials.

---

# 15. Brute Force Protection

Admin login must be protected against repeated attempts.

Use rate limiting based on appropriate identifiers such as:

```text
IP
Account
Request frequency
```

Avoid relying exclusively on IP-based limits because attackers can distribute requests across addresses.

---

# 16. Login Rate Limiting

Repeated failed attempts should progressively slow or block further attempts.

The exact thresholds should be configurable.

---

# 17. Session Management

Admin sessions should:

- Expire.
- Be invalidated on logout.
- Use secure cookies.
- Not expose authentication state to client-side JavaScript unnecessarily.

---

# 18. Session Expiration

Admin sessions should have a reasonable lifetime.

Do not create effectively permanent authentication sessions.

---

# 19. Logout

Logout must invalidate the active session.

Simply redirecting the user to `/admin/login` is not sufficient.

---

# 20. Session Fixation

The application must prevent session fixation.

After successful authentication, the authenticated session identifier should not remain equivalent to an unauthenticated session identifier where the chosen authentication architecture makes session rotation applicable.

---

# 21. Admin Authorization

Authentication answers:

> Who are you?

Authorization answers:

> Are you allowed to do this?

Every admin operation must verify authorization server-side.

---

# 22. Never Trust the UI

Hiding an admin button is **not** authorization.

For example:

```text
Admin UI:
Delete project button hidden
```

does not mean the user cannot call:

```text
DELETE /api/projects/123
```

Authorization must happen on the server.

---

# 23. Server-Side Authorization

Every mutation must verify the authenticated admin session before executing.

This includes:

```text
Create
Update
Delete
Publish
Unpublish
Upload
Reorder
```

---

# 24. Admin Routes

All admin routes should require authentication.

Conceptually:

```text
/admin
/admin/projects
/admin/team
/admin/gallery
/admin/sponsors
```

must not expose sensitive functionality to unauthenticated users.

---

# 25. Admin API

Admin API endpoints/server actions must independently verify authentication.

Do not assume that because a request came from an admin page it is trusted.

---

# 26. Public API Separation

Public endpoints should expose only information intentionally published.

For example:

```text
Public:
published projects

Admin:
published + draft + archived projects
```

---

# 27. Draft Protection

Draft content must never accidentally appear publicly.

Database queries for public content should explicitly filter unpublished records.

---

# 28. Preview Mode

If an admin preview system is introduced, preview access must be authenticated and protected.

Do not expose draft content through guessable URLs.

---

# 29. IDOR Protection

The application must prevent insecure direct object references.

Example attack:

```text
/admin/projects/42
```

changing to:

```text
/admin/projects/43
```

must not allow access unless the authenticated user is authorized to manage that resource.

---

# 30. UUIDs / IDs

Internal identifiers do not need to be treated as secrets.

However, using unpredictable identifiers where appropriate can reduce accidental enumeration.

Security must still rely on authorization rather than ID secrecy.

---

# 31. SQL Injection

Never construct SQL queries using raw untrusted string concatenation.

Use:

- Prisma parameterized queries.
- Safe query APIs.
- Proper parameterization for any raw SQL.

---

# 32. Raw SQL

If raw SQL is required, parameters must be safely bound.

Never do:

```text
"SELECT * FROM users WHERE name = '" + input + "'"
```

---

# 33. Input Validation

All external input must be validated server-side.

Examples:

```text
Contact form
Join form
Admin forms
Project metadata
Sponsor data
Gallery metadata
URLs
```

---

# 34. Schema Validation

Use a consistent validation system such as a schema validator.

A common choice is:

```text
Zod
```

if compatible with the project architecture.

---

# 35. Client Validation

Client-side validation is useful for UX.

It is **not** a security boundary.

Every important validation rule must also run server-side.

---

# 36. Type Validation

Validate:

- Type.
- Length.
- Format.
- Allowed values.
- Range.

Do not trust TypeScript types alone.

TypeScript disappears at runtime.

---

# 37. String Length Limits

All user-controlled strings should have reasonable limits.

Examples:

```text
Name
Title
Description
Bio
Message
Slug
```

This prevents accidental or malicious oversized payloads.

---

# 38. Rich Text

If blog posts support HTML/rich text, the content must be sanitized.

Never directly render arbitrary user-provided HTML.

---

# 39. XSS

The application must protect against Cross-Site Scripting.

Potential sources include:

```text
Blog content
Team bios
Project descriptions
Sponsor descriptions
Contact submissions
Admin-entered HTML
Query parameters
```

---

# 40. React Escaping

Normal React rendering provides useful escaping.

Do not bypass it unnecessarily.

---

# 41. `dangerouslySetInnerHTML`

Use:

```text
dangerouslySetInnerHTML
```

only when absolutely necessary.

Any HTML passed into it must be sanitized.

---

# 42. HTML Sanitization

If rich HTML is supported:

```text
Input
 ↓
Sanitize
 ↓
Store/render
```

not:

```text
Input
 ↓
Database
 ↓
dangerouslySetInnerHTML
```

---

# 43. Stored XSS

Stored XSS is especially important because admin-created content is displayed to many visitors.

A malicious payload inserted into:

```text
project description
```

could affect every visitor.

Therefore all rich content must be treated carefully.

---

# 44. Reflected XSS

URL parameters and query strings must not be inserted into HTML unsafely.

---

# 45. DOM-Based XSS

Client-side code must avoid inserting untrusted strings into the DOM using unsafe APIs.

Avoid unnecessary use of:

```text
innerHTML
eval
Function(...)
```

---

# 46. Content Security Policy

Consider implementing a Content Security Policy.

The policy should be compatible with:

- Next.js.
- Three.js.
- YouTube embeds.
- Required external resources.

Do not create an unnecessarily permissive policy such as:

```text
script-src *
```

---

# 47. Security Headers

The production site should implement appropriate security headers.

Potential headers include:

```text
Content-Security-Policy
X-Content-Type-Options
Referrer-Policy
Permissions-Policy
Strict-Transport-Security
```

where appropriate.

---

# 48. X-Content-Type-Options

Use:

```text
X-Content-Type-Options: nosniff
```

to reduce MIME-sniffing risks.

---

# 49. Referrer Policy

Use a reasonable referrer policy such as:

```text
strict-origin-when-cross-origin
```

unless the application's requirements dictate otherwise.

---

# 50. Permissions Policy

Disable browser capabilities that the site does not need.

For example, the website probably does not require:

```text
microphone
camera
geolocation
```

unless a future feature explicitly introduces them.

---

# 51. Clickjacking

Prevent unauthorized embedding of administrative pages and sensitive functionality.

Use appropriate:

```text
frame-ancestors
```

CSP policy and/or related protections.

---

# 52. CSRF

State-changing requests must be protected against Cross-Site Request Forgery where the authentication mechanism makes CSRF relevant.

This is particularly important for:

```text
Admin mutations
Contact submissions
Recruitment submissions
```

---

# 53. SameSite Cookies

Authentication cookies should use an appropriate SameSite policy to reduce CSRF exposure.

---

# 54. Server Actions

If Next.js Server Actions are used, treat them as public network entry points.

They must:

- Authenticate where required.
- Authorize.
- Validate input.
- Rate-limit sensitive operations.

Do not assume Server Actions are private because they are not traditional REST endpoints.

---

# 55. API Routes

API routes must follow the same rules.

A route being hidden from the frontend does not make it secure.

---

# 56. File Upload Security

File uploads are one of the highest-risk areas of the application.

The site may allow uploads for:

- Gallery images.
- Team photos.
- Project images.
- Sponsor logos.
- Resumes.
- Other recruitment documents.

Every upload must be validated.

---

# 57. File Type Validation

Never trust:

```text
filename extension
Content-Type header
```

alone.

Validate the actual file content where practical.

---

# 58. Allowed Image Types

For normal image uploads, restrict formats to an explicit allowlist.

For example:

```text
JPEG
PNG
WebP
```

and other formats only if specifically required.

---

# 59. SVG Uploads

SVG files require special consideration because SVG can contain active content/scripts.

Do not allow arbitrary SVG uploads unless they are sanitized and handled safely.

---

# 60. Resume Uploads

If the recruitment system supports resumes, explicitly define allowed formats.

For example:

```text
PDF
```

and potentially other formats if genuinely required.

---

# 61. Executable Files

Never allow arbitrary executable uploads.

Reject files such as:

```text
.exe
.sh
.bat
.js
.php
```

when they are not required.

---

# 62. Upload Size Limits

Every upload endpoint must enforce maximum file sizes.

This protects against:

- Memory exhaustion.
- Disk exhaustion.
- Denial-of-service attacks.

---

# 63. Image Dimension Limits

Image uploads should also have maximum dimensions.

A malicious or accidental extremely large image should not trigger massive Jimp processing.

---

# 64. Jimp Requirement

Image processing must use:

> **Jimp**

and not Sharp.

Jimp processing must itself be protected against oversized or malicious images.

---

# 65. Image Processing Pipeline

Recommended flow:

```text
Upload
  ↓
Authentication / authorization
  ↓
File size validation
  ↓
MIME/content validation
  ↓
Dimension validation
  ↓
Jimp processing
  ↓
Generate safe variants
  ↓
Store
  ↓
Database metadata
```

---

# 66. File Names

Do not use the original uploaded filename directly as the storage filename.

Generate safe unique filenames.

For example:

```text
random-id.webp
```

rather than:

```text
../../../dangerous-file
```

---

# 67. Path Traversal

Uploaded filenames and paths must never be allowed to control arbitrary filesystem locations.

---

# 68. Upload Storage

Uploaded files should ideally be stored outside executable application paths.

They should not become server-side executable code.

---

# 69. Public Media

Public gallery images can be served publicly.

Sensitive files such as resumes should not be publicly accessible.

---

# 70. Resume Privacy

Recruitment resumes contain potentially sensitive personal information.

They must not be stored in publicly accessible URLs.

---

# 71. Resume Access

Resume files should only be accessible to authorized administrators.

Do not expose them through predictable:

```text
/uploads/resumes/name.pdf
```

URLs.

---

# 72. Contact Submissions

Contact form submissions should be treated as private data.

They must not be exposed through public APIs.

---

# 73. Recruitment Data

Join-team submissions should be considered private.

Only authorized admins should access them.

---

# 74. Data Minimization

Do not collect information that the team does not actually need.

If a field does not serve a clear purpose:

> Do not collect it.

---

# 75. Personal Data

Potential personal data includes:

```text
Name
Email
Phone
Resume
Education
GitHub
Personal website
Message
```

Only collect and store what is necessary.

---

# 76. Public Team Profiles

Team member information is intentionally public where the member chooses/provides it.

However, optional fields should remain optional.

Do not expose private contact information merely because it exists in the database.

---

# 77. Email Addresses

If member email addresses are stored for administration, they should not automatically be rendered publicly.

---

# 78. Social Links

Public social links can be shown intentionally.

Validate URLs before storing them.

---

# 79. URL Validation

Sponsor, GitHub, YouTube, LinkedIn, Instagram, Telegram, and personal-site URLs should be validated.

At minimum, enforce appropriate URL schemes such as:

```text
https:
http:
```

where HTTP is genuinely necessary.

---

# 80. Dangerous URL Schemes

Reject schemes such as:

```text
javascript:
data:
vbscript:
```

for normal external links.

---

# 81. Open Redirects

Do not create arbitrary redirect endpoints that accept unvalidated external destinations.

---

# 82. External Links

External links should not automatically receive unsafe attributes or behavior.

If opening links in a new tab, use appropriate:

```text
rel="noopener noreferrer"
```

where applicable.

---

# 83. Third-Party Content

The website may embed YouTube.

Third-party content should be isolated as much as possible.

Do not grant third-party scripts unnecessary access to the application.

---

# 84. YouTube

YouTube embeds should only be loaded where needed.

Do not load arbitrary iframe URLs from user input without validation.

---

# 85. iframe Security

Only allow known trusted origins for iframes.

For example, YouTube should not mean:

```text
any arbitrary URL supplied by an admin
```

unless the feature explicitly supports trusted arbitrary embeds and validates them.

---

# 86. Social Embeds

Avoid loading entire social media SDKs simply to display links.

A normal external link is preferable when an embed provides little value.

---

# 87. PostgreSQL Security

PostgreSQL must not be directly exposed to the public internet unless absolutely necessary.

Prefer:

```text
Internet
 ↓
Next.js
 ↓
PostgreSQL
```

rather than:

```text
Internet
 ↓
PostgreSQL :5432
```

---

# 88. Database Credentials

Database credentials must be stored in environment variables or a secure secret-management mechanism.

Never commit them to Git.

---

# 89. `.env`

Do not commit:

```text
.env
.env.production
```

containing secrets.

---

# 90. Public Environment Variables

Next.js variables beginning with:

```text
NEXT_PUBLIC_
```

are exposed to the browser.

Never put:

```text
DATABASE_URL
ADMIN_SECRET
API_SECRET
```

in public environment variables.

---

# 91. Secret Rotation

The project should have a process for rotating:

- Database passwords.
- Admin credentials.
- Session secrets.
- API keys.
- Third-party credentials.

---

# 92. GitHub

Secrets must never be committed to the repository.

Before pushing:

```text
.env
credentials
private keys
database dumps
resumes
```

must be excluded.

---

# 93. Git History

If a secret is accidentally committed, deleting it from the latest commit is not sufficient.

The secret should be considered compromised and rotated.

---

# 94. `.gitignore`

The repository should ignore:

```text
.env*
uploads/
private media/
database dumps/
logs/
generated secrets/
```

as appropriate.

---

# 95. Production Logs

Logs must not contain:

- Passwords.
- Session tokens.
- Authentication cookies.
- Resume contents.
- Full private submissions.

---

# 96. Error Messages

Production errors should not expose:

```text
Stack traces
Database credentials
Filesystem paths
SQL queries
Internal server details
```

to visitors.

---

# 97. Development Errors

Detailed errors are useful during development but must not leak into production responses.

---

# 98. Database Errors

Do not return raw PostgreSQL/Prisma errors to users.

Instead:

```text
Internal server error
```

with a server-side log containing the diagnostic details.

---

# 99. Rate Limiting

Rate limiting should protect public endpoints that can be abused.

Especially:

```text
Login
Contact form
Join form
Upload
API endpoints
```

---

# 100. Contact Form Abuse

The contact form should be protected against:

- Spam.
- Flooding.
- Automated submissions.

Potential mechanisms:

```text
Rate limiting
Honeypot
CAPTCHA / Turnstile if necessary
```

Use the least intrusive solution that works.

---

# 101. Recruitment Form Abuse

The Join Team form should have similar protections.

Do not immediately add CAPTCHA if rate limiting and a honeypot adequately prevent abuse.

---

# 102. Honeypot

A hidden honeypot field can be used to catch simple automated spam.

It must remain invisible and irrelevant to real users.

---

# 103. CAPTCHA

CAPTCHA should be a fallback, not the default UX.

Introduce it if abuse becomes significant.

---

# 104. Admin Upload Abuse

Even authenticated admins can accidentally upload huge or malformed files.

Upload limits must therefore remain enforced for admin users.

---

# 105. Denial of Service

The application should reduce easy DoS vectors by:

- Rate limiting.
- Payload limits.
- Upload limits.
- Query limits.
- Pagination.
- Expensive operation protection.

---

# 106. Expensive Operations

Operations such as:

```text
Large Jimp processing
Huge gallery queries
Complex database searches
3D generation
```

must not be triggerable without reasonable limits.

---

# 107. Pagination Security

Do not allow:

```text
?pageSize=999999999
```

to cause enormous database queries.

Clamp pagination values server-side.

---

# 108. Search Limits

If search is added, enforce sensible:

- Query length.
- Result limits.
- Rate limits.

---

# 109. Slug Security

Slugs must be validated and normalized.

Do not allow arbitrary HTML or path traversal through slugs.

---

# 110. Content Publishing

Publishing content should require authenticated admin access.

A draft must never become public merely because its URL is guessed.

---

# 111. Delete Operations

Destructive actions should require deliberate confirmation.

For example:

```text
Delete project?
```

---

# 112. Server-Side Delete Authorization

The confirmation dialog is UX only.

The server must still verify:

```text
authenticated admin
+
valid resource
```

before deletion.

---

# 113. Soft Delete

For important content, consider soft deletion or archival rather than immediate permanent deletion.

Potentially useful for:

```text
Projects
Articles
Competition results
Team members
Gallery
```

---

# 114. Auditability

Important administrative actions should be auditable where practical.

Potential events:

```text
Admin login
Content created
Content published
Content unpublished
Content deleted
Media uploaded
Sponsor modified
```

---

# 115. Audit Log

If implemented, audit logs should record:

```text
timestamp
action
resource
admin
```

without storing unnecessary sensitive content.

---

# 116. Audit Log Protection

Admins should not be able to modify audit history through normal content-management operations.

---

# 117. Admin Account Count

The initial system may use a simple admin account.

If the team grows, the architecture should allow future support for multiple administrators without redesigning the entire application.

---

# 118. Role-Based Access

Roles are not required initially.

However, the authorization layer should not make future roles impossible.

Potential future roles:

```text
Super Admin
Content Admin
Media Admin
Recruitment Admin
```

---

# 119. Principle of Least Privilege

Every future role should receive only the permissions it needs.

---

# 120. Admin URL

The admin URL may be:

```text
/admin
```

or another path.

Security must never depend on hiding the admin path.

Changing `/admin` to an obscure URL is not a security mechanism.

---

# 121. Robots.txt

The admin area can be excluded from search engine indexing.

However:

> `robots.txt` is not access control.

Authentication must still protect it.

---

# 122. Sitemap

The public sitemap should include only public content.

Do not include:

```text
/admin
drafts
private submissions
private files
```

---

# 123. Search Engine Privacy

Private recruitment/contact information must never become indexable.

---

# 124. Caching Private Data

Do not publicly cache responses containing:

- Admin data.
- Resumes.
- Contact submissions.
- Recruitment submissions.

---

# 125. Cache Separation

Public cache:

```text
Published content
```

Private/non-cacheable:

```text
Admin
Recruitment
Contact
Authentication
```

---

# 126. Authentication Cache Safety

Authenticated responses must not accidentally be stored in a shared public cache.

---

# 127. CSRF + Caching

State-changing requests should not be cacheable.

---

# 128. Database Backups

PostgreSQL backups should be protected with appropriate access controls.

Backups contain potentially sensitive information.

---

# 129. Backup Security

Backups must not be:

- Publicly downloadable.
- Stored in GitHub.
- Accessible from `/public`.
- Linked from the website.

---

# 130. Backup Testing

A backup that has never been restored is not a verified backup.

Periodically verify that the database can actually be restored.

---

# 131. Dependency Security

Dependencies must be kept reasonably up to date.

Monitor for known vulnerabilities in:

```text
Next.js
React
Prisma
Jimp
Three.js
React Toastify
```

and other production dependencies.

---

# 132. Dependency Addition

Before adding a package, evaluate:

- Maintenance status.
- Security history.
- Bundle impact.
- License.
- Necessity.

---

# 133. Lockfile

Commit the package manager lockfile.

This helps ensure reproducible builds.

---

# 134. Production Installation

Production dependencies should be installed from the lockfile.

Avoid silently resolving different dependency versions during deployment.

---

# 135. npm Scripts

Deployment scripts must not execute untrusted user input.

Avoid dynamically constructing shell commands from form fields.

---

# 136. Command Injection

Never pass user-controlled values directly into shell commands.

Especially:

```text
filename
URL
slug
search query
uploaded file name
```

---

# 137. Child Processes

Avoid spawning shell processes from application requests unless absolutely necessary.

If unavoidable, use strict argument handling and allowlists.

---

# 138. SSR Security

Server-side rendering code must treat request data as untrusted.

Do not assume:

```text
headers
cookies
query parameters
```

are safe.

---

# 139. Request Headers

Do not blindly trust security-sensitive values from arbitrary request headers.

---

# 140. Host Header

Avoid constructing security-sensitive URLs directly from an untrusted Host header.

Use configured canonical URLs where appropriate.

---

# 141. Canonical URL

Production should have a configured canonical site URL.

This is useful for:

- SEO.
- Secure redirects.
- Metadata.
- OAuth/third-party integrations if added later.

---

# 142. Open Graph

Social metadata can include public content only.

Do not accidentally expose:

- Draft titles.
- Internal admin data.
- Private contact information.

---

# 143. Public API Data

Before exposing a database model through an API, explicitly define which fields are public.

Do not serialize entire database objects by default.

---

# 144. Serialization

Avoid returning objects containing internal fields such as:

```text
passwordHash
sessionId
internalNotes
privateEmail
applicationStatus
```

to the browser.

---

# 145. Prisma Models

Database models should distinguish between:

```text
Public content
Internal/admin metadata
```

where useful.

---

# 146. Internal Notes

Admin-only notes must never appear in public project/team/member responses.

---

# 147. Sponsor Management

Sponsor records may contain internal information such as:

```text
contact person
private email
contract notes
```

if added later.

These fields must remain admin-only.

---

# 148. Team Member Privacy

Public profiles should expose only fields intentionally marked as public.

For example:

```text
Public:
Name
Role
Bio
Skills
GitHub
Personal site

Private:
Internal notes
Private email
Administrative information
```

---

# 149. Alumni Privacy

The same principle applies to alumni.

Being listed as an alumnus should not imply that every stored field becomes public.

---

# 150. Contact Information

The public Contact page may contain official team contact information.

Private administrative contact details must remain private.

---

# 151. Social Engineering

The admin system should not expose unnecessary information that could help attackers target administrators.

Avoid exposing:

- Admin usernames.
- Admin emails unnecessarily.
- Internal infrastructure details.

---

# 152. Admin Error Messages

Avoid:

> `admin@domain.com does not exist`

or:

> `Database connection failed: postgres://...`

Use generic public-facing messages.

---

# 153. Security Notifications

If practical, notify administrators of important events such as:

- Successful login from a new environment.
- Multiple failed login attempts.
- Password changes.

These can be introduced later if the authentication system supports them.

---

# 154. Two-Factor Authentication

Not required for the initial implementation.

However, the architecture should not prevent adding 2FA later.

Given that the admin panel controls the public website, 2FA is a strong future improvement.

---

# 155. Admin Password Policy

The admin password should be strong and unique.

Avoid forcing unnecessarily complex composition rules if a strong password/passphrase is used.

---

# 156. Password Reset

If a password-reset system is added later:

- Tokens must expire.
- Tokens must be single-use.
- Tokens must be random.
- Tokens must not be logged.
- Responses must not reveal account existence.

---

# 157. No Default Credentials

Production must not use:

```text
admin / admin
admin / password
root / root
```

or similar defaults.

---

# 158. Development Credentials

Development credentials must never accidentally be used in production.

---

# 159. Environment Separation

Maintain separate configuration for:

```text
Development
Staging
Production
```

where practical.

---

# 160. Production Debugging

Never enable development/debug mode in production.

---

# 161. Source Maps

Evaluate whether production source maps should be publicly exposed.

Do not unnecessarily expose internal source information.

---

# 162. Error Tracking

If an external error tracking service is introduced, ensure sensitive data is filtered before transmission.

---

# 163. Third-Party Services

Every external service should be evaluated for:

- Data collected.
- Security.
- Privacy.
- Required permissions.
- Failure behavior.

---

# 164. GitHub Integration

Project GitHub links are public links.

The website does not need GitHub API credentials simply to link to repositories.

Avoid unnecessary API integration.

---

# 165. YouTube Integration

The same principle applies to YouTube.

A video URL is sufficient unless API functionality is genuinely needed.

---

# 166. Social Media

Do not store social-media credentials simply to display social links.

---

# 167. Admin Content Security

Admin-entered content should be considered untrusted even though it originates from a trusted administrator.

This protects against:

- Accidental malicious HTML.
- Compromised admin accounts.
- Copied unsafe content.

---

# 168. Compromised Admin Account

The architecture should assume that if an admin account is compromised, the attacker could modify public content.

Therefore:

- Keep backups.
- Maintain auditability.
- Use strong authentication.
- Limit admin privileges where possible.
- Avoid unnecessary integrations.

---

# 169. Recovery

The team should have a recovery plan for:

```text
Database compromise
Admin account compromise
Malicious content
Deleted content
Server compromise
```

---

# 170. Incident Response

If a security incident occurs:

```text
Detect
 ↓
Contain
 ↓
Rotate credentials
 ↓
Restore/repair
 ↓
Investigate
 ↓
Patch
 ↓
Verify
```

---

# 171. Security Updates

Security-sensitive dependencies should be updated promptly when vulnerabilities are identified.

Do not blindly update every dependency in production without testing.

---

# 172. Server Security

The underlying VPS should also be secured.

At minimum:

```text
SSH keys
Firewall
Automatic security updates where appropriate
Limited exposed ports
Strong credentials
```

---

# 173. SSH

SSH should preferably use key-based authentication.

Password-based SSH access should be disabled where appropriate after confirming key access works.

---

# 174. SSH Root Access

Avoid routine direct root login.

Use a dedicated administrative user with controlled privilege escalation.

---

# 175. Firewall

Only required public ports should be exposed.

Typical web server:

```text
80
443
```

and SSH:

```text
22
```

with appropriate restrictions.

PostgreSQL should not normally be publicly exposed.

---

# 176. Nginx

Nginx should act as the public reverse proxy.

It can provide:

- TLS.
- Request limits.
- Security headers.
- Basic rate limiting.
- Request size limits.

---

# 177. Request Size Limits

Configure appropriate maximum request body sizes.

This is especially important for upload endpoints.

---

# 178. Logging

Maintain useful security logs without collecting unnecessary personal information.

---

# 179. Log Rotation

Logs should be rotated so that they cannot eventually fill the server disk.

---

# 180. Disk Exhaustion

Monitor:

```text
Database
Media
Logs
Backups
```

because disk exhaustion can become both an availability and security problem.

---

# 181. PostgreSQL Network Access

Prefer PostgreSQL to listen only on the required local/private interface.

---

# 182. Database User Permissions

The application database user should have only the permissions required by the application.

Do not use the PostgreSQL superuser for normal application queries.

---

# 183. Database Admin Access

Database administrative credentials should be separate from application credentials.

---

# 184. Migration Security

Database migrations must be reviewed before production execution.

Do not blindly run arbitrary migration scripts from untrusted sources.

---

# 185. Production Database

Never run destructive database commands against production without verification.

---

# 186. Public Error Boundary

The website should have error boundaries so a failed component does not expose internal implementation details or crash the entire interface.

---

# 187. Security Testing

Before launch, test at least:

```text
Authentication
Authorization
XSS
CSRF
SQL injection
File uploads
Path traversal
Rate limiting
Session handling
Private data exposure
Security headers
```

---

# 188. Automated Security Checks

Where practical, include:

- Dependency vulnerability scanning.
- ESLint security/accessibility checks.
- TypeScript checks.
- Build verification.
- Basic API security tests.

---

# 189. Manual Security Checklist

Before production:

```text
□ HTTPS enabled
□ HTTP redirects to HTTPS
□ Secure cookies
□ HttpOnly auth cookies
□ Appropriate SameSite configuration
□ Strong admin password
□ Password hashed securely
□ Login rate limited
□ Admin routes authenticated
□ Admin mutations authorized server-side
□ Public APIs expose only public fields
□ Draft content inaccessible
□ SQL injection protected
□ XSS protected
□ Rich text sanitized
□ CSRF considered/protected
□ Security headers configured
□ Upload limits configured
□ MIME/content validation implemented
□ File names randomized
□ Path traversal prevented
□ SVG handling secured
□ Resume files private
□ Contact submissions private
□ Secrets absent from Git
□ `.env` excluded
□ PostgreSQL not publicly exposed
□ Database user has limited privileges
□ Production errors do not expose internals
□ Rate limiting enabled
□ Backups protected
□ Dependencies checked
□ SSH secured
□ Firewall configured
□ Logs protected
```

---

# 190. Security vs UX

Security should not make the public website unnecessarily hostile.

The public experience should remain:

```text
Fast
Simple
Open
Professional
```

Security friction should primarily exist where risk justifies it:

```text
Admin login
Uploads
Recruitment
Contact abuse
Destructive actions
```

---

# 191. Security vs Design

Security features should fit the visual system.

For example:

- Login errors should use the site's existing UI.
- Confirmation dialogs should look native to the application.
- Upload errors should use the same Toastify system.
- Focus states should remain premium.

Security should not feel bolted onto the website.

---

# 192. Security Principle

The system should follow:

> **Never trust the client.**

Anything coming from:

- Browser.
- Form.
- URL.
- Cookie.
- Upload.
- API request.

must be treated as untrusted until validated and authorized.

---

# 193. Security Principle

The second fundamental rule:

> **Public by intention, private by default.**

Only content explicitly marked and published should become public.

---

# 194. Security Principle

The third fundamental rule:

> **The admin panel is a privileged application, not just another page.**

It must have its own authentication, authorization, validation, rate limiting, and security boundaries.

---

# 195. Final Security Architecture

The final security model should look approximately like:

```text
                         INTERNET
                            │
                            ▼
                     ┌─────────────┐
                     │    Nginx    │
                     │ TLS / limits│
                     └──────┬──────┘
                            │
                    ┌───────▼────────┐
                    │    Next.js     │
                    ├────────────────┤
                    │ Public         │
                    │ Authentication │
                    │ Authorization  │
                    │ Validation     │
                    │ Rate limiting  │
                    └───────┬────────┘
                            │
                 ┌──────────┴──────────┐
                 │                     │
          ┌──────▼──────┐       ┌──────▼──────┐
          │ PostgreSQL  │       │ Media Store │
          │             │       │             │
          │ Public data │       │ Images      │
          │ Private data│       │ Resumes     │
          └─────────────┘       └─────────────┘
```

---

# 196. Final Security Principle

The robotics club may be a student organization, but the website should be engineered like a real production system.

It should be:

> **Open to everyone, trusted by visitors, and difficult to compromise.**

The most important rule is simple:

**Beautiful on the outside. Strict on the inside.**

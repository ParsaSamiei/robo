# 21 — IMPLEMENTATION RULES

**Document:** `21_IMPLEMENTATION_RULES.md`

This is the final implementation contract for the AI/developer building the website.

---

# 1. Purpose

This document defines the rules that must be followed when implementing the robotics club website.

These rules take precedence over implementation shortcuts.

The objective is not simply to make the website work.

The objective is to produce a:

- Professional robotics club website.
- Visually distinctive website.
- High-quality engineering portfolio.
- Bilingual English/Persian experience.
- Maintainable Next.js application.
- Scalable content platform.
- Proper admin-managed system.

---

# 2. Technology Requirements

The implementation must use:

```text
Next.js
React
TypeScript
Tailwind CSS
PostgreSQL
Prisma
Three.js / React Three Fiber
React Toastify
Jimp
```

Use the latest versions that are compatible with the project's deployment environment.

Do not introduce unnecessary frameworks.

---

# 3. Language

The public website supports:

```text
English
Persian
```

English is the preferred/default language.

Do **not** create:

```text
/en
/fa
```

routes.

The selected language must be persisted using a cookie.

---

# 4. Persian RTL

When Persian is selected, the application must switch to genuine RTL behavior.

This includes:

- Layout.
- Text alignment.
- Navigation.
- Cards.
- Forms.
- Tables.
- Breadcrumbs.
- Icons where directional.
- Animations.
- Spacing.
- Content ordering.

Do not implement Persian support by simply changing text alignment.

---

# 5. Admin Language

The admin panel is:

> **English only.**

The admin panel must nevertheless allow administrators to manage both:

```text
English content
Persian content
```

For example:

```text
Title EN
Title FA

Description EN
Description FA
```

---

# 6. Admin Authentication

The admin panel requires authentication.

For v1:

```text
Username
Password
```

is sufficient.

Do not implement public registration.

---

# 7. Admin Security

Admin credentials must never be:

- Hardcoded in source code.
- Stored in client-side JavaScript.
- Exposed through public APIs.
- Included in Git.

Use environment variables/secrets.

---

# 8. Admin Route Protection

Every admin route must be protected server-side.

Do not rely only on:

```text
if (!user) redirect(...)
```

inside a client component.

Authentication must prevent unauthorized access to the underlying server functionality as well.

---

# 9. Public vs Private Data

Clearly distinguish:

```text
Public content
Private content
Draft content
Admin-only data
```

Draft content must never accidentally appear on public pages.

---

# 10. Database

PostgreSQL is the primary database.

Use Prisma as the ORM unless there is a compelling technical reason not to.

---

# 11. Database Design

Do not create a database schema around the current first-year situation only.

The database must support:

```text
Multiple years
Multiple competitions
Multiple robots
Multiple projects
Multiple members
Multiple alumni
Multiple sponsors
Multiple partners
Multiple articles
Multiple gallery items
```

---

# 12. Relationships

Prefer proper relational references over duplicated strings.

Bad:

```text
project.competitionName = "SML"
```

Better:

```text
project.competitionId
```

where an actual Competition entity exists.

---

# 13. Many-to-Many Relationships

Use many-to-many relationships where the domain requires them.

Examples:

```text
Members ↔ Projects
Members ↔ Competitions
Members ↔ Robots
Projects ↔ Technologies
Projects ↔ Robots
Projects ↔ Competitions
```

A member can have multiple roles.

---

# 14. Slugs

Public content should use stable slugs.

Examples:

```text
/projects/autonomous-mobile-platform
/robots/sml-2026
/competitions/smart-manufacturing-league-2026
/team/parsa-samiei
```

Slugs should be unique within their content type.

---

# 15. IDs

Use stable internal IDs for database relationships.

Do not use slugs as primary database identifiers.

---

# 16. Timestamps

Content entities should generally have:

```text
createdAt
updatedAt
```

Published content should additionally support:

```text
publishedAt
```

where appropriate.

---

# 17. Soft Deletion

Do not immediately hard-delete important historical content unless necessary.

For appropriate entities, consider:

```text
deletedAt
```

or an archival status.

This is particularly important for:

- Members.
- Projects.
- Robots.
- Competitions.
- Articles.

---

# 18. Alumni

When a member leaves the current team:

**Do not delete the member.**

Change their status to alumni.

Their previous:

- Projects.
- Robots.
- Competitions.
- Articles.

should remain connected.

---

# 19. Content Status

Content should support at minimum:

```text
DRAFT
PUBLISHED
```

Optionally:

```text
ARCHIVED
```

---

# 20. Publishing

Only published content should be publicly accessible.

The frontend should query published content by default.

Do not fetch all records and filter drafts in the browser.

---

# 21. Server-First Architecture

Prefer server-side data fetching.

Use:

```text
Server Components
Server Actions
Route Handlers
```

where appropriate.

Do not make the entire application a client-side SPA unnecessarily.

---

# 22. Client Components

Use `"use client"` only when needed.

Examples:

- Three.js.
- Interactive navigation.
- Forms requiring client state.
- Animations requiring browser APIs.
- Toast notifications.
- Interactive filters.

---

# 23. Avoid Client Component Explosion

Do not put:

```text
"use client"
```

at the top of large page trees simply because one small component requires interaction.

Isolate interactive components.

---

# 24. Data Fetching

Pages should fetch only the data they need.

Avoid:

```text
SELECT *
```

style data fetching where practical.

---

# 25. API

Do not create API endpoints simply because an API feels architecturally cleaner.

If a mutation is only used by the Next.js application, Server Actions may be preferable.

Use Route Handlers when:

- External clients need an endpoint.
- Webhooks are required.
- A clear HTTP API is useful.
- File operations require it.
- Integration requirements justify it.

---

# 26. Server Actions

Server Actions can be used for:

- Admin content creation.
- Admin content editing.
- Publishing.
- Contact form submission.
- Join applications.
- Sponsor management.
- Gallery management.

Always validate inputs server-side.

---

# 27. Validation

Never trust client-side validation.

Forms must have:

```text
Client validation
+
Server validation
```

Use a schema validation library such as Zod if appropriate.

---

# 28. Error Handling

Never expose:

```text
Database errors
Stack traces
Internal file paths
Environment variables
Authentication details
```

to public users.

---

# 29. User Errors

Errors should be human-readable.

Example:

> Something went wrong while submitting the form. Please try again.

not:

> PrismaClientKnownRequestError P2002...

---

# 30. Toast Notifications

Use React Toastify for user feedback where appropriate.

Examples:

```text
Saved successfully
Published successfully
Application submitted
Message sent
Upload completed
Something went wrong
```

---

# 31. Toast Usage

Do not use toast notifications for everything.

Avoid showing a toast for trivial UI interactions such as:

```text
Opening a menu
Changing a tab
Scrolling
```

---

# 32. Loading States

Every asynchronous action should have a meaningful loading state.

Examples:

```text
Saving...
Uploading...
Submitting...
Publishing...
```

Do not allow users to repeatedly click a submission button.

---

# 33. Forms

Forms must:

- Have labels.
- Have accessible errors.
- Preserve input where appropriate.
- Disable duplicate submission.
- Provide success feedback.
- Provide failure feedback.

---

# 34. Contact Form

The contact form should store submissions securely.

At minimum:

```text
Name
Email
Subject
Message
CreatedAt
Status
```

---

# 35. Join Applications

Join applications should support:

```text
Applicant information
Area of interest
Skills
Experience
Links
Resume
Message
Status
```

---

# 36. Application Status

Admin should be able to mark applications as something like:

```text
New
Reviewing
Contacted
Accepted
Rejected
Archived
```

Do not expose this status publicly.

---

# 37. Resume Uploads

Resume uploads must:

- Validate file type.
- Validate file size.
- Use safe filenames.
- Avoid executable uploads.
- Store outside public source code.
- Require authorization for admin access.

---

# 38. File Uploads

All uploaded files must be validated server-side.

Do not trust:

```text
filename
MIME type
extension
```

provided by the browser.

---

# 39. Image Processing

**Use Jimp.**

Do not use Sharp.

The server environment is incompatible with Sharp.

---

# 40. Jimp Processing

Jimp should be used for appropriate image operations such as:

- Resizing.
- Compression.
- Thumbnail generation.
- Metadata-safe processing where practical.

---

# 41. Image Variants

For gallery and content images, generate appropriate variants where useful.

For example:

```text
Original
Large
Medium
Thumbnail
```

Do not serve enormous original images to mobile devices.

---

# 42. Image Formats

Use modern formats where practical.

Prefer:

```text
WebP
```

or another browser-compatible optimized format.

Do not blindly convert everything if the original format is required.

---

# 43. Image Alt Text

Every meaningful image should have appropriate alt text.

Decorative images should use an empty alt attribute where appropriate.

---

# 44. Three.js

The homepage/hero should contain a genuinely interactive industrial robot.

It must use:

```text
Three.js
React Three Fiber
```

or an equivalent React-compatible Three.js implementation.

---

# 45. Three.js Quality

Do not create:

- A spinning cube.
- A generic floating sphere.
- A basic HTML robot.
- A cheap "tech demo."

The robot should look like an industrial robotic machine.

---

# 46. Three.js Purpose

The 3D scene should reinforce the club's identity.

It should feel related to:

```text
Industrial robotics
Engineering
Automation
Manufacturing
Precision
```

---

# 47. 3D Performance

The 3D scene must not destroy page performance.

Provide:

- Reduced complexity on mobile.
- Lazy loading where appropriate.
- Reasonable polygon count.
- Controlled lighting.
- Efficient textures.
- Limited post-processing.

---

# 48. 3D Interaction

Interaction should be subtle.

Possible:

```text
Mouse movement
Scroll
Robot movement
Camera response
Small mechanical animation
```

Avoid excessive effects.

---

# 49. Reduced Motion

Respect:

```text
prefers-reduced-motion
```

When enabled, reduce or disable non-essential animations.

---

# 50. Animation Philosophy

Animations should communicate:

```text
Hierarchy
Interaction
Transition
Engineering precision
```

They should not exist just because animation is possible.

---

# 51. Visual Identity

The logo is not finalized.

Therefore:

**Do not permanently encode the current logo into the architecture.**

Create a flexible logo/brand component.

---

# 52. Brand Tokens

Use centralized design tokens.

Do not scatter:

```text
#123456
#ABCDEF
```

through hundreds of components.

---

# 53. Colors

The color palette should support:

```text
Dark primary
Industrial neutral
Premium accent
```

The exact values should come from the design system documentation.

---

# 54. Dark Mode

Dark mode is the preferred visual direction.

Light mode should still be supported if implemented.

Do not design light mode as an afterthought.

---

# 55. Responsive Design

The website must work properly on:

```text
Desktop
Laptop
Tablet
Mobile
```

The primary design target is laptop/desktop, but mobile must be fully functional.

---

# 56. Mobile Is Not a Shrunk Desktop

Mobile layouts should be intentionally designed.

Examples:

- Navigation changes.
- Cards stack.
- 3D scene simplifies.
- Tables become scrollable or transformed.
- Typography scales.
- Controls become touch-friendly.

---

# 57. Accessibility

The website must use semantic HTML.

Prefer:

```html
<header>
  <nav>
    <main>
      <section>
        <article>
          <footer></footer>
        </article>
      </section>
    </main>
  </nav>
</header>
```

where appropriate.

---

# 58. Keyboard Navigation

All interactive elements must be usable with keyboard navigation.

Do not create clickable:

```text
<div>
```

elements when a semantic:

```text
<button>
<a>
```

is appropriate.

---

# 59. Focus States

Every interactive element must have a visible focus state.

Do not remove browser focus outlines without providing a better replacement.

---

# 60. Color Contrast

Text must have sufficient contrast.

The premium/dark design must not sacrifice readability.

---

# 61. Typography

Typography must support both:

```text
Latin
Persian
```

with appropriate fonts.

Do not assume the same font works beautifully for both scripts.

---

# 62. No AI-Looking Design

This is a major requirement.

The website must **not look AI-generated**.

Avoid:

```text
Generic purple gradients
Excessive glassmorphism
Random glowing blobs
AI-style abstract backgrounds
Overly rounded everything
Massive gradient text
Unnecessary floating cards
Generic SaaS layouts
```

---

# 63. Visual Inspiration

The quality target can be described as:

```text
Professional engineering lab
+
Premium product website
+
Robotics competition team
```

rather than:

```text
AI startup landing page
```

---

# 64. SpaceX Inspiration

SpaceX can be used as inspiration for:

- Confidence.
- Typography.
- Photography hierarchy.
- Large-scale storytelling.
- Technical seriousness.

Do **not** copy SpaceX's visual identity.

---

# 65. Apple-Like Sponsor Section

Sponsor presentation should feel:

- Premium.
- Minimal.
- Carefully spaced.
- Respectful of logos.

Avoid:

```text
Logo wall
```

with dozens of tiny logos.

---

# 66. Sponsor Tier Design

The sponsor section can use subtle hierarchy.

For example:

```text
Strategic Partners
large logos

Technology Partners
medium logos

Supporters
smaller logos
```

The exact visual treatment should remain tasteful.

---

# 67. No Excessive Cards

Cards should be used when they improve information hierarchy.

Not every section needs:

```text
rounded rectangle
shadow
border
icon
```

---

# 68. Grid Discipline

Use a consistent layout grid.

Avoid individually positioning elements just to make a screenshot look good.

---

# 69. Spacing

Spacing should come from the design system.

Do not randomly use:

```text
17px
23px
37px
```

unless there is a deliberate reason.

---

# 70. Components

Build reusable components for repeated patterns.

Examples:

```text
Button
Container
Section
Card
Badge
Modal
Dialog
FormField
MemberCard
ProjectCard
RobotCard
CompetitionCard
SponsorLogo
ArticleCard
GalleryItem
```

---

# 71. Component Reusability

Do not make one-off components for every card if the visual structure is essentially the same.

At the same time, do not create a giant:

```text
UniversalCard
```

with 50 props.

Use sensible component boundaries.

---

# 72. Component APIs

Components should have clear props.

Avoid:

```text
any
```

unless absolutely necessary.

Use TypeScript types.

---

# 73. TypeScript

The project should use strict TypeScript configuration.

Avoid:

```text
any
```

as a way to silence errors.

---

# 74. ESLint

The project must pass linting.

Do not disable lint rules simply to make the build pass.

If a rule is genuinely inappropriate, document why.

---

# 75. Formatting

Use a consistent formatter such as Prettier.

Do not manually maintain inconsistent formatting.

---

# 76. Environment Variables

All secrets must use environment variables.

Examples:

```text
DATABASE_URL
AUTH_SECRET
UPLOAD_STORAGE...
```

Never commit secrets.

---

# 77. Environment Validation

Environment variables should be validated during startup/build where practical.

Missing required configuration should produce a clear error.

---

# 78. Git

Do not commit:

```text
.env
.env.local
uploaded files
database dumps
build artifacts
node_modules
```

---

# 79. GitHub Integration

Each project can have an optional GitHub URL.

The system should treat it as an external link.

Do not build a full GitHub synchronization system for v1 unless explicitly required.

---

# 80. External Links

External links should:

- Be validated.
- Use proper URL handling.
- Not allow unsafe schemes.

Prefer:

```text
https://
```

for public external websites.

---

# 81. Social Media

Admin should manage social links.

Supported:

```text
Instagram
LinkedIn
YouTube
GitHub
Telegram
```

The UI should automatically hide missing links.

---

# 82. SEO

Every public page should have:

```text
Title
Description
Canonical URL
Open Graph metadata
```

where applicable.

---

# 83. Structured Data

Implement appropriate Schema.org structured data where useful.

Potential types:

```text
Organization
Person
Article
BreadcrumbList
```

Do not add irrelevant schema simply for SEO.

---

# 84. Performance

The site should prioritize:

```text
Fast initial load
Optimized images
Minimal JavaScript
Lazy-loaded 3D
Server rendering
Caching
```

---

# 85. JavaScript

Do not move static content into client components unnecessarily.

The goal is to keep the client bundle small.

---

# 86. Fonts

Do not load multiple unnecessary font families and weights.

Only load the weights actually used.

---

# 87. Images

Never render a huge source image when a smaller optimized image is sufficient.

Use Next.js image optimization where compatible with the deployment architecture.

---

# 88. Dynamic Content

Dynamic content should be cached when it does not need to be real-time.

Examples:

```text
Projects
Articles
Team
Sponsors
```

do not need database queries on every request.

---

# 89. Admin Changes

After publishing/editing content, the relevant cached pages must be revalidated.

Use Next.js revalidation mechanisms.

---

# 90. Error Pages

Implement:

```text
404
500/error
loading
```

states.

They should match the visual identity.

---

# 91. Empty States

Every content-driven page should have a reasonable empty state.

Example:

> No projects have been published yet.

Do not display a broken grid.

---

# 92. Admin Empty States

Admin empty states should be action-oriented.

Example:

> No projects yet. Create your first project.

with:

```text
+ Create Project
```

---

# 93. Database Migrations

Use proper Prisma migrations for production.

Do not depend on manually changing production database tables.

---

# 94. Seed Data

Create optional seed data for development.

It should demonstrate:

```text
Members
Projects
Robot
Competition
Articles
Sponsors
Gallery
```

This makes UI development much easier.

---

# 95. Fake Content

Development placeholder content must be clearly identifiable.

Do not accidentally deploy fake accomplishments or fake sponsors.

---

# 96. Real Content Transition

When replacing placeholder content:

- Remove fake names.
- Remove fake awards.
- Remove fake statistics.
- Remove fake companies.
- Remove fake competition results.

---

# 97. PishTalk Reference

The existing PishTalk repository:

```text
ParsaSamiei/PishTalkrepo
```

may be used as a **technical reference**.

The AI/developer should inspect it before implementing:

- Admin architecture.
- Upload handling.
- Authentication approach.
- Database patterns.
- Prisma usage.
- Content management.
- File handling.

---

# 98. Do Not Copy PishTalk Blindly

PishTalk is a reference implementation.

It is **not** the architecture specification for this project.

The robotics website has different requirements.

Reuse patterns where appropriate.

Do not duplicate:

- Unnecessary components.
- Old architectural decisions.
- Legacy bugs.
- Project-specific naming.
- PishTalk-specific business logic.

---

# 99. Jimp Requirement Overrides Existing Patterns

If PishTalk uses another image-processing library:

**Do not copy it if it uses Sharp.**

For this project:

> **Jimp is mandatory for image processing.**

---

# 100. Admin UX

The admin panel should prioritize function over visual spectacle.

Public website:

```text
Premium
Visual
Interactive
```

Admin:

```text
Clear
Fast
Functional
Reliable
```

---

# 101. Admin Dashboard

The dashboard should provide useful high-level information.

Potential:

```text
Projects
Robots
Members
Competitions
Articles
Applications
Messages
Sponsors
```

and recent activity.

Do not turn it into a fake analytics dashboard with meaningless charts.

---

# 102. Admin Content Editor

Editors should make bilingual content obvious.

For example:

```text
English
────────────────
Title
Summary
Content

Persian
────────────────
Title
Summary
Content
```

---

# 103. Preview

Admins should be able to preview content before publishing.

Ideally:

```text
Preview English
Preview Persian
```

---

# 104. Draft Workflow

Editing should not automatically publish.

Recommended:

```text
Save draft
Preview
Publish
```

---

# 105. Destructive Actions

Deletion should require confirmation.

For important entities, prefer archive/deactivate over permanent deletion.

---

# 106. Auditability

If practical, track:

```text
createdBy
updatedBy
publishedBy
```

for important content.

This is useful as the team grows.

---

# 107. Accessibility in Admin

The admin panel must also be usable with keyboard and proper labels.

Do not treat accessibility as public-site-only.

---

# 108. Security Principle

Assume:

> Everything coming from the browser is untrusted.

Validate:

- Form input.
- IDs.
- URLs.
- Files.
- Authentication.
- Authorization.

---

# 109. Authorization

Being authenticated as an admin should be sufficient for v1.

However, architect the system so roles can be added later.

Potential future roles:

```text
Super Admin
Content Admin
Team Manager
```

Do not implement all of these now unless necessary.

---

# 110. Rate Limiting

Public forms should have protection against abuse.

At minimum consider rate limiting for:

```text
Contact
Join application
Authentication
```

---

# 111. Spam Protection

The contact and join forms should have basic spam protection.

Do not make legitimate users solve unnecessary CAPTCHA challenges unless spam becomes a real problem.

---

# 112. Privacy

Only collect information necessary for the site's operation.

Especially for:

- Join applications.
- Contact messages.
- Resumes.

---

# 113. Personal Data

Personal information must not accidentally appear in:

```text
Public APIs
Logs
Client bundles
Error messages
```

---

# 114. Logging

Logs should be useful for debugging but should not contain:

```text
Passwords
Authentication tokens
Full resumes
Sensitive personal information
```

---

# 115. Deployment

The deployment target should support:

```text
Next.js
Node.js
PostgreSQL
```

The application should be deployable without requiring Sharp.

---

# 116. Production Build

The project must successfully run:

```text
npm run build
npm run start
```

in the production environment.

---

# 117. CI

CI should at minimum run:

```text
Install
Lint
Typecheck
Build
```

Tests can be added as the application grows.

---

# 118. No Build Warnings Ignored

Do not simply suppress warnings.

Investigate:

- Missing dependencies.
- Invalid configuration.
- Deprecated APIs.
- Type errors.
- Image issues.

---

# 119. Documentation

The repository should include:

```text
README.md
.env.example
```

and setup instructions.

---

# 120. README

The README should explain:

```text
Project overview
Requirements
Installation
Environment variables
Database setup
Development
Build
Deployment
Admin setup
```

---

# 121. `.env.example`

Provide variable names without secrets.

Example:

```text
DATABASE_URL=
AUTH_SECRET=
```

Do not provide real credentials.

---

# 122. No Hardcoded URLs

Do not scatter:

```text
https://example.com
```

throughout the application.

Use environment/configuration where appropriate.

---

# 123. No Hardcoded Content

Major content should come from the database/CMS.

Do not hardcode:

```text
Members
Sponsors
Projects
Competition results
Articles
```

into React components.

Static UI copy can remain in dictionaries/configuration.

---

# 124. Content vs UI Separation

The component should define:

```text
How something looks.
```

The database should define:

```text
What something says.
```

---

# 125. Internationalization vs Database Content

UI strings should live in the i18n system.

Examples:

```text
Join the team
Learn more
Read article
View project
```

Content entities should store their English/Persian content in the database.

---

# 126. Do Not Mix Translation Systems

Do not store:

```text
"Join the team"
```

inside a project database record if it is a UI label.

Do not store project-specific descriptions inside the translation dictionary.

---

# 127. Accessibility Labels

UI labels such as:

```text
Open navigation
Close dialog
Next image
Previous image
```

must be translated.

---

# 128. SEO Translation

SEO metadata should also have English and Persian versions.

---

# 129. Testing

Before launch, test:

```text
English
Persian
RTL
Mobile
Desktop
Admin
Authentication
Forms
Uploads
Database
SEO
404
Slow network
Reduced motion
Keyboard navigation
```

---

# 130. Browser Testing

At minimum validate modern:

```text
Chrome
Safari
Firefox
```

with particular attention to Safari because the project may be accessed from Apple devices.

---

# 131. Mobile Testing

Do not rely only on browser resizing.

Test actual mobile interaction patterns:

- Touch.
- Scroll.
- Menus.
- Forms.
- Gallery.
- 3D.
- Sticky elements.

---

# 132. Final Visual QA

Before considering a page finished, check:

```text
Spacing
Typography
Alignment
Contrast
Animation
Responsiveness
Loading
Empty states
Error states
RTL
```

---

# 133. Do Not Stop at Functional

The implementation is not complete when:

```text
npm run build
```

works.

It is complete when the result is also visually polished.

---

# 134. No "Good Enough" UI

Avoid shipping:

```text
default Tailwind cards
default buttons
default forms
default navbar
```

without adapting them to the design system.

---

# 135. No Overengineering

At the same time, do not build:

```text
microservices
event buses
complex queues
custom CMS framework
GraphQL
Kubernetes
```

unless the actual project requires them.

This is a student robotics club website.

The architecture should be **professional but appropriately sized**.

---

# 136. Maintainability

Future team members should be able to understand the codebase.

Prefer:

```text
clear naming
small modules
typed interfaces
documented decisions
predictable patterns
```

over clever abstractions.

---

# 137. Naming

Use consistent naming.

React components:

```text
PascalCase
```

Functions/variables:

```text
camelCase
```

Database fields:

Follow one consistent Prisma/database convention.

---

# 138. Folder Structure

The exact folder structure can be decided during implementation, but it should clearly separate:

```text
app/routes
components
lib
database
actions
types
styles
public
```

Do not put everything into one directory.

---

# 139. Business Logic

Business logic should not be scattered across UI components.

For example:

Bad:

```text
MemberCard.tsx
```

containing database queries and application rules.

Better:

```text
server/service/repository
```

or an appropriate server-side abstraction.

---

# 140. Database Access

Client components must never directly access PostgreSQL.

Database access occurs server-side only.

---

# 141. Secrets

Never expose:

```text
DATABASE_URL
AUTH_SECRET
storage credentials
admin password
```

to the browser.

---

# 142. Public Configuration

Only intentionally public configuration may be exposed through:

```text
NEXT_PUBLIC_*
```

---

# 143. Final Product Identity

The implementation should ultimately feel like:

> **A serious student robotics club that builds real industrial robots.**

Not:

> A generic university club website.

And not:

> An AI-generated futuristic landing page.

---

# 144. Final Implementation Test

Before launch, ask:

### Engineering

> Does this look like it was built by people who actually build robots?

### Design

> Does it look intentionally designed rather than generated from a template?

### Content

> Are the claims factual?

### UX

> Can someone understand the club within 30 seconds?

### Recruitment

> Can a potential member figure out how to join?

### Competition

> Can an organizer quickly understand what we do?

### Sponsors

> Can a company understand why supporting us makes sense?

### Technical

> Can the next team continue developing this website without rewriting it?

If any answer is no, the implementation is not finished.

---

# 145. Golden Rule

The final implementation should follow this principle:

> **Build a website that documents what the team actually builds today, while being architected for the robotics club it can become tomorrow.**

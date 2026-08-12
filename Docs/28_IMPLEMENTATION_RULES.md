# `21_IMPLEMENTATION_RULES.md`

# Implementation Rules Specification

## 1. Purpose

This document is the final implementation contract for the robotics club website.

The implementation AI/developer must treat the documents in this specification repository as the **source of truth**.

The goal is not merely to produce a website that technically works.

The goal is to produce a website that feels like a **real, serious, student robotics club** with strong engineering credibility, excellent UX, and room to evolve as the club grows.

---

# 2. Source of Truth

Before implementing anything, read all project documentation.

At minimum:

```text
00_PROJECT_BRIEF.md
01_PRODUCT_REQUIREMENTS.md
02_BRAND_IDENTITY.md
03_INFORMATION_ARCHITECTURE.md
04_PAGE_SPECIFICATIONS.md
06_CONTENT_MODEL.md
09_INTERNATIONALIZATION.md
10_3D_AND_INTERACTIONS.md
11_MEDIA_AND_GALLERY.md
12_SEO.md
13_PERFORMANCE.md
14_ACCESSIBILITY.md
15_SECURITY.md
16_RESPONSIVE_DESIGN.md
17_COMPONENT_ARCHITECTURE.md
18_API_AND_SERVER_ARCHITECTURE.md
19_DEPLOYMENT.md
20_CONTENT_GUIDELINES.md
21_IMPLEMENTATION_RULES.md
```

If an implementation decision conflicts with these documents, the documentation takes precedence unless the requirement is technically impossible.

---

# 3. Existing Repository Reference

The existing Pishtalk repository may be used as a **technical reference** for:

- Admin architecture.
- Authentication approach.
- PostgreSQL integration.
- Prisma patterns.
- Media uploads.
- Content management.
- Next.js conventions.
- Toast notifications.
- General project organization.

Reference repository:

```text
https://github.com/ParsaSamiei/PishTalkrepo
```

However:

> **Do not blindly copy Pishtalk's UI, branding, components, or architecture.**

The robotics club website must have its own identity.

---

# 4. Primary Technology Stack

Use:

```text
Next.js
React
TypeScript
Tailwind CSS
PostgreSQL
Prisma
Three.js / React Three Fiber
Jimp
```

unless an explicit documented requirement necessitates another technology.

---

# 5. TypeScript

Use TypeScript throughout the application.

Avoid:

```ts
any;
```

unless there is a documented technical reason.

Prefer strongly typed interfaces, schemas, and API contracts.

---

# 6. Next.js Architecture

Use modern Next.js architecture.

Prefer:

- App Router.
- Server Components.
- Server Actions where appropriate.
- Route Handlers where appropriate.
- Server-side data fetching.

Do not turn the entire application into Client Components.

---

# 7. Client Components

Use `"use client"` only when required.

Typical valid reasons:

- Three.js.
- Interactive navigation.
- Forms requiring client state.
- Toast notifications.
- Animations requiring browser APIs.
- Interactive filters.
- Rich editors.

---

# 8. Server Components

Prefer Server Components for:

- Static content.
- Project pages.
- Blog pages.
- Team pages.
- Sponsor sections.
- SEO metadata.
- Database-backed public content.

---

# 9. Database Access

Database access should remain server-side.

Do not expose Prisma directly to the browser.

Correct:

```text
Browser
   ↓
Server Component / Server Action / API
   ↓
Prisma
   ↓
PostgreSQL
```

Incorrect:

```text
Browser
   ↓
Prisma
   ↓
PostgreSQL
```

---

# 10. Database

PostgreSQL is the required relational database.

The database should be normalized appropriately but should not be unnecessarily complicated.

---

# 11. Prisma

If Prisma is used:

- Keep the schema organized.
- Use migrations.
- Validate database input.
- Avoid unnecessary queries.
- Avoid exposing internal database structures directly to the client.

---

# 12. Production Migrations

Never rely on:

```bash
prisma db push
```

as the production schema migration mechanism.

Use proper migrations.

---

# 13. Validation

All externally supplied data must be validated.

This includes:

- Admin forms.
- Contact forms.
- Join applications.
- Upload metadata.
- URLs.
- Blog content.
- Project content.

Use a schema validation library such as Zod where appropriate.

---

# 14. User Input

Never trust user input.

Validate on the server even if client-side validation already exists.

Client validation is for UX.

Server validation is for security.

---

# 15. Admin Authentication

The admin panel requires a simple username/password authentication system.

However, "simple" does not mean insecure.

Requirements:

- Password hashing.
- Secure session handling.
- Rate limiting.
- Secure cookies.
- Logout.
- Session expiration.

---

# 16. Admin Authorization

Every admin mutation must verify that the current user is authenticated and authorized.

Never rely on:

```text
Hidden button
Hidden route
Frontend state
```

for authorization.

---

# 17. Admin Language

The admin panel is **English-only**.

The public website supports:

```text
English
Persian
```

The admin should be capable of managing both language versions.

---

# 18. Language Model

The public site does **not** use:

```text
/en
/fa
```

routes.

Language is selected using a cookie.

Conceptually:

```text
User
 ↓
Language cookie
 ↓
Next.js
 ↓
English / Persian content
```

---

# 19. Default Language

English should be the preferred/default language unless the user has selected another language.

---

# 20. RTL

Persian must use genuine RTL layout.

Do not implement Persian by merely changing text alignment.

The layout direction itself must change.

---

# 21. RTL Implementation

The application should correctly handle:

```text
direction
spacing
icons
navigation
flexbox
grids
forms
animations
breadcrumbs
arrows
carousels
```

---

# 22. Mixed LTR Content

Technical content must remain readable inside RTL pages.

Examples:

```text
ROS 2
C++
GitHub URLs
YouTube URLs
Code
Repository names
```

must retain appropriate LTR behavior.

---

# 23. No Hardcoded Text

Public-facing text should not be scattered throughout components.

Avoid:

```tsx
<h1>Meet Our Team</h1>
```

when the application uses the localization system.

Prefer the project's translation/content architecture.

---

# 24. Content vs UI Translation

Separate:

```text
UI translations
```

from:

```text
CMS-managed content
```

For example:

### UI

> Read more

### CMS content

> Project description.

They should not be handled identically.

---

# 25. Translation Completeness

A page must never accidentally display:

```text
English
Persian
English fallback
```

randomly because a translation is missing.

The system should have a predictable fallback strategy.

---

# 26. Missing Translation

If a CMS item does not have a translation:

- Do not silently produce garbage.
- Do not machine-generate content at runtime.
- Use an explicit fallback strategy defined by the content model.

---

# 27. Naming

Use clear naming.

Prefer:

```text
TeamMember
Project
Robot
Competition
Sponsor
Partner
BlogPost
NewsArticle
GalleryItem
```

over ambiguous names such as:

```text
Thing
Item
Data
Stuff
```

---

# 28. Component Naming

React components should use PascalCase.

Example:

```text
TeamMemberCard
ProjectCard
SponsorGrid
RobotViewer
LanguageSwitcher
```

---

# 29. File Naming

Use consistent naming throughout the project.

Do not mix:

```text
TeamMember.tsx
team-member.tsx
teamMember.tsx
```

without a documented convention.

---

# 30. Component Responsibility

Each component should have one clear responsibility.

Avoid giant components such as:

```text
HomePage.tsx
```

containing hundreds or thousands of lines.

---

# 31. Page Responsibility

Pages should compose components rather than contain every implementation detail themselves.

---

# 32. Reusability

Reusable UI should be abstracted when repetition becomes meaningful.

Do not create abstractions merely for the sake of abstraction.

---

# 33. Avoid Overengineering

Do not introduce:

- Microservices.
- Complex state-management systems.
- GraphQL.
- Kubernetes.
- Event buses.

unless a real requirement emerges.

---

# 34. State Management

Prefer:

```text
Server state → Server Components / server fetching
Local UI state → React state
Forms → Server Actions or appropriate form handling
```

Use global state only where genuinely necessary.

---

# 35. Toast Notifications

Use **React Toastify** for application notifications.

Examples:

- Successful admin update.
- Successful upload.
- Successful form submission.
- Error messages.
- Authentication feedback.

---

# 36. Toast Rules

Toasts should:

- Be concise.
- Explain what happened.
- Not contain unnecessary technical details.
- Not replace important inline validation.

Bad:

> Error 500: PrismaClientKnownRequestError P2002...

Better:

> Unable to save the project. Please try again.

Detailed errors belong in server logs.

---

# 37. Loading States

Every asynchronous interaction should have an appropriate loading state.

Do not leave users wondering whether their action worked.

---

# 38. Skeletons

Use skeleton loading states where they improve perceived performance.

Do not skeletonize every element unnecessarily.

---

# 39. Error States

Every major data-driven page should handle:

```text
Loading
Success
Empty
Error
```

appropriately.

---

# 40. Empty States

Do not show fake content when the database is empty.

Provide a meaningful empty state or hide the section.

---

# 41. Forms

Forms must provide:

- Labels.
- Validation.
- Error messages.
- Loading state.
- Success feedback.
- Accessible controls.

---

# 42. Contact Form

The contact form should support the agreed contact flow.

It must not expose internal email configuration to users.

---

# 43. Join Team Form

The recruitment form should support the fields defined by the content model.

Potential information includes:

- Name.
- Email.
- Education.
- Skills.
- Areas of interest.
- Experience.
- GitHub.
- Personal website.
- Motivation.
- Resume where required.

Only collect information that is actually needed.

---

# 44. Resume Uploads

If resumes are supported:

- Validate file type.
- Limit file size.
- Store securely.
- Prevent public indexing.
- Do not expose direct public URLs unnecessarily.

---

# 45. Private Applications

Recruitment applications must never appear on public pages.

---

# 46. Admin Applications

Only authorized administrators should access recruitment applications.

---

# 47. File Uploads

All uploads must follow the rules in:

```text
11_MEDIA_AND_GALLERY.md
15_SECURITY.md
19_DEPLOYMENT.md
```

---

# 48. Jimp Requirement

**Jimp must be used for image processing.**

Do not install or use Sharp.

This requirement is due to server compatibility.

---

# 49. Image Pipeline

The image pipeline should follow:

```text
Upload
 ↓
Validate
 ↓
Jimp
 ↓
Resize / optimize
 ↓
Generate safe filename
 ↓
Store
 ↓
Database metadata
```

---

# 50. Images

Prefer modern efficient image formats where practical.

Do not preserve enormous source images when smaller versions are sufficient.

---

# 51. Next.js Image

Use Next.js image optimization appropriately.

Do not disable optimization globally without a documented reason.

---

# 52. Image Dimensions

The CMS should understand appropriate image contexts:

```text
Avatar
Project cover
Robot cover
Sponsor logo
Gallery
Blog cover
Open Graph
```

---

# 53. Alt Text

Images that convey information must have meaningful alt text.

Decorative images should be marked decorative.

---

# 54. Three.js

The 3D experience is a core visual feature.

It must use a real Three.js implementation.

Do not replace it with:

- A static image.
- An HTML/CSS fake robot.
- A video pretending to be interactive.

---

# 55. Industrial Robot

The 3D robot should feel like a sophisticated industrial robotic system.

It should be:

- Technical.
- Premium.
- Interactive.
- Restrained.
- Realistic enough to feel engineered.

It should not feel like a cartoon toy.

---

# 56. Three.js Performance

The 3D scene must:

- Lazy load where possible.
- Avoid unnecessary geometry.
- Avoid excessive textures.
- Limit expensive effects.
- Respect device capabilities.

---

# 57. Three.js Fallback

If WebGL is unavailable:

```text
Show a static fallback
```

rather than leaving a blank section.

---

# 58. Mobile Three.js

Mobile devices should receive an appropriately simplified experience.

---

# 59. Accessibility and Three.js

The 3D scene must not be the only way to understand the page.

Important information must also exist as normal HTML text.

---

# 60. Animation

Animation should communicate:

- Interaction.
- Hierarchy.
- State.
- Spatial relationships.

Animation should not exist simply because it is possible.

---

# 61. Animation Limits

Avoid:

- Constant motion everywhere.
- Excessive parallax.
- Long transitions.
- Aggressive scroll hijacking.
- Distracting particle effects.

---

# 62. Scroll Behavior

Never hijack normal browser scrolling.

---

# 63. Hover Effects

Hover effects should be subtle and useful.

Do not make every element move when the cursor touches it.

---

# 64. Cursor Effects

Custom cursors are optional.

Do not implement them if they negatively affect usability or performance.

---

# 65. Premium Design

The website should feel premium through:

```text
Typography
Spacing
Layout
Motion
Material treatment
Photography
3D
```

not through excessive gradients and effects.

---

# 66. Dark Theme

Dark mode is the preferred visual direction.

The design should feel like:

```text
Robotics laboratory
+
Engineering workstation
+
Premium technology product
```

---

# 67. Light Theme

A light theme may exist.

It must not be treated as an afterthought.

---

# 68. Color System

Colors must use centralized design tokens.

Do not scatter raw hex values throughout components.

---

# 69. Branding

The final logo and team identity do not yet exist.

The architecture must therefore allow the future identity to replace the temporary identity easily.

---

# 70. Temporary Identity

Until the official identity exists:

- Use neutral typography.
- Use a restrained symbol/mark if necessary.
- Avoid designing a "final" logo.
- Avoid hardcoding the club's visual identity into components.

---

# 71. Logo Replacement

Changing the future logo should require editing configuration/assets rather than redesigning the application.

---

# 72. Responsive Design

The application must be fully responsive.

Primary design target:

```text
Desktop / laptop
```

Secondary target:

```text
Mobile
```

Both must be fully functional.

---

# 73. Mobile Is Not Optional

Do not create a desktop-only experience and call it responsive because the page technically shrinks.

Navigation, cards, forms, 3D, typography, and spacing must all adapt intentionally.

---

# 74. Breakpoints

Use a consistent breakpoint system.

Do not introduce arbitrary one-off breakpoints throughout the application.

---

# 75. Touch Interaction

Interactive elements must work well with touch.

Avoid hover-only functionality.

---

# 76. Buttons

Buttons must have sufficiently large touch targets.

---

# 77. Navigation

Desktop:

```text
Full navigation
```

Mobile:

```text
Compact navigation
Menu / drawer
```

The exact design is defined by the UI architecture.

---

# 78. SEO

Every public page must have appropriate:

- Title.
- Description.
- Canonical URL where applicable.
- Open Graph metadata.
- Twitter/X metadata where appropriate.

---

# 79. Structured Data

Use structured data where it genuinely represents the content.

Potential types include:

- Organization.
- Person.
- Article.
- Event.
- BreadcrumbList.

Do not fabricate structured data.

---

# 80. Sitemap

Public indexable pages should be included in the sitemap.

Private admin pages must not be included.

---

# 81. Robots

Admin and private content should not be indexed.

---

# 82. Dynamic Metadata

Project, robot, competition, blog, and member pages should generate metadata dynamically from their content.

---

# 83. SEO Language

Both English and Persian content should have appropriate metadata.

Do not simply copy English metadata into Persian pages.

---

# 84. URL Strategy

Even though language is cookie-based, public content URLs should remain clean and stable.

Examples:

```text
/projects
/projects/autonomous-mobile-robot
/team
/competitions
/blog
```

Do not put unnecessary technical identifiers into public URLs.

---

# 85. Slugs

Use stable slugs.

Avoid changing URLs unnecessarily after publication.

---

# 86. Deleted Content

When content is permanently removed, handle the URL appropriately.

Do not leave broken links everywhere.

---

# 87. Internal Links

Use internal links to connect:

```text
Members
Projects
Robots
Competitions
Blog
News
```

This improves both UX and discoverability.

---

# 88. External Links

External links must clearly behave as external links where appropriate.

Examples:

- GitHub.
- Sponsor websites.
- YouTube.
- LinkedIn.
- Instagram.
- Telegram.

---

# 89. External URL Validation

Admin-entered URLs should be validated.

At minimum, validate that they are legitimate URLs.

Where security requires it, restrict allowed protocols to:

```text
https:
http:
```

and reject:

```text
javascript:
data:
```

for normal external links.

---

# 90. Content Security

Do not render arbitrary HTML from the database without sanitization.

---

# 91. Rich Text

If a rich-text editor is used:

```text
Editor
 ↓
Sanitization
 ↓
Database
 ↓
Rendered content
```

Never trust stored HTML merely because it came from the admin panel.

---

# 92. Markdown

If Markdown is used, sanitize rendered HTML appropriately.

---

# 93. XSS Protection

All user/admin-generated content must be considered potentially unsafe.

---

# 94. CSRF

State-changing requests must have appropriate CSRF protection depending on the authentication/request architecture.

---

# 95. Rate Limiting

Rate limit:

- Admin login.
- Contact form.
- Join form.
- Upload endpoints.
- Other publicly accessible mutation endpoints.

---

# 96. Spam Protection

Contact and recruitment forms should include reasonable spam protection.

Do not make legitimate users solve unnecessarily difficult CAPTCHAs unless spam becomes a problem.

---

# 97. Database Queries

Avoid N+1 query patterns.

Fetch related data efficiently.

---

# 98. Pagination

Admin lists should support pagination where datasets can grow.

This is especially relevant to:

- Join applications.
- Contact messages.
- Gallery.
- Blog.
- News.

---

# 99. Public Pagination

Public content should use pagination or appropriate loading strategies when the dataset becomes large.

Do not load hundreds of gallery items at once.

---

# 100. Caching

Use Next.js caching/revalidation strategically.

Content that changes infrequently should not trigger unnecessary database queries on every request.

---

# 101. Cache Invalidation

Admin publishing must invalidate affected public content.

Examples:

```text
Publish project
 ↓
Project cache invalidated

Update sponsor
 ↓
Sponsor section invalidated
```

---

# 102. Performance Budget

The implementation should target excellent performance.

Prioritize:

```text
Fast initial HTML
Fast LCP
Low JavaScript
Optimized images
Lazy 3D
Minimal unnecessary dependencies
```

---

# 103. JavaScript

Do not add a library for something that can be handled with:

- CSS.
- Browser APIs.
- React.
- Next.js.

---

# 104. Dependencies

Every dependency should have a reason.

Avoid dependency bloat.

---

# 105. Bundle Size

Do not import entire large libraries when only a small part is needed, where tree-shaking does not handle it automatically.

---

# 106. Fonts

Use a small number of appropriate fonts.

Do not load ten font weights just because they exist.

---

# 107. Icons

Use a consistent icon library or SVG system.

Do not mix random icon styles.

---

# 108. SVG

SVG assets should be optimized and should not contain unnecessary metadata or scripts.

---

# 109. Accessibility

The website must meet a strong accessibility standard.

At minimum:

- Semantic HTML.
- Keyboard navigation.
- Visible focus states.
- Proper labels.
- Sufficient contrast.
- Reduced motion.
- Accessible forms.

---

# 110. Keyboard Navigation

Every interactive feature must be usable without a mouse.

This includes:

- Navigation.
- Menus.
- Dialogs.
- Forms.
- Gallery controls.
- 3D controls where applicable.

---

# 111. Focus

Do not remove browser focus indicators without replacing them with a clearly visible accessible state.

---

# 112. Dialogs

Dialogs must:

- Trap focus appropriately.
- Close correctly.
- Have accessible labels.
- Work with Escape.

---

# 113. Semantic HTML

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

# 114. Heading Structure

Maintain logical heading hierarchy.

Avoid jumping randomly from:

```text
h1
h4
h2
```

---

# 115. Color

Do not communicate important information through color alone.

---

# 116. Contrast

Text must maintain sufficient contrast against the background.

Especially important in the dark theme.

---

# 117. Motion

Respect:

```text
prefers-reduced-motion
```

---

# 118. Error Messages

Errors should be understandable.

Avoid:

> Invalid input.

when possible to say:

> Please enter a valid GitHub URL.

---

# 119. Accessibility of Forms

Every input must have an associated label.

Placeholder text must not be the only label.

---

# 120. Content Model

The CMS should follow the content model defined in:

```text
06_CONTENT_MODEL.md
```

Do not create random database tables simply because a UI card exists.

---

# 121. Content Relationships

Relationships should represent real relationships.

Example:

```text
Member
  ↕
Project
  ↕
Robot
  ↕
Competition
```

A member may participate in multiple projects.

A project may involve multiple members.

---

# 122. Many-to-Many Relationships

Where appropriate, use explicit many-to-many relationships.

Examples:

```text
Members ↔ Projects
Members ↔ Robots
Projects ↔ Technologies
Sponsors ↔ Competitions
```

---

# 123. Technologies

Technology tags should not become uncontrolled free-text duplicates.

Prefer a managed taxonomy where useful.

Avoid:

```text
ROS2
ROS 2
ros2
Ros2
```

being treated as four different technologies.

---

# 124. Admin Taxonomies

Where appropriate, allow the admin to manage:

- Categories.
- Technologies.
- Roles.
- Sponsor tiers.

---

# 125. Content Status

Content should support appropriate lifecycle states.

At minimum where necessary:

```text
Draft
Published
Archived
```

---

# 126. Publication Rules

Only published content appears on the public website.

Draft content must never leak through public queries.

---

# 127. Admin Preview

A future preview mechanism may be supported.

Not required for the initial version.

---

# 128. Public vs Admin Queries

Public API/database queries must explicitly filter out unpublished content.

Do not depend only on frontend filtering.

---

# 129. Database IDs

Use stable internal identifiers.

Do not expose database implementation details unnecessarily.

---

# 130. Slugs and IDs

Use human-readable slugs for public URLs.

Use internal IDs for database relationships.

---

# 131. Dates

Store dates in a consistent timezone strategy.

Use UTC internally where practical.

Convert for display as required.

---

# 132. Persian Dates

If Persian calendar display is added, keep storage independent from display formatting.

Do not store Persian calendar strings as the canonical database date.

---

# 133. Admin Date Handling

Admins should be able to clearly understand:

- Publication date.
- Competition date.
- Join date.
- Project dates.

---

# 134. Auditability

For important admin content, consider storing:

```text
createdAt
updatedAt
publishedAt
```

and optionally:

```text
createdBy
updatedBy
```

---

# 135. Admin Delete Behavior

Prefer soft deletion or archival for important content where historical integrity matters.

Especially:

- Projects.
- Competitions.
- Results.
- Team members.
- News.

---

# 136. Sponsor Removal

Removing a sponsor from the active website should not necessarily destroy the historical record.

---

# 137. Alumni

Moving a member to alumni should be a state change rather than deleting the member.

---

# 138. Team History

The database should preserve the club's history as it grows.

---

# 139. Gallery

Gallery items should be independent content records rather than hardcoded image arrays.

---

# 140. Gallery Ordering

Admin should be able to control ordering where useful.

---

# 141. Gallery Visibility

Admin must be able to decide whether an uploaded image is:

```text
Published
Hidden
Archived
```

---

# 142. Sponsor Logos

Sponsor logos should support transparent backgrounds where appropriate.

Do not force every logo into a rectangular colored box.

---

# 143. Sponsor Website

Sponsor website links should be optional but strongly encouraged.

---

# 144. Social Links

Social links should be configurable from the admin panel rather than hardcoded throughout the site.

---

# 145. Site Settings

A site settings section should be able to manage appropriate global content such as:

```text
Team display name
Contact information
Social links
Default SEO information
Footer content
```

The final logo can also be configured later.

---

# 146. Hardcoding Policy

Hardcode:

- Structural constants.
- Design tokens.
- Technical configuration.

Do not hardcode:

- Team members.
- Sponsors.
- Projects.
- Blog posts.
- Competition results.
- Gallery images.
- Social links.

---

# 147. Mock Data

Mock data may be used during development.

It must be clearly separated from production data.

---

# 148. Seed Data

A development seed should be provided where useful.

It must not contain fake achievements presented as real production information.

---

# 149. Demo Content

If demo content is required:

```text
DEMO
```

or another obvious indicator should distinguish it.

---

# 150. Testing

The implementation should include tests appropriate to the project's size.

At minimum, test:

- Critical utility functions.
- Authentication.
- Important server actions.
- Validation.
- Content publishing.
- Language behavior.

---

# 151. End-to-End Testing

Important user journeys should eventually have E2E coverage.

Examples:

```text
Visitor → browse project
Visitor → change language
Visitor → submit contact
Visitor → submit join application

Admin → login
Admin → create project
Admin → upload image
Admin → publish project
Admin → edit sponsor
```

---

# 152. Build Testing

Before declaring the project complete:

```bash
npm run lint
npm run typecheck
npm run build
```

must pass, assuming those scripts are defined.

---

# 153. No Broken Links

Production should be checked for:

- Broken internal links.
- Broken GitHub links.
- Broken sponsor links.
- Broken social links.
- Missing images.

---

# 154. No Console Errors

The production website should not generate avoidable browser console errors.

---

# 155. No Hydration Errors

Resolve all React/Next.js hydration warnings and errors before production.

---

# 156. No Development Artifacts

Production must not contain:

```text
console.log debugging
TODO placeholders
Lorem ipsum
fake users
fake sponsors
fake awards
```

unless explicitly intended.

---

# 157. Error Boundaries

Use appropriate error boundaries for important parts of the application.

A failure in one interactive section should not necessarily destroy the entire page.

---

# 158. Third-Party Services

External services should be introduced only when they provide clear value.

The initial site should remain operational with minimal external dependencies.

---

# 159. Analytics

Analytics may be added later.

If added:

- Respect privacy.
- Avoid excessive tracking.
- Document the implementation.
- Do not slow down the site unnecessarily.

---

# 160. Cookies

Only use cookies that are necessary or appropriately disclosed according to applicable privacy requirements.

The language cookie is a core functional cookie.

---

# 161. Privacy

The join/contact forms may collect personal information.

The implementation should:

- Collect only necessary information.
- Protect it.
- Restrict admin access.
- Avoid unnecessary retention.
- Provide appropriate privacy information.

---

# 162. Contact/Join Data

Do not expose form submissions through:

```text
public API
public JSON
client-side database queries
```

---

# 163. Admin API

If API endpoints are used for admin operations, authentication must be checked server-side for every protected operation.

---

# 164. HTTP Methods

Use appropriate HTTP methods.

Examples:

```text
GET
POST
PATCH
DELETE
```

Do not use GET for destructive operations.

---

# 165. API Errors

Use appropriate status codes.

Examples:

```text
400 → Invalid request
401 → Not authenticated
403 → Not authorized
404 → Not found
409 → Conflict
429 → Rate limited
500 → Server error
```

---

# 166. API Response Shape

Keep API responses consistent.

Do not return radically different structures for similar operations.

---

# 167. Security Headers

Configure appropriate security headers.

At minimum consider:

```text
Content-Security-Policy
X-Content-Type-Options
Referrer-Policy
Permissions-Policy
```

The final CSP must account for Three.js and any required external services.

---

# 168. CSP

Do not use:

```text
unsafe-eval
```

or:

```text
unsafe-inline
```

unless technically necessary and carefully justified.

---

# 169. Third-Party Scripts

Keep third-party scripts to a minimum.

Every external script increases:

- Privacy exposure.
- Performance cost.
- Failure surface.

---

# 170. YouTube

YouTube links may be stored for video content.

Do not automatically embed every YouTube video.

Use embeds only where they improve the experience.

---

# 171. Social Embeds

Instagram, LinkedIn, Telegram, etc. should generally use links rather than heavy embeds unless there is a clear UX reason.

---

# 172. GitHub

GitHub links should be ordinary external links.

Do not build an unnecessary GitHub API integration for the initial site.

---

# 173. Sponsor Links

Sponsor links should be stored as URLs in the CMS.

---

# 174. SEO and Cookie Language

Because language is cookie-based, search-engine language handling requires special care.

The implementation must follow the SEO specification rather than assuming cookie-based language automatically creates separately indexable language pages.

---

# 175. SEO Priority

Do not sacrifice technical SEO merely because the UI uses a cookie-based language switcher.

---

# 176. Documentation

Important architectural decisions should be documented.

Avoid requiring future developers to reverse-engineer the application.

---

# 177. README

The repository must contain a useful README covering:

```text
Project overview
Requirements
Installation
Environment variables
Development
Database
Migrations
Admin setup
Production build
Deployment
```

---

# 178. Setup

A new developer should be able to go from:

```text
git clone
```

to:

```text
running local website
```

without guessing undocumented steps.

---

# 179. Database Setup

Document:

```text
PostgreSQL setup
DATABASE_URL
Migrations
Seed
```

---

# 180. Admin Setup

Document how to create the initial administrator.

Do not put a real production password into documentation.

---

# 181. Deployment Documentation

Document:

```text
Build
Environment variables
Database migration
Restart
Rollback
Backup
```

---

# 182. Code Comments

Comments should explain **why**, not merely **what**.

Bad:

```ts
// Set loading to true
setLoading(true);
```

Good:

```ts
// Prevent duplicate submissions while the server action is processing.
setLoading(true);
```

---

# 183. TODOs

Do not leave vague TODOs.

Bad:

```text
TODO: fix this later
```

Better:

```text
TODO: Replace temporary team identity when official branding is approved.
```

---

# 184. Temporary Architecture

Temporary solutions should be clearly marked.

This is especially important for:

- Temporary logo.
- Temporary team name.
- Placeholder content.
- Development-only authentication configuration.

---

# 185. Brand Flexibility

The implementation must not make the future official team identity difficult to introduce.

The following should be configurable:

```text
Logo
Wordmark
Team name
Accent colors
Social links
Metadata
```

---

# 186. Design Tokens

Centralize:

```text
Colors
Typography
Spacing
Radius
Shadows
Motion
Breakpoints
```

---

# 187. Theme

The application should support dark-first design with a coherent light theme.

Do not create two unrelated designs.

---

# 188. Premium Feel

Premium should come from restraint.

Use:

```text
Whitespace
Alignment
Typography
Material contrast
Subtle animation
Quality imagery
```

not:

```text
Glow everywhere
Gradients everywhere
Huge shadows
Particles everywhere
```

---

# 189. Visual Consistency

Every page must feel like part of the same website.

Avoid making:

- Blog look like a separate application.
- Admin look like the public site.
- Gallery look like an unrelated component.
- Sponsors look like a generic advertising template.

---

# 190. Admin UI

The admin panel may have a more utilitarian design than the public website.

It does not need to be visually identical.

It must, however, remain coherent and usable.

---

# 191. Admin Desktop

Admin can prioritize desktop/laptop usage.

It should still be usable on smaller screens where practical.

---

# 192. Admin Navigation

The admin should provide clear navigation for content types.

Suggested structure:

```text
Dashboard
Team
Projects
Robots
Competitions
Results
Awards
Blog
News
Gallery
Sponsors
Partners
Applications
Messages
Settings
```

---

# 193. Dashboard

The dashboard should provide useful information rather than decorative statistics.

Potential items:

```text
Recent applications
Draft content
Recent projects
Gallery uploads
Published posts
```

---

# 194. No Fake Dashboard Metrics

Do not create meaningless cards such as:

> Engagement: 87%

unless the metric actually exists.

---

# 195. Admin Tables

Admin tables should support:

- Search where useful.
- Sorting where useful.
- Pagination.
- Edit.
- Archive/delete.
- Status.

---

# 196. Admin Editors

Editors should make content structure obvious.

For example:

```text
Project
 ├── Basic information
 ├── English
 ├── Persian
 ├── Technologies
 ├── Team
 ├── Media
 ├── Links
 └── Publishing
```

---

# 197. Publishing Confirmation

For important content, provide a clear publication state.

Avoid accidental publishing.

---

# 198. Destructive Actions

Require confirmation for:

- Delete.
- Archive where destructive.
- Remove media.
- Remove sponsor.
- Delete application.

---

# 199. Media Deletion

Before deleting media, verify whether it is referenced by other content where appropriate.

---

# 200. Orphaned Media

The system should ideally make it possible to identify unused media.

This can be implemented later if not required initially.

---

# 201. Content Integrity

Deleting a team member should not break historical projects.

Use appropriate archival/relationship handling.

---

# 202. Historical Content

The public website should be capable of preserving:

```text
Past members
Past robots
Past competitions
Past projects
Past sponsors
Past results
```

---

# 203. Current Content

Current status must remain obvious.

---

# 204. Project GitHub Links

Every project may optionally have a GitHub URL.

The GitHub URL is a supporting resource, not the primary project identity.

---

# 205. Project External Links

Projects may also contain:

- Demo.
- Documentation.
- Video.
- Paper.
- Competition page.

All optional.

---

# 206. Robots vs Projects

A robot is not necessarily the same thing as a project.

The content model must allow:

```text
Robot
 ↓
used in
 ↓
Competition

Robot
 ↓
developed through
 ↓
Project
```

---

# 207. Competitions

A competition may contain:

- Year.
- League.
- Location.
- Team.
- Robot.
- Result.
- Media.
- Report.

---

# 208. Awards

Awards should be independently managed so a competition can have multiple recognitions.

---

# 209. Sponsors

Sponsors should be independently managed.

Do not duplicate sponsor information across every page.

---

# 210. Partners

Partners should also be independently managed.

---

# 211. Content References

Use relationships rather than duplicated text wherever possible.

Example:

Instead of copying a member's name into a project as plain text:

```text
Project → Member relationship
```

This keeps the site consistent.

---

# 212. Search

A site-wide search is optional.

If implemented, prioritize:

- Projects.
- Robots.
- Blog.
- News.
- Competitions.
- Team members.

Do not implement a search engine simply for the sake of having one.

---

# 213. Filtering

Filters should be useful.

Potential filters:

```text
Projects → Technology
Projects → Status
Blog → Category
Gallery → Category
Team → Discipline
Competitions → Year
```

---

# 214. URL State

Where appropriate, filters may be reflected in URL parameters so pages can be shared.

---

# 215. Accessibility of Filters

Filters must work using keyboard navigation and screen readers.

---

# 216. Search Performance

Do not fetch the entire database to the browser and filter it with JavaScript.

Search should happen server-side when datasets become meaningful.

---

# 217. Public API Exposure

Do not create public APIs for data that does not need to be public.

---

# 218. Internal APIs

Prefer direct server-side data access when an API endpoint is unnecessary.

---

# 219. Server Actions

Server Actions may be used for internal form mutations where appropriate.

Always validate and authorize them server-side.

---

# 220. Caching and Mutations

After a mutation, invalidate only the relevant content where possible.

Do not unnecessarily rebuild or invalidate the entire website.

---

# 221. Revalidation

Use targeted revalidation for:

```text
Project
Team member
Sponsor
Blog
News
Competition
Gallery
```

---

# 222. Deployment Environment

The final deployment should follow `19_DEPLOYMENT.md`.

The implementation must not assume that local development and production have identical filesystem behavior.

---

# 223. Server Compatibility

The implementation must respect the target server limitations.

Especially:

> **Do not introduce native dependencies that require Sharp.**

---

# 224. Native Dependencies

Before adding a package with native binaries, verify:

- Linux compatibility.
- Node version compatibility.
- ARM/x86 compatibility if relevant.
- Production build behavior.

---

# 225. Build Reproducibility

The project should build consistently from a clean checkout.

---

# 226. Clean Install Test

Before release, test:

```bash
rm -rf node_modules
npm ci
npm run build
```

or the equivalent clean environment.

---

# 227. No Local-Only Dependencies

Do not rely on:

```text
localhost services
local files
developer-specific paths
```

in production.

---

# 228. Absolute Paths

Avoid hardcoded developer paths such as:

```text
/Users/parsa/...
```

---

# 229. File System

Use environment/configuration for storage paths.

---

# 230. Time

Never depend on the developer's local timezone for backend logic.

---

# 231. Internationalization

Do not hardcode:

```text
GMT+3:30
```

or another timezone into generic date logic.

---

# 232. Persian Locale

Persian formatting should be handled by the localization layer.

---

# 233. English Locale

English should use standard international formatting.

---

# 234. Accessibility Language

The document language should change correctly between English and Persian.

---

# 235. Direction

The root document direction must change correctly between:

```text
ltr
rtl
```

---

# 236. Metadata Language

Metadata should correspond to the currently represented language/content.

---

# 237. Performance Monitoring

After implementation, test:

- Lighthouse.
- Core Web Vitals.
- Mobile performance.
- 3D loading.
- Image loading.

---

# 238. Performance Priorities

Priority order:

```text
1. Usability
2. Initial page performance
3. Accessibility
4. SEO
5. 3D enhancement
```

The 3D experience must never destroy the first four.

---

# 239. Visual Regression

Where practical, important pages should have screenshot-based regression checks.

---

# 240. Browser Compatibility

Do not rely on experimental browser APIs without fallbacks.

---

# 241. Graceful Degradation

If a feature fails:

```text
3D unavailable → static visual
Image unavailable → alt/fallback
JavaScript unavailable → core content still accessible where practical
```

---

# 242. Network Conditions

The website should remain usable on slower connections.

Do not assume:

```text
1 Gbps internet
```

---

# 243. Image Loading

Use:

- Responsive image sizes.
- Lazy loading for below-the-fold imagery.
- Priority loading only for important hero imagery.

---

# 244. Video Loading

Do not automatically load large videos on page load unless necessary.

---

# 245. 3D Assets

3D assets should be optimized before deployment.

---

# 246. Three.js Asset Loading

Prefer efficient model formats and compressed assets where supported.

---

# 247. 3D Accessibility

Provide a non-3D alternative.

---

# 248. 3D Interaction

Interaction should be intuitive.

Users should not need instructions to understand that the robot can be explored.

---

# 249. 3D Controls

Avoid overwhelming controls.

Simple:

```text
Rotate
Inspect
Interact
```

is preferable.

---

# 250. No Gimmicks

Do not add:

- Fire.
- Explosions.
- Random particles.
- Flying robots.
- Sci-fi holograms.

unless they have a genuine design purpose.

---

# 251. Industrial Aesthetic

The visual system should communicate:

```text
Precision
Machines
Engineering
Laboratory
Manufacturing
Technology
```

---

# 252. Human Aesthetic

The site should simultaneously communicate:

```text
Students
People
Learning
Teamwork
Community
```

---

# 253. Balance

Target:

```text
Industrial technology
        +
Human engineering team
```

not:

```text
Corporate industrial company
```

---

# 254. Content Authenticity

Never generate fake content simply to make the website look complete.

If the team has no:

- Awards.
- Sponsors.
- Alumni.
- Results.

the website should be able to gracefully show that those sections are still developing.

---

# 255. First-Year Honesty

The first-year status should be visible in the site's story without becoming the entire brand.

---

# 256. No Fake Numbers

Never fabricate:

```text
members
projects
competitions
followers
sponsors
awards
```

---

# 257. No Fake Testimonials

Never fabricate testimonials.

---

# 258. No Fake Partners

Never fabricate partnerships.

---

# 259. No Fake Sponsors

Never fabricate sponsors.

---

# 260. No AI-Written Filler

The implementation AI must not populate empty sections with generic AI-generated filler simply because the design contains the section.

---

# 261. Placeholder Strategy

If content is missing:

```text
Hide
or
Use a deliberate empty state
```

rather than inventing content.

---

# 262. Public Quality

Every visible production sentence should feel intentionally written.

---

# 263. English Quality

English should sound like professional technical communication from an engineering organization.

---

# 264. Persian Quality

Persian should sound natural and professionally written.

---

# 265. Translation

Never perform literal machine translation of technical marketing copy and assume it is finished.

---

# 266. Content Editing

Admin content should be editable without requiring code changes.

---

# 267. Developer vs Admin Responsibilities

Developers manage:

```text
Architecture
Design system
Components
Security
Infrastructure
```

Admins manage:

```text
Members
Projects
Robots
Competitions
News
Blog
Gallery
Sponsors
Partners
```

---

# 268. Admin Should Not Edit Code

Normal content updates must not require:

```text
Git
SSH
Code changes
Database shell
```

---

# 269. Content Preview

Where practical, admin should be able to preview content before publishing.

---

# 270. Draft Safety

Drafts must remain invisible publicly.

---

# 271. Admin Errors

Admin errors should explain what the admin can do next.

---

# 272. Database Errors

Never show raw database errors to admins unless in a secure developer/debug environment.

---

# 273. Logging

Server-side logs should contain enough information to debug failures.

---

# 274. Security Principle

Treat the admin panel as a high-value target.

Even though it has only one username/password initially, it controls:

- Public content.
- Media.
- Sponsors.
- Team information.
- Recruitment information.

---

# 275. Authentication Principle

A hidden admin URL is not security.

A strong authentication and authorization layer is required.

---

# 276. Upload Security Principle

Never trust:

```text
filename
MIME type
extension
image dimensions
```

without validation.

---

# 277. Database Principle

Never trust:

```text
client-provided IDs
roles
permissions
publication status
```

without server-side verification.

---

# 278. Admin Role

The initial implementation may have only:

```text
ADMIN
```

There is no requirement for a multi-role CMS yet.

---

# 279. Future Roles

The architecture should not make future roles impossible.

Potential future roles:

```text
Editor
Media Manager
Competition Lead
```

Not required now.

---

# 280. Security Updates

Dependencies with known critical security vulnerabilities must be addressed promptly.

---

# 281. Package Auditing

Periodically review:

```bash
npm audit
```

but do not blindly apply every automated fix without checking compatibility.

---

# 282. Dependency Philosophy

Prefer stable, widely supported libraries.

Avoid obscure packages for trivial functionality.

---

# 283. UI Library

If a UI component library is used, it should complement rather than dictate the design.

Do not let a generic component library make the website look like a template.

---

# 284. Tailwind

Tailwind may be used for styling.

Keep custom design tokens centralized.

---

# 285. CSS

Avoid giant global CSS files.

Use global styles for:

- Reset.
- Tokens.
- Typography.
- Global behavior.

Keep component-specific styles near components where practical.

---

# 286. Animation Libraries

Use animation libraries only where they provide meaningful value.

---

# 287. React Three Fiber

React Three Fiber is preferred for integrating Three.js with the React architecture.

---

# 288. Three.js Isolation

Keep the Three.js scene isolated from the rest of the application.

A failure or performance issue in the 3D system should not affect normal content rendering.

---

# 289. Error Boundary for 3D

Consider an error boundary/fallback around the 3D experience.

---

# 290. 3D Asset Ownership

All 3D assets must be properly licensed or owned by the team.

Do not use random copyrighted models.

---

# 291. Photography Rights

Only use images that the team has permission to publish.

---

# 292. Sponsor Assets

Sponsor logos should be used according to appropriate brand permissions.

---

# 293. Fonts

Use properly licensed fonts.

---

# 294. Icons

Use appropriately licensed icon assets.

---

# 295. Legal Content

Do not invent legal claims.

If privacy/terms pages are added, their content should be reviewed appropriately.

---

# 296. Footer Copyright

The footer should accurately represent the organization.

Do not claim trademark ownership or official university ownership without confirmation.

---

# 297. IUST Branding

University branding should be used appropriately and without implying unsupported endorsement.

---

# 298. Future Official Identity

When the team name/logo becomes official:

```text
Update identity configuration
Replace assets
Update metadata
Review copy
```

The site architecture should not need to be rebuilt.

---

# 299. Final Visual QA

Before launch, inspect every major page visually.

Check:

```text
Spacing
Typography
Alignment
Images
Cards
Buttons
Animations
Mobile
RTL
Dark theme
Light theme
```

---

# 300. Final Functional QA

Verify:

```text
Navigation
Language switch
Forms
Admin
Authentication
Uploads
Database
Projects
Team
Robots
Competitions
Blog
News
Gallery
Sponsors
Partners
Social links
GitHub
SEO
```

---

# 301. Final Technical QA

Verify:

```text
Lint
TypeScript
Build
Database migrations
Security headers
HTTPS
Performance
Accessibility
Responsive behavior
No console errors
No hydration errors
```

---

# 302. Final Content QA

Verify:

```text
No fake content
No placeholder content
No broken translations
No broken links
No fake achievements
No outdated member status
No incorrect sponsor information
```

---

# 303. Final Deployment QA

Verify:

```text
Production environment
Database persistence
Backups
Media storage
Jimp processing
Admin authentication
Rollback procedure
Monitoring
Logs
```

---

# 304. Launch Criteria

Do not launch if any of the following are true:

- Admin authentication is insecure.
- Database is publicly exposed.
- Secrets are committed.
- Uploads can execute arbitrary files.
- Major pages are broken on mobile.
- Persian RTL is broken.
- The production build fails.
- Critical forms do not work.
- Major content contains fabricated information.
- Three.js crashes the entire page.

---

# 305. Post-Launch

After launch:

1. Monitor errors.
2. Monitor server resources.
3. Monitor database storage.
4. Monitor media storage.
5. Verify backups.
6. Collect user feedback.
7. Fix critical UX issues.
8. Avoid immediately adding unnecessary features.

---

# 306. Feature Prioritization

When deciding what to build next:

```text
1. Correctness
2. Security
3. Accessibility
4. Performance
5. UX
6. Content
7. Visual polish
8. Nice-to-have features
```

---

# 307. Do Not Overbuild

The site is for a robotics club, not a software platform.

Do not build complex infrastructure just because it is technically interesting.

---

# 308. Do Not Underbuild

At the same time, do not create a static landing page.

The website is intended to become the **main public representation of the robotics club**.

It needs a real content system.

---

# 309. Core Requirement

The public website must allow the team to grow from:

```text
First-year robotics club
```

into:

```text
Established multidisciplinary robotics organization
```

without requiring a complete rewrite.

---

# 310. Architecture Principle

Design for **evolution**, not hypothetical scale.

---

# 311. Engineering Principle

The implementation should reflect the same philosophy expected from the robotics team:

```text
Design
 ↓
Build
 ↓
Test
 ↓
Measure
 ↓
Iterate
```

---

# 312. Visual Principle

The website should feel:

> **Engineered, not generated.**

---

# 313. Content Principle

The website should feel:

> **Real, not exaggerated.**

---

# 314. Technical Principle

The codebase should feel:

> **Maintainable, not clever.**

---

# 315. UX Principle

The user should feel:

> **"These people actually build robots."**

without the website ever needing to explicitly say it every few seconds.

---

# 316. Implementation Priority

If requirements conflict, prioritize in this order:

```text
1. Security
2. Correctness
3. Accessibility
4. Performance
5. Responsive behavior
6. Content architecture
7. SEO
8. UX
9. Visual polish
10. Experimental effects
```

---

# 317. Final Rule

**Do not implement features because they look impressive in an AI-generated mockup.**

Implement them because they improve the representation of the robotics club.

---

# 318. Final Acceptance Statement

The implementation is successful when the website can truthfully communicate:

> **This is a serious student robotics club at IUST. They build real robotic systems, compete in SML, work across mechanical, hardware, software, and management, share what they learn, and are building something that can grow far beyond their first competition.**

The site should make a visitor want to:

**explore the robots, meet the people, understand the engineering, follow the competition journey, and eventually become part of it.**

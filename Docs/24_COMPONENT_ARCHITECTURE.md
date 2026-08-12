# `17_COMPONENT_ARCHITECTURE.md`

# Component Architecture Specification

## 1. Purpose

This document defines the component architecture for the robotics club website.

The architecture must support:

- A premium robotics-club public website.
- English and Persian versions.
- RTL/LTR layouts.
- Interactive Three.js experiences.
- Team/member management.
- Projects and robots.
- Competitions and results.
- Awards.
- News and blog.
- Gallery.
- Sponsors and partners.
- Join-the-team workflow.
- Contact forms.
- Social links.
- Admin-managed content.
- Future expansion into additional robotics competitions and leagues.

The architecture should remain flexible because the club is new and its identity, name, logo, robots, projects, and competition history will evolve.

---

# 2. Core Architectural Principle

The application should be built around:

> **Reusable components + data-driven content + page composition**

Avoid creating pages where content is hardcoded directly into large JSX files.

Prefer:

```text
Content
   ↓
Server / API
   ↓
Page
   ↓
Section
   ↓
Reusable components
```

---

# 3. Technology

The frontend should use:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Three.js
- React Three Fiber where appropriate
- PostgreSQL
- Prisma or the project's selected ORM
- Toastify for notifications

Image processing:

> **Jimp**

Do **not** use Sharp.

---

# 4. Next.js Architecture

Use the Next.js App Router.

Conceptually:

```text
app/
├── [locale]/
│   ├── page.tsx
│   ├── about/
│   ├── team/
│   ├── robots/
│   ├── projects/
│   ├── competitions/
│   ├── achievements/
│   ├── gallery/
│   ├── blog/
│   ├── sponsors/
│   ├── join/
│   └── contact/
│
├── admin/
│
└── api/
```

However, the actual URL strategy must follow:

`09_INTERNATIONALIZATION.md`

The application must **not** assume `/en` and `/fa` routes if the chosen implementation uses cookies.

---

# 5. Component Layers

Components should generally fall into these layers:

```text
1. Application
2. Page
3. Section
4. Feature
5. UI
6. Primitive
```

---

# 6. Application Components

These provide global application behavior.

Examples:

```text
Providers
ThemeProvider
I18nProvider
ToastProvider
AnalyticsProvider
```

They should be used sparingly.

---

# 7. Page Components

Page components represent complete routes.

Example:

```text
HomePage
TeamPage
ProjectsPage
CompetitionPage
BlogPage
ContactPage
```

A page should primarily compose sections.

It should not contain large amounts of reusable UI logic.

---

# 8. Section Components

Sections represent major visual blocks.

Examples:

```text
HeroSection
AboutSection
FeaturedProjectsSection
TeamPreviewSection
CompetitionSection
SponsorsSection
JoinTeamSection
```

Sections should be reusable when their structure is shared.

---

# 9. Feature Components

Feature components represent domain-specific functionality.

Examples:

```text
TeamMemberCard
ProjectCard
RobotCard
CompetitionCard
SponsorCard
AwardCard
BlogCard
GalleryGrid
```

---

# 10. UI Components

Generic UI components should not know about robotics-specific business logic.

Examples:

```text
Button
Badge
Card
Dialog
Modal
Tabs
Accordion
Input
Textarea
Select
Skeleton
Tooltip
```

---

# 11. Primitive Components

These should be the smallest reusable building blocks.

Examples:

```text
Container
Stack
Grid
Icon
Separator
Heading
Text
```

Do not over-engineer primitives.

---

# 12. Suggested Folder Structure

A recommended structure:

```text
src/
├── app/
├── components/
│   ├── ui/
│   ├── layout/
│   ├── navigation/
│   ├── hero/
│   ├── team/
│   ├── robots/
│   ├── projects/
│   ├── competitions/
│   ├── achievements/
│   ├── gallery/
│   ├── sponsors/
│   ├── blog/
│   ├── contact/
│   ├── join/
│   ├── three/
│   └── admin/
│
├── lib/
├── server/
├── hooks/
├── types/
└── styles/
```

The exact structure may be adjusted during implementation.

---

# 13. Component Naming

Use descriptive PascalCase names.

Good:

```text
TeamMemberCard
FeaturedRobot
CompetitionResultTable
SponsorTierSection
```

Avoid:

```text
Card1
Box
Thing
SectionA
```

---

# 14. File Naming

Use consistent filenames:

```text
TeamMemberCard.tsx
SponsorCard.tsx
HeroSection.tsx
RobotScene.tsx
```

Do not mix naming conventions.

---

# 15. Component Responsibilities

Each component should have one primary responsibility.

Bad:

```text
TeamPage.tsx
```

containing:

- Database queries.
- Authentication.
- Form processing.
- Image processing.
- 500 lines of JSX.
- Three.js.
- Filtering logic.

Instead separate those responsibilities.

---

# 16. Server vs Client Components

Prefer React Server Components by default.

Use `"use client"` only when required.

---

# 17. Client Components

Client components should be used for functionality requiring:

- Browser APIs.
- State.
- Event handlers.
- Animations requiring client execution.
- Three.js.
- Interactive filters.
- Forms where client state is needed.

---

# 18. Server Components

Server components should handle:

- Content retrieval.
- SEO metadata.
- Static content.
- Database-backed page rendering.
- Initial page composition.

---

# 19. Data Fetching

Pages should retrieve content from the server rather than embedding large datasets in client components.

Example:

```text
Server Page
    ↓
getProjects()
    ↓
ProjectCard[]
```

---

# 20. Database Access

Database access should remain server-side.

Do not expose direct database credentials or database queries to the browser.

---

# 21. Repository Layer

Database access should ideally be isolated behind functions such as:

```text
getTeamMembers()
getProjects()
getRobots()
getCompetitions()
getSponsors()
getPosts()
```

This keeps components independent from Prisma/database implementation details.

---

# 22. Service Layer

For more complicated functionality, use service modules.

Examples:

```text
teamService
projectService
competitionService
galleryService
sponsorService
```

Do not create a service layer merely for trivial one-line queries.

---

# 23. Content Architecture

The public site should be data-driven.

For example:

```text
Project
   ↓
ProjectCard
   ↓
ProjectDetail
```

The same project data should power multiple views.

---

# 24. Team Architecture

A team member should be represented by structured data.

Example conceptual model:

```text
TeamMember
├── name
├── role
├── photo
├── bio
├── skills
├── GitHub
├── personalSite
├── education
├── projects
├── joinedAt
├── active
└── visibility
```

See:

`06_CONTENT_MODEL.md`

for the authoritative data model.

---

# 25. Multiple Roles

A member may have multiple roles.

Example:

```text
Mechanical
Management
```

Therefore the component architecture must not assume a single role.

---

# 26. Team Member Card

The card should support optional fields.

For example:

```text
Photo
Name
Role(s)
Short bio
Skills
GitHub
```

Optional information should simply disappear when unavailable.

---

# 27. Team Member Profile

A detailed member profile may contain:

```text
Photo
Name
Role
Bio
Skills
Education
Projects
Social links
Join status
```

---

# 28. Current Members

Current members should be represented separately from alumni through data state rather than duplicated components.

For example:

```text
active: true
```

---

# 29. Alumni

Alumni should reuse the same member component architecture.

Only the presentation/context changes.

---

# 30. Project Architecture

Projects should use:

```text
ProjectCard
ProjectGrid
ProjectFilters
ProjectDetail
ProjectTeam
ProjectGallery
ProjectTechnologies
```

where needed.

---

# 31. Project GitHub

Each project may contain its own GitHub URL.

GitHub should be presented as a project resource rather than as the primary website CTA.

---

# 32. Robot Architecture

Robots should be separate domain entities.

Recommended components:

```text
RobotCard
RobotGrid
RobotHero
RobotSpecifications
RobotProjects
RobotGallery
```

---

# 33. Robot 3D Representation

The 3D representation should be isolated from normal robot information.

For example:

```text
RobotScene
RobotModel
RobotControls
```

The rest of the application should not depend directly on Three.js internals.

---

# 34. Three.js Boundary

Use a clear boundary:

```text
React Application
       │
       ▼
RobotScene
       │
       ▼
Three.js / R3F
```

This prevents 3D implementation details from spreading throughout the application.

---

# 35. Three.js Client Boundary

Three.js components should be client components.

Do not attempt to render browser-dependent WebGL logic directly inside Server Components.

---

# 36. 3D Loading

The 3D scene should be dynamically loaded where appropriate.

The rest of the page must remain usable while the scene initializes.

---

# 37. 3D Fallback

Provide a fallback component:

```text
RobotScene
   ↓
WebGL available?
   ├── Yes → InteractiveRobot
   └── No  → RobotFallback
```

---

# 38. Competition Architecture

Competition content should be represented independently from projects and robots.

Components may include:

```text
CompetitionCard
CompetitionTimeline
CompetitionResult
CompetitionResultsTable
CompetitionTeam
CompetitionRobot
```

---

# 39. Competition Results

Results should be reusable across:

- Competition pages.
- Home page.
- Achievement page.
- Team statistics.

---

# 40. Awards Architecture

Awards should use a reusable:

```text
AwardCard
AwardList
AwardTimeline
```

architecture.

---

# 41. Statistics

Statistics should be generated from structured data wherever possible.

Avoid manually entering statistics in multiple pages.

For example:

```text
Competition results
       ↓
Statistics service
       ↓
TeamStats
       ↓
Stats components
```

---

# 42. Sponsor Architecture

Sponsors should support:

```text
SponsorCard
SponsorGrid
SponsorTier
SponsorTierSection
```

---

# 43. Sponsor Tiers

Sponsor tier should be data-driven.

Example:

```text
Tier
├── name
├── order
├── description
└── sponsors[]
```

---

# 44. Sponsor Links

Sponsor cards should optionally link to the sponsor's website.

External links must be clearly identified where appropriate.

---

# 45. Sponsor Logo Handling

Sponsor logos should use an image component that preserves aspect ratio.

Do not apply `object-cover` to logos.

---

# 46. Gallery Architecture

Gallery should be divided into:

```text
GalleryGrid
GalleryItem
GalleryLightbox
GalleryFilters
```

if filtering is required.

---

# 47. Gallery Data

Gallery items should be data-driven.

Each item may contain:

```text
image
caption
category
date
project
competition
visibility
```

---

# 48. Gallery Uploads

Admin uploads should not require developers to modify code.

The admin panel should create/update gallery content.

---

# 49. Media Processing Boundary

Media processing should remain server-side.

Architecture:

```text
Admin Upload
     ↓
Validation
     ↓
Jimp
     ↓
Storage
     ↓
Database metadata
     ↓
Public Gallery
```

---

# 50. Blog Architecture

Blog components:

```text
BlogCard
BlogGrid
BlogFilters
BlogArticle
RelatedPosts
```

---

# 51. Blog Content

Blog content should be independent from the presentation.

The same post can appear in:

- Blog page.
- Homepage.
- Related posts.
- Search results.

---

# 52. News Architecture

News can share blog infrastructure where appropriate.

However:

> Do not force news and long-form articles into exactly the same content model if their requirements differ.

---

# 53. Contact Architecture

Contact functionality should be separated into:

```text
ContactInfo
ContactForm
ContactSocialLinks
ContactStatus
```

---

# 54. Join Team Architecture

The recruitment experience should use dedicated components:

```text
JoinTeamHero
JoinTeamRequirements
JoinTeamForm
JoinTeamSuccess
```

---

# 55. Forms

Forms should use reusable field components where practical:

```text
FormField
FormLabel
FormError
FormDescription
```

---

# 56. Form Validation

Validation should exist on both:

```text
Client
Server
```

Client validation improves UX.

Server validation provides actual security.

---

# 57. Toastify

Toastify should be centralized.

Use a global ToastContainer rather than creating independent containers throughout the site.

---

# 58. Toast Usage

Use toasts for transient feedback such as:

```text
Form submitted
Copy succeeded
Admin action succeeded
Upload completed
Error occurred
```

Do not use toasts for critical information that users need to read later.

---

# 59. Toast Responsiveness

Toastify configuration must remain mobile-friendly.

---

# 60. Navigation Architecture

Navigation should be built from structured navigation data.

Example:

```text
navigationItems[]
```

rather than duplicating links across desktop and mobile menus.

---

# 61. Desktop Navigation

Desktop navigation component:

```text
DesktopNav
```

---

# 62. Mobile Navigation

Mobile navigation component:

```text
MobileNav
MobileMenu
```

Both should use the same navigation source.

---

# 63. Language Switcher

The language switcher should be a reusable component:

```text
LanguageSwitcher
```

It must understand:

```text
English
Persian
```

and preserve the current page where possible.

---

# 64. RTL/LTR

The root application layout should determine:

```text
dir="ltr"
```

or:

```text
dir="rtl"
```

based on the selected language.

Components should not independently decide the document direction.

---

# 65. Direction-Aware Components

Components should avoid hardcoded assumptions such as:

```text
margin-left
```

where logical properties are more appropriate.

Prefer:

```text
margin-inline-start
margin-inline-end
padding-inline
```

or Tailwind equivalents.

---

# 66. Icons

Icons that represent directional concepts must adapt to RTL.

For example:

```text
ArrowRight
```

may need visual mirroring in Persian.

---

# 67. Layout Components

Create shared layout components:

```text
SiteHeader
SiteFooter
PageContainer
PageHeader
Section
```

---

# 68. Page Container

`PageContainer` should centralize:

- Maximum width.
- Horizontal padding.
- Responsive behavior.

This prevents every page from inventing its own container.

---

# 69. Section Component

A generic section component may control:

```text
vertical spacing
background
container
alignment
```

but should not become a universal component with dozens of unrelated props.

---

# 70. Design System

UI components should consume the project's design tokens.

Avoid hardcoding random colors throughout components.

---

# 71. Color Usage

Colors should come from semantic tokens such as:

```text
background
surface
text-primary
text-secondary
border
accent
```

rather than:

```text
#123456
```

inside individual components.

---

# 72. Typography Components

If useful, provide:

```text
Heading
Text
Eyebrow
Label
```

but do not abstract every `<p>` into a component.

---

# 73. Button Architecture

Buttons should support semantic variants:

```text
primary
secondary
outline
ghost
danger
```

as required.

---

# 74. Links vs Buttons

Use:

```text
<Link>
```

for navigation.

Use:

```text
<button>
```

for actions.

Do not use clickable `<div>` elements.

---

# 75. Cards

Cards should not automatically be clickable.

Only make them links when the entire card genuinely represents navigation.

---

# 76. Accessibility

Components must follow:

`14_ACCESSIBILITY.md`

This includes:

- Keyboard navigation.
- Focus states.
- ARIA where necessary.
- Touch targets.
- Reduced motion.
- Screen reader behavior.

---

# 77. Component States

Interactive components should define:

```text
default
hover
focus
active
disabled
loading
error
success
```

where relevant.

---

# 78. Loading States

Data-driven components should have appropriate loading states when loading occurs client-side.

---

# 79. Empty States

Components should gracefully handle empty data.

Example:

```text
No projects published yet.
```

should look intentional rather than broken.

---

# 80. Error States

Errors should be communicated clearly.

Avoid displaying raw database/API errors to users.

---

# 81. Skeletons

Skeleton components may be used where they improve perceived performance.

Do not create skeletons for every component automatically.

---

# 82. Error Boundaries

Major application areas should have appropriate error boundaries.

Especially:

```text
Public pages
Admin
Three.js
Gallery
```

---

# 83. 3D Error Isolation

A Three.js failure must not crash the entire homepage.

The 3D scene should have its own failure boundary/fallback.

---

# 84. Admin Architecture

Admin components should be isolated under:

```text
components/admin/
```

and should not unnecessarily leak admin-specific logic into public components.

---

# 85. Admin Layout

Use:

```text
AdminLayout
AdminSidebar
AdminHeader
AdminContent
```

---

# 86. Admin CRUD Components

Reusable admin components may include:

```text
DataTable
AdminForm
MediaUploader
RichTextEditor
ConfirmDialog
StatusToggle
```

---

# 87. Admin Forms

Admin forms should be generated around domain entities where appropriate:

```text
TeamMemberForm
ProjectForm
RobotForm
CompetitionForm
SponsorForm
GalleryItemForm
BlogPostForm
```

---

# 88. Admin Authentication

The admin UI should never determine authorization by itself.

Server-side authentication and authorization are authoritative.

---

# 89. Public vs Admin Components

Do not reuse an admin-specific form as a public form simply because it looks similar.

Shared primitives can be reused.

---

# 90. API Architecture

Components should not directly construct database queries.

Use server actions/API routes/services according to the application architecture.

See:

`18_API_AND_SERVER_ARCHITECTURE.md`

---

# 91. Server Actions

Server Actions may be used for suitable admin mutations and form submissions.

They must still perform:

- Authentication.
- Authorization.
- Validation.
- Sanitization.

---

# 92. API Routes

API routes should be used where an actual HTTP API is appropriate.

Avoid creating API endpoints for every component.

---

# 93. Types

Shared domain types should live in a predictable location.

For example:

```text
types/
├── team.ts
├── project.ts
├── robot.ts
├── competition.ts
├── sponsor.ts
└── blog.ts
```

---

# 94. Database Types

Do not expose raw Prisma types throughout the entire frontend if that couples UI too tightly to the database schema.

Use appropriate DTO/view-model types when necessary.

---

# 95. View Models

A page-specific representation can be useful.

Example:

```text
TeamMemberCardData
```

instead of passing the entire database object to a card.

---

# 96. Data Transformation

Transform data at the server boundary where possible:

```text
Database
   ↓
Service
   ↓
View Model
   ↓
Component
```

---

# 97. Hooks

Custom hooks should contain reusable client-side behavior.

Examples:

```text
useGalleryLightbox
useMobileMenu
useCountdown
useToast
```

Do not create hooks simply to wrap one line of code.

---

# 98. Browser APIs

Browser-only functionality should remain isolated.

Examples:

```text
window
document
localStorage
matchMedia
WebGL
```

---

# 99. Third-Party Libraries

Third-party libraries should be isolated behind components when practical.

For example:

```text
Three.js
Toastify
```

should not become dependencies of unrelated UI components.

---

# 100. Dependency Discipline

Do not add a library when a small native/React implementation is sufficient.

Every dependency should have a clear purpose.

---

# 101. Component Reusability

Do not optimize for maximum theoretical reuse.

Optimize for:

> **Clear responsibility and useful reuse.**

A component reused twice can be worthwhile.

A 40-prop "universal card" is not.

---

# 102. Avoid Prop Explosion

Avoid components such as:

```text
Card
├── variant
├── size
├── layout
├── theme
├── direction
├── imagePosition
├── animation
├── hover
├── ...
```

when separate components would be clearer.

---

# 103. Composition

Prefer composition:

```tsx
<Card>
  <CardImage />
  <CardContent>
    <CardTitle />
    <CardDescription />
  </CardContent>
</Card>
```

where it genuinely improves flexibility.

---

# 104. Domain Components

Domain components should remain understandable.

For example:

```text
CompetitionResultCard
```

is preferable to:

```text
UniversalDataCard
```

when the content is competition-specific.

---

# 105. Component Dependencies

Prefer dependency direction:

```text
Primitives
   ↑
UI
   ↑
Features
   ↑
Sections
   ↑
Pages
```

Lower-level components should not import higher-level page components.

---

# 106. Circular Dependencies

Avoid circular imports between components.

If two components depend on each other, reconsider the abstraction.

---

# 107. Client Boundary Discipline

Keep `"use client"` as low in the component tree as possible.

Example:

```text
Page (Server)
   ↓
Hero (Server)
   ↓
RobotScene (Client)
```

rather than:

```text
Page (Client)
   ↓
Everything becomes client-side
```

---

# 108. Performance

Component architecture must support:

- Server rendering.
- Streaming where useful.
- Lazy loading.
- Code splitting.
- Dynamic imports.
- Efficient image loading.

---

# 109. Dynamic Imports

Use dynamic imports for heavy optional features such as the Three.js scene where appropriate.

---

# 110. Bundle Isolation

Heavy libraries should not be imported into the entire application bundle unnecessarily.

Three.js should not be part of simple pages such as Contact unless needed.

---

# 111. Animation Architecture

Animations should be encapsulated.

Examples:

```text
AnimatedSection
Reveal
HoverCard
RobotScene
```

Avoid scattering animation configuration throughout unrelated components.

---

# 112. Animation Restraint

The website should feel:

> Premium and engineered.

not:

> Constantly animated.

Animations should communicate hierarchy or interaction.

---

# 113. Responsive Animation

Animations should adapt according to viewport/device capability.

---

# 114. SEO Components

SEO should be generated at the page/server level.

Components should not independently manipulate document metadata.

---

# 115. Structured Data

Structured data should be generated from actual content.

Relevant structured data may include:

```text
Organization
Article
Event
Person
```

where applicable.

---

# 116. Social Sharing

Open Graph/Twitter metadata should be generated from page content.

---

# 117. Image Component

Use Next.js Image where appropriate.

The image abstraction should support:

- Responsive sizing.
- Lazy loading.
- Priority images.
- Alt text.
- Aspect ratios.

---

# 118. External Images

External image sources must be explicitly configured and validated.

---

# 119. Icons

Use a consistent icon library or project icon system.

Do not mix random icon styles.

---

# 120. Logo

The final club logo is intentionally not defined yet.

Therefore:

```text
TeamLogo
```

should be an abstraction that allows the final identity to be introduced later without restructuring the site.

---

# 121. Temporary Branding

Until the final logo exists, use a neutral temporary mark/wordmark.

Do not build the entire component architecture around the temporary logo.

---

# 122. Identity Flexibility

The component system must support future:

```text
Team name
Logo
Colors
Typography
Competition focus
```

changes without rewriting the application.

---

# 123. IUST Relationship

The website should represent the team as:

> A robotics club associated with IUST.

The architecture must not hardcode the current competition as the team's permanent identity.

---

# 124. Competition Expansion

The current focus is:

> Smart Manufacturing League (SML)

but future leagues must be possible.

The architecture should therefore support:

```text
Robotics Club
├── SML
├── Future League
├── Future Competition
└── Future Event
```

without redesigning the database or navigation.

---

# 125. Community Architecture

The club is not only a competition team.

Components should support:

```text
Engineering
Competition
Education
Research
Community
```

as first-class content areas.

---

# 126. Future Expansion

Possible future sections may include:

```text
Research
Workshops
Tutorials
Open Source
Publications
Events
Community Projects
Recruitment
```

The architecture should allow these to be added without restructuring the entire site.

---

# 127. Component Testing

Critical interactive components should be testable independently.

Prioritize testing for:

```text
Forms
Navigation
Language switching
Admin CRUD
Gallery
Lightbox
3D fallback
Authentication
```

---

# 128. Visual Testing

Important components should be visually checked across:

```text
Desktop
Tablet
Mobile
RTL
LTR
```

---

# 129. RTL Component Testing

Every component containing:

- Directional icons.
- Alignment.
- Navigation.
- Flex layouts.
- Absolute positioning.

must be checked in both RTL and LTR.

---

# 130. Component Documentation

Complex components should contain concise documentation explaining:

- Purpose.
- Important props.
- Client/server requirements.
- Special behavior.

Do not document obvious React syntax.

---

# 131. Props

Props should be typed with TypeScript.

Avoid:

```text
any
```

unless there is a documented reason.

---

# 132. Strict TypeScript

The project should use strict TypeScript settings.

Components should not rely on implicit `any`.

---

# 133. Data Validation

Types do not replace runtime validation.

External/admin data must be validated before being trusted.

---

# 134. Security Boundary

Never trust:

```text
component props
client state
hidden form fields
browser requests
```

for authorization.

The server is authoritative.

---

# 135. Admin Content Visibility

Content can have states such as:

```text
draft
published
hidden
archived
```

The component architecture should support these states.

---

# 136. Selective Publishing

The admin should be able to decide what becomes publicly visible.

A newly uploaded gallery image should not automatically become public unless that is explicitly intended.

---

# 137. Content Preview

Where practical, admin components may provide previews before publication.

---

# 138. Reusable Confirmation Dialog

Destructive admin operations should use a reusable confirmation component:

```text
ConfirmDialog
```

Examples:

```text
Delete project?
Remove gallery item?
Delete sponsor?
```

---

# 139. Notifications

All admin mutations should provide clear feedback.

Use Toastify for appropriate success/error feedback.

---

# 140. Optimistic UI

Use optimistic updates only where they genuinely improve UX and where rollback is safe.

Do not use optimistic updates for sensitive/destructive actions without robust error handling.

---

# 141. Final Component Tree

A conceptual public component architecture:

```text
App
│
├── SiteHeader
│   ├── Logo
│   ├── DesktopNav
│   ├── MobileNav
│   └── LanguageSwitcher
│
├── Page
│   │
│   ├── HeroSection
│   │   └── RobotScene
│   │
│   ├── AboutSection
│   │
│   ├── FeaturedRobotsSection
│   │   └── RobotCard
│   │
│   ├── FeaturedProjectsSection
│   │   └── ProjectCard
│   │
│   ├── CompetitionSection
│   │   └── CompetitionCard
│   │
│   ├── TeamSection
│   │   └── TeamMemberCard
│   │
│   ├── AchievementsSection
│   │   └── AwardCard
│   │
│   ├── SponsorsSection
│   │   └── SponsorTierSection
│   │
│   └── JoinTeamSection
│
└── SiteFooter
```

---

# 142. Admin Component Tree

```text
Admin
│
├── AdminLayout
│   ├── AdminHeader
│   ├── AdminSidebar
│   └── AdminContent
│
├── Dashboard
│
├── TeamManagement
│   ├── TeamMemberTable
│   └── TeamMemberForm
│
├── ProjectManagement
│   ├── ProjectTable
│   └── ProjectForm
│
├── RobotManagement
│   ├── RobotTable
│   └── RobotForm
│
├── CompetitionManagement
│
├── AchievementManagement
│
├── SponsorManagement
│
├── GalleryManagement
│   └── MediaUploader
│
├── BlogManagement
│   └── BlogEditor
│
└── Settings
```

---

# 143. Final Architectural Rule

The most important rule is:

> **Do not build the website as a collection of pages. Build it as a reusable robotics-club platform whose pages are compositions of domain components.**

The team is expected to evolve significantly—from its current **SML/industrial robotics focus** into potentially multiple leagues, projects, research areas, educational activities, and community initiatives.

The architecture must evolve with it without requiring a rewrite.

The final implementation should therefore prioritize:

```text
Clear
   ↓
Composable
   ↓
Data-driven
   ↓
Responsive
   ↓
Accessible
   ↓
Performant
   ↓
Extensible
```

over unnecessary abstraction.

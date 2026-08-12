# 03 — Information Architecture

**Document:** `03_INFORMATION_ARCHITECTURE.md`
**Project:** IUST Robotics
**Status:** Product architecture
**Primary language:** English
**Secondary language:** Persian
**Direction:** LTR / RTL
**Current competition:** RoboCup Industrial — Smart Manufacturing League (SML)
**Future scope:** Multiple robotics leagues and competitions

---

# 1. Purpose

This document defines how information is organized throughout the IUST Robotics website.

The website should represent **IUST Robotics as a robotics club**, not as an SML team.

SML is the team's current competition and an important part of the current story, but the architecture must not make the organization dependent on one league.

The structure must therefore support:

```text
IUST Robotics
│
├── Robotics Club
│
├── Competitions
│   └── Smart Manufacturing League
│
├── Robots
│
├── Projects
│
├── Research
│
├── Education
│
├── Community
│
└── Future Competitions
```

---

# 2. Core Architectural Principle

The website should be organized around **entities and relationships**, not only pages.

Important entities include:

```text
Team
Member
Robot
Project
Competition
Result
Award
News
Blog Post
Gallery
Sponsor
Partner
Technology
Event
Department
```

These entities should be able to reference each other.

---

# 3. Core Relationship Model

The conceptual relationship should be:

```text
Member
   │
   ├── works on ──→ Project
   │                  │
   │                  └── uses ──→ Technology
   │
   └── works on ──→ Robot
                       │
                       └── participates in ──→ Competition
                                                    │
                                                    └── produces ──→ Result
```

Additional relationships:

```text
Sponsor
   └── supports ──→ Team / Project / Competition

Partner
   └── collaborates with ──→ Team

Blog Post
   └── references ──→ Project / Robot / Competition / Member

Gallery
   └── references ──→ Project / Robot / Competition / Event
```

This relationship-driven architecture should be reflected in both the CMS and frontend.

---

# 4. Primary Navigation

The primary navigation should remain relatively small.

Recommended desktop navigation:

```text
About
Team
Work
Competitions
Journal
Gallery
Sponsors
Contact
```

Where **Work** acts as a grouping rather than necessarily being a page.

Potential Work submenu:

```text
Projects
Robots
Research
Technologies
```

Potential Competitions submenu:

```text
Current Competition
Competition History
Results
Awards
```

Potential Journal submenu:

```text
News
Blog
```

The exact visual implementation can change.

The information architecture should remain stable.

---

# 5. Recommended Main Navigation

Final conceptual structure:

```text
ABOUT
TEAM
WORK
  ├── Projects
  ├── Robots
  ├── Technologies
  └── Research

COMPETITIONS
  ├── Current
  ├── History
  ├── Results
  └── Awards

JOURNAL
  ├── News
  └── Blog

GALLERY

SPONSORS

CONTACT
```

A prominent **Join the Team** action may appear in the header without becoming a primary navigation category.

---

# 6. Homepage

Route:

```text
/
```

Persian:

```text
/
```

The language is determined through the cookie rather than `/en` and `/fa`.

The homepage should introduce the organization rather than duplicate every page.

Recommended conceptual sections:

```text
Hero
↓
Introduction
↓
Current Focus
↓
Featured Robot
↓
Featured Projects
↓
Engineering Capabilities
↓
Competition
↓
Team Preview
↓
Milestones / Statistics
↓
Sponsors
↓
Journal Preview
↓
Join / Contact
```

The exact number of sections should remain flexible.

---

# 7. Homepage Hero

The hero should communicate:

- IUST Robotics.
- Robotics club identity.
- Current engineering direction.
- Current competition where appropriate.

Potential structure:

```text
IUST ROBOTICS

Building intelligent robotic systems
through engineering, competition,
research, and collaboration.

[Explore Our Work]
[Join the Team]

                 [3D ROBOT]
```

The exact copy must be developed separately.

---

# 8. About

Route:

```text
/about
```

The About page explains:

- Who IUST Robotics is.
- Why the club exists.
- Relationship with IUST.
- Current stage.
- Vision.
- Mission.
- Engineering philosophy.
- Competition philosophy.
- Education.
- Research.
- Community.

The page should clearly distinguish:

> **IUST Robotics is the club.**

from:

> **SML is the current competition focus.**

---

# 9. IUST Relationship

The website should identify the organization as:

> IUST Robotics

and communicate its connection with:

> Iran University of Science and Technology (IUST)

The relationship should be represented accurately.

Because the university does not currently provide extensive support, the website must avoid implying official institutional sponsorship or endorsement unless explicitly confirmed.

The wording should remain factual.

For example:

> A robotics club based at Iran University of Science and Technology.

rather than:

> Official robotics team of IUST

unless that status is formally established.

---

# 10. Team

Route:

```text
/team
```

The Team page is one of the most important pages.

It should communicate the people behind the engineering.

Potential structure:

```text
Team Introduction
↓
Team Statistics
↓
Departments
↓
Current Members
↓
Alumni
↓
Team Leadership
```

---

# 11. Team Member Profiles

Route:

```text
/team/[slug]
```

Each member can have:

- Name.
- Role.
- Photo.
- Bio.
- Skills.
- GitHub.
- Personal website.
- Education.
- Projects.
- Departments.
- Joined status.
- Social links where appropriate.

Most fields should be optional.

---

# 12. Multiple Roles

A member may belong to more than one department.

For example:

```text
Parsa Samiei

Software
Management
```

The data model must therefore support:

```text
Member ↔ Department
```

as a many-to-many relationship.

Do not store only one department string.

---

# 13. Departments

Initial departments:

```text
Mechanical
Hardware
Software
Management
```

The architecture should allow additional departments later.

Examples:

```text
Research
AI
Perception
Electrical
Media
Operations
```

These should not require schema redesign if the system is modeled correctly.

---

# 14. Current Members

Current members should be separated from alumni.

The frontend should allow:

```text
Current Members
Alumni
```

without requiring separate manually maintained pages.

Membership status should be data-driven.

---

# 15. Alumni

Route:

```text
/team/alumni
```

This section should grow over time.

Alumni may have:

- Name.
- Former role.
- Projects.
- Period of membership.
- Education.
- Current organization.
- Website.
- LinkedIn.

All fields remain optional.

---

# 16. Join the Team

Route:

```text
/join
```

The page should explain:

- Who can join.
- What the team works on.
- Available areas.
- What applicants can expect.
- What the team expects.
- How selection works.
- Application/contact form.

The page should not promise acceptance.

---

# 17. Projects

Route:

```text
/projects
```

This is a major content section.

Projects should represent actual engineering work.

Potential project categories:

```text
Software
Hardware
Mechanical
AI
Robotics
Research
Infrastructure
```

Categories should be configurable.

---

# 18. Project Detail

Route:

```text
/projects/[slug]
```

Potential content:

```text
Project title
Short description
Hero media
Status
Project category
Team members
Robot
Technologies
Competition
Detailed description
Technical architecture
Gallery
Videos
GitHub
Related projects
```

Not all projects need all fields.

---

# 19. GitHub Integration

GitHub should be represented as a **project-level external link**.

The GitHub repository is not the main event.

The website should tell the story first.

Example:

```text
Autonomous Navigation System

[Overview]
[Architecture]
[Technologies]
[Team]

GitHub Repository →
```

The GitHub link should be managed through the admin panel.

---

# 20. Robots

Route:

```text
/robots
```

The Robots page should present physical robotic systems developed by the team.

Each robot should be treated as an entity rather than simply an image.

---

# 21. Robot Detail

Route:

```text
/robots/[slug]
```

Potential content:

```text
Robot name
Status
Purpose
Competition
Overview
Specifications
Sensors
Compute
Control
Software
Mechanical system
Projects
Team members
Gallery
Videos
Technical documents
```

All sections should be optional.

---

# 22. Robot Versions

The architecture should allow multiple versions.

Example:

```text
Robot X
├── Prototype
├── V1
├── V2
└── Competition Edition
```

This becomes valuable as the team grows.

Do not assume the first robot is the final robot.

---

# 23. Technologies

Route:

```text
/technologies
```

The site should be able to communicate the technical stack.

Current technologies include:

```text
ROS 2
Python
C++
YOLO
SLAM
LiDAR
NVIDIA Jetson
STM
Altium Designer
SolidWorks
```

The technology system should be expandable.

---

# 24. Technology Detail

Route:

```text
/technologies/[slug]
```

Potential content:

```text
Technology name
Category
Description
Projects using it
Robots using it
Team members with expertise
External website/documentation
```

This can eventually become an important SEO surface.

---

# 25. Research

Route:

```text
/research
```

Research should be presented as an area of the club, not necessarily as academic publications only.

Potential content:

- Research projects.
- Experiments.
- Technical investigations.
- Papers.
- Publications.
- Technical notes.

If there is insufficient content at launch, this page can remain unpublished.

---

# 26. Competitions

Route:

```text
/competitions
```

This page should establish:

> IUST Robotics participates in robotics competitions as part of its broader club activities.

Potential structure:

```text
Current Competition
↓
Upcoming Competitions
↓
Competition History
↓
Results
↓
Awards
```

---

# 27. Current Competition

The current competition:

> Smart Manufacturing League (SML)

SML is a RoboCup competition focused on industrial/manufacturing robotics.

The site should explain this in accessible language.

It should not assume that visitors already understand RoboCup or SML.

---

# 28. Competition Detail

Route:

```text
/competitions/[slug]
```

Potential content:

```text
Competition name
Organizer
League
Year
Location
Description
Rules
Robot
Projects
Team members
Results
Awards
Media
External website
```

---

# 29. Competition History

The architecture should support:

```text
2026
Smart Manufacturing League

2027
Competition A
Competition B

2028
...
```

The team should not need a redesign when additional leagues are added.

---

# 30. Competition Results

Results should be structured data.

Potential fields:

```text
Competition
Year
Stage
Placement
Score
Award
Notes
```

Example:

```text
Competition:
Smart Manufacturing League

Year:
2026

Result:
Qualification

Placement:
...
```

Only publish verified information.

---

# 31. Awards

Route:

```text
/awards
```

Awards may be linked to:

- Competition.
- Year.
- Team.
- Project.
- Robot.

Awards should not be shown if the team does not have any.

Do not create placeholder achievements.

---

# 32. News

Route:

```text
/news
```

News is for organizational updates.

Examples:

- New competition announcement.
- Team milestone.
- Sponsor announcement.
- Competition participation.
- New robot.
- Major team update.

News should be relatively short.

---

# 33. Blog

Route:

```text
/blog
```

Blog content should be deeper and more educational.

Examples:

- How we implemented SLAM.
- Designing a robotics PCB.
- Our experience with ROS 2.
- Building a perception pipeline.
- Lessons from competition.

This section can eventually become one of the most valuable technical resources on the site.

---

# 34. Blog Detail

Route:

```text
/blog/[slug]
```

Potential fields:

```text
Title
Subtitle
Author
Date
Cover image
Content
Tags
Related projects
Related robots
Related technologies
Reading time
```

---

# 35. Journal

News and Blog should be grouped conceptually as:

> Journal

but they should remain separate content types.

Reason:

```text
News = What happened?

Blog = What did we learn?
```

---

# 36. Gallery

Route:

```text
/gallery
```

The gallery should support:

- Team.
- Robots.
- Projects.
- Competitions.
- Events.
- Workshops.

Each media item may belong to one or more contexts.

---

# 37. Gallery Detail

A gallery item may contain:

```text
Image
Video
Title
Description
Date
Category
Related robot
Related project
Related competition
Related event
```

Video items may use YouTube URLs.

Videos should not be uploaded to the application server unless there is a strong future reason.

---

# 38. YouTube

The website should support YouTube links.

Preferred behavior:

```text
Admin enters YouTube URL
↓
System stores URL
↓
Frontend renders appropriate video/embed
```

Do not store large video files directly on the VPS.

---

# 39. Sponsors

Route:

```text
/sponsors
```

Sponsors should be presented as long-term partners of the organization.

The page should communicate:

- Current sponsors.
- Sponsorship tiers.
- Support received.
- Sponsor websites.

---

# 40. Sponsor Tiers

The CMS must support configurable tiers.

Example:

```text
Title Sponsor
Gold
Silver
Bronze
Technology Partner
Strategic Partner
```

These are examples, not final names.

The admin should be able to define the tier structure.

---

# 41. Sponsor Entity

A sponsor should have:

```text
Name
Logo
Website
Description
Tier
Start date
End date
Display status
Order
```

Potential future fields:

```text
Social links
Sponsor category
Supported project
Supported competition
```

---

# 42. Partners

Sponsors and partners should remain separate entities.

A company may:

- Sponsor the team.
- Provide technology.
- Collaborate technically.
- Provide equipment.
- Become a strategic partner.

These relationships should not be forced into one generic "sponsor" model.

---

# 43. Contact

Route:

```text
/contact
```

The contact page should follow the same general philosophy as the existing Pishtalk contact experience.

Potential contact information:

```text
Email
Social media
GitHub
LinkedIn
Instagram
YouTube
Telegram
```

The exact contact information should be configurable.

---

# 44. Contact Form

The initial implementation should include a contact form.

Potential fields:

```text
Name
Email
Subject
Message
```

Optional:

```text
Organization
Reason for contact
```

The form should support:

```text
Validation
Loading
Success
Failure
Spam protection
Toast notification
```

---

# 45. Social Platforms

Initial supported platforms:

```text
Instagram
LinkedIn
YouTube
GitHub
Telegram
```

Social links should be managed centrally.

Do not hard-code them into individual components.

---

# 46. Statistics

The website should have a reusable statistics system.

Potential statistics:

```text
Team members
Projects
Robots
Competitions
Years active
Awards
```

Only meaningful and verified values should be displayed.

Statistics may be calculated automatically where possible.

For example:

```text
Number of published projects
Number of active members
Number of competitions
```

This is preferable to manually entering numbers that can become outdated.

---

# 47. Timeline

A timeline should eventually represent major milestones.

Example:

```text
2026
Club founded

2026
First robot developed

2026
First SML participation

2027
...
```

Timeline items should be managed through the CMS.

---

# 48. Search

A site-wide search should be considered as the content volume grows.

Searchable entities:

```text
Projects
Robots
Competitions
Team members
Blog posts
News
Technologies
```

It may not be required for the initial MVP if content volume is low.

The architecture should not prevent adding it later.

---

# 49. Related Content

Pages should provide contextual related content.

Examples:

Project:

```text
Related robot
Related competition
Team members
Related technologies
```

Robot:

```text
Projects
Competitions
Team
Gallery
```

Blog:

```text
Related project
Related technology
Related robot
```

---

# 50. SEO-Friendly URL Strategy

URLs should be:

- Short.
- Human-readable.
- Stable.
- Language-independent.

Recommended:

```text
/projects/autonomous-navigation
/robots/industrial-mobile-platform
/competitions/smart-manufacturing-league
/team/member-name
/blog/slam-for-mobile-robots
```

Do not include language prefixes.

---

# 51. Language Architecture

The site must support:

```text
English
Persian
```

without:

```text
/en
/fa
```

The selected language should be stored in a cookie.

---

# 52. Language Behavior

On first visit:

1. Determine a reasonable default.
2. Prefer English.
3. Allow the visitor to change language.
4. Store the selection in a cookie.
5. Apply it to subsequent pages.

The preference should persist.

---

# 53. RTL Architecture

When Persian is selected:

```text
<html dir="rtl" lang="fa">
```

or equivalent framework behavior must be applied appropriately.

RTL must affect:

- Navigation.
- Text.
- Layout.
- Icons where direction matters.
- Forms.
- Tables.
- Breadcrumbs.
- Pagination.
- Modals.

It must not be implemented as simply:

```css
direction: rtl;
```

on the entire application without testing component behavior.

---

# 54. Bilingual Content

Content should support English and Persian versions independently.

For content such as:

```text
Project
Blog post
Competition
Robot
Sponsor
```

the admin should be able to provide:

```text
English title
Persian title

English description
Persian description

English body
Persian body
```

where applicable.

---

# 55. Missing Translation Behavior

A translation may be missing.

The frontend must handle this intentionally.

Possible behavior:

```text
If Persian content exists:
    show Persian

If Persian content does not exist:
    show the configured fallback behavior
```

Do not display broken translation keys.

The exact fallback policy should be finalized during implementation.

---

# 56. Admin Language

The admin panel itself should be:

> **English only.**

This simplifies administration.

However, the admin must be able to manage both:

- English website content.
- Persian website content.

---

# 57. Admin Content Structure

For bilingual content:

```text
Admin
│
├── English
│   ├── Title
│   ├── Description
│   └── Content
│
└── Persian
    ├── Title
    ├── Description
    └── Content
```

The editor should make it clear which language is being edited.

---

# 58. Content Visibility

Not all database records must be public.

Every relevant entity should support publication control.

Conceptually:

```text
Draft
Published
Archived
```

or an equivalent model.

---

# 59. Granular Publishing

Administrators should be able to decide what appears publicly.

For example:

A member may exist in the database but:

```text
Public profile = false
```

A project may exist but:

```text
Published = false
```

A gallery item may be uploaded but:

```text
Visible = false
```

This is important because the team explicitly does not want every internal item automatically public.

---

# 60. Admin Content Model

The admin should be able to manage at minimum:

```text
Members
Alumni
Departments
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
Technologies
Timeline
Social links
Contact information
Homepage content
Site settings
```

---

# 61. Authentication

The initial admin system should use:

```text
Username
Password
```

There is no need for a public member account system.

There should be no:

- Public registration.
- User profiles.
- Member login.
- Public dashboards.

unless future requirements change.

---

# 62. Admin Media Management

The admin should support uploading:

- Member photos.
- Robot images.
- Project images.
- Gallery images.
- Sponsor logos.
- Blog images.

The existing Pishtalk project should be used as a reference for the implementation approach.

Reference repository:

```text
https://github.com/ParsaSamiei/PishTalkrepo
```

Important implementation constraint:

> **Use Jimp, not Sharp.**

Sharp must not be introduced because it is incompatible with the target server environment.

---

# 63. Media Storage

The architecture should separate:

```text
Database metadata
```

from:

```text
Media files
```

The database stores information about media.

The storage system stores the actual files.

This allows the storage implementation to evolve later.

---

# 64. Media Processing

Jimp should be used for server-side image processing where required.

Potential operations:

- Resize.
- Crop.
- Optimize.
- Generate thumbnails.
- Normalize images.

Do not introduce Sharp as a dependency.

---

# 65. Content Deletion

Deleting content should be treated carefully.

The admin should have confirmation for destructive operations.

Where appropriate, soft deletion/archive should be considered instead of immediate permanent deletion.

---

# 66. Draft Workflow

The content system should allow:

```text
Draft
↓
Review
↓
Publish
↓
Archive
```

The initial admin interface may simplify this, but the database should not prevent a more sophisticated workflow later.

---

# 67. Homepage Content Management

The homepage should not be entirely hard-coded.

The admin should be able to control important dynamic sections.

However, the CMS should not become a generic page builder.

Avoid building:

> "Create any page using arbitrary blocks."

unless a future requirement actually needs it.

The website should remain structurally opinionated.

---

# 68. Why Not a Generic Page Builder?

A generic page builder tends to produce:

- Inconsistent pages.
- Poor responsive behavior.
- Weak design consistency.
- Difficult maintenance.
- Content editors accidentally breaking layouts.

Instead:

> Build strong page templates with configurable content.

---

# 69. Content Relationships in Admin

When editing a project, the admin should be able to select:

```text
Team members
Robot
Competition
Technologies
Gallery items
```

When editing a competition:

```text
Robots
Projects
Team members
Results
Awards
Media
```

This makes the content graph maintainable.

---

# 70. Content Slugs

Every public entity requiring a detail page should have a unique slug.

Examples:

```text
autonomous-navigation
industrial-mobile-robot
smart-manufacturing-league
slam-for-mobile-robots
```

Slugs should generally use English transliteration/English naming even when Persian content is displayed.

This provides stable URLs.

---

# 71. Content Dates

Content should support appropriate dates.

Examples:

```text
publishedAt
updatedAt
eventDate
joinedAt
leftAt
competitionYear
```

Do not use one generic date field for everything.

---

# 72. Archive Strategy

Old content should not disappear automatically.

The club is building an archive.

Old:

- Competitions.
- Projects.
- Members.
- Robots.
- Blog posts.

can remain valuable years later.

---

# 73. Historical Accuracy

The site should preserve history.

For example:

If a member leaves the team:

```text
Current member = false
```

rather than deleting the member.

If a project finishes:

```text
Status = completed
```

rather than removing it.

The site should become the historical record of the club.

---

# 74. Future League Expansion

The competition model must not contain hard-coded assumptions such as:

```text
competition = SML
```

Instead:

```text
Competition
├── Name
├── Organization
├── League
├── Year
├── Location
└── ...
```

SML is simply one competition.

Future examples could include other RoboCup leagues or entirely different robotics competitions.

---

# 75. Current vs Future Identity

The site should communicate:

> We currently compete in SML.

not:

> We are an SML team.

The first statement preserves the identity of the broader robotics club.

---

# 76. Recommended Additional Sections

Beyond the requested sections, the following are recommended:

### Technologies

Shows engineering stack and capabilities.

### Timeline

Shows the growth of the club.

### Research

Creates room for future academic work.

### Join

Creates a dedicated recruitment experience.

### FAQ

Can answer common questions from students, sponsors, and visitors.

### Resources

Can eventually contain:

- Technical documents.
- Competition resources.
- Publications.
- Presentations.

These should only become visible when meaningful content exists.

---

# 77. Recommended MVP

The initial public release should prioritize:

```text
Homepage
About
Team
Team Member
Projects
Project Detail
Robots
Robot Detail
Competitions
Competition Detail
News
Blog
Gallery
Sponsors
Join
Contact
```

Technologies, Research, Awards, and Timeline can be implemented in the architecture and published when enough content exists.

---

# 78. Content Priority

The content hierarchy should roughly be:

### Tier 1 — Identity

```text
Homepage
About
Team
Current Competition
```

### Tier 2 — Evidence

```text
Projects
Robots
Results
Gallery
```

### Tier 3 — Depth

```text
Technologies
Research
Blog
```

### Tier 4 — Organizational support

```text
Sponsors
Partners
Join
Contact
```

This is a conceptual priority, not a navigation hierarchy.

---

# 79. Sitemap

The conceptual sitemap:

```text
/
│
├── about
│
├── team
│   ├── [member]
│   └── alumni
│
├── work
│   ├── projects
│   │   └── [project]
│   │
│   ├── robots
│   │   └── [robot]
│   │
│   ├── technologies
│   │   └── [technology]
│   │
│   └── research
│
├── competitions
│   ├── current
│   ├── [competition]
│   ├── results
│   └── awards
│
├── journal
│   ├── news
│   │   └── [article]
│   │
│   └── blog
│       └── [post]
│
├── gallery
│
├── sponsors
│
├── join
│
└── contact
```

This is the logical structure.

The exact Next.js route grouping may differ.

---

# 80. Next.js Route Architecture

The implementation should use route groups where appropriate.

A possible structure:

```text
app/
├── [locale-context]/   # conceptual only; do not create /en or /fa URLs
│
├── (marketing)/
│   ├── page.tsx
│   ├── about/
│   ├── team/
│   ├── projects/
│   ├── robots/
│   ├── competitions/
│   ├── journal/
│   ├── gallery/
│   ├── sponsors/
│   ├── join/
│   └── contact/
│
└── admin/
    ├── login/
    └── ...
```

The actual implementation must preserve the requirement that public URLs do not contain `/en` or `/fa`.

---

# 81. Admin Routes

The admin area should be isolated from the public marketing experience.

Conceptually:

```text
/admin
/admin/login
/admin/dashboard
/admin/team
/admin/projects
/admin/robots
/admin/competitions
/admin/news
/admin/blog
/admin/gallery
/admin/sponsors
/admin/settings
```

The admin should have its own layout.

---

# 82. Public vs Admin Architecture

The public website should optimize for:

- SEO.
- Performance.
- Visual experience.
- Accessibility.

The admin should optimize for:

- Productivity.
- Content management.
- Validation.
- Uploads.
- Organization.

They should share the underlying data and design tokens where appropriate, but they do not need identical UI patterns.

---

# 83. Final Information Architecture Principle

The website should ultimately behave like:

> **A visual, searchable, connected archive of IUST Robotics.**

A visitor should be able to start anywhere and discover the engineering ecosystem.

For example:

```text
Homepage
 ↓
Robot
 ↓
Project
 ↓
Technology
 ↓
Team member
 ↓
GitHub
```

or:

```text
Competition
 ↓
Robot
 ↓
Projects
 ↓
Team
 ↓
Gallery
 ↓
Results
```

or:

```text
Blog post
 ↓
Technology
 ↓
Project
 ↓
Robot
 ↓
Competition
```

The system should make these journeys natural.

---

# 84. Final Architectural Rule

The website must never be architected around the assumption that:

> **IUST Robotics = SML.**

Instead:

> **IUST Robotics is the organization.**

SML is:

> **the current competitive chapter in its story.**

The architecture must preserve this distinction from the first line of code.

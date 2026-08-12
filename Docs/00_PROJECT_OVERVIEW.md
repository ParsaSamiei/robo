# IUST Robotics Website

## Project Overview

**Document:** `00_PROJECT_OVERVIEW.md`
**Project:** IUST Robotics
**Organization:** Robotics Club, Iran University of Science and Technology (IUST)
**Current Competition Focus:** RoboCup Smart Manufacturing League (SML)
**Primary Language:** English
**Secondary Language:** Persian
**Platform:** Web
**Status:** Initial development

---

## 1. Project Summary

IUST Robotics is a robotics club based at the Iran University of Science and Technology (IUST).

The club's current competitive focus is the **Smart Manufacturing League (SML)**, a league within the industrial section of RoboCup. However, SML is only the club's current activity and must **not** define the architecture or identity of the entire website.

The website is intended to become the **official digital home of IUST Robotics**.

It should communicate the club's engineering capabilities, competitions, projects, robots, members, achievements, development journey, and future direction.

The website must be designed as a long-term platform capable of growing with the club.

The team may eventually:

- Participate in additional RoboCup leagues.
- Participate in other robotics competitions.
- Develop multiple robots.
- Develop research and engineering projects.
- Publish technical articles.
- Grow its membership.
- Develop alumni.
- Work with additional sponsors and partners.
- Build a larger robotics community.

The website architecture must therefore avoid assumptions that the organization will permanently remain an SML-only team.

---

# 2. Core Identity

The working organization name is:

> **IUST Robotics**

This is a working name and may later be replaced or refined when the club establishes its official visual identity and final branding.

The implementation must therefore avoid hard-coding the team name throughout the application.

The organization name should be managed centrally through configuration and/or administrative settings.

The eventual logo and formal brand identity will be introduced later.

The website must be able to adopt a future logo without requiring a redesign of the entire interface.

---

# 3. Organization Positioning

IUST Robotics should be presented as:

> **An engineering-focused robotics club building autonomous robotic systems, participating in competitive robotics, educating engineers, and developing practical robotics research and technology.**

The organization has five major areas of focus, in this priority order:

1. **Engineering**
2. **Competition**
3. **Education**
4. **Research**
5. **Community**

The website should reflect this hierarchy.

The website should not present the club as a generic student organization.

It should communicate that members are actively:

- Designing robotic systems.
- Building mechanical systems.
- Designing electronics.
- Developing embedded systems.
- Developing autonomous software.
- Working with robotics AI.
- Testing robotic systems.
- Competing internationally.
- Learning through practical engineering.

---

# 4. Current Competition

The club's current competition focus is:

> **RoboCup Smart Manufacturing League (SML)**

SML is associated with the industrial section of RoboCup.

The website should describe this accurately and avoid presenting SML as the permanent identity of IUST Robotics.

For example, the preferred conceptual hierarchy is:

```text
IUST Robotics
    │
    ├── Competitions
    │      ├── RoboCup
    │      │      └── Smart Manufacturing League
    │      └── Future Competitions
    │
    ├── Robots
    ├── Projects
    ├── Engineering
    ├── Team
    ├── News
    ├── Blog
    ├── Gallery
    ├── Sponsors
    └── About
```

This allows the club to expand into additional competitions without restructuring the application.

---

# 5. University Affiliation

IUST Robotics is associated with the:

> **Iran University of Science and Technology (IUST)**

The university affiliation should be visible and credible but should not dominate the team's identity.

The desired positioning is:

> **Team-first, university-affiliated.**

The website should primarily establish the identity of IUST Robotics while clearly communicating its connection to IUST.

The university should therefore appear in appropriate places such as:

- Header/footer.
- About page.
- Team information.
- Contact information.
- SEO metadata.
- Organization information.
- Relevant structured data.

The website must not imply that every activity, project, competition, or sponsorship is directly funded or officially operated by the university unless explicitly stated by the administrators.

---

# 6. Website Purpose

The website has several purposes.

## 6.1 Primary Purpose

Establish IUST Robotics as a credible and professional robotics organization.

A visitor should quickly understand:

- Who the club is.
- What the club builds.
- What competitions it participates in.
- What engineering disciplines it works in.
- Who its members are.
- What projects it has built.
- How it is progressing.
- How companies and organizations can work with it.

---

# 7. Primary Audiences

The website is primarily designed for the following audiences, in this order:

### 1. Sponsors

Sponsors are the highest-priority external audience.

The website should allow a potential sponsor to quickly understand:

- What IUST Robotics is.
- What the club builds.
- What competitions it participates in.
- What engineering capabilities it has.
- Who is involved.
- What achievements and milestones exist.
- Who currently supports the club.
- How to contact the club.

The sponsor experience should feel professional and trustworthy.

---

### 2. Competition Organizers

Competition organizers should be able to find:

- Team identity.
- Competition participation.
- Results.
- Robots.
- Team members.
- Technical capabilities.
- Relevant projects.
- Contact information.

---

### 3. Other Robotics Teams

Other teams should be able to understand:

- Who IUST Robotics is.
- What systems it develops.
- What competitions it participates in.
- Its engineering disciplines.
- Its projects.
- Its technical interests.

The website should encourage professional networking without becoming a social-media-style platform.

---

### 4. General Public

The public should be able to understand the team without requiring technical expertise.

Technical content should be accessible without removing technical credibility.

---

### 5. Universities and Academic Organizations

Universities, laboratories, researchers, and academic organizations should be able to understand:

- The team's technical work.
- Research interests.
- Educational activities.
- Members.
- Projects.
- Competition history.

---

### 6. Potential Team Members

Students and engineers interested in joining should be able to understand:

- What the team does.
- What departments exist.
- What technologies are used.
- What kinds of projects members work on.
- How to contact the team.

The initial joining mechanism will be a contact-based process rather than a complex recruitment portal.

---

# 8. Brand Personality

The website should communicate:

- Engineering
- Precision
- Competence
- Curiosity
- Ambition
- Technical depth
- Professionalism
- Student energy
- Progress
- Authenticity

The intended balance is approximately:

**70% professional engineering organization**

**30% student robotics team**

The site should feel serious without feeling corporate or lifeless.

It should feel energetic without becoming childish.

---

# 9. Visual Direction

The primary visual direction is:

> **Dark Engineering + Robotics Laboratory + Premium Technology**

Approximate influence:

- **60% Dark Engineering**
- **30% Robotics Laboratory**
- **10% Premium Technology**

The visual language should be inspired by real engineering environments, robotics laboratories, industrial systems, high-quality technical products, and premium digital products.

The website should avoid becoming a stereotypical "futuristic technology" website.

---

# 10. Anti-AI-Generated Design Principle

This is a core project requirement.

The website must **not look AI-generated**.

The implementation must avoid generic design patterns commonly associated with automatically generated websites.

Avoid unnecessary:

- Purple/blue gradients.
- Neon glows.
- Glassmorphism.
- Floating decorative blobs.
- Excessive rounded cards.
- Arbitrary glowing borders.
- Generic futuristic grids.
- Random technical diagrams.
- Fake data visualizations.
- Decorative robot illustrations.
- Excessive pill-shaped UI.
- Excessive shadows.
- Meaningless animated particles.
- Stock-looking "technology" imagery.
- Generic AI-generated hero illustrations.
- Repetitive card grids.
- Excessive use of giant gradient typography.
- Unnecessary 3D elements.

Every visual element should have a clear purpose.

The site should look like it was designed deliberately by a professional product/design team.

---

# 11. Authenticity

The website must prioritize real information and real media.

When real team photos, robot photographs, competition photographs, project photographs, videos, or technical diagrams become available, the CMS should allow them to replace temporary content easily.

The system must never fabricate:

- Competition results.
- Awards.
- Team statistics.
- Sponsors.
- Projects.
- Members.
- Technical specifications.
- Research.
- Partnerships.

If information is unavailable, the UI should use an appropriate empty state or omit the section.

The website should never create fake achievements simply to make the website appear more established.

---

# 12. First-Year Narrative

IUST Robotics is a newly established robotics club and is currently in its first year.

The website should embrace this rather than hide it.

The site should communicate a narrative of:

> **Beginning → Building → Competing → Learning → Growing**

The first year can become the beginning of a long-term team history.

For example:

```text
2026
The Beginning

2027
Expansion

2028
Growth

...
```

These are conceptual examples only. The actual timeline must be driven by administrator-created content.

The website should allow future milestones such as:

- Team founded.
- First prototype.
- First robot.
- First autonomous test.
- First competition.
- First RoboCup participation.
- First major result.
- First sponsor.
- First research publication.
- First additional league.
- Other meaningful engineering milestones.

---

# 13. Website as a Long-Term Platform

The website must not be treated as a one-off competition landing page.

It should be capable of evolving into the club's permanent website.

The architecture should support:

- Multiple competitions.
- Multiple RoboCup leagues.
- Multiple robots.
- Multiple robot versions.
- Multiple projects.
- Multiple engineering disciplines.
- Multiple generations of team members.
- Alumni.
- Multiple sponsors.
- Multiple sponsor tiers.
- News.
- Blog articles.
- Gallery content.
- Videos.
- Technical content.
- Future community activities.

New content should generally be added through the admin panel rather than requiring source-code changes.

---

# 14. Public Website Languages

The public website supports:

### English

Primary/default language.

### Persian

Secondary language.

The language preference is stored in a cookie.

The website does **not** use language-prefixed routes such as:

```text
/en
/fa
```

or:

```text
/en/about
/fa/about
```

Instead, routes remain language-neutral and the active language is determined through the user's language preference.

---

# 15. Persian Support

Persian must be implemented as a genuine RTL experience.

The Persian version must not simply be English text translated and displayed from left to right.

The application should correctly handle:

- `dir="rtl"`.
- RTL layouts.
- Persian typography.
- Persian text alignment.
- Navigation.
- Forms.
- Tables where appropriate.
- Mixed Persian/English technical terminology.
- Numbers where appropriate.
- Icons whose direction needs to change.
- Layout mirroring where appropriate.
- Direction-sensitive animations.

The implementation should distinguish between:

- UI direction.
- Text direction.
- Technical strings such as code, GitHub URLs, technology names, and email addresses.

---

# 16. Administration

The website requires a dedicated administrative panel.

The admin panel is intended primarily for:

- Team administrators.
- Team members responsible for website maintenance.
- Particularly the team's primary website administrator.

The admin interface itself will be **English-only**.

However, administrators must be able to manage both:

- English public content.
- Persian public content.

For translatable content, the admin interface should make the relationship between languages clear.

For example:

```text
Project
├── English
│   ├── Title
│   ├── Summary
│   └── Content
│
└── Persian
    ├── Title
    ├── Summary
    └── Content
```

Non-language-dependent values should not be duplicated.

Examples:

- Date.
- GitHub URL.
- Image.
- Status.
- Team member relationships.
- Technology relationships.

---

# 17. Authentication

The initial administrative authentication system should remain simple.

Required:

- Username.
- Password.

The initial version does not require:

- Complex role systems.
- Multiple permission levels.
- Public accounts.
- Social login.
- User registration.

Security must still be implemented properly.

Passwords must never be stored in plaintext.

Administrative sessions must be protected appropriately.

---

# 18. Content Management

The admin panel should allow administrators to manage the main public content.

Expected content areas include:

- Team information.
- Team members.
- Alumni.
- Robots.
- Robot versions.
- Projects.
- Competitions.
- Results.
- Awards.
- News.
- Blog.
- Gallery.
- Sponsors.
- Sponsor tiers.
- Partners.
- Technologies.
- Social links.
- General site settings.

The exact database architecture and CMS workflows are defined in later documentation.

---

# 19. Team Structure

The current organizational departments are:

1. **Mechanical**
2. **Hardware**
3. **Software**
4. **Management**

A team member may belong to more than one department.

Therefore the database must model this as a **many-to-many relationship**.

Example:

```text
Member
  ├── Software
  └── Hardware
```

rather than forcing each member to have only one department.

---

# 20. Team Member Profiles

The member model should support the following information:

- Name.
- Role.
- Department(s).
- Photo.
- Biography.
- Skills.
- GitHub.
- Personal website.
- Projects.
- Joined date/year.
- Status.
- Education.

Most fields are optional.

A member should not be required to provide every field.

Possible statuses include:

- Active.
- Alumni.
- Inactive.

The exact implementation is defined in the content model documentation.

---

# 21. Engineering Technologies

The current technology ecosystem includes:

### Robotics / Software

- ROS 2
- Python
- C++
- YOLO
- SLAM

### Hardware

- LiDAR
- NVIDIA Jetson
- STM32 / STM-based embedded systems

### Engineering Tools

- Altium Designer
- SolidWorks

The website should represent technologies as reusable content entities.

A technology may be associated with:

- Projects.
- Team members.
- Robots.
- Engineering disciplines.

A member may use multiple technologies.

A project may use multiple technologies.

The admin must be able to create and manage technologies.

---

# 22. Projects

Projects are a major part of the organization's engineering identity.

A project may contain:

- Name.
- Short description.
- Full description.
- English content.
- Persian content.
- Cover image.
- Gallery.
- Team members.
- Technologies.
- GitHub URL.
- Status.
- Start date.
- End date.
- Related robot.
- Related competition.

Possible statuses include:

- Planning.
- Active.
- Completed.
- Archived.

The exact project model will be defined in the database documentation.

---

# 23. GitHub

GitHub is important but should not dominate the website.

GitHub should primarily appear as an optional link associated with projects.

For example:

> View project on GitHub

The admin should be able to add or remove a GitHub URL from each relevant project.

The website does not initially need to become a GitHub analytics dashboard.

---

# 24. Robots

Robots are separate entities from projects.

A robot may contain:

- Name.
- Description.
- Purpose.
- Status.
- Version.
- Images.
- Gallery.
- Public technical specifications.
- Related projects.
- Related competitions.
- Team members.
- Technologies.

Technical information must support **selective publication**.

Administrators must be able to decide which technical information is publicly visible.

This is important because competition teams may not want to expose every implementation detail.

The database may contain technical information that is not displayed publicly.

---

# 25. Competitions

Competitions are independent entities.

A competition may contain:

- Competition name.
- Organization.
- League.
- Year.
- Location.
- Description.
- Participation information.
- Result.
- Ranking.
- Team members.
- Robot.
- Gallery.
- Videos.
- Related projects.
- Articles.

The system must support multiple competitions and leagues.

SML should therefore be represented as competition/league data rather than hard-coded into the website.

---

# 26. Competition Results

Results should primarily live inside their respective competition records.

The website may surface notable results elsewhere, but there should not be a separate hard-coded results system that duplicates competition data.

For example:

```text
Competitions
    └── RoboCup 2026
          └── Smart Manufacturing League
                └── Result
```

This keeps the data model coherent.

---

# 27. Achievements and Milestones

Achievements should not be limited to competition awards.

The system should support meaningful milestones such as:

- First robot.
- First prototype.
- First autonomous test.
- First competition.
- Competition placement.
- First sponsor.
- Major engineering milestone.
- Research achievement.

This allows the website to tell the team's development story even during the early years.

---

# 28. Statistics

Statistics should preferably be derived dynamically from the database.

Possible statistics include:

- Active members.
- Alumni.
- Projects.
- Robots.
- Competitions.
- Technologies.
- Years active.
- Engineering disciplines.

The website must not display invented numbers.

If a value is zero or unavailable, the UI should handle it gracefully.

---

# 29. News

News is intended for short-form organizational updates.

Examples:

- Competition announcements.
- Team milestones.
- New members.
- New sponsors.
- Important announcements.
- Competition participation.
- Major engineering milestones.

News and blog content are separate concepts.

---

# 30. Blog

The blog is intended for longer-form content.

Possible content includes:

- Technical articles.
- Engineering explanations.
- Development stories.
- Competition preparation.
- Robotics tutorials.
- Project retrospectives.
- Research-related writing.

Blog posts should support bilingual content.

The blog architecture should be SEO-friendly.

---

# 31. Gallery

The gallery should support future real media.

Administrators should be able to upload and organize images.

Gallery metadata may include:

- Image.
- Caption.
- Date.
- Category.
- Competition.
- Project.
- Robot.
- Featured state.

Possible categories include:

- Team.
- Competition.
- Project.
- Workshop.
- Robot.
- Event.

The gallery should support filtering and discovery.

---

# 32. Media Processing

Image processing must use:

> **Jimp**

Do **not** use Sharp.

Sharp is intentionally excluded because of server compatibility requirements.

The implementation should support appropriate image processing such as:

- Resize.
- Thumbnail generation.
- Format conversion where appropriate.
- Validation.
- File-size management.

The exact media pipeline will be defined in the media documentation.

---

# 33. Video

The website should support video references without becoming a video hosting platform.

YouTube URLs should be supported.

The admin should be able to associate YouTube videos with appropriate content such as:

- Competitions.
- Projects.
- Robots.
- News.
- Blog posts.
- Gallery/media.

Direct video hosting is not a primary requirement.

---

# 34. Sponsors

Sponsors are one of the most important external audiences.

Sponsor presentation should be:

> **Subtle, premium, and professional.**

The design should take inspiration from premium product websites rather than dense sponsorship walls.

Sponsors should be presented with:

- Logo.
- Name.
- Tier.
- Website URL.
- Optional description.

Sponsor logos should be manageable from the admin panel.

Sponsors should link to their official websites.

---

# 35. Sponsor Tiers

Sponsor tiers must be flexible.

Do not hard-code:

```text
Gold
Silver
Bronze
```

Instead, administrators should be able to create arbitrary sponsor tiers.

For example:

```text
Strategic Partner
Technology Partner
Gold
Silver
Supporter
```

The admin should control:

- Tier name.
- Description.
- Display order.
- Visual priority where appropriate.

---

# 36. Partners

Partners should be distinct from sponsors.

The system should allow organizations or institutions to be represented as partners without forcing them into sponsor categories.

Partners may have:

- Name.
- Logo.
- Website.
- Description.
- Relationship type.

---

# 37. Join the Team

The initial joining system should remain simple.

There will not be a complex recruitment portal initially.

The public site should encourage interested people to contact the team.

The initial form should collect appropriate contact information without unnecessarily increasing complexity.

The system should be extensible so a more advanced recruitment workflow can be added later.

---

# 38. Contact

The initial contact mechanism should be a contact form.

The website should not rely solely on exposing an email address.

The contact form should be accessible in both languages.

The form should provide appropriate:

- Validation.
- Loading state.
- Success state.
- Error state.
- Toast notifications.

React Toastify should be used for application notifications where appropriate.

---

# 39. Social Media

The website should support the team's current and future social channels:

- Instagram.
- LinkedIn.
- YouTube.
- GitHub.
- Telegram.

Social links should be managed through site settings rather than hard-coded into individual components.

Administrators should be able to update or disable links.

---

# 40. Three.js Hero Experience

The homepage should include an interactive Three.js-based industrial robotics experience.

This should not be a generic humanoid robot or science-fiction object.

The concept should be:

> A serious autonomous industrial robotic platform.

The visual should communicate:

- Robotics.
- Manufacturing.
- Autonomous systems.
- Engineering.
- Sensors.
- Hardware.

The 3D model should be treated as a replaceable asset.

When the club has an actual robot model available, the website should be capable of replacing the conceptual model with the team's real robot.

---

# 41. 3D Interaction Philosophy

The 3D experience should be visually impressive without becoming a game.

Potential interactions include:

- Subtle idle movement.
- Mouse-responsive camera movement.
- Controlled rotation.
- Scroll-based movement where appropriate.
- Subtle sensor highlights.
- Optional technical annotations.

Interactions must remain restrained.

The 3D experience must not:

- Dominate every page.
- Block content.
- Require interaction to understand the site.
- Make mobile performance poor.
- Become a distracting animation.

---

# 42. Animation Philosophy

The desired animation level is:

> **Moderate, polished, eye-catching, and purposeful.**

Animation should be used for:

- Page transitions.
- Section reveals.
- Hover states.
- Navigation.
- 3D interaction.
- Image presentation.
- Important visual hierarchy.

Animation should not exist merely because it is technically possible.

The site should feel smooth rather than constantly moving.

---

# 43. Responsive Design

The website must be fully responsive.

The primary design target is:

> **Laptop / desktop**

However, mobile support is a hard requirement.

The website must work correctly at:

- Large desktop sizes.
- Standard laptop sizes.
- Tablets.
- Mobile phones.
- Narrow mobile screens.

Responsive design must not be treated as "desktop first and then shrink everything."

Layouts, navigation, typography, images, 3D experiences, forms, galleries, and admin interfaces must all have deliberate responsive behavior.

The mobile experience must remain professional and usable.

---

# 44. Performance

Performance is a core requirement.

Visual quality must never justify poor performance.

The implementation should prioritize:

- Server rendering where appropriate.
- Minimal unnecessary client-side JavaScript.
- Dynamic loading of Three.js.
- Lazy loading of heavy assets.
- Responsive images.
- Image optimization.
- Efficient database queries.
- Appropriate caching.
- Code splitting.
- Avoiding unnecessary dependencies.
- Avoiding unnecessary client components.

The Three.js hero must not force the entire website to load a large 3D bundle before useful content becomes visible.

---

# 45. SEO

SEO is a first-class feature.

The website should support:

- Page-specific metadata.
- Bilingual metadata.
- OpenGraph metadata.
- Social sharing metadata.
- Canonical metadata.
- Sitemap.
- Robots configuration.
- Structured data.
- Organization structured data.
- Article structured data for blog posts.
- Appropriate event/competition structured data where applicable.
- Semantic HTML.
- Image alt text.
- Proper document language.
- Search-friendly content.
- Correct indexing behavior.

The unusual cookie-based language system must be handled carefully so that both English and Persian content can be discoverable without relying on `/en` and `/fa` routes.

SEO architecture must be designed deliberately rather than added at the end.

---

# 46. Accessibility

Accessibility is required.

The site should support:

- Keyboard navigation.
- Appropriate focus states.
- Semantic HTML.
- Accessible forms.
- Meaningful labels.
- Alt text.
- Appropriate color contrast.
- Reduced-motion considerations.
- Accessible navigation.
- Screen-reader-friendly content.

The 3D experience must never be required to access essential information.

---

# 47. Design System

A complete design system will be developed separately.

It should define:

- Colors.
- Typography.
- Spacing.
- Borders.
- Radius.
- Shadows.
- Buttons.
- Forms.
- Cards.
- Navigation.
- Tables.
- Badges.
- Modals.
- Toasts.
- Loading states.
- Empty states.
- Error states.
- Responsive behavior.

The design system must support both:

- LTR English.
- RTL Persian.

---

# 48. Technology Stack

The initial technical direction is:

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- Next.js server-side functionality / API architecture as appropriate.

### Database

- PostgreSQL

### ORM

- Prisma

### 3D

- Three.js
- React Three Fiber where appropriate.

### Image Processing

- Jimp

### Notifications

- React Toastify

### Authentication

- Simple authenticated administrative access.

### Deployment

Designed to work on the team's VPS/server environment.

Docker and Nginx compatibility should be maintained.

---

# 49. Reference Implementation

The existing **PishTalk** project may be used as a reference for implementation patterns, particularly for:

- Admin panel concepts.
- Content management.
- Authentication.
- Upload workflows.
- Database patterns.
- Deployment.
- Next.js architecture.
- UI patterns where appropriate.

However:

> **Do not copy the PishTalk design.**

PishTalk is a different product with a different identity and audience.

Use it as an engineering/reference implementation where useful, not as the visual or product template.

---

# 50. Professional Flexibility

The implementation philosophy is:

> **Strict product requirements, flexible professional execution.**

The AI implementation agent must follow:

- Product requirements.
- Information architecture.
- Database constraints.
- Security requirements.
- Accessibility requirements.
- Responsive requirements.
- Internationalization requirements.
- Performance requirements.
- Design principles.

However, when the documentation intentionally leaves visual details open, the AI may make professional UI/UX decisions.

It should prefer:

- Simplicity.
- Hierarchy.
- Consistency.
- Usability.
- Authenticity.
- Performance.

over unnecessary visual complexity.

---

# 51. No Unrequested Features

The implementation agent must not invent major functionality.

For example, it must not independently add:

- Social networks.
- Public user accounts.
- Forums.
- Chat systems.
- Complex dashboards.
- E-commerce.
- Membership subscriptions.
- Payment systems.
- AI assistants.
- Unrequested analytics systems.

If a feature would significantly expand the scope, it should not be introduced simply because it seems interesting.

---

# 52. Content Authenticity

The website should distinguish between:

- Real published information.
- Draft information.
- Placeholder content.
- Missing information.

Placeholder content must never be presented as real achievements.

The initial website may contain carefully written temporary copy where necessary, but the CMS must make replacement straightforward.

---

# 53. Empty States

Because the club is new, many content categories may initially be empty.

The UI should handle this elegantly.

For example:

If there are no alumni, the website should not show:

> Alumni
> No alumni found.

Instead, the section may be hidden or use an intentional first-year message where appropriate.

The website should feel complete without pretending the club has content it does not yet have.

---

# 54. Future Growth

The architecture must anticipate:

### More competitions

```text
RoboCup
├── SML
├── Future League
└── Other League
```

### More robots

```text
Robot 01
Robot 02
Robot 03
```

### More projects

Projects should exist independently from competitions.

### More team members

Members can move from active to alumni.

### More sponsors

Sponsors can be added without code changes.

### More content

News, blog posts, galleries, and videos should be CMS-driven.

---

# 55. Core Product Principle

The website should answer three questions immediately:

### Who are you?

> IUST Robotics — a robotics club at IUST.

### What do you do?

> We engineer autonomous robotic systems and compete in robotics challenges, currently focusing on RoboCup Smart Manufacturing League.

### Why should I care?

> Because the team is building real robotic systems through engineering, competition, research, and education.

The website should communicate these ideas without requiring a visitor to read a long paragraph.

---

# 56. Definition of Success

The project is successful if:

1. A sponsor immediately understands who IUST Robotics is.
2. A competition organizer can quickly find competition information.
3. A robotics team can understand the team's technical interests.
4. A student can understand how to contact the club.
5. The website feels like a serious engineering organization.
6. The website does not feel like a generic AI-generated template.
7. The website remains useful as the club grows.
8. New competitions can be added without changing the architecture.
9. New robots and projects can be added through the admin panel.
10. English and Persian content can be managed properly.
11. The site remains fast despite its visual quality.
12. The site works beautifully on laptop and mobile.
13. The admin can manage the majority of public content without editing code.
14. Real photos and technical material can gradually replace placeholders.
15. The website remains maintainable by future team members.

---

# 57. Implementation Rule

Before implementing any major feature, the development agent must:

1. Read the relevant documentation.
2. Inspect the existing repository.
3. Understand existing architecture.
4. Reuse appropriate established patterns.
5. Avoid unnecessary rewrites.
6. Implement the smallest robust solution that satisfies the requirement.
7. Verify responsive behavior.
8. Verify English and Persian behavior where applicable.
9. Verify accessibility.
10. Verify performance implications.

The agent should not blindly implement requirements without understanding the existing project structure.

---

# 58. Documentation Hierarchy

This document defines the project's overall vision.

More specific documents override this document when they define implementation details.

The documentation hierarchy should generally be interpreted as:

```text
Project Overview
       ↓
Product Vision
       ↓
Information Architecture
       ↓
Page Specifications
       ↓
Design System
       ↓
Content Model
       ↓
Database Architecture
       ↓
Admin Panel
       ↓
Technical Architecture
       ↓
Implementation Rules
```

If two documents appear to conflict, the more specific implementation document should be reviewed before making assumptions.

---

# 59. Final Principle

The website is not merely a portfolio.

It is not merely a competition page.

It is not merely a university club page.

It is the beginning of the **digital identity and infrastructure of IUST Robotics**.

The first version may contain only a small amount of real content.

That is acceptable.

The architecture, design, and engineering quality should be strong enough that the website can grow with the club for years.

The goal is to build a platform that looks appropriate on the day the club is founded and still looks appropriate after the club has competed, built robots, published research, gained sponsors, graduated members, created alumni, and expanded into new areas of robotics.

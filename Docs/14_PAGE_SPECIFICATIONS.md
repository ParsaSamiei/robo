# `04_PAGE_SPECIFICATIONS.md`

This should define the **actual pages and what each page contains**, while leaving implementation details to the later documents.

---

# 04 — PAGE SPECIFICATIONS

## 1. Purpose

This document defines the public pages of the robotics club website, their purpose, content hierarchy, required sections, interactions, and relationships to other pages.

It does **not** define:

- Database schema.
- API implementation.
- Component architecture.
- Deployment.
- Detailed SEO implementation.
- Detailed responsive rules.

Those are handled by later documents.

---

# 2. Global Page Principles

Every public page must:

- Be available in English and Persian.
- Respect RTL when Persian is selected.
- Be fully responsive.
- Follow the central design system.
- Use real content from the CMS/database where applicable.
- Avoid unnecessary visual effects.
- Maintain consistent navigation and footer.
- Provide appropriate loading and error states.
- Be accessible.

---

# 3. Page Inventory

The initial website should contain:

```text
/
├── About
├── Team
│   ├── Member
│   └── Alumni
├── Projects
│   └── Project
├── Robots
│   └── Robot
├── Competitions
│   └── Competition
├── Journal
│   └── Article
├── Gallery
├── Sponsors
├── Partners
├── Join
└── Contact
```

Admin is a separate private application:

```text
/admin
```

---

# 4. Homepage

## Route

```text
/
```

## Purpose

The homepage is the primary introduction to the robotics club.

A first-time visitor should understand:

1. Who the team is.
2. That it is an IUST robotics club.
3. What the club builds.
4. That SML is the current competition focus.
5. That the club works across mechanical, hardware, software, and management.
6. How to explore the team's work.
7. How to join.

---

# 5. Homepage Hero

The hero should be the most visually distinctive part of the website.

It should contain:

- Club name.
- Short positioning statement.
- Primary CTA.
- Secondary CTA.
- Interactive industrial robot.

Recommended CTA hierarchy:

```text
Primary:
Explore Our Work

Secondary:
Join the Team
```

The final copy should be determined during implementation/content creation.

---

# 6. Hero 3D Robot

The hero contains the main Three.js industrial robot.

The robot should:

- Be clearly recognizable as an industrial robotic system.
- Feel engineered rather than decorative.
- Respond subtly to user interaction.
- Work with the surrounding layout.
- Not dominate the textual content.
- Degrade gracefully on mobile/low-power devices.

Detailed 3D requirements belong in:

```text
10_3D_AND_INTERACTIONS.md
```

---

# 7. Homepage Introduction

Immediately after the hero, introduce the club.

The section should communicate:

```text
Student robotics club
+
IUST
+
Engineering
+
Competition
+
Research
+
Community
```

Keep this section concise.

---

# 8. Homepage Current Focus

Show what the club is currently working on.

The current focus is:

> Smart Manufacturing League (SML)

The section should make clear that:

> SML is the current competition focus, not the definition of the entire club.

---

# 9. Homepage Featured Work

Display selected projects.

Recommended:

```text
2–4 featured projects
```

Each project card can contain:

- Image.
- Project name.
- Short description.
- Technologies.
- Status.
- Link.

CTA:

> View all projects

---

# 10. Homepage Robots

If the club has multiple robots, show selected robots.

Initially, there may only be one.

The section should not disappear permanently simply because there is only one robot.

A single featured robot can still be presented prominently.

---

# 11. Homepage Engineering Stack

Show the technologies currently used by the team.

Current technologies include:

```text
ROS 2
Python
C++
YOLO
SLAM
LiDAR
Jetson
STM
Altium Designer
SolidWorks
```

This should not become a giant icon wall.

Use a clean engineering-oriented presentation.

---

# 12. Homepage Team Preview

Show selected current members.

Possible presentation:

- Featured members.
- Leadership.
- Representative engineering roles.

Do not display every member if the team becomes large.

CTA:

> Meet the team

---

# 13. Homepage Statistics

The homepage may show team statistics.

Potential statistics:

```text
Team members
Projects
Robots
Competitions
Awards
Years active
```

Only display statistics that are meaningful and backed by real database data.

Do not fabricate numbers.

---

# 14. Homepage Journal

Show recent content.

Recommended:

```text
1 featured article
+
2–3 recent articles/news
```

CTA:

> Explore the journal

---

# 15. Homepage Sponsors

Show selected sponsors and partners.

This section should be visually premium and restrained.

Do not create a massive logo wall.

CTA:

> Our sponsors

---

# 16. Homepage Join CTA

Near the end of the page, provide a strong recruitment section.

Purpose:

> Convert interested students into applicants.

Example concept:

> Build with us.

Then:

> Join a team where mechanical, hardware, and software engineering come together.

CTA:

> Join the Team

---

# 17. About Page

## Route

```text
/about
```

## Purpose

Explain:

- Who the club is.
- Why it exists.
- How it started.
- What it does.
- Where it wants to go.

---

# 18. About — Story

The story should acknowledge that the club is new.

Suggested narrative:

```text
Founded in 2026
↓
First robotics projects
↓
First SML participation
↓
Growing engineering team
↓
Future competitions and research
```

Do not pretend the club has decades of history.

Its first year is part of its identity.

---

# 19. About — Mission

Explain the club's core mission.

The five major pillars are:

```text
Engineering
Competition
Education
Research
Community
```

These should be clearly represented.

---

# 20. About — Engineering

Explain that members work across:

```text
Mechanical
Hardware
Software
Management
```

The page should emphasize interdisciplinary collaboration.

---

# 21. About — Education

Explain the learning aspect.

The club provides an environment where students can:

- Learn by building.
- Work with experienced peers.
- Explore robotics technologies.
- Gain competition experience.
- Work on real engineering systems.

Avoid claiming formal academic accreditation unless one exists.

---

# 22. About — Research

Research should be presented as an area of exploration.

The club does not need to claim to be a formal research laboratory.

---

# 23. About — Community

Explain the club's role in creating a robotics community at IUST.

Potential themes:

- Collaboration.
- Knowledge sharing.
- Mentorship.
- Engineering culture.
- Competition.

---

# 24. Team Page

## Route

```text
/team
```

## Purpose

Show the people behind the robots.

This page should be one of the strongest human elements of the website.

---

# 25. Team Page Structure

Recommended:

```text
Team introduction
↓
Leadership
↓
Current members
↓
Areas
↓
Alumni preview
```

---

# 26. Leadership

Leadership should be visually distinguishable but not exaggerated.

Possible information:

- Name.
- Role.
- Photo.
- Short description.

---

# 27. Current Members

Each member card may contain:

```text
Photo
Name
Role(s)
Short description
```

Optional:

```text
GitHub
Website
```

---

# 28. Team Filtering

If the team grows, allow filtering by area:

```text
All
Mechanical
Hardware
Software
Management
```

A person may appear under multiple areas.

---

# 29. Member Detail

## Route

```text
/team/[slug]
```

The page may include:

```text
Large photo
Name
Roles
Bio
Skills
Education
Projects
Competitions
GitHub
Personal website
```

Optional information should simply be omitted when unavailable.

---

# 30. Alumni

## Route

```text
/team/alumni
```

Show former members.

Alumni profiles should preserve their contribution to the club.

---

# 31. Alumni Detail

Alumni can retain their normal member profile structure with:

```text
Alumni status
Joined date
Departure date
Projects
Competitions
```

where available.

---

# 32. Projects Page

## Route

```text
/projects
```

## Purpose

Show what the club builds.

This should be one of the primary portfolio pages.

---

# 33. Project Listing

Project cards should include:

```text
Image
Title
Summary
Category
Technologies
Status
```

Potential statuses:

```text
Concept
Development
Testing
Completed
Archived
```

---

# 34. Project Detail

## Route

```text
/projects/[slug]
```

Recommended structure:

```text
Hero
↓
Overview
↓
Problem
↓
Approach
↓
Engineering
↓
Technologies
↓
Results
↓
Team
↓
Gallery
↓
Related content
```

Not every project requires every section.

---

# 35. Project GitHub

If the project has a public GitHub repository:

```text
View project on GitHub
```

should be available.

GitHub is supplementary, not the main project presentation.

---

# 36. Robots Page

## Route

```text
/robots
```

Show all public robots.

---

# 37. Robot Card

A robot card should show:

```text
Image
Name
Status
Competition
Short description
```

---

# 38. Robot Detail

## Route

```text
/robots/[slug]
```

Recommended:

```text
Robot hero
↓
Overview
↓
Specifications
↓
Systems
↓
Technologies
↓
Projects
↓
Competitions
↓
Team
↓
Gallery
```

---

# 39. Robot Specifications

Specifications can include fields such as:

```text
Dimensions
Weight
Compute
Sensors
Actuators
Power
Communication
Software
```

Only show fields that actually exist.

---

# 40. Competitions Page

## Route

```text
/competitions
```

This is the club's competition history.

---

# 41. Competition Listing

Each competition entry should show:

```text
Name
Year
League
Robot
Result
```

---

# 42. Competition Detail

## Route

```text
/competitions/[slug]
```

Include:

```text
Competition introduction
Club participation
Robot
Team
Technical challenge
Result
Awards
Gallery
Related projects
Related journal articles
```

---

# 43. SML

The Smart Manufacturing League should have a strong current presence.

The page should explain:

> Smart Manufacturing League is an industrial robotics competition based on the industrial section of RoboCup.

The website should explain the team's participation without making unsupported claims about the league.

---

# 44. Competition Results

Results should be clearly visible.

Examples:

```text
Rank
Award
Qualification
Final placement
Score
```

Only show fields that are known.

---

# 45. Journal

## Route

```text
/journal
```

This combines:

```text
News
Blog
Technical articles
Team updates
Competition updates
```

---

# 46. Journal Listing

Each article card:

```text
Image
Category
Title
Summary
Date
Author
```

---

# 47. Journal Detail

## Route

```text
/journal/[slug]
```

Include:

```text
Title
Author
Date
Hero image
Article content
Related projects
Related competitions
Related articles
```

---

# 48. Technical Article

Technical articles should support long-form content.

They should be suitable for topics such as:

> How we implemented LiDAR-based SLAM on our robot.

---

# 49. Gallery

## Route

```text
/gallery
```

The gallery should focus on authentic team documentation.

Potential categories:

```text
Build
Testing
Competition
Team
Robot
Workshop
Events
```

---

# 50. Gallery Interaction

Use a polished lightbox.

It should support:

- Previous.
- Next.
- Close.
- Caption.
- Metadata where useful.

Keyboard controls should work on desktop.

---

# 51. Sponsors

## Route

```text
/sponsors
```

Show sponsors grouped by tier.

Each sponsor can have:

```text
Logo
Name
Description
Website
Tier
```

---

# 52. Sponsor Presentation

The sponsor section should feel:

> Premium, minimal, respectful.

The sponsor logo should receive enough space to remain recognizable.

---

# 53. Partners

## Route

```text
/partners
```

Partners should be visually distinct from sponsors.

Show:

```text
Logo
Name
Description
Website
```

---

# 54. Join

## Route

```text
/join
```

This page is a recruitment funnel.

---

# 55. Join Page Structure

```text
Hero
↓
Why join
↓
Areas
↓
Who we're looking for
↓
What members work on
↓
Application process
↓
Application form
```

---

# 56. Join — Areas

Clearly display:

```text
Mechanical
Hardware
Software
Management
```

Explain that members can work across multiple areas.

---

# 57. Join — Experience Level

The page should communicate that applicants do not necessarily need to already be experts.

The emphasis should be on:

```text
Curiosity
Learning
Commitment
Teamwork
Building
```

---

# 58. Join — Application

The form should collect the information defined in the content/backend documents.

The form must be comfortable on mobile.

---

# 59. Contact

## Route

```text
/contact
```

Structure:

```text
Contact information
Social links
Contact form
```

Keep it simple.

---

# 60. Contact Information

Possible fields:

```text
Email
Location
Instagram
LinkedIn
YouTube
GitHub
Telegram
```

Only show configured information.

---

# 61. Admin

## Route

```text
/admin
```

Admin is not part of the public navigation.

---

# 62. Admin Dashboard

The dashboard should provide access to:

```text
Members
Projects
Robots
Competitions
Journal
Gallery
Sponsors
Partners
Applications
Messages
Site settings
```

---

# 63. Admin Content Management

Every major public content type should be manageable from the admin panel.

At minimum:

```text
Create
Edit
Draft
Preview
Publish
Archive
Delete where appropriate
```

---

# 64. Admin Bilingual Editing

Admin must support:

```text
English content
Persian content
```

without requiring the administrator to edit JSON or code.

---

# 65. Admin Gallery

The admin must be able to:

- Upload images.
- Add captions.
- Assign categories.
- Associate images with projects.
- Associate images with competitions.
- Publish/unpublish images.

---

# 66. Admin Sponsors

Admin must be able to:

- Add sponsor.
- Upload logo.
- Add website.
- Add description.
- Select tier.
- Set display order.
- Publish/unpublish.

---

# 67. Admin Homepage

Admin should be able to select:

```text
Featured project
Featured robot
Featured competition
Featured articles
Featured members
```

without changing code.

---

# 68. 404 Page

Create a custom 404 page.

It should match the robotics/engineering aesthetic.

Include a clear way back to:

```text
Home
```

---

# 69. Error Page

Create a branded error state for unexpected failures.

It should be calm and useful.

Avoid technical stack traces.

---

# 70. Loading States

Pages that depend on dynamic content should have intentional loading states.

Avoid blank white/dark screens.

---

# 71. Empty States

If no content exists:

```text
No projects published yet.
```

rather than a broken layout.

---

# 72. Future Pages

The architecture should allow future pages such as:

```text
/research
/events
/workshops
/publications
/documentation
```

but these should **not** be added to the navigation until there is meaningful content.

---

# 73. Page Priority

For the initial launch, prioritize:

```text
1. Home
2. About
3. Team
4. Projects
5. Robots
6. Competitions
7. Join
8. Contact
9. Journal
10. Gallery
11. Sponsors
12. Partners
```

The exact launch order can change depending on available content.

---

# 74. MVP Principle

The website should not wait for every section to have extensive content.

For example, if there is:

```text
1 robot
2 projects
1 competition
8 members
```

the site should still feel complete.

The design must work with both small and large datasets.

---

# 75. Final Page Principle

Every page must answer:

> **Why does this page exist?**

If a page does not provide meaningful information or action, it should not exist simply to make the website appear larger.

---

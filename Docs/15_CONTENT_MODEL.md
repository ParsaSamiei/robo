# `06_CONTENT_MODEL.md`

## 1. Purpose

This document defines the content entities used by the robotics club website, their fields, relationships, publishing behavior, bilingual content requirements, and how they should be managed through the admin panel.

This document defines **what content exists**.

It does not define:

- Visual design.
- Page layouts.
- API implementation.
- Database-specific implementation details.
- Deployment.
- SEO implementation.
- Component architecture.

Those concerns are covered by the other project documents.

---

# 2. Content Philosophy

The website represents a **robotics club**, not only an SML team.

The club currently participates in the **Smart Manufacturing League (SML)**, but the content architecture must support future expansion into:

- Other RoboCup leagues.
- Other robotics competitions.
- Independent robotics projects.
- Research.
- Education.
- Workshops.
- Community activities.
- Future robots.

The content model must therefore avoid making SML the root of the entire system.

---

# 3. Content Categories

The primary content entities are:

```text
Site Settings
Members
Projects
Robots
Competitions
Competition Results
Awards
Articles
Gallery Items
Sponsors
Partners
Join Applications
Contact Messages
Social Links
```

---

# 4. Content Relationships

The conceptual relationship model is:

```text
                         ┌──────────────┐
                         │    CLUB      │
                         └──────┬───────┘
                                │
          ┌─────────────────────┼──────────────────────┐
          │                     │                      │
       Members               Projects              Competitions
          │                     │                      │
          │                     │                      │
          ├──────────────┬──────┤                      │
          │              │                             │
       Alumni          Robots ─────────────────────────┘
          │
          │
          └─────────────── Contributions


Projects ─────────────── Articles
   │                        │
   └──────── Gallery ───────┘

Competitions ─────────── Results
       │
       └──────── Awards

Sponsors ───────── Sponsor Tiers
Partners ───────── External Organizations
```

This is a conceptual model, not a literal database schema.

---

# 5. Bilingual Content

Public content must support:

```text
English
Persian
```

A content entity that contains public-facing textual information should generally have separate English and Persian versions.

For example:

```text
titleEn
titleFa

summaryEn
summaryFa

descriptionEn
descriptionFa
```

---

# 6. Translation Philosophy

Do not treat Persian as an afterthought.

English and Persian should be independently editable.

The Persian version may have different:

- Sentence structure.
- Length.
- Terminology.
- Formatting.

The system should not require literal translation.

---

# 7. Required vs Optional Content

Not every content field is mandatory.

The admin should be able to create useful content with the minimum required fields and add additional information when available.

For example, a member can exist with:

```text
Name
Photo
Role
```

without requiring:

```text
Personal website
GitHub
Projects
Education
Bio
```

---

# 8. Publishing Model

Public content should generally support:

```text
DRAFT
PUBLISHED
ARCHIVED
```

Not every entity necessarily needs all three states.

---

# 9. Featured Content

Content that can appear prominently on the homepage should support a concept such as:

```text
featured
```

or a homepage selection mechanism.

Do not hardcode featured content in the frontend.

---

# 10. Display Ordering

Entities that appear in curated lists should support an optional display order.

Examples:

```text
Members
Sponsors
Partners
Gallery
Featured projects
```

The admin should be able to control ordering where it matters.

---

# 11. Members

## Purpose

Represents current and former members of the robotics club.

A member must **not** be deleted merely because they leave the current team.

They become an alumni member.

---

# 12. Member Fields

Recommended fields:

```text
id
slug

name
nameFa

role
roleFa

photo

bio
bioFa

skills

education
educationFa

githubUrl
personalWebsiteUrl

joinedAt
leftAt

status

displayOrder

createdAt
updatedAt
```

---

# 13. Member Status

Recommended statuses:

```text
CURRENT
ALUMNI
```

Future statuses can be introduced if necessary.

---

# 14. Member Roles

A member may have more than one role.

For example:

```text
Software Engineer
Team Lead
```

or:

```text
Hardware
Management
```

Do not model the member as belonging to exactly one department.

---

# 15. Member Areas

The current primary areas are:

```text
Mechanical
Hardware
Software
Management
```

A member may belong to multiple areas.

---

# 16. Member Skills

Skills should be structured enough to support filtering but flexible enough to grow.

Current examples:

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

Skills should not be hardcoded into the frontend.

---

# 17. Member Projects

Members can be associated with multiple projects.

A project can have multiple members.

Therefore:

```text
Member ↔ Project
```

is a many-to-many relationship.

---

# 18. Member Competitions

Members can also participate in multiple competitions.

Therefore:

```text
Member ↔ Competition
```

is many-to-many.

---

# 19. Member Profiles

A member profile should expose only information intended for public display.

Potential public fields:

```text
Name
Role
Photo
Bio
Skills
Education
GitHub
Personal website
Projects
Competitions
```

---

# 20. Projects

## Purpose

Projects represent engineering work performed by the club.

Projects are one of the most important content types on the website.

---

# 21. Project Fields

Recommended:

```text
id
slug

title
titleFa

summary
summaryFa

description
descriptionFa

heroImage

status

category

technologies

githubUrl

startDate
completionDate

featured

createdAt
updatedAt
publishedAt
```

---

# 22. Project Status

Recommended:

```text
CONCEPT
DEVELOPMENT
TESTING
COMPLETED
ARCHIVED
```

The system should allow future statuses.

---

# 23. Project Categories

Categories should remain flexible.

Possible initial categories:

```text
Competition
Robotics
Software
Hardware
Mechanical
Research
Education
```

A project may belong to multiple categories.

---

# 24. Project Technologies

Technologies should reference the shared technology/skill system where appropriate.

This avoids inconsistencies such as:

```text
ROS2
ROS 2
ROS2 Humble
ROS
```

being treated as four unrelated technologies without reason.

---

# 25. Project Team

A project can have:

```text
Multiple members
```

and a member can work on:

```text
Multiple projects
```

---

# 26. Project Robots

A project may involve one or multiple robots.

Therefore:

```text
Project ↔ Robot
```

should support many-to-many relationships where needed.

---

# 27. Project Competitions

A project can be associated with one or multiple competitions.

Example:

A robot development project could be used for multiple competition seasons.

---

# 28. Project Gallery

A project can have associated gallery images.

This allows the project page to show authentic development material.

---

# 29. Project GitHub

GitHub is optional.

If available, store:

```text
githubUrl
```

The website should present GitHub as a supplementary engineering resource.

The project page itself remains the primary presentation.

---

# 30. Robots

## Purpose

Represents physical robots developed, maintained, or used by the club.

---

# 31. Robot Fields

Recommended:

```text
id
slug

name
nameFa

summary
summaryFa

description
descriptionFa

heroImage

status

year

weight
dimensions

featured

createdAt
updatedAt
publishedAt
```

Technical specifications should be extensible rather than forcing every robot to have identical hardware.

---

# 32. Robot Status

Potential statuses:

```text
CONCEPT
IN_DEVELOPMENT
ACTIVE
RETIRED
ARCHIVED
```

---

# 33. Robot Technical Specifications

A robot may contain specifications such as:

```text
Compute
Sensors
LiDAR
Camera
Actuators
Motors
Power
Communication
Control
Software
Dimensions
Weight
```

Only relevant specifications should be displayed.

---

# 34. Robot Technologies

Robots may use multiple technologies.

Examples:

```text
ROS 2
C++
Python
SLAM
YOLO
LiDAR
Jetson
STM
```

---

# 35. Robot Projects

Robots can participate in multiple projects.

A project may involve multiple robots.

---

# 36. Robot Competitions

A robot can participate in multiple competitions/seasons.

This is important because the same robot may evolve over time.

---

# 37. Competitions

## Purpose

Represents competitions in which the club participates.

The competition model must support SML today and other competitions later.

---

# 38. Competition Fields

Recommended:

```text
id
slug

name
nameFa

shortName

description
descriptionFa

year

league
leagueFa

location
locationFa

websiteUrl

status

featured

createdAt
updatedAt
publishedAt
```

---

# 39. Competition Type

Do not hardcode SML as the only competition.

For example:

```text
RoboCup
Smart Manufacturing League
Other robotics competition
```

can all exist.

---

# 40. SML Representation

The current competition can be represented as:

```text
Competition:
Smart Manufacturing League

Short name:
SML

Context:
Industrial section of RoboCup
```

The website should clearly distinguish the club from the league.

---

# 41. Competition Participation

A competition can have:

```text
Multiple team members
Multiple robots
Multiple projects
Multiple results
```

---

# 42. Competition Results

Results should be separate content from the competition itself.

A competition represents:

> Where/what we competed in.

A result represents:

> What happened to our team.

---

# 43. Result Fields

Recommended:

```text
id

competitionId

title
titleFa

description
descriptionFa

rank
score

stage

year

notes
notesFa

createdAt
updatedAt
```

Not every result needs a numeric rank.

---

# 44. Awards

Awards should be separate entities when they need independent presentation.

Possible fields:

```text
id
title
titleFa

description
descriptionFa

year

competitionId
projectId

image

createdAt
```

---

# 45. Award Examples

Potential future data:

```text
1st Place
Best Engineering Award
Technical Achievement
Finalist
```

Only publish genuine achievements.

---

# 46. Articles / Journal

## Purpose

The journal provides the club with a long-form communication platform.

It should cover:

```text
News
Technical articles
Competition updates
Team updates
Engineering stories
Educational content
```

---

# 47. Article Fields

Recommended:

```text
id
slug

title
titleFa

summary
summaryFa

content
contentFa

coverImage

authorId

category

status

publishedAt

createdAt
updatedAt
```

---

# 48. Article Categories

Initial categories:

```text
NEWS
TECHNICAL
COMPETITION
EDUCATION
TEAM
```

The system should allow additional categories later.

---

# 49. Article Authors

An article can have one or multiple authors.

If multiple authors are supported, model:

```text
Article ↔ Member
```

as many-to-many.

---

# 50. Article Relationships

Articles may reference:

```text
Projects
Robots
Competitions
Members
```

This enables related-content sections.

---

# 51. Gallery

## Purpose

Gallery items document the actual work and life of the club.

The gallery should prioritize authentic photography over decorative stock imagery.

---

# 52. Gallery Item Fields

Recommended:

```text
id

image
thumbnail

title
titleFa

caption
captionFa

category

alt
altFa

published

displayOrder

createdAt
updatedAt
```

---

# 53. Gallery Categories

Potential categories:

```text
BUILD
TESTING
COMPETITION
ROBOT
TEAM
WORKSHOP
EVENT
OTHER
```

---

# 54. Gallery Relationships

Gallery items may belong to:

```text
Project
Robot
Competition
Article
```

They may also exist independently.

---

# 55. Gallery Metadata

Where useful, store:

```text
photographer
dateTaken
location
```

These fields should be optional.

---

# 56. Sponsors

## Purpose

Represents organizations financially supporting the club.

---

# 57. Sponsor Fields

Recommended:

```text
id

name
nameFa

description
descriptionFa

logo
websiteUrl

tier

displayOrder

status

createdAt
updatedAt
```

---

# 58. Sponsor Tiers

The system must support sponsor tiers.

Do not hardcode the tier names into the frontend.

Example:

```text
Strategic Partner
Technology Partner
Supporter
```

The exact names can evolve.

---

# 59. Sponsor Links

Each sponsor should have an optional external website URL.

The website should make the sponsor logo/name clickable when a URL is available.

---

# 60. Sponsor Logo Requirements

Sponsors should provide/use a proper logo asset where possible.

The system should support:

```text
Light logo
Dark logo
```

if necessary for contrast.

---

# 61. Partners

Partners are distinct from sponsors.

A partner may provide:

- Equipment.
- Technology.
- Workspace.
- Mentorship.
- Collaboration.
- Institutional support.

without necessarily being a financial sponsor.

---

# 62. Partner Fields

Recommended:

```text
id

name
nameFa

description
descriptionFa

logo
websiteUrl

type

displayOrder

status

createdAt
updatedAt
```

---

# 63. Partner Types

Possible:

```text
University
Technology
Research
Community
Industry
Institution
Other
```

---

# 64. Join Applications

## Purpose

Stores applications from potential members.

---

# 65. Join Application Fields

Recommended:

```text
id

name
email
phone

education
fieldOfStudy

areasOfInterest

skills

experience

githubUrl
personalWebsiteUrl
linkedinUrl

resumeUrl

message

status

createdAt
updatedAt
```

Only collect fields that are genuinely necessary.

---

# 66. Application Status

Recommended:

```text
NEW
REVIEWING
CONTACTED
ACCEPTED
REJECTED
ARCHIVED
```

---

# 67. Application Privacy

Applications are private.

They must never appear in public APIs or public pages.

---

# 68. Contact Messages

## Purpose

Stores messages submitted through the contact form.

---

# 69. Contact Message Fields

Recommended:

```text
id

name
email

subject
message

status

createdAt
updatedAt
```

---

# 70. Contact Message Status

Recommended:

```text
NEW
READ
REPLIED
ARCHIVED
```

---

# 71. Social Links

Social links should be centrally manageable.

Initial platforms:

```text
Instagram
LinkedIn
YouTube
GitHub
Telegram
```

Each should support:

```text
platform
url
enabled
displayOrder
```

---

# 72. Site Settings

Global website settings should be manageable through the admin panel.

Potential settings:

```text
Club name
Short description
Contact email
Location
Social links
Default SEO title
Default SEO description
```

---

# 73. Site Identity

The logo should be manageable independently from the rest of the content.

The initial implementation must leave room for the final club logo and visual identity.

---

# 74. Technologies

A shared technology entity is recommended.

Example:

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

Each technology can contain:

```text
name
slug
icon
description
websiteUrl
```

The icon should be optional.

---

# 75. Technology Usage

Technologies may be associated with:

```text
Members
Projects
Robots
```

This allows the website to generate useful relationships automatically.

---

# 76. Tags

Tags may be used for articles and projects.

Examples:

```text
Computer Vision
Autonomous Navigation
Embedded Systems
PCB Design
Mechanical Design
ROS 2
```

Do not create hundreds of tags without a content strategy.

---

# 77. Media

Media should be treated as reusable content assets rather than files attached directly to a single page wherever practical.

A media item can potentially be reused across:

```text
Project
Robot
Article
Competition
Gallery
Member
```

---

# 78. Media Fields

Recommended:

```text
id

url
thumbnailUrl

filename
mimeType
size

width
height

alt
altFa

createdAt
updatedAt
```

---

# 79. Media Ownership

Uploaded files should be associated with the content that uses them where appropriate.

Do not allow orphaned uploads to accumulate indefinitely.

---

# 80. Content Versioning

Full revision history is not required for v1.

However, the architecture should not make future versioning impossible.

---

# 81. Content Ordering

Admin-controlled ordering should be available for:

```text
Featured projects
Members
Sponsors
Partners
Gallery
Homepage sections
```

---

# 82. Visibility

Content should support controlled visibility.

For example:

```text
Published
Unpublished
```

An admin should be able to prepare content without immediately exposing it.

---

# 83. Featured Content

"Featured" should be used sparingly.

Being featured means:

> This content deserves additional visual prominence.

It should not mean:

> This content is more important than everything else.

---

# 84. Historical Data

Historical information should be preserved whenever it contributes to the club's story.

Examples:

- Former members.
- Previous robots.
- Previous competition attempts.
- Older projects.
- Past awards.

---

# 85. First-Year Content

Because the club is new, the website should embrace the first-year story.

The content model must not require:

```text
10 years of history
50 projects
20 awards
```

before the website feels complete.

---

# 86. Future Competition Expansion

The model must support:

```text
SML 2026
SML 2027
RoboCup competition
Other leagues
Independent competitions
```

without schema redesign.

---

# 87. Future League Expansion

The club may expand beyond SML.

Therefore:

```text
Club
 └── Competition
       └── League
```

is preferable to:

```text
Club
 └── SML
```

as a fundamental architectural assumption.

---

# 88. Current Club Structure

The conceptual hierarchy should be:

```text
Robotics Club
│
├── Competitions
│   └── SML
│
├── Projects
├── Robots
├── Research
├── Education
├── Community
└── Team
```

SML is one branch of the club's activity.

---

# 89. Public vs Internal Content

Some fields exist only for administrators.

Examples:

```text
Application status
Internal notes
Admin metadata
Upload metadata
```

These must never be exposed publicly.

---

# 90. Internal Notes

Join applications and contact messages may contain private admin notes.

These must be stored separately from public content and protected by authorization.

---

# 91. Required Content for Launch

The site should launch even if only the following are available:

```text
Club information
Current team
One competition
One robot
A few projects
Join form
Contact form
Basic gallery
Basic sponsor/partner section
```

---

# 92. Optional Content for Launch

The following can remain empty initially:

```text
Alumni
Awards
Large article library
Multiple robots
Multiple competitions
Large sponsor portfolio
Research publications
```

The UI must gracefully handle this.

---

# 93. No Fake Content

The website must never invent:

- Team achievements.
- Competition rankings.
- Sponsors.
- Awards.
- Partnerships.
- Research results.
- Member experience.

Placeholder content must never look like real claims.

---

# 94. Content Ownership

The admin panel is the primary source of truth for public content.

Developers should not need to modify React code to:

```text
Add a member
Add a project
Add a sponsor
Publish an article
Add a gallery item
Update competition results
```

---

# 95. Content Lifecycle

The expected lifecycle is:

```text
Create
 ↓
Edit
 ↓
Save Draft
 ↓
Preview
 ↓
Publish
 ↓
Update
 ↓
Archive
```

Permanent deletion should be used carefully.

---

# 96. Content Model Principle

The most important rule is:

> **Model the robotics club, not the current website.**

The first version happens to focus heavily on SML, but the content model must remain valid when the club participates in several competitions, develops many robots, publishes research, and grows into a larger robotics organization.

---

# 97. Content Model Summary

The core entities are:

```text
Members
Projects
Robots
Competitions
Competition Results
Awards
Articles
Gallery Items
Sponsors
Partners
Join Applications
Contact Messages
Technologies
Media
Social Links
Site Settings
```

with the central relationships:

```text
Members ↔ Projects
Members ↔ Robots
Members ↔ Competitions

Projects ↔ Robots
Projects ↔ Competitions
Projects ↔ Technologies

Robots ↔ Competitions

Competitions → Results
Competitions → Awards

Articles ↔ Members
Articles ↔ Projects
Articles ↔ Robots
Articles ↔ Competitions

Gallery ↔ Projects
Gallery ↔ Robots
Gallery ↔ Competitions
Gallery ↔ Articles
```

This gives the AI enough structure to build the website as a **real content-driven robotics club platform**, rather than a collection of hardcoded pages.

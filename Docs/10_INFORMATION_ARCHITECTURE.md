# 10 — INFORMATION ARCHITECTURE & PAGE SPECIFICATION

**Document:** `10_INFORMATION_ARCHITECTURE.md`

This document defines what pages the robotics club website contains, what each page is supposed to accomplish, and how the pages connect to one another.

The site should feel like **one coherent robotics club**, not a collection of unrelated pages.

---

# 1. Primary Navigation

The primary navigation should remain relatively small.

Recommended:

```text
WORK
TEAM
COMPETITIONS
JOURNAL
ABOUT
```

with a prominent CTA:

```text
JOIN THE TEAM
```

The exact labels can change during implementation.

Do **not** put every page in the main navigation.

---

# 2. Navigation Philosophy

The visitor should be able to understand the organization within a few seconds.

The navigation should answer:

```text
What do they build?
Who are they?
Where do they compete?
What are they doing?
How can I join?
```

---

# 3. Homepage

Route:

```text
/
```

The homepage is the most important page on the website.

It should not simply be a list of links to other pages.

It should tell the story of the club.

---

# 4. Homepage Narrative

Recommended sequence:

```text
Hero
 ↓
Who We Are
 ↓
What We Build
 ↓
Current Robot / Featured Project
 ↓
Engineering Capabilities
 ↓
Competition
 ↓
Team
 ↓
Latest Work
 ↓
Sponsors / Partners
 ↓
Join
 ↓
Footer
```

The exact order can change after visual prototyping.

---

# 5. Homepage Hero

The hero should immediately communicate:

```text
Robotics Club
IUST
Engineering
Competition
```

The visual centerpiece should be the interactive Three.js industrial robot.

Example conceptual structure:

```text
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  IUST ROBOTICS CLUB                    [3D ROBOT]       │
│                                                         │
│  We build robots.                                      │
│  We compete.                                           │
│  We learn.                                             │
│                                                         │
│  [ Explore our work ]   [ Join the team ]              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

Do not copy this wording literally.

The final copy should be developed separately.

---

# 6. Hero Requirements

The hero must:

- Work without the 3D model.
- Load quickly.
- Be responsive.
- Be visually impressive.
- Communicate the organization clearly.
- Not look like an AI-generated landing page.

---

# 7. Hero Secondary Information

A subtle technical line can communicate the current focus.

For example:

```text
Smart Manufacturing League
RoboCup Industrial Track
```

This should establish the current competition without making the club itself synonymous with SML.

The organization is:

> **a robotics club that currently competes in SML.**

---

# 8. About the Club

Route:

```text
/about
```

Purpose:

Explain:

- Who the club is.
- Why it exists.
- Its connection to IUST.
- Its philosophy.
- Its areas of activity.
- Its long-term direction.

---

# 9. IUST Relationship

The website should clearly state the relationship with:

**Iran University of Science and Technology (IUST)**

However, the wording must not imply institutional sponsorship or support that does not exist.

Use language such as:

> A robotics club based at Iran University of Science and Technology.

Avoid unsupported claims such as:

> Officially supported by IUST.

unless this becomes factually true.

---

# 10. About Narrative

Because the club is new, the page should emphasize:

```text
Beginning
 ↓
Building
 ↓
Learning
 ↓
Competing
 ↓
Growing
```

rather than pretending to have decades of history.

---

# 11. Mission

The mission should center around:

1. Engineering.
2. Competition.
3. Education.
4. Research.
5. Community.

These are the five pillars of the club.

---

# 12. Engineering

Show that members actually build things.

Topics:

```text
Mechanical
Electrical / Hardware
Software
Embedded
Robotics systems
PCB design
Computer vision
Autonomy
```

---

# 13. Competition

Competition is important, but it should not define the entire club.

The website should make it possible to eventually show:

```text
RoboCup
SML
Future competitions
Other leagues
```

without redesigning the site.

---

# 14. Education

Show:

- Internal workshops.
- Technical sessions.
- Knowledge sharing.
- Training.
- Documentation.
- Mentorship.

This helps potential members understand that joining is not just about already being an expert.

---

# 15. Research

Research can include:

```text
Experiments
Navigation
SLAM
Computer vision
Motion planning
Manipulation
Embedded systems
```

Research pages should be evidence-based.

---

# 16. Community

The club should eventually be more than a competition team.

The site should have room for:

- Events.
- Workshops.
- Alumni.
- Community projects.
- Collaboration.

---

# 17. Work

Recommended route:

```text
/work
```

This is the central portfolio of the club.

It can contain:

```text
Projects
Robots
Engineering
Research
```

---

# 18. Projects

Route:

```text
/work/projects
```

Purpose:

Show what the club builds.

Each project should have:

```text
Title
Description
Status
Year
Members
Technologies
Images
Videos
GitHub
Related robot
Related competition
```

where applicable.

---

# 19. Project Page

Example:

```text
/work/projects/autonomous-navigation
```

Suggested structure:

```text
Hero
 ↓
Problem
 ↓
Approach
 ↓
System Architecture
 ↓
Engineering
 ↓
Results
 ↓
Team
 ↓
Media
 ↓
GitHub
 ↓
Related Work
```

---

# 20. GitHub on Projects

GitHub should be visible but not dominate the page.

Use:

```text
View source →
```

or:

```text
GitHub repository →
```

The repository URL is managed through the admin panel.

---

# 21. Robots

Route:

```text
/work/robots
```

This is an important section.

The team should be able to document every significant robot.

---

# 22. Robot Page

Each robot can include:

```text
Name
Image / 3D model
Description
Purpose
Competition
Specifications
Hardware
Software
Sensors
Compute
Team members
Projects
Results
Gallery
```

---

# 23. Robot Specification Layout

Use structured technical information.

Example:

```text
COMPUTE
Jetson

VISION
YOLO

LIDAR
[model]

FRAMEWORK
ROS 2

CONTROL
STM
```

Do not create fake specifications.

Missing values should simply be omitted.

---

# 24. Team

Route:

```text
/team
```

The team page should be one of the strongest pages.

It should communicate:

> Real people build these robots.

---

# 25. Team Structure

The team currently has areas including:

```text
Mechanical
Hardware
Software
Management
```

But members can belong to more than one area.

The data model must support this.

---

# 26. Current Members

Route:

```text
/team/current
```

Show current members prominently.

Potential information:

```text
Photo
Name
Role
Departments
Bio
Skills
Education
Projects
GitHub
Personal website
```

Only display information that the member has chosen to make public.

---

# 27. Member Detail Page

Example:

```text
/team/members/member-name
```

Possible structure:

```text
Portrait
Name
Role
About
Areas
Skills
Projects
Robots
GitHub
Personal website
```

---

# 28. Your Profile

The website should allow one or more members to receive stronger editorial emphasis.

However:

> Do not hard-code a single person's profile into the frontend.

Instead, support an admin-controlled property such as:

```text
featuredMember
```

This allows the team leadership to decide who is highlighted.

---

# 29. Alumni

Route:

```text
/team/alumni
```

Alumni should remain part of the team's history.

Their profiles can be less detailed than current members if desired.

---

# 30. Competitions

Route:

```text
/competitions
```

This should become the historical competition record of the club.

---

# 31. Competition Page

Each competition can include:

```text
Competition name
Season/year
League
Description
Robot
Team members
Results
Awards
Media
Related projects
```

---

# 32. SML

The current competition should have a dedicated page when meaningful.

The site should refer to:

> Smart Manufacturing League (SML)

and explain that it is part of the industrial side of RoboCup.

Do not build the entire website architecture around SML.

Future competitions should fit naturally into the same system.

---

# 33. Competition Results

Results should be structured.

Example:

```text
Competition
Year
Stage
Position
Award
Notes
```

This allows the website to eventually show statistics such as:

```text
Competitions entered
Podium finishes
Awards
Years active
```

---

# 34. Awards

Route:

```text
/competitions/awards
```

This can be a filtered view of competition achievements rather than a completely independent content system.

---

# 35. Competition Timeline

The site could visually show:

```text
2026
First competition
 ↓
2027
Competition X
 ↓
2028
Competition Y
```

As the club grows, this becomes valuable historical content.

---

# 36. Statistics

A small statistics section can appear on the homepage and/or About page.

Possible statistics:

```text
Members
Projects
Robots
Competitions
Awards
Years active
```

Only show statistics that are actually meaningful.

Do not inflate numbers.

---

# 37. Statistics Philosophy

Prefer:

```text
12
Members
```

over:

```text
12+
```

when the exact number is known.

If a metric is dynamic, calculate it from the database rather than manually maintaining it.

---

# 38. Journal

Route:

```text
/journal
```

This should contain:

```text
News
Blog
Technical articles
Announcements
```

---

# 39. News

Route:

```text
/journal/news
```

News is for things like:

- Competition announcements.
- Team announcements.
- Results.
- New robots.
- Important milestones.

---

# 40. Blog

Route:

```text
/journal/blog
```

Blog content can be deeper.

Examples:

```text
How we built our navigation stack
Designing a PCB for the robot
Lessons from our first competition
```

---

# 41. Technical Articles

The blog system should be flexible enough for technical writing.

Support:

```text
Headings
Paragraphs
Images
Code
Links
Lists
Quotes
Tables
```

Do not create an editor that requires administrators to write raw HTML.

---

# 42. Gallery

Route:

```text
/gallery
```

The gallery should feel visual and editorial.

Categories could include:

```text
Competition
Lab
Robot
Team
Workshop
Behind the scenes
```

---

# 43. Gallery Philosophy

Do not make it a generic Instagram clone.

Prioritize strong images.

A smaller collection of excellent photos is better than hundreds of mediocre ones.

---

# 44. Gallery Lightbox

Clicking an image should open a lightbox.

The lightbox should support:

- Next.
- Previous.
- Close.
- Keyboard navigation.
- Mobile swipe where practical.

---

# 45. Sponsors

Route:

```text
/sponsors
```

This is important because sponsors are a major audience.

The page should feel premium.

---

# 46. Sponsor Tiers

Sponsors can be categorized by tier.

For example:

```text
Title
Gold
Silver
Bronze
Partner
```

The actual names can be configured later.

Do not hard-code the exact tiers into the visual design.

---

# 47. Sponsor Page

Suggested:

```text
Sponsors
 ↓
Why we work with sponsors
 ↓
Sponsor tiers
 ↓
Current sponsors
 ↓
Partner organizations
 ↓
Become a sponsor
```

---

# 48. Sponsor Cards

Sponsor cards should primarily communicate:

```text
Logo
Name
Tier
Website
```

Optional:

```text
Short description
```

Avoid excessive marketing copy.

---

# 49. Partners

Partners should be separate from sponsors.

A partner might contribute:

- Equipment.
- Knowledge.
- Infrastructure.
- Collaboration.
- Mentorship.

Do not force every organization into a sponsor tier.

---

# 50. Join the Team

Route:

```text
/join
```

This is one of the highest-value conversion pages.

---

# 51. Join Page

It should explain:

```text
Who should apply
What we work on
What skills are useful
What beginners can learn
What areas exist
What the selection process looks like
```

---

# 52. Join Form

The form should collect appropriate information.

Potential:

```text
Name
Email
Phone
Education
Area of interest
Skills
Experience
GitHub
Personal website
Motivation
Resume
```

Not all fields need to be mandatory.

---

# 53. Resume Upload

Resume upload should be supported.

Requirements:

- Secure.
- Private.
- Validated.
- Admin-only access.

The applicant should understand that their resume is reviewed by the team.

---

# 54. Application Status

Version one does not need a full applicant portal.

The application can simply be:

```text
SUBMITTED
```

and then reviewed by administrators.

---

# 55. Contact

Route:

```text
/contact
```

The contact page should follow the established Pishtalk-style approach:

```text
Contact information
+
form
+
social links
```

---

# 56. Contact Form

Potential:

```text
Name
Email
Subject
Message
```

Optionally:

```text
Organization
```

for sponsors/partners.

---

# 57. Contact Categories

The form can optionally allow:

```text
General
Sponsorship
Partnership
Media
Competition
Recruitment
Other
```

This makes admin handling easier.

---

# 58. Social Links

The public site should support:

```text
Instagram
LinkedIn
YouTube
GitHub
Telegram
```

These should be managed centrally.

---

# 59. Admin

Route:

```text
/admin
```

The admin interface is **English only**.

It does not need Persian localization.

---

# 60. Admin Authentication

Version one requires:

```text
Username/email
Password
```

No public registration.

No member accounts.

No user roles are required initially.

---

# 61. Admin Dashboard

Dashboard should show:

```text
Recent applications
Recent messages
Draft content
Recently published content
Quick actions
```

Example:

```text
┌─────────────────────────────────────┐
│ Dashboard                           │
│                                     │
│ 12 Members     8 Projects           │
│ 3 Robots       2 Competitions       │
│                                     │
│ 5 New Applications                  │
│ 2 New Messages                      │
│                                     │
│ [+ Project] [+ Member] [+ Article]  │
└─────────────────────────────────────┘
```

---

# 62. Admin Navigation

Recommended:

```text
Dashboard

Content
  Projects
  Robots
  Competitions
  Awards
  News
  Blog
  Gallery

Team
  Current Members
  Alumni

Organizations
  Sponsors
  Partners

Applications
  Join Applications
  Contact Messages

Settings
  Social Links
  Sponsor Tiers
  Site Settings
```

---

# 63. Admin Content Editing

Every content editor should have:

```text
English
Persian
```

sections for translatable fields.

English should be presented first.

---

# 64. Admin Preview

Administrators should be able to preview content before publishing.

Possible:

```text
Save Draft
Preview
Publish
```

---

# 65. Publishing Control

Not everything should automatically become public.

Admin should explicitly decide:

```text
Draft
Published
Archived
```

and, where relevant, visibility.

---

# 66. Gallery Admin

Admin should be able to:

```text
Upload images
Delete images
Reorder images
Add captions
Set category
Set featured
Attach gallery to project/competition
```

---

# 67. Sponsor Admin

Admin should be able to:

```text
Create sponsor
Upload logo
Select tier
Add website
Set order
Publish/unpublish
```

---

# 68. Member Admin

Admin should be able to:

```text
Create
Edit
Archive
Restore
Set current/alumni
Set roles
Set departments
Add skills
Add GitHub
Add website
Upload photo
```

---

# 69. Project Admin

Admin should be able to:

```text
Create
Edit
Draft
Publish
Archive
Set technologies
Attach members
Attach robot
Attach competition
Add GitHub
Add media
```

---

# 70. Robot Admin

Admin should be able to:

```text
Create robot
Upload images
Add specifications
Attach technologies
Attach members
Attach projects
Attach competitions
```

---

# 71. Competition Admin

Admin should be able to:

```text
Create competition
Add season
Add description
Attach robots
Attach members
Add results
Add awards
Add media
```

---

# 72. Blog Admin

Admin should be able to:

```text
Create article
Edit article
Save draft
Preview
Publish
Archive
Add cover image
Add author
```

---

# 73. News Admin

News should be simpler than blog.

Admin should be able to quickly publish:

```text
Title
Summary
Content
Image
Date
```

---

# 74. Admin Media Library

A centralized media library would be useful.

It can eventually allow:

```text
Search
Filter
Preview
Reuse
Delete
```

But this should not delay the first usable version.

---

# 75. Public Content Relationships

The system should automatically create useful connections.

For example:

```text
Project
  ↓
Robot
  ↓
Competition
  ↓
Result
```

A visitor should be able to navigate between these naturally.

---

# 76. Suggested Additional Page: `/technology`

I recommend a dedicated **Technology** page eventually.

It could show the club's engineering stack:

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

This is particularly useful for:

- Potential members.
- Sponsors.
- Other teams.
- Engineers.

It also communicates technical credibility quickly.

---

# 77. Suggested Additional Page: `/lab`

A lab page could eventually show:

```text
Our workspace
Tools
Fabrication
Testing
Electronics
Development environment
```

This is optional.

Do not create it until there is enough real material.

---

# 78. Suggested Additional Page: `/history`

Not needed now.

Once the club has several years of activity, the competition timeline can become a dedicated history page.

For year one, the About page can contain the beginning of the story.

---

# 79. Suggested Additional Page: `/resources`

This could eventually contain:

```text
Technical documentation
Tutorials
Open-source projects
Research
Useful resources
```

Again, do not build it just to fill navigation.

---

# 80. Recommended Final Sitemap

The initial public sitemap should therefore be approximately:

```text
/
│
├── /about
│
├── /work
│   ├── /projects
│   │   └── /[slug]
│   │
│   └── /robots
│       └── /[slug]
│
├── /team
│   ├── /current
│   ├── /alumni
│   └── /members/[slug]
│
├── /competitions
│   └── /[slug]
│
├── /journal
│   ├── /news
│   │   └── /[slug]
│   │
│   └── /blog
│       └── /[slug]
│
├── /gallery
│
├── /sponsors
│
├── /technology
│
├── /join
│
└── /contact
```

---

# 81. Admin Sitemap

```text
/admin
│
├── /login
│
├── /dashboard
│
├── /projects
├── /robots
├── /competitions
├── /awards
├── /news
├── /blog
├── /gallery
│
├── /members
├── /alumni
│
├── /sponsors
├── /partners
│
├── /applications
├── /messages
│
└── /settings
```

---

# 82. Navigation Final Recommendation

Desktop:

```text
[ CLUB / LOGO ]

Work
Team
Competitions
Journal
About

                         Join the Team
```

Mobile:

```text
[ LOGO ]                         [ MENU ]
```

The mobile menu can expose the complete hierarchy.

---

# 83. The Most Important UX Rule

The site should never make a visitor ask:

> "Okay, but what does this team actually build?"

Within the first few sections, the visitor should see:

```text
Robot
Projects
People
Engineering
Competition
```

That is the core identity of the website.

---

# 84. Content Priority

If there is limited time to populate the website, prioritize in this order:

```text
1. Homepage
2. Team
3. Current robot
4. Projects
5. Competition
6. About
7. Join
8. Sponsors
9. Gallery
10. Journal
```

A beautiful website with five excellent projects is better than a massive empty website with twenty unfinished sections.

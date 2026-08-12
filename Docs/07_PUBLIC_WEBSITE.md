# 07 — PUBLIC WEBSITE INFORMATION ARCHITECTURE & PAGE SPECIFICATION

**Document:** `07_PUBLIC_WEBSITE.md`

This document defines the public-facing website: its pages, navigation, content hierarchy, user journeys, and what each page is supposed to accomplish.

The website should feel like the **official digital home of an ambitious university robotics club**, not like a competition registration page, generic student club website, or AI-generated portfolio.

---

# 1. Core Identity

The organization is:

> **An IUST robotics club.**

It currently competes in the:

> **RoboCup Smart Manufacturing League (SML)**

but the website must **not** be designed as an SML-only team website.

The club should be able to expand into:

- Other RoboCup leagues.
- Other robotics competitions.
- Research projects.
- Engineering projects.
- Education.
- Workshops.
- Open-source projects.
- Community activities.
- Future robotics disciplines.

The architecture must therefore communicate:

```text
IUST Robotics Club
        │
        ├── Competition
        │      └── SML
        │
        ├── Engineering
        │
        ├── Research
        │
        ├── Education
        │
        └── Community
```

---

# 2. Primary Website Goals

The website has five major goals.

### 1. Represent the team professionally

Sponsors, universities, organizers, companies, and other teams should immediately understand that this is a serious engineering organization.

### 2. Document engineering work

The website should demonstrate:

- Robots.
- Software.
- Hardware.
- Mechanical systems.
- Projects.
- Research.
- Engineering decisions.

### 3. Attract people

Potential members should understand:

- Who the team is.
- What the team builds.
- What technologies are used.
- What departments exist.
- How they can join.

### 4. Build credibility

The website should clearly communicate:

- Competition participation.
- Results.
- Awards.
- Projects.
- Sponsors.
- Partners.
- University affiliation.

### 5. Build an archive

Over time, the website should become a historical record of the club.

---

# 3. Primary Audiences

The design should account for these audiences:

```text
Priority 1
Sponsors

Priority 2
Competition organizers

Priority 3
Other robotics teams

Priority 4
Potential members

Priority 5
IUST / university community

Priority 6
General public
```

The website should not explicitly optimize for one audience at the expense of all others.

---

# 4. Public Navigation

Recommended primary navigation:

```text
Home
Team
Robots
Projects
Competitions
Research
Journal
Gallery
Sponsors
Join Us
Contact
```

Where appropriate, secondary pages can live underneath these sections.

---

# 5. Navigation Philosophy

Do not put every page into the main navbar.

For example:

```text
Awards
Results
Alumni
Partners
```

can be reached through relevant pages.

The navbar should remain visually clean.

---

# 6. Header

Desktop header:

```text
┌───────────────────────────────────────────────────────────────┐
│ LOGO     Team   Robots   Projects   Competitions   Journal    │
│                                              [EN / فارسی]    │
└───────────────────────────────────────────────────────────────┘
```

Potential CTA:

```text
Join Us
```

The exact arrangement should be refined during implementation.

---

# 7. Language Switcher

The public site supports:

```text
English
فارسی
```

The site must **not** use:

```text
/en
/fa
```

Instead:

```text
language cookie
        ↓
Next.js rendering
        ↓
English / Persian
```

Changing language should preserve the current page where possible.

For example:

```text
/projects/robot-vision
```

should remain the equivalent project page after switching language.

---

# 8. Homepage

The homepage is the most important page.

It should immediately communicate:

```text
Who we are
What we build
Why we matter
What we're working on
```

---

# 9. Homepage Hero

The hero should be highly visual but restrained.

Do **not** make it look like:

```text
AI startup landing page
```

Do **not** use:

- Excessive gradients.
- Random glowing particles.
- Floating AI blobs.
- Generic futuristic stock imagery.
- Excessive glassmorphism.
- Fake holographic interfaces.

---

# 10. Hero Concept

Recommended direction:

```text
IUST ROBOTICS

We build robots,
systems, and the engineers behind them.
```

Supporting statement:

```text
An engineering-driven robotics club at
Iran University of Science and Technology,
currently competing in RoboCup's
Smart Manufacturing League.
```

The exact copy should remain editable.

---

# 11. Hero Visual

The hero should contain the major "wow" element:

> An interactive Three.js industrial robot.

It should be a **real 3D scene**, not:

```text
<canvas>
simple shapes
```

or a static HTML/CSS robot.

The robot should feel like an industrial robotic system.

Possible concept:

```text
Industrial robotic arm
+
workcell
+
subtle environment
+
lighting
+
interaction
```

---

# 12. Three.js Robot

The robot should support subtle interaction.

Examples:

- Cursor movement affects camera.
- Hover reveals small technical details.
- Robot arm moves subtly.
- Clicking a component can reveal a label.
- Idle animation.
- Scroll-based camera transition.

But:

> The interaction must remain elegant.

Do not turn the hero into a video game.

---

# 13. Robot Visual Philosophy

The robot should look:

```text
Industrial
Engineered
Physical
Technical
Premium
```

Not:

```text
Cute
Cartoon
Cyberpunk
Sci-fi fantasy
```

The robot should feel like something that could plausibly exist in a university robotics laboratory.

---

# 14. Hero Performance

Three.js must not destroy performance.

Requirements:

- Lazy-load where appropriate.
- Respect reduced-motion preferences.
- Avoid enormous models.
- Use optimized geometry.
- Use compressed textures where appropriate.
- Avoid excessive post-processing.
- Provide a graceful fallback.

On low-power/mobile devices:

```text
Interactive 3D
       ↓
Reduced 3D
       ↓
Static visual fallback
```

depending on capability.

---

# 15. Hero CTA

Primary:

```text
Explore Our Work
```

Secondary:

```text
Meet the Team
```

Potential third action:

```text
Join Us
```

Do not overwhelm the hero with five buttons.

---

# 16. "What We Do" Section

Immediately after the hero, explain the club.

Five pillars:

```text
Engineering
Competition
Education
Research
Community
```

Each should have a concise description.

---

# 17. Engineering

Example concept:

> We design complete robotic systems across software, electronics, mechanical engineering, and control.

---

# 18. Competition

Example concept:

> We apply our engineering work in real competitive environments, starting with RoboCup Smart Manufacturing League.

---

# 19. Education

Example concept:

> We learn by building, sharing knowledge, mentoring each other, and turning theory into working systems.

---

# 20. Research

Example concept:

> We explore robotics, perception, autonomy, navigation, manipulation, and intelligent systems.

---

# 21. Community

Example concept:

> We are building a long-term community of students and engineers interested in robotics.

---

# 22. Current Focus

The homepage should communicate the current phase of the team.

Since the team started this year, do **not** pretend to have decades of achievements.

Instead:

```text
Our first year.
Our first robot.
Our first competition.
```

This can actually become part of the brand story.

---

# 23. First-Year Story

Recommended framing:

> **The beginning of something bigger.**

The club is in its first year.

The website should present this as:

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

rather than attempting to look like an established organization with a huge history.

---

# 24. Current Robot

Feature the primary competition robot.

Section:

```text
THE MACHINE

Our current platform for Smart Manufacturing League.
```

Show:

- Robot visual.
- Short technical description.
- Technologies.
- Current status.
- Link to robot page.

---

# 25. Engineering Stack

A visual section can show the current technologies.

Initial technologies include:

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

Do not simply make a giant wall of technology logos.

Use them contextually.

---

# 26. Technology Presentation

Better:

```text
Software
ROS 2 · C++ · Python · YOLO · SLAM

Perception
LiDAR · Computer Vision

Compute
NVIDIA Jetson · STM

Hardware
PCB Design · Embedded Systems

Mechanical
SolidWorks · Mechanical Design
```

This feels more like engineering than a technology-logo carousel.

---

# 27. Featured Projects

Homepage should show approximately:

```text
3–4 projects
```

not twenty.

Each project card should contain:

```text
Image / visual
Title
Short description
Technologies
```

with:

```text
View Project →
```

---

# 28. Projects Page

Route:

```text
/projects
```

Purpose:

> Show what the team actually builds.

Projects may include:

- Robotics software.
- Perception.
- Navigation.
- Embedded systems.
- PCB design.
- Mechanical systems.
- Research prototypes.
- Competition subsystems.

---

# 29. Project Detail

Example:

```text
/projects/[slug]
```

Structure:

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
Technology
↓
Team
↓
Robot
↓
Competition
↓
Gallery
↓
GitHub
↓
Related Projects
```

Not every section must appear when no content exists.

---

# 30. Empty Content Rule

If a project has no:

```text
GitHub
Gallery
Competition
Robot
```

do not show empty placeholders.

The page should adapt to available content.

---

# 31. Team Page

Route:

```text
/team
```

This is one of the most important pages.

It should communicate:

> The robot is built by people.

---

# 32. Team Page Structure

Recommended:

```text
Team introduction
↓
Departments
↓
Current members
↓
Alumni
↓
Team timeline
↓
Join Us
```

---

# 33. Department Presentation

Departments:

```text
Mechanical
Hardware
Software
Management
```

A member may belong to multiple departments.

The UI should visually communicate collaboration rather than strict organizational silos.

---

# 34. Member Cards

Member card:

```text
Photo
Name
Role
Departments
```

Optional:

```text
GitHub
Personal website
```

Avoid putting every skill on the card.

---

# 35. Member Detail

Route:

```text
/team/[slug]
```

Show:

```text
Photo
Name
Role
Bio
Departments
Skills
Education
Projects
Robots
GitHub
Website
```

This page should feel like a professional engineering profile.

---

# 36. Special Member Presentation

The team specifically wants especially strong presentation of the core/team members.

However:

> Do not make one member look artificially superior to everyone else.

The hierarchy should come naturally from:

- Role.
- Responsibility.
- Projects.
- Biography.
- Contribution.

---

# 37. Alumni

Alumni should have a dedicated section:

```text
/team/alumni
```

or be integrated into:

```text
/team
```

The preferred UX is likely:

```text
Current Team | Alumni
```

tabs or sections.

---

# 38. Alumni Philosophy

Alumni are part of the organization's history.

Do not hide them simply because they are no longer active.

The team should eventually show:

```text
Current
Past
Future
```

as one continuous story.

---

# 39. Robots Page

Route:

```text
/robots
```

Purpose:

> Show the physical systems the club has built.

Cards can include:

```text
Robot
Status
Competition
Short description
```

---

# 40. Robot Detail

Route:

```text
/robots/[slug]
```

Recommended:

```text
Hero
↓
Interactive / visual model
↓
Overview
↓
Architecture
↓
Hardware
↓
Software
↓
Perception
↓
Navigation
↓
Team
↓
Projects
↓
Competitions
↓
Gallery
```

Not every section needs to exist.

---

# 41. Robot Technical Visualization

Where possible, show architecture diagrams or technical illustrations.

Examples:

```text
LiDAR
 ↓
Perception
 ↓
Localization
 ↓
Planning
 ↓
Control
 ↓
Actuation
```

These should be real engineering diagrams, not decorative AI-generated graphics.

---

# 42. Competitions Page

Route:

```text
/competitions
```

Purpose:

> Document competitive participation.

Initial featured competition:

```text
RoboCup
Smart Manufacturing League
```

But the page should support future competitions.

---

# 43. Competition Detail

Route:

```text
/competitions/[slug]
```

Structure:

```text
Competition overview
↓
League
↓
Team participation
↓
Robot
↓
Projects
↓
Results
↓
Awards
↓
Gallery
↓
Timeline
```

---

# 44. Competition Results

Results should be visually prominent but factual.

For example:

```text
Qualification
87 points

Final
5th Place
```

Only show actual data supplied by administrators.

Never invent numbers.

---

# 45. Awards

Awards should have a dedicated visual treatment.

However:

> Do not use giant trophy graphics everywhere.

The presentation should remain understated and professional.

---

# 46. Research

Route:

```text
/research
```

This is important because the organization is intended to be a robotics club rather than simply a competition team.

Research can eventually contain:

- Research topics.
- Publications.
- Experiments.
- Technical articles.
- Papers.
- Research projects.
- Open-source work.

Version one can be lightweight.

---

# 47. Research Philosophy

The website should communicate:

> Competition is one way we build robotics expertise; it is not the entirety of our work.

This distinction is important for future expansion.

---

# 48. Journal

Instead of separate main-navigation items for:

```text
Blog
News
```

use:

```text
Journal
```

as a higher-level section.

Inside:

```text
Journal
├── Blog
└── News
```

This keeps navigation cleaner.

---

# 49. Blog

Blog content should be technical and educational.

Possible subjects:

```text
How we implemented SLAM
Why we chose ROS 2
Designing our PCB
Building the robot chassis
Computer vision pipeline
Lessons from our first competition
```

---

# 50. News

News is for:

```text
Competition announcements
Team announcements
New members
Competition participation
Major milestones
Partnerships
Awards
```

---

# 51. Article Page

Article structure:

```text
Title
Author
Date
Reading time
Cover
Content
Related projects
Related robots
Related articles
```

The reading experience should be excellent.

Avoid unnecessary UI surrounding the article.

---

# 52. Gallery

Route:

```text
/gallery
```

The gallery should feel curated.

Not:

```text
Instagram clone
```

Use:

```text
large imagery
asymmetric layouts
albums
competition moments
lab work
team moments
```

---

# 53. Gallery Philosophy

Images should support the story.

A strong image of:

```text
A team member debugging the robot
```

can be more valuable than:

```text
A generic robot render
```

---

# 54. Sponsors

Route:

```text
/sponsors
```

This is a premium, minimal section.

The visual direction should be:

> **Apple-like restraint.**

Not:

```text
"BUY OUR SPONSORSHIP"
```

---

# 55. Sponsor Presentation

Sponsors should be categorized by tier.

Example:

```text
Strategic Partners

[ LOGO ]       [ LOGO ]

Gold

[ LOGO ]       [ LOGO ]

Silver

[ LOGO ] [ LOGO ] [ LOGO ]
```

Actual tier names are managed through the admin panel.

---

# 56. Sponsor Links

Every sponsor with a website URL should have:

```text
Visit Sponsor →
```

or the logo itself should link to the sponsor's site.

Open external links safely.

---

# 57. Partners

Partners should have a separate section from sponsors.

This distinction matters because:

```text
Sponsor ≠ Partner
```

A company may support the team without being a financial sponsor.

---

# 58. Join Us

Route:

```text
/join
```

This is a major conversion page.

It should explain:

```text
Why join
What you can work on
Departments
What we expect
How recruitment works
Application form
```

---

# 59. Recruitment Philosophy

Because the club is young, the page should communicate:

> You don't have to know everything before joining.

The focus should be:

```text
Curiosity
Engineering
Learning
Commitment
Teamwork
```

rather than requiring an unrealistic list of skills.

---

# 60. Join Application

The application should collect only useful information.

Possible:

```text
Name
Email
Education
Department
Message
GitHub
Portfolio
Resume
```

Avoid unnecessary personal questions.

---

# 61. Contact

Route:

```text
/contact
```

Use a structure similar to the PishTalk contact experience.

Show:

```text
Email
Social links
Location / university context
Contact form
```

---

# 62. Contact Form

Recommended:

```text
Name
Email
Subject
Message
```

Optional:

```text
Organization
```

Do not make the form unnecessarily long.

---

# 63. Social Presence

Supported social platforms:

```text
Instagram
LinkedIn
YouTube
GitHub
Telegram
```

Social links should be configurable through the admin panel.

---

# 64. GitHub

GitHub should be present but should not become the site's primary identity.

The website is:

> the team's engineering home.

GitHub is:

> one way to explore its work.

Project pages should link to repositories where available.

---

# 65. Team Statistics

The homepage can include a restrained statistics section.

Possible statistics:

```text
Members
Projects
Robots
Competitions
Years Active
```

But:

> Never show meaningless statistics.

For a first-year team, avoid:

```text
10,000+ lines of code
999 hours engineered
500 commits
```

These don't communicate real value.

---

# 66. Better First-Year Statistics

Potentially:

```text
1
Year

4
Engineering Departments

1
Competition

X
Engineers

X
Projects
```

Only display values that actually exist.

---

# 67. Timeline

A timeline can communicate the club's evolution:

```text
2026
Club founded

↓
Robot development begins

↓
First prototype

↓
Competition preparation

↓
RoboCup SML
```

This is particularly valuable because the club is starting this year.

---

# 68. "What We're Building"

This section can be dynamic.

Show:

```text
Current robot
Active projects
Current competition
Recent engineering milestone
```

This makes the homepage feel alive.

---

# 69. Homepage Final Structure

Recommended order:

```text
1. Hero
   ↓
2. What We Do
   ↓
3. Current Focus
   ↓
4. Current Robot
   ↓
5. Engineering Stack
   ↓
6. Featured Projects
   ↓
7. Team
   ↓
8. Competition
   ↓
9. Latest Journal
   ↓
10. Sponsors / Partners
   ↓
11. Join Us
   ↓
12. Footer
```

The actual visual rhythm should not feel like twelve identical sections.

---

# 70. Footer

Footer should contain:

```text
IUST Robotics
Short description

Navigation
Team
Robots
Projects
Competitions
Journal
Sponsors
Join Us
Contact

Social
Instagram
LinkedIn
YouTube
GitHub
Telegram

Language
English
فارسی

University affiliation
Iran University of Science and Technology
```

Do not make unsupported claims about official university sponsorship or endorsement.

---

# 71. University Relationship

The site should communicate:

> The club is associated with / based at Iran University of Science and Technology.

But because the university does not strongly support the club, do **not** imply:

```text
Officially sponsored by IUST
Official IUST team
Funded by IUST
```

unless the team later has explicit authorization for those claims.

This distinction is important.

---

# 72. URL Architecture

Recommended:

```text
/
 /team
 /team/[slug]

 /robots
 /robots/[slug]

 /projects
 /projects/[slug]

 /competitions
 /competitions/[slug]

 /research

 /journal
 /journal/blog
 /journal/blog/[slug]
 /journal/news
 /journal/news/[slug]

 /gallery

 /sponsors
 /partners

 /join
 /contact
```

Do not create unnecessary routes.

---

# 73. Dynamic Content

All content below should come from PostgreSQL/admin:

```text
Members
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
Timeline
Social links
Applications
```

The page structure itself remains code.

---

# 74. SEO-Friendly URLs

Use stable English slugs.

Examples:

```text
/robots/atlas
/projects/autonomous-navigation
/competitions/robocup-2026
/journal/blog/building-our-navigation-stack
```

Do not use database IDs in public URLs.

---

# 75. 404 Page

The 404 page should feel like part of the robotics website.

Concept:

```text
SYSTEM ERROR

The requested path does not exist.

[Return Home]
```

It can contain a subtle robotics visual.

Do not make it childish.

---

# 76. Loading Experience

Use purposeful loading states.

Examples:

```text
Robot loading
Project loading
Article loading
```

Do not display generic:

```text
Loading...
```

everywhere if a better skeleton is possible.

---

# 77. Error Pages

Create:

```text
Global error
404
Database/content error fallback
```

The user should never see raw Next.js/Prisma errors.

---

# 78. Responsive Design

The website must be fully responsive.

Primary target:

> Laptop/Desktop.

Secondary:

> Mobile.

But mobile must be a first-class experience, not a shrunken desktop version.

---

# 79. Mobile Navigation

On mobile:

```text
Logo
Language
Menu
```

with an accessible menu drawer.

Avoid overcrowding the top of the screen.

---

# 80. Mobile Three.js

The 3D robot must adapt.

Possible mobile behavior:

```text
Desktop:
Interactive 3D

Mobile:
Reduced interaction / optimized 3D

Very low capability:
Static fallback
```

The exact implementation should be determined through performance testing.

---

# 81. Reduced Motion

If the user has:

```text
prefers-reduced-motion: reduce
```

the site should significantly reduce:

- Camera movement.
- Robot animation.
- Scroll animations.
- Decorative motion.

The website should remain fully usable.

---

# 82. Interaction Philosophy

Use animation to communicate:

```text
hierarchy
transition
feedback
depth
```

not simply:

```text
because animation looks cool
```

The website should feel engineered.

---

# 83. The "Wow" Factor

The website should have a few strong moments:

### 1.

Interactive industrial robot.

### 2.

Beautiful project/robot storytelling.

### 3.

Premium sponsor presentation.

### 4.

Excellent typography and spacing.

### 5.

Smooth but restrained transitions.

Do **not** create twenty different effects.

---

# 84. Anti-AI-Generated Design Rule

The website must explicitly avoid the visual language commonly associated with AI-generated websites.

Avoid excessive:

```text
purple/blue gradients
glowing blobs
floating glass cards
random 3D objects
generic futuristic backgrounds
neon borders
excessive rounded cards
unnecessary particle effects
stock AI imagery
```

Instead prioritize:

```text
real photography
real engineering artifacts
technical diagrams
industrial materials
precise typography
strong grids
asymmetric composition
real team documentation
```

---

# 85. Image Philosophy

The site should **not be heavily image-based**.

Images should appear when they add real information.

Priority:

```text
Real team photos
Real robot photos
Real competition photos
Real project photos
Real laboratory photos
```

over:

```text
generic robotics stock photos
AI-generated robot renders
```

---

# 86. Visual Density

Target:

```text
60% dark technical
30% robotics laboratory
10% premium
```

This is a design direction rather than a literal color ratio.

The website should feel primarily:

> dark + technical + engineered

with moments of:

> laboratory + premium presentation.

---

# 87. Light Mode

Light mode should exist.

However:

> Dark mode is the primary visual identity.

Light mode should not look like a completely different website.

Both modes must share:

- Typography.
- Layout.
- Spacing.
- Components.
- Brand language.

---

# 88. Final Public Website Principle

The most important rule for the public website is:

> **Show the engineering, not the template.**

A visitor should leave the website thinking:

> "These students actually build robots."

not:

> "This is a nice-looking AI-generated website."

The design, content structure, interactions, and CMS should all reinforce that impression.

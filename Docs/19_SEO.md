# `12_SEO.md`

# SEO Specification

## 1. Purpose

This document defines the SEO strategy for the robotics club website.

SEO should help the website become discoverable by:

- Robotics students.
- Engineers.
- Researchers.
- Potential team members.
- Other robotics teams.
- Competition organizers.
- Sponsors.
- Universities.
- The general public.

The SEO strategy must support both **English and Persian**, while treating English as the primary language.

The website must not feel like it was designed for search engines.

> **People first, search engines second.**

---

# 2. Primary SEO Goals

The website should rank for searches related to:

### Club

- Robotics club
- Robotics team
- IUST robotics
- Iran robotics team
- University robotics team
- IUST robotics club

### SML

- RoboCup SML
- Smart Manufacturing League
- RoboCup industrial robotics
- Smart Manufacturing League Iran
- SML robotics team

### Technical Work

- ROS 2 robotics
- autonomous robotics
- SLAM robotics
- LiDAR robotics
- YOLO robotics
- Jetson robotics
- industrial robotics
- robot navigation
- computer vision robotics

### Recruitment

- robotics team recruitment
- robotics team Iran
- robotics student team
- join robotics team
- robotics internship/team opportunities

These should be used naturally.

Do not keyword-stuff pages.

---

# 3. Brand SEO

The team does not have a final name yet.

The SEO architecture must therefore avoid hardcoding a temporary team name throughout the application.

The site should support:

```text
siteName
siteShortName
siteDescription
universityName
```

as configurable values.

When the final team name is chosen, it should be possible to update the brand without restructuring the website.

---

# 4. University Association

The club is associated with:

> Iran University of Science and Technology (IUST)

The website should communicate this accurately.

The university association should not be exaggerated.

The site should not imply official university sponsorship or institutional endorsement unless that becomes formally true.

---

# 5. Primary Domain

The canonical production domain must be configurable.

Do not hardcode the development domain into SEO metadata.

Example conceptual configuration:

```text
NEXT_PUBLIC_SITE_URL
```

The production URL should be used for:

- Canonical URLs.
- Sitemap.
- Open Graph.
- Structured data.
- Robots.
- Alternate language URLs.

---

# 6. HTTPS

The production website must use HTTPS.

All HTTP requests should redirect to HTTPS.

There should be one canonical protocol.

---

# 7. Canonical URLs

Every indexable page must have a canonical URL.

Example:

```text
https://example.com/projects/robot-navigation
```

The canonical URL should be generated automatically from the site's configured base URL.

---

# 8. URL Structure

URLs should be:

- Short.
- Stable.
- Human-readable.
- Lowercase.
- Descriptive.

Preferred:

```text
/projects/autonomous-navigation
/robots/sml-2026
/competitions/sml-2026
/team
/blog/robot-navigation-with-ros2
```

Avoid:

```text
/page?id=173
/content/938291
/project-final-version-2
```

---

# 9. URL Language Strategy

The website must **not** use `/en` and `/fa`.

The language is determined through a cookie.

Therefore URLs remain language-neutral:

```text
/team
/projects
/blog
/contact
```

The same route can render either English or Persian based on the selected language.

---

# 10. Important SEO Consequence

Because language is controlled through a cookie rather than the URL, search engines may not reliably discover two separate language versions of the same page.

Therefore the implementation should use server-rendered language selection and appropriate metadata wherever possible.

The SEO system must avoid generating conflicting metadata based solely on client-side state.

---

# 11. Preferred Language for Search

English is the preferred language for the site's primary SEO strategy.

English pages should have:

- Complete metadata.
- Strong descriptions.
- Structured data.
- Proper headings.
- Search-friendly content.

Persian should also be fully supported.

---

# 12. Persian SEO

Persian content must use natural Persian search language.

Do not mechanically translate English keywords.

For example, the Persian equivalent of a robotics concept should be written naturally for Persian-speaking users.

---

# 13. Language Detection

The application should determine the active language before rendering SEO-sensitive content whenever possible.

Avoid:

```text
Client renders English
↓
JavaScript changes to Persian
↓
Metadata remains English
```

The server-rendered response should correspond to the active language.

---

# 14. Metadata Architecture

Every important page should be able to define:

```text
title
description
canonical
openGraph
twitter
robots
```

and language-specific variants where appropriate.

---

# 15. Default Metadata

The site should have global fallback metadata.

Conceptually:

```text
siteName:
[Team Name]

title:
[Team Name] — Robotics Club at IUST

description:
A robotics club at Iran University of Science and Technology focused on engineering, competition, research, education, and community.
```

The exact final copy should be created once the team identity is finalized.

---

# 16. Title Format

Use a consistent format.

For example:

```text
[Page Name] | [Team Name]
```

or for the homepage:

```text
[Team Name] — Robotics Club at IUST
```

Do not repeat the same generic title on every page.

---

# 17. Title Length

Page titles should generally remain concise.

Target approximately:

```text
50–60 characters
```

when practical.

Do not obsess over an exact character count if doing so makes the title unnatural.

---

# 18. Meta Descriptions

Important pages should have unique descriptions.

Target approximately:

```text
140–160 characters
```

where practical.

Descriptions should explain the page rather than simply list keywords.

---

# 19. Homepage SEO

The homepage should communicate:

```text
Who:
Robotics club

Where:
IUST

What:
Engineering, robotics, competition, research, education

Current focus:
Smart Manufacturing League / RoboCup industrial context
```

Example conceptual description:

> A robotics club at IUST building robots through engineering, competition, research, education, and collaboration.

Final wording should be refined once the team name and identity are established.

---

# 20. About Page

The About page should target concepts such as:

```text
IUST robotics club
robotics team
robotics engineering
student robotics
```

It should explain:

- Why the club exists.
- What it does.
- Its values.
- Its current SML work.
- Its broader robotics ambitions.

---

# 21. Team Page

The team page should be optimized around:

```text
robotics team
IUST robotics team
robotics students
robotics engineers
```

Each member's name may also become searchable.

---

# 22. Member Pages

Individual member profiles should only be indexable if they contain meaningful public information.

For example:

```text
/team/parsa-samiei
```

could contain:

- Name.
- Role.
- Biography.
- Skills.
- Projects.
- Education.
- GitHub.
- Personal website.

If member pages are too thin, they should not be indexed.

---

# 23. Projects SEO

Every significant project should have its own URL.

Example:

```text
/projects/autonomous-navigation
```

A project page should contain enough text to explain:

- Problem.
- Objective.
- Technology.
- Architecture.
- Implementation.
- Results.
- Team members.
- Related competition.

---

# 24. Project Keyword Strategy

Technology terms should naturally appear in project content.

Current technology areas include:

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

Do not create separate pages simply to rank for each technology unless there is genuinely substantial content.

---

# 25. Robots SEO

Each major robot should have a dedicated page.

Example:

```text
/robots/[robot-slug]
```

The page should include:

- Robot name.
- Purpose.
- Competition.
- Hardware.
- Software.
- Development history.
- Results.
- Media.

---

# 26. Competition SEO

Each competition should have its own page.

Example:

```text
/competitions/sml-2026
```

The page should explain:

- Competition.
- League.
- Team participation.
- Robot.
- Results.
- Awards.
- Media.
- Timeline.

---

# 27. SML SEO

The website should establish the relationship clearly:

> Smart Manufacturing League (SML) is part of the industrial context of RoboCup.

Do not make unsupported claims about the competition.

Use official competition terminology consistently.

---

# 28. Competition Results

Results should be indexable where they represent meaningful public information.

Examples:

```text
SML 2026
Qualification result
Final ranking
Award
Match result
```

Use structured, readable content.

---

# 29. Awards

Awards should be represented as real achievements only.

Do not create SEO pages for awards with no substantive content.

---

# 30. Blog SEO

The blog should be one of the primary long-term SEO channels.

Potential content:

- Robotics engineering.
- Robot development.
- Competition preparation.
- ROS 2.
- SLAM.
- Computer vision.
- LiDAR.
- Embedded systems.
- PCB design.
- Mechanical design.
- Lessons from competitions.
- Team development.

---

# 31. Blog URL

Use:

```text
/blog/[slug]
```

Example:

```text
/blog/building-a-robot-navigation-stack-with-ros2
```

---

# 32. Blog Slugs

Slugs should be:

- Lowercase.
- Stable.
- Descriptive.
- Based on the article title.

Do not include dates unless dates are important to the URL strategy.

Preferred:

```text
/blog/robot-navigation-with-ros2
```

Avoid:

```text
/blog/2026/08/12/robot-navigation-with-ros2
```

---

# 33. Blog Metadata

Each article should support:

```text
title
description
slug
coverImage
author
publishedAt
updatedAt
language content
tags
canonical
```

---

# 34. Article Author

Articles should identify the author where appropriate.

This improves authenticity and establishes that the content comes from actual engineers/students rather than an anonymous content farm.

---

# 35. Article Dates

Use:

```text
Published
Updated
```

when relevant.

Do not repeatedly update the date without actually updating the content.

---

# 36. Blog Categories

Keep categories limited.

Potential categories:

```text
Robotics
Software
Hardware
Mechanical
Competition
Research
Team
```

Do not create dozens of categories.

---

# 37. Blog Tags

Tags should be used sparingly.

Potential tags:

```text
ROS 2
SLAM
LiDAR
YOLO
Jetson
C++
Python
SML
```

Tags should only be indexable if their resulting pages contain useful content.

---

# 38. Thin Content Prevention

Do not allow automatically generated pages for:

- Empty categories.
- Empty tags.
- Empty galleries.
- Empty member sections.
- Empty project relationships.

These should be:

```text
noindex
```

or not generated at all.

---

# 39. Gallery SEO

The main gallery page may be indexable.

Individual gallery images generally do not need their own SEO pages.

Album pages can be indexable if they contain enough contextual content.

---

# 40. Sponsor SEO

Sponsors should not be treated as SEO landing pages.

Sponsor profiles may exist for navigation and recognition, but thin sponsor pages should generally not be indexed.

---

# 41. Partner SEO

Same principle applies to partners.

The site should link to their official websites but should not create hundreds of low-value pages.

---

# 42. Join the Team SEO

The Join page should target:

```text
join robotics team
robotics club recruitment
IUST robotics
robotics team opportunities
```

The page should clearly explain:

- Who can apply.
- What disciplines exist.
- How recruitment works.
- What applicants can expect.

---

# 43. Contact SEO

The Contact page should contain:

- Official contact information.
- Social links.
- Contact form.
- Relevant organization information.

Do not stuff keywords into the page.

---

# 44. Structured Data

The website should use Schema.org structured data where appropriate.

Potential types:

```text
Organization
EducationalOrganization
SportsOrganization
Person
Article
BlogPosting
Event
ImageObject
BreadcrumbList
```

Only use a schema type when it accurately represents the content.

---

# 45. Organization Schema

The club should have organization-level structured data containing appropriate information such as:

```text
name
url
logo
description
sameAs
parentOrganization
```

where applicable.

---

# 46. University Relationship

If technically and semantically appropriate, the organization schema may reference IUST as the associated educational organization.

Do not represent the club as an official university department unless that is actually true.

---

# 47. Social Profiles

The organization schema may include:

```text
sameAs
```

for official:

- Instagram.
- LinkedIn.
- YouTube.
- GitHub.
- Telegram.

Only official accounts should be included.

---

# 48. Person Schema

Public member pages may use `Person` structured data.

Possible properties:

```text
name
image
jobTitle
worksFor
sameAs
```

Only expose information intentionally made public.

---

# 49. Article Schema

Blog articles should use:

```text
Article
```

or:

```text
BlogPosting
```

where appropriate.

Include:

```text
headline
description
image
datePublished
dateModified
author
publisher
```

when available.

---

# 50. Event Schema

Public events may use `Event` structured data.

Potential examples:

- Team events.
- Workshops.
- Public demonstrations.
- Community events.

Only use Event schema for genuine events.

---

# 51. Competition Schema

Do not invent a special competition schema.

Use appropriate general structured data where relevant.

Competition pages can primarily rely on:

```text
Organization
Article
BreadcrumbList
```

depending on content.

---

# 52. Breadcrumbs

Important hierarchical pages should have breadcrumbs.

Example:

```text
Home
→
Projects
→
Autonomous Navigation
```

Breadcrumbs should be:

- Visible where useful.
- Structured using Schema.org.
- RTL-aware.

---

# 53. Sitemap

The site must automatically generate:

```text
/sitemap.xml
```

The sitemap should contain only canonical, indexable URLs.

---

# 54. Sitemap Content

Include:

- Homepage.
- About.
- Team.
- Projects.
- Robots.
- Competitions.
- Results.
- Blog.
- Public articles.
- Public albums where valuable.
- Join.
- Contact where appropriate.

Exclude:

- Admin.
- Authentication.
- Draft content.
- Private content.
- Search results.
- Filter URLs.

---

# 55. Dynamic Sitemap

The sitemap should be generated dynamically from the database.

When a project is published:

```text
Project published
↓
appears in sitemap
```

When it is unpublished:

```text
Project unpublished
↓
removed from sitemap
```

---

# 56. Sitemap Last Modification

Where possible, use meaningful modification dates.

Do not set every page's `lastmod` to the current date on every request.

---

# 57. Robots.txt

The website must provide:

```text
/robots.txt
```

It should allow crawling of public content.

It should disallow private application areas.

Conceptually:

```text
Disallow: /admin
Disallow: /api
```

The exact configuration should be determined by the implementation.

---

# 58. Noindex Areas

Potential noindex routes:

```text
/admin/*
/login
/search
/private/*
```

Draft content should also be noindex.

---

# 59. Authentication Pages

Login/admin pages should not be indexed.

They should not appear in the sitemap.

---

# 60. Search Pages

Internal search results should generally be:

```text
noindex
```

This prevents search-engine-generated URL spam.

---

# 61. Pagination

If pagination exists for:

- Blog.
- Gallery.
- Projects.

the implementation must avoid creating confusing duplicate metadata.

---

# 62. Filtering URLs

Avoid making every filter combination crawlable.

For example:

```text
/projects?category=software
/projects?category=hardware
/projects?tag=ros2
```

should not automatically become thousands of indexable pages.

---

# 63. Faceted Navigation

Filters are primarily a user experience feature.

SEO indexability should be deliberately controlled.

---

# 64. Duplicate Content

Avoid duplicate pages caused by:

- Multiple query parameters.
- Alternate trailing slash behavior.
- HTTP/HTTPS.
- WWW/non-[WWW](http://WWW).
- Language state inconsistencies.
- Duplicate slugs.

---

# 65. Trailing Slash

Choose one URL convention and enforce it consistently.

The application should not generate both:

```text
/team
/team/
```

as separate canonical URLs.

---

# 66. Redirects

If a published slug changes, the system should support redirects.

Example:

```text
/projects/old-robot
        ↓
301
        ↓
/projects/new-robot
```

---

# 67. Slug Changes

Admin users should be warned before changing a published slug.

A redirect should be created where practical.

---

# 68. 404 Pages

The site should have a custom 404 page.

It should:

- Match the visual identity.
- Help the user recover.
- Provide useful navigation.

Do not make the 404 page a huge animation that slows navigation.

---

# 69. Internal Linking

Internal linking should be intentional.

For example:

```text
Robot
 ↓
Competition
 ↓
Project
 ↓
Team members
```

This helps both users and search engines understand relationships.

---

# 70. Project Relationships

Projects should link to:

- Related robot.
- Competition.
- Team members.
- Related articles.

where relevant.

---

# 71. Team Relationships

Member profiles can link to:

- Projects.
- Robots.
- Articles.

where relevant.

---

# 72. Competition Relationships

Competition pages can link to:

- Robot.
- Projects.
- Results.
- Gallery.
- News.

This creates a strong internal content graph.

---

# 73. Semantic HTML

Use semantic HTML:

```text
header
nav
main
section
article
aside
footer
```

Avoid building the entire site from generic `<div>` elements.

---

# 74. Heading Structure

Each page should have one clear primary heading.

Recommended:

```text
H1
 ├── H2
 │    └── H3
 └── H2
```

Do not choose heading levels purely for visual sizing.

Use CSS for appearance.

---

# 75. Content Quality

SEO content should demonstrate real expertise.

The team should publish things it actually knows or has done.

Examples:

> How we implemented SLAM for our robot.

is substantially more valuable than:

> What is SLAM? A Complete Guide to Robotics.

unless the latter contains genuine technical insight.

---

# 76. Technical Writing

Technical articles should be encouraged.

Potential article structure:

```text
Problem
↓
Constraints
↓
Approach
↓
Implementation
↓
Testing
↓
Results
↓
Lessons learned
```

This naturally creates high-quality technical content.

---

# 77. E-E-A-T Principles

The site should demonstrate:

- Real experience.
- Technical expertise.
- Clear authorship.
- Real projects.
- Real competition participation.
- Real team members.
- Real results.

Do not try to manufacture authority through excessive SEO language.

---

# 78. Image SEO

Images should have:

- Descriptive alt text.
- Appropriate dimensions.
- Meaningful surrounding context.
- Stable URLs.

---

# 79. Open Graph

Every important public page should generate Open Graph metadata:

```text
og:title
og:description
og:url
og:type
og:image
```

---

# 80. Social Preview

When someone shares:

```text
Project
Competition
Blog post
Robot
```

the preview should look intentional and branded.

---

# 81. Twitter/X Metadata

Where appropriate, support:

```text
twitter:card
twitter:title
twitter:description
twitter:image
```

Even if Twitter/X is not currently a primary social platform.

---

# 82. Canonical + Language Consideration

Because the site does not use `/en` and `/fa`, the implementation must be especially careful not to claim that cookie-based language variants are independent URL documents when they are not.

Do not generate misleading `hreflang` links to nonexistent URLs.

---

# 83. International SEO

If the project later decides to move to explicit language URLs such as:

```text
/en
/fa
```

the architecture should be able to support that migration.

For the current version:

```text
cookie-based language
```

remains the source of truth for the user interface.

---

# 84. Persian RTL SEO

Persian pages must preserve:

- Correct language metadata.
- Correct direction.
- Natural Persian text.
- Correct Persian typography.

Do not convert Persian content into Latin transliteration for SEO.

---

# 85. URL Language

Even though Persian content is supported, URLs may remain Latin/English-friendly.

This makes sharing and infrastructure simpler.

---

# 86. Local/Regional SEO

The team is associated with IUST and Iran.

Relevant location context should be included naturally in:

- About.
- Contact.
- Team.
- Competition participation.

Do not add location keywords repeatedly.

---

# 87. Search Console

Production deployment should be prepared for:

> Google Search Console

and equivalent search engine webmaster tools where relevant.

The site should expose:

- Sitemap.
- Robots.
- Canonical URLs.

---

# 88. Analytics

Analytics can be added separately from SEO.

Do not introduce excessive third-party scripts solely for SEO.

Performance remains a priority.

---

# 89. SEO and Performance

SEO implementation must not significantly hurt:

- LCP.
- CLS.
- INP.
- TTFB.

Especially important:

> The Three.js hero must not prevent the primary page content from rendering.

---

# 90. JavaScript and SEO

Important content must be server-rendered or otherwise available in the initial HTML where practical.

Do not make critical content dependent entirely on client-side JavaScript.

---

# 91. Next.js Metadata

Use Next.js's native metadata system.

Prefer:

```text
generateMetadata()
```

for dynamic content.

Avoid manually manipulating `<head>` through client components.

---

# 92. Dynamic Metadata

For database-backed pages:

```text
Project
Robot
Competition
Article
Member
```

metadata should be generated from the corresponding database content.

---

# 93. Missing Metadata

Every indexable page must have sensible fallback metadata.

No page should produce:

```text
<title>undefined</title>
```

or an empty description.

---

# 94. Draft Content

Draft content must not be:

- In sitemap.
- Indexed.
- Canonicalized as public content.
- Accessible through public APIs.

---

# 95. Published Content

Publishing content should automatically make it eligible for:

```text
Sitemap
Internal linking
Search indexing
Open Graph
```

subject to the content type's configuration.

---

# 96. Unpublishing

Unpublishing should remove the page from normal navigation and sitemap.

Depending on the page's history, it may return:

```text
404
```

or:

```text
410
```

or redirect to an appropriate replacement.

---

# 97. SEO Admin Controls

The admin panel should allow appropriate content types to specify:

```text
SEO title
SEO description
OG image
Canonical override
Index/noindex
```

These should be optional.

---

# 98. SEO Defaults

If an admin does not enter SEO metadata:

```text
Content title
+
generated description
+
default site image
```

should be used.

Admins should not be forced to manually configure SEO for every page.

---

# 99. Canonical Override

Canonical overrides should be available only to administrators who understand their purpose.

An accidental canonical override can remove a page from search results.

---

# 100. SEO Validation

The admin UI should warn about obvious SEO problems such as:

```text
Missing title
Missing description
Missing image
Very short title
Very long title
Missing slug
```

Warnings should not prevent publishing unless the field is genuinely required.

---

# 101. SEO Preview

Where practical, the admin panel should show a simple preview:

```text
Google-style result
────────────────────────
Page title
example.com/page
Description...
```

This is a preview, not a guarantee of how Google will display it.

---

# 102. Structured Data Validation

Structured data should be tested after implementation using appropriate schema validation tools.

Do not blindly add schema markup without verifying it.

---

# 103. SEO Testing Checklist

Before launch, verify:

```text
✓ Every important page has a title
✓ Every important page has a description
✓ Canonical URLs are correct
✓ Sitemap works
✓ Robots works
✓ Draft pages are hidden
✓ Admin pages are hidden
✓ 404 works
✓ Redirects work
✓ Open Graph works
✓ Images have alt text
✓ Structured data is valid
✓ Internal links work
✓ No accidental duplicate URLs
✓ HTTPS is canonical
```

---

# 104. Post-Launch SEO

SEO should continue after launch.

Monitor:

- Search impressions.
- Search queries.
- Click-through rate.
- Indexed pages.
- Crawl errors.
- Core Web Vitals.
- Top-performing articles.
- Queries bringing visitors.

---

# 105. Content Growth Strategy

The long-term SEO advantage should come from documenting the team's actual work.

A sustainable content cycle:

```text
Build
 ↓
Test
 ↓
Document
 ↓
Publish
 ↓
Share
 ↓
Update
```

This is better than creating generic SEO articles simply to increase page count.

---

# 106. Recommended Initial SEO Content

For launch, prioritize strong pages rather than dozens of thin ones:

```text
Homepage
About the Club
Team
Projects
Robots
SML / Competition
Results
Join the Team
Contact
Sponsors
Gallery
```

Then expand the blog as actual engineering work accumulates.

---

# 107. Long-Term SEO Opportunities

As the club grows, strong search opportunities may come from:

- Technical project reports.
- Competition retrospectives.
- ROS 2 development articles.
- SLAM implementation notes.
- Computer vision experiments.
- Jetson deployment guides.
- PCB design articles.
- Mechanical design documentation.
- Competition preparation.
- Team engineering lessons.

---

# 108. What SEO Must Not Become

The website must never become:

```text
SEO content farm
```

Do not publish generic AI-generated articles simply because they contain keywords.

The team's strongest SEO asset is:

> **Proof that the team actually builds and competes with robots.**

---

# 109. Final SEO Principle

The SEO strategy can be summarized as:

```text
Real team
    ↓
Real engineering
    ↓
Real documentation
    ↓
High-quality content
    ↓
Strong technical structure
    ↓
Search visibility
```

The website should aim to become the **authoritative public home of the robotics club**, not merely a website that happens to rank for "robotics team."

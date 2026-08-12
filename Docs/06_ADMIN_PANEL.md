# 06 — ADMIN PANEL & CONTENT MANAGEMENT

**Document:** `06_ADMIN_PANEL.md`

This document defines how administrators manage the robotics club website.

The admin panel is **not the public website**. It is an internal management system designed to let the team maintain the website without modifying source code.

---

# 1. Primary Goal

The admin panel must allow the team to manage the website's content:

- Team members
- Alumni
- Departments
- Projects
- Robots
- Competitions
- Competition results
- Awards
- Technologies
- Blog
- News
- Gallery
- Videos
- Sponsors
- Sponsor tiers
- Partners
- Timeline
- Contact submissions
- Join applications
- Social links
- Basic site settings
- SEO metadata

The administrator should be able to perform normal content operations without needing to touch the database.

---

# 2. Admin URL

Use a dedicated route:

```text
/admin
```

All admin functionality should live under:

```text
/admin/*
```

Examples:

```text
/admin
/admin/members
/admin/projects
/admin/robots
/admin/competitions
/admin/results
/admin/awards
/admin/blog
/admin/news
/admin/gallery
/admin/sponsors
/admin/partners
/admin/applications
/admin/messages
/admin/settings
```

Do not expose administrative pages through the public navigation.

---

# 3. Authentication

The initial system only requires:

```text
Username
Password
```

There is no need for:

- Public accounts
- Member accounts
- OAuth
- Google login
- GitHub login
- Role-based member accounts

The initial admin architecture should nevertheless be designed so that multiple admin roles can be introduced later.

---

# 4. Authentication Requirements

The implementation must:

- Hash passwords.
- Never store plaintext passwords.
- Use secure sessions.
- Protect every `/admin/*` route.
- Protect admin API/server actions.
- Prevent unauthenticated access.
- Support logout.
- Use secure cookies in production.
- Prevent session fixation.
- Rate-limit login attempts where practical.

Do not implement authentication only in the frontend.

---

# 5. Admin Language

The admin panel is:

> **English-only.**

The public website is bilingual.

The administrator must be able to enter both:

```text
English content
Persian content
```

For example:

```text
Title EN:
Autonomous Navigation System

Title FA:
سامانه ناوبری خودران
```

---

# 6. Admin Layout

The recommended desktop layout:

```text
┌──────────────────────────────────────────────────────────┐
│ Logo / Team                 Search       Admin   Logout   │
├──────────────┬───────────────────────────────────────────┤
│              │                                           │
│ Dashboard    │                                           │
│              │                                           │
│ Team         │              Main Content                 │
│ Projects     │                                           │
│ Robots       │                                           │
│ Competitions │                                           │
│ Blog         │                                           │
│ News         │                                           │
│ Gallery      │                                           │
│ Sponsors     │                                           │
│ Partners     │                                           │
│ Applications │                                           │
│ Messages     │                                           │
│ Settings     │                                           │
│              │                                           │
└──────────────┴───────────────────────────────────────────┘
```

On smaller screens, the sidebar should become a drawer.

---

# 7. Admin Design

The admin panel should **not** attempt to replicate the premium visual style of the public website.

Public website:

```text
premium
industrial
visual
editorial
```

Admin:

```text
clean
efficient
functional
dense where appropriate
easy to scan
```

The administrator should be able to perform tasks quickly.

---

# 8. Dashboard

The dashboard should provide an overview.

Recommended cards:

```text
Current Members
Alumni
Projects
Robots
Competitions
Blog Posts
News
Sponsors
```

Also show actionable items:

```text
New Join Applications
Unread Contact Messages
Draft Content
Recently Published
```

---

# 9. Dashboard Activity

Show recent activity:

```text
Project "..." published
Member "..." updated
New application received
News article published
Sponsor added
```

This does not need to be a complete enterprise audit system initially.

---

# 10. Admin Navigation

Recommended order:

```text
Dashboard

TEAM
  Members
  Departments
  Technologies

ENGINEERING
  Projects
  Robots

COMPETITIONS
  Competitions
  Results
  Awards

CONTENT
  Blog
  News
  Gallery
  Videos

PARTNERSHIPS
  Sponsors
  Sponsor Tiers
  Partners

COMMUNITY
  Join Applications
  Contact Messages

WEBSITE
  Timeline
  Social Links
  Settings
```

Use visual grouping rather than a giant flat navigation.

---

# 11. CRUD Pattern

Most admin sections should follow:

```text
List
 ↓
Create
 ↓
Edit
 ↓
Preview
 ↓
Publish
```

The implementation should use reusable components.

For example:

```text
DataTable
Form
MediaPicker
RichTextEditor
PublishControl
DeleteDialog
StatusBadge
```

Do not build every page completely independently.

---

# 12. List Pages

Every major entity should have a list page.

Example:

```text
Projects

[ + New Project ]

Search projects...

┌──────────────────────────────────────────────┐
│ Project       Status       Published   Actions│
├──────────────────────────────────────────────┤
│ Robot Vision  Active       Yes         Edit   │
│ SLAM System   Completed    Yes         Edit   │
└──────────────────────────────────────────────┘
```

---

# 13. Search

Admin lists should support search where useful.

At minimum:

- Members
- Projects
- Robots
- Competitions
- Blog
- News
- Sponsors
- Applications
- Messages

Search should preferably happen server-side for larger datasets.

---

# 14. Filtering

Useful filters include:

### Members

```text
Current
Alumni
Department
```

### Projects

```text
Planned
Active
Completed
Archived
Published
Draft
```

### Competitions

```text
Year
League
Published
```

### Applications

```text
New
Reviewing
Accepted
Rejected
Archived
```

---

# 15. Pagination

Do not load hundreds or thousands of records into the browser at once.

Use pagination.

Recommended:

```text
20–50 records per page
```

depending on the entity.

---

# 16. Member Management

Admin should be able to:

```text
Create member
Edit member
Publish/unpublish
Mark as alumni
Assign departments
Assign technologies
Add projects
Add robot involvement
Upload profile photo
Add GitHub
Add personal website
Set join date
```

---

# 17. Member Form

The form should contain:

### Identity

```text
Name *
Photo
```

### English

```text
Role
Bio
Education
```

### Persian

```text
نقش
بیوگرافی
تحصیلات
```

### Professional

```text
GitHub
Personal Website
```

### Team

```text
Departments
Technologies
Joined Date
Membership Status
```

### Publishing

```text
Published
```

---

# 18. Multiple Departments

The admin must be able to select multiple departments.

Example:

```text
☑ Software
☑ Management
☐ Hardware
☐ Mechanical
```

Do not limit a member to one department.

---

# 19. Member Profile Preview

Before publishing, admins should have access to a preview.

The preview should resemble the public member page.

This is particularly useful for checking:

- Photo
- English content
- Persian content
- RTL layout
- Skills
- Links

---

# 20. Project Management

Project form:

```text
Title EN *
Title FA

Slug *

Excerpt EN
Excerpt FA

Content EN
Content FA

Status

GitHub URL

Members

Technologies

Robots

Competitions

Media

SEO

Published
```

---

# 21. GitHub Requirement

GitHub must be treated as:

> a project-level link.

The project page may display:

```text
View source on GitHub
```

if a URL exists.

GitHub should **not** dominate the project presentation.

The project itself remains the main content.

---

# 22. Robot Management

Robot form:

```text
Name EN
Name FA

Slug

Description EN
Description FA

Content EN
Content FA

Status

Members
Projects
Technologies
Competitions

Gallery

Published
```

The robot page should eventually support the premium interactive Three.js presentation.

---

# 23. Competition Management

Competition form:

```text
Name EN
Name FA

Organization
League
Year

Location
Start Date
End Date

Website

Description EN
Description FA

Robots
Projects

Results
Awards

Gallery

Published
```

---

# 24. Competition Results

Results should be manageable independently.

Example:

```text
Competition: RoboCup 2026 – SML

[ + Add Result ]

Qualification
Score: 87
Stage: Qualification

Final
Placement: 5
```

Do not force admins to write all results as one paragraph.

---

# 25. Awards

Admin can:

```text
Create award
Edit award
Associate with competition
Set year
Publish
```

If an award is associated with a competition, the public competition page should automatically show it.

---

# 26. Blog Editor

The blog editor should support:

- English content.
- Persian content.
- Rich text.
- Headings.
- Lists.
- Links.
- Code blocks where appropriate.
- Images.
- Embedded YouTube videos where appropriate.
- Quotes.
- Tables if useful.

Do not build a custom rich-text editor from scratch.

Use a mature editor compatible with React/Next.js.

---

# 27. Persian Rich Text

The Persian editor must properly support RTL.

The admin should be able to edit:

```text
English → LTR
Persian → RTL
```

without mixing directionality incorrectly.

---

# 28. News Editor

News uses essentially the same editor architecture as the blog.

However:

```text
Blog = educational / technical / editorial
News = announcements / updates
```

They should remain separate content types.

---

# 29. Gallery Management

Gallery should support albums.

Example:

```text
Gallery

RoboCup 2026
 ├── Robot development
 ├── Competition
 └── Team

Training
 ├── Workshop
 └── Lab

Team
```

Admin can:

```text
Create album
Upload images
Reorder images
Add captions
Publish/unpublish
Delete images
```

---

# 30. Image Upload

The existing PishTalk implementation should be inspected for reference.

The new implementation must use:

> **Jimp**

for image processing.

Do **not** install or use:

```text
sharp
```

because the deployment server is incompatible with it.

---

# 31. Image Processing

Uploaded images should be:

- Validated.
- Resized when appropriate.
- Optimized using Jimp.
- Given safe filenames.
- Stored using a predictable structure.

Example conceptual storage:

```text
/uploads/
  members/
  projects/
  robots/
  gallery/
  sponsors/
  partners/
```

The exact implementation may use a different storage abstraction.

---

# 32. Upload Validation

Validate:

```text
MIME type
File extension
File size
Image dimensions
```

Do not trust the filename supplied by the browser.

Do not allow arbitrary executable files through the media uploader.

---

# 33. Sponsor Management

Admin can:

```text
Create sponsor
Edit sponsor
Upload logo
Set website URL
Select tier
Set order
Publish/unpublish
```

The sponsor card should link to the sponsor's website.

---

# 34. Sponsor Tiers

Admin should be able to create tiers such as:

```text
Strategic Partner
Gold
Silver
Bronze
```

These are examples only.

Do not hard-code them.

The actual tiers should be configurable.

---

# 35. Sponsor Ordering

Sponsors should be presented according to:

```text
Tier priority
↓
Manual order
```

The admin should have an obvious ordering mechanism.

---

# 36. Partner Management

Partners are similar to sponsors but do not require financial tiers.

Admin:

```text
Name
Logo
Description
Website
Order
Published
```

---

# 37. Social Links

Admin can configure:

```text
Instagram
LinkedIn
YouTube
GitHub
Telegram
```

Each has:

```text
URL
Enabled
Order
```

Do not hard-code social URLs into the UI.

---

# 38. Contact Messages

The admin inbox should display:

```text
Name
Email
Subject
Date
Status
```

Opening a message shows:

```text
Name
Email
Subject
Message
Received
```

Admin can mark:

```text
New
Reviewed
Archived
```

---

# 39. Contact Message Security

Never expose contact submissions through a public API.

Only authenticated administrators should access them.

---

# 40. Join Applications

Admin should have a dedicated recruitment inbox.

Example:

```text
Join Applications

┌────────────────────────────────────────────────┐
│ Name      Department    Status      Date       │
├────────────────────────────────────────────────┤
│ Ali       Software      NEW         Aug 12     │
│ Sara      Hardware      REVIEWING   Aug 11     │
└────────────────────────────────────────────────┘
```

---

# 41. Application Details

Opening an application:

```text
Applicant
Email
Education
Department
Message
GitHub
Portfolio
Resume
Submitted date
```

Admin can change status.

---

# 42. Resume Handling

Resume files should:

- Not be publicly indexed.
- Not appear in the public media gallery.
- Not have public URLs.
- Require authenticated access.
- Be removable by admins.

---

# 43. Publishing Workflow

Content should support:

```text
Draft
   ↓
Preview
   ↓
Publish
```

Published content can later be:

```text
Unpublished
   ↓
Draft
```

or:

```text
Archived
```

---

# 44. Unsaved Changes

Forms with substantial content should warn the administrator before leaving if there are unsaved changes.

This is especially important for:

- Blog.
- News.
- Project.
- Robot.
- Competition.

---

# 45. Delete Confirmation

Destructive operations require confirmation.

Example:

```text
Delete Project?

This cannot be easily undone.

[Cancel] [Delete]
```

For important records, prefer archiving/unpublishing.

---

# 46. Toast Notifications

The entire application should use **React-Toastify** for feedback.

Examples:

```text
Project saved successfully.
Member published.
Image uploaded.
Changes discarded.
Failed to save project.
```

Avoid browser-native:

```javascript
alert();
```

for normal UI feedback.

---

# 47. Loading States

Every asynchronous admin operation must have a visible loading state.

Examples:

```text
Saving...
Uploading...
Publishing...
Deleting...
```

Do not leave the administrator wondering whether an action worked.

---

# 48. Error Handling

Errors should be:

- Human-readable.
- Specific where possible.
- Non-technical for normal users.
- Logged server-side when appropriate.

Bad:

```text
PrismaClientKnownRequestError P2002
```

Good:

```text
A project with this slug already exists.
```

---

# 49. Slug Generation

When creating:

```text
Title:
Autonomous Mobile Manipulator
```

the system can suggest:

```text
autonomous-mobile-manipulator
```

The admin should be able to modify it.

For Persian content, do not blindly generate unusable slugs.

English slugs are preferred for stable URLs.

---

# 50. Bilingual Content Validation

The admin should not necessarily be forced to fill Persian content.

Because English is the preferred language, the following is acceptable:

```text
English: required
Persian: optional
```

However, the UI should clearly indicate which language is missing.

---

# 51. Public Language Behavior

The public website has:

```text
No /en
No /fa
```

The selected language is stored in a cookie.

The admin does not change this architecture.

The public application reads the language cookie and renders:

```text
English
```

or:

```text
Persian
```

---

# 52. RTL Admin Content

Even though the admin UI itself is English-only, Persian editing fields must support RTL.

For example:

```text
Persian title
┌───────────────────────────────┐
│      عنوان پروژه              │
└───────────────────────────────┘
```

The English field remains LTR.

---

# 53. Media Picker

Instead of forcing the admin to upload an image every time, a reusable media picker should eventually allow:

```text
Upload new
Choose existing
```

This prevents unnecessary duplicates.

---

# 54. Media Library

A future-friendly media library can show:

```text
Search
Filter by type
Sort
Preview
Delete
```

However, do not over-engineer this in version one.

A simple gallery/media management experience is sufficient.

---

# 55. Admin Responsiveness

The admin panel must also be responsive.

Primary target:

```text
Laptop/Desktop
```

Secondary:

```text
Tablet
Mobile
```

The public website has stronger mobile requirements, but the admin should still remain usable on mobile.

---

# 56. Accessibility

Admin UI must support:

- Keyboard navigation.
- Visible focus states.
- Labels for inputs.
- Accessible dialogs.
- Accessible buttons.
- Screen-reader-friendly form errors.

Do not sacrifice accessibility for visual effects.

---

# 57. Security Boundary

The following are sensitive:

```text
Admin credentials
Join applications
Resumes
Contact messages
Database credentials
Upload endpoints
```

They must never be exposed to client-side JavaScript unnecessarily.

---

# 58. Server-Side Authorization

Do not rely on:

```javascript
if (isAdmin) {
  showButton();
}
```

as security.

Every mutation must be protected server-side.

The client UI is only a convenience layer.

---

# 59. Public vs Admin APIs

Keep a clear distinction:

```text
Public read operations
        ↓
Published content only

Admin operations
        ↓
Authenticated
        ↓
Full CRUD
```

A public API must never accidentally return:

```text
draft content
private applications
contact messages
admin data
```

---

# 60. Admin Architecture

Prefer the Next.js architecture already established by the project.

Use:

- Server Components where appropriate.
- Server Actions where appropriate.
- Route Handlers where an API endpoint is genuinely useful.
- PostgreSQL through Prisma.
- Secure server-side validation.

Avoid creating an unnecessary separate Express backend.

---

# 61. Validation

Use a schema validation library such as:

```text
Zod
```

for server-side input validation.

Validation must happen on the server even if the form validates client-side.

---

# 62. Admin Form Architecture

Forms should use reusable patterns.

For example:

```text
MemberForm
ProjectForm
RobotForm
CompetitionForm
BlogPostForm
NewsForm
SponsorForm
```

Shared components:

```text
BilingualField
SlugField
MediaUploader
RichTextEditor
PublishToggle
DatePicker
```

---

# 63. Preview

Content should support preview before publishing.

A practical implementation can use:

```text
/admin/projects/[id]/preview
```

or an equivalent authenticated preview mechanism.

The preview must not accidentally become publicly indexed.

---

# 64. Draft Isolation

Draft content must never appear in:

- Public search.
- Sitemap.
- RSS.
- Public API.
- Homepage.
- Public listings.
- Structured data.

---

# 65. Admin Dashboard Philosophy

The admin panel should feel like a **tool built for the team**, not a generic CMS template.

It should prioritize:

```text
speed
clarity
reliability
```

over visual spectacle.

The public site gets the "wow."

The admin gets the work done.

---

# 66. PishTalk Reference

The implementation AI should inspect:

```text
https://github.com/ParsaSamiei/PishTalk
```

for:

- Authentication patterns.
- Admin structure.
- File upload architecture.
- Database patterns.
- Prisma usage.
- Toast notifications.
- Existing deployment constraints.

But it must **not blindly copy** the PishTalk architecture.

The robotics club is a different product with a different content model.

---

# 67. Final Admin Goal

An administrator with no knowledge of the source code should be able to:

> Add a new member, upload their photo, assign their departments and skills, create a project, connect that project to a robot and competition, publish a news article, upload gallery images, add a sponsor, and review a recruitment application — entirely through the admin panel.

If that is possible, the CMS architecture is doing its job.

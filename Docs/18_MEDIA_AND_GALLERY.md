# `11_MEDIA_AND_GALLERY.md`

## 1. Purpose

This document defines how images, videos, 3D assets, documents, media uploads, galleries, and other visual assets are handled across the robotics club website.

The media system must support the club as it grows from its first SML season into a broader robotics club.

The system should prioritize:

> **Real documentation of real engineering work.**

Media should make the club feel authentic, not like a stock-image robotics website.

---

# 2. Core Media Philosophy

The website should use media to show:

- What the team actually builds.
- Who the people behind it are.
- How the robots evolve.
- What competitions look like.
- What happens in the lab.
- What projects are being developed.
- What the club has achieved.

The preferred hierarchy is:

```text
Real team media
        ↓
Real robot/project media
        ↓
Real competition media
        ↓
Real laboratory/workshop media
        ↓
Professional renders/CAD
        ↓
Carefully selected external media
```

Generic stock imagery should be avoided.

---

# 3. Media Types

The system should support at least:

```text
Images
Videos
3D models
Documents
Logos
Thumbnails
Gallery collections
External media
```

---

# 4. Image Types

Images may represent:

### Team

- Member portraits.
- Team group photos.
- Alumni photos.
- Team activities.

### Robots

- Full robot.
- Close-up components.
- Sensors.
- Electronics.
- Mechanical assemblies.
- Testing.

### Projects

- Prototype.
- Final build.
- CAD render.
- PCB.
- Testing.
- Development.

### Competitions

- Competition venue.
- Matches.
- Robot operation.
- Team preparation.
- Awards.
- Behind-the-scenes.

### Club

- Laboratory.
- Workshops.
- Meetings.
- Events.
- Community activities.

---

# 5. Image Authenticity

Real photographs should be preferred.

Avoid generic images such as:

```text
"robotics engineer working on robot"
"AI robot"
"futuristic factory"
"industrial robot stock photo"
```

unless there is a very specific reason to use them.

---

# 6. Gallery Philosophy

The gallery is not simply:

> "A page containing every photo we have."

It should be a curated visual archive.

Photos should be organized around meaningful contexts.

Examples:

```text
SML 2026
Robot Development
Lab
Team
Workshops
Competitions
Behind the Scenes
```

---

# 7. Gallery Structure

Recommended model:

```text
Gallery
│
├── Featured
│
├── Albums
│   ├── SML 2026
│   ├── Robot Development
│   ├── Lab
│   ├── Team
│   └── Events
│
└── Individual Media
```

---

# 8. Gallery Albums

An album should contain:

```text
Title
Slug
Description
Cover image
Media items
Date
Category
Published status
Display order
```

For bilingual content:

```text
titleEn
titleFa

descriptionEn
descriptionFa
```

---

# 9. Gallery Item

Each gallery item should support:

```text
Image
Title
Caption
Alt text
Date
Album
Credits
Tags
Published status
Display order
```

Where relevant:

```text
project
competition
robot
event
```

may be linked to the media item.

---

# 10. Media Relationships

Media should be reusable.

For example, one photograph could appear in:

```text
Gallery
+
SML competition page
+
Robot page
+
News article
```

The system should avoid creating duplicate physical files for the same image.

---

# 11. Media Library

The admin panel should have a central media library.

Conceptually:

```text
Media
├── Images
├── Videos
├── 3D Models
├── Documents
└── Logos
```

The administrator should be able to upload and manage assets independently of pages.

---

# 12. Media Metadata

Each media asset should have metadata such as:

```text
id
type
file
filename
mimeType
size
width
height
altTextEn
altTextFa
captionEn
captionFa
credit
createdAt
updatedAt
```

Additional fields can be added where necessary.

---

# 13. File Naming

Uploaded files should not rely on the user's original filename for public URLs.

For example, avoid exposing:

```text
IMG_8273_FINAL_FINAL2.jpg
```

Use generated storage-safe identifiers.

The original filename can remain as metadata.

---

# 14. Image Formats

Preferred modern formats:

```text
WebP
AVIF
```

where supported by the chosen image pipeline.

Original uploads may be retained when appropriate.

---

# 15. Jimp Requirement

The project must use:

> **Jimp**

for server-side image processing.

Do **not** use:

> Sharp

The deployment server is not compatible with Sharp.

This is a non-negotiable implementation requirement.

---

# 16. Image Processing

Uploaded images may require:

- Resize.
- Compression.
- Thumbnail generation.
- Aspect-ratio variants.
- Metadata extraction.
- Optimization.

Jimp should handle the required server-side transformations.

---

# 17. Original Files

The system should distinguish between:

```text
Original
Optimized
Thumbnail
```

where appropriate.

Do not repeatedly recompress an already optimized image.

---

# 18. Image Dimensions

The application should generate appropriate image variants for different use cases.

For example:

```text
Thumbnail
Card
Gallery
Hero
```

The exact dimensions should be determined by the implementation based on the site's responsive design.

---

# 19. Aspect Ratios

The system should not force every uploaded image into one aspect ratio.

Support common formats such as:

```text
1:1
4:3
3:2
16:9
21:9
```

Portrait photographs must remain portrait.

Landscape photographs must remain landscape.

---

# 20. Cropping

Automatic cropping should be conservative.

Never crop important content from:

- Faces.
- Robots.
- Logos.
- Awards.
- Technical components.

Where possible, the admin should be able to specify a focal point.

---

# 21. Image Focal Point

For important images, support:

```text
focalX
focalY
```

This allows responsive cropping to preserve the important portion of an image.

---

# 22. Alt Text

Every meaningful image must support alt text.

Alt text must be:

- Descriptive.
- Concise.
- Relevant.
- Localized when appropriate.

Example:

English:

> Team members testing the autonomous robot in the laboratory.

Persian:

> اعضای تیم در حال آزمایش ربات خودران در آزمایشگاه.

---

# 23. Decorative Images

Purely decorative images should use empty alt text:

```html
alt=""
```

Do not write unnecessary descriptions for decorative elements.

---

# 24. Captions

Captions should be optional.

A caption should add context rather than repeat the image's alt text.

Example:

> Final testing session before the SML qualification round.

---

# 25. Credits

When media comes from someone outside the team, credits should be supported.

Example:

```text
Photo: John Doe
```

Credits should be displayed when required.

---

# 26. Copyright

The admin should be responsible for confirming that uploaded media can legally be published.

The system should not assume that an image found online is free to use.

---

# 27. External Images

External image URLs should not be the default architecture for important site media.

Prefer storing and serving assets under infrastructure controlled by the project.

---

# 28. Remote Media

External media may be supported where necessary.

Examples:

```text
YouTube thumbnail
Sponsor logo hosted externally
Competition organizer media
```

However, remote URLs must be validated and controlled.

---

# 29. Video

Videos should primarily be embedded from external platforms.

Preferred:

```text
YouTube
```

The admin should store:

```text
video URL
platform
title
thumbnail
caption
```

---

# 30. YouTube

YouTube URLs must be supported.

Example:

```text
https://www.youtube.com/watch?v=...
```

The admin should not need to manually enter embed HTML.

The system should extract the relevant video identifier safely.

---

# 31. Video Privacy

Do not automatically embed arbitrary third-party URLs.

Only approved platforms should be supported initially.

---

# 32. Video Loading

Do not load every YouTube iframe immediately.

Use a lightweight preview/thumbnail and load the iframe when appropriate.

This helps page performance.

---

# 33. Video Gallery

Videos may appear in the gallery alongside photographs.

The UI should clearly distinguish:

```text
Image
Video
```

without excessive visual decoration.

---

# 34. Self-Hosted Video

Self-hosted video should not be the default.

Large video files create unnecessary infrastructure and bandwidth costs.

Use YouTube for most public videos unless there is a specific reason to host them directly.

---

# 35. 3D Models

The site should support 3D models where useful.

Preferred format:

```text
GLB / glTF
```

Potential uses:

- Main robot.
- Robot showcase.
- Interactive component viewer.
- Future CAD demonstrations.

---

# 36. 3D Asset Management

3D assets should be treated separately from ordinary images.

Metadata may include:

```text
model
previewImage
fileSize
polycount
version
```

---

# 37. 3D Privacy

Do not publish proprietary CAD models simply because they exist.

The admin must explicitly mark models as public.

---

# 38. CAD Media

CAD renders can be displayed without publishing the underlying CAD files.

For example:

```text
SolidWorks render
+
technical description
```

without exposing:

```text
.SLDPRT
.SLDASM
```

files.

---

# 39. PCB Media

PCB designs may be represented using:

- Photographs.
- Rendered images.
- Screenshots.
- Close-up shots.

Do not publish sensitive PCB design files unless explicitly intended.

---

# 40. Documents

The media system may eventually support:

```text
PDF
```

for public documents such as:

- Team reports.
- Competition documents.
- Technical papers.
- Public presentations.

---

# 41. Document Visibility

Documents should have explicit visibility:

```text
Draft
Published
Private
```

Private documents must never be exposed through public APIs.

---

# 42. Gallery UI

The gallery should feel editorial rather than like a generic photo grid.

Possible layout:

```text
Featured image
      +
asymmetric grid
      +
curated albums
```

---

# 43. Gallery Grid

Avoid making every image identical.

An editorial grid can use different sizes:

```text
┌───────────────┬───────┐
│               │       │
│    Large      │ Small │
│               │       │
├───────┬───────┼───────┤
│ Small │       │       │
│       │ Large │ Large │
└───────┴───────┴───────┘
```

But the layout must remain responsive.

---

# 44. Gallery Responsiveness

Desktop may use:

```text
Editorial masonry / asymmetric grid
```

Mobile should use:

```text
Simple responsive grid
```

Do not force complex desktop masonry onto narrow screens.

---

# 45. Gallery Lightbox

Clicking a gallery image should open a lightbox.

The lightbox should support:

- Previous.
- Next.
- Close.
- Keyboard navigation.
- Touch swipe.
- Caption.
- Credit.
- Zoom where appropriate.

---

# 46. Lightbox Direction

The lightbox must respect the active language.

Persian:

```text
RTL
```

English:

```text
LTR
```

Image itself should not be mirrored.

---

# 47. Gallery Keyboard Support

Desktop users must be able to use:

```text
←
→
Esc
```

for navigation and closing.

---

# 48. Gallery Touch Support

Mobile users should be able to:

```text
Swipe left/right
Tap close
Pinch/zoom where supported
```

---

# 49. Image Loading

Images should use lazy loading where they are below the fold.

Hero/above-the-fold images should receive priority where appropriate.

---

# 50. Blur / Placeholder

Images may use lightweight placeholders during loading.

Do not overuse dramatic blur-up effects.

A subtle placeholder is enough.

---

# 51. Broken Images

If an image fails:

```text
Show designed fallback
+
preserve layout
```

Never allow broken image icons to destroy the page layout.

---

# 52. Image Security

Uploads must be validated by:

- MIME type.
- File extension.
- File signature where appropriate.
- File size.

Do not trust client-provided MIME types.

---

# 53. Upload Limits

The admin upload system should enforce reasonable limits.

Separate limits should exist for:

```text
Images
Videos
3D models
Documents
```

Large files should be rejected before expensive processing where possible.

---

# 54. Filename Security

Never use an uploaded filename directly as a filesystem path.

Generate safe unique filenames.

---

# 55. Path Traversal

The media system must protect against:

```text
../
absolute paths
malicious filenames
```

---

# 56. Image Processing Security

Jimp processing must occur on validated image files.

Do not allow arbitrary file types to be passed into image-processing pipelines.

---

# 57. Storage Architecture

The application should abstract storage behind a media service.

Conceptually:

```text
Admin Upload
      ↓
Media Service
      ↓
Validation
      ↓
Jimp Processing
      ↓
Storage
      ↓
Database metadata
```

This allows storage to change later without rewriting the entire application.

---

# 58. Local Storage

Local server storage may be used initially if appropriate.

However, the architecture should not hardcode the assumption that media will always live on the application server.

---

# 59. Future Object Storage

The architecture should allow migration to:

```text
S3-compatible storage
Object storage
CDN-backed storage
```

without changing the public content model.

---

# 60. Media URLs

Public media URLs should be stable.

For example:

```text
/media/robots/robot-01.webp
```

or another storage abstraction.

Avoid exposing internal filesystem paths.

---

# 61. Media Deletion

Deleting a media record should be deliberate.

If an image is referenced by:

- Project.
- Gallery.
- Article.
- Robot.
- Sponsor.

the admin should be warned before deleting it.

---

# 62. Orphaned Media

The system should eventually support detecting unused media.

Example:

```text
Unused media:
12 files
```

This allows the admin to clean up storage.

---

# 63. Media Replacement

The admin should be able to replace an image while preserving the content reference where practical.

Example:

```text
Project
 ↓
Hero image
 ↓
replace image
```

The project itself should not need to be recreated.

---

# 64. Media Ordering

Gallery and media collections should support manual ordering.

Recommended:

```text
displayOrder
```

The admin can reorder items.

---

# 65. Featured Media

Content entities may specify a featured image.

Examples:

```text
Project → featuredImage
Robot → featuredImage
Competition → featuredImage
News → featuredImage
Album → coverImage
```

---

# 66. Hero Media

Hero media should be treated separately from normal content media.

The admin should be able to specify:

```text
Hero image
Hero video
Hero 3D model
```

depending on the page.

---

# 67. Hero Video

If used:

- Keep it short.
- Compress it appropriately.
- Provide poster image.
- Respect reduced motion.
- Never make the site dependent on autoplay.

---

# 68. Hero 3D

The homepage hero should primarily use the Three.js robot defined in:

```text
10_3D_AND_INTERACTIONS.md
```

The media system should provide the underlying model/preview assets where appropriate.

---

# 69. Team Member Photos

Member photos should support:

```text
Portrait
Name
Role
```

Optional:

```text
Bio
Skills
Education
GitHub
Personal website
Projects
```

Photos should have consistent visual treatment without making everyone look artificially identical.

---

# 70. Alumni Media

Alumni can retain their historical team photographs.

The system should allow alumni profiles to reference old media.

---

# 71. Sponsor Logos

Sponsor logos require special handling.

Each sponsor should support:

```text
Logo
Name
Website URL
Tier
Description
Display order
Published status
```

---

# 72. Sponsor Logo Requirements

The admin should be able to upload sponsor logos.

The site should display logos consistently without forcing them into distorted dimensions.

---

# 73. Sponsor Logo Treatment

Logos may appear:

- Monochrome.
- Original color.
- Neutral treatment.

The final design should choose based on the sponsor section.

The logo itself must never be stretched.

---

# 74. Sponsor Tier

Sponsors must support tiers.

For example:

```text
Title Sponsor
Gold
Silver
Bronze
```

The exact names should be configurable rather than hardcoded.

---

# 75. Sponsor Links

Clicking a sponsor logo should link to the sponsor's website.

External links should:

- Use safe URL validation.
- Open appropriately.
- Clearly behave as external links where necessary.

---

# 76. Sponsor Presentation

The sponsor section should use the premium visual style described in the broader design direction.

It should feel:

> **Subtle, prestigious, and Apple-like.**

Not:

> **A wall of advertisements.**

---

# 77. Partner Logos

Partners may be handled similarly to sponsors but should remain conceptually separate.

Do not mix:

```text
Sponsors
Partners
```

into one generic "logos" section.

---

# 78. Social Media

The website supports:

```text
Instagram
LinkedIn
YouTube
GitHub
Telegram
```

Social profile URLs should be stored centrally/configurably.

---

# 79. Social Media Embeds

Do not automatically embed social feeds.

Embeds can create:

- Performance problems.
- Privacy concerns.
- Layout instability.
- External dependency issues.

Prefer simple links unless an embed provides substantial value.

---

# 80. External Video URLs

YouTube URLs can be stored in the database.

The admin should enter:

```text
YouTube URL
```

rather than iframe code.

The application generates the embed safely.

---

# 81. Media Credits in Gallery

Where a photograph has a photographer/organization credit, the gallery should be able to display:

```text
Photo: ...
```

without making credits visually dominant.

---

# 82. Media Dates

Media should optionally have a date.

This allows future filtering such as:

```text
2026
2027
SML 2026
```

---

# 83. Media Tags

Tags may include:

```text
robot
sml
competition
lab
software
hardware
mechanical
team
workshop
```

Tags should be reusable.

---

# 84. Gallery Filters

The gallery may support filters such as:

```text
All
Competitions
Robots
Team
Lab
Events
```

Do not create dozens of filters.

---

# 85. Gallery Search

Search is optional.

It should only be added if the gallery becomes large enough to justify it.

---

# 86. Admin Gallery Workflow

Recommended workflow:

```text
Upload media
      ↓
Process media
      ↓
Add metadata
      ↓
Add to album
      ↓
Preview
      ↓
Publish
```

---

# 87. Bulk Upload

Bulk image upload should be supported if practical.

Example:

```text
Select 20 photos
        ↓
Upload
        ↓
Generate thumbnails
        ↓
Admin reviews
        ↓
Assign album
        ↓
Publish
```

---

# 88. Bulk Metadata

The admin may optionally apply shared metadata to multiple selected images.

For example:

```text
Album: SML 2026
Tags: competition, SML
```

---

# 89. Draft Media

New uploads should not automatically become public.

Recommended default:

```text
Draft
```

The admin explicitly publishes them.

---

# 90. Publish Controls

Media and albums should support:

```text
Draft
Published
Archived
```

Archived media remains in the system but is not publicly displayed.

---

# 91. Visibility

Some media may be:

```text
Public
Unlisted
Private
```

This is useful for future workflows.

---

# 92. Admin Preview

The admin should be able to preview media exactly as it will appear publicly before publishing.

---

# 93. Gallery Performance

The gallery must remain fast even with hundreds of images.

Use:

- Thumbnails.
- Lazy loading.
- Responsive image sizes.
- Pagination or progressive loading if necessary.

Do not load every full-resolution image on initial page load.

---

# 94. Image CDN Compatibility

The media architecture should allow future CDN integration.

This is particularly important as:

```text
Gallery size
+
Team activity
+
Competition documentation
```

grows over time.

---

# 95. SEO Media

Important images should have:

- Meaningful filenames/metadata.
- Alt text.
- Relevant captions where appropriate.

The SEO implementation is further defined in:

```text
12_SEO.md
```

---

# 96. Open Graph Images

Important pages should support dedicated social preview images.

For example:

```text
Project
Competition
Article
Robot
```

may have a custom Open Graph image.

---

# 97. Generated Social Images

The system may eventually generate consistent social cards from content.

Example:

```text
┌─────────────────────────────┐
│ TEAM NAME                   │
│                             │
│ Autonomous Robot            │
│                             │
│ SML 2026                    │
└─────────────────────────────┘
```

This is optional for the first release.

---

# 98. No Artificial Media

Do not generate fake:

- Competition photos.
- Team photos.
- Robot testing photos.
- Awards.
- Sponsor appearances.

The website must never present fabricated imagery as real team history.

---

# 99. Placeholder Media

Before real media exists, placeholders may be used.

But placeholders must clearly be temporary and should be easy to replace through the admin panel.

---

# 100. First-Year Strategy

Because the club is in its first year, the website should be designed to grow with the media archive.

Initially there may only be:

```text
A few team photos
Robot development photos
Lab photos
SML photos
CAD renders
PCB images
```

The system should not look empty simply because the club is young.

Curate fewer, stronger images rather than filling the site with mediocre placeholders.

---

# 101. Recommended Initial Gallery

For launch, aim for collections such as:

### The Team

Real team/group photographs.

### Building the Robot

Development and engineering process.

### Inside the Lab

Hardware, electronics, mechanical work, testing.

### SML

Competition preparation and participation.

### Engineering

PCB, CAD, software, sensors, testing.

---

# 102. Media Storytelling

Gallery albums should tell a story.

For example:

```text
Concept
 ↓
CAD
 ↓
Prototype
 ↓
Assembly
 ↓
Testing
 ↓
Competition
```

This is much more valuable than a random collection of photographs.

---

# 103. Image Quality

Prefer images that demonstrate:

- Engineering detail.
- Human involvement.
- Real environments.
- Real machines.
- Real progress.

Avoid publishing every photo simply because it has high resolution.

---

# 104. Photography Style

When taking future team photos, aim for:

- Natural lighting where possible.
- Real lab environments.
- Authentic engineering activity.
- Clean backgrounds.
- Consistent composition.

Avoid overly staged "corporate stock" photography.

---

# 105. Team Portrait Style

Member portraits should be consistent enough to look professional but not so standardized that they feel artificial.

A simple lab/neutral background is sufficient.

---

# 106. Video Style

Videos should prioritize:

- Robot operation.
- Engineering demonstrations.
- Competition footage.
- Build process.
- Technical explanations.
- Team activities.

Do not require cinematic production quality.

Authentic footage is more valuable.

---

# 107. Media on Project Pages

Each project should support:

```text
Featured image
+
Gallery
+
Optional video
+
Optional 3D model
```

This allows engineering work to be documented comprehensively.

---

# 108. Media on Robot Pages

Each robot should support:

```text
Hero image
Gallery
Videos
3D model
Technical diagrams
```

depending on what actually exists.

---

# 109. Media on Competition Pages

Competition pages should support:

```text
Competition cover
Gallery
Videos
Results documents
Awards
```

---

# 110. Media on News/Blog

Articles should support:

```text
Cover image
Inline images
Optional videos
Optional diagrams
```

All media should be reusable from the central media library.

---

# 111. Media Component Architecture

The frontend should provide reusable components such as:

```text
<MediaImage />
<MediaGallery />
<GalleryGrid />
<Lightbox />
<VideoEmbed />
<ModelViewer />
<MediaCard />
<SponsorLogo />
<MediaPlaceholder />
```

Exact names may change during implementation.

---

# 112. Media Abstraction

Components should receive media objects rather than hardcoded file paths.

Bad:

```text
"/uploads/robot.jpg"
```

directly inside components.

Preferred:

```text
media.url
media.alt
media.width
media.height
```

---

# 113. Media API

The media API should support:

```text
Upload
Read
Update metadata
Delete
Publish
Archive
Reorder
Associate
```

Admin-only operations must require authentication.

---

# 114. Public Media API

The public API should return only media that is allowed to be publicly displayed.

Private or draft media must never leak through public endpoints.

---

# 115. Caching

Published media should be cache-friendly.

Changing a media asset should not unnecessarily invalidate the entire website.

---

# 116. Storage Cleanup

The system should eventually support identifying:

```text
Unused originals
Unused thumbnails
Orphaned files
```

for cleanup.

---

# 117. Backup

Media should be considered part of the website's important data.

The deployment/operations strategy should include backups of:

```text
Database metadata
+
uploaded media
```

The database alone is not sufficient.

---

# 118. Admin Media Permissions

Only authenticated administrators can:

- Upload.
- Delete.
- Publish.
- Modify.
- Reorder.

The public can only view published content.

---

# 119. Media Audit

For important changes, the system may eventually track:

```text
Uploaded by
Updated by
Published by
Deleted by
```

This is optional for the first version but should not be architecturally impossible.

---

# 120. Final Media Principles

The implementation must follow these rules:

1. **Real media is preferred over stock media.**
2. **Jimp must be used for image processing; Sharp must not be used.**
3. **Media must be manageable through the admin panel.**
4. **Gallery content must be curated, not dumped.**
5. **Images must be reusable across pages.**
6. **Videos should primarily use YouTube URLs rather than self-hosting.**
7. **3D assets should use optimized GLB/glTF where appropriate.**
8. **Every meaningful image needs proper alt text.**
9. **Media must be responsive.**
10. **Full-resolution assets must not be loaded unnecessarily.**
11. **Private/draft media must never appear publicly.**
12. **Sponsor and partner logos must be independently manageable.**
13. **The media architecture must support the club growing beyond SML.**
14. **The website should document the team's actual engineering journey.**
15. **Do not fabricate the club's history or achievements through generated imagery.**

The overall goal is that when someone visits the gallery, they don't just see **a robotics website** — they see **the actual history of this robotics club being built year by year.**

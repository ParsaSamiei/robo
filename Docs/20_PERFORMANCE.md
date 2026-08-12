# `13_PERFORMANCE.md`

# Performance Specification

## 1. Purpose

This document defines the performance requirements for the robotics club website.

The website is intentionally visually rich and includes:

- Three.js.
- An interactive industrial robot.
- Animations.
- Gallery media.
- Videos.
- Large technical imagery.
- Dynamic database content.
- Admin-uploaded media.

Performance must therefore be treated as a **first-class architectural requirement**, not something optimized at the end.

The goal is:

> **Premium visual experience without premium loading times.**

---

# 2. Core Performance Philosophy

The website should feel:

```text
Immediate
     ↓
Responsive
     ↓
Smooth
     ↓
Visually rich
```

rather than:

```text
Beautiful
     ↓
Loading...
     ↓
Loading...
     ↓
3D loading...
     ↓
Finally usable
```

---

# 3. Performance Priorities

The priority order is:

```text
1. Usability
2. Content availability
3. Core Web Vitals
4. Accessibility
5. Interaction quality
6. Visual effects
```

Visual effects must never take priority over usability.

---

# 4. Primary Performance Targets

The production site should aim for strong Core Web Vitals.

Target:

```text
LCP  < 2.5s
INP  < 200ms
CLS  < 0.1
```

These are targets, not excuses to sacrifice useful functionality.

---

# 5. Initial Page Load

The initial HTML response should contain meaningful content.

The user should not have to wait for:

- Three.js.
- Client-side JavaScript.
- Animations.
- Gallery loading.

before understanding what the club is.

---

# 6. Server Rendering

Use Next.js server rendering appropriately.

Important content should preferably be rendered on the server.

Examples:

```text
Homepage content
About
Projects
Robots
Competition information
Team
Blog
```

---

# 7. Client Components

Use `"use client"` only where client-side functionality is actually required.

Examples:

```text
Three.js
Interactive filters
Gallery lightbox
Forms
Admin UI
Toast notifications
```

Do not turn entire pages into client components unnecessarily.

---

# 8. JavaScript Budget

The website should minimize JavaScript shipped to the browser.

Do not import large libraries globally when only one component needs them.

Prefer:

```text
Page
 ├── Server Components
 └── Small Client Components
```

---

# 9. Three.js Isolation

Three.js should be isolated to the components that need it.

Do not import Three.js into:

```text
Global layout
Navigation
Footer
Every page
```

unless absolutely necessary.

---

# 10. Three.js Lazy Loading

The interactive hero robot should be loaded strategically.

The initial page should be usable before the complete 3D scene is ready.

Possible flow:

```text
Initial render
      ↓
Hero content
      ↓
Robot placeholder
      ↓
Three.js loads
      ↓
3D scene appears
```

---

# 11. 3D Loading Priority

The 3D robot is visually important but must not block:

```text
H1
Hero description
CTA
Navigation
```

from rendering.

---

# 12. Dynamic Import

The 3D scene should be dynamically imported where appropriate.

Conceptually:

```text
Hero
 ├── Text → immediate
 └── Robot → dynamic/lazy
```

This keeps the initial JavaScript bundle smaller.

---

# 13. 3D Asset Size

The GLB/glTF model must be optimized before deployment.

Avoid shipping:

```text
100MB+
```

robot models to ordinary visitors.

The target should be determined based on actual model complexity, but the model should be kept as small as reasonably possible.

---

# 14. 3D Geometry

Reduce unnecessary geometry.

Use:

- Appropriate polygon counts.
- Reused meshes.
- Instancing where useful.
- Simplified hidden geometry.

Do not model details that cannot be seen.

---

# 15. 3D Textures

Textures should be compressed and appropriately sized.

Avoid unnecessarily large:

```text
4K / 8K
```

textures for tiny robot components.

Use different texture resolutions where appropriate.

---

# 16. 3D Materials

Use a reasonable number of materials.

Avoid creating hundreds of unique materials when shared materials would work.

---

# 17. 3D Lighting

Keep lighting relatively simple.

Avoid expensive real-time effects everywhere.

Prefer a small number of carefully chosen lights.

---

# 18. Shadows

Real-time shadows can be expensive.

Use them selectively.

If shadows significantly reduce performance on mobile:

```text
Desktop:
higher quality

Mobile:
reduced quality / disabled
```

---

# 19. Post-Processing

Post-processing effects should be used sparingly.

Avoid unnecessary:

- Bloom.
- Depth of field.
- Motion blur.
- Screen-space effects.

The robot should look good primarily because of its model, materials, composition, and lighting.

---

# 20. Device Adaptation

The 3D renderer should adapt to device capability where practical.

Possible tiers:

```text
High
Medium
Low
Fallback
```

---

# 21. High-End Desktop

Can use:

- Higher resolution rendering.
- Better shadows.
- More detailed model.
- More subtle effects.

---

# 22. Typical Laptop

The default experience should be optimized around this class of device.

The website is primarily designed for laptop/desktop browsing.

It should look excellent without requiring a high-end gaming GPU.

---

# 23. Mobile

Mobile should use a simplified 3D experience.

Potential reductions:

```text
Lower pixel ratio
Lower texture resolution
Simpler shadows
Reduced animation
Reduced geometry
Fewer effects
```

---

# 24. Very Low-Power Devices

If rendering the robot is impractical:

```text
3D
 ↓
Static fallback
```

The rest of the website must continue normally.

---

# 25. Pixel Ratio

Do not blindly use:

```text
window.devicePixelRatio
```

as the rendering resolution.

High-DPI devices can produce excessive GPU load.

Cap the effective pixel ratio.

---

# 26. Frame Rate

The target for normal desktop interaction is approximately:

```text
60 FPS
```

but a stable lower frame rate is preferable to an unstable one.

Do not sacrifice page responsiveness simply to maintain a perfect 60 FPS animation.

---

# 27. Animation Performance

Animations should primarily use GPU-friendly properties.

Prefer:

```text
transform
opacity
```

Avoid repeatedly animating:

```text
width
height
top
left
margin
```

when possible.

---

# 28. Layout Stability

Animations must not cause unexpected layout shifts.

Reserve space for:

- Images.
- Videos.
- 3D canvas.
- Dynamic content.

---

# 29. Image Optimization

All important images should use Next.js's image optimization system where compatible.

Use:

```text
next/image
```

for application images where appropriate.

---

# 30. Responsive Images

Images should be delivered at an appropriate size.

Do not send a:

```text
3000px
```

image to a:

```text
400px
```

mobile card.

---

# 31. Image Formats

Prefer:

```text
AVIF
WebP
```

where practical.

JPEG/PNG can remain available for compatibility or source-specific requirements.

---

# 32. Jimp

Server-side image processing must use:

> **Jimp**

Do not use:

> **Sharp**

The deployment environment is incompatible with Sharp.

This requirement applies to all image processing workflows.

---

# 33. Image Variants

Uploaded images should be able to produce appropriate variants such as:

```text
thumbnail
card
content
hero
```

rather than forcing the browser to download the original.

---

# 34. Image Lazy Loading

Images below the fold should generally be lazy-loaded.

Do not lazy-load the primary hero image if doing so hurts LCP.

---

# 35. Hero Image

If a static hero image is used as a fallback/poster, it should be optimized carefully because it may affect LCP.

---

# 36. Gallery Performance

The gallery must never load every original image immediately.

Use:

```text
thumbnail
 ↓
visible image
 ↓
full resolution when opened
```

---

# 37. Gallery Pagination

If the gallery grows substantially, use:

- Pagination.
- Load more.
- Infinite scrolling.

Do not render hundreds of full-resolution images simultaneously.

---

# 38. Lightbox Performance

The lightbox should load the full-resolution image only when necessary.

Opening image #1 should not download all 100 gallery images.

---

# 39. Video Performance

Videos should primarily be embedded from YouTube.

Do not load YouTube if the visitor has not interacted with the video where practical.

---

# 40. YouTube Facade

Use a lightweight thumbnail/preview before loading the actual YouTube iframe.

Conceptually:

```text
Thumbnail
   ↓
User clicks
   ↓
YouTube iframe loads
```

This can substantially reduce initial page cost.

---

# 41. Autoplay

Avoid automatically playing large videos.

If a hero video is ever used:

- Keep it short.
- Use a poster.
- Respect reduced motion.
- Consider muted playback only where appropriate.

---

# 42. Fonts

Use a limited number of font families and weights.

Do not load:

```text
10 font weights
+
multiple unnecessary families
```

---

# 43. Font Loading

Fonts should be loaded efficiently.

Avoid blocking the entire page while waiting for custom fonts.

---

# 44. Font Subsetting

If custom Persian fonts are used, consider subsetting where practical.

Persian and Latin character coverage should be intentional.

---

# 45. Icons

Use an efficient icon system.

Do not ship an enormous icon library to the browser just to use five icons.

---

# 46. SVG

SVG is preferred for:

- Icons.
- Simple diagrams.
- Logos.
- UI illustrations.

Avoid embedding massive SVG files unnecessarily.

---

# 47. Logo

The future team logo should be optimized for:

- Header.
- Footer.
- Social previews.
- Favicon.
- Mobile.

The implementation should support light/dark variants if required.

---

# 48. Favicon

Provide:

```text
favicon
apple-touch-icon
appropriate metadata
```

without shipping unnecessarily large assets.

---

# 49. Database Performance

PostgreSQL should be optimized for the application's actual query patterns.

Do not retrieve entire content tables when a page only needs:

```text
title
slug
thumbnail
```

---

# 50. Selective Queries

Prefer selecting required fields.

Conceptually:

```text
Projects listing:
id
title
slug
summary
featuredImage
```

rather than loading:

```text
entire project
all gallery
all team members
all technical metadata
```

for every card.

---

# 51. Database Indexes

Frequently queried fields should be indexed.

Likely examples:

```text
slug
published
publishedAt
displayOrder
category
```

and relevant relation fields.

---

# 52. Slug Lookup

Published content should be efficiently retrievable by slug.

Example:

```text
/projects/[slug]
```

should not require scanning the entire table.

---

# 53. Published Content Queries

Public queries should generally filter:

```text
published = true
```

at the database/service level.

Do not fetch drafts and filter them only in the browser.

---

# 54. Admin Queries

Admin pages can retrieve more metadata because they are authenticated.

However, pagination should still be used for large collections.

---

# 55. Pagination

Admin lists should support pagination for:

- Members.
- Projects.
- Articles.
- Gallery.
- Media.
- Sponsors.
- Competitions.

Do not load thousands of records into one page.

---

# 56. Caching

Public content that changes infrequently should be cached.

Good candidates:

```text
About
Projects
Robots
Team
Sponsors
Published articles
```

---

# 57. Cache Invalidation

When an admin publishes or updates content, the relevant cache should be invalidated.

Example:

```text
Update project
 ↓
Invalidate project page
 ↓
Invalidate projects listing
```

Do not invalidate the entire application unnecessarily.

---

# 58. Revalidation

Use Next.js's caching/revalidation capabilities where appropriate.

The goal is:

```text
Fast public pages
+
Fresh published content
```

---

# 59. Dynamic Content

Not everything needs to be fully dynamic on every request.

The application should distinguish between:

```text
Static / cached
Dynamic
Authenticated
```

content.

---

# 60. Contact Forms

Contact form submissions should not force the entire page to become dynamic.

The page can remain cached while the form submits through an appropriate server action/API.

---

# 61. Toastify

React Toastify should be loaded only where client-side toast notifications are required.

Do not unnecessarily include it in server-only pages.

---

# 62. Admin Panel

The admin panel is not subject to the same public performance requirements.

However, it should still:

- Avoid unnecessary queries.
- Paginate large lists.
- Compress uploads.
- Give responsive upload feedback.

---

# 63. API Performance

Public APIs should:

- Return only required fields.
- Avoid N+1 queries.
- Use pagination.
- Validate input.
- Cache where appropriate.

---

# 64. N+1 Queries

Avoid patterns such as:

```text
Fetch 50 projects
 ↓
Fetch members for project 1
 ↓
Fetch members for project 2
 ↓
...
```

Use appropriate joins/includes/batched queries.

---

# 65. Prisma

If Prisma is used, queries should be carefully designed.

Avoid blindly using:

```text
include: {
  everything: true
}
```

on public pages.

---

# 66. Connection Management

PostgreSQL connections must be managed appropriately for the deployment environment.

Avoid creating unnecessary database connections per request.

---

# 67. Server Response Time

Aim for fast server responses.

For typical cached public pages:

```text
TTFB
```

should be kept low.

The exact target depends on hosting and caching architecture.

---

# 68. API Payload Size

Do not return huge JSON payloads.

A project card should not receive:

```text
50 gallery images
+
10 videos
+
full article body
```

when only a thumbnail and summary are displayed.

---

# 69. Infinite Scroll

Use infinite scrolling only when it provides genuine UX value.

For SEO-sensitive content, normal paginated/crawlable pages may be preferable.

---

# 70. Preloading

Use preload selectively.

Good candidates:

- Critical fonts.
- Critical hero image where appropriate.

Do not preload:

- Every image.
- Gallery content.
- YouTube.
- 3D assets indiscriminately.

---

# 71. Prefetching

Next.js navigation prefetching should be used where beneficial.

Do not aggressively prefetch huge pages with:

- 3D models.
- Large galleries.
- Videos.

---

# 72. Route-Level Code Splitting

Each route should load only the JavaScript it needs.

Examples:

```text
Homepage
→ Three.js

Gallery
→ Lightbox

Admin
→ Admin components

Contact
→ Form components
```

---

# 73. Bundle Analysis

The project should periodically analyze the JavaScript bundle.

Identify:

- Large dependencies.
- Duplicate packages.
- Unused code.
- Unexpected client-side imports.

---

# 74. Dependency Discipline

Before adding a library, ask:

```text
Can this be implemented simply without it?
```

Do not add dependencies just because they provide a convenient 5-line abstraction.

---

# 75. Animation Libraries

If an animation library is used, it should be justified.

Do not use several animation libraries simultaneously without a clear reason.

---

# 76. CSS Performance

Prefer efficient CSS.

Avoid massive generated CSS caused by unnecessary utility combinations or duplicated styles.

Tailwind may be used as planned, but production output should contain only required styles.

---

# 77. Background Effects

Avoid expensive full-screen effects such as:

- Multiple animated gradients.
- Huge blur filters.
- Constant particle systems.
- Multiple backdrop filters.

Especially on mobile.

---

# 78. Backdrop Filter

Glass-like effects may be used sparingly.

Do not build the entire site using:

```text
backdrop-filter: blur(...)
```

as it can be expensive on some devices.

---

# 79. Shadow Usage

Shadows should be subtle.

Avoid hundreds of large animated shadows.

---

# 80. Layout Shift Prevention

Reserve dimensions for:

```text
Images
Videos
3D canvas
Cards
Ads — if ever introduced
```

The current site should not use advertising, but future integrations should still follow this rule.

---

# 81. Skeleton Loading

Skeletons may be used for genuinely dynamic content.

Do not use skeletons for every section simply because it looks modern.

---

# 82. Loading States

Loading states should be meaningful.

For example:

```text
Gallery loading
Media uploading
Project loading
```

Use simple visual feedback.

---

# 83. Error States

If content fails to load, provide a useful fallback.

Do not allow one failed component to break the entire page.

---

# 84. Progressive Enhancement

The website should remain useful if:

- WebGL fails.
- JavaScript is delayed.
- A third-party video fails.
- An external image fails.

Core content should remain accessible.

---

# 85. Network Conditions

The site should be tested under:

```text
Fast Wi-Fi
4G
Slow 4G
Slow 3G simulation
High latency
```

The website should remain usable on slower connections.

---

# 86. Mobile Network

Mobile users should not be forced to download the desktop-quality 3D experience.

Adapt assets and rendering based on device capability.

---

# 87. Data Saver

Where practical, respect browser/device data-saving signals.

This can justify:

```text
Reduced 3D
Reduced animation
Lower-resolution media
```

---

# 88. Reduced Motion

Respect:

```text
prefers-reduced-motion
```

This should reduce both UI animation and 3D motion.

---

# 89. Accessibility vs Performance

Never remove accessibility features to improve a benchmark score.

For example:

```text
"Let's remove focus styles because they affect screenshots."
```

is unacceptable.

---

# 90. SEO vs Performance

Do not sacrifice server-rendered content simply to minimize JavaScript.

The goal is:

```text
SSR/Server Components
+
small client islands
```

---

# 91. Third-Party Scripts

Third-party scripts should be minimized.

Potential examples:

```text
Analytics
YouTube
Social embeds
```

should be loaded only when necessary.

---

# 92. YouTube Isolation

YouTube should not be loaded globally.

Only pages containing a video should load the necessary functionality.

---

# 93. Social Links

Simple social links should not require social media JavaScript SDKs.

---

# 94. Analytics

If analytics are added, use a lightweight solution.

Analytics must not block page rendering.

---

# 95. Cookie Handling

The language cookie should be lightweight.

Changing language should not cause unnecessary application-wide data fetching.

---

# 96. Language Performance

Both English and Persian should use the same content architecture.

Do not duplicate entire application bundles for each language.

---

# 97. Persian Font Performance

If a Persian font is used, ensure that the English version does not download unnecessary Persian-only assets unless required.

---

# 98. Image Upload Performance

Admin uploads should process images server-side efficiently.

The upload flow should provide:

```text
Uploading
↓
Processing
↓
Completed
```

rather than appearing frozen.

---

# 99. Jimp Processing

Because Jimp is required, image-processing jobs should be designed carefully.

Large images can consume significant memory.

The implementation should:

- Validate dimensions.
- Validate file size.
- Avoid unnecessary copies.
- Process only required variants.
- Release resources appropriately.

---

# 100. Extremely Large Images

Reject or resize extremely large uploads before attempting expensive processing.

For example, an accidental:

```text
100MP camera image
```

should not be allowed to overwhelm the server.

Exact limits should be defined during implementation.

---

# 101. Server Memory

The application should be designed around the actual VPS/server resources.

Do not assume unlimited RAM.

This is especially important because:

```text
Next.js
+
PostgreSQL
+
Jimp
+
3D asset handling
```

can create memory pressure.

---

# 102. Media Storage

Large media should not unnecessarily occupy application runtime memory.

Where possible:

```text
Upload
 ↓
Process
 ↓
Store
 ↓
Return URL
```

rather than holding all media in memory.

---

# 103. Database Backups

Database backups should not significantly impact public site performance.

Schedule them appropriately.

---

# 104. Monitoring

Production should monitor at least:

```text
Response time
Error rate
Memory usage
CPU
Database performance
Disk usage
```

---

# 105. Media Storage Monitoring

Monitor:

```text
Disk usage
Upload growth
Unused media
Large files
```

The gallery can grow substantially over several seasons.

---

# 106. Error Monitoring

Production errors should be captured.

Examples:

- Server exceptions.
- API errors.
- Image processing failures.
- Database failures.
- WebGL-related client errors where useful.

---

# 107. Performance Testing

Before deployment, test:

### Desktop

```text
Chrome
Safari
Firefox
```

### Mobile

```text
Safari iOS
Chrome Android
```

---

# 108. Browser Testing

At minimum, ensure support for current versions of:

- Chrome.
- Safari.
- Firefox.
- Edge.

Do not optimize exclusively for Chrome.

---

# 109. Safari

Safari is especially important because the site is designed for modern laptops and Apple devices.

Three.js should be tested specifically on Safari.

---

# 110. WebGL Testing

Test:

```text
WebGL available
WebGL unavailable
Older GPU
High-DPI display
Mobile GPU
```

---

# 111. Lighthouse

Use Lighthouse as one diagnostic tool.

Check:

```text
Performance
Accessibility
Best Practices
SEO
```

Do not optimize exclusively for Lighthouse.

---

# 112. Real-World Testing

A perfect Lighthouse score is not the final objective.

Also test the site as a real person would:

```text
Open website
↓
Read hero
↓
Scroll
↓
Open project
↓
View gallery
↓
Navigate
↓
Submit form
```

The experience should feel fast.

---

# 113. Performance Regression

Performance should be checked when introducing:

- New library.
- New animation.
- New 3D asset.
- New gallery.
- New third-party integration.

---

# 114. Performance Budget

The project should establish practical budgets during implementation for:

```text
Initial JS
Initial CSS
Hero media
3D model
Images
Fonts
Third-party scripts
```

These budgets should be measured rather than guessed.

---

# 115. No Performance Theater

Do not optimize meaningless numbers at the expense of the actual experience.

Examples of bad optimization:

```text
Remove useful image because it adds 100KB
but leave a 20MB 3D model.
```

or:

```text
Lazy-load the H1.
```

Performance optimization must target actual bottlenecks.

---

# 116. Performance Architecture

The intended architecture is:

```text
                    ┌───────────────┐
                    │    Browser    │
                    └───────┬───────┘
                            │
                 Server-rendered HTML
                            │
                 ┌──────────▼──────────┐
                 │      Next.js        │
                 │ Server Components   │
                 └───────┬─────┬───────┘
                         │     │
                  cached data  │
                         │     │
                 ┌───────▼─┐   │
                 │Postgres │   │
                 └─────────┘   │
                               │
                    Client islands only
                               │
                  ┌────────────┼───────────┐
                  │            │           │
               Three.js      Gallery      Forms
```

---

# 117. Performance and Admin Separation

The public website should remain fast regardless of how complex the admin panel becomes.

Admin functionality should not leak unnecessary code into public bundles.

---

# 118. Performance and Future Growth

The architecture should support growth from:

```text
2026
First SML season
```

to:

```text
Multiple robots
Multiple competitions
Hundreds of gallery assets
Dozens of projects
Many articles
Alumni
Multiple teams/leagues
```

without requiring a complete rewrite.

---

# 119. Launch Performance Checklist

Before launch:

```text
□ Homepage loads without waiting for Three.js
□ 3D model is optimized
□ 3D is dynamically loaded
□ Mobile 3D is reduced
□ Static fallback exists
□ Images are optimized
□ Gallery uses thumbnails
□ Full images load on demand
□ YouTube iframes are lazy
□ Fonts are optimized
□ JavaScript is code-split
□ Database queries are selective
□ Database indexes exist
□ Public content is cached appropriately
□ Draft content is not publicly queried
□ No unnecessary third-party scripts
□ CLS is controlled
□ Reduced motion works
□ WebGL failure does not break the site
□ Slow network remains usable
□ Safari is tested
□ Mobile is tested
```

---

# 120. Final Performance Principle

The site should achieve its visual impact through:

> **Good design, real content, excellent 3D work, typography, composition, and restrained motion.**

Not by throwing increasingly expensive effects at the browser.

The ideal experience is:

```text
User opens site
       ↓
Content appears immediately
       ↓
User understands the team
       ↓
3D robot loads naturally
       ↓
Interaction feels smooth
       ↓
Images appear progressively
       ↓
Navigation feels instant
       ↓
Nothing feels heavy
```

**The visitor should notice the robotics — not the loading time.**

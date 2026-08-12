# `16_RESPONSIVE_DESIGN.md`

# Responsive Design Specification

## 1. Purpose

The robotics club website must be fully responsive across desktop, laptop, tablet, and mobile devices.

However, the primary design target is:

> **Laptop / desktop first, with mobile treated as a first-class experience—not a reduced desktop version.**

The website should preserve its premium, industrial, engineering-focused character at every viewport size.

---

# 2. Responsive Philosophy

The responsive system should follow:

```text
Desktop
   ↓
Tablet
   ↓
Mobile
```

but should **not** simply scale everything down.

Instead:

> Components should adapt their layout, hierarchy, spacing, typography, and interaction model according to available space.

---

# 3. Primary Target

The most important experience is:

```text
1366 × 768
1440 × 900
1536 × 864
1920 × 1080
```

The website should look particularly polished at these sizes.

---

# 4. Secondary Targets

The website must also work correctly at:

```text
1024 × 768
834 × 1194
768 × 1024
390 × 844
393 × 852
375 × 812
```

These are representative tablet and mobile dimensions rather than strict device requirements.

---

# 5. No Fixed Device Design

Do not design specifically around:

```text
iPhone 15
MacBook
iPad
```

or another individual device.

Use responsive breakpoints based on layout requirements.

---

# 6. Breakpoint Philosophy

Use a small number of meaningful breakpoints.

Avoid excessive breakpoints such as:

```text
1024
980
940
900
850
820
780
```

unless a genuine layout problem requires them.

---

# 7. Recommended Breakpoints

The initial system should use approximately:

```text
< 640px
Mobile

640–767px
Large mobile / small tablet

768–1023px
Tablet

1024–1279px
Small desktop

1280px+
Desktop
```

These values are starting points, not absolute requirements.

The implementation should allow components to use responsive behavior naturally.

---

# 8. Mobile-First CSS vs Design Priority

The codebase may use Tailwind's mobile-first breakpoint system.

However, the visual design priority remains:

> Desktop/laptop first.

This means:

- Desktop receives the most detailed composition.
- Mobile receives intentional restructuring.
- Mobile must never look like a broken desktop layout.

---

# 9. Container System

The website should use a consistent content container.

Conceptually:

```text
┌───────────────────────────────────────────┐
│              viewport                     │
│                                           │
│   ┌───────────────────────────────────┐   │
│   │          content container        │   │
│   │                                   │   │
│   └───────────────────────────────────┘   │
│                                           │
└───────────────────────────────────────────┘
```

---

# 10. Maximum Content Width

The primary content container should generally have a maximum width around:

```text
1200–1400px
```

depending on the section.

Do not allow text-heavy content to stretch across an entire 1920px screen.

---

# 11. Wide Screens

At very large resolutions:

```text
1920px+
```

the site should gain breathing room rather than simply increasing font sizes indefinitely.

---

# 12. Ultra-Wide Displays

At ultra-wide widths:

- Maintain a reasonable maximum container width.
- Preserve visual hierarchy.
- Avoid huge empty areas where possible.
- Do not stretch cards unnaturally.

---

# 13. Page Margins

Horizontal padding should adapt to viewport size.

Conceptually:

```text
Mobile:
16–20px

Tablet:
24–32px

Desktop:
32–48px
```

Exact values should follow the design system.

---

# 14. Safe Area

Mobile layouts must account for device safe areas where appropriate.

Especially for:

- Fixed navigation.
- Bottom actions.
- Full-screen dialogs.

Use safe-area insets where necessary.

---

# 15. Typography

Typography should scale responsively.

Do not simply use one fixed font size everywhere.

---

# 16. Display Typography

Hero headings can use responsive sizing.

Conceptually:

```text
Mobile:
large but compact

Tablet:
larger

Desktop:
large / cinematic
```

---

# 17. Hero Heading

The hero heading must remain visually dominant without consuming the entire mobile viewport.

Desktop:

```text
Large heading
+
Supporting copy
+
CTA
+
3D robot
```

Mobile:

```text
Heading
Supporting copy
CTA
3D robot/fallback
```

with the order intentionally optimized.

---

# 18. Text Line Length

Text should not become excessively wide on desktop.

Aim for readable line lengths for:

- Paragraphs.
- Blog posts.
- Project descriptions.
- Team biographies.

---

# 19. Responsive Hero

The hero is one of the most important responsive components.

Desktop layout:

```text
┌─────────────────────────────────────────────┐
│                                             │
│  CONTENT                  3D ROBOT          │
│                                             │
│  Heading                                    │
│  Description                                │
│  CTA                                         │
│                                             │
└─────────────────────────────────────────────┘
```

Mobile:

```text
┌───────────────────┐
│                   │
│      Heading      │
│                   │
│    Description    │
│                   │
│       CTA         │
│                   │
│     3D ROBOT      │
│                   │
└───────────────────┘
```

---

# 20. Hero 3D Robot

The Three.js robot must resize dynamically.

It must not:

- Overflow the viewport.
- Cover text.
- Cause horizontal scrolling.
- Push important CTAs below an unreasonable amount of whitespace.

---

# 21. 3D Robot Mobile Strategy

On mobile, the robot may:

- Become smaller.
- Move below the text.
- Use a simplified animation.
- Reduce interaction complexity.

The visual impact should remain.

---

# 22. WebGL Failure

If WebGL fails or is unavailable:

```text
3D robot
   ↓
Static fallback
```

The responsive layout must remain intact.

---

# 23. Navigation

Desktop navigation may contain:

```text
Logo
Navigation links
Language switcher
CTA
```

Mobile should transition to:

```text
Logo
Menu button
```

---

# 24. Mobile Navigation

The mobile navigation should use a dedicated interaction model.

Do not simply shrink the desktop navigation until links become unreadable.

---

# 25. Mobile Menu

The menu should provide access to:

- All important pages.
- Language switcher.
- Important CTA.
- Social links if appropriate.

---

# 26. Sticky Header

The header may remain sticky on desktop and mobile.

However, mobile sticky headers must not consume excessive vertical space.

---

# 27. Header Height

The mobile header should remain compact.

Avoid a large desktop-style header on phones.

---

# 28. Navigation Priority

If the desktop navigation contains many links, organize them logically rather than shrinking the typography.

---

# 29. CTA

The main CTA should remain easy to reach.

For example:

```text
Join the Team
```

or another primary action defined later.

---

# 30. Buttons

Desktop buttons can sit horizontally:

```text
[ Join the Team ] [ Explore Our Work ]
```

Mobile may use:

```text
[ Join the Team ]

[ Explore Our Work ]
```

if horizontal placement becomes cramped.

---

# 31. Touch Targets

Buttons and interactive controls should generally have at least approximately:

```text
44 × 44px
```

of touch target area.

---

# 32. Cards

Cards should adapt rather than simply shrink.

Desktop:

```text
┌───────┐ ┌───────┐ ┌───────┐
│       │ │       │ │       │
│ Card  │ │ Card  │ │ Card  │
│       │ │       │ │       │
└───────┘ └───────┘ └───────┘
```

Mobile:

```text
┌─────────────────┐
│                 │
│      Card       │
│                 │
└─────────────────┘

┌─────────────────┐
│                 │
│      Card       │
│                 │
└─────────────────┘
```

---

# 33. Card Grid

Recommended behavior:

```text
Desktop:
3–4 columns

Tablet:
2 columns

Mobile:
1 column
```

Exact behavior depends on content.

---

# 34. Team Members

Team member cards should adapt naturally.

Desktop:

```text
4 → 3 → 2 columns
```

depending on width.

Mobile:

```text
1 column
```

or a carefully designed two-column compact layout if the content remains readable.

---

# 35. Team Member Images

Images should maintain consistent aspect ratios.

Avoid distorted portraits.

---

# 36. Team Member Detail

Desktop profile:

```text
Photo | Name
      | Role
      | Bio
      | Skills
```

Mobile:

```text
Photo
Name
Role
Bio
Skills
```

---

# 37. Team Member Filters

If filtering by:

```text
Software
Hardware
Mechanical
Management
```

is implemented, the controls must wrap or become horizontally scrollable rather than overflow the viewport.

---

# 38. Projects

Projects should be visually prominent.

Desktop may use:

```text
Large feature project
+
secondary project grid
```

Mobile should stack them.

---

# 39. Project Detail

Desktop:

```text
Project title
Hero media
Description
Technology
Team
Results
Gallery
```

Mobile:

```text
Title
Media
Description
Technology
Team
Results
Gallery
```

The information hierarchy remains the same.

---

# 40. Technology Tags

Technology tags should wrap.

Never allow:

```text
ROS2 Python C++ YOLO SLAM LiDAR ...
```

to create horizontal page overflow.

---

# 41. Robots

The robots section should use a responsive visual hierarchy.

Desktop can emphasize large imagery.

Mobile should prioritize:

```text
Robot name
Purpose
Competition
Status
```

before secondary information.

---

# 42. Competitions

Competition cards should remain readable.

Information such as:

```text
Competition
Year
League
Result
```

should not be compressed into tiny typography.

---

# 43. Competition Results

Tables should be handled carefully on mobile.

Do not force a complex desktop table into a narrow screen.

---

# 44. Responsive Tables

For tables that cannot reasonably collapse:

```text
Horizontal scrolling
```

is acceptable.

The table must remain semantically a table.

---

# 45. Alternative Mobile Data Presentation

Where useful, complex result tables can transform into cards on mobile.

Example:

```text
Desktop:
Table

Mobile:
Result cards
```

This should only be done where semantic clarity remains intact.

---

# 46. Awards

Awards can use:

```text
Desktop:
Horizontal / grid layout

Mobile:
Stacked layout
```

---

# 47. Statistics

Team statistics should remain visually compelling.

Desktop:

```text
Large numbers
Charts
Visual metrics
```

Mobile:

```text
Large numbers
Compact metrics
Simplified visualizations
```

---

# 48. Statistics Accessibility

Statistics must not depend exclusively on charts.

Actual numeric values must remain available.

---

# 49. Sponsors

Sponsor showcase is an important premium section.

Desktop can use:

```text
Tier
↓
Logo grid
```

Mobile should maintain clear tier separation.

---

# 50. Sponsor Logos

Sponsor logos must:

- Scale proportionally.
- Remain recognizable.
- Avoid becoming tiny.
- Preserve appropriate whitespace.

---

# 51. Sponsor Tiers

Example:

```text
Gold
────────────

[ Logo ] [ Logo ]

Silver
────────────

[ Logo ] [ Logo ] [ Logo ]
```

On mobile:

```text
Gold

[ Logo ]
[ Logo ]

Silver

[ Logo ]
[ Logo ]
[ Logo ]
```

---

# 52. Gallery

Desktop gallery may use a masonry-like or structured grid.

Mobile should use a simpler grid.

Avoid overly complicated masonry layouts if they create unpredictable loading or accessibility problems.

---

# 53. Gallery Lightbox

The lightbox must fit within the viewport.

On mobile:

- Keep close control reachable.
- Prevent content from being cropped.
- Allow appropriate image scaling.
- Preserve captions.

---

# 54. Blog

Blog cards should adapt from:

```text
3 columns
```

to:

```text
2 columns
```

to:

```text
1 column
```

---

# 55. Blog Article

Blog content should prioritize readability.

On desktop, use a constrained reading width.

On mobile, use the available width with appropriate horizontal padding.

---

# 56. Code Blocks

Technical articles may contain code.

On mobile, code blocks should support horizontal scrolling rather than breaking the page.

---

# 57. Long URLs

Long URLs should wrap or scroll appropriately.

They must not create horizontal page overflow.

---

# 58. Contact Page

Desktop:

```text
Contact information | Contact form
```

Mobile:

```text
Contact information

Contact form
```

---

# 59. Contact Form

Inputs should generally use full available width on mobile.

Avoid tiny two-column fields where typing becomes difficult.

---

# 60. Join Team

The recruitment experience is important for potential members.

The form must be easy to complete on mobile.

---

# 61. File Upload on Mobile

Resume/file uploads should use the native mobile file picker.

Do not require desktop-only drag-and-drop.

---

# 62. Admin Panel

The admin panel should be responsive but does not need the same visual priority as the public website.

It should work on:

```text
Desktop
Tablet
Mobile
```

but desktop remains the primary admin experience.

---

# 63. Admin Tables

On small screens:

```text
Desktop table
      ↓
Scrollable table
```

or:

```text
Desktop table
      ↓
Responsive cards
```

depending on the dataset.

---

# 64. Admin Sidebar

Desktop:

```text
┌──────────┬───────────────────────┐
│ Sidebar  │ Content               │
│          │                       │
└──────────┴───────────────────────┘
```

Mobile:

```text
Header
Content
```

with the sidebar becoming a drawer/menu.

---

# 65. Admin Upload Interface

Desktop can use drag-and-drop.

Mobile must provide:

```text
Choose file
```

as a standard alternative.

---

# 66. Footer

Desktop footer may contain multiple columns.

Mobile should stack them logically.

---

# 67. Footer Social Links

Social links should remain easy to tap.

Avoid placing many tiny icons next to each other.

---

# 68. Footer Content

The footer should not become excessively tall on mobile.

Group links logically.

---

# 69. Responsive Spacing

Spacing should scale according to viewport.

Desktop can have larger section spacing.

Mobile should use reduced but still intentional spacing.

---

# 70. Section Spacing

Conceptually:

```text
Desktop:
96–140px

Tablet:
72–100px

Mobile:
56–80px
```

These are guidelines, not hardcoded values.

---

# 71. Visual Rhythm

Do not remove all whitespace on mobile.

The premium aesthetic depends partly on breathing room.

---

# 72. Responsive Borders

Decorative borders and separators should not create cramped layouts.

Use them selectively.

---

# 73. Background Effects

Industrial visual effects such as:

- Grid backgrounds.
- Glow.
- Noise.
- Lines.
- Gradients.

must scale appropriately.

---

# 74. Background Grid

The grid should not become so dense on mobile that it visually overwhelms content.

---

# 75. Decorative Elements

Decorative elements may be reduced or removed on mobile when they interfere with:

- Performance.
- Readability.
- Interaction.

---

# 76. Motion

Responsive layouts should respect:

```text
prefers-reduced-motion
```

as defined in `14_ACCESSIBILITY.md`.

---

# 77. Mobile Animation

Animations should generally be simpler on mobile.

The goal is:

> Preserve the feeling, not necessarily every animation.

---

# 78. 3D Performance

Three.js rendering should adapt to device capability.

Possible adaptations:

```text
Desktop:
Full-quality robot

Tablet:
Reduced complexity

Mobile:
Reduced rendering load

Weak device:
Static fallback
```

---

# 79. No Horizontal Scrolling

The normal page should not horizontally scroll.

Exceptions may include intentionally scrollable elements such as:

- Code blocks.
- Wide tables.
- Horizontal galleries.

---

# 80. Overflow Testing

Test for horizontal overflow at:

```text
320px
375px
390px
414px
768px
1024px
1280px
1440px
1920px
```

---

# 81. Mobile Width

The site should remain usable at approximately:

```text
320px
```

even if the primary mobile target is larger.

---

# 82. Orientation

Support both:

```text
Portrait
Landscape
```

on mobile/tablet where practical.

---

# 83. Landscape Mobile

Do not assume mobile always means portrait.

The navigation, hero, and 3D scene should remain usable in landscape.

---

# 84. Tablet

Tablet should not automatically use the mobile layout.

At intermediate widths, components should choose the layout that best fits the available space.

---

# 85. Tablet Navigation

Depending on width:

```text
Tablet:
Desktop navigation
```

or:

```text
Tablet:
Compact navigation
```

may be used.

Do not force a hamburger menu unnecessarily early.

---

# 86. Responsive Images

Images must use responsive sizing.

Avoid shipping a massive desktop image to a small mobile device when a smaller source is available.

---

# 87. Image Aspect Ratios

Use predictable aspect ratios for repeated media.

Examples:

```text
Team portraits
Project cards
Blog cards
Gallery
Sponsor logos
```

---

# 88. Object Fit

Use appropriate object fitting rather than distortion.

Typical behavior:

```text
Photos:
object-cover

Logos:
object-contain
```

---

# 89. Image Cropping

Important visual information such as:

- Faces.
- Robots.
- Logos.

must not be accidentally cropped at smaller sizes.

---

# 90. Typography and Persian

Persian typography must remain readable at all widths.

RTL layout should not cause:

- Broken line wrapping.
- Misaligned punctuation.
- Incorrect icon placement.

---

# 91. Persian Hero

The Persian hero may require different line breaks than English.

Do not force identical line lengths between languages.

---

# 92. Language-Aware Layout

The layout must accommodate text expansion/contraction.

English and Persian content will not always have the same length.

---

# 93. Navigation Translation

Do not assume that an English navigation item and its Persian equivalent have the same width.

The navigation must adapt dynamically.

---

# 94. Buttons in Persian

Buttons must grow naturally based on text.

Never use fixed widths solely because the English version fits.

---

# 95. Date Formatting

Dates should adapt to the selected language.

Persian may use Persian calendar formatting if that is the chosen product behavior.

English should use the English date format defined in the internationalization specification.

---

# 96. Numbers and Statistics

Numbers must remain visually stable when switching languages.

---

# 97. Responsive SEO

Responsive layouts must not hide important content from mobile users.

Do not create separate mobile-only content versions unless absolutely necessary.

---

# 98. Responsive URLs

Responsive behavior should not require separate mobile URLs.

Use the same canonical page.

---

# 99. Responsive Metadata

Metadata should remain valid regardless of viewport.

---

# 100. Mobile SEO

The mobile version must contain the same important:

- Titles.
- Headings.
- Content.
- Structured data.

as the desktop version.

---

# 101. Performance

Responsive behavior should also optimize performance.

Mobile devices should not unnecessarily download:

- Huge images.
- High-resolution videos.
- Heavy 3D assets.

---

# 102. Lazy Loading

Non-critical images should use appropriate lazy-loading behavior.

Do not lazy-load the primary hero image/visual if it causes unnecessary LCP delays.

---

# 103. 3D Loading

The 3D robot should not block the page from becoming usable.

The textual hero should become usable immediately.

---

# 104. Mobile Network Conditions

The website should remain useful under slower connections.

Design should account for:

```text
4G
3G
High latency
Low bandwidth
```

where practical.

---

# 105. Responsive Loading States

Loading states should preserve layout dimensions where possible.

Avoid large layout shifts when:

- Images load.
- 3D initializes.
- Fonts load.
- Gallery content appears.

---

# 106. Fixed Bottom UI

Avoid unnecessary fixed bottom bars.

If a fixed mobile CTA is ever introduced, it must not cover:

- Content.
- Form controls.
- Navigation.
- Focused elements.

---

# 107. Safe Interaction Zones

Mobile controls should not be positioned too close to screen edges when that harms usability.

---

# 108. Hover

Do not rely on hover behavior for mobile.

Any information revealed on hover must have another accessible interaction.

---

# 109. Desktop Hover Effects

Desktop may use sophisticated hover interactions for:

- Project cards.
- Team cards.
- Sponsor logos.
- Navigation.
- Buttons.

But the base content must remain accessible without hover.

---

# 110. Responsive Cursor Effects

Custom cursor effects, if introduced, should:

- Be disabled on touch devices.
- Not interfere with interaction.
- Not become a performance burden.

---

# 111. Responsive Cursor

The default system cursor should remain available.

Do not replace it with an effect that reduces usability.

---

# 112. Motion Performance

Animations should use performant properties such as:

```text
transform
opacity
```

where possible.

Avoid expensive layout-triggering animations.

---

# 113. Responsive Component Architecture

Components should be responsible for their own responsive behavior where appropriate.

Avoid putting all responsive logic into one enormous global component.

---

# 114. CSS Over JavaScript

Prefer CSS media queries for purely visual responsive behavior.

Avoid JavaScript such as:

```text id="8n0lzn"
if (window.innerWidth < 768)
```

when CSS can solve the problem.

---

# 115. JavaScript Responsive Logic

JavaScript should only determine responsive behavior when the actual behavior depends on runtime capability rather than presentation.

Examples:

```text id="5eqwq5"
WebGL capability
Device capability
Touch interaction
```

---

# 116. Container Queries

Container queries may be used for reusable components where appropriate.

They are especially useful for:

- Cards.
- Admin widgets.
- Dashboard components.

---

# 117. Component Independence

A component should not assume that its parent always provides a specific width.

Components should behave correctly when placed in different layouts.

---

# 118. Responsive Grid

Use CSS Grid/Flexbox rather than manually positioned elements.

Avoid:

```text id="2g6r4q"
absolute positioning
```

for core responsive layout.

Absolute positioning is appropriate for decorative elements and specific overlays.

---

# 119. Responsive Hero Composition

The hero should use a flexible layout system.

Avoid manually positioning the robot with fixed coordinates for each screen size.

---

# 120. Responsive Navigation Composition

Navigation should use layout primitives rather than hardcoded pixel positions.

---

# 121. Responsive Gallery

Gallery layout should be based on flexible columns and available space.

---

# 122. Responsive Sponsor Grid

Sponsor logo grids should automatically adapt to available width.

---

# 123. Responsive Footer

Footer columns should collapse naturally.

---

# 124. Responsive Forms

Forms should use:

```text
grid-template-columns
flex-wrap
```

or equivalent responsive techniques.

---

# 125. Input Width

Inputs should never extend beyond their parent container.

Use:

```text
max-width: 100%
```

or equivalent layout constraints.

---

# 126. Long Content

The layout must handle unexpectedly long:

- Team member names.
- Sponsor names.
- Project titles.
- Competition names.
- Persian text.

without breaking.

---

# 127. Long Names

Do not truncate important names merely to preserve a fixed card height.

Allow controlled expansion.

---

# 128. Long Sponsor Names

Sponsor logos should be treated as visual assets rather than text where possible.

---

# 129. Long Project Titles

Cards should accommodate longer project names without:

- Overflow.
- Cropping.
- Invisible text.

---

# 130. Empty Content

Responsive components should handle missing optional content gracefully.

For example:

```text
No image
No GitHub
No awards
No description
```

must not leave broken visual gaps.

---

# 131. Content Density

Desktop can have richer information density.

Mobile should prioritize:

```text
Primary information
↓
Secondary information
↓
Optional information
```

rather than displaying everything at equal visual weight.

---

# 132. Progressive Disclosure

Mobile may use:

- Accordions.
- Expandable sections.
- Tabs.

where they genuinely improve usability.

Do not hide important information simply to make the page shorter.

---

# 133. Tabs

If tabs are used:

- They must be keyboard accessible.
- Active state must be clear.
- Content must remain discoverable.

---

# 134. Accordions

Accordions may be useful for:

- FAQ.
- Technical specifications.
- Secondary project information.

They should not hide the core story of a page.

---

# 135. Mobile Page Hierarchy

On mobile, every page should clearly answer:

```text
What is this?
Why does it matter?
What can I do next?
```

---

# 136. Responsive Home Page

The home page should prioritize:

```text
1. Team identity
2. What we do
3. Current robotics work
4. Competition / current focus
5. Team
6. Projects
7. Results / achievements
8. Sponsors / partners
9. Community / education
10. CTA
```

Exact section ordering may be refined during implementation.

---

# 137. Mobile Home Page

The mobile homepage should preserve the same story but reduce simultaneous visual complexity.

---

# 138. Responsive About Page

About content should prioritize:

```text
Team
Mission
IUST relationship
Engineering focus
Competition focus
Community
```

---

# 139. Responsive Projects Page

Projects should be easy to browse using:

```text
Cards
Filters
Categories
```

without requiring complex desktop interactions.

---

# 140. Responsive Competition Page

Competition information should be easy to scan.

The most important result should be visually obvious.

---

# 141. Responsive Team Page

The team page should make browsing members effortless on mobile.

Filters should remain usable without taking excessive vertical space.

---

# 142. Responsive Gallery Page

The gallery should prioritize visual content.

Avoid excessive UI surrounding each image.

---

# 143. Responsive Blog

Blog cards should prioritize:

```text
Image
Title
Category
Date
Short summary
```

depending on the final content model.

---

# 144. Responsive Contact

Contact information should remain visible without forcing excessive scrolling before reaching the form.

---

# 145. Responsive Join Team

The Join Team CTA should remain highly visible throughout the site where appropriate.

---

# 146. Responsive Admin Dashboard

Dashboard cards should collapse into a readable layout.

Avoid a desktop dashboard with tiny cards on mobile.

---

# 147. Admin Mobile Priority

On mobile admin:

```text
Navigation
↓
Important statistics
↓
Recent content
↓
Management actions
```

should remain clear.

---

# 148. Responsive Modals

Dialogs should adapt to viewport size.

Desktop:

```text
Centered modal
```

Mobile:

```text
Near-full-screen dialog
```

when appropriate.

---

# 149. Responsive Lightbox

The lightbox should use almost the full viewport on mobile while preserving:

- Close control.
- Image.
- Caption.
- Navigation.

---

# 150. Responsive Cookie/Consent UI

If a consent mechanism is required, it must not cover the entire mobile screen unnecessarily.

---

# 151. Responsive Toasts

Toastify notifications should:

- Fit the viewport.
- Avoid covering important controls.
- Respect safe areas.
- Remain readable on mobile.

---

# 152. Browser Chrome

Do not assume the viewport height equals the physical screen height.

Use modern viewport units carefully.

Where appropriate:

```text id="8jqh4b"
dvh
svh
lvh
```

should be considered instead of relying exclusively on `100vh`.

---

# 153. Hero Height

Avoid:

```text
height: 100vh
```

as an inflexible rule.

Mobile browser UI can make traditional `100vh` problematic.

---

# 154. Minimum Viewport Height

The hero should remain usable on short screens such as:

```text id="qf3o0c"
1366 × 600
```

and mobile landscape.

---

# 155. Responsive Accessibility

All responsive layouts must continue to satisfy:

> `14_ACCESSIBILITY.md`

especially:

- Keyboard navigation.
- Focus visibility.
- Touch targets.
- Reduced motion.
- Zoom.
- RTL/LTR.

---

# 156. Responsive Security

Responsive changes must not create different authorization behavior.

The same server-side permissions apply regardless of device.

---

# 157. Responsive Content

Do not maintain separate manually duplicated desktop/mobile content unless absolutely necessary.

One content source should power both layouts.

---

# 158. Responsive Images and CMS

Admin-uploaded media should support responsive variants where practical.

The admin should upload the source image; the application should generate appropriate display variants.

---

# 159. Image Processing

Jimp should be used for required image processing.

Do not introduce Sharp.

---

# 160. Responsive Media Strategy

For a typical gallery image:

```text
Original
   ↓
Jimp
   ├── Thumbnail
   ├── Medium
   └── Large
```

The frontend can then select an appropriate size.

---

# 161. Responsive Video

Videos should not force desktop dimensions on mobile.

Use responsive aspect-ratio containers.

---

# 162. YouTube

YouTube embeds should use a responsive aspect ratio.

They should never create horizontal overflow.

---

# 163. Responsive 3D Canvas

The canvas should resize based on its container rather than using a fixed global resolution.

---

# 164. Device Pixel Ratio

Three.js rendering should account for device pixel ratio.

Do not blindly render extremely high pixel densities on mobile.

Cap rendering resolution where necessary for performance.

---

# 165. WebGL Memory

The application should avoid loading unnecessary 3D assets on small devices.

---

# 166. Responsive Performance Budget

Mobile should receive special attention to:

```text
JavaScript
Images
3D
Fonts
Animations
Third-party scripts
```

---

# 167. Testing Matrix

Before launch, test the website on at least:

### Desktop

```text
1366 × 768
1440 × 900
1920 × 1080
```

### Tablet

```text
768 × 1024
1024 × 768
```

### Mobile

```text
320 × 568
375 × 812
390 × 844
414 × 896
```

---

# 168. Browser Testing

Test representative combinations:

```text
Chrome
Safari
Firefox
Edge
```

with particular attention to:

> Safari on macOS and iOS.

---

# 169. Responsive Regression

Every major component change should be checked at:

```text
Mobile
Tablet
Desktop
```

before merging.

---

# 170. Common Responsive Bugs to Avoid

The implementation must specifically guard against:

```text
□ Horizontal overflow
□ Text clipping
□ Broken RTL
□ Giant hero on mobile
□ Tiny buttons
□ Navigation overflow
□ 3D canvas overflow
□ Broken tables
□ Oversized images
□ Cropped faces
□ Sponsor logos distorted
□ Modal overflow
□ Toast overflow
□ Footer overflow
□ Long URLs breaking layout
□ Long Persian text breaking layout
□ Fixed elements covering content
```

---

# 171. Responsive Quality Standard

The website should not merely pass a "mobile responsive" check.

The mobile version should feel deliberately designed.

A user should never think:

> "This is the desktop site squeezed into a phone."

Instead:

> **"This feels like the same robotics club website, intelligently adapted to my device."**

---

# 172. Final Responsive Principle

The final responsive hierarchy is:

```text
                 ROBOTICS CLUB
                       │
             ┌─────────┴─────────┐
             │                   │
          Desktop              Mobile
             │                   │
      More visual depth     More focused
      Larger 3D scene       Simplified 3D
      Multi-column          Stacked layouts
      Rich interactions     Touch-first
             │                   │
             └─────────┬─────────┘
                       │
                Same identity
                Same content
                Same quality
```

The responsive implementation should preserve the site's core character:

> **Industrial. Technical. Premium. Human.**

while ensuring that **every important experience works perfectly from a large laptop down to a small mobile screen.**

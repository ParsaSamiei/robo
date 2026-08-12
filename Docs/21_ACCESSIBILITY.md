# `14_ACCESSIBILITY.md`

# Accessibility Specification

## 1. Purpose

This document defines the accessibility requirements for the robotics club website.

The website should be visually distinctive and technically sophisticated without becoming difficult to use.

The goal is:

> **A premium robotics website that remains usable for everyone.**

Accessibility is not an optional enhancement.

It is part of the core product.

---

# 2. Accessibility Target

The website should aim for:

> **WCAG 2.2 AA**

as the primary accessibility target.

Not every visual effect needs to be removed to achieve this.

The implementation should instead provide accessible alternatives and ensure that visual sophistication does not interfere with usability.

---

# 3. Accessibility Principles

The website should follow the four core accessibility principles:

```text
Perceivable
Operable
Understandable
Robust
```

---

# 4. Perceivable

Users must be able to perceive important information regardless of:

- Screen size.
- Color vision.
- Vision level.
- Motion sensitivity.
- Audio availability.

---

# 5. Operable

Everything important must be usable with:

- Mouse.
- Keyboard.
- Touch.
- Assistive technologies.

---

# 6. Understandable

The interface should:

- Behave predictably.
- Use consistent controls.
- Explain errors.
- Provide clear labels.

---

# 7. Robust

The website should work with:

- Modern browsers.
- Screen readers.
- Keyboard navigation.
- Browser zoom.
- Assistive technologies.

---

# 8. Language Support

The website supports:

```text
English
Persian
```

with English as the preferred language.

The application must correctly expose the active language to assistive technologies.

The `<html>` element should reflect the active language.

Conceptually:

```text
English:
<html lang="en" dir="ltr">

Persian:
<html lang="fa" dir="rtl">
```

---

# 9. RTL Accessibility

Persian must use true RTL layout.

Do not simulate RTL simply by flipping individual components.

The document direction should be set appropriately.

---

# 10. Mixed-Language Content

The site will naturally contain English technical terms inside Persian content.

Examples:

```text
ROS 2
Python
C++
SLAM
LiDAR
YOLO
Jetson
SolidWorks
Altium Designer
```

These should remain readable when embedded inside RTL content.

Use appropriate directional isolation where necessary.

---

# 11. Directional Isolation

Dynamic technical values should not unexpectedly reorder Persian text.

Use appropriate HTML techniques such as:

```text
<bdi>
```

or:

```text
dir="ltr"
```

where appropriate.

---

# 12. Semantic HTML

Use semantic elements wherever possible:

```text
<header>
<nav>
<main>
<section>
<article>
<aside>
<footer>
<button>
<form>
<label>
```

Do not use:

```text
<div onClick="">
```

as a replacement for a button.

---

# 13. Heading Hierarchy

Every meaningful page should have a logical heading structure.

Example:

```text
H1
 ├── H2
 │    ├── H3
 │    └── H3
 └── H2
```

Do not skip heading levels purely for visual styling.

---

# 14. One Primary H1

Important pages should generally have one clear primary heading.

For example:

```text
Our Robotics Club
```

rather than several unrelated H1 elements.

---

# 15. Navigation

The primary navigation must be keyboard accessible.

Users should be able to:

```text
Tab
↓
Navigate
↓
Enter
↓
Open page
```

without a mouse.

---

# 16. Navigation Landmark

The primary navigation should use:

```text
<nav>
```

and have an accessible name if multiple navigation landmarks exist.

---

# 17. Skip Link

Provide a skip link such as:

> Skip to main content

It should become visible when focused.

Conceptually:

```text
Keyboard user
↓
Tab
↓
Skip to main content
↓
Enter
```

This prevents users from repeatedly navigating through the entire header.

---

# 18. Header

The header must remain accessible regardless of:

- Language.
- Screen size.
- Sticky behavior.
- Animation.

---

# 19. Mobile Navigation

The mobile navigation menu must be fully keyboard accessible.

The menu button must have an accessible name.

For example:

```text
Open menu
```

and when open:

```text
Close menu
```

---

# 20. Mobile Menu State

The menu trigger should expose its state appropriately.

Conceptually:

```text
aria-expanded="true"
```

when open.

---

# 21. Focus Management

When a modal or mobile menu opens, focus should move appropriately.

When it closes, focus should return to the triggering element.

---

# 22. Keyboard Navigation

All interactive elements must be reachable with the keyboard.

This includes:

- Links.
- Buttons.
- Dropdowns.
- Gallery.
- Lightbox.
- Forms.
- Admin controls.
- 3D controls where applicable.

---

# 23. Focus Visibility

Keyboard focus must always be visible.

Do not remove:

```text
outline
```

without providing an equally visible replacement.

The focus indicator should be consistent with the visual identity.

---

# 24. Focus Contrast

Focus indicators must have sufficient contrast against their surroundings.

This is particularly important for the dark theme.

---

# 25. Focus Order

Keyboard focus order should follow the logical visual/content order.

Avoid CSS layouts that create confusing focus sequences.

---

# 26. No Keyboard Traps

Users must never become trapped inside:

- Modal.
- Lightbox.
- Mobile menu.
- Dropdown.
- Form.

except where a modal intentionally manages focus and provides an accessible escape path.

---

# 27. Escape Key

Closable overlays should generally support:

```text
Escape
```

to close them.

Examples:

- Gallery lightbox.
- Mobile navigation.
- Dialogs.

---

# 28. Buttons vs Links

Use:

```text
<a>
```

for navigation.

Use:

```text
<button>
```

for actions.

Do not use links as fake buttons or buttons as fake links.

---

# 29. Accessible Names

Every interactive control must have a meaningful accessible name.

Bad:

```text
<button>
  <Icon />
</button>
```

Good:

```text
<button aria-label="Open navigation">
```

---

# 30. Icon-Only Buttons

Icon-only controls must have accessible labels.

Examples:

```text
Open menu
Close menu
Next image
Previous image
Play video
Close gallery
Change language
```

---

# 31. Tooltips

Tooltips must not be the only source of important information.

If a button needs an accessible name, provide it through semantic labeling.

---

# 32. Color

Color must never be the only way information is communicated.

Bad:

> Green = passed
> Red = failed

without another indicator.

Better:

```text
✓ Passed
✕ Failed
```

with color as an additional signal.

---

# 33. Contrast

Text and important UI elements must have sufficient contrast.

The design is intentionally dark, so contrast must be tested rather than estimated visually.

---

# 34. Accent Color

The robotics/industrial accent color must remain readable against:

- Dark backgrounds.
- Light surfaces.
- Images.
- Hover states.
- Focus states.

---

# 35. Dark Mode

Dark mode is the preferred appearance.

The interface should not rely on extremely subtle shades that become indistinguishable for users with low vision.

---

# 36. Light Mode

If light mode is supported, the same accessibility requirements apply.

Do not treat light mode as an afterthought.

---

# 37. Text Resizing

The website should remain usable when text is increased substantially.

Content should not:

- Overlap.
- Become clipped.
- Become inaccessible.
- Disappear behind fixed elements.

---

# 38. Browser Zoom

The website should support browser zoom.

Test at:

```text
100%
125%
150%
200%
```

and where practical beyond that.

---

# 39. Responsive Accessibility

Accessibility must work across:

```text
Desktop
Laptop
Tablet
Mobile
```

The mobile layout should not remove important information or functionality.

---

# 40. Touch Targets

Interactive controls should have sufficiently large touch targets.

Target approximately:

> **44 × 44 CSS pixels**

where practical.

---

# 41. Spacing

Controls should have enough spacing to prevent accidental activation.

This is especially important for:

- Mobile navigation.
- Gallery controls.
- Social links.
- Form controls.

---

# 42. Three.js Accessibility

The interactive robot is a visual enhancement.

It must never be the only way to understand the page.

---

# 43. Three.js Fallback

If WebGL is unavailable, disabled, or fails:

```text
3D robot
   ↓
Static image / fallback
```

The hero content remains fully usable.

---

# 44. 3D Canvas

The canvas should not become an inaccessible black box.

Provide an accessible description or surrounding text explaining the visual.

For example:

> Interactive 3D visualization of an industrial robot.

---

# 45. 3D Controls

If the user can interact with the robot, keyboard and/or non-pointer alternatives should be provided where the interaction is meaningful.

Do not make critical information dependent on rotating the robot.

---

# 46. Decorative 3D

If the robot is purely decorative:

```text
aria-hidden="true"
```

may be appropriate.

Do not expose decorative animation as a confusing interactive element.

---

# 47. Reduced Motion

Respect:

```text
prefers-reduced-motion: reduce
```

---

# 48. Reduced Motion Behavior

When reduced motion is enabled:

```text
Hero animation → minimized
3D rotation → stopped/reduced
Scroll animations → removed/reduced
Parallax → disabled
Decorative movement → minimized
```

The page should remain visually coherent.

---

# 49. No Essential Information in Motion

Never put essential information exclusively inside an animation.

A user should not need to wait for an animation to discover:

- Team name.
- Main CTA.
- Competition.
- Important announcement.

---

# 50. Auto-Playing Content

Avoid automatically moving content that users cannot easily stop.

Examples:

- Carousels.
- Videos.
- Continuous marquee text.

---

# 51. Carousels

If a carousel is used:

- Provide previous/next controls.
- Provide accessible labels.
- Allow keyboard navigation.
- Do not rotate too quickly.
- Provide a pause mechanism if it auto-advances.

---

# 52. Gallery

The gallery must be accessible.

Users should be able to:

- Navigate images.
- Open an image.
- Close the lightbox.
- Move between images.
- Understand which image is displayed.

---

# 53. Gallery Alt Text

Every meaningful image should have descriptive alt text.

Example:

> Robotics team testing the autonomous mobile robot during SML preparation.

Avoid:

> image123.jpg

---

# 54. Decorative Images

Purely decorative images should use:

```text
alt=""
```

rather than unnecessary descriptions.

---

# 55. Image Captions

Important contextual information should not be placed only inside the image.

Use visible captions where appropriate.

---

# 56. Team Member Photos

Member images should have useful alt text.

Example:

> Parsa Samiei — Software and Robotics Engineer

if that information is appropriate and publicly displayed.

---

# 57. Sponsor Logos

Sponsor logos should have meaningful accessible names.

Example:

```text
alt="Company Name"
```

If the logo is a link, the accessible name should clearly communicate the destination.

---

# 58. Video Accessibility

YouTube videos should retain YouTube's accessibility controls where available.

Do not remove captions or playback controls.

---

# 59. Video Context

Every embedded video should have contextual information.

The user should understand:

- What the video is.
- Why it is relevant.

---

# 60. Audio

Do not use audio as the only way to communicate important information.

Autoplaying audio should be avoided.

---

# 61. Forms

Forms must have:

- Labels.
- Clear instructions.
- Error messages.
- Required field indication.
- Keyboard accessibility.

---

# 62. Form Labels

Every input must have a proper label.

Avoid relying on placeholder text as the only label.

Bad:

```text
<input placeholder="Email">
```

Good:

```text
<label>Email</label>
<input ...>
```

---

# 63. Placeholder Text

Placeholders should be hints, not replacements for labels.

---

# 64. Required Fields

Required fields should be clearly identified.

Do not rely solely on:

```text
*
```

without explaining what it means.

---

# 65. Form Validation

Validation should be understandable.

Bad:

> Invalid input.

Better:

> Please enter a valid email address.

---

# 66. Error Placement

Errors should appear close to the relevant field.

Where appropriate, associate the error using:

```text
aria-describedby
```

---

# 67. Error Summary

Long forms should provide a useful error summary where appropriate.

The user should be able to identify what needs fixing quickly.

---

# 68. Form Submission

When a form is submitted:

```text
Submitting...
```

should be communicated appropriately.

Do not allow multiple accidental submissions.

---

# 69. Toastify

React Toastify is planned for notifications.

Toasts must be accessible.

They should:

- Be announced appropriately.
- Not contain critical information that disappears too quickly.
- Not trap focus.
- Remain readable.

---

# 70. Toast Duration

Critical messages should remain visible long enough to be understood.

Avoid extremely short durations.

---

# 71. Toast vs Inline Errors

Do not use a toast as the only way to communicate a form validation error.

Important errors should remain associated with the relevant content.

---

# 72. Contact Form

The Contact page should remain usable without a mouse.

Fields should have:

- Labels.
- Logical tab order.
- Clear errors.
- Submission status.

---

# 73. Join Team Form

The recruitment form is particularly important.

It should support:

- Keyboard input.
- Screen readers.
- File upload where applicable.
- Clear instructions.
- Validation.
- Submission feedback.

---

# 74. File Uploads

If applicants upload resumes or other files:

- Clearly state accepted formats.
- Clearly state maximum size.
- Provide accessible upload controls.
- Show upload status.
- Explain errors.

---

# 75. Admin Panel Accessibility

The admin panel is English-only but should still be accessible.

It must support:

- Keyboard navigation.
- Labels.
- Focus states.
- Accessible tables.
- Accessible upload controls.
- Accessible dialogs.

---

# 76. Tables

If tables are used for:

- Competition results.
- Team statistics.
- Admin records.

they should use proper table semantics.

---

# 77. Data Tables

Tables should have:

```text
<thead>
<tbody>
<th>
```

and appropriate scope relationships where needed.

---

# 78. Competition Results

Competition results should not depend solely on color or position.

For example:

```text
1st — Qualified
2nd — Qualified
```

is preferable to simply coloring rows green.

---

# 79. Tooltips and Hover

Important functionality must not depend solely on hover.

Mobile users and keyboard users may not have hover.

---

# 80. Hover Effects

Hover effects can remain part of the premium design.

They must not:

- Hide essential information.
- Cause layout shifts.
- Replace focus states.

---

# 81. Focus and Hover

Interactive elements should have both:

```text
:hover
:focus-visible
```

states.

Keyboard focus should receive an equally polished treatment.

---

# 82. Links

Links should be distinguishable from surrounding text.

Do not rely entirely on color.

---

# 83. External Links

External links should clearly communicate when the user is leaving the site where appropriate.

Examples:

- Sponsor website.
- GitHub.
- YouTube.
- LinkedIn.
- Instagram.

---

# 84. Social Icons

Social media icons must have accessible names.

For example:

```text
GitHub
LinkedIn
YouTube
Instagram
Telegram
```

not merely:

```text
Icon
```

---

# 85. Search

If site search is implemented later:

- Search input must have a label.
- Results must be keyboard accessible.
- Empty states must be clear.
- Search results should not rely on color.

---

# 86. Loading States

Dynamic content must expose useful loading information to assistive technologies where appropriate.

Avoid making screen readers repeatedly announce every small loading change.

---

# 87. Skeletons

Skeleton loaders should generally be hidden from screen readers when they provide no meaningful information.

The actual content should be announced when available.

---

# 88. Modals

Modals must:

- Have an accessible name.
- Manage focus.
- Prevent background interaction while open.
- Close appropriately.
- Return focus to the trigger.

---

# 89. Lightbox

The gallery lightbox should behave as an accessible dialog.

It should expose:

```text
Image title/caption
Current position
Close
Previous
Next
```

where appropriate.

---

# 90. Dropdowns

Navigation dropdowns must be usable through:

- Mouse.
- Keyboard.
- Touch.

Do not implement a dropdown that works only on hover.

---

# 91. Language Switcher

The language selector must clearly indicate:

```text
English
فارسی
```

and the currently selected language.

The control must be keyboard accessible.

---

# 92. Language Switching

Switching language should preserve the user's current page where possible.

For example:

```text
/projects/autonomous-navigation
```

English → Persian should remain on the corresponding project page.

---

# 93. Direction Switching

Switching between English and Persian should correctly update:

- `dir`.
- `lang`.
- Layout.
- Alignment.
- Navigation.
- Form direction where appropriate.

---

# 94. Icons and Direction

Directional icons should adapt where necessary.

For example:

```text
← Back
```

may need to become:

```text
→ بازگشت
```

depending on the semantic direction.

---

# 95. Numbers

Technical numbers, rankings, dates, and measurements should remain readable in both languages.

Do not allow RTL rendering to scramble technical values.

---

# 96. Technical Code

Code snippets must be displayed using appropriate LTR direction.

For example:

```text
const robot = new Robot();
```

should not be visually reordered by RTL.

---

# 97. Code Blocks

Code blocks should:

- Have readable contrast.
- Allow horizontal scrolling where needed.
- Not overflow the viewport.
- Preserve indentation.

---

# 98. Long Technical Content

Technical articles must remain readable when they contain:

- Code.
- URLs.
- File paths.
- Commands.
- Mathematical notation.
- English terminology.

---

# 99. Content Zoom

Content must not become unusable when zoomed.

Particular attention should be paid to:

- Navigation.
- Hero.
- Three.js canvas.
- Tables.
- Gallery.
- Forms.

---

# 100. Fixed Elements

Sticky navigation and floating elements must not cover focused content.

When an element receives focus, the browser should be able to scroll it into a visible area.

---

# 101. Scroll Behavior

Smooth scrolling should not interfere with accessibility.

Respect reduced-motion preferences.

---

# 102. Auto-Hiding Navigation

If the header hides while scrolling, it must not unexpectedly disappear when a keyboard user is navigating.

Prefer predictable behavior.

---

# 103. Contrast Testing

Contrast should be tested with automated tools and manually reviewed.

Important combinations include:

```text
Dark background + primary text
Dark background + secondary text
Accent + dark
Accent + light
Button + button text
Focus ring + background
```

---

# 104. Automated Testing

Use automated accessibility testing during development.

Potential tools:

- axe.
- Lighthouse accessibility checks.
- eslint accessibility rules.

Automated tools do not replace manual testing.

---

# 105. Manual Keyboard Test

A complete keyboard-only pass should verify:

```text
Tab
Shift + Tab
Enter
Space
Escape
Arrow keys where applicable
```

---

# 106. Screen Reader Testing

At least one screen reader should be tested.

Recommended environments include:

```text
macOS:
VoiceOver

Windows:
NVDA
```

The site should remain understandable when visual information is removed.

---

# 107. Safari + VoiceOver

Because the site is intended to work well on Apple laptops, specifically test:

> Safari + VoiceOver

for:

- Navigation.
- Forms.
- Gallery.
- Modals.
- Language switcher.

---

# 108. Mobile Screen Readers

Test mobile accessibility with:

```text
iOS VoiceOver
Android TalkBack
```

where practical.

---

# 109. Screen Reader Content

Do not add excessive ARIA labels everywhere.

Native HTML semantics should be preferred.

Use ARIA when it solves a real semantic problem.

---

# 110. ARIA Rule

The implementation should follow:

> **No ARIA is better than incorrect ARIA.**

Do not add:

```text
aria-label
aria-hidden
role
```

without understanding their effect.

---

# 111. Decorative Elements

Decorative visual elements should generally be hidden from assistive technology.

Examples:

- Background particles.
- Decorative lines.
- Glow effects.
- Non-informative 3D elements.

---

# 112. Meaningful Visual Elements

Important visuals must have equivalent textual information.

Examples:

```text
Competition result chart
↓
Textual result summary

Team statistics visualization
↓
Accessible numeric values
```

---

# 113. Team Statistics

The statistics section should not communicate information exclusively through:

- Bars.
- Circles.
- Animation.
- Color.

Provide actual numbers/text.

---

# 114. Awards

Awards should have readable text.

Do not make an award recognizable only through an icon or trophy graphic.

---

# 115. Sponsor Showcase

Sponsor tiers may use visual hierarchy, but sponsor importance should not be communicated only through:

- Size.
- Color.
- Animation.

Textual labels such as:

```text
Gold Sponsor
Silver Sponsor
Partner
```

should be available.

---

# 116. Empty States

Empty states should be understandable.

Example:

> No competition results have been published yet.

rather than:

> —

---

# 117. Error Pages

404 and error pages must remain accessible.

They should contain:

- Clear heading.
- Explanation.
- Navigation back to useful content.

---

# 118. Authentication

Admin login must have:

- Proper labels.
- Error messages.
- Password visibility control where provided.
- Keyboard accessibility.

---

# 119. Password Controls

If a password visibility toggle exists, it must have an accessible label such as:

```text
Show password
Hide password
```

---

# 120. Accessibility of Uploaded Content

Admin-uploaded content must follow the same accessibility rules.

Admins should be able to provide:

- Alt text.
- Captions.
- Descriptions.

for relevant media.

---

# 121. Media Admin UX

When uploading an image, the admin interface should encourage meaningful metadata.

Example:

```text
Image
Alt text
Caption
Description
```

Alt text should not automatically be the filename.

---

# 122. Content Accessibility Guidelines for Admins

The admin panel should remind content creators:

> Describe what is meaningful about the image, not simply what the image is called.

Example:

Bad:

> robot.jpg

Better:

> Team members testing the mobile robot during SML navigation trials.

---

# 123. Accessibility and Premium Design

The design should remain:

```text
Dark
Industrial
Premium
Technical
Minimal
```

while maintaining:

```text
High contrast
Clear hierarchy
Visible focus
Readable typography
Predictable interaction
```

Accessibility should not make the site visually generic.

---

# 124. Avoid Accessibility Theater

Do not add accessibility features that technically exist but are practically unusable.

Examples:

```text
Tiny focus ring
Unreadable alt text
Keyboard navigation with broken focus
"Skip link" hidden permanently
```

Accessibility should be experienced, not merely checked.

---

# 125. Accessibility Testing Checklist

Before launch:

```text
□ WCAG 2.2 AA reviewed
□ Keyboard-only navigation works
□ Skip link works
□ Focus states visible
□ No keyboard traps
□ Mobile menu accessible
□ Modals manage focus
□ Lightbox manages focus
□ Forms have labels
□ Form errors are accessible
□ Toast notifications are accessible
□ Images have appropriate alt text
□ Decorative images are ignored
□ Videos are usable
□ 3D has a fallback
□ 3D does not contain essential information
□ Reduced motion works
□ Dark mode contrast tested
□ Light mode contrast tested
□ 200% zoom tested
□ RTL tested
□ LTR tested
□ VoiceOver tested
□ NVDA tested where possible
□ Mobile accessibility tested
```

---

# 126. Final Accessibility Principle

The robotics club website should feel advanced without requiring advanced physical or technical ability from its visitors.

The ideal experience is:

```text
Visual user
       ↓
Beautiful experience

Keyboard user
       ↓
Complete experience

Screen reader user
       ↓
Complete experience

Mobile user
       ↓
Complete experience

Reduced-motion user
       ↓
Complete experience

WebGL-unavailable user
       ↓
Complete experience
```

The **3D robot, animations, dark industrial aesthetic, and premium interactions are enhancements—not barriers to accessing the team's story.**

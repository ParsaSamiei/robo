# 08 — DESIGN SYSTEM, VISUAL LANGUAGE & UI/UX

**Document:** `08_DESIGN_SYSTEM.md`

This document defines the visual and interaction language of the robotics club website.

The objective is not to lock the team into a permanent brand identity before the team has a name and logo.

Instead, this document defines a **temporary but production-quality visual system** that can later absorb the final identity.

---

# 1. Design Objective

The website should feel like:

> **A serious robotics engineering organization created by students who are building real machines.**

The visual balance should be:

```text
60%  Dark technical
30%  Robotics laboratory
10%  Premium
```

The result should be:

```text
Professional
Technical
Confident
Precise
Human
Young
Experimental
```

but never:

```text
Corporate
Generic
Overly futuristic
Cyberpunk
AI-generated
Gamer
```

---

# 2. Brand Identity Is Not Final

The team currently has:

- No final name.
- No final logo.
- No finalized visual identity.

Therefore:

> Do not hard-code the entire visual identity into components.

Create a token-based design system.

For example:

```text
--color-background
--color-surface
--color-surface-elevated
--color-text-primary
--color-text-secondary
--color-border
--color-accent
--color-accent-muted
```

When the team eventually receives a logo and identity, these can be changed centrally.

---

# 3. Design Token Architecture

Create a centralized design-token system.

Prefer:

```text
globals.css
```

and/or:

```text
tailwind theme
```

rather than scattering values across components.

Avoid:

```tsx
<div className="bg-[#111827] ...">
```

everywhere.

Prefer semantic tokens.

---

# 4. Color Direction

The exact brand color can change later.

The initial palette should be based around:

### Primary background

Very dark neutral / blue-black.

Conceptually:

```text
#0B0F14
```

### Main surface

```text
#111820
```

### Secondary surface

```text
#17212B
```

### Borders

Low-contrast cool gray.

### Primary text

Near-white.

### Secondary text

Muted gray.

### Accent

A restrained industrial accent.

A warm amber / engineered yellow is a strong candidate because it works well with:

- Industrial machinery.
- Warning markings.
- Robotics.
- Dark interfaces.
- Metal.

However:

> Treat this as a starting point, not the permanent team color.

---

# 5. Accent Usage

The accent should be used sparingly.

Good uses:

```text
CTA
active navigation
small indicators
important statistics
technical highlights
hover states
links
```

Bad use:

```text
Entire cards
large backgrounds everywhere
every heading
every border
every icon
```

The accent becomes less premium when it is everywhere.

---

# 6. Industrial Color Language

The design can subtly reference industrial environments through:

```text
Graphite
Steel
Warm metal
Machine gray
Amber
Off-white
```

Do not turn the website into a literal factory UI.

---

# 7. Typography

Typography is one of the most important parts of the visual identity.

English should feel:

```text
Modern
Technical
Clean
Editorial
```

Persian should feel:

```text
Readable
Modern
Professional
Balanced
```

Do not use a novelty/futuristic font.

---

# 8. Font Strategy

Use a high-quality sans-serif family with strong Latin and Persian support.

The system should support separate font stacks if necessary:

```text
English:
Primary Latin font

Persian:
Primary Persian font
```

The exact fonts can be finalized during implementation.

Prioritize:

- Excellent numerals.
- Strong headings.
- Good Persian shaping.
- Multiple weights.
- Screen readability.

---

# 9. Typography Hierarchy

Desktop example:

```text
Hero:
72–96px

Page title:
56–72px

Section title:
40–52px

Card title:
20–28px

Body:
16–18px

Metadata:
13–15px
```

These are starting ranges, not absolute requirements.

The actual size should depend on the selected font.

---

# 10. Typography Rule

Do not make every heading enormous.

A premium website has hierarchy.

For example:

```text
HERO
Large

Section title
Medium

Card title
Moderate

Metadata
Small
```

If everything is huge, nothing feels important.

---

# 11. Persian Typography

Persian text must use proper typography.

Requirements:

- Correct RTL direction.
- Correct punctuation handling.
- Appropriate line-height.
- Persian numerals where appropriate to content.
- No artificial letter spacing.
- Correct alignment.
- Correct mixed Persian/English handling.

---

# 12. RTL Architecture

RTL must be implemented semantically.

Use:

```html
dir="rtl"
```

when appropriate.

Do not attempt to fake RTL by manually reversing margins everywhere.

Use logical CSS properties where possible:

```text
margin-inline-start
margin-inline-end
padding-inline-start
padding-inline-end
```

instead of excessive:

```text
margin-left
margin-right
```

---

# 13. Mixed Language Content

Robotics naturally contains English technical terms.

Example:

> ما از ROS 2 و C++ برای توسعه سیستم استفاده می‌کنیم.

The layout must handle:

```text
Persian
+
ROS 2
+
C++
```

without visual corruption.

Use proper direction isolation where necessary.

---

# 14. Spacing System

Use a consistent spacing scale.

Conceptually:

```text
4
8
12
16
24
32
48
64
80
96
128
```

Do not invent random spacing values throughout the application.

---

# 15. Layout Width

The site should not stretch infinitely on large screens.

Use a central max-width container.

Concept:

```text
┌─────────────────────────────────────────────────────────┐
│                                                         │
│              MAX WIDTH CONTENT AREA                     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

The exact width should be determined by the visual design.

---

# 16. Grid

Use a responsive grid system.

Desktop:

```text
12-column grid
```

Tablet:

```text
6-column
```

Mobile:

```text
4-column
```

Components should be able to span different numbers of columns.

---

# 17. Asymmetry

Avoid making every section:

```text
Image | Text
Image | Text
Image | Text
```

That is a common AI-generated website pattern.

Instead use:

```text
Large visual
Small technical detail

Text-heavy section
+
small diagram

Wide robot image
+
narrow metadata

Large project
+
two smaller projects
```

Controlled asymmetry gives the site character.

---

# 18. Cards

Cards should be used selectively.

Avoid:

```text
Everything is a rounded rectangle.
```

Instead, use cards when grouping actual content.

Examples:

- Project.
- Robot.
- Member.
- Sponsor.
- Competition.

---

# 19. Card Style

Cards should be:

```text
subtle
structured
low-radius or moderate-radius
low-contrast borders
```

Avoid huge shadows.

Use depth through:

- Contrast.
- Border.
- Spacing.
- Image treatment.

---

# 20. Border Radius

Use a consistent radius system.

Possible:

```text
Small:
6px

Medium:
10px

Large:
16px
```

Hero imagery can use larger radius where visually appropriate.

Avoid excessive:

```text
32px
48px
9999px
```

on everything.

---

# 21. Shadows

Shadows should be subtle.

Preferred:

```text
soft
low-opacity
large blur
```

Avoid:

```text
black heavy shadow
neon glow
colored glow
```

unless specifically used for the 3D experience.

---

# 22. Buttons

Primary button:

```text
Accent background
Dark text
```

Secondary:

```text
Transparent
Border
```

Tertiary:

```text
Text link
```

Example hierarchy:

```text
[ Explore Our Work ]

[ Meet the Team ]

View project →
```

---

# 23. Button Behavior

Buttons should have:

- Hover.
- Focus.
- Active.
- Disabled.

Animation should be quick and subtle.

Example:

```text
150–250ms
```

Do not use exaggerated bouncing animations.

---

# 24. Navigation Behavior

Desktop navigation should be:

```text
minimal
stable
easy to scan
```

Possible behavior:

- Transparent over hero initially.
- Transitions into a slightly opaque/dark background when scrolling.

But avoid an enormous sticky navbar.

---

# 25. Header on Scroll

Suggested:

```text
At top:
Transparent / integrated with hero

On scroll:
Subtle background
Subtle border
```

The transition should feel natural.

---

# 26. Page Headers

Interior pages should have strong but compact headers.

Example:

```text
PROJECTS

Engineering systems, experiments, and
tools built by the club.
```

Then content.

Do not waste half the viewport on a generic page title.

---

# 27. Breadcrumbs

Breadcrumbs can be used on deep pages.

Example:

```text
Projects / Autonomous Navigation
```

They are especially useful on:

- Project pages.
- Robot pages.
- Competition pages.
- Journal articles.

They should remain subtle.

---

# 28. Technical Metadata

A recurring visual language can show technical metadata.

Example:

```text
STATUS
ACTIVE

STACK
ROS 2 · C++ · LiDAR

TEAM
SOFTWARE · HARDWARE

YEAR
2026
```

This is much better than filling cards with decorative icons.

---

# 29. Status Indicators

Use restrained status indicators:

```text
● Active
● Completed
● Planned
● Archived
```

Color should support meaning, not become decoration.

---

# 30. Icons

Use a consistent icon library.

Prefer:

```text
Lucide
```

or another clean technical icon set.

Avoid mixing:

```text
Font Awesome
Material
Lucide
random SVGs
```

unless necessary.

---

# 31. Icon Philosophy

Icons should clarify.

Examples:

```text
GitHub
External link
Calendar
Location
Arrow
Play
Download
```

Do not put icons next to every sentence.

---

# 32. Images

Images should have a clear role.

Potential treatments:

### Full bleed

For important robot/competition photographs.

### Framed

For technical documentation.

### Cropped

For member cards.

### Editorial

For journal content.

---

# 33. Real Photography

Once the team has photos, these should become a major part of the website.

Especially:

```text
Team working
Robot testing
PCB work
Mechanical fabrication
Competition
Lab
Debugging
Meetings
```

These photographs communicate authenticity.

---

# 34. Placeholder Strategy

Before the team has photography:

Do not fill the site with generic stock images.

Instead use:

- Technical placeholders.
- Neutral gradients.
- Abstract geometry.
- CAD-inspired visualizations.
- The Three.js robot.

When real photography becomes available, it can replace these.

---

# 35. Three.js Visual System

The 3D robot should visually integrate with the website.

The robot environment should use the site's design language:

```text
Dark
Steel
Graphite
Warm accent
Soft lighting
```

It should not look like a separate videogame.

---

# 36. Three.js Camera

The camera should have controlled movement.

Possible:

```text
Idle:
very subtle movement

Mouse:
small parallax

Scroll:
controlled transition
```

No aggressive camera spinning.

---

# 37. Three.js Interaction

Potential interaction:

```text
Hover:
highlight component

Click:
show technical information

Scroll:
move through robot presentation
```

But only implement interactions that remain performant.

---

# 38. Robot Labels

Technical labels could appear around the robot:

```text
LiDAR
VISION
MANIPULATOR
MOBILE BASE
COMPUTE
```

These should be used sparingly.

The visual should still work without them.

---

# 39. Motion System

Use three levels:

### Level 1 — Micro

```text
button hover
opacity
color
border
```

### Level 2 — Component

```text
card reveal
image transition
navigation
```

### Level 3 — Hero

```text
Three.js
large transitions
```

Level 3 should be used only where it provides genuine value.

---

# 40. Scroll Animation

Recommended:

```text
fade
translate 8–20px
scale 0.98 → 1
```

Avoid:

```text
rotate
bounce
large parallax
```

for ordinary content.

---

# 41. Page Transitions

Page transitions should be subtle.

A short fade/slide can be used if it does not interfere with navigation.

Never make the user wait for an animation.

---

# 42. Hover Philosophy

Hover should reveal information.

Examples:

### Project

Image subtly zooms.

### Member

Social links appear.

### Sponsor

Logo becomes slightly brighter.

### Robot

Technical component highlights.

---

# 43. Accessibility

The site must meet strong accessibility standards.

Minimum:

- Keyboard navigation.
- Visible focus.
- Semantic HTML.
- Proper headings.
- Alt text.
- Color contrast.
- Reduced motion.
- Form labels.
- Accessible dialogs.
- Accessible mobile navigation.

---

# 44. Focus States

Never remove focus outlines without replacing them.

Bad:

```css
outline: none;
```

without an alternative.

Focus should be clearly visible.

---

# 45. Contrast

Dark mode must maintain readable contrast.

Do not use:

```text
gray text
on slightly lighter gray
```

just because it looks fashionable.

Content readability takes priority.

---

# 46. Mobile Typography

Do not simply scale desktop values proportionally.

Mobile should have its own typography scale.

For example:

```text
Hero:
42–56px

Section:
32–40px

Body:
16–17px
```

depending on font.

---

# 47. Mobile Spacing

Mobile should use tighter spacing while maintaining breathing room.

Avoid:

```text
128px gap
```

between every section.

---

# 48. Mobile Cards

Cards should generally become:

```text
single column
```

unless a two-column layout remains genuinely readable.

---

# 49. Mobile Gallery

Use a responsive grid/masonry-like system.

Images should remain large enough to appreciate.

Avoid tiny thumbnails.

---

# 50. Mobile Tables

Competition results and technical data should not overflow horizontally unnecessarily.

Use:

- Responsive cards.
- Stacked metadata.
- Horizontal scrolling only when genuinely necessary.

---

# 51. Mobile Three.js Performance

Mobile is especially important.

The implementation should detect performance where appropriate and reduce:

- Polygon count.
- Shadows.
- Post-processing.
- Resolution.
- Animation complexity.

The mobile site must not become unusably slow simply to preserve the desktop hero.

---

# 52. Dark Mode

Dark mode is the default/preferred mode.

It should feel intentional rather than:

```text
white website + invert colors
```

Use multiple dark surfaces to establish depth.

Example:

```text
Background
   ↓
Surface
   ↓
Elevated Surface
   ↓
Card
```

---

# 53. Light Mode

Light mode should use:

```text
warm/cool off-white
light gray surfaces
dark text
same accent
```

Avoid pure:

```text
#FFFFFF
```

everywhere if it makes the site harsh.

---

# 54. Dark Surface Hierarchy

A useful hierarchy:

```text
Page background
#0B0F14

Surface
#111820

Elevated
#17212B

Interactive
slightly brighter
```

Exact values may change during implementation.

---

# 55. Premium Sponsor Section

This section deserves special attention.

Visual direction:

```text
Large whitespace
Small typography
Minimal borders
Carefully aligned logos
Subtle transitions
```

Sponsor logos should never feel like advertisements plastered across the page.

---

# 56. Sponsor Logo Treatment

Normalize logo presentation.

Because sponsors will have different logo sizes and aspect ratios:

- Use consistent containers.
- Preserve aspect ratio.
- Do not distort logos.
- Avoid forcing every logo into identical dimensions.
- Use appropriate light/dark variants if available.

---

# 57. Sponsor Hover

Possible:

```text
Normal:
muted

Hover:
full brightness
```

with:

```text
Visit sponsor →
```

appearing subtly.

---

# 58. Footer Visual Style

Footer can be darker than the main page.

Use:

```text
Large whitespace
Strong club statement
Navigation
Social
Legal
```

The footer should feel like the final page of the experience.

---

# 59. Empty States

If the team has not yet added content:

Do not show embarrassing empty sections.

Bad:

```text
Projects
No projects found.
```

Better:

```text
Hide the section
```

or use a deliberate launch-state message when appropriate.

---

# 60. First-Year Design Advantage

Because the team is new, the website should embrace the idea:

> **This is the beginning.**

The site can visually communicate progression.

For example:

```text
Founded
 ↓
Build
 ↓
Test
 ↓
Compete
 ↓
Learn
 ↓
Expand
```

This gives the website a narrative without pretending to have an enormous history.

---

# 61. Design Rule: No Fake Prestige

Do not use:

```text
"World-class"
"Industry-leading"
"Revolutionary"
"Next-generation"
"Cutting-edge"
```

unless there is evidence supporting the statement.

The site should earn credibility through:

```text
Projects
Robots
Results
Engineering
People
```

---

# 62. Design Rule: Technical Honesty

If the robot is still:

```text
prototype
unfinished
experimental
```

show it.

A real engineering team doesn't need to pretend everything is perfect.

That honesty can actually make the website stronger.

---

# 63. Design Rule: Real Content Wins

When real content becomes available:

```text
Real robot photo
>
3D render

Real competition photo
>
stock image

Real PCB
>
decorative circuit graphic

Real engineer
>
AI-generated person
```

---

# 64. Design Rule: No AI Aesthetic

The implementation AI must actively evaluate every major visual component against this question:

> "Would this look like a generic AI-generated startup website?"

If yes:

> redesign it.

This requirement is part of the design system, not an optional preference.

---

# 65. Overall UX Principle

The visitor journey should feel like:

```text
I see the robot
      ↓
I understand the club
      ↓
I see what they build
      ↓
I meet the people
      ↓
I understand their engineering
      ↓
I see their competitions
      ↓
I see evidence of real work
      ↓
I want to know more
```

That is the core UX narrative.

---

# 66. Final Design Principle

The final website should look like something that could plausibly belong to:

> **a very good robotics laboratory**

rather than:

> **a very good web designer's portfolio.**

The engineering must always remain the hero.

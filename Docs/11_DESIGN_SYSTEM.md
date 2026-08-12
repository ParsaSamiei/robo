# 11 — DESIGN SYSTEM & VISUAL DIRECTION

**Document:** `11_DESIGN_SYSTEM.md`

This document defines the visual language of the robotics club website.

The goal is **not** to make a generic "AI robotics website."

The goal is to create something that looks like it was designed by a serious engineering team with strong taste.

The visual direction should communicate:

> **Engineering precision + robotics + competition + young technical team + premium craftsmanship.**

---

# 1. Core Design Principle

The website should feel:

- Technical.
- Precise.
- Confident.
- Premium.
- Human.
- Industrial.
- Modern.
- Slightly experimental.

It should **not** feel:

- Cyberpunk.
- Gamer-oriented.
- "AI startup."
- Generic SaaS.
- Overly futuristic.
- Full of glowing gradients.
- Covered in circuit-board decorations.
- AI-generated.

---

# 2. Design Ratio

Use the visual balance previously established:

```text
60% — Dark technical
30% — Robotics laboratory / engineering
10% — Premium / editorial
```

This is a guideline rather than a literal color percentage.

---

# 3. Overall Mood

The visual language should sit somewhere between:

```text
Industrial robotics laboratory
        +
High-end engineering portfolio
        +
Modern university research group
        +
Premium technology brand
```

The closest mental reference should be:

> **"What if a very good robotics team had a design studio?"**

Not:

> "What if an AI generated a robotics landing page?"

---

# 4. Brand Independence

The robotics club currently has no final name or logo.

Therefore:

**Do not hard-code a visual identity around a temporary name.**

The design system must make it easy to replace:

```text
Logo
Wordmark
Club name
Accent color
Typography
```

later.

---

# 5. Temporary Identity

Until the real identity exists, use a restrained typographic placeholder.

For example:

```text
IUST
ROBOTICS
```

or:

```text
ROBOTICS CLUB
IUST
```

The implementation should make this a replaceable component.

---

# 6. Logo Placeholder

Create:

```text
<BrandMark />
```

and:

```text
<Wordmark />
```

instead of writing the temporary logo directly throughout the application.

This is extremely important for future rebranding.

---

# 7. Color Philosophy

The primary interface should be dark.

But "dark" does not mean pure black everywhere.

Use layered surfaces.

Conceptually:

```text
Background
↓
Surface
↓
Elevated Surface
↓
Border
↓
Content
```

---

# 8. Recommended Base Palette

Use these as an initial design system, not as immutable branding.

### Background

```text
#0B0F14
```

### Secondary background

```text
#111820
```

### Surface

```text
#151D26
```

### Elevated surface

```text
#1B2530
```

### Border

```text
#27323D
```

---

# 9. Text Colors

Primary:

```text
#F5F7FA
```

Secondary:

```text
#B6C0CA
```

Muted:

```text
#7E8995
```

Disabled:

```text
#56616C
```

The contrast should remain accessible.

---

# 10. Accent Color

The final brand accent is intentionally undecided.

The temporary system can use a restrained engineering accent.

Recommended starting point:

```text
#D7A84B
```

This provides a subtle industrial-metal / premium feel without turning the entire website gold.

---

# 11. Accent Usage

Accent should be used for:

- Important CTA.
- Small highlights.
- Active navigation.
- Important metrics.
- Technical labels.
- Selected states.

Do **not** use it for every heading.

---

# 12. Secondary Accent

A secondary cool technical tone can be introduced where useful.

Example:

```text
#6F8FA8
```

Use sparingly.

The site should not become blue + gold everywhere.

---

# 13. No Neon

Avoid:

```text
neon green
neon blue
neon purple
```

especially in combination.

Robotics does not require neon to communicate technology.

---

# 14. No Excessive Gradients

Gradients may be used subtly for:

- Hero depth.
- Image overlays.
- Background atmosphere.

Avoid:

```text
purple → blue → pink
```

startup-style gradients.

---

# 15. Background Texture

A very subtle technical texture may be used.

Examples:

- Fine grid.
- Very faint noise.
- Engineering drawing lines.

Opacity should be extremely low.

The texture should be noticed subconsciously, not consciously.

---

# 16. Grid

A subtle grid can reinforce engineering.

Example concept:

```text
┼────┼────┼────┼────┼
│    │    │    │    │
├────┼────┼────┼────┤
│    │    │    │    │
┼────┼────┼────┼────┼
```

But it must never look like a sci-fi HUD.

---

# 17. Typography

Typography is one of the most important parts of the identity.

Use a strong modern sans-serif.

Potential direction:

```text
English:
Inter / Geist / similar modern grotesk

Persian:
Vazirmatn / modern Persian sans
```

The exact fonts should be evaluated during implementation.

---

# 18. English Typography

English headings should be:

- Strong.
- Tight.
- Modern.
- Not overly geometric.

Avoid exaggerated futuristic fonts.

---

# 19. Persian Typography

Persian should use a proper Persian typeface.

Do **not** rely on browser/system fallback fonts.

The Persian typography must feel equally intentional as English.

---

# 20. Font Weight

Recommended hierarchy:

```text
Display       700–800
H1            700
H2            650–700
H3            600
Body          400–450
Labels        500–600
```

Do not make every element bold.

---

# 21. Heading Style

Headings should be relatively compact.

Example:

```text
BUILDING
MACHINES
THAT MOVE.
```

This is only a visual example.

The actual copy should remain natural.

---

# 22. Typography Scale

Use a responsive scale.

Conceptually:

```text
Display:
clamp(3rem, 7vw, 7rem)

H1:
clamp(2.5rem, 5vw, 5rem)

H2:
clamp(2rem, 3.5vw, 3.5rem)

H3:
clamp(1.4rem, 2vw, 2rem)

Body:
1rem–1.125rem
```

Exact values should be tuned visually.

---

# 23. Line Length

Body text should not span the entire screen.

Target approximately:

```text
60–75 characters
```

per line for comfortable reading.

---

# 24. Layout Grid

Desktop should use a strong editorial grid.

Recommended:

```text
12-column grid
```

with generous gutters.

The grid should guide alignment without becoming visually obvious.

---

# 25. Container Width

Recommended maximum:

```text
1200–1400px
```

depending on viewport and visual density.

Do not make content stretch endlessly across a 4K screen.

---

# 26. Horizontal Padding

Desktop:

```text
32–64px
```

Tablet:

```text
24–40px
```

Mobile:

```text
16–24px
```

These are starting values.

---

# 27. Vertical Rhythm

Use deliberate spacing.

Typical section spacing:

```text
96px
128px
160px
```

on large screens.

Mobile should reduce this appropriately.

---

# 28. Whitespace

Whitespace is a major part of the premium appearance.

Do not try to fill every empty area with:

- Icons.
- Cards.
- Text.
- Decorative lines.

Empty space is intentional.

---

# 29. Cards

Cards should be used selectively.

Avoid a page made entirely of:

```text
┌──────────┐
│  CARD    │
└──────────┘
```

Instead, combine:

- Open layouts.
- Editorial sections.
- Large images.
- Horizontal rows.
- Cards where useful.

---

# 30. Card Style

Default card:

```text
background: surface
border: subtle
radius: moderate
```

Avoid extremely rounded "startup UI" cards.

Recommended radius direction:

```text
8–16px
```

depending on component.

---

# 31. Premium Sections

Sponsor and partner sections should use a more restrained style.

Think:

```text
Apple product page
+
engineering annual report
```

rather than flashy sponsorship banners.

---

# 32. Sponsor Logos

Sponsor logos should have breathing room.

Do not put logos inside tiny crowded cards.

A strong treatment could be:

```text
┌───────────────────────────────────────────────┐
│                                               │
│                 SPONSORS                      │
│                                               │
│      LOGO        LOGO        LOGO             │
│                                               │
└───────────────────────────────────────────────┘
```

---

# 33. Sponsor Tier Visual Hierarchy

Higher tiers may receive:

- Larger logo area.
- Stronger placement.
- More visual prominence.

But avoid making lower-tier sponsors look unimportant or cheap.

---

# 34. Buttons

Use a small number of button variants.

### Primary

```text
background: accent
text: dark
```

### Secondary

```text
transparent
border
```

### Ghost

```text
transparent
minimal hover
```

---

# 35. Button Shape

Avoid huge pill buttons everywhere.

Use modest radius:

```text
8–10px
```

unless the final brand identity suggests otherwise.

---

# 36. Button Motion

Hover:

```text
translateY(-1px)
subtle shadow
background change
```

Keep movement subtle.

No exaggerated bouncing.

---

# 37. Navigation

Desktop navigation should be minimal.

Potential:

```text
Work
Team
Competitions
Journal
About
```

with:

```text
Join the Team
```

as the primary action.

---

# 38. Header Behavior

The header can become slightly more compact after scrolling.

Example:

```text
Top:
transparent / integrated with hero

Scroll:
dark translucent surface
subtle border
```

Do not create a huge sticky header.

---

# 39. Mobile Navigation

Mobile navigation should be simple.

Use:

```text
Menu
```

and a full-height or substantial overlay.

It should not become a tiny dropdown that is difficult to use.

---

# 40. RTL Navigation

Persian navigation must properly mirror layout.

Do not simply reverse text.

Correct RTL means:

- Logical spacing.
- Icon positioning.
- Direction-aware arrows.
- Correct alignment.

---

# 41. Icons

Use a consistent icon library.

Possible:

```text
Lucide
```

Do not mix five different icon styles.

---

# 42. Icon Style

Icons should be:

- Thin/medium.
- Technical.
- Minimal.

Avoid overly decorative illustrations.

---

# 43. Technical Labels

Small labels can be used throughout the site.

Example:

```text
PROJECT / 01
ROBOT / 02
COMPETITION / 2026
```

This creates an engineering-documentation feel.

Use them sparingly.

---

# 44. Monospace

A monospace font can be used selectively for:

- Technical specifications.
- Coordinates.
- Code.
- Labels.
- Data.

Do not make the entire website monospace.

---

# 45. Photography

Photography should feel real.

Preferred:

- Team working.
- Robot in workshop.
- Competition floor.
- Electronics bench.
- CAD workstation.
- Testing.
- Robot close-ups.

Avoid generic stock robotics photos.

---

# 46. Photography Treatment

Photos can have:

- Dark backgrounds.
- Natural lighting.
- Slightly desaturated treatment.
- High contrast.

But do not over-process them.

---

# 47. No AI Images

The website should not use AI-generated imagery as a substitute for real team content.

The visual identity should come from:

```text
Actual robots
Actual people
Actual projects
Actual competition
Actual engineering
```

---

# 48. Empty States

Because the club is new, some sections may initially lack content.

Empty states should be intentional.

Bad:

```text
No projects found.
```

Better:

```text
Projects are coming online as we build them.
```

But use this sparingly.

---

# 49. Avoid Fake Content

Do not create fictional:

- Awards.
- Sponsors.
- Team members.
- Projects.
- Competition results.
- Statistics.

Placeholder content should be clearly identifiable during development.

---

# 50. Visual Storytelling

The website should tell a progression:

```text
IDEA
 ↓
DESIGN
 ↓
BUILD
 ↓
TEST
 ↓
COMPETE
 ↓
LEARN
```

This is a strong visual narrative for a first-year robotics team.

---

# 51. Engineering Visuals

Where real material exists, use:

- CAD screenshots.
- PCB designs.
- Robot diagrams.
- System architecture.
- Code snippets.
- Sensor visualization.

These are much more authentic than generic "futuristic" graphics.

---

# 52. Technology Section

The technology section should visually communicate the actual stack:

```text
ROS 2
C++
Python
YOLO
SLAM
LiDAR
Jetson
STM
Altium
SolidWorks
```

It should feel like an engineering stack, not a list of marketing buzzwords.

---

# 53. Technology Logos

Technology logos can be used when their official branding permits it.

However:

> Do not create a wall of logos.

The technologies should support the story rather than become the story.

---

# 54. Three.js Robot

This is the primary "wow" element.

It should be:

- Industrial.
- Mechanical.
- Detailed.
- Believable.
- Interactive.
- Elegant.

Not:

- Cartoonish.
- Toy-like.
- Humanoid unless the club actually works with humanoids.
- Covered in glowing lights.

---

# 55. Robot Visual Direction

Think:

```text
Industrial robotic arm
+
mobile robotics hardware
+
precision machinery
```

The model should communicate engineering.

---

# 56. Three.js Interaction

Recommended:

- Slow idle motion.
- Cursor-following camera/parallax.
- Controlled rotation.
- Subtle mechanical movement.
- Scroll interaction where appropriate.

Avoid making it spin wildly.

---

# 57. Robot Materials

Use physically believable materials:

```text
Painted metal
Brushed aluminum
Rubber
Dark polymer
Glass
Small emissive indicators
```

Lighting should make the materials readable.

---

# 58. Robot Lighting

Use controlled studio-style lighting.

Potential:

```text
Key light
Fill light
Rim light
Ambient environment
```

Avoid rainbow lighting.

---

# 59. Robot Background

The robot can sit within a subtle technical environment:

```text
dark background
soft gradient
very faint grid
subtle floor
```

The environment should never overpower the model.

---

# 60. Mobile Three.js

On mobile:

- Reduce model complexity.
- Reduce animation.
- Reduce pixel ratio.
- Consider simplified effects.
- Preserve the main visual.

The website must remain usable even on lower-powered phones.

---

# 61. Reduced Motion

Respect:

```text
prefers-reduced-motion
```

Users who disable animation should receive a static or minimally animated version.

This is an accessibility requirement.

---

# 62. Loading State

The 3D hero should have a polished loading state.

Example:

```text
INITIALIZING SYSTEM
```

or a subtle progress indicator.

Do not show a browser-style loading spinner for several seconds.

---

# 63. 3D Failure State

If WebGL is unavailable:

```text
3D model
   ↓
Fallback
   ↓
High-quality robot image
```

The page should still look designed.

---

# 64. Motion Philosophy

Motion should communicate:

```text
precision
mechanics
depth
transition
```

not:

```text
look how many animations we have
```

---

# 65. Scroll Animations

Use subtle reveals:

```text
opacity
translateY
clip/reveal
image movement
```

Keep durations around the feel of:

```text
300–800ms
```

depending on animation type.

---

# 66. Staggered Animations

Staggering can be useful for:

- Team cards.
- Project lists.
- Statistics.

Do not stagger huge lists.

---

# 67. Page Transitions

Subtle page transitions may be used.

But navigation should remain fast.

Do not delay page content merely for animation.

---

# 68. Hover Effects

Desktop hover can be used for:

- Project images.
- Robot cards.
- Links.
- Sponsor logos.
- Team profiles.

Mobile must not depend on hover.

---

# 69. Image Hover

Possible effect:

```text
image scale: 1 → 1.03
overlay: subtle
```

Do not zoom images aggressively.

---

# 70. Link Arrows

A small directional arrow can animate on hover:

```text
View project →
```

The movement should be subtle.

---

# 71. Border Animation

Occasional border animations can be used around:

- Featured project.
- Hero CTA.
- Technical sections.

But do not animate every border.

---

# 72. Premium Detail

The 10% premium aspect should appear through:

- Typography.
- Spacing.
- Image treatment.
- Micro-interactions.
- Sponsor presentation.
- Precise alignment.

Not through expensive-looking gradients.

---

# 73. Design Consistency

Every page should use the same:

```text
Grid
Typography
Spacing
Buttons
Cards
Motion
Color tokens
```

The site should feel like one system.

---

# 74. Design Tokens

Use centralized CSS variables/Tailwind tokens.

Example:

```text
--color-bg
--color-surface
--color-surface-elevated
--color-border
--color-text-primary
--color-text-secondary
--color-text-muted
--color-accent
```

Do not hard-code colors throughout components.

---

# 75. Spacing Tokens

Create a consistent spacing scale.

For example:

```text
xs
sm
md
lg
xl
2xl
3xl
```

Do not use arbitrary spacing values everywhere.

---

# 76. Radius Tokens

Create:

```text
radius-sm
radius-md
radius-lg
```

Use consistently.

---

# 77. Shadow Tokens

Shadows should be subtle.

Use stronger shadows only for:

- Modals.
- Dropdowns.
- Elevated elements.

Avoid floating-card shadows everywhere.

---

# 78. Borders

Borders are particularly useful in the dark theme.

They should be visible enough to establish structure without becoming distracting.

---

# 79. Light Theme

The light theme should be supported architecturally.

It should not be treated as an afterthought.

However:

> Dark mode is the primary visual experience.

---

# 80. Light Theme Direction

Light theme should feel like:

```text
Engineering documentation
+
clean laboratory
+
premium editorial
```

rather than simply:

```text
dark theme → invert colors
```

---

# 81. Light Theme Colors

Possible foundation:

```text
Background
#F5F6F4

Surface
#FFFFFF

Border
#D9DEE2

Text
#11161B

Secondary
#59636D
```

Accent can remain brand-dependent.

---

# 82. Theme Switching

The user should be able to switch:

```text
Dark
Light
System
```

if this is included in the final UX.

Do not make the theme switcher visually dominant.

---

# 83. Language + Theme

Language and theme should work independently.

All combinations must be supported:

```text
English + Dark
English + Light
Persian + Dark
Persian + Light
```

---

# 84. Responsive Design

The website must be fully responsive.

Priority:

```text
Desktop/Laptop
↓
Tablet
↓
Mobile
```

The desktop experience receives the most visual refinement, but mobile must not feel like a broken desktop version.

---

# 85. Desktop

Primary target:

```text
1440 × 900
```

but the design should work across:

```text
1280
1440
1600
1920+
```

---

# 86. Laptop

The layout should remain comfortable around:

```text
1366 × 768
```

This is particularly important because this is a major real-world target.

---

# 87. Tablet

Test at approximately:

```text
768px
1024px
```

Do not simply wait for mobile breakpoint behavior.

---

# 88. Mobile

Test at:

```text
320px
360px
390px
430px
```

At minimum.

---

# 89. Mobile Content Priority

On mobile, preserve:

```text
Hero
Who we are
Featured work
Team
Competition
Join
```

Do not hide essential information just to preserve desktop layouts.

---

# 90. Responsive 3D

The 3D robot should resize intelligently.

On mobile it may become:

```text
Text
 ↓
Robot
 ↓
CTA
```

rather than trying to maintain a two-column desktop layout.

---

# 91. Responsive Tables

Technical specifications should not create horizontal scrolling unless unavoidable.

Use:

- Stacked rows.
- Responsive cards.
- Label/value layouts.

---

# 92. Responsive Gallery

Gallery should use a carefully designed responsive grid.

Do not use an arbitrary masonry library unless it adds real value.

---

# 93. Responsive Admin

The admin panel should also work on mobile, but desktop is the primary admin target.

The admin UX must not depend exclusively on hover.

---

# 94. Accessibility

Target WCAG 2.2 AA principles where practical.

Ensure:

- Keyboard navigation.
- Visible focus.
- Adequate contrast.
- Proper labels.
- Semantic HTML.
- Alt text.
- Reduced motion.
- Screen-reader-friendly controls.

---

# 95. Focus States

Never remove focus outlines without replacing them with an equally visible focus state.

---

# 96. Image Alt Text

Admin should be able to specify useful alt text.

Decorative images should be marked appropriately.

Do not use filenames as alt text.

---

# 97. Form Accessibility

Every form field needs:

```text
Label
Input
Error state
Accessible description where necessary
```

Errors should not only be communicated through color.

---

# 98. Error Design

Errors should feel calm and useful.

Example:

```text
Please enter a valid email address.
```

Not:

```text
ERROR!!! INVALID!!!
```

---

# 99. Success Design

Use React Toastify for confirmation where appropriate.

Example:

```text
Application submitted successfully.
```

Then provide the actual next step if necessary.

---

# 100. Final Visual Rule

The website should make someone think:

> **"These people actually build robots."**

not:

> **"This is a website template about robots."**

Everything in the visual system — typography, imagery, animation, spacing, Three.js, project presentation, team profiles, and competition history — should reinforce that distinction.

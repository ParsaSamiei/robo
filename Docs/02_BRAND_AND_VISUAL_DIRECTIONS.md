# IUST Robotics Website

## Brand & Visual Direction

**Document:** `02_BRAND_AND_VISUAL_DIRECTION.md`
**Project:** IUST Robotics
**Status:** Initial visual direction
**Brand Identity:** Temporary / future logo integration required

---

# 1. Purpose

This document defines the visual language of the IUST Robotics website.

The visual system must establish a recognizable identity even before the team has its final logo and formal brand identity.

The system should therefore be:

- Strong enough to make the website feel intentional.
- Neutral enough to accept a future logo.
- Technical enough to represent robotics.
- Professional enough for sponsors.
- Flexible enough for future competitions and activities.
- Compatible with English and Persian.
- Suitable for dark and light themes.

The website must not depend on the final logo to feel designed.

---

# 2. Brand Strategy

The current visual identity should be considered a **temporary digital identity**, not the final official brand.

The eventual team logo may change:

- Symbol.
- Wordmark.
- Accent color.
- Typography.
- Visual motifs.

The website architecture must allow those changes without requiring a complete redesign.

Therefore:

> **Design the system around the organization's character, not around a temporary logo.**

---

# 3. Core Visual Characteristics

The visual language should communicate five major qualities:

### Engineering

Precise, structured, technical.

### Robotics

Mechanical, autonomous, physical, intelligent.

### Competition

Focused, energetic, ambitious.

### Professionalism

Clean, restrained, credible.

### Human effort

The people and work behind the machines remain visible.

---

# 4. Visual Balance

The target visual composition is approximately:

```text id="0f2y4b"
60%  Dark Engineering
30%  Robotics Laboratory
10%  Premium Technology
```

### Dark Engineering

Use:

- Dark surfaces.
- Strong contrast.
- Technical spacing.
- Controlled borders.
- Structured layouts.
- Precision typography.

### Robotics Laboratory

Use:

- Technical imagery.
- CAD-inspired visual references.
- Realistic robot visualization.
- Engineering diagrams where useful.
- Mechanical details.
- System-oriented layouts.

### Premium Technology

Use:

- Excellent typography.
- Large whitespace.
- Subtle motion.
- Refined transitions.
- High-quality imagery.
- Strong visual hierarchy.

---

# 5. What the Visual Identity Is Not

The design must explicitly avoid becoming:

### Generic AI SaaS

Avoid:

- Purple gradients.
- Blue/purple blobs.
- "AI" visual clichés.
- Excessive glowing text.
- Floating glass cards.

### Gaming

Avoid:

- Neon colors.
- HUD interfaces.
- Excessive particle effects.
- Aggressive sci-fi typography.
- Game-like dashboards.

### Generic University Website

Avoid:

- Government-style layouts.
- Excessive institutional decoration.
- Dense navigation.
- Old-fashioned gradients.
- Overuse of official colors without design purpose.

### Generic Robotics Template

Avoid:

- Stock humanoid robots.
- Generic robot illustrations.
- Fake laboratory scenes.
- Random gears everywhere.
- Decorative circuit-board backgrounds.

---

# 6. Anti-AI-Generated Design Rule

This is a hard visual constraint.

The website must not look like it was generated from a generic prompt such as:

> "Create a futuristic AI robotics website."

The implementation must avoid predictable combinations such as:

```text id="x2ypkq"
dark background
+
purple gradient
+
glass cards
+
glowing borders
+
3D humanoid robot
+
floating particles
+
giant gradient heading
```

The website should instead feel authored.

Visual decisions must have a reason.

---

# 7. Color Strategy

The color system should not depend on the final team logo.

The initial palette should therefore use a neutral engineering foundation with a restrained warm accent.

The proposed initial direction is:

### Base

Deep blue-black / graphite surfaces.

### Secondary surfaces

Slate / charcoal variations.

### Primary text

Warm-neutral white.

### Secondary text

Cool gray.

### Accent

A restrained **industrial amber / engineering gold**.

This gives the website a recognizable identity without locking the team into a permanent brand color.

---

# 8. Initial Dark Palette

The following values are a starting point and may be refined during implementation.

```text id="5y7n6m"
Background Primary:
#0B0F14

Background Secondary:
#10161D

Surface:
#151C24

Surface Elevated:
#1B242E

Border:
#27313C

Border Strong:
#354250

Text Primary:
#F3F5F7

Text Secondary:
#A9B2BC

Text Muted:
#707B87

Accent:
#D9A441

Accent Strong:
#E7B654

Accent Soft:
#F0D18A
```

These colors should be treated as **design tokens**, not hard-coded values throughout components.

---

# 9. Color Philosophy

The accent color must remain controlled.

Do not turn the entire website gold.

The accent should primarily communicate:

- Interaction.
- Selection.
- Important information.
- Links.
- Active navigation.
- Competition highlights.
- Key metrics.
- Calls to action.

Large areas of accent color should be used sparingly.

---

# 10. Color Hierarchy

The visual hierarchy should generally be:

```text id="uwt6b9"
Background
   ↓
Surface
   ↓
Border
   ↓
Secondary text
   ↓
Primary text
   ↓
Accent
```

Accent should attract attention because it is rare.

If everything is highlighted, nothing is highlighted.

---

# 11. Light Theme

The light theme should use a neutral engineering palette.

Conceptual direction:

```text id="a2fz9v"
Background:
#F5F6F7

Surface:
#FFFFFF

Surface Secondary:
#ECEFF2

Border:
#D8DEE4

Text Primary:
#11161C

Text Secondary:
#4E5965

Text Muted:
#74808C

Accent:
#A97818
```

Exact values may be adjusted for accessibility.

The light theme should retain the same semantic accent behavior.

---

# 12. Semantic Colors

Additional semantic colors should exist independently from the brand accent.

### Success

Used for:

- Successful actions.
- Published content.
- Valid system states.

### Warning

Used for:

- Draft content.
- Caution.
- Incomplete configuration.

### Error

Used for:

- Failed actions.
- Validation errors.
- System errors.

### Information

Used for:

- Informational messages.
- Neutral system states.

These colors must be accessible in both themes.

---

# 13. Contrast

All text and interactive elements must meet appropriate accessibility contrast requirements.

Do not sacrifice readability for visual subtlety.

Particularly important:

- Muted text.
- Borders.
- Form placeholders.
- Disabled states.
- Accent text.
- Text over images.
- Text over 3D backgrounds.

---

# 14. Typography Philosophy

Typography should be one of the strongest visual identity elements.

The site should use a modern, professional sans-serif family.

Avoid overly futuristic or decorative fonts.

The typography should feel:

- Technical.
- Contemporary.
- Human.
- Precise.
- Highly readable.

---

# 15. English Typography

The English type system should support:

- Large display headings.
- Medium section headings.
- Body text.
- Captions.
- Metadata.
- Buttons.
- Navigation.
- Technical labels.

The hierarchy should be created through:

- Size.
- Weight.
- Spacing.
- Line height.

Not through excessive colors or decorative effects.

---

# 16. Persian Typography

The Persian typeface must be intentionally selected rather than relying on a browser default.

It must support:

- Persian glyphs.
- Latin characters.
- Numbers.
- Technical terminology.
- Mixed Persian/English text.

The Persian type system should preserve the same hierarchy as English while allowing different metrics.

The design must not force English typography into Persian layouts.

---

# 17. Technical Typography

Technical information may use a monospace font where appropriate.

Examples:

- Code.
- Technical identifiers.
- Version numbers.
- Sensor specifications.
- System labels.
- Repository names.

Monospace typography should be used as a functional distinction, not as decoration.

---

# 18. Typography Scale

The design system should use a semantic scale rather than arbitrary font sizes.

Conceptually:

```text id="11s6jb"
Display
Hero
H1
H2
H3
H4
Body Large
Body
Body Small
Caption
Label
```

The actual responsive values should be defined in the design-system implementation.

Typography must scale appropriately between desktop and mobile.

---

# 19. Layout Grid

The website should use a consistent layout grid.

Desktop layouts should support:

- Wide hero compositions.
- Two-column content.
- Asymmetric layouts.
- Technical diagrams.
- Image/text compositions.

The grid should not force every page into the same visual structure.

---

# 20. Container Width

Content should generally use a controlled maximum width.

Extremely wide text blocks should be avoided.

Large visual sections may use wider containers than text content.

The design should distinguish between:

### Reading width

Optimized for text.

### Content width

Optimized for normal page content.

### Full-bleed width

Used intentionally for:

- Hero.
- Large imagery.
- 3D scenes.
- Gallery sections.

---

# 21. Spacing

Spacing should be generous and consistent.

The site should feel calm rather than crowded.

A spacing token system should be used rather than arbitrary margins throughout components.

Major sections should have enough vertical space to establish visual rhythm.

---

# 22. Borders

Borders should be subtle.

Dark theme:

> Low-contrast cool gray borders.

Light theme:

> Neutral gray borders.

Strong borders should be reserved for:

- Focus states.
- Important separation.
- Active elements.
- Technical diagrams.

Avoid outlining every element.

---

# 23. Border Radius

The site should use restrained rounding.

Avoid:

> Every component is a giant pill.

Recommended philosophy:

- Small radius for controls.
- Moderate radius for media.
- Larger radius only where composition benefits from it.
- Some elements may intentionally remain square/rectangular.

Engineering interfaces can benefit from a combination of:

- precise rectangles
- subtle rounding

rather than uniform rounded cards.

---

# 24. Shadows

Shadows should be subtle.

In dark mode, prefer:

- Surface separation.
- Borders.
- Tonal contrast.

over extremely large shadows.

In light mode, subtle shadows can establish hierarchy.

Avoid floating-everything aesthetics.

---

# 25. Buttons

Buttons should feel functional.

Primary CTA:

- Accent background.
- Strong readable text.
- Clear hover state.

Secondary CTA:

- Neutral surface/border.
- Subtle interaction.

Tertiary action:

- Text or icon-based.

Buttons should not all look equally important.

---

# 26. Interactive States

All interactive components should define:

- Default.
- Hover.
- Focus.
- Active.
- Disabled.
- Loading.

Keyboard focus must remain clearly visible.

Hover effects must not be the only way to communicate interaction.

---

# 27. Iconography

Icons should use a consistent icon library or consistent custom system.

Avoid mixing unrelated icon styles.

Icons should generally be:

- Simple.
- Geometric.
- Technical.
- Minimal.

Do not use icons merely to decorate every section.

---

# 28. Imagery

The long-term image strategy should prioritize:

1. Real team photographs.
2. Real robots.
3. Real competition environments.
4. Real workshop/build photographs.
5. CAD renders.
6. Technical diagrams.
7. High-quality generated conceptual assets only when clearly necessary.

The site should never depend on generic stock robotics imagery.

---

# 29. Hero Imagery

The homepage hero will primarily use the Three.js robot experience.

Real photography can later be incorporated into:

- Secondary homepage sections.
- Competition pages.
- Project pages.
- Team pages.
- Gallery.

The hero should not become dependent on having a real team photograph at launch.

---

# 30. Three.js Visual Style

The robot should use materials that feel physically believable.

Preferred characteristics:

- Matte industrial surfaces.
- Brushed metal where appropriate.
- Rubber.
- Dark polymer.
- Controlled metallic highlights.
- Small status LEDs.
- Functional sensor components.

Avoid:

- Chrome everywhere.
- Neon materials.
- Sci-fi holograms.
- Floating parts.
- Unrealistic glowing surfaces.

---

# 31. Three.js Lighting

Lighting should communicate depth and engineering detail.

Use:

- Controlled key light.
- Soft fill.
- Subtle rim light.
- Environmental lighting where appropriate.

Avoid:

- Overly dramatic movie lighting.
- Rainbow lighting.
- Excessive bloom.
- Neon illumination.

The robot should remain readable.

---

# 32. Three.js Environment

The environment should be minimal.

Potential elements:

- Dark laboratory-like background.
- Subtle floor plane.
- Soft shadows.
- Minimal technical grid where appropriate.

Do not create a fake complex factory scene simply to make the hero look impressive.

The robot is the subject.

---

# 33. Three.js Technical Labels

Optional technical labels may identify meaningful components.

Examples:

```text id="7l4jdy"
LiDAR
Perception

Jetson
Compute

STM32
Control
```

These should only be displayed if:

- The corresponding component exists on the conceptual model.
- The information is accurate.
- The labels improve understanding.

They should never be fabricated simply for visual effect.

---

# 34. Photography Treatment

When real photography becomes available, avoid heavy filters.

Images should generally preserve natural colors.

Potential treatments:

- Slight contrast.
- Controlled cropping.
- Consistent aspect ratios.
- Subtle overlays where needed for text.

Do not apply a universal "futuristic blue" filter.

---

# 35. Gallery Visual Language

The gallery should allow visual variety.

Do not force every image into identical cards.

Possible layouts:

- Masonry-inspired composition.
- Featured image.
- Large/small image rhythm.
- Competition galleries.
- Project galleries.

However, accessibility and responsive behavior take priority over artistic layouts.

---

# 36. Sponsor Visual Language

Sponsor presentation should be restrained.

Preferred:

```text id="7v3tdg"
SPONSORS

[Logo]    [Logo]    [Logo]

Strategic Partners

[Logo]    [Logo]

Technology Partners
```

Avoid:

- Giant logo carousels.
- Flashing logos.
- Random logo sizes.
- Excessive gradients.
- Promotional badges everywhere.

Sponsor logos should be visually balanced while respecting their actual brand assets.

---

# 37. Technical Diagrams

Technical diagrams can be used where they explain real systems.

Examples:

- Robot architecture.
- Software architecture.
- Sensor pipeline.
- Navigation system.
- PCB/system architecture.

They should be:

- Accurate.
- Simple.
- Readable.
- Consistent with the design system.

Do not create fake technical diagrams.

---

# 38. Decorative Engineering Motifs

Engineering-inspired decoration may be used sparingly.

Possible motifs:

- Grid lines.
- Coordinate indicators.
- Measurement marks.
- Small technical labels.
- Version identifiers.
- Section numbering.

These should remain subtle.

Do not turn every page into a blueprint.

---

# 39. Section Numbering

Sections may optionally use technical numbering.

Example:

```text id="z2f8qk"
01 / THE TEAM
02 / WHAT WE BUILD
03 / COMPETITION
04 / PROJECTS
```

This can reinforce the engineering identity.

It should not be used everywhere.

---

# 40. Navigation

The navigation should be visually minimal.

Desktop:

- Logo/wordmark.
- Primary navigation.
- Language switcher.
- Theme control if provided.
- Primary CTA where appropriate.

Mobile:

- Compact header.
- Clear menu.
- Language switch.
- Essential actions.

The header should not consume excessive vertical space.

---

# 41. Language Switcher

The language switcher should clearly communicate:

> EN / فارسی

or an equally clear representation.

Avoid flags as the only language indicator.

Changing language should:

- Preserve the current route where possible.
- Preserve the relevant content context.
- Update direction.
- Update typography.
- Update document language.

---

# 42. Theme Switcher

If light mode is exposed publicly, the switcher should clearly indicate:

- Current theme.
- Available themes.

It should not create unnecessary complexity.

The system should respect system preference where appropriate while maintaining the project's dark-first preference.

---

# 43. Forms

Forms should feel like part of the same product.

Required characteristics:

- Clear labels.
- Strong focus states.
- Appropriate validation.
- Helpful errors.
- Loading states.
- Success states.
- Mobile-friendly inputs.
- RTL support.

Avoid placeholder-only labels.

---

# 44. Toast Notifications

React Toastify should be used for appropriate transient application feedback.

Examples:

- Successful contact submission.
- Successful admin action.
- Upload completion.
- Delete confirmation result.
- Save completion.
- Authentication errors.

Toasts should not replace inline validation or important permanent information.

---

# 45. Responsive Visual Behavior

The design must intentionally adapt between screen sizes.

Desktop may use:

- Asymmetric layouts.
- Large 3D composition.
- Multi-column content.

Mobile may use:

- Stacked content.
- Simplified 3D interaction.
- Reduced decorative elements.
- Larger touch targets.
- Simplified navigation.

Do not simply shrink desktop components.

---

# 46. Mobile 3D Strategy

The Three.js hero must be optimized for mobile.

Potential behavior:

- Reduced model complexity.
- Reduced rendering resolution.
- Reduced interaction.
- Limited animation.
- Static fallback on extremely constrained devices if necessary.

The mobile user must not experience:

- Excessive battery usage.
- Severe frame drops.
- Unusable scrolling.
- Delayed page content.

---

# 47. Responsive Typography

Typography should scale deliberately.

Large desktop hero text should not simply overflow or become disproportionately large on mobile.

The design should maintain:

- Hierarchy.
- Readability.
- Visual impact.

---

# 48. Responsive Navigation

The mobile navigation should prioritize simplicity.

Avoid overly complicated nested menus.

Primary sections should remain easy to reach.

Secondary content can be organized under logical groups.

---

# 49. Responsive Tables

Technical specifications and administrative tables must work on mobile.

Possible approaches:

- Horizontal scrolling.
- Responsive row layouts.
- Condensed views.

Do not allow tables to break the page width.

---

# 50. Responsive Gallery

Gallery layouts should adapt naturally.

Desktop may use:

- Multi-column layouts.

Mobile may use:

- One or two columns.

Images should maintain appropriate aspect ratios.

---

# 51. Responsive Sponsor Sections

Sponsor logos should remain readable without becoming oversized.

The layout should adapt based on:

- Number of sponsors.
- Tier.
- Screen width.

Do not force a fixed number of logos per row.

---

# 52. Responsive Admin Panel

The admin panel is also required to work on mobile, even though desktop/laptop is the primary admin environment.

The admin must remain usable for:

- Content editing.
- Reviewing submissions.
- Uploading media.
- Managing members.
- Managing projects.

Complex tables may use horizontal scrolling where necessary.

---

# 53. Logo Placeholder

Until the final team logo exists, the site should use a temporary typographic identity.

Example:

> **IUST Robotics**

The placeholder must not attempt to imitate a future logo.

It should be simple enough that replacing it later is straightforward.

---

# 54. Future Logo Integration

The final identity should be able to introduce:

- Logo mark.
- Wordmark.
- Symbol.
- Brand colors.
- Typography.

without requiring:

- New page layouts.
- New database architecture.
- New routing.
- Component rewrites.

Brand assets should therefore be centralized.

---

# 55. Favicon and Metadata

The temporary identity should support:

- Favicon.
- Browser metadata.
- OpenGraph image.
- Social sharing image.

When the final logo is available, these should be replaceable centrally.

---

# 56. Brand Asset Management

Brand assets should not be scattered across components.

Centralize:

- Logo.
- Wordmark.
- Favicon.
- Social image.
- Theme icons.
- Brand colors.

The implementation should make future branding changes inexpensive.

---

# 57. Design Tokens

The final implementation should use semantic tokens such as:

```text id="j7jgnc"
--color-background
--color-surface
--color-surface-elevated
--color-border
--color-text-primary
--color-text-secondary
--color-text-muted
--color-accent
--color-accent-strong
--color-success
--color-warning
--color-error
```

Do not scatter raw hexadecimal values throughout the codebase.

---

# 58. Component Consistency

Components should be designed as part of one visual system.

For example:

- Buttons should share interaction principles.
- Inputs should share focus behavior.
- Cards should share spacing logic.
- Typography should use shared tokens.
- Toasts should match the product.
- Modals should use consistent motion.

Avoid designing every page as an independent mini-site.

---

# 59. Visual Restraint

When choosing between:

> a simple solution that communicates clearly

and:

> an impressive visual effect that adds little information

choose the simple solution.

The visual identity should come from **composition and craftsmanship**, not quantity of effects.

---

# 60. Final Visual Principle

The visual identity of IUST Robotics should feel like:

> **A serious robotics laboratory built by ambitious engineers.**

It should combine:

- The precision of engineering.
- The energy of competition.
- The sophistication of premium product design.
- The humanity of a student robotics club.

The website should never look like it is trying to prove that it is futuristic.

It should look like it is **already building the future**.

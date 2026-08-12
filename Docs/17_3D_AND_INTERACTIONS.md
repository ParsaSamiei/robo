# `10_3D_AND_INTERACTIONS.md`

## 1. Purpose

This document defines the 3D, motion, animation, interaction, and visual behavior of the robotics club website.

The goal is to create a website that feels:

> **Engineered, premium, interactive, and memorable.**

It must **not** feel like:

- An AI-generated website.
- A generic SaaS landing page.
- A template with excessive gradients.
- A gaming website.
- A WebGL technology demo.
- A page filled with random floating objects.

The interaction design should support the robotics identity rather than compete with the content.

---

# 2. Core Interaction Philosophy

The website should follow:

```text id="0yp7i6"
Engineering precision
        +
Premium restraint
        +
Meaningful interaction
        +
Subtle motion
```

The visitor should notice that the site is interactive, but should not constantly think:

> "This website has a lot of animations."

---

# 3. Visual Direction

The overall visual language should combine approximately:

```text id="n2o8wh"
60% Dark technical
30% Robotics / engineering laboratory
10% Premium / Apple-like
```

The visual language should communicate:

- Precision.
- Machinery.
- Engineering.
- Technical depth.
- Modern robotics.
- Student innovation.
- Professional ambition.

---

# 4. 3D Technology

The primary 3D technology is:

```text id="3w9xw4"
Three.js
```

Prefer using it through the React/Next.js ecosystem where appropriate, such as React Three Fiber.

The 3D scene must be a real interactive 3D scene.

Do **not** create a fake robot using:

```text id="gih6gl"
HTML divs
CSS shapes
SVG pretending to be 3D
A flat pre-rendered image
```

---

# 5. Hero Robot

The homepage hero should contain a visually impressive industrial robotic system.

The robot should feel inspired by real industrial robotics.

Potential visual characteristics:

```text id="apc9n1"
Industrial robotic arm
Multiple articulated joints
End effector
Mechanical housings
Visible joints
Cables / routing details
Industrial base
Mechanical fasteners/details
```

It should not look like a toy.

---

# 6. Robot Style

The robot should be:

- Industrial.
- Technical.
- Clean.
- Modern.
- Slightly futuristic.
- Physically believable.

Avoid:

- Cartoon robots.
- Humanoid robots.
- Cute robots.
- Excessively futuristic spacecraft aesthetics.
- Generic AI-generated "robot" imagery.

---

# 7. Relationship to SML

Although the club is a general robotics club, the current focus is SML.

Therefore the hero robot may take inspiration from industrial automation and manufacturing environments.

However:

> **Do not make the entire website look like an SML-only team website.**

The 3D robot represents the club's engineering identity.

---

# 8. 3D Composition

The robot should occupy a significant portion of the hero without covering the main message.

Desktop target:

```text id="k0x6gp"
┌─────────────────────────────────────────────┐
│                                             │
│   TEXT                         ROBOT        │
│                                             │
│   CTA                          3D           │
│                                             │
└─────────────────────────────────────────────┘
```

The exact composition can change depending on the final visual design.

---

# 9. Hero Camera

The camera should have a carefully designed default angle.

It should show enough of the robot to communicate:

- Scale.
- Articulation.
- Mechanical complexity.

Avoid placing the camera directly in front of the robot like a product catalog image.

A slightly cinematic three-quarter perspective is preferred.

---

# 10. Robot Animation

The robot should have subtle idle motion.

For example:

```text id="4k9jbi"
Joint micro-movement
Slow mechanical repositioning
Subtle servo-like motion
Very small end-effector movement
```

The animation should feel like a machine waiting for instructions.

---

# 11. No Constant Aggressive Animation

Do not continuously rotate the entire robot.

Avoid:

```text id="o4s4hv"
360° spinning robot
Constant shaking
Fast arm movement
Large camera orbit
```

The robot should feel physically grounded.

---

# 12. Mouse Interaction

On desktop, mouse movement can influence the scene.

Possible behavior:

```text id="c1qf8e"
Mouse movement
      ↓
Very subtle camera movement
      +
Small robot orientation response
```

The movement should be restrained.

The website should never feel like the visitor is controlling a video game.

---

# 13. Hover Interaction

Hovering over the robot may produce subtle effects.

Possible examples:

```text id="q9t4y2"
Joint highlights
Small camera adjustment
Material response
Very subtle mechanical movement
```

Avoid making every component glow.

---

# 14. Scroll Interaction

Scroll can influence the 3D scene.

For example:

```text id="d4ml19"
Hero
 ↓
Scroll
 ↓
Camera slowly changes
 ↓
Robot changes pose
 ↓
Hero transitions into engineering content
```

This can create a strong opening sequence.

However, the interaction must remain optional and lightweight.

---

# 15. Scroll Animation Principle

Animations should communicate transitions.

Good:

```text id="l8fd6c"
Section enters
→
content becomes visible
→
visual establishes context
```

Bad:

```text id="n5rc3a"
Every element flies in from a different direction.
```

---

# 16. Section Reveal

Sections can use subtle reveal animations.

Recommended:

```text id="09t1cx"
opacity
+
small translate
+
optional blur reduction
```

Example conceptual transition:

```text id="6v7ry9"
opacity: 0
transform: translateY(20px)

↓

opacity: 1
transform: translateY(0)
```

Keep the duration short and natural.

---

# 17. Staggered Animation

Cards can use slight staggered entrance animation.

Example:

```text id="5n6z0k"
Card 1 → 0ms
Card 2 → 60ms
Card 3 → 120ms
Card 4 → 180ms
```

Do not use long delays.

---

# 18. Page Transitions

Page transitions should be subtle.

Avoid full-screen theatrical transitions.

A short transition can be used when navigating between major pages.

---

# 19. Navigation Interaction

The navigation should feel polished.

Potential behavior:

```text id="4x7oih"
At top:
Transparent / integrated with hero

After scrolling:
Slight background
+
subtle border
+
backdrop treatment
```

Do not create an oversized floating navigation panel.

---

# 20. Navigation Hover

Navigation items may use:

- Small color transition.
- Underline.
- Accent indicator.
- Subtle background.

Avoid large animated pills for every navigation item.

---

# 21. Buttons

Buttons should feel tactile but restrained.

Primary buttons may have:

```text id="hcvq3w"
Color transition
Subtle shadow
Small translate
```

On hover:

```text id="3l7lzr"
transform: translateY(-1px)
```

On press:

```text id="2uk69t"
transform: translateY(0)
```

Avoid exaggerated scaling.

---

# 22. Cards

Cards should have subtle interaction.

Possible:

```text id="3y3hqu"
Hover
 ↓
slight elevation
+
border adjustment
+
image movement
```

Do not make cards bounce.

---

# 23. Project Cards

Project cards can have a slightly stronger interaction because they represent engineering work.

Possible:

```text id="x5cb2v"
Image → subtle zoom
Card → slight elevation
Arrow → small movement
```

---

# 24. Member Cards

Member cards should remain human and professional.

Hover can show:

```text id="0ukc5b"
Photo enhancement
Social links
Small accent
```

Do not turn member portraits into flashy interactive objects.

---

# 25. Robot Cards

Robot cards can have slightly more technical interaction.

Possible:

```text id="s6f1dd"
Image movement
Specification preview
Technical accent
```

---

# 26. Gallery Interaction

Gallery is one place where more interaction is appropriate.

Use:

```text id="7y0mvh"
Hover
→ image preview

Click
→ lightbox
```

Lightbox must support:

- Previous.
- Next.
- Close.
- Keyboard navigation.
- Captions.

---

# 27. 3D Mobile Behavior

The 3D scene must be adapted for mobile.

Do **not** simply shrink the desktop scene.

Possible mobile composition:

```text id="8hcz0g"
Text
↓
Robot
↓
CTA
```

or an integrated side composition depending on viewport.

---

# 28. Mobile 3D Performance

On mobile:

- Reduce polygon complexity.
- Reduce shadow quality.
- Reduce particle count.
- Reduce animation frequency.
- Reduce post-processing.
- Reduce interaction complexity.

The mobile site must remain responsive.

---

# 29. Low-Power Devices

The site should detect or respond to limited rendering capability where practical.

If the device cannot reasonably render the 3D scene:

```text id="j7pp7u"
3D scene
↓
Fallback visual
```

The page must remain fully functional.

---

# 30. Reduced Motion

Respect:

```text id="5qg6q3"
prefers-reduced-motion
```

When enabled:

- Disable unnecessary animations.
- Reduce 3D motion.
- Remove scroll-driven animation.
- Remove aggressive hover transitions.

The content must remain accessible.

---

# 31. 3D Fallback

A fallback can be:

- High-quality static robot image.
- Lightweight rendered image.
- Simplified 3D scene.

The fallback should still feel intentional.

It must not look like an error.

---

# 32. 3D Loading

The 3D scene may take time to load.

During loading, show a designed placeholder.

For example:

```text id="p6yepv"
Dark background
+
subtle technical grid
+
small loading indicator
```

Avoid a generic browser spinner.

---

# 33. 3D Asset Loading

3D assets should be optimized.

Preferred format:

```text id="zzc2wt"
GLB / glTF
```

Avoid loading unnecessarily large assets.

---

# 34. 3D Asset Structure

Where practical, the robot model should have named components.

For example:

```text id="96n1xz"
base
joint_01
joint_02
joint_03
joint_04
joint_05
joint_06
end_effector
```

This allows meaningful animation and interaction.

---

# 35. Robot Materials

Materials should feel physically plausible.

Possible materials:

```text id="thw7h6"
Painted metal
Machined metal
Rubber
Glass
Plastic
Metallic components
```

Avoid excessive metallic reflections.

---

# 36. Lighting

Lighting should resemble a controlled engineering environment.

Possible setup:

```text id="g3j7zi"
Key light
Fill light
Rim light
Ambient/environment lighting
```

The robot should remain readable against the dark interface.

---

# 37. Background

The 3D background should integrate with the site's dark visual system.

Potential elements:

```text id="p3d7gv"
Very subtle grid
Soft environmental gradient
Technical lines
Minimal atmospheric lighting
```

Avoid:

```text id="c8sgb7"
Neon cyberpunk city
Random particles everywhere
Purple AI gradients
```

---

# 38. Industrial Details

Small details can make the robot feel substantially more realistic.

Examples:

```text id="o6k8jr"
Bolts
Joint housings
Cable routing
Mechanical seams
Mounting plates
End-effector hardware
Sensor mounts
```

These details should be subtle.

---

# 39. Interactive Technical Callouts

An optional advanced interaction:

Hovering/clicking specific robot components could display small technical labels.

For example:

```text id="9f3r4v"
LiDAR
Camera
Jetson
Motor
Manipulator
```

This should only be implemented if it improves the experience.

Do not add it just because Three.js makes it possible.

---

# 40. Technical HUD

A small technical overlay may be used in the hero.

Example:

```text id="x2sjw8"
SYSTEM
ONLINE

CONTROL
ROS 2

VISION
YOLO

NAVIGATION
SLAM
```

This must be extremely subtle.

It should not make the website look like a video game HUD.

---

# 41. Engineering Data Aesthetic

Small technical labels can reinforce the engineering identity.

Examples:

```text id="s7c0i8"
SYSTEM 01
PROJECT 03
SML 2026
ROS 2
```

Use them as visual accents, not as fake telemetry.

---

# 42. No Fake Telemetry

Do not display fake:

```text id="tqby9x"
CPU: 72%
Voltage: 24.1V
Temperature: 37°C
Latency: 12ms
```

unless these values actually come from a real system.

The site should never pretend to show live robot telemetry when it does not.

---

# 43. Scroll-Based Engineering Story

A possible homepage interaction sequence:

```text id="0z9n4p"
Hero
  ↓
Club introduction
  ↓
Engineering disciplines
  ↓
Projects
  ↓
Robot
  ↓
Competition
  ↓
Team
  ↓
Join
```

Motion should reinforce this narrative.

---

# 44. Engineering Discipline Interaction

The four team areas may use subtle interactive presentation:

```text id="z8oj0j"
Mechanical
Hardware
Software
Management
```

Hovering can reveal a brief description.

Avoid turning this into a giant animated dashboard.

---

# 45. Competition Interaction

Competition sections may use a timeline.

Example:

```text id="g5b2p9"
2026
  │
  ├── Team formed
  │
  ├── Robot development
  │
  ├── Testing
  │
  └── SML
```

This should use real data from the database.

---

# 46. Team Interaction

Team pages may use filtering and subtle sorting animations.

When switching:

```text id="y2q5l8"
All
Mechanical
Hardware
Software
Management
```

cards can transition smoothly.

Avoid slow animations that make filtering feel sluggish.

---

# 47. Search Interaction

If search is implemented, results should update quickly.

Use subtle transitions rather than page-wide animations.

---

# 48. Modal Interaction

Modals should:

- Fade in quickly.
- Slightly scale into position.
- Lock background scrolling.
- Support Escape.
- Support keyboard navigation.
- Respect RTL.

---

# 49. Toast Interaction

React Toastify should be used for important user feedback.

Examples:

```text id="c2n7ox"
Form submitted
Message sent
Application received
Content saved
Upload completed
Error occurred
```

Do not use toast notifications for every small interaction.

---

# 50. Form Success

Successful form submission should have:

```text id="f2g0p1"
Toast
+
appropriate inline success state
```

depending on the form.

---

# 51. Error Interaction

Errors should be clear and actionable.

Avoid:

```text id="8y9b0h"
Something went wrong!!!
```

Prefer:

> We couldn't submit your application. Please check your connection and try again.

---

# 52. Hover vs Touch

Hover interactions must never be required for understanding content.

Everything important must be accessible through:

- Click.
- Tap.
- Keyboard.
- Normal scrolling.

---

# 53. Touch Devices

Do not rely on:

```text id="4c8m5y"
:hover
```

to reveal essential information.

Mobile users must receive equivalent information without hover.

---

# 54. Cursor Effects

Custom cursors are optional.

If used, they must be extremely subtle.

Avoid:

```text id="k2q7o8"
Large animated cursor
Trailing particles
Cursor distortion
```

These quickly make the website feel gimmicky.

---

# 55. Magnetic Buttons

Magnetic button effects are optional and should only be used on desktop.

If implemented:

- Keep movement tiny.
- Disable on touch devices.
- Disable with reduced motion.

---

# 56. Parallax

Parallax may be used sparingly.

Recommended use:

```text id="5oh4ez"
Large hero visual
Subtle background layer
```

Do not make entire pages scroll at different speeds.

---

# 57. Decorative Motion

Decorative animation should never distract from:

```text id="3w0f0d"
Team
Projects
Robots
Competitions
Join
```

If removing an animation makes the page clearer, remove it.

---

# 58. Premium Section

Some sections can use a more Apple-like visual language.

Best candidates:

```text id="q1q9fi"
Sponsors
Selected projects
Hero
```

Characteristics:

- Large whitespace.
- Strong typography.
- Minimal interface.
- High-quality imagery.
- Slow, subtle motion.

---

# 59. Robotics Laboratory Section

Other sections can feel more like a robotics lab.

Use:

```text id="9h2k8e"
Technical labels
Grid systems
Engineering diagrams
Measurements
Component references
```

But do not fake technical data.

---

# 60. Interaction Hierarchy

The interaction intensity should roughly follow:

```text id="p7h9x0"
Hero                  █████
Projects              ████
Robots                ████
Gallery               ████
Competition           ███
Team                  ██
Sponsors              ██
About                 ██
Contact               █
```

This prevents the whole website from competing for attention.

---

# 61. Performance Budget

3D and animation must never justify a slow website.

Prioritize:

```text id="j3r6pf"
Content
↓
Performance
↓
Accessibility
↓
Interaction complexity
```

not:

```text id="h0c8q7"
Visual effects
↓
Performance
```

---

# 62. GPU Considerations

Avoid unnecessary:

- Multiple WebGL canvases.
- Heavy post-processing.
- High-resolution textures.
- Excessive transparent materials.
- Large particle systems.

Prefer one carefully optimized hero scene.

---

# 63. Three.js Canvas

The hero should preferably use a dedicated canvas rather than multiple 3D canvases across the website.

Other pages should only use 3D where there is a clear reason.

---

# 64. Do Not Overuse Three.js

Three.js is primarily for:

> **The wow factor and engineering identity.**

It is not required for:

- Every project card.
- Every page.
- Every section.
- Background decorations.

---

# 65. Animation Timing

Use consistent timing tokens.

Example:

```text id="4jv1r0"
Fast:
150ms

Normal:
250ms

Slow:
500–800ms
```

Large cinematic transitions may exceed this when justified, but should remain rare.

---

# 66. Easing

Use natural easing.

Preferred:

```text id="3q0t1m"
ease-out
cubic-bezier
spring-like transitions where appropriate
```

Avoid linear movement for UI interactions unless technically appropriate.

---

# 67. Motion Consistency

The same interaction should behave consistently across the site.

For example:

```text id="q0l2e4"
All cards
→
similar hover behavior
```

rather than each card having a completely different animation.

---

# 68. Visual Restraint

The website should be eye-catching through:

```text id="0j5q6r"
Composition
Typography
3D quality
Photography
Spacing
Content
Motion
```

not through:

```text id="h7k4q3"
Gradients everywhere
Glowing borders
Particles
Animations
```

---

# 69. Anti-AI-Generated Design Rules

The final website must avoid common visual patterns associated with generic AI-generated web designs.

Do not default to:

- Purple/blue gradient backgrounds.
- Giant glowing text.
- Excessive glassmorphism.
- Random floating blobs.
- Generic humanoid robot illustrations.
- Stock "AI robot" imagery.
- Excessive rounded cards.
- Every section inside a card.
- Excessive gradient buttons.
- Fake futuristic dashboards.

---

# 70. Authenticity

Whenever visual material exists, prioritize:

```text id="p4g6k1"
Real team photos
Real robots
Real PCB designs
Real CAD renders
Real testing
Real competitions
Real workshops
```

over generic stock imagery.

---

# 71. Future 3D Expansion

The architecture should allow future interactive models such as:

```text id="w8zq0p"
Robot viewer
CAD viewer
Exploded robot view
Interactive sensor map
```

but these should be added only when actual assets and content justify them.

---

# 72. 3D Accessibility

The 3D scene is decorative/supporting content.

Critical information must always be available as normal HTML content.

A user who cannot see or interact with WebGL must still understand:

- What the club is.
- What it builds.
- What it does.
- How to join.

---

# 73. 3D Failure

If WebGL fails:

```text id="q0b7sw"
Website continues normally.
```

There must be no:

```text id="3x7z7k"
blank hero
broken canvas
uncaught WebGL error
```

---

# 74. Interaction Testing

The implementation must test:

```text id="8p0x4n"
Desktop mouse
Trackpad
Touchscreen
Mobile
Keyboard
Reduced motion
Low-power device
WebGL unavailable
Slow network
```

---

# 75. Final Interaction Principle

The website should leave the visitor thinking:

> **"These students actually build robots."**

not:

> **"Someone made a website with a lot of effects."**

The 3D robot, motion, and interaction system exists to communicate the **engineering culture of the club**, not to become the product itself.

# IUST Robotics Website

## Product Vision & Experience Strategy

**Document:** `01_PRODUCT_VISION.md`
**Project:** IUST Robotics
**Status:** Product definition
**Audience:** Product designers, developers, AI coding agents, future team maintainers

---

# 1. Product Vision

The IUST Robotics website should be the **official digital home of the robotics club**.

It should present the organization as a serious engineering group while preserving the energy and curiosity of a student robotics club.

The central product idea is:

> **Show the engineering behind the robots, the people behind the engineering, and the journey behind the team.**

The website should not merely say that IUST Robotics builds robots.

It should allow visitors to **see evidence of it**.

That evidence comes from:

- Projects.
- Robots.
- Competitions.
- Engineering disciplines.
- Team members.
- Technical technologies.
- Milestones.
- Real photographs.
- Videos.
- Articles.
- Results.
- Sponsors.

The website should therefore behave more like a **living engineering portfolio and organizational archive** than a traditional university club website.

---

# 2. Product Personality

The product should feel:

### Precise

Interfaces should have clear hierarchy and alignment.

### Technical

The design should communicate engineering without relying on meaningless futuristic decoration.

### Confident

The website should not apologize for being a new team.

### Honest

The website must never exaggerate achievements or capabilities.

### Curious

The site should communicate that the team is constantly learning and experimenting.

### Ambitious

The visual and written language should make it clear that the team intends to grow.

### Human

Team members and their work should remain visible.

### Premium

Important information should be presented with the same care expected from a high-quality technology organization.

---

# 3. The Central Story

The website should communicate a continuous story:

```text id="v4rj6f"
PEOPLE
  ↓
ENGINEERING
  ↓
PROJECTS
  ↓
ROBOTS
  ↓
COMPETITIONS
  ↓
RESULTS
  ↓
LEARNING
  ↓
GROWTH
```

This relationship should be reflected throughout the site.

For example:

A visitor discovers a **competition**.

The competition shows the **robot** used.

The robot links to its **projects**.

The projects show the **technologies** used.

Those technologies link to the **team members** who worked on them.

This creates a connected experience rather than isolated pages.

---

# 4. Primary Experience Goal

Within the first few seconds, a visitor should understand:

> **IUST Robotics is an engineering-focused robotics club at IUST building autonomous robotic systems and competing in real robotics challenges.**

The visitor should not need to:

- Open the About page.
- Read a long mission statement.
- Search for the competition.
- Navigate through several pages.

The homepage must communicate the essential identity immediately.

---

# 5. Audience Experience

Different audiences should receive different information priorities from the same underlying website.

---

## 5.1 Sponsor Experience

The sponsor should think:

> "This is a serious engineering team that knows what it is doing."

The sponsor journey should emphasize:

1. Team identity.
2. Engineering capabilities.
3. Current competition.
4. Projects.
5. Robots.
6. Team.
7. Existing sponsors.
8. Contact.

Sponsors should be able to reach meaningful information within a few clicks.

The website should never feel like it is begging for sponsorship.

Instead, it should communicate:

> **Here is what we build. Here is what we have achieved. Here is what we are working toward. Here is how we can work together.**

---

# 6. Competition Organizer Experience

A competition organizer should quickly find:

- Team identity.
- Current league.
- Competition history.
- Robot information.
- Team members.
- Results.
- Contact information.

The competition section should therefore prioritize factual information and clarity.

Avoid unnecessary marketing language on competition pages.

---

# 7. Robotics Team Experience

Other robotics teams should be able to explore the technical side of the club.

They should find:

- Robots.
- Projects.
- Technologies.
- Competition participation.
- Engineering disciplines.
- Technical articles.
- GitHub links.

This audience should feel that the website represents a real engineering organization rather than simply a student club.

---

# 8. General Public Experience

Technical depth should never prevent non-engineers from understanding the organization.

The site should explain complex concepts progressively.

For example:

> **SLAM**

can be introduced with a short understandable explanation before optionally providing deeper technical information.

The website should support both:

> "I don't know much about robotics."

and:

> "I am an engineer and want technical details."

without creating two separate websites.

---

# 9. Potential Member Experience

A potential member should be able to understand:

- What the team does.
- What departments exist.
- What technologies are used.
- What projects are active.
- Who the members are.
- What kind of work they could contribute to.
- How to contact the team.

The site should make joining feel like an opportunity to **build something**, not simply join a student organization.

---

# 10. The "Engineering First" Principle

Engineering should be the dominant conceptual theme of the website.

This means the website should prioritize:

- Real systems.
- Real projects.
- Real technology.
- Real people.
- Real competition.
- Real progress.

It should not prioritize:

- Decorative technology.
- Empty marketing language.
- Generic futuristic visuals.
- Artificial statistics.
- Imaginary products.

---

# 11. Showing, Not Claiming

The website should follow the principle:

> **Show evidence instead of making claims.**

Instead of:

> "We are an innovative robotics team."

Prefer:

> Project → technical description → technology → team members → results.

Instead of:

> "We build advanced autonomous systems."

Show:

> Robot → LiDAR → SLAM → ROS 2 → navigation project → competition.

This principle should influence both copywriting and visual design.

---

# 12. First-Year Positioning

The club is currently new.

The product should therefore avoid trying to look like a decades-old organization.

The website should communicate:

> **This is where the journey begins.**

A new team can still look professional.

Professionalism comes from:

- Good engineering.
- Clear communication.
- Strong design.
- Accurate information.
- Consistent presentation.

It does not require pretending to have dozens of awards.

---

# 13. Growth Narrative

The website should become more valuable over time.

At launch, it may contain:

- A small number of members.
- One major competition.
- Few projects.
- Limited gallery content.
- Few achievements.

That is acceptable.

The website should gradually evolve:

```text id="z0e7na"
YEAR 1
Formation
First robot
First competition

        ↓

YEAR 2
More projects
More members
More competitions

        ↓

YEAR 3
Additional leagues
Sponsors
Research
Alumni

        ↓

FUTURE
Established robotics organization
```

The architecture must support this naturally.

---

# 14. Visual Storytelling

The website should tell the story visually, but it should not depend on having hundreds of images.

The team currently has limited media.

Therefore the design should work with:

- One strong 3D hero.
- Carefully selected technical illustrations.
- Typography.
- Data.
- Diagrams.
- Content hierarchy.
- Real photographs when available.

When real photography becomes available, it should become increasingly prominent.

---

# 15. Three.js as a Product Element

Three.js is not being used simply because it is technically impressive.

Its purpose is to create a strong first impression of the club's engineering identity.

The 3D robot should communicate:

- Industrial robotics.
- Autonomous systems.
- Sensors.
- Engineering.
- Manufacturing.
- Precision.

It should feel like a **product visualization**, not a game.

The model should be visually credible and restrained.

---

# 16. 3D Should Not Define the Entire Website

The website must remain valuable if the 3D component is disabled.

Important content must never depend exclusively on WebGL.

If WebGL is unavailable:

- The site should still work.
- The hero should still communicate the team identity.
- Content should remain accessible.
- Navigation should remain functional.

A static or simplified fallback should exist where appropriate.

---

# 17. Motion Design

Motion should reinforce hierarchy.

Good examples:

- Content entering as it becomes relevant.
- Subtle navigation transitions.
- Hover feedback.
- Robot interaction.
- Image transitions.
- Section transitions.

Bad examples:

- Constant floating elements.
- Infinite particle animations.
- Every card moving independently.
- Excessive parallax.
- Long page transitions.
- Animations that delay content.

The user should feel:

> **"This is polished."**

not:

> **"This website keeps moving."**

---

# 18. Interaction Principles

Interactions should have:

### Purpose

The interaction communicates something.

### Feedback

The user understands that an action occurred.

### Restraint

The interface doesn't overreact.

### Consistency

Similar interactions behave similarly.

### Accessibility

Important functionality does not require animation or mouse interaction.

---

# 19. Premium Design Principle

Premium does not mean:

- More gradients.
- More animation.
- More 3D.
- More shadows.
- More effects.

Premium means:

- Excellent typography.
- Strong spacing.
- Clear hierarchy.
- Precise alignment.
- High-quality transitions.
- Good photography.
- Consistent components.
- Good performance.
- Attention to small details.

The website should feel premium through **craftsmanship**.

---

# 20. Dark Theme

Dark mode is the preferred default visual direction.

The dark theme should feel like:

> An engineering laboratory at night.

rather than:

> A gaming website.

Dark surfaces should provide enough tonal separation for:

- Navigation.
- Content sections.
- Cards.
- Forms.
- Code/technical content.
- Tables.
- Images.

Pure black should not automatically be used everywhere.

The palette should contain multiple carefully controlled surface levels.

---

# 21. Light Theme

A light theme should also be supported.

The light theme should not simply invert the dark theme.

It should be independently designed to preserve:

- Contrast.
- Hierarchy.
- Brand consistency.
- Accessibility.
- Premium appearance.

Both themes should use the same semantic design tokens.

---

# 22. Typography

Typography is one of the primary tools for creating the site's visual identity.

Typography should communicate:

- Engineering.
- Precision.
- Modernity.
- Professionalism.

The site should avoid excessive use of novelty/futuristic fonts.

The typography system must support:

- English.
- Persian.
- Numbers.
- Technical terminology.
- Code-like content where appropriate.

The Persian typeface must be chosen with equal care to the English typeface.

---

# 23. Layout Philosophy

The layout should favor:

- Strong grids.
- Asymmetric compositions where useful.
- Generous spacing.
- Clear alignment.
- Large but controlled typography.
- Deliberate visual rhythm.

Avoid:

- Every section becoming a 3-column card grid.
- Endless centered content.
- Excessive boxed content.
- Repeated identical section layouts.

Different content types should have different visual treatments.

---

# 24. Cards

Cards should not be the default container for everything.

Use cards when the information genuinely benefits from grouping.

For example:

Good:

> Project summary

Potentially unnecessary:

> Every navigation item inside a rounded card.

Cards should have a purpose.

---

# 25. Data Visualization

Statistics should be simple and meaningful.

Do not create fake dashboards.

For example:

```text id="j1pjm4"
12
Team Members

5
Projects

2
Robots

1
Competition
```

is preferable to a decorative graph with meaningless values.

When the club eventually has meaningful data, more advanced visualization can be introduced.

---

# 26. Content Hierarchy

The website should generally move from:

> **Identity → Evidence → Details → Action**

For example:

### Homepage

Identity:

> IUST Robotics

Evidence:

> Current competition / projects / robot

Details:

> Engineering / team / achievements

Action:

> Explore / contact / join

This pattern should be adapted rather than mechanically repeated on every page.

---

# 27. Navigation Philosophy

Navigation should be simple enough to understand immediately.

Primary navigation should focus on major areas rather than exposing every database entity.

Potential conceptual navigation:

```text id="7q4wuj"
About
Team
Robots
Projects
Competitions
Journal
Gallery
Sponsors
Contact
```

The exact navigation will be finalized in the Information Architecture document.

The navigation should not become a sitemap.

---

# 28. Content Discoverability

Important content should be reachable through multiple meaningful paths.

For example:

A project can be reached through:

- Projects.
- Robot page.
- Competition page.
- Technology page.
- Team member page.

This creates a connected knowledge system.

---

# 29. Cross-Linking

Relevant entities should link to one another.

Example:

```text id="9x7s4e"
Project
 ↓
Robot
 ↓
Competition
 ↓
Team members
 ↓
Technologies
 ↓
GitHub
```

This is useful for:

- Users.
- SEO.
- Content discovery.
- Future growth.

---

# 30. Content Density

The website should avoid both extremes.

### Too little

> Beautiful website with almost no information.

### Too much

> Technical wiki that is difficult for sponsors and the public to understand.

The desired experience is:

> **High information value with strong visual hierarchy.**

---

# 31. Sponsor Experience

The sponsor experience deserves special design treatment.

Sponsor presentation should feel:

- Quiet.
- Premium.
- Trustworthy.
- Organized.

Avoid:

- Huge logo walls.
- Flashing sponsor logos.
- Excessive animations.
- Competitive ranking of sponsors unless intentionally defined.
- Distracting sponsor carousels.

A sponsor should feel that being associated with the team is prestigious.

---

# 32. Technical Content Experience

Technical content should use progressive disclosure.

Example:

```text id="y0q4ct"
Autonomous Navigation

Short explanation.

[Technical Details]

ROS 2
SLAM
LiDAR
Navigation
```

Then deeper content can provide:

- Architecture.
- Diagrams.
- Specifications.
- Development notes.
- GitHub repository.

This allows different audiences to engage at different depths.

---

# 33. Public vs Private Technical Information

Not every technical detail should be public.

The CMS must allow administrators to decide what is published.

For example:

```text id="x6v7ak"
Robot

Public:
✓ Dimensions
✓ Weight
✓ Sensors
✓ General architecture

Private:
✗ Detailed control algorithm
✗ Internal calibration values
✗ Competition-sensitive implementation
```

The frontend should only display explicitly published information.

---

# 34. Authentic Media Strategy

As the team grows, real media should gradually become one of the site's strongest assets.

Recommended future content:

- Robot photography.
- Workshop photography.
- Competition photography.
- Team portraits.
- PCB photographs.
- CAD renders.
- Testing footage.
- Competition videos.
- Robot close-ups.
- Build process photography.

The website should make adding this content easy through the admin panel.

---

# 35. Mobile Experience

The mobile version should not be considered a secondary "responsive fix."

Important mobile experiences include:

- Navigation.
- Hero.
- 3D robot.
- Projects.
- Team.
- Gallery.
- Competition pages.
- Contact forms.
- Sponsor sections.

The site must remain usable on narrow screens.

The 3D hero may be simplified on mobile when necessary for performance.

---

# 36. Accessibility and Motion Preferences

The product should respect users who prefer reduced motion.

When `prefers-reduced-motion` is enabled:

- Large transitions should be reduced.
- Nonessential motion should be disabled.
- The 3D experience should be simplified or paused where appropriate.

Essential information must remain accessible.

---

# 37. Error Experience

Errors should be designed rather than left to framework defaults.

Examples:

- Page not found.
- Failed content request.
- Failed image.
- Failed form submission.
- Authentication failure.
- Upload failure.

Errors should communicate:

1. What happened.
2. Whether the user can recover.
3. What action they can take.

---

# 38. Loading Experience

Loading states should preserve the site's visual language.

Avoid generic browser spinners everywhere.

Appropriate approaches include:

- Skeletons.
- Subtle placeholders.
- Progressive image loading.
- 3D loading state.
- Content-aware transitions.

Loading should not become another decorative animation.

---

# 39. Empty Content Experience

The club's early website may contain empty sections.

Empty content should be intentional.

For example, if there are no alumni:

The website may simply not display the alumni section.

If a page exists but has no published content, it should have a useful editorial state rather than:

> "No data found."

The admin should also be able to control whether certain sections are published.

---

# 40. Trust

Trust is especially important because sponsors and competition organizers are major audiences.

Trust should come from:

- Accurate information.
- Real team members.
- Real competition participation.
- Real projects.
- Real sponsors.
- Real links.
- Professional contact information.
- Consistent branding.
- Secure forms.
- Reliable website behavior.

Avoid exaggerated language.

---

# 41. Copywriting Philosophy

Copy should be:

- Clear.
- Concise.
- Technical where appropriate.
- Confident.
- Human.
- Specific.

Avoid phrases such as:

> "Revolutionizing the future with cutting-edge innovation."

unless there is a genuinely specific reason to say something similar.

Prefer concrete statements.

For example:

> "We develop autonomous robotic systems for manufacturing and logistics challenges."

---

# 42. Calls to Action

Primary actions should be limited.

Potential CTAs:

- Explore the team.
- View projects.
- Meet the team.
- Explore competitions.
- Contact us.
- Join the team.
- Become a sponsor.

Do not make every section contain a giant CTA.

---

# 43. Homepage Philosophy

The homepage should be treated as a **story**, not a collection of database widgets.

A possible conceptual sequence is:

```text id="7g0v1j"
HERO
↓
THE BEGINNING
↓
WHAT WE BUILD
↓
CURRENT COMPETITION
↓
ROBOTS / PROJECTS
↓
ENGINEERING
↓
TEAM
↓
ACHIEVEMENTS
↓
SPONSORS
↓
CONTACT / JOIN
```

The exact structure will be finalized later.

---

# 44. The Homepage Hero

The hero should establish:

1. Organization identity.
2. Engineering purpose.
3. Current direction.
4. Visual identity.

The 3D robot should support the hero rather than obscure the message.

The hero must remain understandable even if the user never interacts with the robot.

---

# 45. The First-Year Story

A first-year team has a unique advantage:

> Visitors can watch the team grow from the beginning.

The website should make this visible.

The timeline should eventually become one of the most valuable parts of the website.

It should feel like:

> **A record of engineering progress.**

not:

> **A decorative timeline.**

---

# 46. Future-Proofing

Future additions should not require major redesigns.

The following should be considered first-class extensibility requirements:

- New league.
- New competition.
- New robot.
- New robot version.
- New project.
- New department.
- New technology.
- New sponsor tier.
- New social platform.
- New content type where appropriate.

---

# 47. Design Decision Framework

When an implementation decision is not explicitly specified, prioritize decisions in this order:

1. User experience.
2. Authenticity.
3. Accessibility.
4. Performance.
5. Maintainability.
6. Visual quality.
7. Technical elegance.
8. Novelty.

Do not choose novelty over usability.

Do not choose visual effects over performance.

Do not choose implementation convenience over maintainability.

---

# 48. AI Design Decision Framework

When an AI coding agent has freedom to make a visual decision, it should ask internally:

> Does this improve understanding?

> Does this improve hierarchy?

> Does this reinforce the robotics/engineering identity?

> Does this feel deliberately designed?

> Does this work on mobile?

> Does this maintain performance?

If the answer is no, the element should probably not exist.

---

# 49. What the Website Should Feel Like

A visitor should ideally leave with the feeling:

> **"These students are actually building things."**

Not:

> "This is a pretty student website."

And not:

> "This is an AI-generated futuristic landing page."

The website should communicate:

**engineering first, visual quality second, effects third.**

---

# 50. Product North Star

The single guiding principle for the product is:

> **Build a website that makes the engineering visible.**

Every major decision should support this.

The team should be represented through:

- Its people.
- Its robots.
- Its projects.
- Its technologies.
- Its competitions.
- Its progress.

The website should make those relationships easy to discover.

---

# 51. Final Experience Statement

The desired final experience is:

> A visitor lands on a refined, dark, engineering-focused website and immediately understands that IUST Robotics is a real robotics club at IUST.

> They see a carefully designed industrial robotic system rather than a generic futuristic illustration.

> They discover the team's current SML competition focus without assuming SML is the team's entire identity.

> They can explore projects, robots, technologies, competitions, and people.

> A sponsor can quickly understand the team's capabilities and existing support.

> A robotics engineer can explore technical work.

> A student can understand what the club does and how to contact it.

> A Persian-speaking visitor can switch to a genuinely RTL experience.

> The site works beautifully on both laptop and mobile.

> Most importantly, the website feels like the beginning of an organization that can grow with the team for years.

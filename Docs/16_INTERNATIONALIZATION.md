# `09_INTERNATIONALIZATION.md`

## 1. Purpose

This document defines how English and Persian are handled across the robotics club website.

The website is bilingual:

- **English is the primary/preferred language.**
- **Persian is fully supported.**
- Persian must use proper RTL layout.
- English must use proper LTR layout.
- The language must be controlled through a cookie.
- There must be **no `/en` or `/fa` route prefixes**.

The system should feel like one website available in two languages, not two separate websites.

---

# 2. Language Model

Supported languages:

```text
en
fa
```

Default language:

```text
en
```

The language preference is stored in a cookie.

Example:

```text
locale=en
```

or:

```text
locale=fa
```

The exact cookie name can be changed during implementation, but it should remain consistent throughout the application.

---

# 3. No Locale URL Prefixes

The website must **not** use:

```text
/en
/fa
```

Therefore:

```text
/en/about
/fa/about
```

are not valid routes.

Instead:

```text
/about
/team
/projects
```

remain the same regardless of language.

The selected language determines the rendered content.

---

# 4. URL Stability

Changing language should not change the structural URL.

For example:

```text
English:
https://example.com/projects

Persian:
https://example.com/projects
```

The page content changes, but the route remains the same.

---

# 5. Language Cookie

The language selector should update the locale cookie.

Expected behavior:

```text
User selects English
        ↓
locale=en
        ↓
Site renders English

User selects Persian
        ↓
locale=fa
        ↓
Site renders Persian
```

The preference should persist between visits.

---

# 6. First Visit

If no language cookie exists:

```text
locale = undefined
```

the application should default to English.

Do not automatically force Persian based on browser language.

English is the preferred default for the club website.

---

# 7. Language Switcher

The language switcher should be available in the main navigation.

Recommended presentation:

```text
EN | فارسی
```

or:

```text
English | فارسی
```

The selector should be obvious but not visually dominant.

---

# 8. Language Switching

When the user switches language:

- Preserve the current route.
- Preserve relevant query parameters.
- Preserve relevant page state where practical.
- Update the cookie.
- Update document direction.
- Update language metadata.

Example:

```text
/projects/my-robot
```

remains:

```text
/projects/my-robot
```

after switching languages.

---

# 9. Document Language

The HTML document must correctly expose the current language.

English:

```html
<html lang="en" dir="ltr"></html>
```

Persian:

```html
<html lang="fa" dir="rtl"></html>
```

Do not implement RTL by simply adding arbitrary CSS overrides to individual components.

Direction should be established at the document/application level.

---

# 10. RTL

Persian must be a **true RTL experience**.

This includes:

- Text direction.
- Navigation.
- Alignment.
- Forms.
- Icons where directional.
- Breadcrumbs.
- Pagination.
- Carousels.
- Cards.
- Tables.
- Modals.
- Drawers.

Do not simply right-align Persian text while leaving the rest of the layout LTR.

---

# 11. Direction-Aware Layout

Layouts must adapt based on direction.

For example:

English:

```text
[ Image ] [ Content ]
```

Persian:

```text
[ Content ] [ Image ]
```

where reversing the visual order improves RTL consistency.

However, do not mechanically reverse every layout.

The design should be intentionally RTL-aware.

---

# 12. CSS Logical Properties

Prefer logical CSS properties.

Use:

```css
margin-inline-start
margin-inline-end

padding-inline-start
padding-inline-end

border-inline-start
border-inline-end

inset-inline-start
inset-inline-end
```

instead of unnecessarily relying on:

```css
margin-left
margin-right
padding-left
padding-right
```

This allows the same components to work correctly in both directions.

---

# 13. Icons

Directional icons must respect language direction.

For example:

```text
English:
→ Read more

Persian:
خواندن بیشتر ←
```

Icons such as:

- Arrow right.
- Arrow left.
- Back.
- Forward.
- Breadcrumb arrows.

must be direction-aware.

Non-directional icons should not be mirrored.

Examples:

```text
GitHub
Instagram
YouTube
Settings
Robot
Calendar
```

should normally remain unchanged.

---

# 14. Numbers

Numbers may remain in their standard Latin representation where appropriate.

Examples:

```text
2026
ROS 2
Jetson
C++
```

should not be automatically transformed into Persian numerals.

The system should not globally force numeral conversion.

---

# 15. Technical Terminology

Technical names should generally remain recognizable internationally.

Examples:

```text
ROS 2
Python
C++
YOLO
SLAM
LiDAR
Jetson
STM
Altium Designer
SolidWorks
```

Do not translate technology names.

---

# 16. Competition Names

Official competition names should preserve their official naming.

Example:

```text
Smart Manufacturing League
```

The Persian content can provide a Persian description/name where appropriate, but the official English name should remain available.

---

# 17. Proper Names

Member names, company names, university names, competition names, technology names, and product names must not be machine-transliterated automatically.

They should have manually managed localized values when necessary.

---

# 18. Content Translation Model

Public content should support independent language fields.

Example:

```text
titleEn
titleFa

summaryEn
summaryFa

descriptionEn
descriptionFa
```

The Persian translation should not be automatically generated at runtime.

---

# 19. Missing Translation

A content item may temporarily have only one language.

Example:

```text
English:
Published

Persian:
Not yet translated
```

The website must handle this gracefully.

---

# 20. Recommended Fallback

If the selected language does not have content:

```text
Selected language:
Persian

Persian content:
missing

English content:
available
```

the system may fall back to English.

However, this behavior should be configurable and clearly distinguishable in the admin panel.

---

# 21. Translation Status

For bilingual content, the admin should be able to identify:

```text
English:
Complete

Persian:
Missing
```

or:

```text
English:
Complete

Persian:
Complete
```

This is especially important for:

- Articles.
- Projects.
- Competitions.
- Robots.
- Sponsors.
- Partners.

---

# 22. Admin Language

The admin panel is **English-only**.

The admin UI does not need a Persian interface.

However, administrators must be able to manage:

```text
English content
Persian content
```

from the English admin interface.

---

# 23. Admin Content Editor

For bilingual fields, the admin should clearly separate the two versions.

For example:

```text
Title

English
[ Smart Manufacturing Robot ]

Persian
[ ربات تولید هوشمند ]
```

Avoid hiding Persian fields behind an unintuitive interface.

---

# 24. Admin Editor Modes

The preferred implementation is a clear bilingual editor.

Possible layout:

```text
┌─────────────────────────────┐
│ English                     │
│ [.........................] │
└─────────────────────────────┘

┌─────────────────────────────┐
│ Persian                     │
│ [.........................] │
└─────────────────────────────┘
```

On larger screens, these may optionally appear side-by-side.

---

# 25. Rich Text

If rich text is used for articles, both languages must support independent formatting.

Do not copy the HTML from English and attempt to reverse it automatically.

---

# 26. RTL Rich Text

Persian rich text must correctly support:

- Paragraphs.
- Headings.
- Lists.
- Quotes.
- Code blocks.
- Tables.
- Images.
- Captions.
- Links.

Code blocks should generally remain LTR even inside an RTL article.

---

# 27. Code

Technical content requires special handling.

For example:

```cpp
int main() {
    return 0;
}
```

must remain LTR.

The article surrounding it can be RTL while the code block remains LTR.

---

# 28. Mixed-Language Content

The website will naturally contain mixed-language strings.

Example:

> سیستم ما با ROS 2 و C++ توسعه داده شده است.

The UI must avoid awkward directional behavior around:

```text
ROS 2
C++
YOLO
GitHub
URLs
email addresses
```

Use appropriate bidi handling when required.

---

# 29. Email Addresses

Email addresses should always behave as LTR content.

For example:

```text
team@example.com
```

should not visually reverse in Persian.

---

# 30. URLs

URLs must always be displayed and handled as LTR strings.

---

# 31. GitHub Links

GitHub repository names and URLs remain unchanged between languages.

Only the surrounding UI text is translated.

Example:

English:

> View on GitHub →

Persian:

> مشاهده در گیت‌هاب ←

---

# 32. Social Platforms

Platform names should generally remain recognizable:

```text
Instagram
LinkedIn
YouTube
GitHub
Telegram
```

They do not require forced translation.

---

# 33. Forms

Forms must fully support RTL.

In Persian:

```text
Label
[ input                    ]
```

should align naturally with RTL reading order.

Placeholder text must also follow the correct direction.

---

# 34. Form Validation

Validation messages must be translated.

English:

```text
Please enter a valid email address.
```

Persian:

```text
لطفاً یک ایمیل معتبر وارد کنید.
```

Do not expose English-only validation errors on the Persian site.

---

# 35. Toast Notifications

The application will use **React Toastify**.

Toast messages must support both languages.

For example:

English:

```text
Application submitted successfully.
```

Persian:

```text
درخواست شما با موفقیت ارسال شد.
```

Toast positioning should also respect RTL.

---

# 36. Toastify Direction

For Persian:

```text
rtl: true
```

For English:

```text
rtl: false
```

The implementation should use the appropriate configuration rather than manually positioning individual notifications.

---

# 37. Navigation

Navigation labels must have translations.

Example:

```text
English
Home
About
Team
Projects
Robots
Competitions
Journal
Gallery
Sponsors
Join
Contact
```

Persian equivalents should be maintained in the translation system.

---

# 38. Footer

Footer content must also be bilingual.

This includes:

- Navigation.
- Club description.
- Contact information.
- Social links.
- Copyright.
- Legal links if added.

---

# 39. Static UI Strings

Static interface strings should **not** be stored in the database.

Examples:

```text
Read more
Learn more
View project
Join the team
Search
Filter
Next
Previous
Close
Submit
Cancel
```

These belong in the application's translation resources.

---

# 40. Dynamic Content

Content created through the admin panel belongs in the database.

Examples:

```text
Project title
Member bio
Article content
Sponsor description
Competition description
```

---

# 41. Translation Resources

Static translations should be organized centrally.

Conceptually:

```text
translations/
├── en
│   ├── common
│   ├── navigation
│   ├── home
│   ├── team
│   ├── projects
│   └── forms
│
└── fa
    ├── common
    ├── navigation
    ├── home
    ├── team
    ├── projects
    └── forms
```

The exact filesystem structure can be decided during implementation.

---

# 42. Translation Keys

Use semantic keys.

Good:

```text
navigation.team
projects.viewProject
join.applyNow
contact.sendMessage
```

Avoid:

```text
text1
button2
label17
```

---

# 43. No Hardcoded UI Text

Public React components should not contain hardcoded user-facing English or Persian strings where those strings are intended to be localized.

Bad:

```text
<button>Join the Team</button>
```

Preferred:

```text
<button>{t("join.applyNow")}</button>
```

---

# 44. Content vs Translation

A useful distinction:

### Translation system

Controls:

```text
"View Project"
"Join the Team"
"Contact Us"
```

### Database

Controls:

```text
"Autonomous Mobile Robot"
"LiDAR Navigation Platform"
"Smart Manufacturing League 2026"
```

---

# 45. Metadata

Page metadata must also be localized.

This includes:

```text
Title
Description
Open Graph title
Open Graph description
```

When Persian is selected, Persian metadata should be available.

---

# 46. SEO and Language

Because there are no `/en` and `/fa` URLs, the implementation must carefully consider how search engines discover the two language versions.

The SEO implementation is defined in:

```text
12_SEO.md
```

This document only establishes the language behavior.

---

# 47. Accessibility

Language and direction must be communicated to assistive technologies through the document language.

The application must correctly set:

```text
lang
dir
```

based on the active locale.

---

# 48. Date Formatting

Dates should be localized.

English:

```text
August 12, 2026
```

Persian:

```text
۲۱ مرداد ۱۴۰۵
```

where the product design chooses to display the Persian calendar.

The project should use a consistent date strategy rather than manually formatting dates throughout components.

---

# 49. Persian Calendar

Because the website is Persian/English, dates may need:

```text
Gregorian
Persian/Jalali
```

The exact display behavior should be determined by the active language.

Recommended:

```text
English → Gregorian
Persian → Persian/Jalali
```

while the database stores dates in a standard machine-readable format.

---

# 50. Time

Times should be localized where displayed.

The underlying database should store timestamps in a consistent timezone-aware format.

Do not store localized Persian date strings as database dates.

---

# 51. Numbers in Statistics

Team statistics should remain understandable in both languages.

For example:

English:

```text
12 Members
```

Persian:

```text
۱۲ عضو
```

However, numeral localization should be deliberate rather than globally applied to all text.

---

# 52. Search

If search is implemented, it should support both languages.

For example, a Persian query should be capable of finding Persian content.

The search architecture should not assume English-only content.

---

# 53. Slugs

Because URLs are language-neutral, slugs require special consideration.

The preferred initial approach is:

```text
/projects/[slug]
```

with a stable canonical slug.

English slugs are recommended for public URLs because they are:

- Easier to share.
- Easier to type.
- More predictable.
- More compatible with technical content.

Example:

```text
/projects/autonomous-mobile-robot
```

The Persian title can still be displayed on the Persian page.

---

# 54. Slug Stability

Changing the translated title should not automatically change the slug.

Once published:

```text
/projects/autonomous-mobile-robot
```

should remain stable unless an administrator explicitly changes it.

---

# 55. Language Persistence

The selected language should persist when:

- Navigating between pages.
- Reloading.
- Opening another page.
- Returning later.

---

# 56. Server-Side Rendering

The selected locale must be available to the server when rendering pages.

The implementation should avoid rendering English first and then switching to Persian after hydration.

The correct direction and content should be available from the initial render.

---

# 57. Hydration

The application must avoid hydration mismatches caused by locale detection.

The server and client must agree on:

```text
Language
Direction
Translated content
```

---

# 58. Language Switching and Forms

If a user is filling a form and switches language, the application should avoid accidentally losing their entered data where practical.

At minimum, do not unexpectedly reset the entire page.

---

# 59. Language Switching and Admin

The public site's language selector has no effect on the admin panel's interface language.

The admin remains English.

---

# 60. Language Switching and Authentication

Changing the public language must not affect:

- Admin authentication.
- User sessions.
- Application submissions.
- CMS state.

---

# 61. Translation Completeness

The implementation should include a mechanism for detecting missing static translation keys during development.

A missing translation should be treated as a development issue, not silently accepted.

---

# 62. Translation Quality

Persian translations should be:

- Natural.
- Professional.
- Technically accurate.
- Appropriate for Iranian engineering students.
- Consistent in terminology.

Avoid literal machine-style translations when they sound unnatural.

---

# 63. Technical Terminology Consistency

Create a shared terminology reference for frequently used terms.

Example:

```text
Robotics Club → باشگاه رباتیک
Team → تیم
Member → عضو
Project → پروژه
Robot → ربات
Competition → مسابقه
Award → جایزه
Sponsor → حامی
Partner → شریک / همکار
Join the Team → پیوستن به تیم
```

The final terminology should be reviewed before launch.

---

# 64. Brand Name

The club's official name should remain consistent in both languages.

Once the team receives its final name/logo, that identity should be configurable through site settings rather than hardcoded throughout the application.

---

# 65. University Name

The club is associated with:

> Iran University of Science and Technology (IUST)

The relationship should be represented accurately.

Do not imply that the university officially sponsors or fully supports the club unless that is actually established.

---

# 66. English-First Design

Because English is preferred, the primary design pass should be created in English first.

Then Persian should be implemented as a genuine RTL counterpart.

Do **not** create English and simply mirror it mechanically.

---

# 67. Persian Design Pass

The Persian version should receive its own visual QA.

Check:

- Typography.
- Line wrapping.
- Heading lengths.
- Button widths.
- Navigation.
- Cards.
- Forms.
- Tables.
- Toasts.
- Modal positioning.
- 3D composition.
- Footer.

---

# 68. Responsive RTL

RTL must work at all breakpoints.

The following must be tested:

```text
Desktop
Laptop
Tablet
Mobile
```

The website is primarily designed for laptop/desktop but must work perfectly on mobile.

---

# 69. Mobile Language Selector

On mobile, the language selector must remain easy to access without consuming excessive navigation space.

It may be placed inside the mobile navigation menu.

---

# 70. Content Direction Overrides

Some content must intentionally remain LTR even inside Persian pages.

Examples:

```text
Code
URLs
Email addresses
GitHub repository names
Technical identifiers
```

The system should support local direction overrides.

---

# 71. No Mixed-Direction Hacks

Do not solve RTL issues by adding arbitrary:

```css
transform: scaleX(-1);
```

or manually reversing strings.

Use proper document direction, CSS logical properties, and Unicode bidirectional behavior.

---

# 72. Internationalization Principle

The goal is not:

> "An English website with Persian translation."

The goal is:

> **One robotics club website with two first-class language experiences.**

English is preferred and the default, but Persian must feel intentionally designed, complete, and professional.

---

# 73. Implementation Summary

The AI implementing the project must ensure:

```text
Languages:
English + Persian

Default:
English

URL:
No /en or /fa

Persistence:
Cookie

English:
LTR

Persian:
RTL

Admin UI:
English only

Admin content:
English + Persian

Static UI:
Translation files

Dynamic content:
Database

Technical identifiers:
Remain recognizable

Dates:
Localized display

Forms:
Bilingual

Toastify:
Bilingual + direction-aware

SEO:
Handled separately in 12_SEO.md
```

---

# 74. Non-Negotiable Rules

1. **Do not create `/en` or `/fa` routes.**
2. **Do not implement Persian as a simple CSS `text-align: right` mode.**
3. **Do not hardcode user-facing strings.**
4. **Do not machine-generate Persian content at runtime.**
5. **Do not translate technical names such as ROS 2, C++, YOLO, LiDAR, or SolidWorks.**
6. **Do not lose the selected language on navigation.**
7. **Do not allow missing RTL handling in forms, navigation, or interactive elements.**
8. **Do not expose private admin/application content through public localization APIs.**
9. **Do not let language switching alter the underlying content identity or database records.**
10. **English is the default, but Persian must be treated as a complete first-class experience.**

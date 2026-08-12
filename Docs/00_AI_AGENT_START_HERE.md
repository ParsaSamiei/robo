# AI Agent — Start Here (Docs Index & Precedence Map)

**Read this file first, before any other document in `Docs/`.**

This repository's `Docs/` folder was written in three sequential passes that
were never reconciled. Several topics are covered more than once, with
different (sometimes conflicting) content, and one document (`28`) contains
a "required reading" list that references filenames which do not exist in
this repo. This file exists to fix that: it tells you which files to read,
in what order, and which file wins when two disagree.

If you are an AI coding agent implementing this project, follow the order
and precedence rules below instead of reading `Docs/` alphabetically.

---

## 1. Canonical reading order

Read in this order. Files not listed here (`03`, `08`) are superseded —
see §3.

```text
00_PROJECT_OVERVIEW.md          # vision, org context — no duplicate, always read
01_PRODUCT_VISION.md            # no duplicate, always read
02_BRAND_AND_VISUAL_DIRECTIONS.md   # no duplicate, always read
05_DATABASE_SCHEMA.md           # no duplicate, always read
06_ADMIN_PANEL.md               # no duplicate, always read
07_PUBLIC_WEBSITE.md            # no duplicate, always read (site-level IA/pages)

09_TECHNICAL_ARCHITECTURE.md    # CANONICAL — supersedes 04 (see §3)
10_INFORMATION_ARCHITECTURE.md  # CANONICAL — supersedes 03 (see §3)
11_DESIGN_SYSTEM.md             # CANONICAL — supersedes 08 (see §3)

12_CONTENT_SYSTEM.md            # editorial voice / tone rules
14_PAGE_SPECIFICATIONS.md       # per-page detail (overlaps 07/10 — see §3)
15_CONTENT_MODEL.md             # CMS/entity-level content model
16_INTERNATIONALIZATION.md
17_3D_AND_INTERACTIONS.md
18_MEDIA_AND_GALLERY.md
19_SEO.md
20_PERFORMANCE.md
21_ACCESSIBILITY.md
22_SECURITY.md
23_RESPONSIVE_DESIGN.md
24_COMPONENT_ARCHITECTURE.md
25_API_AND_SERVER_ARCHITECTURE.md
26_CONTENT_GUIDELINES.md        # note: internally titled "20_", see §4
27_DEPLOYMENT.md                # note: internally titled "19_", see §4

28_IMPLEMENTATION_RULES.md      # read LAST — final contract, but see §2 and §5
```

`13_IMPLEMENTATION_RULES.md` is **not** in this list. It is an earlier draft
of the same document as `28`. See §3.

---

## 2. `28`'s own "Source of Truth" list is broken — use this instead

`28_IMPLEMENTATION_RULES.md`, Section 2 ("Source of Truth"), lists required
reading using an internal numbering scheme that was never applied to the
actual filenames. Several of the listed names do not exist in this repo.
Do not search for them. Use this corrected mapping:

| `28` says to read | Actual file in this repo |
|---|---|
| `00_PROJECT_BRIEF.md` | `00_PROJECT_OVERVIEW.md` |
| `01_PRODUCT_REQUIREMENTS.md` | `01_PRODUCT_VISION.md` |
| `02_BRAND_IDENTITY.md` | `02_BRAND_AND_VISUAL_DIRECTIONS.md` |
| `03_INFORMATION_ARCHITECTURE.md` | `10_INFORMATION_ARCHITECTURE.md` (see §3 — NOT the file literally named `03_...`) |
| `04_PAGE_SPECIFICATIONS.md` | `14_PAGE_SPECIFICATIONS.md` |
| `06_CONTENT_MODEL.md` | `15_CONTENT_MODEL.md` |
| `09_INTERNATIONALIZATION.md` | `16_INTERNATIONALIZATION.md` |
| `10_3D_AND_INTERACTIONS.md` | `17_3D_AND_INTERACTIONS.md` |
| `11_MEDIA_AND_GALLERY.md` | `18_MEDIA_AND_GALLERY.md` |
| `12_SEO.md` | `19_SEO.md` |
| `13_PERFORMANCE.md` | `20_PERFORMANCE.md` |
| `14_ACCESSIBILITY.md` | `21_ACCESSIBILITY.md` |
| `15_SECURITY.md` | `22_SECURITY.md` |
| `16_RESPONSIVE_DESIGN.md` | `23_RESPONSIVE_DESIGN.md` |
| `17_COMPONENT_ARCHITECTURE.md` | `24_COMPONENT_ARCHITECTURE.md` |
| `18_API_AND_SERVER_ARCHITECTURE.md` | `25_API_AND_SERVER_ARCHITECTURE.md` |
| `19_DEPLOYMENT.md` | `27_DEPLOYMENT.md` (not `26` — see §4) |
| `20_CONTENT_GUIDELINES.md` | `26_CONTENT_GUIDELINES.md` (not `27` — see §4) |
| `21_IMPLEMENTATION_RULES.md` | `28_IMPLEMENTATION_RULES.md` (this document itself) |

A ready-to-paste patch for `28`'s Section 2 is in `PATCH_NOTES.md`.

---

## 3. Duplicate topics — precedence rules

These topics are documented twice, with different content. Do not merge
them yourself or average the two — follow the rule below.

| Topic | Files | Rule |
|---|---|---|
| Technical architecture | `04` vs `09` | **Use `09`.** It explicitly states it is "the foundation the remaining implementation documents should build upon" and is the later, more specific pass (includes Prisma, Zod, and a fuller rendering-strategy breakdown that `04` doesn't specify). Treat `04` as historical context only. |
| Information architecture | `03` vs `10` | **No self-declared winner.** `10` is the later, more detailed pass (adds homepage narrative, navigation philosophy) and is what `28`'s reading list actually points at once you apply the §2 mapping. Default to `10`; if `03` contains a specific detail `10` lacks, flag it and confirm with the maintainer rather than silently picking one. |
| Design system | `08` vs `11` | **No self-declared winner.** Same situation as IA: `11` is the later pass. Default to `11`; flag specific conflicts (e.g. exact color tokens, spacing scale) for maintainer confirmation before locking them into code — these are visual-identity decisions, not just prose. |
| Implementation rules | `13` vs `28` | **Use `28`.** Both files call themselves "the final implementation contract," which is a direct contradiction. `28` is the last file written in the whole set (by internal numbering it's `21`, matching the highest topic count) and its Section 2 explicitly enumerates the rest of the doc set as dependencies — `13` does not. Treat `13` as an earlier draft. |
| Page-level detail | `07`, `10`, `14` | Not a strict duplicate — `07` is public-site IA, `10` is IA + page specs, `14` is page-level detail only. Where `14` and `10` disagree on a specific page's structure, prefer `14` (it's the more granular, later document); use `07`/`10` for anything `14` doesn't cover. |
| Content rules | `12`, `15`, `26` | Not a strict duplicate — `12` is voice/tone, `15` is the CMS content model (fields/entities), `26` is editorial guidelines (what to say / not say). All three are needed; they don't overlap enough to conflict. |

**General rule when you hit a conflict not listed above:** prefer the
higher-numbered file (it was written later in the same session), but if the
conflict affects something hard to change later — data schema, color
tokens, routing structure — stop and ask the maintainer instead of
guessing silently.

---

## 4. Filename/number mismatches to be aware of

- `26_CONTENT_GUIDELINES.md` is internally titled `` `20_CONTENT_GUIDELINES.md` ``.
- `27_DEPLOYMENT.md` is internally titled `` `19_DEPLOYMENT.md` ``.
  These two are swapped relative to their own internal numbering — `27`
  (deployment) was meant to come before `26` (content guidelines). This
  doesn't block implementation, it's just worth knowing so you don't
  assume the visible filename order reflects intended reading order.
- `13_IMPLEMENTATION_RULES.md` is internally titled `` `21_IMPLEMENTATION_RULES.md` ``
  — same internal number as `28`. This is the strongest signal that `13`
  and `28` are two drafts of the same document (see §3).

---

## 5. Recommended follow-up for the human maintainer

This index makes the doc set usable as-is, but the underlying duplication
should be cleaned up rather than routed around indefinitely:

1. Decide and confirm the IA (`03`/`10`) and Design System (`08`/`11`) winners.
2. Delete or move the superseded files (`03`, `04`, `08`, `13`) into an
   `Docs/archive/` folder so they stop appearing in directory listings an
   agent might read directly.
3. Rename `26`/`27` to match their internal titles, or re-title them to
   match their filenames — whichever is less disruptive to existing links.
4. Once cleaned up, delete this file's §2–§4 (they'll no longer apply) and
   keep §1 as a plain table of contents.

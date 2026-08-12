Next is **`05_DATABASE_SCHEMA.md`**. This defines the actual PostgreSQL/Prisma data model the AI should build. It is intentionally more concrete than the previous architecture document, because this is where we prevent the project from becoming difficult to extend later.

# 05 — Database Schema

**Document:** `05_DATABASE_SCHEMA.md`
**Database:** PostgreSQL
**ORM:** Prisma
**Primary language:** TypeScript
**Purpose:** Persistent data model for IUST Robotics

---

# 1. Database Philosophy

The database should represent the robotics club as a collection of connected entities.

The schema must support:

- Current members.
- Alumni.
- Multiple departments per member.
- Projects.
- Robots.
- Competitions.
- Competition results.
- Awards.
- Technologies.
- Blog.
- News.
- Gallery.
- Sponsors.
- Sponsor tiers.
- Partners.
- Timeline.
- Contact submissions.
- Join applications.
- Bilingual content.
- Publishing states.
- Media.

The database should be normalized enough to avoid duplicated information, while remaining practical for Prisma and PostgreSQL.

---

# 2. General Conventions

All primary keys should use a consistent ID strategy.

Recommended:

```prisma
id String @id @default(cuid())
```

or an equivalent UUID strategy.

Do not mix:

```text
integer IDs
UUIDs
CUIDs
```

without a specific reason.

---

# 3. Timestamps

Most persistent entities should have:

```prisma
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
```

Entities that are published should additionally consider:

```prisma
publishedAt DateTime?
```

Do not add timestamps to entities where they have no meaningful value.

---

# 4. Publication Status

Use a shared enum:

```prisma
enum PublicationStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}
```

This should be used consistently for public content.

Examples:

- Project.
- Robot.
- Blog post.
- News post.
- Competition.
- Sponsor.
- Partner.

---

# 5. Member Status

Member status should be separate from publication status.

Recommended:

```prisma
enum MembershipStatus {
  CURRENT
  ALUMNI
}
```

A member can therefore be:

```text
CURRENT + PUBLISHED
```

or:

```text
ALUMNI + PUBLISHED
```

---

# 6. Department

```prisma
model Department {
  id          String   @id @default(cuid())
  nameEn      String
  nameFa      String
  slug        String   @unique
  descriptionEn String?
  descriptionFa String?
  order       Int      @default(0)
  isActive    Boolean  @default(true)

  members     MemberDepartment[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

Initial records:

```text
Mechanical
Hardware
Software
Management
```

The system must allow additional departments later.

---

# 7. Member

Recommended conceptual model:

```prisma
model Member {
  id                String            @id @default(cuid())

  name              String

  slug              String            @unique

  roleEn            String?
  roleFa            String?

  bioEn             String?
  bioFa             String?

  educationEn       String?
  educationFa       String?

  photoId           String?
  photo             Media?            @relation("MemberPhoto", fields: [photoId], references: [id])

  githubUrl         String?
  personalWebsiteUrl String?

  joinedAt          DateTime?
  leftAt            DateTime?

  membershipStatus  MembershipStatus  @default(CURRENT)

  isPublished       Boolean            @default(false)

  departments       MemberDepartment[]
  projects          ProjectMember[]
  robots            RobotMember[]
  authoredPosts     BlogPost[]

  createdAt         DateTime           @default(now())
  updatedAt         DateTime           @updatedAt
}
```

---

# 8. Why Membership Status Is Separate

Do not delete a member when they leave.

Instead:

```text
membershipStatus = ALUMNI
```

This preserves the history of the organization.

The team page can automatically divide members into:

```text
Current Members
Alumni
```

---

# 9. Member Departments

A member can have multiple roles/departments.

Use a junction model:

```prisma
model MemberDepartment {
  memberId     String
  departmentId String

  member       Member     @relation(fields: [memberId], references: [id], onDelete: Cascade)
  department   Department @relation(fields: [departmentId], references: [id], onDelete: Cascade)

  @@id([memberId, departmentId])
}
```

This supports:

```text
Member A
 ├── Software
 └── Management
```

without duplicating the member.

---

# 10. Member Skills

Skills should not necessarily be stored as one comma-separated string.

Avoid:

```text
"ROS2, C++, Python, SLAM, YOLO"
```

Instead, use technologies.

A member can be associated with multiple technologies.

This provides structured relationships:

```text
Member
 ↕
Technology
```

---

# 11. Technology

```prisma
model Technology {
  id             String          @id @default(cuid())

  name           String
  slug           String          @unique

  descriptionEn  String?
  descriptionFa  String?

  category       String?

  websiteUrl     String?

  icon           String?

  isPublished    Boolean         @default(false)
  order          Int             @default(0)

  members        MemberTechnology[]
  projects       ProjectTechnology[]
  robots         RobotTechnology[]

  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt
}
```

---

# 12. Member Technologies

```prisma
model MemberTechnology {
  memberId     String
  technologyId String

  member       Member     @relation(fields: [memberId], references: [id], onDelete: Cascade)
  technology   Technology @relation(fields: [technologyId], references: [id], onDelete: Cascade)

  @@id([memberId, technologyId])
}
```

This means the website can show:

```text
ROS 2
↓
People working with ROS 2
↓
Projects using ROS 2
↓
Robots using ROS 2
```

---

# 13. Project

```prisma
model Project {
  id                String            @id @default(cuid())

  titleEn           String
  titleFa           String?

  slug              String            @unique

  excerptEn         String?
  excerptFa         String?

  contentEn         String?
  contentFa         String?

  status            ProjectStatus     @default(ACTIVE)

  publicationStatus PublicationStatus @default(DRAFT)
  publishedAt       DateTime?

  githubUrl         String?

  members           ProjectMember[]
  technologies      ProjectTechnology[]
  robots            RobotProject[]
  competitions      CompetitionProject[]

  media             ProjectMedia[]

  createdAt         DateTime          @default(now())
  updatedAt         DateTime          @updatedAt
}
```

---

# 14. Project Status

Recommended:

```prisma
enum ProjectStatus {
  PLANNED
  ACTIVE
  COMPLETED
  ARCHIVED
}
```

This is separate from publication status.

For example:

```text
Project:
ACTIVE

Publication:
PUBLISHED
```

---

# 15. Project Members

```prisma
model ProjectMember {
  projectId String
  memberId  String

  project   Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  member    Member  @relation(fields: [memberId], references: [id], onDelete: Cascade)

  roleEn    String?
  roleFa    String?

  @@id([projectId, memberId])
}
```

This also allows a member's role within a project to differ from their overall team role.

---

# 16. Project Technologies

```prisma
model ProjectTechnology {
  projectId    String
  technologyId String

  project      Project    @relation(fields: [projectId], references: [id], onDelete: Cascade)
  technology   Technology @relation(fields: [technologyId], references: [id], onDelete: Cascade)

  @@id([projectId, technologyId])
}
```

---

# 17. Robot

```prisma
model Robot {
  id                String            @id @default(cuid())

  nameEn            String
  nameFa            String?

  slug              String            @unique

  descriptionEn     String?
  descriptionFa     String?

  contentEn         String?
  contentFa         String?

  status            RobotStatus       @default(DEVELOPMENT)

  publicationStatus PublicationStatus @default(DRAFT)
  publishedAt       DateTime?

  members           RobotMember[]
  projects          RobotProject[]
  technologies      RobotTechnology[]
  competitions      CompetitionRobot[]

  media             RobotMedia[]

  createdAt         DateTime          @default(now())
  updatedAt         DateTime          @updatedAt
}
```

---

# 18. Robot Status

```prisma
enum RobotStatus {
  CONCEPT
  PROTOTYPE
  DEVELOPMENT
  OPERATIONAL
  RETIRED
}
```

This allows the website to document the robot's evolution.

---

# 19. Robot Members

```prisma
model RobotMember {
  robotId  String
  memberId String

  robot    Robot  @relation(fields: [robotId], references: [id], onDelete: Cascade)
  member   Member @relation(fields: [memberId], references: [id], onDelete: Cascade)

  roleEn   String?
  roleFa   String?

  @@id([robotId, memberId])
}
```

---

# 20. Robot Projects

```prisma
model RobotProject {
  robotId   String
  projectId String

  robot     Robot   @relation(fields: [robotId], references: [id], onDelete: Cascade)
  project   Project @relation(fields: [projectId], references: [id], onDelete: Cascade)

  @@id([robotId, projectId])
}
```

---

# 21. Robot Technologies

```prisma
model RobotTechnology {
  robotId      String
  technologyId String

  robot        Robot      @relation(fields: [robotId], references: [id], onDelete: Cascade)
  technology   Technology @relation(fields: [technologyId], references: [id], onDelete: Cascade)

  @@id([robotId, technologyId])
}
```

---

# 22. Competition

```prisma
model Competition {
  id                String            @id @default(cuid())

  nameEn            String
  nameFa            String?

  slug              String            @unique

  organizationEn   String?
  organizationFa   String?

  leagueEn          String?
  leagueFa          String?

  year              Int?

  descriptionEn     String?
  descriptionFa     String?

  contentEn         String?
  contentFa         String?

  locationEn        String?
  locationFa        String?

  websiteUrl        String?

  startDate         DateTime?
  endDate           DateTime?

  publicationStatus PublicationStatus @default(DRAFT)
  publishedAt       DateTime?

  robots            CompetitionRobot[]
  projects          CompetitionProject[]
  results           CompetitionResult[]
  awards            Award[]
  media             CompetitionMedia[]

  createdAt         DateTime          @default(now())
  updatedAt         DateTime          @updatedAt
}
```

---

# 23. Competition Philosophy

The schema must support:

```text
Competition
 ├── RoboCup
 │    └── Smart Manufacturing League
 │
 ├── Another competition
 │
 └── Future competition
```

Do not make RoboCup or SML hard-coded into the database.

---

# 24. Competition Robots

```prisma
model CompetitionRobot {
  competitionId String
  robotId       String

  competition   Competition @relation(fields: [competitionId], references: [id], onDelete: Cascade)
  robot         Robot       @relation(fields: [robotId], references: [id], onDelete: Cascade)

  @@id([competitionId, robotId])
}
```

---

# 25. Competition Projects

```prisma
model CompetitionProject {
  competitionId String
  projectId     String

  competition   Competition @relation(fields: [competitionId], references: [id], onDelete: Cascade)
  project       Project      @relation(fields: [projectId], references: [id], onDelete: Cascade)

  @@id([competitionId, projectId])
}
```

---

# 26. Competition Results

Results should be structured rather than embedded inside competition content.

```prisma
model CompetitionResult {
  id             String      @id @default(cuid())

  competitionId  String

  titleEn        String?
  titleFa        String?

  placement      Int?
  score          String?
  stage          String?

  descriptionEn  String?
  descriptionFa  String?

  competition    Competition @relation(fields: [competitionId], references: [id], onDelete: Cascade)

  createdAt      DateTime    @default(now())
  updatedAt      DateTime    @updatedAt
}
```

---

# 27. Why Results Are Separate

This allows a competition to contain multiple meaningful results.

For example:

```text
Competition
├── Qualification result
├── Technical challenge result
├── Final placement
└── Special award
```

---

# 28. Award

```prisma
model Award {
  id             String       @id @default(cuid())

  titleEn        String
  titleFa        String?

  descriptionEn  String?
  descriptionFa  String?

  year           Int?

  competitionId  String?

  competition    Competition? @relation(fields: [competitionId], references: [id], onDelete: SetNull)

  isPublished    Boolean      @default(false)

  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
}
```

---

# 29. Blog Post

```prisma
model BlogPost {
  id                String            @id @default(cuid())

  titleEn           String
  titleFa           String?

  slug              String            @unique

  excerptEn         String?
  excerptFa         String?

  contentEn         String?
  contentFa         String?

  authorId          String?

  coverMediaId      String?

  publicationStatus PublicationStatus @default(DRAFT)
  publishedAt       DateTime?

  author            Member?           @relation(fields: [authorId], references: [id], onDelete: SetNull)

  coverMedia        Media?            @relation("BlogCover", fields: [coverMediaId], references: [id], onDelete: SetNull)

  createdAt         DateTime          @default(now())
  updatedAt         DateTime          @updatedAt
}
```

---

# 30. News Post

News should remain separate from blog posts.

```prisma
model NewsPost {
  id                String            @id @default(cuid())

  titleEn           String
  titleFa           String?

  slug              String            @unique

  excerptEn         String?
  excerptFa         String?

  contentEn         String?
  contentFa         String?

  coverMediaId      String?

  publicationStatus PublicationStatus @default(DRAFT)
  publishedAt       DateTime?

  coverMedia        Media?            @relation("NewsCover", fields: [coverMediaId], references: [id], onDelete: SetNull)

  createdAt         DateTime          @default(now())
  updatedAt        DateTime          @updatedAt
}
```

---

# 31. Media

A centralized media table is recommended.

```prisma
model Media {
  id               String   @id @default(cuid())

  filename         String
  originalFilename String?

  mimeType         String
  size             Int

  width            Int?
  height           Int?

  storagePath      String

  altTextEn        String?
  altTextFa        String?

  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  memberPhoto      Member? @relation("MemberPhoto")
  blogCover        BlogPost? @relation("BlogCover")
  newsCover        NewsPost? @relation("NewsCover")

  projectMedia     ProjectMedia[]
  robotMedia       RobotMedia[]
  competitionMedia CompetitionMedia[]
}
```

---

# 32. Project Media

```prisma
model ProjectMedia {
  projectId String
  mediaId   String

  order     Int     @default(0)

  project   Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  media     Media   @relation(fields: [mediaId], references: [id], onDelete: Cascade)

  @@id([projectId, mediaId])
}
```

---

# 33. Robot Media

```prisma
model RobotMedia {
  robotId String
  mediaId String

  order   Int     @default(0)

  robot   Robot @relation(fields: [robotId], references: [id], onDelete: Cascade)
  media   Media @relation(fields: [mediaId], references: [id], onDelete: Cascade)

  @@id([robotId, mediaId])
}
```

---

# 34. Competition Media

```prisma
model CompetitionMedia {
  competitionId String
  mediaId       String

  order         Int @default(0)

  competition   Competition @relation(fields: [competitionId], references: [id], onDelete: Cascade)
  media         Media       @relation(fields: [mediaId], references: [id], onDelete: Cascade)

  @@id([competitionId, mediaId])
}
```

---

# 35. Gallery

The gallery itself can be represented by media relationships rather than requiring a giant independent gallery system.

However, if albums are required, introduce:

```prisma
model GalleryAlbum {
  id          String @id @default(cuid())

  titleEn     String
  titleFa     String?

  slug        String @unique

  descriptionEn String?
  descriptionFa String?

  published   Boolean @default(false)

  items       GalleryItem[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

# 36. Gallery Item

```prisma
model GalleryItem {
  id        String @id @default(cuid())

  albumId   String
  mediaId   String

  captionEn String?
  captionFa String?

  order     Int @default(0)

  album     GalleryAlbum @relation(fields: [albumId], references: [id], onDelete: Cascade)
  media     Media        @relation(fields: [mediaId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
}
```

---

# 37. YouTube Videos

Do not upload large videos to the VPS initially.

Use a separate video entity:

```prisma
model Video {
  id          String @id @default(cuid())

  titleEn     String
  titleFa     String?

  youtubeUrl  String

  thumbnailUrl String?

  isPublished Boolean @default(false)

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

This can later be related to:

- Project.
- Robot.
- Competition.
- Blog.
- Gallery.

---

# 38. Sponsor Tier

```prisma
model SponsorTier {
  id          String @id @default(cuid())

  nameEn      String
  nameFa      String?

  descriptionEn String?
  descriptionFa String?

  order       Int @default(0)

  sponsors    Sponsor[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

# 39. Sponsor

```prisma
model Sponsor {
  id                String            @id @default(cuid())

  name              String
  slug              String            @unique

  descriptionEn     String?
  descriptionFa     String?

  websiteUrl        String?

  logoMediaId       String?

  tierId            String?

  publicationStatus PublicationStatus @default(DRAFT)

  order             Int               @default(0)

  logo              Media?            @relation("SponsorLogo", fields: [logoMediaId], references: [id], onDelete: SetNull)

  tier              SponsorTier?      @relation(fields: [tierId], references: [id], onDelete: SetNull)

  createdAt         DateTime           @default(now())
  updatedAt         DateTime           @updatedAt
}
```

---

# 40. Sponsor Presentation

Sponsors should be ordered by:

```text
Tier
↓
Order
```

The homepage can show selected sponsors.

The dedicated Sponsors page can show all published sponsors.

---

# 41. Partner

Sponsors and partners should remain distinct.

```prisma
model Partner {
  id                String            @id @default(cuid())

  name              String
  slug              String            @unique

  descriptionEn     String?
  descriptionFa     String?

  websiteUrl        String?

  logoMediaId       String?

  publicationStatus PublicationStatus @default(DRAFT)

  order             Int               @default(0)

  logo              Media?            @relation("PartnerLogo", fields: [logoMediaId], references: [id], onDelete: SetNull)

  createdAt         DateTime           @default(now())
  updatedAt         DateTime           @updatedAt
}
```

---

# 42. Timeline Event

```prisma
model TimelineEvent {
  id          String @id @default(cuid())

  titleEn     String
  titleFa     String?

  descriptionEn String?
  descriptionFa String?

  date        DateTime?

  mediaId     String?

  isPublished Boolean @default(false)

  order       Int @default(0)

  media       Media? @relation(fields: [mediaId], references: [id], onDelete: SetNull)

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

# 43. Contact Submission

```prisma
model ContactSubmission {
  id          String @id @default(cuid())

  name        String
  email       String
  subject     String?
  message     String

  status      ContactStatus @default(NEW)

  reviewedAt  DateTime?

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

# 44. Contact Status

```prisma
enum ContactStatus {
  NEW
  REVIEWED
  ARCHIVED
}
```

---

# 45. Join Application

The initial implementation should support recruitment applications.

```prisma
model JoinApplication {
  id              String @id @default(cuid())

  name            String
  email           String

  educationEn     String?
  educationFa     String?

  departmentId    String?

  messageEn       String?
  messageFa       String?

  githubUrl       String?
  portfolioUrl    String?

  resumeMediaId   String?

  status          ApplicationStatus @default(NEW)

  department      Department? @relation(fields: [departmentId], references: [id], onDelete: SetNull)

  resume          Media? @relation("ApplicationResume", fields: [resumeMediaId], references: [id], onDelete: SetNull)

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

---

# 46. Application Status

```prisma
enum ApplicationStatus {
  NEW
  REVIEWING
  ACCEPTED
  REJECTED
  ARCHIVED
}
```

---

# 47. Resume Security

Resume media should be treated differently from normal public media.

The resume must:

- Not be publicly accessible.
- Require admin authentication to retrieve.
- Have safe filenames.
- Have size restrictions.
- Have allowed MIME types.

---

# 48. Social Links

```prisma
model SocialLink {
  id        String @id @default(cuid())

  platform  SocialPlatform
  url       String

  isEnabled Boolean @default(true)

  order     Int @default(0)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

# 49. Social Platforms

```prisma
enum SocialPlatform {
  INSTAGRAM
  LINKEDIN
  YOUTUBE
  GITHUB
  TELEGRAM
}
```

The enum can be expanded later.

---

# 50. Site Settings

Keep global settings small.

```prisma
model SiteSetting {
  id        String @id @default(cuid())

  key       String @unique
  value     String

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Do not use this table for large structured content.

---

# 51. SEO Data

For content types where custom SEO is useful, add dedicated fields:

```text
seoTitleEn
seoTitleFa
seoDescriptionEn
seoDescriptionFa
ogImageId
```

Do not create a separate SEO table unless the application actually benefits from it.

---

# 52. Tags

Blog posts may eventually need tags.

Recommended future model:

```prisma
model Tag {
  id       String @id @default(cuid())

  nameEn   String
  nameFa   String?

  slug     String @unique

  posts    BlogPostTag[]
}
```

and:

```prisma
model BlogPostTag {
  postId String
  tagId  String

  post   BlogPost @relation(fields: [postId], references: [id], onDelete: Cascade)
  tag    Tag      @relation(fields: [tagId], references: [id], onDelete: Cascade)

  @@id([postId, tagId])
}
```

This can be postponed until the blog has enough content.

---

# 53. Video Relationships

If videos become common, introduce explicit junction tables:

```text
ProjectVideo
RobotVideo
CompetitionVideo
BlogPostVideo
```

Do not put:

```text
youtubeUrl1
youtubeUrl2
youtubeUrl3
```

inside an entity.

---

# 54. Entity Relationships

The resulting graph should approximately look like:

```text
                    ┌──────────────┐
                    │   Member     │
                    └──────┬───────┘
                           │
             ┌─────────────┼──────────────┐
             ↓             ↓              ↓
        Department      Project         Robot
                           │              │
                           └──────┬───────┘
                                  ↓
                            Competition
                                  │
                         ┌────────┴────────┐
                         ↓                 ↓
                       Result            Award
```

And:

```text
Technology
   ↑
   ├── Member
   ├── Project
   └── Robot
```

---

# 55. Content Graph

The database should make it possible to answer questions such as:

> Which team members worked on the robot used in SML?

or:

> Which projects use ROS 2?

or:

> Which competitions involved this robot?

or:

> Which blog posts discuss this project?

This is one of the major reasons to use a relational database.

---

# 56. Cascading Deletes

Use cascading deletes carefully.

Safe examples:

```text
ProjectMember
ProjectTechnology
RobotMember
RobotTechnology
```

can generally disappear when the parent entity is permanently deleted.

Do not blindly cascade-delete historical content.

---

# 57. Set Null

For relationships where historical content should survive:

```text
Member
Blog author
Sponsor
Award
```

consider:

```text
onDelete: SetNull
```

rather than deleting the dependent content.

---

# 58. Indexes

Add indexes to frequently queried fields.

Likely candidates:

```text
slug
publicationStatus
membershipStatus
year
publishedAt
createdAt
```

and relevant foreign keys.

Do not create indexes on every field.

---

# 59. Query Patterns

The schema should optimize common queries:

### Homepage

```text
Featured projects
Featured robot
Current members
Current competition
Published sponsors
Recent news/blog
```

### Team

```text
Current members
Alumni
Departments
```

### Project

```text
Project
Members
Robot
Technologies
Competition
Media
```

### Competition

```text
Competition
Robots
Projects
Results
Awards
Media
```

---

# 60. Featured Content

The homepage may require explicit featured flags.

For example:

```text
isFeatured Boolean @default(false)
```

on:

- Projects.
- Robots.
- Blog posts.
- News.

However, do not add `isFeatured` to everything automatically.

Only add it where editorial selection is useful.

---

# 61. Ordering

Lists such as:

- Team members.
- Sponsors.
- Departments.
- Gallery items.
- Timeline items.

should support explicit ordering.

Use:

```text
order Int
```

where manual ordering is actually required.

---

# 62. Soft Deletion

For high-value historical entities, prefer:

```text
publicationStatus = ARCHIVED
```

over actual deletion.

Hard deletion should be reserved for:

- Mistakes.
- Duplicate records.
- Unwanted uploads.
- Administrative cleanup.

---

# 63. Database Seeding

The project should have a seed script.

The initial seed should create:

```text
Admin
Departments
Technologies
Social platforms/settings
```

It should **not** invent fake team members, awards, competition results, or sponsors.

---

# 64. Admin Seed

Development may use an environment-provided initial admin.

Example conceptually:

```text
ADMIN_USERNAME
ADMIN_PASSWORD
```

The password must be hashed before insertion.

Do not hard-code the production password into the seed file.

---

# 65. Real Content Rule

The AI implementing the project must never fabricate:

- Team members.
- Competition results.
- Awards.
- Sponsors.
- University endorsements.
- Partnerships.
- Technical achievements.

Empty content is preferable to fake content.

---

# 66. Database Migration Strategy

Initial implementation:

```text
Create schema
↓
Create migration
↓
Run migration
↓
Generate Prisma client
↓
Seed development data
```

Production:

```text
Pull release
↓
Install dependencies
↓
Build
↓
Run Prisma migration
↓
Restart application
```

---

# 67. Backup

PostgreSQL must have a backup strategy before the website becomes production-critical.

At minimum:

- Regular database backups.
- Backup retention.
- Ability to restore.
- Backup verification.

A backup that has never been tested is not considered reliable.

---

# 68. Media Backup

Database backups alone are insufficient.

If media is stored locally, media must also be backed up.

Otherwise:

```text
Database restored
+
Images lost
=
Broken website
```

---

# 69. Database Security

The PostgreSQL user used by the application should have only the permissions it needs.

Do not run the application using a PostgreSQL superuser.

---

# 70. Final Prisma Principle

The final Prisma schema should prioritize:

> **relationships, history, bilingual content, and future growth.**

It should not be optimized only for today's tiny amount of data.

The team may begin with:

```text
5 members
1 robot
1 competition
3 projects
```

but the database should still comfortably support:

```text
100+ members
dozens of robots
hundreds of projects
many competitions
years of historical data
thousands of media items
```

without requiring a fundamental redesign.

---

# 71. Important Implementation Constraint

Before writing the final Prisma schema, the implementing AI should:

1. Inspect the existing repository if available.
2. Inspect the PishTalk repository for relevant patterns.
3. Confirm the installed Prisma version.
4. Check the existing PostgreSQL setup.
5. Avoid duplicating existing infrastructure unnecessarily.
6. Preserve useful deployment conventions.
7. **Never introduce Sharp.**
8. Use **Jimp** for image processing.
9. Keep the public application bilingual without `/en` or `/fa`.
10. Keep the admin interface English-only while allowing English/Persian content editing.

---

# 72. Schema Completion Rule

The AI should not blindly implement every optional model from this document before validating the actual requirements.

The database should be built in logical stages:

```text
Stage 1
Core identity + members + projects + robots + competitions

Stage 2
Blog + news + gallery + sponsors

Stage 3
Applications + contact + timeline + research

Stage 4
Advanced relationships + search + analytics/integrations
```

The schema must remain compatible with all stages.

---

# 73. Final Database Goal

The database should make the website feel like a **living engineering archive**.

A visitor should eventually be able to discover:

```text
IUST Robotics
    ↓
A competition
    ↓
A robot
    ↓
A project
    ↓
A technology
    ↓
A team member
    ↓
Their other projects
```

while the administrators can manage all of this without editing code.

That is the core purpose of the database architecture.

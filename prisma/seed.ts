// Seed script: creates the initial admin account plus a small amount of
// sample content so the site isn't a wall of empty states on first run.
// Docs/06_ADMIN_PANEL.md #3 implies at least one admin account must exist
// to log in at all -- there is no public sign-up flow by design.
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminUsername = process.env.SEED_ADMIN_USERNAME ?? "admin";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "change-me-now";

  const admin = await prisma.admin.upsert({
    where: { username: adminUsername },
    update: {},
    create: {
      username: adminUsername,
      passwordHash: await bcrypt.hash(adminPassword, 12),
      role: "SUPER_ADMIN",
    },
  });
  console.log(`Admin ready: ${admin.username} (change the password after first login)`);

  const software = await prisma.department.upsert({
    where: { slug: "software" },
    update: {},
    create: { nameEn: "Software", nameFa: "نرم‌افزار", slug: "software", order: 1 },
  });
  await prisma.department.upsert({
    where: { slug: "mechanical" },
    update: {},
    create: { nameEn: "Mechanical", nameFa: "مکانیک", slug: "mechanical", order: 2 },
  });
  await prisma.department.upsert({
    where: { slug: "hardware" },
    update: {},
    create: { nameEn: "Hardware", nameFa: "سخت‌افزار", slug: "hardware", order: 3 },
  });
  await prisma.department.upsert({
    where: { slug: "management" },
    update: {},
    create: { nameEn: "Management", nameFa: "مدیریت", slug: "management", order: 4 },
  });

  const ros = await prisma.technology.upsert({
    where: { slug: "ros-2" },
    update: {},
    create: { name: "ROS 2", slug: "ros-2", isPublished: true, category: "Software" },
  });

  const member = await prisma.member.upsert({
    where: { slug: "sample-member" },
    update: {},
    create: {
      name: "Sample Member",
      slug: "sample-member",
      roleEn: "Team Lead",
      bioEn: "Replace this seeded member with a real one from the admin panel.",
      membershipStatus: "CURRENT",
      isPublished: true,
      departments: { create: [{ departmentId: software.id }] },
      technologies: { create: [{ technologyId: ros.id }] },
    },
  });

  await prisma.project.upsert({
    where: { slug: "sample-project" },
    update: {},
    create: {
      titleEn: "Sample Project",
      slug: "sample-project",
      excerptEn: "Replace this seeded project with real content from the admin panel.",
      status: "ACTIVE",
      publicationStatus: "PUBLISHED",
      publishedAt: new Date(),
      members: { create: [{ memberId: member.id, roleEn: "Lead" }] },
      technologies: { create: [{ technologyId: ros.id }] },
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

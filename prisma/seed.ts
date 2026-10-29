import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

async function main() {
  console.log("🌱 Seeding database...");

  // Create config
  await prisma.config.upsert({
    where: { id: "config" },
    update: {},
    create: {
      id: "config",
      bookingsEnabled: false,
      paymentsMode: "test",
      defaultCapacity: 4,
      holdMinutes: 25,
      currency: "gbp",
      timezone: "Europe/London",
      siteTitle: "Twinkle Toe Love – Baby Wellness Spa",
      siteTagline: "Little wonders. Big discoveries.",
      venueStatus: "coming-soon",
      venueNotice:
        "Coming to Nottingham / West Bridgford — venue to be confirmed.",
    },
  });

  // Create services (sample/draft pricing)
  const services = [
    {
      name: "Little Explorers Sensory",
      slug: "little-explorers-sensory",
      description:
        "Guided sensory discovery with age-appropriate textures, sounds, colours and calm exploration.",
      shortDescription: "Sensory discovery for babies 3–12 months",
      pricePence: 1800,
      durationMin: 45,
      ageBand: "3–12 months",
      capacityDefault: 4,
      isActive: true,
      isDraft: true,
      sortOrder: 1,
    },
    {
      name: "Touch & Togetherness",
      slug: "touch-and-togetherness",
      description:
        "Parent-led baby massage, bonding and calming routines, facilitated by a qualified instructor.",
      shortDescription: "Parent-led baby massage",
      pricePence: 2500,
      durationMin: 45,
      ageBand: "6 weeks–12 months",
      capacityDefault: 4,
      isActive: true,
      isDraft: true,
      sortOrder: 2,
    },
    {
      name: "Wonder & Wiggle",
      slug: "wonder-and-wiggle",
      description:
        "Gentle movement, tummy-time style activity where appropriate and sensory exploration.",
      shortDescription: "Gentle movement and sensory play",
      pricePence: 2200,
      durationMin: 45,
      ageBand: "3–18 months",
      capacityDefault: 4,
      isActive: true,
      isDraft: true,
      sortOrder: 3,
    },
  ];

  for (const svc of services) {
    await prisma.service.upsert({
      where: { slug: svc.slug },
      update: svc,
      create: svc,
    });
  }

  console.log("✅ Services seeded");

  // Create admin user if env vars provided
  const adminEmail = process.env.ADMIN_SEED_EMAIL;
  const adminPassword = process.env.ADMIN_SEED_PASSWORD;

  if (adminEmail && adminPassword) {
    const existing = await prisma.adminUser.findUnique({
      where: { email: adminEmail },
    });
    if (!existing) {
      const passwordHash = await hashPassword(adminPassword);
      await prisma.adminUser.create({
        data: {
          email: adminEmail,
          passwordHash,
          role: "owner",
        },
      });
      console.log(`✅ Admin user created: ${adminEmail}`);
    } else {
      console.log(`ℹ️ Admin user already exists: ${adminEmail}`);
    }
  } else {
    console.log(
      "⚠️  No ADMIN_SEED_EMAIL/PASSWORD set — skipping admin user creation",
    );
  }

  console.log("🎉 Seed complete");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

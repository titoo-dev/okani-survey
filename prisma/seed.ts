

import prisma from "@/lib/prisma";

import {
  AFFICHAGE_INFORMATION_CHANNELS,
  CITIES,
  COUNTRIES,
  EVALUATION_OPTIONS,
  LEGAL_ENTITIES,
  LITIGE_CAUSES,
  LITIGE_OUTCOMES,
  OPPOSITION_NATURES,
  PAYMENT_MODES,
  STAGES,
  USER_TYPES,
} from "../lib/descriptors";

async function main() {
  console.log("🌱 Starting database seeding...");

  // Clear existing descriptors
  console.log("Clearing existing descriptors...");
  await prisma.descriptor.deleteMany();

  // Combine all descriptors
  const allDescriptors = [
    ...PAYMENT_MODES,
    ...EVALUATION_OPTIONS,
    ...OPPOSITION_NATURES,
    ...LITIGE_CAUSES,
    ...LITIGE_OUTCOMES,
    ...USER_TYPES,
    ...LEGAL_ENTITIES,
    ...STAGES,
    ...AFFICHAGE_INFORMATION_CHANNELS,
    ...COUNTRIES,
    ...CITIES,
  ];

  console.log(`Creating ${allDescriptors.length} descriptors...`);

  // Create descriptors
  const result = await prisma.descriptor.createMany({
    data: allDescriptors,
    skipDuplicates: true,
  });

  console.log(`✅ Created ${result.count} descriptors`);

  // Verify counts by type
  const types = [
    "payment_mode",
    "evaluation",
    "opposition_nature",
    "litige_cause",
    "litige_outcome",
    "user_type",
    "legal_entity",
    "stage",
    "affichage_channel",
    "country",
    "city",
  ];

  console.log("\n📊 Descriptors by type:");
  for (const type of types) {
    const count = await prisma.descriptor.count({
      where: { type },
    });
    console.log(`  ${type}: ${count}`);
  }

  console.log("\n✨ Database seeding completed successfully!");
}

main()
  .catch((error) => {
    console.error("❌ Error during seeding:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import "dotenv/config";
import { prisma } from "./db.ts";
import { members, publications, events } from "./seed-data.ts";

/** Idempotent: only seeds when the tables are empty. */
async function main() {
  const [memberCount, pubCount, eventCount] = await Promise.all([
    prisma.member.count(),
    prisma.publication.count(),
    prisma.event.count(),
  ]);

  if (memberCount === 0) {
    await prisma.member.createMany({ data: members });
    console.log(`Seeded ${members.length} members`);
  }
  if (pubCount === 0) {
    await prisma.publication.createMany({ data: publications });
    console.log(`Seeded ${publications.length} publications`);
  }
  if (eventCount === 0) {
    await prisma.event.createMany({
      data: events.map((e) => ({ ...e, date: new Date(e.date) })),
    });
    console.log(`Seeded ${events.length} events`);
  }
  if (memberCount && pubCount && eventCount) {
    console.log("Database already seeded — skipping");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

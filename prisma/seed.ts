import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { databaseUrl } from '../config.js';

const connectionString = `${databaseUrl}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Cleaning up database...');
  await prisma.seashell.deleteMany();

  const shells = [
    {
      name: 'Queen Conch',
      species: 'Aliger gigas',
      description: 'A very large edible sea snail with a iconic pink interior.',
      rarity: 'common',
    },
    {
      name: 'Golden Cowrie',
      species: 'Lyncina aurantium',
      description: 'A rare and prized shell historically reserved for chieftains in the Pacific.',
      rarity: 'rare',
    },
    {
      name: 'Chambered Nautilus',
      species: 'Nautilus pompilius',
      description: 'The best-known species of nautilus, featuring a perfect logarithmic spiral.',
      rarity: 'rare',
    },
    {
      name: 'Conus gloriamaris',
      species: 'Glory of the Seas Cone',
      description: 'One of the most famous and once rarest shells in the world.',
      rarity: 'legendary',
    },
    {
      name: 'Scallop',
      species: 'Pecten maximus',
      description: 'A common bivalve mollusk widely used in art and heraldry.',
      rarity: 'common',
    },
  ];

  console.log(`Seeding ${shells.length} seashells...`);

  for (const shell of shells) {
    await prisma.seashell.create({
      data: shell,
    });
  }

  console.log('Database seeded successfully! 🐚');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
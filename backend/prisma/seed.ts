import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const defaultCategories = [
    { name: 'Plastic', description: 'Recyclable plastics like PET, HDPE, PVC' },
    { name: 'Metal', description: 'Ferrous and non-ferrous scrap metals' },
    { name: 'Glass', description: 'Glass jars, bottles, and cullet' },
    { name: 'Paper', description: 'Cardboard, newspapers, office paper' },
    { name: 'Wood', description: 'Pallets, timber scrap, sawdust' },
    { name: 'E-Waste', description: 'Discarded electronic appliances and components' },
  ];

  for (const cat of defaultCategories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
  }
  console.log('Seeded database with categories');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

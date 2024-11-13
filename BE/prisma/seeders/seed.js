const { PrismaClient } = require("@prisma/client");
const { UsersSeeder } = require("./users.seeders");
const { MajorsSeeders } = require("./majors.seeders");
const { ClassesSeeders } = require("./classes.seeders");
const { MyClassesSeeders } = require("./myclasses.seeders");
const prisma = new PrismaClient();

async function main() {
  await reset();

  const createUser = await UsersSeeder();
  const createMajor = await MajorsSeeders();

  const createClasses = await ClassesSeeders(createMajor, createUser);
  await MyClassesSeeders(createUser, createClasses);
}

async function reset() {
  await prisma.user.deleteMany();
  await prisma.major.deleteMany();
  await prisma.classes.deleteMany();
  await prisma.studentClasses.deleteMany();
  await prisma.studentPresence.deleteMany();
  await prisma.classMeets.deleteMany();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

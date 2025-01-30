const { PrismaClient } = require("@prisma/client");
const { UsersSeeder } = require("./users.seeders");
const { MajorsSeeders } = require("./majors.seeders");
const { ClassesSeeders } = require("./classes.seeders");
const { MyClassesSeeders } = require("./myclasses.seeders");
const { ClassesMeetSeeders } = require("./studentmeets.seeders");
const { StudentPresencesSeeders } = require("./studentpresences.seeders");
const { mongoClient } = require("../../src/config/mongo.config");
const prisma = new PrismaClient();

async function main() {
  const [client, db] = await mongoClient();
  await db.collection("faces").deleteMany({});
  await client.close();

  await reset();
  const createMajor = await MajorsSeeders(prisma);
  const createUser = await UsersSeeder(prisma, createMajor);
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

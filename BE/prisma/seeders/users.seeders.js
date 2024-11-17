const { PrismaClient, ROLE } = require("@prisma/client");
const bcrypt = require("bcrypt");

/**
 *
 * @param {PrismaClient} prisma
 * @returns
 */
exports.UsersSeeder = async (prisma) => {
  return new Promise(async (resolve, reject) => {
    const datas = [
      {
        identity: "10121571",
        name: "I Ketut Krisna Kertajaya",
        phone: "081314206253",
        password: bcrypt.hashSync("tes123", 10),
        role: ROLE.mahasiswa,
      },
      {
        identity: "123",
        name: "Meta Meysawati",
        phone: "081679879897",
        password: bcrypt.hashSync("tes123", 10),
        role: ROLE.sekdos,
      },
      {
        identity: "456",
        name: "Lintang Bandowosari",
        phone: "08659497989",
        password: bcrypt.hashSync("tes123", 10),
        role: ROLE.dosen,
      },
    ];

    try {
      const results = [];

      for await (const data of datas) {
        const result = await prisma.user.create({
          data: data,
        });

        results.push(result);
      }

      console.log("Created user seeders");

      resolve(results);
    } catch (error) {
      reject(error.message);
    }
  });
};

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
        identity: "999",
        name: "Murid",
        phone: "081999999999",
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
        name: "Lintang Yuniar Banowosari",
        phone: "08659497989",
        password: bcrypt.hashSync("tes123", 10),
        role: ROLE.dosen,
      },
      {
        identity: "451",
        name: "Dea Adlina",
        phone: "08659497981",
        password: bcrypt.hashSync("tes123", 10),
        role: ROLE.dosen,
      },
      {
        identity: "452",
        name: "Maria",
        phone: "08659497982",
        password: bcrypt.hashSync("tes123", 10),
        role: ROLE.dosen,
      },
      {
        identity: "453",
        name: "Cut Maisyarah Karyati",
        phone: "08659497983",
        password: bcrypt.hashSync("tes123", 10),
        role: ROLE.dosen,
      },
      {
        identity: "454",
        name: "Purnawarman Musa",
        phone: "08659497984",
        password: bcrypt.hashSync("tes123", 10),
        role: ROLE.dosen,
      },
      {
        identity: "455",
        name: "Budi Utami Fahnun",
        phone: "08659497985",
        password: bcrypt.hashSync("tes123", 10),
        role: ROLE.dosen,
      },
      {
        identity: "457",
        name: "Miftah Andriansyah",
        phone: "08659497987",
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

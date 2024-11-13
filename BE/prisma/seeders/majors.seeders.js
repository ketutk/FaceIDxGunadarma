const { PrismaClient, ROLE } = require("@prisma/client");
const prisma = new PrismaClient();

exports.MajorsSeeders = async () => {
  return new Promise(async (resolve, reject) => {
    const datas = {
      name: "Sistem Informasi",
      major_code: "KA",
    };

    try {
      const result = await prisma.major.create({
        data: datas,
      });

      console.log("Created major seeders");
      resolve(result);
    } catch (e) {
      console.log("error", e);
      reject(null);
    }
  });
};

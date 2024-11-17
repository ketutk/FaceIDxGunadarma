const { PrismaClient, ROLE } = require("@prisma/client");

/**
 *
 * @param {PrismaClient} prisma
 * @returns
 */
exports.ClassesMeetSeeders = async (prisma, classes) => {
  return new Promise(async (resolve, reject) => {
    try {
      const classesMeets = [];

      for await (const [index, classdata] of classes.entries()) {
        for (let i = 0; i < 14; i++) {
          const result = await prisma.classMeets.create({
            data: {
              class_id: classdata.id,
              meet_number: i + 1,
            },
          });

          classesMeets.push(result);
        }
      }

      console.log("Created class meets seeders");
      resolve(classesMeets);
    } catch (e) {
      console.log("error", e);
      reject(null);
    }
  });
};

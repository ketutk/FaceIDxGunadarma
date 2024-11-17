const { PrismaClient, ROLE } = require("@prisma/client");

/**
 *
 * @param {PrismaClient} prisma
 * @returns
 */
exports.StudentPresencesSeeders = async (prisma, studentClasses, classesMeets) => {
  return new Promise(async (resolve, reject) => {
    try {
      for await (const [index, studentClass] of studentClasses.entries()) {
        const classesMeet = classesMeets.filter((e) => e.class_id == studentClass.class_id);

        for (let i = 0; i < 5; i++) {
          const date = new Date();
          date.setDate(date.getDate() + i * 7);
          await prisma.studentPresence.create({
            data: {
              class_meet_id: classesMeet[i].id,
              student_class_id: studentClass.id,
              created_at: date,
            },
          });
        }
      }

      console.log("Created student classes seeders");
      resolve(true);
    } catch (e) {
      console.log("error", e);
      reject(null);
    }
  });
};

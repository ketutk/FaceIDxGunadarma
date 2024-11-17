const { PrismaClient, ROLE } = require("@prisma/client");

/**
 *
 * @param {PrismaClient} prisma
 * @returns
 */
exports.MyClassesSeeders = async (prisma, users, classes) => {
  return new Promise(async (resolve, reject) => {
    try {
      const studentClasses = [];
      const student = users.find((user) => user.role == ROLE.mahasiswa);

      classes.pop();

      for await (const data of classes) {
        const result = await prisma.studentClasses.create({
          data: {
            student_id: student.id,
            class_id: data.id,
          },
        });

        studentClasses.push(result);
      }

      console.log("Created student class seeders");
      resolve(studentClasses);
    } catch (e) {
      console.log("error", e);
      reject(null);
    }
  });
};

const { PrismaClient, ROLE } = require("@prisma/client");
const prisma = new PrismaClient();

exports.MyClassesSeeders = async (users, classes) => {
  return new Promise(async (resolve, reject) => {
    try {
      const student = users.find((user) => user.role == ROLE.mahasiswa);

      for await (const data of classes) {
        await prisma.studentClasses.create({
          data: {
            student_id: student.id,
            class_id: data.id,
          },
        });
      }

      console.log("Created student class seeders");
      resolve(true);
    } catch (e) {
      console.log("error", e);
      reject(null);
    }
  });
};

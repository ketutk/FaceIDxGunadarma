const { prismaConnect } = require("../../libs/prisma.helper");

class StudentClassesRepository {
  async getNewestMyClassesByUserId(user_id) {
    return await prismaConnect(async (prisma) => {
      return await prisma.studentClasses.findMany({
        where: {
          student_id: user_id,
        },
        take: 3,
        orderBy: {
          created_at: "desc",
        },
        include: {
          class: {
            include: {
              major: true,
            },
          },
        },
      });
    });
  }
}

module.exports = StudentClassesRepository;

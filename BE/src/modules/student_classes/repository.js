const { prismaConnect } = require("../../libs/prisma.helper");

class StudentClassesRepository {
  /**
   * @typedef {Object} getMyClassesData
   * @property {number} page
   * @property {number} take
   */

  async getNewestUserClasses(user_id) {
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

  /**
   *
   * @param {*} user_id
   * @param {getMyClassesData} data
   * @returns
   */
  async getMyClassesByUserId(user_id, data) {
    const { take, page } = data;

    const skip = (parseInt(page) - 1) * parseInt(take);

    const [datas, totalItems] = await prismaConnect(async (prisma) => {
      return await Promise.all([
        prisma.studentClasses.findMany({
          where: {
            student_id: user_id,
          },
          take: take,
          skip: skip,
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
        }),
        prisma.studentClasses.count({
          where: {
            student_id: user_id,
          },
        }),
      ]);
    });

    const totalPages = Math.ceil(totalItems / take);

    return {
      page: page,
      total_page: totalPages,
      data: datas,
    };
  }

  async createStudentClasses(user_id, classes_id) {
    return await prismaConnect(async (prisma) => {
      return await prisma.studentClasses.create({
        data: {
          class_id: classes_id,
          student_id: user_id,
        },
      });
    });
  }

  async getStudentClassesByUserIdAndClassesId(user_id, classes_id) {
    return await prismaConnect(async (prisma) => {
      return await prisma.studentClasses.findFirst({
        where: {
          student_id: user_id,
          class_id: classes_id,
        },
        include: {
          student_presences: {
            include: {
              class_meet: true,
            },
            orderBy: {
              class_meet: {
                meet_number: "asc",
              },
            },
          },
          _count: {
            select: {
              student_presences: true,
            },
          },
        },
      });
    });
  }

  async getAllStudentClassesByClassesId(classes_id) {
    return await prismaConnect(async (prisma) => {
      return await prisma.studentClasses.findMany({
        where: {
          class_id: classes_id,
        },
        include: {
          students: true,
        },
      });
    });
  }
}

module.exports = StudentClassesRepository;

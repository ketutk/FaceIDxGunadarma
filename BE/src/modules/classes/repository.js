const { prismaConnect } = require("../../libs/prisma.helper");

class ClassesRepository {
  /**
   * @param {string} search
   * @param {string?} user_id
   */
  async getAllClasses(search, user_id) {
    const where = {};

    if (search) {
      const AND = [];
      search.split(" ").forEach((item) => {
        AND.push({
          name: {
            contains: item,
            mode: "insensitive",
          },
        });
      });
      where.AND = AND;
    } else where.name = { contains: "" };

    if (user_id) {
      where.student_classes = {
        none: {
          student_id: user_id,
        },
      };
    }

    return await prismaConnect(async (prisma) => {
      return await prisma.classes.findMany({
        where: where,
        orderBy: {
          name: "asc",
        },
        include: {
          lecturer: {
            select: {
              name: true,
              identity: true,
            },
          },
        },
      });
    });
  }

  async getClassById(classes_id) {
    return await prismaConnect(async (prisma) => {
      return await prisma.classes.findUnique({
        where: {
          id: classes_id,
        },
        include: {
          lecturer: {
            select: {
              identity: true,
              name: true,
              phone: true,
            },
          },
          _count: {
            select: {
              class_meets: true,
            },
          },
          major: true,
        },
      });
    });
  }
}

module.exports = ClassesRepository;

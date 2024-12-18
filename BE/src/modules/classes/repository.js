const { prismaConnect } = require("../../libs/prisma.helper");

class ClassesRepository {
  async addClasses(data) {
    return await prismaConnect(async (prisma) => {
      return await prisma.classes.create({
        data: {
          ...data,
        },
      });
    });
  }
  async editClassesById(data, classes_id) {
    return await prismaConnect(async (prisma) => {
      return await prisma.classes.update({
        where: {
          id: classes_id,
        },
        data: {
          ...data,
        },
      });
    });
  }
  async deleteClassesById(classes_id) {
    return await prismaConnect(async (prisma) => {
      return await prisma.classes.delete({
        where: {
          id: classes_id,
        },
      });
    });
  }
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

  async getLecturerClassesByLecturerId(lecturer_id, data) {
    const { take, page } = data;

    const skip = (parseInt(page) - 1) * parseInt(take);

    const [datas, totalItems] = await prismaConnect(async (prisma) => {
      return await Promise.all([
        prisma.classes.findMany({
          where: {
            lecturer_id: lecturer_id,
          },
          take: take,
          skip: skip,
          orderBy: {
            created_at: "desc",
          },
          include: {
            major: true,
          },
        }),
        prisma.classes.count({
          where: {
            lecturer_id: lecturer_id,
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

  async getNewestLecturerClasses(lecturer_id) {
    return await prismaConnect(async (prisma) => {
      const rawClasses = await prisma.$queryRaw`
        SELECT 
          c.*, 
          m.id AS major_id, 
          m.name AS major_name, 
          m.major_code AS major_code,
          MAX(cm.meet_start) AS latest_meet_date
        FROM "classes" c
        JOIN "class_meets" cm ON c.id = cm."class_id"
        JOIN "majors" m ON c."major_id" = m.id
        WHERE c."lecturer_id" = ${lecturer_id}
        GROUP BY c.id, m.id
        ORDER BY latest_meet_date DESC
        LIMIT 3;
      `;

      // Transform the raw result into the desired format
      return rawClasses.map((rawClass) => ({
        id: rawClass.id,
        major_id: rawClass.major_id,
        lecturer_id: rawClass.lecturer_id,
        school_year_type: rawClass.school_year_type,
        school_year: rawClass.school_year,
        subject: rawClass.subject,
        college_level: rawClass.college_level,
        class_number: rawClass.class_number,
        name: rawClass.name,
        created_at: rawClass.created_at,
        major: {
          id: rawClass.major_id,
          name: rawClass.major_name,
          major_code: rawClass.major_code,
        },
      }));
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

  async getDosenDetailClassesById(lecturer_id, classes_id) {
    return await prismaConnect(async (prisma) => {
      return await prisma.classes.findUnique({
        where: {
          lecturer_id: lecturer_id,
          id: classes_id,
        },
        include: {
          _count: {
            select: {
              class_meets: true,
              student_classes: true,
            },
          },
          class_meets: {
            orderBy: {
              meet_number: "asc",
            },
          },
          student_classes: {
            include: {
              students: true,
              _count: {
                select: {
                  student_presences: true,
                },
              },
            },
          },
          major: true,
        },
      });
    });
  }
}

module.exports = ClassesRepository;

const { ROLE } = require("@prisma/client");
const { prismaConnect } = require("../../libs/prisma.helper");

class StudentRepository {
  async getAllStudent(data) {
    const { take, page, search } = data;

    const skip = (parseInt(page) - 1) * parseInt(take);

    const where = {
      OR: [{ name: { contains: search, mode: "insensitive" } }, { identity: { contains: search, mode: "insensitive" } }, { phone: { contains: search, mode: "insensitive" } }],
      role: ROLE.mahasiswa,
    };

    const [datas, totalItems] = await prismaConnect(async (prisma) => {
      return await Promise.all([
        prisma.user.findMany({
          where: where,
          take: take,
          skip: skip,
          orderBy: {
            name: "asc",
          },
        }),
        prisma.user.count({
          where: where,
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

  async getStudentDetailByStudentId(id) {
    return await prismaConnect(async (prisma) => {
      return await prisma.user.findUnique({
        where: {
          id: id,
        },
      });
    });
  }

  async getStudentClassPresences(student_id, classes_id) {
    return await prismaConnect(async (prisma) => {
      return await prisma.studentClasses.findFirst({
        where: {
          student_id,
          class_id: classes_id,
        },
        include: {
          student_presences: {
            include: {
              class_meet: true,
            },
          },
          class: {
            select: {
              name: true,
              lecturer: {
                select: {
                  name: true,
                  phone: true,
                  identity: true,
                },
              },
              _count: {
                select: {
                  class_meets: true,
                },
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
}

module.exports = StudentRepository;

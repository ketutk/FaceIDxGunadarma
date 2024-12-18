const { prismaConnect } = require("../../libs/prisma.helper");

class ClassesMeetRepository {
  async getLatestClassMeetByClassesId(classes_id) {
    return await prismaConnect(async (prisma) => {
      return await prisma.classMeets.findFirst({
        where: {
          class_id: classes_id,
        },
        take: 1,
        orderBy: {
          meet_number: "desc",
        },
      });
    });
  }

  async getClassesMeetById(classes_id, meet_id) {
    return await prismaConnect(async (prisma) => {
      return await prisma.classMeets.findUnique({
        where: {
          id: meet_id,
          class_id: classes_id,
        },
        include: {
          class: true,
          student_presences: {
            include: {
              student_class: {
                include: {
                  students: {
                    select: {
                      id: true,
                      identity: true,
                      name: true,
                      phone: true,
                    },
                  },
                },
              },
            },
            orderBy: {
              created_at: "desc",
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

  async addClassMeetByClassesId(classes_id, data) {
    const { meet_number, meet_start } = data;
    return await prismaConnect(async (prisma) => {
      return await prisma.classMeets.create({
        data: {
          meet_number,
          meet_start,
          class: {
            connect: {
              id: classes_id,
            },
          },
        },
      });
    });
  }
}

module.exports = ClassesMeetRepository;

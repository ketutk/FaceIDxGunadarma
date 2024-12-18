const { prismaConnect } = require("../../libs/prisma.helper");

class StudentPresencesRepository {
  async addPresence(student_class_id, meet_id) {
    return await prismaConnect(async (prisma) => {
      return await prisma.studentPresence.create({
        data: {
          class_meet_id: meet_id,
          student_class_id,
        },
      });
    });
  }
  async getPresenceByStudentAndMeetId(student_class_id, meet_id) {
    return await prismaConnect(async (prisma) => {
      return await prisma.studentPresence.findFirst({
        where: {
          class_meet_id: meet_id,
          student_class_id,
        },
      });
    });
  }
}

module.exports = StudentPresencesRepository;

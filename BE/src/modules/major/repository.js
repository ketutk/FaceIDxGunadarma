const { prismaConnect } = require("../../libs/prisma.helper");

class MajorRepository {
  async getMajorById(major_id) {
    return await prismaConnect(async (prisma) => {
      return await prisma.major.findUnique({
        where: {
          id: major_id,
        },
      });
    });
  }

  async getAllMajor() {
    return await prismaConnect(async (prisma) => {
      return await prisma.major.findMany({});
    });
  }
}

module.exports = MajorRepository;

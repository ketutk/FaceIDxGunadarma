const { PrismaClient, ROLE } = require("@prisma/client");
const { mongoClient } = require("../../config/mongo.config");
const { prismaConnect } = require("../../libs/prisma.helper");
class AuthRepository {
  async checkDuplicate(identity, phone) {
    return await prismaConnect(async (prisma) => {
      return await Promise.all([
        prisma.user.findUnique({
          where: {
            identity: identity,
          },
        }),
        prisma.user.findUnique({
          where: {
            phone: phone,
          },
        }),
      ]);
    });
  }

  async register(data) {
    return await prismaConnect(async (prisma) => {
      return prisma.user.create({
        data: {
          identity: data.identity,
          name: data.name,
          phone: data.phone,
          password: data.password,
          role: ROLE.mahasiswa,
        },
      });
    });
  }

  async changePassword(user_id, hashedPassword) {
    return await prismaConnect(async (prisma) => {
      return await prisma.user.update({
        where: {
          id: user_id,
        },
        data: {
          password: hashedPassword,
        },
      });
    });
  }

  async createFaceDescriptor(user_id, face) {
    const [client, db] = await mongoClient();

    await db.collection("faces").insertOne({
      user_id: user_id,
      face: face,
    });
  }
  async getFaceDescriptorByUserId(user_id) {
    const [client, db] = await mongoClient();

    return await db.collection("faces").findOne({
      user_id: user_id,
    });
  }

  async getUserByIdentity(identity) {
    return await prismaConnect(async (prisma) => {
      return await prisma.user.findFirst({ where: { identity } });
    });
  }
}

module.exports = AuthRepository;

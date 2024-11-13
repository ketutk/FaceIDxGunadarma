const { PrismaClient, ROLE } = require("@prisma/client");

/**
 * @param {(prisma: PrismaClient) => Promise<any>} func - A callback function with PrismaClient as a parameter.
 * @returns {Promise<any>}
 */

let prisma;

if (!prisma) {
  prisma = new PrismaClient();
}

exports.prismaConnect = async (func) => {
  return await func(prisma);
};

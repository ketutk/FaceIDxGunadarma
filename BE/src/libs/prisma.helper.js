const { PrismaClient, ROLE } = require("@prisma/client");

/**
 * @type {PrismaClient}
 */
let prisma;

if (!prisma) {
  prisma = new PrismaClient();
}

/**
 * @param {(prisma: PrismaClient) => Promise<any>} func - A callback function with PrismaClient as a parameter.
 * @returns {Promise<any>}
 */
exports.prismaConnect = async (func) => {
  return await func(prisma);
};

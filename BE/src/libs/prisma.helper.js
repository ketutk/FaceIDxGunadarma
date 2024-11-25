const { PrismaClient, ROLE } = require("@prisma/client");

/**
 * @type {PrismaClient & {showQuery:boolean}}
 */
let prisma;

if (!prisma) {
  prisma = new PrismaClient({
    log: [{ level: "query", emit: "event" }],
  });
}

if (prisma.showQuery) {
  prisma.$on("query", (e) => {
    console.log(e.query);
  });
}

/**
 * @param {(prisma: PrismaClient & {showQuery:boolean}) => Promise<any>} func - A callback function with PrismaClient as a parameter.
 * @returns {Promise<any>}
 */
exports.prismaConnect = async (func) => {
  return await func(prisma);
};

const { ROLE } = require("@prisma/client");
const jsonwebtoken = require("jsonwebtoken");
const { prismaConnect } = require("../libs/prisma.helper");
module.exports = {
  /**
   *
   * @typedef {Object} User
   * @property {string} id - The id of the user.
   * @property {string} identity - The identity of the user.
   * @property {string} name - The name of the user.
   * @property {string} phone - The phone of the user.
   * @property {ROLE} role - The role of the user.
   */

  /**
   * @typedef {import("express").Request & { user_data?: User }} CustomRequest
   */

  /**
   *
   * @param {CustomRequest} req
   */

  middleware: async (req, res, next) => {
    try {
      if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        try {
          const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);

          const user = await prismaConnect(async (prisma) => {
            return await prisma.user.findUnique({
              where: {
                id: decoded.id,
              },
            });
          });

          if (!user) throw null;

          req.user_data = decoded;
          next();
        } catch {
          return res.status(401).json({
            status: false,
            message: "Authentication failed, jwt invalid.",
            data: null,
          });
        }
      } else {
        return res.status(401).json({
          status: false,
          message: "Authentication failed, please login.",
          data: null,
        });
      }
      /* c8 ignore start */
    } catch (error) {
      // console.log(error);
      next(error);
    }
  },

  /**
   *
   * @typedef {Object} User
   * @property {string} id - The id of the user.
   * @property {string} identity - The identity of the user.
   * @property {string} name - The name of the user.
   * @property {string} phone - The phone of the user.
   * @property {ROLE} role - The role of the user.
   */

  /**
   * @typedef {import("express").Request & { user_data?: User }} CustomRequest
   */

  /**
   * Middleware to authorize based on user roles.
   * @param {string[]} roles - The roles allowed to access the route.
   * @returns {(req: CustomRequest, res: import("express").Response, next: import("express").NextFunction) => void} Middleware function
   */
  authorize: (roles) => {
    return (req, res, next) => {
      try {
        if (!roles.includes(req.user_data.role)) {
          return res.status(403).json({
            status: false,
            message: "Authentication failed, unauthorized.",
            data: null,
          });
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  },
};

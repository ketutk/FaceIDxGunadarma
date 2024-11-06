const { PrismaClient, ROLE } = require("@prisma/client");
const prisma = new PrismaClient();
const { generateRandomString } = require("../../libs/randomString");
const { mongoClient } = require("../../config/mongo.config");
const { registerSchema } = require("./validation");
const { simplifyZodError } = require("../../libs/zod");
const { throwError, response } = require("../../libs/response");
const AuthService = require("./service");

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }
  login = async (req, res, next) => {
    try {
      let { identity, password } = req.body;

      if (!identity || !password) {
        throwError(400, "Terdapat beberapa field kosong");
      }

      const result = await this.authService.login({ identity, password });

      return response(res, 200, result, "Login berhasil");
    } catch (error) {
      next(error);
    }
  };

  register = async (req, res, next) => {
    try {
      const { name, identity, phone, password, face } = req.body;

      const validate = registerSchema.safeParse({ name, identity, phone, password, face });

      if (!validate.success) {
        const zodResponse = simplifyZodError(validate.error);
        throwError(400, zodResponse);
      }

      const result = await this.authService.register(validate.data);

      return response(res, 201, result, "Register berhasil");
    } catch (error) {
      next(error);
    }
  };

  profile = async (req, res, next) => {
    try {
      const [client, db] = await mongoClient();

      const userFaces = await db.collection("faces").findOne({ user_id: req.user_data.id });

      return res.status(200).json({
        status: true,
        message: "OK",
        data: {
          ...req.user_data,
          faces: userFaces.faces,
        },
      });
    } catch (e) {
      next(e);
    }
  };
}

module.exports = AuthController;

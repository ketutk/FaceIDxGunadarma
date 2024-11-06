const { throwError } = require("../../libs/response");
const AuthRepository = require("./repository");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");

class AuthService {
  constructor() {
    this.authRepo = new AuthRepository();
  }
  async register(data) {
    try {
      const [duplicateIdentity, duplicatePhone] = await this.authRepo.checkDuplicate(data.identity, data.phone);

      if (duplicateIdentity) {
        throwError(409, "NPM sudah digunakan");
      }
      if (duplicatePhone) {
        throwError(409, "Nomor telepon sudah digunakan");
      }

      let encryptedPassword = await bcrypt.hash(data.password, 10);
      data.password = encryptedPassword;

      const user = await this.authRepo.register(data);
      await this.authRepo.createFaceDescriptor(user.id, data.face);

      delete user.password;

      return user;
    } catch (e) {
      throw e;
    }
  }

  async login(data) {
    try {
      const { identity, password } = data;

      const user = await this.authRepo.getUserByIdentity(identity);

      if (!user) {
        throwError(400, "Nomor Identitas atau Password salah");
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        throwError(400, "Nomor Identitas atau Password salah");
      }
      delete user.password;

      const token = jwt.sign(user, JWT_SECRET);
      return { ...user, token };
    } catch (e) {
      throw e;
    }
  }
}

module.exports = AuthService;

const { response } = require("../../libs/response");
const MajorService = require("./service");

class MajorController {
  constructor() {
    this.majorService = new MajorService();
  }
  getAllMajor = async (req, res, next) => {
    try {
      const result = await this.majorService.getAllMajor();

      return response(res, 200, result);
    } catch (e) {
      next(e);
    }
  };
}

module.exports = MajorController;

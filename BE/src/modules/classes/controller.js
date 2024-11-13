const { response } = require("../../libs/response");
const ClassesService = require("./service");

class ClassesController {
  constructor() {
    this.classesService = new ClassesService();
  }
  getMyClasses = async (req, res, next) => {
    try {
      const result = await this.classesService.getMyClasses(req.user_data.id);

      return response(res, 200, result);
    } catch (e) {
      next(e);
    }
  };
}

module.exports = ClassesController;

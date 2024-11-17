const { response } = require("../../libs/response");
const ClassesService = require("./service");

class ClassesController {
  constructor() {
    this.classesService = new ClassesService();
  }
  joinClasses = async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await this.classesService.joinClassesByUserIdAndClassId(req.user_data.id, id);

      return response(res, 201, result, "Berhasil gabung kelas");
    } catch (e) {
      next(e);
    }
  };
  getNewestUserClasses = async (req, res, next) => {
    try {
      const result = await this.classesService.getNewestUserClasses(req.user_data.id);

      return response(res, 200, result);
    } catch (e) {
      next(e);
    }
  };

  getAllMyClasses = async (req, res, next) => {
    try {
      const { page = 1 } = req.query;

      const result = await this.classesService.getAllMyClasses(req.user_data.id, +page);

      return response(res, 200, result);
    } catch (e) {
      next(e);
    }
  };

  getAllClasses = async (req, res, next) => {
    try {
      const { search = "" } = req.query;

      const result = await this.classesService.getAllClasses(search);

      return response(res, 200, result);
    } catch (e) {
      next(e);
    }
  };

  getMahasiswaDetailClassesById = async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await this.classesService.getMahasiswaDetailClassesById(req.user_data.id, id);

      return response(res, 200, result);
    } catch (e) {
      next(e);
    }
  };
}

module.exports = ClassesController;

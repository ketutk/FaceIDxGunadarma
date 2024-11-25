const { response, throwError } = require("../../libs/response");
const { simplifyZodError } = require("../../libs/zod");
const ClassesService = require("./service");
const { addClassSchema } = require("./validation");

class ClassesController {
  constructor() {
    this.classesService = new ClassesService();
  }
  addClasses = async (req, res, next) => {
    try {
      const { school_year_type, school_year, subject, college_level, class_number, major_id } = req.body;

      const validate = addClassSchema.safeParse({ school_year_type, school_year, subject, college_level, class_number, major_id });

      if (!validate.success) {
        const zodResponse = simplifyZodError(validate.error);
        throwError(400, zodResponse);
      }

      validate.data.lecturer_id = req.user_data.id;

      const result = await this.classesService.addClasses(validate.data);

      return response(res, 201, result, "Tambah kelas berhasil");
    } catch (e) {
      next(e);
    }
  };

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

  getNewestLecturerClasses = async (req, res, next) => {
    try {
      const result = await this.classesService.getNewestLecturerClasses(req.user_data.id);
      return response(res, 201, result, null);
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

  getLecturerClassesByLecturerId = async (req, res, next) => {
    try {
      const { page = 1 } = req.query;

      const result = await this.classesService.getLecturerClassesByLecturerId(req.user_data.id, +page);

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

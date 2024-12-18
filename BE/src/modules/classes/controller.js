const { response, throwError } = require("../../libs/response");
const { simplifyZodError } = require("../../libs/zod");
const ClassesService = require("./service");
const { addClassSchema, addMeetSchema, addPresenceSchema } = require("./validation");

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

  editClassesById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { school_year_type, school_year, subject, college_level, class_number, major_id } = req.body;

      const validate = addClassSchema.safeParse({ school_year_type, school_year, subject, college_level, class_number, major_id });

      if (!validate.success) {
        const zodResponse = simplifyZodError(validate.error);
        throwError(400, zodResponse);
      }

      const result = await this.classesService.editClassesById(validate.data, id);

      return response(res, 201, result, "Ubah kelas berhasil");
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
  addClassesMeet = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { meet_start } = req.body;

      const validate = addMeetSchema.safeParse({ meet_start });

      if (!validate.success) {
        const zodResponse = simplifyZodError(validate.error);
        throwError(400, zodResponse);
      }

      const result = await this.classesService.addClassesMeet(id, validate.data);

      return response(res, 201, result, "Berhasil membuat pertemuan");
    } catch (e) {
      next(e);
    }
  };

  deleteClassesById = async (req, res, next) => {
    try {
      const { id } = req.params;

      await this.classesService.deleteClassesById(id);

      return response(res, 200, null, "Berhasil menghapus kelas");
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

  getLecturerClassesMeet = async (req, res, next) => {
    try {
      const { classes_id, meet_id } = req.params;

      const data = await this.classesService.getLecturerClassesMeet(classes_id, meet_id);

      return response(res, 200, data, null);
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

  getDosenDetailClassesById = async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await this.classesService.getDosenDetailClassesById(req.user_data.id, id);

      if (!result) throwError(404, "Kelas tidak ditemukan");

      return response(res, 200, result, null);
    } catch (e) {
      next(e);
    }
  };

  addPresence = async (req, res, next) => {
    try {
      const { classes_id, meet_id, face } = req.body;

      const validate = addPresenceSchema.safeParse({ classes_id, meet_id, face });

      if (!validate.success) {
        const zodResponse = simplifyZodError(validate.error);
        throwError(400, zodResponse);
      }

      const result = await this.classesService.addPresence(validate.data);

      return response(res, 201, true, "Berhasil melakukan absensi");
    } catch (e) {
      next(e);
    }
  };
}

module.exports = ClassesController;

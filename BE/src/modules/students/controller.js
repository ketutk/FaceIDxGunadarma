const { response } = require("../../libs/response");
const StudentService = require("./service");

class StudentController {
  constructor() {
    this.studentService = new StudentService();
  }
  getAllStudent = async (req, res, next) => {
    try {
      const { page = 1, search = "" } = req.query;

      const result = await this.studentService.getAllStudent({ page: +page, search, take: 10 });

      return response(res, 200, result);
    } catch (e) {
      next(e);
    }
  };

  getStudentClassesByStudentId = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { page = 1 } = req.query;

      const result = await this.studentService.getStudentClassesByStudentId(id, { page: +page, take: 10 });

      return response(res, 200, result);
    } catch (e) {
      next(e);
    }
  };

  getStudentDetailByStudentId = async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await this.studentService.getStudentDetailByStudentId(id);

      return response(res, 200, result);
    } catch (e) {
      next(e);
    }
  };

  getStudentClassPresences = async (req, res, next) => {
    try {
      const { id, classes_id } = req.params;

      const result = await this.studentService.getStudentClassPresences(id, classes_id);

      return response(res, 200, result);
    } catch (e) {
      next(e);
    }
  };
}

module.exports = StudentController;

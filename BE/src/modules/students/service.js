const { throwError } = require("../../libs/response");
const StudentClassesRepository = require("../student_classes/repository");
const StudentRepository = require("./repository");

class StudentService {
  constructor() {
    this.studentRepository = new StudentRepository();
    this.studentClassesRepo = new StudentClassesRepository();
  }

  async getAllStudent(data) {
    return await this.studentRepository.getAllStudent(data);
  }

  async getStudentDetailByStudentId(id) {
    const result = await this.studentRepository.getStudentDetailByStudentId(id);

    if (!result) throwError(404, "Data tidak ditemukan");

    delete result?.password;

    return result;
  }

  async getStudentClassesByStudentId(id, data) {
    return await this.studentClassesRepo.getMyClassesByUserId(id, data);
  }

  async getStudentClassPresences(student_id, classes_id) {
    const result = await this.studentRepository.getStudentClassPresences(student_id, classes_id);

    if (!result) throwError(404, "Data tidak ditemukan");

    return result;
  }
}

module.exports = StudentService;

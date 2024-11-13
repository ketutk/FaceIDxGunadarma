const StudentClassesRepository = require("../student_classes/repository");

class ClassesService {
  constructor() {
    this.studentClassesRepo = new StudentClassesRepository();
  }
  async getMyClasses(user_id) {
    return await this.studentClassesRepo.getNewestMyClassesByUserId(user_id);
  }
}

module.exports = ClassesService;

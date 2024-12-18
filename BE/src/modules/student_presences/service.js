const { throwError } = require("../../libs/response");
const StudentPresencesRepository = require("./repository");

class StudentPresencesService {
  constructor() {
    this.studentPresenceRepo = new StudentPresencesRepository();
  }

  async addStudentPresence(student_class_id, meet_id) {
    const isExist = await this.studentPresenceRepo.getPresenceByStudentAndMeetId(student_class_id, meet_id);

    if (isExist) {
      throwError(401, "Anda sudah terdaftar pada pertemuan");
    }

    return await this.studentPresenceRepo.addPresence(student_class_id, meet_id);
  }
}

module.exports = StudentPresencesService;

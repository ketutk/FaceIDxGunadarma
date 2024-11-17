const { throwError } = require("../../libs/response");
const StudentClassesRepository = require("../student_classes/repository");
const ClassesRepository = require("./repository");

class ClassesService {
  constructor() {
    this.classesRepo = new ClassesRepository();
    this.studentClassesRepo = new StudentClassesRepository();
  }

  async joinClassesByUserIdAndClassId(user_id, classes_id) {
    const alreadyExist = await this.studentClassesRepo.getStudentClassesByUserIdAndClassesId(user_id, classes_id);

    if (alreadyExist) throwError(400, "Anda sudah bergabung dengan kelas.");

    const isClassExist = await this.classesRepo.getClassById(classes_id);

    if (!isClassExist) throwError(404, "Kelas tidak ditemukan");

    return await this.studentClassesRepo.createStudentClasses(user_id, classes_id);
  }

  async getAllClasses(search) {
    return await this.classesRepo.getAllClasses(search);
  }

  async getNewestUserClasses(user_id) {
    return await this.studentClassesRepo.getNewestUserClasses(user_id);
  }

  async getAllMyClasses(user_id, page) {
    return await this.studentClassesRepo.getMyClassesByUserId(user_id, { page: +page, take: 9 });
  }

  async getMahasiswaDetailClassesById(user_id, classes_id) {
    const classes = await this.classesRepo.getClassById(classes_id);

    if (!classes) throwError(404, "Kelas tidak ditemukan");

    const mahasiswaClass = await this.studentClassesRepo.getStudentClassesByUserIdAndClassesId(user_id, classes_id);

    if (mahasiswaClass) {
      classes.student_class = mahasiswaClass;
      classes.is_joined = true;
    } else classes.is_joined = false;

    return classes;
  }
}

module.exports = ClassesService;

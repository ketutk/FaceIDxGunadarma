const { getDistanceFace } = require("../../libs/face-process");
const { throwError } = require("../../libs/response");
const AuthRepository = require("../auth/repository");
const ClassesMeetRepository = require("../classes_meet/repository");
const MajorRepository = require("../major/repository");
const StudentClassesRepository = require("../student_classes/repository");
const StudentPresencesService = require("../student_presences/service");
const ClassesRepository = require("./repository");

class ClassesService {
  constructor() {
    this.classesRepo = new ClassesRepository();
    this.studentClassesRepo = new StudentClassesRepository();
    this.classesMeetRepo = new ClassesMeetRepository();
    this.majorRepo = new MajorRepository();
    this.authRepo = new AuthRepository();
    this.studentPresencesService = new StudentPresencesService();
  }

  async addClasses(data) {
    const { school_year_type, school_year, subject, college_level, class_number, major_id, lecturer_id } = data;

    const major = await this.majorRepo.getMajorById(major_id);

    if (!major) throwError(404, "Jurusan tidak ditemukan");

    data.name = `${school_year_type + " " + school_year + " " + college_level + major.major_code + class_number + " " + subject}`;

    return await this.classesRepo.addClasses(data);
  }
  async editClassesById(data, classes_id) {
    const { school_year_type, school_year, subject, college_level, class_number, major_id } = data;

    const major = await this.majorRepo.getMajorById(major_id);

    if (!major) throwError(404, "Jurusan tidak ditemukan");

    data.name = `${school_year_type + " " + school_year + " " + college_level + major.major_code + class_number + " " + subject}`;

    return await this.classesRepo.editClassesById(data, classes_id);
  }

  async joinClassesByUserIdAndClassId(user_id, classes_id) {
    const alreadyExist = await this.studentClassesRepo.getStudentClassesByUserIdAndClassesId(user_id, classes_id);

    if (alreadyExist) throwError(400, "Anda sudah bergabung dengan kelas.");

    const isClassExist = await this.classesRepo.getClassById(classes_id);

    if (!isClassExist) throwError(404, "Kelas tidak ditemukan");

    return await this.studentClassesRepo.createStudentClasses(user_id, classes_id);
  }

  async addClassesMeet(classes_id, data) {
    const isClassExist = await this.classesRepo.getClassById(classes_id);

    if (!isClassExist) throwError(404, "Kelas tidak ditemukan");

    const latestMeet = await this.classesMeetRepo.getLatestClassMeetByClassesId(classes_id);

    latestMeet ? (data.meet_number = latestMeet.meet_number + 1) : (data.meet_number = 1);
    console.log(data);

    return await this.classesMeetRepo.addClassMeetByClassesId(classes_id, data);
  }

  async deleteClassesById(classes_id) {
    const isClassExist = await this.classesRepo.getClassById(classes_id);

    if (!isClassExist) throwError(404, "Kelas tidak ditemukan");

    return await this.classesRepo.deleteClassesById(classes_id);
  }

  async getAllClasses(search) {
    return await this.classesRepo.getAllClasses(search);
  }

  async getNewestUserClasses(user_id) {
    return await this.studentClassesRepo.getNewestUserClasses(user_id);
  }

  async getNewestLecturerClasses(lecturer_id) {
    return await this.classesRepo.getNewestLecturerClasses(lecturer_id);
  }

  async getLecturerClassesMeet(classes_id, meet_id) {
    const data = await this.classesMeetRepo.getClassesMeetById(classes_id, meet_id);

    if (!data) throwError(404, "Kelas tidak ditemukan");

    return data;
  }

  async getAllMyClasses(user_id, page) {
    return await this.studentClassesRepo.getMyClassesByUserId(user_id, { page: +page, take: 9 });
  }

  async getLecturerClassesByLecturerId(lecturer_id, page) {
    return await this.classesRepo.getLecturerClassesByLecturerId(lecturer_id, { page: +page, take: 9 });
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

  async getDosenDetailClassesById(lecturer_id, classes_id) {
    return await this.classesRepo.getDosenDetailClassesById(lecturer_id, classes_id);
  }

  async addPresence(data) {
    let { classes_id, meet_id, face } = data;

    const studentClasses = await this.studentClassesRepo.getAllStudentClassesByClassesId(classes_id);

    let student = null;
    let score = null;

    face = new Float32Array(Object.values(face));

    for await (const studentClass of studentClasses) {
      const faceData = await this.authRepo.getFaceDescriptorByUserId(studentClass.student_id);

      if (!faceData) {
        continue;
      }

      faceData.face = new Float32Array(Object.values(faceData.face));

      const distance = getDistanceFace(faceData.face, face);
      if (distance <= 0.5) {
        if (student) {
          if (score > distance) {
            student = studentClass;
            score = distance;
          }
        } else {
          student = studentClass;
          score = distance;
        }
      }
      console.log(`${studentClass.students.name} : ${distance}`);
    }

    if (!student) {
      throwError(400, "Data wajah tidak terdeteksi");
    }

    await this.studentPresencesService.addStudentPresence(student.id, meet_id);

    return true;
  }
}

module.exports = ClassesService;

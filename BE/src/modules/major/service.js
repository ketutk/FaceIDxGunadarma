const MajorRepository = require("./repository");

class MajorService {
  constructor() {
    this.majorRepo = new MajorRepository();
  }
  async getAllMajor() {
    return await this.majorRepo.getAllMajor();
  }
}

module.exports = MajorService;

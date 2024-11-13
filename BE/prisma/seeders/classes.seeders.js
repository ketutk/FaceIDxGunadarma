const { PrismaClient, ROLE } = require("@prisma/client");
const prisma = new PrismaClient();

exports.ClassesSeeders = async (major, users) => {
  return new Promise(async (resolve, reject) => {
    const datas = [
      {
        school_year_type: "PTA",
        school_year: "2024/2025",
        subject: "Pengelolaan Sistem Informasi",
        college_level: "4",
        class_number: "39",
      },
      {
        school_year_type: "PTA",
        school_year: "2024/2025",
        subject: "Sistem Multimedia",
        college_level: "4",
        class_number: "39",
      },
      {
        school_year_type: "PTA",
        school_year: "2024/2025",
        subject: "Bahasa Inggris Bisnis 1",
        college_level: "4",
        class_number: "39",
      },
      {
        school_year_type: "PTA",
        school_year: "2024/2025",
        subject: "Testing dan Implementasi",
        college_level: "4",
        class_number: "39",
      },
      {
        school_year_type: "PTA",
        school_year: "2024/2025",
        subject: "Sistem Penunjang Keputusan",
        college_level: "4",
        class_number: "39",
      },
    ];

    try {
      const lecturer = users.find((user) => user.role == ROLE.dosen);

      const results = [];

      for await (const data of datas) {
        const name = `${data.school_year_type + " " + data.school_year + " " + data.college_level + major.major_code + data.class_number + " " + data.subject}`;

        const result = await prisma.classes.create({
          data: {
            ...data,
            lecturer_id: lecturer.id,
            major_id: major.id,
            name: name,
          },
        });

        results.push(result);
      }

      console.log("Created classes seeders");
      resolve(results);
    } catch (e) {
      console.log("error", e);
      reject(null);
    }
  });
};

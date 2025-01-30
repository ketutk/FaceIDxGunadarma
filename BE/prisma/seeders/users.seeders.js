const { PrismaClient, ROLE } = require("@prisma/client");
const bcrypt = require("bcrypt");

/**
 *
 * @param {PrismaClient} prisma
 * @returns
 */

const { PASSWORD_SEED } = process.env;

exports.UsersSeeder = async (prisma, major) => {
  return new Promise(async (resolve, reject) => {
    // Manually input the CSV data into the `datas` variable
    const datas = [
      {
        identity: "2571393831",
        name: "Sekretariat Dosen",
        phone: "082260417027",
        password: bcrypt.hashSync(PASSWORD_SEED, 10),
        role: ROLE.sekdos,
        classes: null,
      },
      {
        identity: "4881825921",
        name: "DEA ADLINA",
        phone: "080555542630",
        password: bcrypt.hashSync(PASSWORD_SEED, 10),
        role: ROLE.dosen,
        classes: {
          createMany: {
            data: [
              {
                school_year_type: "PTA",
                school_year: "2024/2025",
                subject: "Testing dan Implementasi Sistem *",
                college_level: "4",
                class_number: "29",
                major_id: major.id,
              },
              {
                school_year_type: "PTA",
                school_year: "2024/2025",
                subject: "Testing dan Implementasi Sistem *",
                college_level: "4",
                class_number: "30",
                major_id: major.id,
              },
            ],
          },
        },
      },
      {
        identity: "385248785",
        name: "MARIA",
        phone: "088029480236",
        password: bcrypt.hashSync(PASSWORD_SEED, 10),
        role: ROLE.dosen,
        classes: {
          createMany: {
            data: [
              {
                school_year_type: "PTA",
                school_year: "2024/2025",
                subject: "Bahasa Inggris Bisnis 1",
                college_level: "4",
                class_number: "29",
                major_id: major.id,
              },
              {
                school_year_type: "PTA",
                school_year: "2024/2025",
                subject: "Bahasa Inggris Bisnis 1",
                college_level: "4",
                class_number: "30",
                major_id: major.id,
              },
              {
                school_year_type: "PTA",
                school_year: "2024/2025",
                subject: "Bahasa Inggris Bisnis 1",
                college_level: "4",
                class_number: "31",
                major_id: major.id,
              },
            ],
          },
        },
      },
      {
        identity: "9550255749",
        name: "CUT MAISYARAH KARYATI",
        phone: "083786165952",
        password: bcrypt.hashSync(PASSWORD_SEED, 10),
        role: ROLE.dosen,
        classes: {
          createMany: {
            data: [
              {
                school_year_type: "PTA",
                school_year: "2024/2025",
                subject: "Sistem Multimedia",
                college_level: "4",
                class_number: "29",
                major_id: major.id,
              },
              {
                school_year_type: "PTA",
                school_year: "2024/2025",
                subject: "Sistem Multimedia",
                college_level: "4",
                class_number: "30",
                major_id: major.id,
              },
            ],
          },
        },
      },
      {
        identity: "7234707025",
        name: "LINTANG YUNIAR BANOWOSARI",
        phone: "082721625692",
        password: bcrypt.hashSync(PASSWORD_SEED, 10),
        role: ROLE.dosen,
        classes: {
          createMany: {
            data: [
              {
                school_year_type: "PTA",
                school_year: "2024/2025",
                subject: "Pengelolaan Proyek Sistem Informasi *",
                college_level: "4",
                class_number: "29",
                major_id: major.id,
              },
            ],
          },
        },
      },
      {
        identity: "5565536564",
        name: "PURNAWARMAN MUSA",
        phone: "089151822536",
        password: bcrypt.hashSync(PASSWORD_SEED, 10),
        role: ROLE.dosen,
        classes: {
          createMany: {
            data: [
              {
                school_year_type: "PTA",
                school_year: "2024/2025",
                subject: "Analisis Kinerja Sistem",
                college_level: "4",
                class_number: "29",
                major_id: major.id,
              },
            ],
          },
        },
      },
      {
        identity: "1640293490",
        name: "BUDI UTAMI FAHNUN",
        phone: "089277444026",
        password: bcrypt.hashSync(PASSWORD_SEED, 10),
        role: ROLE.dosen,
        classes: {
          createMany: {
            data: [
              {
                school_year_type: "PTA",
                school_year: "2024/2025",
                subject: "Sistem Penunjang Keputusan *",
                college_level: "4",
                class_number: "29",
                major_id: major.id,
              },
            ],
          },
        },
      },
      {
        identity: "4675830939",
        name: "MIFTAH ANDRIANSYAH",
        phone: "080599437382",
        password: bcrypt.hashSync(PASSWORD_SEED, 10),
        role: ROLE.dosen,
        classes: {
          createMany: {
            data: [
              {
                school_year_type: "PTA",
                school_year: "2024/2025",
                subject: "Sistem Terdistribusi",
                college_level: "4",
                class_number: "29",
                major_id: major.id,
              },
            ],
          },
        },
      },
      {
        identity: "2625659551",
        name: "RATIH NURDIYANI SARI",
        phone: "085091319589",
        password: bcrypt.hashSync(PASSWORD_SEED, 10),
        role: ROLE.dosen,
        classes: {
          createMany: {
            data: [
              {
                school_year_type: "PTA",
                school_year: "2024/2025",
                subject: "Sistem Terdistribusi",
                college_level: "4",
                class_number: "30",
                major_id: major.id,
              },
            ],
          },
        },
      },
      {
        identity: "1466272747",
        name: "ROSDIANA",
        phone: "080604790462",
        password: bcrypt.hashSync(PASSWORD_SEED, 10),
        role: ROLE.dosen,
        classes: {
          createMany: {
            data: [
              {
                school_year_type: "PTA",
                school_year: "2024/2025",
                subject: "Sistem Penunjang Keputusan *",
                college_level: "4",
                class_number: "30",
                major_id: major.id,
              },
            ],
          },
        },
      },
      {
        identity: "2508408898",
        name: "HUSTINAWATY",
        phone: "088863046057",
        password: bcrypt.hashSync(PASSWORD_SEED, 10),
        role: ROLE.dosen,
        classes: {
          createMany: {
            data: [
              {
                school_year_type: "PTA",
                school_year: "2024/2025",
                subject: "Pengelolaan Proyek Sistem Informasi *",
                college_level: "4",
                class_number: "30",
                major_id: major.id,
              },
            ],
          },
        },
      },
      {
        identity: "8178307877",
        name: "SUHARTINI",
        phone: "081937423697",
        password: bcrypt.hashSync(PASSWORD_SEED, 10),
        role: ROLE.dosen,
        classes: {
          createMany: {
            data: [
              {
                school_year_type: "PTA",
                school_year: "2024/2025",
                subject: "Analisis Kinerja Sistem",
                college_level: "4",
                class_number: "30",
                major_id: major.id,
              },
            ],
          },
        },
      },
      {
        identity: "5394139413",
        name: "LINDA HANDAYANI",
        phone: "081152916532",
        password: bcrypt.hashSync(PASSWORD_SEED, 10),
        role: ROLE.dosen,
        classes: {
          createMany: {
            data: [
              {
                school_year_type: "PTA",
                school_year: "2024/2025",
                subject: "Sistem Multimedia",
                college_level: "4",
                class_number: "31",
                major_id: major.id,
              },
            ],
          },
        },
      },
      {
        identity: "5083690721",
        name: "LILIS KUSNITAWATI",
        phone: "084134196544",
        password: bcrypt.hashSync(PASSWORD_SEED, 10),
        role: ROLE.dosen,
        classes: {
          createMany: {
            data: [
              {
                school_year_type: "PTA",
                school_year: "2024/2025",
                subject: "Analisis Kinerja Sistem",
                college_level: "4",
                class_number: "31",
                major_id: major.id,
              },
            ],
          },
        },
      },
      {
        identity: "4239110441",
        name: "WIWIED WIDIYANINGSIH",
        phone: "083162674423",
        password: bcrypt.hashSync(PASSWORD_SEED, 10),
        role: ROLE.dosen,
        classes: {
          createMany: {
            data: [
              {
                school_year_type: "PTA",
                school_year: "2024/2025",
                subject: "Sistem Penunjang Keputusan *",
                college_level: "4",
                class_number: "31",
                major_id: major.id,
              },
            ],
          },
        },
      },
      {
        identity: "6290934226",
        name: "M RIDWAN DWI SEPTIAN",
        phone: "080503435903",
        password: bcrypt.hashSync(PASSWORD_SEED, 10),
        role: ROLE.dosen,
        classes: {
          createMany: {
            data: [
              {
                school_year_type: "PTA",
                school_year: "2024/2025",
                subject: "Testing dan Implementasi Sistem *",
                college_level: "4",
                class_number: "31",
                major_id: major.id,
              },
            ],
          },
        },
      },
      {
        identity: "1461161776",
        name: "WIDIASTUTI",
        phone: "086468893659",
        password: bcrypt.hashSync(PASSWORD_SEED, 10),
        role: ROLE.dosen,
        classes: {
          createMany: {
            data: [
              {
                school_year_type: "PTA",
                school_year: "2024/2025",
                subject: "Pengelolaan Proyek Sistem Informasi *",
                college_level: "4",
                class_number: "31",
                major_id: major.id,
              },
            ],
          },
        },
      },
      {
        identity: "5497772560",
        name: "ARY BIMA KURNIAWAN",
        phone: "081731155733",
        password: bcrypt.hashSync(PASSWORD_SEED, 10),
        role: ROLE.dosen,
        classes: {
          createMany: {
            data: [
              {
                school_year_type: "PTA",
                school_year: "2024/2025",
                subject: "Sistem Terdistribusi",
                college_level: "4",
                class_number: "31",
                major_id: major.id,
              },
            ],
          },
        },
      },
    ];

    try {
      const results = [];

      for await (const data of datas) {
        // Generate the class names dynamically
        const classesWithNames =
          data.classes &&
          data.classes.createMany.data.map((classData) => {
            return {
              ...classData,
              name: `${classData.school_year_type} ${classData.school_year} ${classData.college_level}${major.major_code}${classData.class_number} ${classData.subject}`,
            };
          });

        const resultData = {
          identity: data.identity,
          name: data.name,
          phone: data.phone,
          password: data.password,
          role: data.role,
        };

        if (classesWithNames) resultData.classes = { createMany: { data: classesWithNames } };
        const result = await prisma.user.create({
          data: resultData,
        });

        results.push(result);
      }

      console.log("Created user seeders");

      resolve(results);
    } catch (error) {
      reject(error.message);
    }
  });
};

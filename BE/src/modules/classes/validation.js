const z = require("zod");
const { isNumericWord } = require("../../libs/regex");

exports.addClassSchema = z.object({
  school_year_type: z.string().min(1, { message: "Tipe tahun ajaran harus diisi" }),
  school_year: z.string().min(1, { message: "Tahun ajaran perlu diisi" }),
  subject: z.string().min(1, { message: "Mata Kuliah perlu diisi" }),
  major_id: z.string().min(1, { message: "Jurusan perlu diisi" }),
  college_level: z
    .string()
    .min(1, { message: "Tingkat perlu diisi" })
    .max(1, { message: "Tingkat diisi maksimal hanya 1 angka" })
    .refine((e) => isNumericWord(e), {
      message: "Kolom tingkat hanya bisa mengandung angka",
    }),
  class_number: z
    .string()
    .min(2, { message: "Nomor Kelas perlu diisi 2 angka" })
    .max(2, { message: "Nomor Kelas perlu diisi 2 angka" })
    .refine((e) => isNumericWord(e), {
      message: "Kolom nomor kelas hanya bisa mengandung angka",
    }),
});

exports.addMeetSchema = z.object({
  meet_start: z.string().refine((val) => !isNaN(new Date(val).getTime()), {
    message: "Waktu pertemuan harus berupa tanggal dan waktu yang valid",
  }),
});

exports.addPresenceSchema = z.object({
  classes_id: z.string().min(1, {
    message: "Id kelas tidak ditemukan",
  }),
  meet_id: z.string().min(1, {
    message: "Id pertemuan tidak ditemukan",
  }),
  face: z.any().refine((val) => val && val !== null, {
    message: "Data wajah tidak ditemukan",
  }),
});

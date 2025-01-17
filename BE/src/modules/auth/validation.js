const z = require("zod");
const { isNumericWord, isAlphaOnly } = require("../../libs/regex");
exports.registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nama minimal terdiri dari 1 karakter" })
    .refine((e) => isAlphaOnly(e), { message: "Nama hanya boleh mengandung alfabet" }),
  identity: z
    .string()
    .min(8, { message: "NPM minimal mengandung 8 angka" })
    .max(8, { message: "NPM maksimal mengandung 8 angka" })
    .refine((e) => isNumericWord(e), {
      message: "Nomor Identitas hanya bisa mengandung angka",
    }),
  phone: z
    .string()
    .min(10, { message: "Nomor Telepon minimal memiliki 10 digit angka" })
    .max(13, { message: "Nomor Telepon maksimal memiliki 13 digit angka" })
    .refine((e) => isNumericWord(e), {
      message: "Nomor Telepon hanya bisa mengandung angka",
    }),
  password: z.string().min(8, { message: "Password minimal terdiri dari 8 karakter" }),
  face: z.any(),
});

exports.registerDosenSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nama minimal terdiri dari 1 karakter" })
    .refine((e) => isAlphaOnly(e), { message: "Nama hanya boleh mengandung alfabet" }),
  identity: z
    .string()
    .min(10, { message: "Nomor Identitas minimal mengandung 10 angka" })
    .max(10, { message: "Nomor Identitas maksimal mengandung 10 angka" })
    .refine((e) => isNumericWord(e), {
      message: "Nomor Identitas hanya bisa mengandung angka",
    }),
  phone: z
    .string()
    .min(10, { message: "Nomor Telepon minimal memiliki 10 digit angka" })
    .max(13, { message: "Nomor Telepon maksimal memiliki 13 digit angka" })
    .refine((e) => isNumericWord(e), {
      message: "Nomor Telepon hanya bisa mengandung angka",
    }),
  password: z.string().min(8, { message: "Password minimal terdiri dari 8 karakter" }),
});

exports.changePasswordSchema = z.object({
  new_password: z.string().min(8, { message: "Password Baru minimal terdiri dari 8 karakter" }),
  confirm_password: z.string().min(8, { message: "Konfirmasi Password minimal terdiri dari 8 karakter" }),
});

const z = require("zod");
const { isNumericWord } = require("../../libs/regex");
exports.registerSchema = z.object({
  name: z.string().min(1),
  identity: z
    .string()
    .min(1)
    .max(8, { message: "NPM maksimal mengandung 8 angka" })
    .refine((e) => isNumericWord(e), {
      message: "Nomor Identitas hanya bisa mengandung angka",
    }),
  phone: z
    .string()
    .min(1)
    .max(13)
    .refine((e) => isNumericWord(e), {
      message: "Nomor Telepon hanya bisa mengandung angka",
    }),
  password: z.string().min(8, { message: "Password minimal terdiri dari 8 karakter" }),
  face: z.any(),
});

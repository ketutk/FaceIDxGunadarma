-- DropForeignKey
ALTER TABLE "class_meets" DROP CONSTRAINT "class_meets_class_id_fkey";

-- DropForeignKey
ALTER TABLE "classes" DROP CONSTRAINT "classes_lecturer_id_fkey";

-- DropForeignKey
ALTER TABLE "classes" DROP CONSTRAINT "classes_major_id_fkey";

-- DropForeignKey
ALTER TABLE "student_classes" DROP CONSTRAINT "student_classes_class_id_fkey";

-- DropForeignKey
ALTER TABLE "student_classes" DROP CONSTRAINT "student_classes_student_id_fkey";

-- DropForeignKey
ALTER TABLE "student_presence" DROP CONSTRAINT "student_presence_class_meet_id_fkey";

-- DropForeignKey
ALTER TABLE "student_presence" DROP CONSTRAINT "student_presence_student_class_id_fkey";

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_major_id_fkey" FOREIGN KEY ("major_id") REFERENCES "majors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_lecturer_id_fkey" FOREIGN KEY ("lecturer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_classes" ADD CONSTRAINT "student_classes_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_classes" ADD CONSTRAINT "student_classes_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_meets" ADD CONSTRAINT "class_meets_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_presence" ADD CONSTRAINT "student_presence_student_class_id_fkey" FOREIGN KEY ("student_class_id") REFERENCES "student_classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_presence" ADD CONSTRAINT "student_presence_class_meet_id_fkey" FOREIGN KEY ("class_meet_id") REFERENCES "class_meets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

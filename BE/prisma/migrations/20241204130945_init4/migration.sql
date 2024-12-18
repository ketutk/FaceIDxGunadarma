/*
  Warnings:

  - You are about to drop the column `created_at` on the `class_meets` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `student_presence` table. All the data in the column will be lost.

*/
-- AlterTable
CREATE SEQUENCE class_meets_meet_number_seq;
ALTER TABLE "class_meets" DROP COLUMN "created_at",
ADD COLUMN     "meet_start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "meet_number" SET DEFAULT nextval('class_meets_meet_number_seq');
ALTER SEQUENCE class_meets_meet_number_seq OWNED BY "class_meets"."meet_number";

-- AlterTable
ALTER TABLE "student_presence" DROP COLUMN "created_at",
ADD COLUMN     "meet_start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

/*
  Warnings:

  - You are about to drop the column `meet_start` on the `student_presence` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "student_presence" DROP COLUMN "meet_start",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

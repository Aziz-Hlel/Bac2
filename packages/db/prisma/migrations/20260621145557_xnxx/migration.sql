/*
  Warnings:

  - You are about to drop the column `teacherId` on the `TeacherExamSession2` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[examSessionId,supervisorId,role]` on the table `TeacherExamSession2` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `supervisorId` to the `TeacherExamSession2` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `role` on the `TeacherExamSession2` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SupervisorRole" AS ENUM ('PRIMARY_MALE', 'PRIMARY_FEMALE', 'SECONDARY');

-- DropForeignKey
ALTER TABLE "TeacherExamSession2" DROP CONSTRAINT "TeacherExamSession2_teacherId_fkey";

-- DropIndex
DROP INDEX "TeacherExamSession2_examSessionId_teacherId_role_key";

-- AlterTable
ALTER TABLE "TeacherExamSession2" DROP COLUMN "teacherId",
ADD COLUMN     "supervisorId" UUID NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "SupervisorRole" NOT NULL;

-- DropEnum
DROP TYPE "TeacherRole";

-- CreateIndex
CREATE UNIQUE INDEX "TeacherExamSession2_examSessionId_supervisorId_role_key" ON "TeacherExamSession2"("examSessionId", "supervisorId", "role");

-- AddForeignKey
ALTER TABLE "TeacherExamSession2" ADD CONSTRAINT "TeacherExamSession2_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

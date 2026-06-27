-- CreateEnum
CREATE TYPE "TeacherRole" AS ENUM ('PRIMARY_MALE', 'PRIMARY_FEMALE', 'SECONDARY');

-- CreateTable
CREATE TABLE "TeacherExamSession2" (
    "id" UUID NOT NULL,
    "teacherId" UUID NOT NULL,
    "examSessionId" UUID NOT NULL,
    "role" "TeacherRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeacherExamSession2_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TeacherExamSession2_examSessionId_teacherId_role_key" ON "TeacherExamSession2"("examSessionId", "teacherId", "role");

-- AddForeignKey
ALTER TABLE "TeacherExamSession2" ADD CONSTRAINT "TeacherExamSession2_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherExamSession2" ADD CONSTRAINT "TeacherExamSession2_examSessionId_fkey" FOREIGN KEY ("examSessionId") REFERENCES "ExamSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

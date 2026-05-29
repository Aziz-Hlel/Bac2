-- CreateEnum
CREATE TYPE "TimeOfDayEnum" AS ENUM ('MORNING', 'EVENING');

-- CreateEnum
CREATE TYPE "SubjectEnum" AS ENUM ('ALGO', 'FRENCH', 'ENGLISH', 'MATH', 'PHYSICS', 'CHEMISTRY', 'BIOLOGY', 'HISTORY', 'GEOGRAPHY', 'ECONOMICS', 'COMPUTER_SCIENCE', 'SPORT', 'MANDARIN', 'MUSIC', 'SPANISH', 'GERMAN', 'ITALIAN', 'ARABIC');

-- CreateEnum
CREATE TYPE "ElectiveExamEnum" AS ENUM ('SPANISH', 'MUSIC', 'ITALIAN', 'MANDARIN', 'MATH', 'GERMAN');

-- CreateEnum
CREATE TYPE "MajorEnum" AS ENUM ('COMPUTER_SCIENCE', 'MATH', 'SCIENCE', 'LETTRE', 'TECHNIQUE', 'ECO', 'INFORMATIQUE', 'SPORT');

-- CreateEnum
CREATE TYPE "TermEnum" AS ENUM ('PRINCIPAL', 'RETAKE');

-- CreateEnum
CREATE TYPE "CityEnum" AS ENUM ('SOUSSE', 'TUNIS', 'SFAX', 'BIZERTE', 'KAIROUAN', 'GABES', 'MONASTIR', 'NABEUL', 'BEJA', 'JENDOUBA', 'KEF', 'SILIANA', 'KASSERINE', 'TOZEUR', 'GAFSA', 'MEDENINE', 'TATAOUINE', 'ZAGHOUAN', 'MANOUBA', 'ARIANA', 'BEN_AROUS');

-- CreateEnum
CREATE TYPE "CapacityTypeEnum" AS ENUM ('MAJOR', 'ELECTIVE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE', 'DISABLED', 'DELETED');

-- CreateEnum
CREATE TYPE "MediaStatus" AS ENUM ('PENDING', 'CONFIRMED', 'DELETED', 'FAILED');

-- CreateTable
CREATE TABLE "Major" (
    "id" UUID NOT NULL,
    "name" "MajorEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Major_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElectiveExam" (
    "id" UUID NOT NULL,
    "name" "ElectiveExamEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ElectiveExam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exam" (
    "id" UUID NOT NULL,
    "subject" "SubjectEnum" NOT NULL,
    "date" DATE NOT NULL,
    "startTime" TIME NOT NULL,
    "endTime" TIME NOT NULL,
    "timeOfDay" "TimeOfDayEnum" NOT NULL,
    "term" "TermEnum" NOT NULL,
    "isOptional" BOOLEAN NOT NULL DEFAULT false,
    "majorId" UUID,
    "electiveExamId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchoolMajors" (
    "id" UUID NOT NULL,
    "schoolId" UUID NOT NULL,
    "majorId" UUID NOT NULL,
    "nbrClasses" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SchoolMajors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchoolElectiveExam" (
    "id" TEXT NOT NULL,
    "schoolId" UUID NOT NULL,
    "examId" UUID,
    "nbrClasses" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SchoolElectiveExam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchoolCapacityStats" (
    "id" TEXT NOT NULL,
    "schoolId" UUID NOT NULL,
    "majorId" UUID,
    "examId" UUID,
    "nbrClasses" INTEGER NOT NULL,
    "type" "CapacityTypeEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SchoolCapacityStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "School" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "publicId" TEXT NOT NULL,
    "city" "CityEnum" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "schoolId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" UUID NOT NULL,
    "publicId" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "isTeacher" BOOLEAN NOT NULL,
    "subject" "SubjectEnum",
    "schoolId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamSession" (
    "id" UUID NOT NULL,
    "classId" UUID NOT NULL,
    "examId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExamSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeacherExamSession" (
    "id" UUID NOT NULL,
    "primaryMaleTeacherId" UUID NOT NULL,
    "primaryFemaleTeacherId" UUID NOT NULL,
    "secondaryTeacherId" UUID NOT NULL,
    "examSessionId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeacherExamSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "authId" TEXT NOT NULL,
    "email" TEXT,
    "provider" TEXT NOT NULL,
    "username" TEXT,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "address" TEXT,
    "avatar" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "baseName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "fileSize" INTEGER,
    "status" "MediaStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "confirmedAt" TIMESTAMP(3),

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Major_name_key" ON "Major"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ElectiveExam_name_key" ON "ElectiveExam"("name");

-- CreateIndex
CREATE INDEX "Exam_term_subject_isOptional_idx" ON "Exam"("term", "subject", "isOptional");

-- CreateIndex
CREATE UNIQUE INDEX "Exam_majorId_subject_term_key" ON "Exam"("majorId", "subject", "term");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolCapacityStats_schoolId_majorId_key" ON "SchoolCapacityStats"("schoolId", "majorId");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolCapacityStats_schoolId_examId_key" ON "SchoolCapacityStats"("schoolId", "examId");

-- CreateIndex
CREATE UNIQUE INDEX "School_userId_key" ON "School"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Class_schoolId_name_key" ON "Class"("schoolId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "ExamSession_classId_examId_key" ON "ExamSession"("classId", "examId");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherExamSession_examSessionId_key" ON "TeacherExamSession"("examSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "User_authId_key" ON "User"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Media_key_key" ON "Media"("key");

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_electiveExamId_fkey" FOREIGN KEY ("electiveExamId") REFERENCES "ElectiveExam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolMajors" ADD CONSTRAINT "SchoolMajors_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolMajors" ADD CONSTRAINT "SchoolMajors_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolElectiveExam" ADD CONSTRAINT "SchoolElectiveExam_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolElectiveExam" ADD CONSTRAINT "SchoolElectiveExam_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolCapacityStats" ADD CONSTRAINT "SchoolCapacityStats_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolCapacityStats" ADD CONSTRAINT "SchoolCapacityStats_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolCapacityStats" ADD CONSTRAINT "SchoolCapacityStats_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "School" ADD CONSTRAINT "School_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamSession" ADD CONSTRAINT "ExamSession_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamSession" ADD CONSTRAINT "ExamSession_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherExamSession" ADD CONSTRAINT "TeacherExamSession_primaryMaleTeacherId_fkey" FOREIGN KEY ("primaryMaleTeacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherExamSession" ADD CONSTRAINT "TeacherExamSession_primaryFemaleTeacherId_fkey" FOREIGN KEY ("primaryFemaleTeacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherExamSession" ADD CONSTRAINT "TeacherExamSession_secondaryTeacherId_fkey" FOREIGN KEY ("secondaryTeacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherExamSession" ADD CONSTRAINT "TeacherExamSession_examSessionId_fkey" FOREIGN KEY ("examSessionId") REFERENCES "ExamSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

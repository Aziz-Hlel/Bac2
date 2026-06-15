/*
  Warnings:

  - The values [ALGO,CHEMISTRY,HISTORY,GEOGRAPHY,MANDARIN,MUSIC,SPANISH,GERMAN,ITALIAN] on the enum `SubjectEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SubjectEnum_new" AS ENUM ('ARABIC', 'FRENCH', 'ENGLISH', 'MATH', 'PHYSICS', 'BIOLOGY', 'TECHNOLOGY', 'COMPUTER_SCIENCE', 'HISTORY_GEOGRAPHY', 'ECONOMICS', 'FINANCE', 'PHYLOSOPHY', 'SPORT');
ALTER TABLE "Exam" ALTER COLUMN "subject" TYPE "SubjectEnum_new" USING ("subject"::text::"SubjectEnum_new");
ALTER TABLE "Teacher" ALTER COLUMN "subject" TYPE "SubjectEnum_new" USING ("subject"::text::"SubjectEnum_new");
ALTER TYPE "SubjectEnum" RENAME TO "SubjectEnum_old";
ALTER TYPE "SubjectEnum_new" RENAME TO "SubjectEnum";
DROP TYPE "public"."SubjectEnum_old";
COMMIT;

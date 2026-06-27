/*
  Warnings:

  - A unique constraint covering the columns `[majorId,term,subject]` on the table `Exam` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Exam_majorId_subject_term_key";

-- CreateIndex
CREATE UNIQUE INDEX "Exam_majorId_term_subject_key" ON "Exam"("majorId", "term", "subject");

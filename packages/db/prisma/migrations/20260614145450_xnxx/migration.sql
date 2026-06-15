/*
  Warnings:

  - The values [INFORMATIQUE] on the enum `MajorEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MajorEnum_new" AS ENUM ('COMPUTER_SCIENCE', 'MATH', 'SCIENCE', 'LETTRE', 'TECHNIQUE', 'ECO', 'SPORT');
ALTER TABLE "Major" ALTER COLUMN "name" TYPE "MajorEnum_new" USING ("name"::text::"MajorEnum_new");
ALTER TYPE "MajorEnum" RENAME TO "MajorEnum_old";
ALTER TYPE "MajorEnum_new" RENAME TO "MajorEnum";
DROP TYPE "public"."MajorEnum_old";
COMMIT;

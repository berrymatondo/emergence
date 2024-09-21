/*
  Warnings:

  - Added the required column `couponFrequency` to the `financingoptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issueDate` to the `financingoptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "financingoptions" ADD COLUMN     "couponFrequency" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "issueDate" TEXT NOT NULL;

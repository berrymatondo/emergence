/*
  Warnings:

  - Added the required column `firstCouponDate` to the `financingoptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maturityDate` to the `financingoptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "financingoptions" ADD COLUMN     "firstCouponDate" TEXT NOT NULL,
ADD COLUMN     "maturityDate" TEXT NOT NULL;

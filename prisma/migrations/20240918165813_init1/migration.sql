/*
  Warnings:

  - Added the required column `couponBasis` to the `financingoptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "financingoptions" ADD COLUMN     "couponBasis" TEXT NOT NULL;

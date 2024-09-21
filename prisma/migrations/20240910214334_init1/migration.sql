/*
  Warnings:

  - Added the required column `valuationType` to the `financingoptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "financingoptions" ADD COLUMN     "valuationType" TEXT NOT NULL;

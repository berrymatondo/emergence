/*
  Warnings:

  - You are about to drop the column `continentId` on the `zcrates` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `zcrates` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "zcrates" DROP CONSTRAINT "zcrates_continentId_fkey";

-- DropForeignKey
ALTER TABLE "zcrates" DROP CONSTRAINT "zcrates_countryId_fkey";

-- AlterTable
ALTER TABLE "zcrates" DROP COLUMN "continentId",
DROP COLUMN "countryId";

/*
  Warnings:

  - Made the column `country` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
--ALTER TYPE "CountryList" ADD VALUE 'ALL';

-- AlterTable
--ALTER TABLE "users" ALTER COLUMN "country" SET NOT NULL,
--ALTER COLUMN "country" SET DEFAULT 'ALL';

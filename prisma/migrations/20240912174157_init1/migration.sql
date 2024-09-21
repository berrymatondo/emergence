/*
  Warnings:

  - You are about to drop the column `rate` on the `reserve` table. All the data in the column will be lost.
  - Added the required column `value` to the `reserve` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reserve" DROP COLUMN "rate",
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL;

/*
  Warnings:

  - You are about to drop the column `currencyId` on the `commoforwardrate` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `commoforwardrate` table. All the data in the column will be lost.
  - Added the required column `commoId` to the `commoforwardrate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "commoforwardrate" DROP CONSTRAINT "commoforwardrate_currencyId_fkey";

-- AlterTable
ALTER TABLE "commoforwardrate" DROP COLUMN "currencyId",
DROP COLUMN "label",
ADD COLUMN     "commoId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "commo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "commo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "commoforwardrate" ADD CONSTRAINT "commoforwardrate_commoId_fkey" FOREIGN KEY ("commoId") REFERENCES "commo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

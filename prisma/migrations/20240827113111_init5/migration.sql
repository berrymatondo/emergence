/*
  Warnings:

  - Added the required column `currencyId` to the `forwardrate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `forwardrate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "forwardrate" ADD COLUMN     "currencyId" INTEGER NOT NULL,
ADD COLUMN     "label" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "forwardrate" ADD CONSTRAINT "forwardrate_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

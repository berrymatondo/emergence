/*
  Warnings:

  - You are about to drop the column `currency` on the `zcrates` table. All the data in the column will be lost.
  - Added the required column `currencyId` to the `zcrates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "zcrates" DROP COLUMN "currency",
ADD COLUMN     "currencyId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "currencies" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "currencies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "currencies_code_key" ON "currencies"("code");

-- AddForeignKey
ALTER TABLE "zcrates" ADD CONSTRAINT "zcrates_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

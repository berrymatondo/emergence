/*
  Warnings:

  - You are about to drop the column `country` on the `yieldcurve` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "yieldcurve_tenor_date_country_key";

-- AlterTable
ALTER TABLE "yieldcurve" DROP COLUMN "country",
ADD COLUMN     "continentId" INTEGER,
ADD COLUMN     "countryId" INTEGER;

-- CreateTable
CREATE TABLE "countries" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "continents" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "continents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "countries_name_key" ON "countries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "continents_name_key" ON "continents"("name");

-- AddForeignKey
ALTER TABLE "yieldcurve" ADD CONSTRAINT "yieldcurve_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "yieldcurve" ADD CONSTRAINT "yieldcurve_continentId_fkey" FOREIGN KEY ("continentId") REFERENCES "continents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "countries" ADD COLUMN     "continentId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "countries" ADD CONSTRAINT "countries_continentId_fkey" FOREIGN KEY ("continentId") REFERENCES "continents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

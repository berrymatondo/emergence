/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `fxrates` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "fxrates_date_key" ON "fxrates"("date");

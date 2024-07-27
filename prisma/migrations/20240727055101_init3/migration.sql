-- CreateEnum
CREATE TYPE "DataTypeList" AS ENUM ('L', 'H');

-- CreateTable
CREATE TABLE "yieldcurve" (
    "id" SERIAL NOT NULL,
    "tenor" INTEGER NOT NULL,
    "yield" DOUBLE PRECISION NOT NULL,
    "change" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "date" TEXT NOT NULL,
    "country" BOOLEAN NOT NULL,
    "type" "DataTypeList" NOT NULL DEFAULT 'H',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "yieldcurve_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "yieldcurve_tenor_date_country_key" ON "yieldcurve"("tenor", "date", "country");

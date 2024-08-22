-- DropIndex
DROP INDEX "bccintrates_date_key";

-- DropIndex
DROP INDEX "fxrates_date_key";

-- CreateTable
CREATE TABLE "zcrates" (
    "id" SERIAL NOT NULL,
    "tenor" INTEGER NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "change" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "date" TEXT NOT NULL,
    "currency" "CurrencyList" NOT NULL DEFAULT 'USD',
    "type" "DataTypeList" NOT NULL DEFAULT 'H',
    "countryId" INTEGER,
    "continentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "zcrates_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zcrates" ADD CONSTRAINT "zcrates_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zcrates" ADD CONSTRAINT "zcrates_continentId_fkey" FOREIGN KEY ("continentId") REFERENCES "continents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "commoforwardrate" (
    "id" SERIAL NOT NULL,
    "tenor" DOUBLE PRECISION NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "label" TEXT NOT NULL,
    "type" "DataTypeList" NOT NULL DEFAULT 'H',
    "currencyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "commoforwardrate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "commoforwardrate" ADD CONSTRAINT "commoforwardrate_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

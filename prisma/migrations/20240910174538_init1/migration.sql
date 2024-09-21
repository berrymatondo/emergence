-- CreateTable
CREATE TABLE "financingoptions" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "couponRate" DOUBLE PRECISION NOT NULL,
    "maturity" INTEGER NOT NULL,
    "rating" TEXT NOT NULL,
    "notional" DOUBLE PRECISION NOT NULL,
    "valuationDate" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "recovering" DOUBLE PRECISION NOT NULL,
    "modality" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "financingoptions_pkey" PRIMARY KEY ("id")
);

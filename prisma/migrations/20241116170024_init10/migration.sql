-- CreateTable
CREATE TABLE "croissance" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "subType" TEXT,
    "year" INTEGER NOT NULL,
    "croissance" DOUBLE PRECISION NOT NULL,
    "debtExtPIB" DOUBLE PRECISION NOT NULL,
    "txInternational" DOUBLE PRECISION NOT NULL,
    "creditSpread" DOUBLE PRECISION NOT NULL,
    "txInterieur" DOUBLE PRECISION NOT NULL,
    "infNat" DOUBLE PRECISION NOT NULL,
    "infMon" DOUBLE PRECISION NOT NULL,
    "soldePrim" DOUBLE PRECISION NOT NULL,
    "exportation" DOUBLE PRECISION NOT NULL,
    "inportation" DOUBLE PRECISION NOT NULL,
    "rendement" DOUBLE PRECISION NOT NULL,
    "invest" DOUBLE PRECISION NOT NULL,
    "debtIntPIB" DOUBLE PRECISION NOT NULL,
    "variantion" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "croissance_pkey" PRIMARY KEY ("id")
);

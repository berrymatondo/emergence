-- CreateTable
CREATE TABLE "amortizationcommoschedule" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "amortizationcommoschedule_pkey" PRIMARY KEY ("id")
);

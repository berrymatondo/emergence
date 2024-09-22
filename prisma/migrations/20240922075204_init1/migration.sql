-- CreateTable
CREATE TABLE "cashflow" (
    "id" SERIAL NOT NULL,
    "date" DOUBLE PRECISION NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cashflow_pkey" PRIMARY KEY ("id")
);

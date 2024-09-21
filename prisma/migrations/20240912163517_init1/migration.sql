-- CreateTable
CREATE TABLE "reserve" (
    "id" SERIAL NOT NULL,
    "tenor" DOUBLE PRECISION NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reserve_pkey" PRIMARY KEY ("id")
);

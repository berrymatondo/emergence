-- CreateTable
CREATE TABLE "forwardrate" (
    "id" SERIAL NOT NULL,
    "tenor" DOUBLE PRECISION NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "forwardrate_pkey" PRIMARY KEY ("id")
);

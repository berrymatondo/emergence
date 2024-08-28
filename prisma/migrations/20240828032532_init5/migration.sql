-- CreateTable
CREATE TABLE "stepuprate" (
    "id" SERIAL NOT NULL,
    "tenor" DOUBLE PRECISION NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stepuprate_pkey" PRIMARY KEY ("id")
);

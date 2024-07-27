-- CreateEnum
CREATE TYPE "UserStatuses" AS ENUM ('ACTIF', 'INACTIF');

-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('AGENT', 'ADMIN');

-- CreateEnum
CREATE TYPE "CountryList" AS ENUM ('Afghanistan', 'Togo', 'RD Congo','ALL');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "status" "UserStatuses" NOT NULL DEFAULT 'INACTIF',
    "role" "UserRoles" NOT NULL DEFAULT 'AGENT',
    "country" "CountryList" NOT NULL DEFAULT 'ALL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);


-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

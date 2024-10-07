-- AlterTable
ALTER TABLE "defaultMatrix" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "impliciteMatrix" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "transitionMatrix" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

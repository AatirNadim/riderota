/*
  Warnings:

  - Added the required column `from` to the `RideTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to` to the `RideTask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."RideTask" ADD COLUMN     "from" TEXT NOT NULL,
ADD COLUMN     "to" TEXT NOT NULL;

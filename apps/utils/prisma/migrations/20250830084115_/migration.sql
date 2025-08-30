/*
  Warnings:

  - Made the column `rideExpires` on table `RideTask` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "public"."RideTaskStatus" ADD VALUE 'EXPIRED';

-- AlterTable
ALTER TABLE "public"."RideTask" ALTER COLUMN "rideExpires" SET NOT NULL,
ALTER COLUMN "rideExpires" DROP DEFAULT;

/*
  Warnings:

  - You are about to drop the column `vehicleId` on the `RideTask` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."RideTask" DROP CONSTRAINT "RideTask_vehicleId_fkey";

-- AlterTable
ALTER TABLE "public"."RideTask" DROP COLUMN "vehicleId";

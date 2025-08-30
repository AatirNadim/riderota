/*
  Warnings:

  - You are about to drop the column `userId` on the `RideTask` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."RideTask" DROP CONSTRAINT "RideTask_userId_fkey";

-- AlterTable
ALTER TABLE "public"."RideTask" DROP COLUMN "userId";

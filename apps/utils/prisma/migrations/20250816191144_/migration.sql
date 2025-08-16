/*
  Warnings:

  - You are about to drop the column `officeId` on the `Tenant` table. All the data in the column will be lost.
  - You are about to drop the `Office` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `office_location` to the `Tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `office_name` to the `Tenant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Tenant" DROP CONSTRAINT "Tenant_officeId_fkey";

-- AlterTable
ALTER TABLE "public"."Tenant" DROP COLUMN "officeId",
ADD COLUMN     "office_location" TEXT NOT NULL,
ADD COLUMN     "office_name" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."Office";

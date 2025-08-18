/*
  Warnings:

  - You are about to drop the column `tenantId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_tenantId_fkey";

-- DropIndex
DROP INDEX "public"."User_tenantId_idx";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "tenantId",
ADD COLUMN     "tenantSlug" TEXT;

-- CreateIndex
CREATE INDEX "User_tenantSlug_idx" ON "public"."User"("tenantSlug");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_tenantSlug_fkey" FOREIGN KEY ("tenantSlug") REFERENCES "public"."Tenant"("slug") ON DELETE SET NULL ON UPDATE CASCADE;

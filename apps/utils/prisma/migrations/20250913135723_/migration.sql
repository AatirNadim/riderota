/*
  Warnings:

  - You are about to drop the column `status` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "status";

-- CreateTable
CREATE TABLE "public"."Invitations" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "welcomeMessage" TEXT,
    "userType" "public"."UserRole" NOT NULL,
    "tenantSlug" TEXT NOT NULL,

    CONSTRAINT "Invitations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Invitations" ADD CONSTRAINT "Invitations_tenantSlug_fkey" FOREIGN KEY ("tenantSlug") REFERENCES "public"."Tenant"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

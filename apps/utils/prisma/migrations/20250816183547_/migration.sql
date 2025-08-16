-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_addressId_fkey";

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "addressId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "public"."Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "public"."Invitations" ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL DEFAULT NOW() + INTERVAL '3 days';

-- AlterTable
ALTER TABLE "public"."Invitations" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '3 days';

-- AlterEnum
ALTER TYPE "public"."RideTaskStatus" ADD VALUE 'REGISTERED';

-- AlterTable
ALTER TABLE "public"."Invitations" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '3 days';

-- AlterTable
ALTER TABLE "public"."RideTask" ALTER COLUMN "rideExpires" SET DEFAULT CURRENT_TIMESTAMP + INTERVAL '1 day';

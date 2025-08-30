-- CreateEnum
CREATE TYPE "public"."RideTaskStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "public"."RideTask" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "public"."RideTaskStatus" NOT NULL,
    "driverId" TEXT NOT NULL,
    "passengerId" TEXT NOT NULL,
    "rideStartOtpHash" TEXT NOT NULL,
    "rideEndOtpHash" TEXT,
    "rideExpires" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "vehicleId" TEXT,
    "userId" TEXT,

    CONSTRAINT "RideTask_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."RideTask" ADD CONSTRAINT "RideTask_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RideTask" ADD CONSTRAINT "RideTask_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RideTask" ADD CONSTRAINT "RideTask_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "public"."Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RideTask" ADD CONSTRAINT "RideTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

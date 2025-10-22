-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('waiting_payment', 'pending', 'failed');

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "amount_in_cents" INTEGER NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'waiting_payment',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransictionLog" (
    "id" TEXT NOT NULL,
    "payment_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TransictionLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TransictionLog" ADD CONSTRAINT "TransictionLog_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

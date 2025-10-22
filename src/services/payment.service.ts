import { prisma } from "../../prisma/client";
import { PaymentStatus } from "../models/payments.model";

export class PaymentService {
  async createPayment(amount: number) {
    const payment = await prisma.payment.create({
      data: { amount_in_cents: amount, status: PaymentStatus.WAITING_PAYMENT },
    });

    await prisma.transictionLog.create({
      data: {
        payment_id: payment.id,
        message: `Payment created with status: ${payment.status}`,
      },
    });

    return payment;
  }

  async confirmPayment(paymentId: string) {
    const payment = await prisma.payment.update({
      where: { id: paymentId },
      data: { status: PaymentStatus.PAID },
    });

    await prisma.transictionLog.create({
      data: {
        payment_id: payment.id,
        message: `Payment confirmed with status: ${payment.status}`,
      },
    });

    return payment;
  }

  async getPaymentLogs(id: string) {
    return prisma.transictionLog.findMany({
      where: { payment_id: id },
      orderBy: { createdAt: "asc" },
    });
  }
}

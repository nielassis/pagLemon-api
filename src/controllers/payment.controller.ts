import { PaymentService } from "../services/payment.service";
import { Request, Response } from "express";

const paymentService = new PaymentService();

export class PaymentController {
  async createPayment(req: Request, res: Response) {
    try {
      const { amount_in_cents } = req.body;
      const payment = await paymentService.createPayment(amount_in_cents);
      return res.status(201).json(payment);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to create payment" });
    }
  }

  async confirmPayment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const payment = await paymentService.confirmPayment(id);
      return res.status(200).json(payment);
    } catch (error) {
      return res.status(500).json({ error: "Failed to confirm payment" });
    }
  }

  async logs(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const logs = await paymentService.getPaymentLogs(id);
      return res.json(logs);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch logs" });
    }
  }
}

import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller";

const paymentRouter = Router();
const paymentController = new PaymentController();

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Cria um novo pagamento
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount_in_cents:
 *                 type: number
 *                 example: 12000
 *     responses:
 *       201:
 *         description: Pagamento criado
 */
paymentRouter.post("/", paymentController.createPayment);

/**
 * @swagger
 * /payments/{id}/confirm:
 *   patch:
 *     summary: Confirma um pagamento
 *     tags: [Payments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Pagamento confirmado
 */
paymentRouter.patch("/:id/confirm", paymentController.confirmPayment);

/**
 * @swagger
 * /payments/{id}/logs:
 *   get:
 *     summary: Retorna logs da transação
 *     tags: [Payments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Lista de logs
 */
paymentRouter.get("/:id/logs", paymentController.logs);

export default paymentRouter;

import express from "express";
import { setupSwagger } from "./docs/swagger";
import paymentRouter from "./routes/payment.routes";

const app = express();
app.use(express.json());

app.use("/payments", paymentRouter);

setupSwagger(app);

export default app;

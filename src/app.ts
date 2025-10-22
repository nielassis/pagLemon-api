import express from "express";
import paymentRouter from "./routes/payment.routes";
import { setupSwagger } from "./docs/swagger";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("PagLemon API is running 🚀");
});

app.use("/payments", paymentRouter);
setupSwagger(app);

export default app;

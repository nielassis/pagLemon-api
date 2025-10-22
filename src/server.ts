import app from "./app";
import { env } from "./config/env";

const PORT = env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`PagLemon API running on http://localhost:${PORT} 🚀`);
  console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
});

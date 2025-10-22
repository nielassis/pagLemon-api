import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import path from "path";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "PagLemon API",
    version: "1.0.0",
    description: "API de pagamentos simples com logs de transações",
  },
};

const options: swaggerJsdoc.Options = {
  definition: swaggerDefinition,
  apis:
    process.env.NODE_ENV === "production"
      ? [path.join(__dirname, "../routes/*.js")]
      : [path.join(__dirname, "../routes/*.ts")],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { explorer: true }),
  );

  app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

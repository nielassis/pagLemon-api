import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PagLemon API",
      version: "1.0.0",
      description: "API de pagamentos simples com logs de transações",
    },
  },
  apis: [`${process.cwd()}/src/routes/*.ts`],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.get("/swagger.json", (req, res) => res.json(swaggerSpec));

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

import "dotenv/config";
import z from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.url(),
});

if (envSchema.safeParse(process.env).success === false) {
  throw new Error("Invalid environment variables");
}

export const env = envSchema.parse(process.env);

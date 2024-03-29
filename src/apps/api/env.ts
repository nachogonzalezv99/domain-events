import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();

 const envVariables = z.object({
  NODE_ENV: z.enum(["production", "development", "testing"]),
  LOKI_URL: z.string().url(),
  APP_NAME: z.string(),
  APP_PORT: z.string(),
});

export const env = envVariables.parse(process.env);

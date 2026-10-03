import "server-only";
import { z } from "zod";

const serverEnvSchema = z.object({
  PAYMENTS_MODE: z.enum(["mock", "payos"]).default("mock"),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  PAYOS_CLIENT_ID: z.string().optional(),
  PAYOS_API_KEY: z.string().optional(),
  PAYOS_CHECKSUM_KEY: z.string().optional(),
  PAYOS_RETURN_URL: z.url().optional().or(z.literal("")),
  PAYOS_CANCEL_URL: z.url().optional().or(z.literal("")),
  SENTRY_DSN: z.url().optional().or(z.literal("")),
});

export const serverEnv = serverEnvSchema.parse({
  PAYMENTS_MODE: process.env.PAYMENTS_MODE,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  PAYOS_CLIENT_ID: process.env.PAYOS_CLIENT_ID,
  PAYOS_API_KEY: process.env.PAYOS_API_KEY,
  PAYOS_CHECKSUM_KEY: process.env.PAYOS_CHECKSUM_KEY,
  PAYOS_RETURN_URL: process.env.PAYOS_RETURN_URL,
  PAYOS_CANCEL_URL: process.env.PAYOS_CANCEL_URL,
  SENTRY_DSN: process.env.SENTRY_DSN,
});

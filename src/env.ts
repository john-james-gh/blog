import {loadEnvConfig} from "@next/env"
import {z} from "zod"

const projectDir = process.cwd()
loadEnvConfig(projectDir)

const envSchema = z.object({
  // Sanity
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),
  NEXT_PUBLIC_SANITY_API_VERSION: z.string().default("2025-09-27"),
  SANITY_API_READ_TOKEN: z.string().min(1),

  // App
  NEXT_PUBLIC_URL: z.url().optional(),
  VERCEL: z.string().optional(),
  ENABLE_SANITY_LIVE: z
    .string()
    .default("false")
    .transform((val) => val === "true"),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.message)
  throw new Error("Invalid environment variables")
}

export const env = parsed.data

if (!env.NEXT_PUBLIC_URL && env.VERCEL) {
  throw new Error("NEXT_PUBLIC_URL must be set in Vercel environment")
}

// Helper for base URL
export const baseUrl = env.VERCEL ? env.NEXT_PUBLIC_URL! : "http://localhost:3000"

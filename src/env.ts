import {z} from "zod"

const envSchema = z.object({
  // Sanity
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),
  NEXT_PUBLIC_SANITY_API_VERSION: z.string().default("2025-09-27"),
  SANITY_API_READ_TOKEN: z.string().min(1),

  // App
  VERCEL_PROJECT_PRODUCTION_URL: z.string().optional(),
  VERCEL: z.enum(["0", "1"]).default("0"),
  ENABLE_SANITY_LIVE: z.enum(["0", "1"]).default("0"),
})

export const env = envSchema.parse(process.env)

// Helper for base URL
export const baseUrl =
  env.VERCEL === "1" ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"

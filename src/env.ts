import {z} from "zod"

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

export const env = envSchema.parse(process.env)

if (!env.NEXT_PUBLIC_URL && env.VERCEL) {
  throw new Error("NEXT_PUBLIC_URL must be set in Vercel environment")
}

// Helper for base URL
export const baseUrl = env.VERCEL ? env.NEXT_PUBLIC_URL! : "http://localhost:3000"

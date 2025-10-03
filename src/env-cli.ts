import {loadEnvConfig} from "@next/env"
import {z} from "zod"

// Load environment variables from .env files
loadEnvConfig(process.cwd())

const envSchema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),
})

export const envCli = envSchema.parse(process.env)

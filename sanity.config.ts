"use client"

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 * It needs 'use client' directive because it's a client side rendered SPA
 */
import {codeInput} from "@sanity/code-input"
import {visionTool} from "@sanity/vision"
import {defineConfig} from "sanity"
import {presentationTool} from "sanity/presentation"
import {structureTool} from "sanity/structure"

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from "@/sanity/env"
import {resolve} from "@/sanity/presentation/resolve"
import {schema} from "@/sanity/schema-types"
import {structure} from "@/sanity/structure"

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    codeInput(),
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
  ],
})

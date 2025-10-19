import * as Sentry from "@sentry/nextjs"
import type {MetadataRoute} from "next"

import {baseUrl} from "@/env"
import {client} from "@/sanity/lib/client"
import {SITEMAP_QUERY} from "@/sanity/lib/queries"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const paths = await client.fetch(SITEMAP_QUERY)

    if (!paths) {
      return []
    }

    return paths.map((path) => ({
      url: new URL(path.href!, baseUrl).toString(),
      lastModified: new Date(path._updatedAt),
      changeFrequency: "weekly",
      priority: 1,
    }))
  } catch (error) {
    Sentry.logger.error("Error fetching sitemap data", {error})
    return []
  }
}

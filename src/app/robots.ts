import type {MetadataRoute} from "next"

import {baseUrl} from "@/env"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/api/draft-mode/disable", "/api/draft-mode/enable"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

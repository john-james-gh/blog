import type {MetadataRoute} from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.VERCEL ? process.env.NEXT_PUBLIC_URL : "http://localhost:3000"

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/api/draft-mode/disable", "/api/draft-mode/enable"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

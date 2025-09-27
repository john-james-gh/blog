import type {Metadata} from "next/dist/lib/metadata/types/metadata-interface"
import Link from "next/link"
import {CollectionPage, ListItem, WebSite, WithContext} from "schema-dts"

import {sanityFetch} from "@/sanity/lib/live"
import {POSTS_QUERY} from "@/sanity/lib/queries"
import type {POSTS_QUERYResult} from "@/sanity/types"

const baseUrl =
  process.env.VERCEL && process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(baseUrl),
    title: "John James Blog",
    description: "Notes on web, JS/TS, CI/CD, and experiments.",
    openGraph: {
      type: "website",
      url: "/",
      siteName: "John James Blog",
      title: "John James Blog",
      description: "Notes on web, JS/TS, CI/CD, and experiments.",
      // If you don’t have a dedicated OG image yet, either omit `images`
      // or point to a generic site-wide image. Best practice is to add one:
      // images: [{ url: "/og/home.png", width: 1200, height: 630 }],
    },
  }
}

const generateWebsiteJsonLd = (): WithContext<WebSite> => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: baseUrl,
  name: "John James Blog",
  inLanguage: "en-US",
})

const generateIndexJsonLd = (posts: POSTS_QUERYResult): WithContext<CollectionPage> => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Posts",
  url: `${baseUrl}/`,
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: posts.length,
    itemListElement: posts.map(
      (post, i): ListItem => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${baseUrl}/posts/${post?.slug?.current}`,
        name: post?.seo?.title,
      }),
    ),
  },
})

export default async function Page() {
  const {data: posts} = await sanityFetch({query: POSTS_QUERY})

  const websiteJson = JSON.stringify(generateWebsiteJsonLd())
  const indexJson = JSON.stringify(generateIndexJsonLd(posts))

  return (
    <main className="bg-accent/50 container mx-auto flex min-h-screen flex-col items-center gap-6 p-12">
      <h1>John James.</h1>
      <ul className="flex w-full flex-col text-center">
        {posts.map((post) => (
          <li key={post._id} className="list-none">
            <Link className="block p-2 hover:text-blue-500" href={`/posts/${post?.slug?.current}`}>
              {post?.title}
            </Link>
          </li>
        ))}
      </ul>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: websiteJson}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: indexJson}} />
    </main>
  )
}

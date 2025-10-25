import * as Sentry from "@sentry/nextjs"
import type {Metadata} from "next/dist/lib/metadata/types/metadata-interface"
import Image from "next/image"
import Link from "next/link"
import {CollectionPage, ListItem, WebSite, WithContext} from "schema-dts"

import {baseUrl} from "@/env"
import {sanityFetch} from "@/sanity/lib/live"
import {POSTS_QUERY} from "@/sanity/lib/queries"
import type {POSTS_QUERYResult} from "@/sanity/types"

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
      images: [{url: "/og/home.png", width: 800, height: 300}],
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

const getPosts = async () => {
  try {
    return await sanityFetch({query: POSTS_QUERY})
  } catch (error) {
    Sentry.logger.error("Error fetching posts data", {error})
    throw error
  }
}

export default async function Page() {
  const {data: posts} = await getPosts()

  const websiteJson = JSON.stringify(generateWebsiteJsonLd())
  const indexJson = JSON.stringify(generateIndexJsonLd(posts))

  return (
    <main className="bg-accent/30 prose mx-auto flex min-h-screen max-w-4xl flex-col items-center gap-6 px-6 py-6">
      <Image
        className="aspect-[800/300] w-full rounded-xl"
        src="/banner.png"
        alt="john james banner"
        width={800}
        height={300}
        quality={80}
        priority
      />
      <h1>john james.</h1>
      <ul className="mx-0 flex w-full flex-col gap-4 text-center">
        {posts.map((post) => (
          <li key={post._id} className="list-none">
            <Link href={`/posts/${post?.slug?.current}`}>{post?.title}</Link>
          </li>
        ))}
      </ul>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: websiteJson}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: indexJson}} />
    </main>
  )
}

import type {Metadata} from "next/dist/lib/metadata/types/metadata-interface"
import Link from "next/link"
import {ItemList, ListItem, WithContext} from "schema-dts"

import {sanityFetch} from "@/sanity/lib/live"
import {POSTS_QUERY} from "@/sanity/lib/queries"
import type {POSTS_QUERYResult} from "@/sanity/types"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Posts",
  }
}

const generateIndexJsonLd = (posts: POSTS_QUERYResult): WithContext<ItemList> => {
  const baseUrl = process.env.VERCEL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

  return {
    "@context": "https://schema.org",
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
  }
}

export default async function Page() {
  const {data: posts} = await sanityFetch({query: POSTS_QUERY})

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <h1 className="text-4xl font-bold">Post index</h1>
      <ul className="grid grid-cols-1 divide-y divide-blue-100">
        {posts.map((post) => (
          <li key={post._id}>
            <Link className="block p-4 hover:text-blue-500" href={`/posts/${post?.slug?.current}`}>
              {post?.title}
            </Link>
          </li>
        ))}
      </ul>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(generateIndexJsonLd(posts))}}
      />
    </main>
  )
}

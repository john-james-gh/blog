import {PortableText} from "next-sanity"
import type {Metadata} from "next/dist/lib/metadata/types/metadata-interface"
import Image from "next/image"
import {notFound} from "next/navigation"
import {BlogPosting, WithContext} from "schema-dts"

import {baseUrl} from "@/env"
import {urlFor} from "@/sanity/lib/image"
import {sanityFetch} from "@/sanity/lib/live"
import {POST_QUERY} from "@/sanity/lib/queries"
import {components} from "@/sanity/portable-text-components"
import {POST_QUERYResult} from "@/sanity/types"

const getPost = async (props: PageProps<"/posts/[slug]">) => {
  const params = await props.params
  return sanityFetch({
    query: POST_QUERY,
    params,
  })
}

export async function generateMetadata(props: PageProps<"/posts/[slug]">): Promise<Metadata> {
  const {data: post} = await getPost(props)

  if (!post) {
    notFound()
  }

  const metadata: Metadata = {
    title: post.seo.title,
    description: post.seo.description,
  }

  if (post.seo.image) {
    metadata.openGraph = {
      images: {
        url: urlFor(post.seo.image).width(1200).height(630).url(),
        width: 1200,
        height: 630,
      },
    }
  }

  if (post.seo.noIndex) {
    metadata.robots = {index: false, follow: true}
  }

  return metadata
}

const generatePostJsonLd = (post: POST_QUERYResult): WithContext<BlogPosting> => {
  if (!post) {
    notFound()
  }

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/posts/${post.slug?.current}`,
    },
    headline: post.seo?.title,
    description: post.seo?.description,
    image: post.seo?.image ? [urlFor(post.seo.image).width(1200).height(630).url()] : undefined,
    author: post.author?.name ? {"@type": "Person", name: post.author.name} : undefined,
    publisher: {
      "@type": "Person",
      name: "John James",
    },
    datePublished: post._createdAt,
    dateModified: post._updatedAt,
  }
}

export default async function Page(props: PageProps<"/posts/[slug]">) {
  const {data: post} = await getPost(props)

  if (!post) {
    notFound()
  }

  const pageJson = JSON.stringify(generatePostJsonLd(post))

  return (
    <main className="bg-accent/30 mx-auto flex max-w-4xl flex-col gap-6 px-6 py-6 pb-100">
      {post?.mainImage ? (
        <Image
          className="aspect-[800/300] w-full rounded-xl"
          src={urlFor(post.mainImage).width(800).height(300).quality(80).auto("format").url()}
          alt={post?.mainImage?.alt || ""}
          width={800}
          height={300}
          priority
        />
      ) : null}
      <h1>{post?.title}</h1>
      <div className="flex flex-row flex-wrap items-center gap-4">
        {post?.author?.name ? <p className="m-0">By {post.author.name}</p> : null}
        {post?._createdAt ? (
          <p className="m-0">Published on {new Date(post._createdAt).toLocaleDateString()}</p>
        ) : null}
        <p className="m-0">Read time ~3 min</p>
      </div>
      {post?.body ? (
        <article>
          <PortableText value={post.body} components={components} />
        </article>
      ) : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: pageJson}} />
    </main>
  )
}

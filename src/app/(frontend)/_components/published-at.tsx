import dayjs from "dayjs"

import {POST_QUERYResult} from "@/sanity/types"

type PublishedAtProps = {
  publishedAt: NonNullable<POST_QUERYResult>["publishedAt"]
}

export function PublishedAt({publishedAt}: PublishedAtProps) {
  return publishedAt ? <p className="m-0">Published on {dayjs(publishedAt).format("MMMM D, YYYY")}</p> : null
}

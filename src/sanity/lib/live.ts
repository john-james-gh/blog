// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import {defineLive} from "next-sanity/live"

import {env} from "@/env"

import {client} from "./client"

export const {sanityFetch, SanityLive} = defineLive({
  client,
  browserToken: env.SANITY_API_READ_TOKEN,
  serverToken: env.SANITY_API_READ_TOKEN,
})

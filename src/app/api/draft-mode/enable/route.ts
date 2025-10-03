/**
 * This file is used to allow Presentation to set the app in Draft Mode, which will load Visual Editing
 * and query draft content and preview the content as it will appear once everything is published
 */
import {defineEnableDraftMode} from "next-sanity/draft-mode"

import {env} from "@/env"
import {client} from "@/sanity/lib/client"

export const {GET} = defineEnableDraftMode({
  client: client.withConfig({token: env.SANITY_API_READ_TOKEN}),
})

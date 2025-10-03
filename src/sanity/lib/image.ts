import createImageUrlBuilder from "@sanity/image-url"
import {SanityImageSource} from "@sanity/image-url/lib/types/types"

import {env} from "@/env"

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
})

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

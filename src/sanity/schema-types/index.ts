import {type SchemaTypeDefinition} from "sanity"

import {authorType} from "./author-type"
import {blockContentType} from "./block-content-type"
import {categoryType} from "./category-type"
import {postType} from "./post-type"
import {seoType} from "./seo-type"

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [blockContentType, categoryType, postType, authorType, seoType],
}

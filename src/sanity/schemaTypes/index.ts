import {type SchemaTypeDefinition} from "sanity"

import {authorType} from "./authorType"
import {blockContentType} from "./blockContentType"
import {categoryType} from "./categoryType"
import {postType} from "./postType"
import {seoType} from "./seoType"

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [blockContentType, categoryType, postType, authorType, seoType],
}

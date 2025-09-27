import type {LanguageFn} from "highlight.js"
import hljs from "highlight.js/lib/core"
import bash from "highlight.js/lib/languages/bash"
import javascript from "highlight.js/lib/languages/javascript"
import json from "highlight.js/lib/languages/json"
import plaintext from "highlight.js/lib/languages/plaintext"
import typescript from "highlight.js/lib/languages/typescript"
import type {PortableTextComponents} from "next-sanity"
import Image from "next/image"

import {urlFor} from "@/sanity/lib/image"

type PortableCodeValue = {
  code?: string
  highlightedLines?: number[]
  language?: string
}

type PortableTableRow = {
  cells?: string[]
}

type PortableTableValue = {
  rows?: PortableTableRow[]
}

const supportedLanguages: Array<{name: string; definition: LanguageFn}> = [
  {name: "bash", definition: bash},
  {name: "javascript", definition: javascript},
  {name: "typescript", definition: typescript},
  {name: "json", definition: json},
  {name: "plaintext", definition: plaintext},
]

supportedLanguages.forEach(({name, definition}) => {
  if (!hljs.getLanguage(name)) {
    hljs.registerLanguage(name, definition)
  }
})

const getHighlightedCode = (code: string, language?: string) => {
  if (language && hljs.getLanguage(language)) {
    return hljs.highlight(code, {language}).value
  }

  return hljs.highlightAuto(code).value
}

export const components: PortableTextComponents = {
  types: {
    code: ({value}) => {
      const {code, language} = (value ?? {}) as PortableCodeValue

      if (!code) {
        return null
      }

      const highlightedCode = getHighlightedCode(code, language)
      const languageClass = language?.length ? language : "plaintext"

      return (
        <pre className="hljs">
          <code
            className={`hljs language-${languageClass}`}
            dangerouslySetInnerHTML={{__html: highlightedCode}}
          />
        </pre>
      )
    },
    table: ({value}) => {
      const rows = ((value ?? {}) as PortableTableValue).rows ?? []

      return (
        <table>
          <tbody>
            {rows.map((row: PortableTableRow, rIdx: number) => (
              <tr key={`row-${rIdx}`}>
                {(row.cells ?? []).map((cell: string, cIdx: number) => (
                  <td key={`cell-${rIdx}-${cIdx}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )
    },
    image: (props) =>
      props.value ? (
        <Image
          className="not-prose h-auto w-full rounded-lg"
          src={urlFor(props.value).width(600).height(400).quality(80).auto("format").url()}
          alt={props?.value?.alt || ""}
          width="600"
          height="400"
        />
      ) : null,
  },
}

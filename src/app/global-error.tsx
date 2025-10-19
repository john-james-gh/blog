"use client"

import * as Sentry from "@sentry/nextjs"
import Link from "next/link"
import {useEffect} from "react"

export default function GlobalError({error}: {error: Error & {digest?: string}}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html>
      <body>
        <main className="bg-accent/30 mx-auto flex min-h-screen max-w-4xl flex-col items-center gap-6 px-6 py-12">
          <h1>something went wrong</h1>
          <Link className="py-8" href="/">
            return home
          </Link>
        </main>
      </body>
    </html>
  )
}

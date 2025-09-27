import {Analytics} from "@vercel/analytics/next"
import {SpeedInsights} from "@vercel/speed-insights/next"
import {VisualEditing} from "next-sanity/visual-editing"
import {draftMode} from "next/headers"

import {SanityLive} from "@/sanity/lib/live"

import {DisableDraftMode} from "./_components/disable-draft-mode"

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
      <SanityLive />
      <SpeedInsights />
      <Analytics />
      {(await draftMode()).isEnabled && (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      )}
    </>
  )
}

import {Analytics} from "@vercel/analytics/next"
import {SpeedInsights} from "@vercel/speed-insights/next"
import {VisualEditing} from "next-sanity/visual-editing"
import {draftMode} from "next/headers"

import {SanityLive} from "@/sanity/lib/live"

import {DisableDraftMode} from "./_components/disable-draft-mode"

const ENABLE_SANITY_LIVE = Boolean(process.env.ENABLE_SANITY_LIVE === "true")

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
      {ENABLE_SANITY_LIVE && <SanityLive />}
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

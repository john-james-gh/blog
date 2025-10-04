import {Analytics} from "@vercel/analytics/next"
import {SpeedInsights} from "@vercel/speed-insights/next"
import {VisualEditing} from "next-sanity/visual-editing"
import {draftMode} from "next/headers"

import {env} from "@/env"
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
      {env.ENABLE_SANITY_LIVE === "1" && <SanityLive />}
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

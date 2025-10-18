export const dynamic = "force-dynamic"

export default function SentryServerErrorTestPage() {
  throw new Error("This is a test error for server.")
  return (
    <div>
      <h1>Sentry Server Error Test Page</h1>
    </div>
  )
}

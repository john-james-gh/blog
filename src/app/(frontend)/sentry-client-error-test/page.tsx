"use client"

export default function SentryClientErrorTestPage() {
  throw new Error("This is a test error for client.")
  return (
    <div>
      <h1>Sentry Client Error Test Page</h1>
    </div>
  )
}

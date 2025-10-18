"use client"

export default function SentryClientErrorTestPage() {
  return (
    <div>
      <h1>Sentry Client Error Test Page</h1>
      <button
        onClick={() => {
          throw new Error("This is a test error for client.")
        }}
      >
        Trigger Error
      </button>
    </div>
  )
}

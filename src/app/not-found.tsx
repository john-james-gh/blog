import Link from "next/link"

export default function NotFound() {
  return (
    <main className="bg-accent/30 prose mx-auto flex min-h-screen max-w-4xl flex-col items-center gap-6 px-6 py-12">
      <h1>post not found</h1>
      <Link className="py-8" href="/">
        return home
      </Link>
    </main>
  )
}

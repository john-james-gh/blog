import Link from "next/link"

export default function NotFound() {
  return (
    <main className="bg-accent/30 mx-auto flex min-h-screen max-w-4xl flex-col items-center gap-6 p-12">
      <h1>Not Found</h1>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </main>
  )
}

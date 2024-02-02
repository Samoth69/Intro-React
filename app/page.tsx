import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main className="relative flex h-screen flex-col items-center">
      <Link href="/todo">
        Todo List
      </Link>
    </main>
  )
}

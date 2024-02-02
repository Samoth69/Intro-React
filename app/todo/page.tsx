import TodoList from "@/components/todo-list";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center">
      <Link href="/">Back</Link>
      <TodoList />
    </main>
  )
}
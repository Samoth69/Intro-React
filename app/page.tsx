import TodoList from '@/components/todo-list'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center">
      <TodoList />
    </main>
  )
}

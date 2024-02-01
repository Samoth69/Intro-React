import prisma from '@/lib/prisma'
import { TodoItem } from './todo-item'
import { TodoNew } from './todo-new'

export default async function TodoList() {
  const startTime = Date.now()
  const tasks = await prisma.task.findMany()
  const duration = Date.now() - startTime

  return (
    <fieldset className='container max-w-sm mx-auto px-4 space-y-3'>
      <legend>TODO</legend>

      {tasks.map((task) => (
        <TodoItem t={task} key={task.id} />
      ))}
      <TodoNew />
    </fieldset>
  )
}

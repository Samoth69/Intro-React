"use server"

import { EditItem } from "@/components/todo-edit";
import { getTodo, updateTodo } from "@/lib/actions"

export default async function Page({ params }: { params: { id: string } }) {
  const task = await getTodo(parseInt(params.id));
  const update = updateTodo.bind(null, parseInt(params.id));
  return (
    <div className="container max-w-sm mx-auto px-4 space-y-3 border rounded-md">
      <EditItem initialText={task!.text} onSubmit={update} />
    </div>
  )
}
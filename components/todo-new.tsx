'use client'

import { createTodo } from "@/lib/actions";
import { EditItem } from "./todo-edit";

export function TodoNew() {
  return (
    <div className="border rounded-md">
      <EditItem initialText="" onSubmit={createTodo} />
    </div>
  )
}
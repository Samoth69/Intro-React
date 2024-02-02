'use client';

import { deleteTodo, updateTodo } from "@/lib/actions";
import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Task } from "@prisma/client";
import Link from "next/link";

export function TodoItem({ task }:
  {
    task: Task
  }) {
  const updateCheckedStatus = () => {
    if (task.checked === 0) {
      task.checked = 1;
    } else {
      task.checked = 0;
    }
    updateTodo(task.id, task);
  }
  return (
    <div className="flex flex-row items-stretch gap-2 border rounded-md">
      <label className="peer grow flex items-center gap-3 rounded-md px-2 hover:bg-slate-100">
        <input
          type="checkbox"
          className="shrink-0 accent-pink-500 peer"
          checked={task.checked === 1}
          onChange={() => updateCheckedStatus()} />
        <span className="select-none grow text-slate-700 peer-checked:text-slate-400 peer-checked:line-through">{task.text}</span>
      </label>
      <div className="grid grid-flow-col auto-cols-max items-center">
        <Link href={`/todo/${task.id}/edit`}
          className="flex flex-row items-center justify-center h-6 w-6 rounded-md hover:bg-gray-100">
          <FontAwesomeIcon icon={faPen} />
        </Link>
        <div className="flex flex-row items-center justify-center h-6 w-6 rounded-md hover:bg-red-50 hover:text-red-500"
          onClick={() => deleteTodo({ id: task.id })}>
          <FontAwesomeIcon icon={faXmark} className="flex-1" />
        </div>
      </div>
    </div>
  )
}
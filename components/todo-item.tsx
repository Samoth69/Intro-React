'use client';

import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Task } from "@prisma/client";
import { useState } from "react";

export function TodoItem({ t }: { t: Task }) {
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="flex flex-row items-stretch gap-2 border rounded-md">
      <label className="peer grow flex items-center gap-3 rounded-md px-2 hover:bg-slate-100">
        {!editMode ?
          <>
            <input
              type="checkbox"
              className="shrink-0 accent-pink-500 peer"
              name={String(t.id)}
              checked={t.checked === 1}
              onChange={() => console.log("todo")} />
            <span className="select-none grow text-slate-700 peer-checked:text-slate-400 peer-checked:line-through"
            >{t.text}</span>
          </>
          :
          <div className="grow gap-3">
            <p>todo</p>
          </div>
        }
      </label>
      <div className="grid grid-flow-col auto-cols-max items-center">
        <div className="flex flex-row items-center justify-center h-6 w-6 rounded-md hover:bg-gray-100"
          onClick={() => console.log("todo2")}>
          <FontAwesomeIcon icon={faPen} />
        </div>
        <div className="flex flex-row items-center justify-center h-6 w-6 rounded-md hover:bg-red-50 hover:text-red-500"
          onClick={() => console.log("todo3")}>
          <FontAwesomeIcon icon={faXmark} className="flex-1" />
        </div>
      </div>
    </div>
  )
}
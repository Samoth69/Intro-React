import { faCheck, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { UserTask } from "shared/src/model";

export function TodoItem({ t }: { t: UserTask }) {
  const queryClient = useQueryClient();

  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(t.text);
  const updateTodoMutation = useMutation({
    mutationFn: (updatedTodo: UserTask) =>
      axios
        .put(`http://localhost:3000/todos/${t.id}`, updatedTodo)
        .then(resp => resp.data),
    onSuccess: (updatedTodo: UserTask) => {
      queryClient.setQueryData(["todos", updatedTodo.id], updatedTodo)
      queryClient.invalidateQueries({
        queryKey: ["todos"]
      })
    }
  })
  const deleteTodoMutation = useMutation({
    mutationFn: () =>
      axios
        .delete(`http://localhost:3000/todos/${t.id}`),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["todos", t.id], exact: true })
      queryClient.invalidateQueries({
        queryKey: ["todos"]
      })
    }
  })

  const toggleEditMode = () => {
    if (editMode && t.text !== editText) {
      updateTodoMutation.mutate({ id: t.id, text: editText });
    }
    setEditMode(!editMode);
  }

  const onCheckChange = () => {
    let newValue;
    if (t.checked === 0) {
      newValue = 1;
    } else {
      newValue = 0;
    }
    updateTodoMutation.mutate({ id: t.id, checked: newValue, text: t.text })
  }

  return (
    <div className="flex flex-row items-stretch gap-2 border rounded-md">
      <label className="peer grow flex items-center gap-3 rounded-md px-2 hover:bg-slate-100">
        {!editMode ?
          <>
            <input
              type="checkbox"
              className="peer size-3.5 shrink-0 appearance-none rounded-sm border border-slate-300 accent-pink-500 checked:appearance-auto"
              name={String(t.id)}
              checked={t.checked === 1}
              onChange={() => onCheckChange()} />
            <span className="select-none grow text-slate-700 peer-checked:text-slate-400 peer-checked:line-through"
            >{t.text}</span>
          </>
          :
          <>
            <textarea
              className="grow"
              value={editText}
              onChange={e => setEditText(e.target.value)} />
          </>
        }
      </label>
      <div className="flex flex-row items-center">
        <div className="shrink-0 size-[26px] flex items-center rounded-md hover:bg-gray-100"
          onClick={() => toggleEditMode()}>
          <FontAwesomeIcon icon={editMode ? faCheck : faPen} className="flex-1" />
        </div>
        {
          !editMode ?
            <div
              className="shrink-0 size-[26px] flex items-center rounded-md hover:bg-red-50 hover:text-red-500"
              onClick={() => deleteTodoMutation.mutate()}>
              <FontAwesomeIcon icon={faXmark} className="flex-1" />
            </div> :
            <div />
        }
      </div>
    </div>
  )
}
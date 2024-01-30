import { faCheck, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export function Item({ t, onCheckChange, onUpdate, onDelete }: {
  t: userTask,
  onCheckChange: (id: number) => void,
  onUpdate: (id: number, text: string) => void,
  onDelete: (id: number) => void
}) {
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(t.text);

  const toggleEditMode = () => {
    if (editMode && t.text !== editText) {
      onUpdate(t.id, editText);
    }
    setEditMode(!editMode);
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
              onChange={() => onCheckChange(t.id)} />
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
              onClick={() => onDelete(t.id)}>
              <FontAwesomeIcon icon={faXmark} className="flex-1" />
            </div> :
            <div />
        }
      </div>
    </div>
  )
}
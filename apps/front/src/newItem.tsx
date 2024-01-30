import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { UserTask } from "shared/src/model";

export function NewItem() {
  const queryClient = useQueryClient();
  const [textInput, setTextInput] = useState("");
  const createTodo = useMutation({
    mutationFn: (newTodo: UserTask) =>
      axios
        .post("http://localhost:3000/todos", newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"]
      })
    }
  })

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      addNewItem();
    }
  }

  const addNewItem = () => {
    createTodo.mutate({ id: undefined, checked: undefined, text: textInput });
    setTextInput("");
  }
  return (
    <div className="flex flex-row items-stretch gap-2 p-0.5 border rounded-md">
      <input
        className="grow"
        value={textInput}
        onChange={e => setTextInput(e.target.value)}
        onKeyDown={(e) => onKeyDown(e)} />
      <div
        className="shrink-0 size-[26px] flex items-center rounded-md hover:bg-blue-100 hover:text-blue-500"
        onClick={() => addNewItem()}
      >
        <FontAwesomeIcon icon={faPlus} className="flex-1" />
      </div>
    </div>
  )
}
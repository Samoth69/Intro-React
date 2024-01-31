import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditItem } from "./editItem";
import axios from "axios";
import { UserTask } from "shared/src/model";

export function NewItem() {
  const queryClient = useQueryClient();
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
  return (
    <div className="border rounded-md">
      <EditItem initialText="" onSubmit={(data) => createTodo.mutate(data)} />
    </div>
  )
}
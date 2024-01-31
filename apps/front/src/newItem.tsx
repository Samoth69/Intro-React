import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
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
  const { register, handleSubmit, reset } = useForm<UserTask>()
  const onSubmit: SubmitHandler<UserTask> = (data) => {
    createTodo.mutate(data);
    reset();
  };

  return (
    <form className="flex flex-row items-stretch gap-2 p-0.5 border rounded-md" onSubmit={handleSubmit(onSubmit)}>
      <input
        className="grow"
        {...register("text", { required: true })}
      />
      <button
        className="shrink-0 size-[26px] flex items-center rounded-md hover:bg-blue-100 hover:text-blue-500"
        type="submit"
      >
        <FontAwesomeIcon icon={faPlus} className="flex-1" />
      </button>
    </form>
  )
}
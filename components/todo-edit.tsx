'use client'

import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const TodoSchema = z.object({
  text: z.string().min(3),
  checked: z.number().default(0)
})

type TodoSchemaType = z.infer<typeof TodoSchema>;

export function EditItem({ initialText, onSubmit }: { initialText: string, onSubmit: (text: TodoSchemaType) => void }) {
  const { register, handleSubmit, reset, formState: { errors }, } = useForm<TodoSchemaType>({
    resolver: zodResolver(TodoSchema)
  });
  const onSubmitHandler: SubmitHandler<TodoSchemaType> = (data) => {
    onSubmit(data);
    reset();
  };
  return (
    <form className="flex flex-row items-stretch gap-2 p-0.5" onSubmit={handleSubmit(onSubmitHandler)}>
      <input
        className="grow"
        defaultValue={initialText}
        {...register("text", { required: true })}
      />
      {errors.text?.message && <p>{errors.text?.message}</p>}
      <button
        className="shrink-0 size-[26px] flex items-center rounded-md hover:bg-blue-100 hover:text-blue-500"
        type="submit"
      >
        <FontAwesomeIcon icon={faCheck} className="flex-1" />
      </button>
    </form>
  )
}
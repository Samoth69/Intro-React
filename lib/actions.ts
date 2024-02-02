'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const DeleteSchema = z.object({
  id: z.number(),
})

type DeleteSchemaType = z.infer<typeof DeleteSchema>;

const TodoSchema = z.object({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  text: z.string().min(3),
  checked: z.number()
})

const CUTodoSchema = TodoSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

type CUTodoSchemaType = z.infer<typeof CUTodoSchema>;

export async function createTodo(data: CUTodoSchemaType) {
  console.log("create todo", data);
  const obj = CUTodoSchema.parse(data);

  await prisma?.task.create({
    data: {
      ...obj
    }
  });

  revalidatePath("/todo");
}

export async function updateTodo(id: number, data: CUTodoSchemaType) {
  console.log("update", data);
  const obj = CUTodoSchema.parse(data);

  await prisma?.task.update({
    where: {
      id: id
    },
    data: {
      ...obj
    }
  })

  revalidatePath("/todo");
  redirect("/todo");
}

export async function deleteTodo(data: DeleteSchemaType) {
  console.log("delete", data);
  const obj = DeleteSchema.parse(data);
  await prisma?.task.delete({
    where: {
      id: data.id
    }
  })
  revalidatePath("/todo");
}

export async function getTodo(id: number) {
  return await prisma?.task.findFirst({
    where: {
      id: id
    }
  })
}
'use server';

import { revalidatePath } from "next/cache";
import { z } from "zod";

const TodoSchema = z.object({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  text: z.string().min(3),
  checked: z.number()
})

const CreateTodoSchema = TodoSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

type CreateTodoSchemaType = z.infer<typeof CreateTodoSchema>;

export async function createTodo(data: CreateTodoSchemaType) {
  console.log("create todo", data);
  const obj = CreateTodoSchema.parse(data);

  await prisma?.task.create({
    data: {
      ...obj
    }
  });

  revalidatePath("/");
}
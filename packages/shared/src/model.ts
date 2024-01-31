import { z, ZodType } from "zod"; // Add new import

export interface UserTask {
  id?: number,
  text: string,
  checked?: number,
}

export const UserTaskSchema: ZodType<UserTask> = z.object({
  text: z.string().min(3).max(500)
})
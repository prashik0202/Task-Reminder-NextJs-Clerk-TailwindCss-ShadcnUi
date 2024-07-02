import { z } from "zod";

export const createTaskSchema = z.object({
  collectionId: z.number().nonnegative(),
  content: z.string().min(8, {
    message: "Task content must contain atleast 8 character",
  }),
  expiresAt: z.date().optional(),
});

export type createTaskSchemaType = z.infer<typeof createTaskSchema>;

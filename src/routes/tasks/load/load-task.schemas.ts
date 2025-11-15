import z4 from 'zod/v4'

export const LoadTaskParamsSchema = z4.object({
  id: z4.uuidv7().describe('The unique identifier of the task to be loaded'),
})

export const LoadTaskRsponseSuccessSchema = z4.object({
  id: z4.string().describe('The unique identifier of the task'),
  title: z4
    .string()
    .min(1, 'Title is required')
    .describe('The title of the task'),
  description: z4
    .string()
    .min(1, 'Description is required')
    .describe('The description of the task'),
  completed_at: z4.coerce
    .date()
    .nullable()
    .describe('The completion date of the task, or null if not completed'),
})

export const LoadTaskResponseNotFoundSchema = z4.void()

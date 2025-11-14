import z4 from 'zod/v4'

export const UpdateTaskParamsSchema = z4.object({
  id: z4.uuidv7().describe('The unique identifier of the task to be updated'),
})

export const UpdateTaskBodySchema = z4.object({
  title: z4
    .string()
    .min(1, 'Title must have at least one character')
    .optional()
    .describe('The new title of the task'),
  description: z4
    .string()
    .min(1, 'Description must have at least one character')
    .optional()
    .describe('The new description of the task'),
})

export const UpdateTaskResponseSuccessSchema = z4.void()

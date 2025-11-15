import z4 from 'zod/v4'

export const CreateTaskBodySchema = z4.object({
  title: z4.string().min(1, 'Title is required').describe('Title of the task'),
  description: z4
    .string()
    .min(1, 'Description is required')
    .describe('Description of the task'),
})

export const CreateTaskResponseSuccessSchema = z4.object({
  id: z4.string().describe('Unique identifier for the task'),
  title: z4.string().min(1, 'Title is required').describe('Title of the task'),
  description: z4
    .string()
    .min(1, 'Description is required')
    .describe('Description of the task'),
  completed_at: z4.coerce
    .date()
    .nullable()
    .describe('The completion date of the task, or null if not completed'),
})

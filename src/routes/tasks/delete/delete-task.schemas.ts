import z4 from 'zod/v4'

export const DeleteTaskParamsSchema = z4.object({
  id: z4.uuidv7().describe('The unique identifier of the task to be deleted'),
})

export const DeleteTaskRsponseSuccessSchema = z4.object({
  id: z4.string().describe('The unique identifier of the deleted task'),
  title: z4
    .string()
    .min(1, 'Title is required')
    .describe('The title of the deleted task'),
  description: z4
    .string()
    .min(1, 'Description is required')
    .describe('The description of the deleted task'),
  completed_at: z4.coerce
    .date()
    .nullable()
    .describe(
      'The completion date of the deleted task, or null if not completed',
    ),
})

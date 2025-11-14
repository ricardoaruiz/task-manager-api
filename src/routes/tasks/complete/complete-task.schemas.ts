import z4 from 'zod/v4'

export const CompleteTaskParamsSchema = z4.object({
  id: z4.uuidv7().describe('The unique identifier of the task to be completed'),
})

export const CompleteTaskResponseSuccessSchema = z4.void()

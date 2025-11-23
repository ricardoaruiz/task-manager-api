import z4 from 'zod/v4'

export const UnCompleteTaskParamsSchema = z4.object({
  id: z4
    .uuidv7()
    .describe('The unique identifier of the task to be uncompleted'),
})

export const UnCompleteTaskResponseSuccessSchema = z4.void()

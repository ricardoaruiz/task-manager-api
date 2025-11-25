import z4 from 'zod/v4'

export const ArchiveTaskParamsSchema = z4.object({
  id: z4.uuidv7().describe('The unique identifier of the task to be archived'),
})

export const ArchiveTaskResponseSuccessSchema = z4.void()

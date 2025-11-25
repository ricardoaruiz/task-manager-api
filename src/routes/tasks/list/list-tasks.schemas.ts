import z4 from 'zod/v4'

export const ListTaskQueryStringSchema = z4.object({
  title: z4.string().optional().describe('Filter by task title'),
  description: z4.string().optional().describe('Filter by task description'),
  status: z4
    .enum(['completed', 'pending'])
    .optional()
    .describe('Filter by task status'),
  isArchived: z4
    .enum(['true', 'false'])
    .optional()
    .default('false')
    .describe('Filter by archived tasks'),
  page: z4.coerce.number().optional().describe('Page number for pagination'),
  itemsPerPage: z4.coerce
    .number()
    .optional()
    .describe('Number of items per page for pagination'),
})

export const ListTaskRouteResponseSuccessSchema = z4.object({
  tasks: z4.array(
    z4.object({
      id: z4.string().describe('The unique identifier of the task'),
      title: z4.string().describe('The title of the task'),
      description: z4.string().describe('The description of the task'),
      completed_at: z4.coerce
        .date()
        .nullable()
        .describe('The completion date of the task, or null if not completed'),
      archived_at: z4.coerce
        .date()
        .nullable()
        .describe('The archival date of the task, or null if not archived'),
    }),
  ),
})

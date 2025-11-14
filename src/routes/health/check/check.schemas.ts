import z4 from 'zod/v4'

export const CHECK_ROUTE_SUCCESS_RESPONSE_SCHEMA = z4.object({
  status: z4.string(),
})

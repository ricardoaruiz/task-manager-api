import z4 from 'zod/v4'

export const MeResponseSuccessSchema = z4.object({
  id: z4.string().describe('User unique identifier'),
  name: z4.string().describe('User full name'),
  email: z4.string().email().describe('User email address'),
})

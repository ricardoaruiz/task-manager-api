import z4 from 'zod/v4'

export const LoginRouteBodySchema = z4.object({
  email: z4
    .email()
    .min(1, 'Email is required')
    .describe('The email of the user'),
  password: z4
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .describe('The password of the user'),
})

export const LoginRouteResponseSuccessSchema = z4.void()
export const LoginRouteResponseUnauthorizedSchema = z4.void()

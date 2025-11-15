import z4 from 'zod/v4'

export const SignupBodySchema = z4
  .object({
    name: z4
      .string()
      .min(1, 'Name is required')
      .describe('The full name of the user'),
    email: z4
      .email('Invalid email address')
      .describe('The email address of the user'),
    password: z4
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .describe('The password for the user account'),
    passwordConfirmation: z4
      .string()
      .min(6, 'Password confirmation must be at least 6 characters long')
      .describe('The password confirmation for the user account'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  })

export const SignupResponseSuccessSchema = z4.object({
  id: z4.string().describe('The unique identifier of the user'),
  name: z4.string().describe('The full name of the user'),
  email: z4.email().describe('The email address of the user'),
})

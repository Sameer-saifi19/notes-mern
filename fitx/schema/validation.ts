import * as z from  'zod'

export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string()
})

export const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export type loginSchema = z.infer<typeof loginSchema>
export type signupSchema = z.infer<typeof signupSchema>;
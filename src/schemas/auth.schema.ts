import z from 'zod'

export const registerSchema = z.object({
	email: z.email({ error: 'Please enter valid email' }),
})

export const loginSchema = z.object({
	email: z.email(),
	password: z.string().min(8),
})

export const createSchema = z
	.object({
		first_name: z.string().min(1, 'First name is required'),
		last_name: z.string().min(1, 'Last name is required'),
		password: z.string().min(8, 'Password must be at least 6 characters'),
		repeatPassword: z.string().min(8, 'Please confirm your password'),
	})
	.refine(data => data.password === data.repeatPassword, {
		message: 'Passwords do not match',
		path: ['repeatPassword'],
	})

export const resetPasswordSchema = z
	.object({
		password: z.string().min(8, 'Password must be at least 6 characters'),
		confirmPassword: z.string().min(8, 'Confirm your password'),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	})

// types
export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>
export type LoginForm = z.infer<typeof loginSchema>
export type RegisterForm = z.infer<typeof registerSchema>
export type CreateForm = z.infer<typeof createSchema>

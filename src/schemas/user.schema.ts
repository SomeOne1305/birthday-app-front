import z from 'zod'

export const updateUserSchema = z.object({
	first_name: z.string().min(3),
	last_name: z.string().min(3),
})

export type UpdateUserType = z.infer<typeof updateUserSchema>

export const updatePasswordSchema = z
	.object({
		old_password: z.string().min(8),
		new_password: z.string().min(8),
		confirm_password: z.string().min(8),
	})
	.refine(data => data.new_password === data.confirm_password, {
		message: "Passwords don't match",
		path: ['confirm_password'],
	})

export type UpdatePassForm = z.infer<typeof updatePasswordSchema>
export type UpdatePassType = {
	old_password: string
	new_password: string
}

function isValidDate(dateString: string): boolean {
	const date = new Date(dateString)
	return !isNaN(date.getTime()) && date.getTime() <= Date.now()
}

export const personSchema = z.object({
	name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
	birth_date: z
		.string()
		.refine(isValidDate, { message: 'Please enter a valid past date.' }),
	relation: z.string().min(1, { message: 'Please select a relation.' }),
	note: z.string().optional(),
})

export type PersonForm = z.infer<typeof personSchema>

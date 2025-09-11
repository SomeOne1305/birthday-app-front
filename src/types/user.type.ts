import type {
	PersonForm,
	UpdatePassType,
	UpdateUserType,
} from '@/schemas/user.schema'

export type UserType = {
	_id?: string
	first_name?: string
	last_name?: string
	email?: string
	createdAt?: string
	updatedAt?: string
	__v?: number
}

export type UpdateUserRequest = UpdateUserType
export type UpdatePassRequest = UpdatePassType
export type AddPersonRequest = PersonForm

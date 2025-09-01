import type { LoginForm, RegisterForm } from '@/schemas/auth.schema'
import type { IResponse } from './api.type'

export type IResToVerification = IResponse<{
	token: string
}>

export type CreateUserReq = {
	first_name: string
	last_name: string
	password: string
	token: string
}
export type CreateReqResp = IResponse<{
	_id: string
	first_name: string
	last_name: string
	email: string
	access_token: string
	createdAt: string
	updatedAt: string
}>
export type ChangePassRequest = {
	token: string
	password: string
}

export type LoginRequest = LoginForm
export type LoginResponse = CreateReqResp
export type RegisterRequest = RegisterForm

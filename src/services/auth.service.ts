import api from '@/config/auth'
import { API_URLS } from '@/exports/urls'
import type { IResponse } from '@/types/api.type'
import type {
	ChangePassRequest,
	CreateReqResp,
	CreateUserReq,
	IResToVerification,
	LoginRequest,
	LoginResponse,
	RegisterRequest,
} from '@/types/auth.type'
import type { AxiosResponse } from 'axios'

const AuthService = {
	login: async (data: LoginRequest) => {
		return (
			await api.post<LoginRequest, AxiosResponse<LoginResponse>>(
				API_URLS.login,
				data
			)
		).data
	},
	verify: async (token: string): Promise<IResToVerification> => {
		return (await api.post<IResToVerification>(API_URLS.verify, { token })).data
	},
	create: async (data: CreateUserReq): Promise<CreateReqResp> => {
		return (
			await api.post<CreateUserReq, AxiosResponse<CreateReqResp>>(
				API_URLS.user_create,
				data
			)
		).data
	},
	register: async (data: RegisterRequest) => {
		return await api.post<RegisterRequest, AxiosResponse>(
			API_URLS.register,
			data
		)
	},
	forgot: async (data: RegisterRequest) => {
		return await api.post<RegisterRequest, AxiosResponse>(
			API_URLS.forget_pass,
			data
		)
	},
	change_pass: async (data: ChangePassRequest) => {
		return await api.post<ChangePassRequest, AxiosResponse<IResponse>>(
			API_URLS.change_pass,
			data
		)
	},
	logout: async () => {
		return await api.delete<IResponse>(API_URLS.logout)
	},
}

export default AuthService

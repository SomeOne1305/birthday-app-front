import api from '@/config/auth'
import { API_URLS } from '@/exports/urls'
import type { IResponse } from '@/types/api.type'
import type { BirthDateType } from '@/types/birthday.type'
import type { SessionsResponse } from '@/types/session.type'
import type {
	AddPersonRequest,
	UpdatePassRequest,
	UpdateUserRequest,
	UserType,
} from '@/types/user.type'
import type { AxiosResponse } from 'axios'

export const UserService = {
	get_me: async () => {
		return (await api.get<IResponse<UserType>>(API_URLS.get_me)).data
	},
	update: async (data: UpdateUserRequest) => {
		return (await api.put<UpdateUserRequest>(API_URLS.update_user, data)).data
	},
	update_pass: async (data: UpdatePassRequest): Promise<IResponse> => {
		return (
			await api.put<UpdatePassRequest, AxiosResponse<IResponse>>(
				API_URLS.update_pass,
				data
			)
		).data
	},
	delete_me: async () => (await api.delete(API_URLS.delete_user)).data,
	get_sessions: async () => {
		return (await api.get<IResponse<SessionsResponse>>(API_URLS.get_sessions))
			.data
	},
	delete_session: async (id: string) => {
		return (await api.delete<IResponse>(API_URLS.delete_session + id)).data
	},

	add_person: async (data: AddPersonRequest) => {
		return (
			await api.post<AddPersonRequest, AxiosResponse<IResponse>>(
				API_URLS.add_person,
				data
			)
		).data
	},
	get_dates: async () => {
		return (await api.get<IResponse<BirthDateType[]>>(API_URLS.get_people)).data
	},
	delete_date: async (id: string) => {
		return (await api.delete<IResponse>(API_URLS.delete_person + id)).data
	},
}

import { useAuthStore } from '@/stores/auth.store'
import type { LoginResponse } from '@/types/auth.type'
import type {
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios'
import axios, { AxiosError } from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + '/api'
let isRefreshing = false

// Define a queue entry type
interface FailedRequest {
	resolve: (token: string | null) => void
	reject: (error: unknown) => void
}
let failedQueue: FailedRequest[] = []

const api = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true,
})

function processQueue(error: unknown, token: string | null = null): void {
	failedQueue.forEach(prom => {
		if (error) {
			prom.reject(error)
		} else {
			prom.resolve(token)
		}
	})
	failedQueue = []
}

api.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const accessToken = localStorage.getItem('access_token')

		// Skip auth routes
		if (
			config.url?.includes('/auth/login') ||
			config.url?.includes('/auth/register') ||
			config.url?.includes('/auth/refresh')
		) {
			return config
		}

		// Add Bearer token if exists
		if (accessToken) {
			config.headers.set('Authorization', `Bearer ${accessToken}`)
		}

		return config
	},
	(error: AxiosError) => Promise.reject(error)
)

// ✅ Response interceptor
api.interceptors.response.use(
	(response: AxiosResponse) => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as AxiosRequestConfig & {
			_retry?: boolean
		}

		// Prevent infinite loop
		if (originalRequest._retry) {
			return Promise.reject(error)
		}

		// If Unauthorized
		if (
			error.response?.status === 401 &&
			originalRequest.url &&
			!originalRequest.url.includes('/auth/refresh')
		) {
			if (isRefreshing) {
				// Queue requests until refresh finishes
				return new Promise<string | null>((resolve, reject) => {
					failedQueue.push({ resolve, reject })
				})
					.then(token => {
						if (token) {
							originalRequest.headers = {
								...originalRequest.headers,
								Authorization: `Bearer ${token}`,
							}
						}
						return api(originalRequest)
					})
					.catch(err => Promise.reject(err))
			}

			originalRequest._retry = true
			isRefreshing = true

			try {
				// Refresh request (only cookie)
				const res = await api.post<LoginResponse>('/auth/refresh')
				const newAccessToken = res.data?.data?.data?.access_token as string

				localStorage.setItem('access_token', newAccessToken)
				api.defaults.headers.common['Authorization'] =
					'Bearer ' + newAccessToken

				processQueue(null, newAccessToken)

				// Retry original request with new token
				originalRequest.headers = {
					...originalRequest.headers,
					Authorization: `Bearer ${newAccessToken}`,
				}
				return api(originalRequest)
			} catch (err) {
				processQueue(err, null)
				useAuthStore().setAuthenticated(false)
				localStorage.removeItem('access_token') // cleanup if refresh fails
				return Promise.reject(err)
			} finally {
				isRefreshing = false
			}
		}

		return Promise.reject(error)
	}
)
export default api

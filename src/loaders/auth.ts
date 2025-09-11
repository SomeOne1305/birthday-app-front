// src/loaders/authLoader.ts
import { queryClient } from '@/lib/queryClient'
import { UserService } from '@/services/user.service'
import { useAuthStore } from '@/stores/auth.store'
import type { IResponse } from '@/types/api.type'
import type { UserType } from '@/types/user.type'

export async function authLoader() {
	const { user, setUser, setAuthenticated } = useAuthStore.getState()

	// If already have user in store, don't fetch again
	if (user && user._id) {
		return user
	}

	try {
		const data = await queryClient.ensureQueryData<IResponse<UserType>>({
			queryKey: ['user'],
			queryFn: UserService.get_me,
		})
		const currentUser = data?.data?.data
		if (currentUser) {
			setUser(currentUser)
			setAuthenticated(true)
			return currentUser
		}
	} catch (e) {
		setAuthenticated(false)
		console.log(e)
		// optionally redirect if not authenticated
		return
	}
}

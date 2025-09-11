// src/stores/auth.store.ts
import type { UserType } from '@/types/user.type'
import { create } from 'zustand'

interface AuthState {
	user: UserType | null
	isAuthenticated: boolean
	setUser: (user: UserType | null) => void
	setAuthenticated: (value: boolean) => void
	logout: () => void
}

export const useAuthStore = create<AuthState>(set => ({
	user: null,
	isAuthenticated: !!localStorage.getItem('access_token'),

	setUser: user => set({ user }),
	setAuthenticated: value => set({ isAuthenticated: value }),

	logout: () =>
		set({
			user: null,
			isAuthenticated: false,
		}),
}))

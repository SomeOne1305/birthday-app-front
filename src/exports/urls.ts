export const API_URLS = {
	// Auth endpoints
	register: '/auth/register',
	verify: '/auth/verify/',
	login: '/auth/login',
	user_create: '/auth/create',
	refresh: '/auth/refresh',
	logout: '/auth/logout',
	forget_pass: '/auth/forgot-password',
	change_pass: '/auth/change-password',

	// User endpoints
	get_me: '/user/me',
	update_pass: '/user/update-password',
	update_user: '/user/update-me',
	delete_user: '/user/delete-me',

	// Session endpoints
	get_sessions: '/sessions/all',
	delete_session: '/sessions/delete/',

	// Birthdate endpoints
	add_person: '/birthday/create',
	delete_person: '/birthday/delete/', // + id
	get_people: '/birthday/all',
}

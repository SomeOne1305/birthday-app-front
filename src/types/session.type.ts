export type SessionType = {
	_id: string
	user: string
	refresh: string
	device_name: string
	device_id: string
	ip_add: string
	ip_location: string
	latitude: string
	longitude: string
	createdAt: string
	updatedAt: string
}

export type SessionsResponse = {
	currentSession: string
	sessions: SessionType[]
}

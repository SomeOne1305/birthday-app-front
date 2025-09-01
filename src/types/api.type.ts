export type IResponse<T = undefined> = {
	status: string
	data: {
		code: number
		message: string
		data?: T
	}
}

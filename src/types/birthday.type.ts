export type BirthDateType = {
	__v: number
	_id: string
	birth_date: string
	createdAt: string
	name: string
	relation: string
	updatedAt: string
	notes?: string
}

export type CategorizedBirthDates = Record<
	| 'january'
	| 'february'
	| 'march'
	| 'april'
	| 'may'
	| 'june'
	| 'july'
	| 'august'
	| 'september'
	| 'october'
	| 'november'
	| 'december',
	BirthDateType[]
>

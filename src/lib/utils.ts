import type {
	BirthDateType,
	CategorizedBirthDates,
} from '@/types/birthday.type'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function categorize_dates(
	dates: BirthDateType[]
): Partial<CategorizedBirthDates> {
	const months = [
		'january',
		'february',
		'march',
		'april',
		'may',
		'june',
		'july',
		'august',
		'september',
		'october',
		'november',
		'december',
	] as const

	if (dates.length === 0) return {}

	function sort(arr: BirthDateType[]): BirthDateType[] {
		const copy = [...arr]
		const n = copy.length

		for (let i = 0; i < n - 1; i++) {
			for (let j = 0; j < n - i - 1; j++) {
				const d1 = new Date(copy[j].birth_date)
				const d2 = new Date(copy[j + 1].birth_date)

				const month1 = d1.getMonth()
				const month2 = d2.getMonth()
				const day1 = d1.getDate()
				const day2 = d2.getDate()

				if (month1 > month2 || (month1 === month2 && day1 > day2)) {
					const temp = copy[j]
					copy[j] = copy[j + 1]
					copy[j + 1] = temp
				}
			}
		}
		return copy
	}

	const sorted = sort(dates)

	// Only include months that actually have data
	const categorized: Partial<CategorizedBirthDates> = {}

	sorted.forEach(item => {
		const monthName = months[new Date(item.birth_date).getMonth()]
		if (!categorized[monthName]) {
			categorized[monthName] = []
		}
		categorized[monthName]!.push(item)
	})

	return categorized
}

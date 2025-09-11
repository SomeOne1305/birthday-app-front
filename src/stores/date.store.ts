import { categorize_dates } from '@/lib/utils'
import type {
	BirthDateType,
	CategorizedBirthDates,
} from '@/types/birthday.type'
import { create } from 'zustand'

type BirthdayStore = {
	categorizedData: Partial<CategorizedBirthDates>
	setDates: (dates: BirthDateType[]) => void
	clear: () => void
}

export const useBirthdayStore = create<BirthdayStore>(set => ({
	categorizedData: {},
	setDates: (dates: BirthDateType[]) => {
		const categorized = categorize_dates(dates)
		set({ categorizedData: categorized })
	},
	clear: () => set({ categorizedData: {} }),
}))

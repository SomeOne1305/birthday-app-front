function bubbleSort(arr) {
	let n = arr.length
	for (let i = 0; i < n - 1; i++) {
		for (let j = 0; j < n - i - 1; j++) {
			// compare arr[j] and arr[j+1]
			/* arr[j] should come after arr[j+1] */
			if (arr[j] > arr[j + 1]) {
				// swap
				let temp = arr[j]
				arr[j] = arr[j + 1]
				arr[j + 1] = temp
			}
		}
	}
	return arr
}

let numbers = [5, 2, 9, 1, 5, 6]

console.log(bubbleSort(numbers))
const birthdays = [
	{ name: 'Alice', date: '2025-05-10' },
	{ name: 'Bob', date: '2025-01-25' },
	{ name: 'Charlie', date: '2025-12-01' },
	{ name: 'Diana', date: '2025-07-18' },
	{ name: 'Eve', date: '2025-03-03' },
	{ name: 'Tony', date: '2026-03-03' },
]

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
]

function sort(arr) {
	let n = arr.length

	for (let i = 0; i < n - 1; i++) {
		for (let j = 0; j < n - i - 1; j++) {
			const d1 = new Date(arr[j].date)
			const d2 = new Date(arr[j + 1].date)

			const month1 = d1.getMonth()
			const month2 = d2.getMonth()

			const day1 = d1.getDate()
			const day2 = d2.getDate()

			if (month1 > month2 || (month1 === month2 && day1 > day2)) {
				let temp = arr[j]
				arr[j] = arr[j + 1]
				arr[j + 1] = temp
			}
		}
	}
	return arr
}

function sortByMonth(arr) {
	const sorted = sort([...arr]) // keep original intact
	const categorized = Object.fromEntries(months.map(m => [m, []]))

	sorted.forEach(item => {
		const monthName = months[new Date(item.date).getMonth()]
		categorized[monthName].push(item)
	})

	return categorized
}

console.log(sortByMonth(birthdays))

import { useBirthdayStore } from '@/stores/date.store'
import type { CategorizedBirthDates } from '@/types/birthday.type'
import {
	Document,
	Font,
	Image,
	Page,
	StyleSheet,
	Text,
	View,
	pdf,
} from '@react-pdf/renderer'
import { useState } from 'react'
import { Button } from './ui/button'

Font.register({
	family: 'Poppins',
	fonts: [
		{
			src: 'https://fonts.gstatic.com/s/poppins/v15/pxiEyp8kv8JHgFVrJJnecmNE.woff2',
		},
		{
			src: 'https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2',
			fontWeight: 'bold',
		},
	],
})
// --- PDF Styles ---
const styles = StyleSheet.create({
	page: {
		padding: 30,
		backgroundColor: '#fef9c3',
		fontSize: 12,
		fontFamily: 'Poppins',
	},
	title: {
		fontSize: 22,
		textAlign: 'center',
		marginBottom: 20,
		color: '#b91c1c',
		fontWeight: 'bold',
	},
	month: {
		fontSize: 16,
		marginTop: 12,
		marginBottom: 6,
		color: '#065f46',
		borderBottom: '1pt solid #ccc',
	},
	entry: {
		marginBottom: 6,
	},
	empty: {
		textAlign: 'center',
		marginTop: 20,
		fontSize: 14,
		color: '#6b7280',
	},
})

// --- PDF Document ---
function BirthdayPDF({
	categorized,
}: {
	categorized: Partial<CategorizedBirthDates>
}) {
	const hasData = Object.keys(categorized).length > 0

	return (
		<Document>
			<Page size='A4' style={styles.page}>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
						marginBottom: 20,
					}}
				>
					<Image
						src='https://twemoji.maxcdn.com/v/latest/72x72/1f389.png' // 🎉 emoji image
						style={{ width: 16, height: 16 }}
					/>
					<Text> Birthday Calendar </Text>
					<Image
						src='https://twemoji.maxcdn.com/v/latest/72x72/1f382.png' // 🎂 emoji image
						style={{ width: 16, height: 16 }}
					/>
				</View>
				{hasData ? (
					Object.entries(categorized).map(([month, dates]) => (
						<View key={month}>
							<Text style={styles.month}>{month.toUpperCase()}</Text>
							{dates?.map(d => (
								<Text key={d._id} style={styles.entry}>
									<Image src='https://twemoji.maxcdn.com/v/latest/72x72/1f388.png' />{' '}
									{d.name} — {new Date(d.birth_date).toLocaleDateString()} (
									{d.relation})
								</Text>
							))}
						</View>
					))
				) : (
					<Text style={styles.empty}>No birthdays found 🎂</Text>
				)}
			</Page>
		</Document>
	)
}

// --- Export Button ---
export default function ExportBirthdaysButton() {
	const categorized = useBirthdayStore(s => s.categorizedData)
	const [loading, setLoading] = useState(false)

	const handleExport = async () => {
		if (!categorized || Object.keys(categorized).length === 0) {
			alert('No birthdays available to export.')
			return
		}

		try {
			setLoading(true)
			// ✅ generate PDF as blob
			const blob = await pdf(<BirthdayPDF categorized={categorized} />).toBlob()

			// ✅ trigger download
			const url = URL.createObjectURL(blob)
			const link = document.createElement('a')
			link.href = url
			link.download = 'birthdays.pdf'
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
			URL.revokeObjectURL(url)
		} catch (err) {
			console.error('Error generating PDF:', err)
			alert('Something went wrong while generating the PDF.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<Button
			onClick={handleExport}
			disabled={loading}
			className='mr-2 bg-pink-500 hover:bg-pink-600'
		>
			{loading ? (
				<span>⏳ Generating...</span>
			) : (
				<span className='inline-flex gap-2'>
					📥 <span className='hidden sm:block'>Export Birthdays</span>
				</span>
			)}
		</Button>
	)
}

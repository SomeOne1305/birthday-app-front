import BirthdayCard from '@/components/birthday-card'
import ExportBirthdaysButton from '@/components/export-data'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { queryClient } from '@/lib/queryClient'
import { UserService } from '@/services/user.service'
import { useBirthdayStore } from '@/stores/date.store'
import { useMutation, useQuery } from '@tanstack/react-query'
import { CalendarX2, Loader2, PlusCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import CreatePersonDialog from './forms/add-date'

function BirthdayList() {
	const { categorizedData, setDates } = useBirthdayStore()
	const { data, isLoading } = useQuery({
		queryKey: ['birth-dates'],
		queryFn: async () => UserService.get_dates(),
	})
	useEffect(() => {
		const res = data?.data?.data
		if (res) {
			setDates(res)
		}
	}, [data, setDates])
	const { mutate } = useMutation({
		mutationKey: ['delete-date'],
		mutationFn: async (id: string) => UserService.delete_date(id),
		onSuccess: async () => {
			toast.dismiss()
			await queryClient.invalidateQueries({ queryKey: ['birth-dates'] })
			toast('Birth date deleted successfully')
		},
		onError: err => {
			toast.error(String(err))
		},
		onMutate: () => {
			toast.loading('Deleting birth date...', { duration: 1000 })
		},
	})

	console.log(categorizedData)
	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-[50vh]'>
				<Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
			</div>
		)
	}
	return (
		<div className='w-full my-10 flex flex-col gap-10'>
			{!isLoading &&
				categorizedData &&
				Object.keys(categorizedData).length === 0 && (
					<div className='flex flex-col items-center justify-center py-16 text-center border rounded-2xl shadow-sm bg-muted/30'>
						<CalendarX2 className='w-12 h-12 text-muted-foreground mb-4' />
						<h3 className='text-lg font-semibold mb-1'>No birth dates found</h3>
						<p className='text-sm text-muted-foreground mb-4'>
							Start by adding a person’s birthday to keep track of special
							dates.
						</p>
					</div>
				)}
			{!isLoading &&
				categorizedData &&
				Object.entries(categorizedData).map(([month, dates]) => (
					<div key={month} className='w-full'>
						<h3 className='text-xl font-semibold mb-4 capitalize'>{month}</h3>
						<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-5'>
							{dates.length > 0 &&
								dates.map(date => (
									<BirthdayCard
										key={date._id}
										birth_date={date?.birth_date}
										name={date.name}
										relation={date.relation}
										notes={date.notes}
										onDelete={() => mutate(date._id!)}
									/>
								))}
						</div>
					</div>
				))}
		</div>
	)
}

const UserPage = () => {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<div className='w-full py-4 bg-background'>
			<div className='container min-h-screen'>
				<div className='w-full pt-20 my-3 flex items-center justify-between'>
					<h2 className='text-xl md:text-2xl'>Birthday dates:</h2>
					<div className='inline-flex'>
						<ExportBirthdaysButton />
						<CreatePersonDialog isOpen={isOpen} setIsOpen={setIsOpen}>
							<Button className='uppercase inline-flex items-center'>
								<PlusCircle />
								<span className='hidden sm:block'>Add new date</span>
							</Button>
						</CreatePersonDialog>
					</div>
				</div>
				<Separator />
				<BirthdayList />
			</div>
		</div>
	)
}

export default UserPage

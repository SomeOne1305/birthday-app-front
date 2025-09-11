import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { queryClient } from '@/lib/queryClient'
import { personSchema, type PersonForm } from '@/schemas/user.schema'
import { UserService } from '@/services/user.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { type PropsWithChildren } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type Props = {
	isOpen: boolean
	setIsOpen: (open: boolean) => void
} & PropsWithChildren
export default function CreatePersonDialog({
	children,
	isOpen,
	setIsOpen,
}: Props) {
	const { isPending, mutate } = useMutation({
		mutationKey: ['add-person'],
		mutationFn: async (data: PersonForm) => {
			try {
				return await UserService.add_person(data)
			} catch (err: unknown) {
				if (
					typeof err === 'object' &&
					err !== null &&
					'response' in err &&
					typeof (err as { response?: { status?: number } }).response ===
						'object' &&
					(err as { response?: { status?: number } }).response?.status === 401
				) {
					try {
						return await UserService.add_person(data) // retry once
					} catch (refreshErr: unknown) {
						if (
							typeof refreshErr === 'object' &&
							refreshErr !== null &&
							'response' in refreshErr &&
							typeof (refreshErr as { response?: { status?: number } })
								.response === 'object' &&
							(refreshErr as { response?: { status?: number } }).response
								?.status === 401
						) {
							throw new Error('SESSION_EXPIRED')
						}
						throw refreshErr
					}
				}
				throw err
			}
		},
		onSuccess: async data => {
			console.log(data)

			toast('Person added successfully', {
				description: 'Birthdate added successfully.',
			})
			await queryClient.invalidateQueries({ queryKey: ['birth-dates'] })
			setIsOpen(true)
		},
		onError: err => {
			toast.error(String(err))
		},
	})

	const form = useForm<PersonForm>({
		resolver: zodResolver(personSchema),
		defaultValues: {
			name: '',
			birth_date: '',
			relation: '',
			note: '',
		},
	})

	const onSubmit = (values: PersonForm) => {
		console.log('Submitted:', values)
		mutate(values)
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={open => {
				if (!open) {
					form.reset() // reset only when closing
				}
				setIsOpen(open)
			}}
			modal
		>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className='sm:max-w-[500px]'>
				<DialogHeader>
					<DialogTitle>Add a birthdate</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='grid gap-4 py-4'
					>
						{/* Name */}
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder='Enter name' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Birth Date */}
						<FormField
							control={form.control}
							name='birth_date'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Birth Date</FormLabel>
									<FormControl>
										<Input type='date' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Relation */}
						<FormField
							control={form.control}
							name='relation'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Relation</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange} value={field.value}>
											<SelectTrigger>
												<SelectValue placeholder='Select relation' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='Family'>Family</SelectItem>
												<SelectItem value='Friend'>Friend</SelectItem>
												<SelectItem value='Colleague'>Colleague</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Note */}
						<FormField
							control={form.control}
							name='note'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Note</FormLabel>
									<FormControl>
										<Textarea placeholder='Write a note...' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type='submit' className='mt-4'>
							{isPending ? (
								<span className='inline-flex items-center gap-2'>
									<Loader2 className='w-4 h-4 animate-spin' />
									Saving changes…
								</span>
							) : (
								'Add Person'
							)}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

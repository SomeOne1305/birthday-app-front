import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateUserSchema, type UpdateUserType } from '@/schemas/user.schema'
import { UserService } from '@/services/user.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
//stores
import { useAuthStore } from '@/stores/auth.store'
//hooks
import { queryClient } from '@/lib/queryClient'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

const PersonalPage = () => {
	const { user } = useAuthStore()
	const {
		formState: { errors },
		register,
		handleSubmit,
	} = useForm<UpdateUserType>({
		resolver: zodResolver(updateUserSchema),
		defaultValues: {
			first_name: user?.first_name || 'John',
			last_name: user?.last_name || 'Doe',
		},
	})

	const { isPending, mutate } = useMutation({
		mutationKey: ['UPDATE_USER'],
		mutationFn: async (data: UpdateUserType) => UserService.update(data),
		onSuccess: () => {
			toast('Successfully update', {
				description: 'Personal info is updated !',
				icon: <CheckCircle />,
				onAutoClose: async () => {
					await queryClient.invalidateQueries({ queryKey: ['user'] })
				},
			})
		},
		onError: err => {
			toast(String(err))
		},
	})

	const onSubmit = (data: UpdateUserType) => mutate(data)

	return (
		<Card>
			<CardHeader>
				<CardTitle>Profile Information</CardTitle>
				<CardDescription>
					Update your personal details and profile information.
				</CardDescription>
			</CardHeader>
			<CardContent className='space-y-4'>
				<form action='' className='w-full ' onSubmit={handleSubmit(onSubmit)}>
					<div className='grid grid-cols-1 gap-4 mb-4'>
						<div className='space-y-2'>
							<Label htmlFor='firstName'>First Name</Label>
							<Input
								{...register('first_name')}
								id='firstName'
								placeholder='John'
							/>
							{errors.first_name && (
								<p className='mt-2 text-red-500 text-sm'>
									{errors.first_name.message}
								</p>
							)}
						</div>
						<div className='space-y-2'>
							<Label htmlFor='lastName'>Last Name</Label>
							<Input
								id='lastName'
								placeholder='Doe'
								{...register('last_name')}
							/>
							{errors.last_name && (
								<p className='mt-2 text-red-500 text-sm'>
									{errors.last_name.message}
								</p>
							)}
						</div>
					</div>
					<Button type='submit'>
						{isPending ? (
							<span className='inline-flex items-center gap-2'>
								<Loader2 className='w-4 h-4 animate-spin' />
								Saving changes…
							</span>
						) : (
							'Save changes'
						)}
					</Button>
				</form>
			</CardContent>
		</Card>
	)
}

export default PersonalPage

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
import {
	updatePasswordSchema,
	type UpdatePassForm,
	type UpdatePassType,
} from '@/schemas/user.schema'
import { UserService } from '@/services/user.service'
import type { IResponse } from '@/types/api.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { CheckCircle, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const PasswordInput = ({
	id,
	label,
	error,
	...rest
}: {
	id: string
	label: string
	error?: string
} & React.InputHTMLAttributes<HTMLInputElement>) => {
	const [show, setShow] = useState(false)

	return (
		<div className='space-y-2'>
			<Label htmlFor={id}>{label}</Label>
			<div className='relative'>
				<Input
					id={id}
					type={show ? 'text' : 'password'}
					{...rest}
					className='pr-10'
				/>
				<button
					type='button'
					onClick={() => setShow(prev => !prev)}
					className='absolute right-2 cursor-pointer top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
					tabIndex={-1}
				>
					{show ? <EyeOff className='h-5 w-5' /> : <Eye className='h-5 w-5' />}
				</button>
			</div>
			{error && (
				<p className='text-sm text-red-600 pt-1' role='alert'>
					{error}
				</p>
			)}
		</div>
	)
}

const SecurityPage = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<UpdatePassForm>({
		resolver: zodResolver(updatePasswordSchema),
	})
	const [reqErr, setReqErr] = useState<string | null>(null)
	const { mutate, isError } = useMutation({
		mutationKey: ['CHANGE_PASS'],
		mutationFn: async (data: UpdatePassType) =>
			await UserService.update_pass(data),
		onSuccess: () => {
			toast('Password is changed successfully !', {
				icon: <CheckCircle />,
				onAutoClose: () => {
					window.location.reload()
				},
			})
		},
		onError: (error: AxiosError<IResponse>) => {
			const mess = error.response?.data?.data?.message
			if (mess) {
				setReqErr(mess)
			}
		},
	})

	const onSubmit = handleSubmit(data => {
		mutate({
			old_password: data.old_password,
			new_password: data.new_password,
		})
	})

	return (
		<Card>
			<CardHeader>
				<CardTitle>Password</CardTitle>
				<CardDescription>
					Change your password to keep your account secure.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={onSubmit} className='flex flex-col gap-4'>
					<PasswordInput
						id='currentPassword'
						label='Current Password'
						placeholder='********'
						{...register('old_password')}
						error={errors.old_password?.message}
					/>
					<PasswordInput
						id='newPassword'
						label='New Password'
						placeholder='********'
						{...register('new_password')}
						error={errors.new_password?.message}
					/>
					<PasswordInput
						id='confirmPassword'
						label='Confirm Password'
						placeholder='********'
						{...register('confirm_password')}
						error={errors.confirm_password?.message}
					/>
					{isError && (
						<p className='text-sm text-red-600 pt-1' role='alert'>
							{reqErr}
						</p>
					)}
					{errors && (
						<p className='text-sm text-red-600 pt-1' role='alert'>
							{errors.root?.message}
						</p>
					)}
					<Button type='submit'>Update Password</Button>
				</form>
			</CardContent>
		</Card>
	)
}

export default SecurityPage

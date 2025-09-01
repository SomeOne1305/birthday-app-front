/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2, PartyPopper } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router'
// shadcn/ui
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createSchema, type CreateForm } from '@/schemas/auth.schema'
import { AuthService } from '@/services'
export default function CreatePage() {
	const navigate = useNavigate()
	const { token } = useParams<{ token: string }>()
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<CreateForm>({
		resolver: zodResolver(createSchema),
	})

	const [error, setError] = useState<string | null>(null)

	// react-query mutation
	const mutation = useMutation({
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		mutationFn: async ({ repeatPassword, ...others }: CreateForm) => {
			return await AuthService.create({ ...others, token: token! })
		},
		onSuccess: () => {
			navigate('/login')
		},
		onError: (err: any) => {
			setError(err?.response?.data?.message || 'Something went wrong.')
		},
	})

	const onSubmit = (data: CreateForm) => {
		setError(null)
		mutation.mutate(data)
	}

	return (
		<div className='min-h-dvh w-full flex items-center justify-center p-4 bg-secondary'>
			<Card className='w-full max-w-md shadow-xl border-0 bg-white/90 backdrop-blur'>
				<CardHeader className='space-y-2 text-center'>
					<div className='mx-auto w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center'>
						<PartyPopper className='w-6 h-6 text-primary' />
					</div>
					<CardTitle className='text-2xl text-secondary'>
						Create Account
					</CardTitle>
					<CardDescription>
						Fill your details to join and celebrate birthdays together 🎉
					</CardDescription>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='first_name' className='text-secondary'>
								First name
							</Label>
							<Input
								id='first_name'
								type='text'
								placeholder='John'
								{...register('first_name')}
							/>
							{errors.first_name && (
								<p className='text-sm text-red-600 pt-1' role='alert'>
									{errors.first_name.message as string}
								</p>
							)}
						</div>

						<div className='space-y-2'>
							<Label htmlFor='last_name' className='text-secondary'>
								Last name
							</Label>
							<Input
								id='last_name'
								type='text'
								placeholder='Doe'
								{...register('last_name')}
							/>
							{errors.last_name && (
								<p className='text-sm text-red-600 pt-1' role='alert'>
									{errors.last_name.message as string}
								</p>
							)}
						</div>

						<div className='space-y-2'>
							<Label htmlFor='password' className='text-secondary'>
								Password
							</Label>
							<Input
								id='password'
								type='password'
								placeholder='********'
								{...register('password')}
							/>
							{errors.password && (
								<p className='text-sm text-red-600 pt-1' role='alert'>
									{errors.password.message as string}
								</p>
							)}
						</div>

						<div className='space-y-2'>
							<Label htmlFor='repeatPassword' className='text-secondary'>
								Repeat Password
							</Label>
							<Input
								id='repeatPassword'
								type='password'
								placeholder='********'
								{...register('repeatPassword')}
							/>
							{errors.repeatPassword && (
								<p className='text-sm text-red-600 pt-1' role='alert'>
									{errors.repeatPassword.message as string}
								</p>
							)}
						</div>

						{error && (
							<p className='text-sm text-red-600 pt-1' role='alert'>
								{error}
							</p>
						)}

						<Button
							type='submit'
							disabled={mutation.isPending}
							className='w-full bg-primary hover:bg-[#2C5A8A] text-white'
						>
							{mutation.isPending ? (
								<span className='inline-flex items-center gap-2'>
									<Loader2 className='w-4 h-4 animate-spin' />
									Creating account…
								</span>
							) : (
								'Create account'
							)}
						</Button>
					</form>
				</CardContent>

				<CardFooter className='flex flex-col gap-2'>
					<div>
						<p>
							<span className='select-none'>Already have an account? </span>
							<Link to={'/login'} className='text-primary hover:underline ml-1'>
								Log in
							</Link>
						</p>
					</div>
				</CardFooter>
			</Card>
		</div>
	)
}

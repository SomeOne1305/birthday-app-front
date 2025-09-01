/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2, Mail, PartyPopper } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
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
import { registerSchema, type RegisterForm } from '@/schemas/auth.schema'
import { AuthService } from '@/services'

export default function RegisterPage() {
	const {
		register,
		formState: { errors },
		getValues,
		handleSubmit,
	} = useForm<RegisterForm>({
		resolver: zodResolver(registerSchema),
	})

	const [success, setSuccess] = useState(false)
	const [error, setError] = useState<string | null>(null)
	// react-query mutation
	const mutation = useMutation({
		mutationFn: async (data: RegisterForm) => {
			return AuthService.register(data)
		},
		onSuccess: () => {
			setSuccess(true)
		},
		onError: (err: any) => {
			setError(err?.response?.data?.message || 'Something went wrong.')
		},
	})

	const onSubmit = (data: RegisterForm) => {
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
						Join the Birthday Club
					</CardTitle>
					<CardDescription>
						Get reminders and celebrate friends with sweet surprises.
					</CardDescription>
				</CardHeader>

				<CardContent>
					{success ? (
						<div className='space-y-3 text-center'>
							<h3 className='text-lg font-semibold text-green-600'>
								Check your email!
							</h3>
							<p className='text-sm text-gray-600'>
								We sent a verification link to{' '}
								<span className='font-medium text-blue-600'>
									{getValues('email')}
								</span>
								. Click it to activate your account.
							</p>
							<div className='flex items-center justify-center gap-2 text-xs text-gray-500'>
								<Mail className='w-4 h-4' />
								Tip: If you don’t see it, check your spam folder.
							</div>
						</div>
					) : (
						<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
							<div className='space-y-2'>
								<Label htmlFor='email' className='text-secondary'>
									Email
								</Label>
								<div className='relative'>
									<Input
										id='email'
										type='email'
										placeholder='you@example.com'
										{...register('email')}
										className='pr-10'
									/>
									<Mail
										aria-hidden
										className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400'
									/>
								</div>
								{errors.email && (
									<p className='text-sm text-red-600 pt-1' role='alert'>
										{errors.email.message}
									</p>
								)}
								{error && (
									<p className='text-sm text-red-600 pt-1' role='alert'>
										{error}
									</p>
								)}
							</div>

							<Button
								type='submit'
								disabled={mutation.isPending}
								className='w-full bg-primary hover:bg-[#2C5A8A] text-white'
							>
								{mutation.isPending ? (
									<span className='inline-flex items-center gap-2'>
										<Loader2 className='w-4 h-4 animate-spin' />
										Sending magic link…
									</span>
								) : (
									'Create account'
								)}
							</Button>

							<p className='text-xs text-center text-gray-500'>
								By continuing you agree to receive birthday reminders.
							</p>
						</form>
					)}
				</CardContent>

				<CardFooter className='flex flex-col gap-2'>
					{success ? (
						<>
							<p className='w-full rounded-md px-2 py-2 text-center bg-green-300 text-green-600'>
								Check your inbox
							</p>
							<Button
								variant='ghost'
								className='w-full'
								onClick={() => setSuccess(false)}
							>
								Use a different email
							</Button>
						</>
					) : (
						<div>
							<p>
								<span className='select-none'>Already have an account? </span>
								<Link
									to={'/login'}
									className='text-primary hover:underline ml-1'
								>
									Log in
								</Link>
							</p>
						</div>
					)}
				</CardFooter>
			</Card>
		</div>
	)
}

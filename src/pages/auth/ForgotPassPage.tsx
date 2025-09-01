/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2, Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
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
import { registerSchema } from '@/schemas/auth.schema' // 👈 can reuse schema with email-only or create separate schema
import { AuthService } from '@/services'

export default function ForgotPassPage() {
	const navigate = useNavigate()
	const {
		register,
		formState: { errors },
		getValues,
		handleSubmit,
	} = useForm({
		resolver: zodResolver(registerSchema),
	})

	const [success, setSuccess] = useState(false)
	const [error, setError] = useState<string | null>(null)

	// react-query mutation
	const mutation = useMutation({
		mutationFn: async (email: string) => {
			// 👇 update endpoint for password reset
			return AuthService.forgot({ email })
		},
		onSuccess: () => {
			setSuccess(true)
		},
		onError: (err: any) => {
			setError(err?.response?.data?.message || 'Something went wrong.')
		},
	})

	const onSubmit = (data: { email: string }) => {
		setError(null)
		mutation.mutate(data.email)
	}

	return (
		<div className='min-h-dvh w-full flex items-center justify-center p-4 bg-secondary'>
			<Card className='w-full max-w-md shadow-xl border-0 bg-white/90 backdrop-blur'>
				<CardHeader className='space-y-2 text-center'>
					<div className='mx-auto w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center'>
						<Lock className='w-6 h-6 text-primary' />
					</div>
					<CardTitle className='text-2xl text-secondary'>
						Forgot your password?
					</CardTitle>
					<CardDescription>
						Enter your email address and we’ll send you a link to reset your
						password.
					</CardDescription>
				</CardHeader>

				<CardContent>
					{success ? (
						<div className='space-y-3 text-center'>
							<h3 className='text-lg font-semibold text-green-600'>
								Check your email!
							</h3>
							<p className='text-sm text-gray-600'>
								We sent a password reset link to{' '}
								<span className='font-medium'>{getValues('email')}</span>. Click
								it to set a new password.
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
										Sending reset link…
									</span>
								) : (
									'Send reset link'
								)}
							</Button>
						</form>
					)}
				</CardContent>

				<CardFooter className='flex flex-col gap-2'>
					{success ? (
						<Button
							variant='secondary'
							className='w-full bg-secondary hover:bg-[#0d223a] text-white'
							onClick={() => navigate('/login')}
						>
							Back to Login
						</Button>
					) : (
						<div>
							<p>
								<span className='select-none'>Remember your password? </span>
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

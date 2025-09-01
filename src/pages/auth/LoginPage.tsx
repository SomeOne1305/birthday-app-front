/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Loader2, Lock, Mail, PartyPopper } from 'lucide-react'
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

// schema
import { loginSchema, type LoginForm } from '@/schemas/auth.schema'

export default function LoginPage() {
	const navigate = useNavigate()
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<LoginForm>({
		resolver: zodResolver(loginSchema),
	})

	const [error, setError] = useState<string | null>(null)

	const mutation = useMutation({
		mutationFn: async (payload: { email: string; password: string }) => {
			return axios.post('/api/auth/login', payload)
		},
		onSuccess: () => {
			navigate('/dashboard') // ✅ redirect after login
		},
		onError: (err: any) => {
			setError(err?.response?.data?.message || 'Invalid email or password.')
		},
	})

	const onSubmit = (data: LoginForm) => {
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
						Welcome Back 🎉
					</CardTitle>
					<CardDescription>
						Log in to continue celebrating birthdays with us.
					</CardDescription>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
						{/* Email */}
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
						</div>

						{/* Password */}
						<div className='space-y-2'>
							<Label htmlFor='password' className='text-secondary'>
								Password
							</Label>
							<div className='relative'>
								<Input
									id='password'
									type='password'
									placeholder='••••••••'
									{...register('password')}
									className='pr-10'
								/>
								<Lock
									aria-hidden
									className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400'
								/>
							</div>
							{errors.password && (
								<p className='text-sm text-red-600 pt-1' role='alert'>
									{errors.password.message}
								</p>
							)}
						</div>

						{/* Server Error */}
						{error && (
							<p className='text-sm text-red-600 pt-1 text-center' role='alert'>
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
									Logging in…
								</span>
							) : (
								'Log In'
							)}
						</Button>
					</form>
				</CardContent>

				<CardFooter className='flex flex-col gap-2 text-center'>
					<p className='text-sm text-gray-600'>
						Don’t have an account?
						<Link to='/register' className='text-primary hover:underline ml-1'>
							Sign up
						</Link>
					</p>
					<p className='text-xs text-gray-500'>
						Forgot password?{' '}
						<Link
							to='/forgot-password'
							className='text-primary hover:underline'
						>
							Reset here
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	)
}

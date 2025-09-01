/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { KeyRound, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
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
import {
	resetPasswordSchema,
	type ResetPasswordForm,
} from '@/schemas/auth.schema'
import { AuthService } from '@/services'

export default function ResetPassPage() {
	const navigate = useNavigate()
	const { token } = useParams() // 👈 e.g. /reset-password/:token

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<ResetPasswordForm>({
		resolver: zodResolver(resetPasswordSchema),
	})

	const [success, setSuccess] = useState(false)
	const [error, setError] = useState<string | null>(null)

	// react-query mutation
	const mutation = useMutation({
		mutationFn: async (data: { password: string }) => {
			// 👇 update endpoint as needed
			return AuthService.change_pass({
				token: token!,
				password: data.password,
			})
		},
		onSuccess: () => {
			setSuccess(true)
		},
		onError: (err: any) => {
			setError(err?.response?.data?.message || 'Something went wrong.')
		},
	})

	const onSubmit = (data: ResetPasswordForm) => {
		setError(null)
		mutation.mutate({ password: data.password })
	}

	return (
		<div className='min-h-dvh w-full flex items-center justify-center p-4 bg-secondary'>
			<Card className='w-full max-w-md shadow-xl border-0 bg-white/90 backdrop-blur'>
				<CardHeader className='space-y-2 text-center'>
					<div className='mx-auto w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center'>
						<KeyRound className='w-6 h-6 text-primary' />
					</div>
					<CardTitle className='text-2xl text-secondary'>
						Reset Password
					</CardTitle>
					<CardDescription>
						Choose a new password for your account.
					</CardDescription>
				</CardHeader>

				<CardContent>
					{success ? (
						<div className='space-y-3 text-center'>
							<h3 className='text-lg font-semibold text-green-600'>
								Password updated!
							</h3>
							<p className='text-sm text-gray-600'>
								Your password has been successfully reset. You can now log in
								with your new credentials.
							</p>
						</div>
					) : (
						<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
							<div className='space-y-2'>
								<Label htmlFor='password' className='text-secondary'>
									New Password
								</Label>
								<Input
									id='password'
									type='password'
									placeholder='Enter new password'
									{...register('password')}
								/>
								{errors.password && (
									<p className='text-sm text-red-600 pt-1' role='alert'>
										{errors.password.message}
									</p>
								)}
							</div>

							<div className='space-y-2'>
								<Label htmlFor='confirmPassword' className='text-secondary'>
									Confirm Password
								</Label>
								<Input
									id='confirmPassword'
									type='password'
									placeholder='Repeat new password'
									{...register('confirmPassword')}
								/>
								{errors.confirmPassword && (
									<p className='text-sm text-red-600 pt-1' role='alert'>
										{errors.confirmPassword.message}
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
										Updating password…
									</span>
								) : (
									'Reset Password'
								)}
							</Button>
						</form>
					)}
				</CardContent>

				<CardFooter className='flex flex-col gap-2'>
					{success && (
						<Button
							variant='secondary'
							className='w-full bg-secondary hover:bg-[#0d223a] text-white'
							onClick={() => navigate('/login')}
						>
							Go to Login
						</Button>
					)}
				</CardFooter>
			</Card>
		</div>
	)
}

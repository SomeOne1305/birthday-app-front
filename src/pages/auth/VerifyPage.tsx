import { AuthService } from '@/services'
import { useQuery } from '@tanstack/react-query'
import _ from 'lodash'
import { CheckCircle2, Loader2, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

export default function VerifyPage() {
	const { token } = useParams<{ token: string }>()
	const navigate = useNavigate()
	const [countdown, setCountdown] = useState(3)
	const { status, error, isSuccess, data } = useQuery({
		queryKey: ['verify', token],
		queryFn: () => AuthService.verify(token!),
		retry: false,
		enabled: !!token,
	})
	console.log(data)

	useEffect(() => {
		if (isSuccess) {
			const timer = setInterval(() => {
				setCountdown(c => {
					if (c <= 1) {
						const newToken = _.get(data, 'data.data.token')
						clearInterval(timer)
						navigate(`/create/${newToken}`)
					}
					return c - 1
				})
			}, 1000)
			return () => clearInterval(timer)
		}
	}, [isSuccess, navigate, data])
	return (
		<div className='flex items-center justify-center h-screen'>
			<div className='w-full max-w-md p-8 text-center'>
				{status === 'pending' && (
					<div>
						<Loader2 className='w-12 h-12 mx-auto mb-4 text-blue-500 animate-spin' />
						<h2 className='text-xl font-semibold text-gray-700'>
							Verifying your account…
						</h2>
						<p className='text-gray-500 mt-2'>This will only take a moment.</p>
					</div>
				)}

				{status === 'success' && (
					<div>
						<CheckCircle2 className='w-14 h-14 mx-auto mb-4 text-green-500' />
						<h2 className='text-xl font-semibold text-gray-700'>
							Your account is verified!
						</h2>
						<p className='text-gray-500 mt-2'>
							Redirecting to login in{' '}
							<span className='font-bold'>{countdown}</span> seconds…
						</p>
					</div>
				)}

				{status === 'error' && (
					<div>
						<XCircle className='w-14 h-14 mx-auto mb-4 text-red-500' />
						<h2 className='text-xl font-semibold text-gray-700'>
							Verification failed
						</h2>
						<p className='text-gray-500 mt-2'>
							{error instanceof Error
								? error.message
								: 'Invalid or expired link.'}
						</p>
						<button
							onClick={() => window.location.reload()}
							className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition'
						>
							Try Again
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

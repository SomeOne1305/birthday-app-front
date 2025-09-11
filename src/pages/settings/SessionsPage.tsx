import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { UserService } from '@/services/user.service'
import type { IResponse } from '@/types/api.type'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import {
	CheckCircle,
	CheckCircle2,
	CircleX,
	Loader2,
	XCircle,
	XIcon,
} from 'lucide-react'
import { toast } from 'sonner'

const SessionsPage = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['SESSIONS'],
		queryFn: async () => await UserService.get_sessions(),
	})
	const { mutate, isPending } = useMutation({
		mutationKey: ['DELETE_SESSION'],
		mutationFn: async (id: string) => await UserService.delete_session(id),
		onSuccess: () => toast('Session is deleted !', { icon: <CheckCircle /> }),
		onError: (err: AxiosError<IResponse>) => {
			const message = err?.response?.data?.data?.message
			if (message) {
				toast(message, { icon: <CircleX className='text-red-500' /> })
			}
		},
	})
	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-[50vh]'>
				<Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
			</div>
		)
	}
	if (isError) {
		return (
			<div className='flex items-center justify-center h-[50vh]'>
				<XIcon className='h-6 w-6 text-red-500' />
			</div>
		)
	}

	const sessions = data?.data?.data?.sessions ?? []
	const currentSessionId = data?.data?.data?.currentSession
	async function deleteAll(
		sessions: { _id: string }[],
		mutate: (id: string) => Promise<void>
	) {
		if (!sessions || sessions.length === 0) {
			toast('No sessions found', {
				description: 'There are no active sessions to delete.',
				icon: <XCircle className='text-red-500' />,
			})
			return
		}

		try {
			await Promise.allSettled(sessions.map(session => mutate(session._id)))

			toast('Sessions deleted', {
				description: 'All sessions have been deleted successfully.',
				icon: <CheckCircle2 className='text-green-500' />,
				onAutoClose: () => window.location.reload(),
			})
		} catch (error) {
			toast('Error', {
				description: 'Something went wrong while deleting sessions.',
				icon: <XCircle className='text-red-500' />,
			})
			console.log(error)
		}
	}
	return (
		<Card>
			<CardHeader>
				<CardTitle>Active Sessions</CardTitle>
				<CardDescription>
					Manage your active sessions across different devices.
				</CardDescription>
			</CardHeader>
			<CardContent className='space-y-4'>
				<div className='space-y-4'>
					{sessions.map(session => {
						const isCurrent = session._id === currentSessionId
						return (
							<div
								key={session._id}
								className='flex items-center justify-between p-4 border rounded-lg'
							>
								<div>
									<p className='font-medium'>{session.device_name}</p>
									<p className='text-sm text-muted-foreground'>
										{session.ip_location !== 'undefined, undefined'
											? session.ip_location
											: session.ip_add}{' '}
										• Last updated{' '}
										{new Date(session.updatedAt).toLocaleString()}
									</p>
								</div>
								{isCurrent ? (
									<Button variant='outline' size='sm' disabled>
										Current
									</Button>
								) : (
									<Button
										variant='outline'
										size='sm'
										className='bg-red-500 text-white'
										onClick={() => mutate(session._id)}
									>
										{isPending ? (
											<span className='inline-flex items-center gap-2'>
												<Loader2 className='w-4 h-4 animate-spin' />
												Revoking…
											</span>
										) : (
											'Revoke'
										)}
									</Button>
								)}
							</div>
						)
					})}
				</div>

				<Separator className='my-4' />

				<Button variant='destructive' onClick={() => deleteAll}>
					{isPending ? (
						<span className='inline-flex items-center gap-2'>
							<Loader2 className='w-4 h-4 animate-spin' />
							Revoking…
						</span>
					) : (
						'Revoke'
					)}
				</Button>
			</CardContent>
		</Card>
	)
}

export default SessionsPage

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { UserService } from '@/services/user.service'
import type { IResponse } from '@/types/api.type'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { CheckCircle2, Loader2, Trash2, XCircle } from 'lucide-react'
import { toast } from 'sonner'

const AccountPage = () => {
	const { isPending, mutate } = useMutation({
		mutationKey: ['DELETE_USER'],
		mutationFn: UserService.delete_me,
		onSuccess: () =>
			toast('Deleted successfully!', {
				icon: <CheckCircle2 className='text-green-500' />,
				onAutoClose: () => window.location.assign('/'),
			}),
		onError: (err: AxiosError<IResponse>) => {
			const message = err.response?.data?.data?.message
			if (message)
				return toast(message, {
					icon: <XCircle className='text-red-500' />,
				})
		},
	})

	return (
		<Card className='border-destructive'>
			<CardHeader>
				<CardTitle className='text-destructive flex items-center gap-2'>
					<Trash2 className='h-4 w-4' />
					Delete Account
				</CardTitle>
				<CardDescription>
					Permanently delete your account and all associated data. This action
					cannot be undone.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button variant='destructive'>
							{isPending ? (
								<span className='inline-flex items-center gap-2'>
									<Loader2 className='w-4 h-4 animate-spin' />
									Deleting…
								</span>
							) : (
								'Delete Account'
							)}
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								Are you sure you want to delete your account?
							</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. All your data will be permanently
								removed.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction
								className='bg-destructive text-white hover:bg-destructive/90'
								onClick={() => mutate()}
							>
								Yes, Delete
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</CardContent>
		</Card>
	)
}

export default AccountPage

import Navbar from '@/components/navbar'
import ProgressBar from '@/components/progress-bar'
import { Toaster } from '@/components/ui/sonner'
import { UserService } from '@/services/user.service'
import { useAuthStore } from '@/stores/auth.store'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { Outlet } from 'react-router'

const MainLayout = () => {
	const { setUser, setAuthenticated, isAuthenticated } = useAuthStore()

	const { data, isLoading } = useQuery({
		queryKey: ['user'],
		queryFn: UserService.get_me,
		retry: false,
		enabled: isAuthenticated,
	})

	useEffect(() => {
		if (data?.data?.data) {
			setUser(data.data.data)
			setAuthenticated(true)
		} else {
			setAuthenticated(false)
		}
	}, [data, setAuthenticated, setUser])

	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-screen'>
				<Loader2 className='h-10 w-10 animate-spin text-primary' />
				<span>Loading...</span>
			</div>
		)
	}
	return (
		<div className='w-full min-h-screen h-screen'>
			<Toaster richColors={true} closeButton={true} />
			<ProgressBar />
			<Navbar />
			<Outlet />
		</div>
	)
}

export default MainLayout

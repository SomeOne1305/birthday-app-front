import { useAuthStore } from '@/stores/auth.store'
import { Navigate, Outlet } from 'react-router'

const GuestOnly = () => {
	const { isAuthenticated } = useAuthStore()
	return isAuthenticated ? <Navigate to={'/'} replace={true} /> : <Outlet />
}

export default GuestOnly

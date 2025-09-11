import { useAuthStore } from '@/stores/auth.store'
import { Monitor, Settings, Shield, User } from 'lucide-react'
import { useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router'

const SettingsLayout = () => {
	const tabs = [
		{
			icon: <User className='h-4 w-4' />,
			label: 'Personal',
			path: '/settings/personal',
		},
		{
			icon: <Shield className='h-4 w-4' />,
			label: 'Security',
			path: '/settings/security',
		},
		{
			icon: <Monitor className='h-4 w-4' />,
			label: 'Sessions',
			path: '/settings/sessions',
		},
		{
			icon: <Settings className='h-4 w-4' />,
			label: 'Account',
			path: '/settings/account',
		},
	]
	const navigate = useNavigate()
	const { isAuthenticated } = useAuthStore()

	useEffect(() => {
		if (!isAuthenticated) navigate('/', { replace: true })
	}, [isAuthenticated, navigate])
	return (
		<div className='w-full min-h-screen'>
			<div className='container pb-8 pt-20'>
				{/* Page Header */}
				<div className='mb-8'>
					<h2 className='text-2xl font-bold mb-1'>Settings</h2>
					<p className='text-muted-foreground'>
						Manage your account settings and preferences.
					</p>
				</div>

				{/* Tabs */}
				<div className='flex gap-2 border-b mb-8'>
					{tabs.map(tab => (
						<NavLink
							key={tab.path}
							to={tab.path}
							className={({ isActive }) =>
								`
                flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-md transition-colors
                ${
									isActive
										? 'bg-primary text-white shadow-sm'
										: 'text-muted-foreground hover:bg-muted hover:text-foreground'
								}
              `
							}
						>
							{tab.icon}
							<span className='md:block hidden'>{tab.label}</span>
						</NavLink>
					))}
				</div>

				{/* Content */}
				<div className='w-full'>
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default SettingsLayout

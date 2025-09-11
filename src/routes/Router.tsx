import {
	createBrowserRouter,
	createRoutesFromElements,
	Navigate,
	Route,
} from 'react-router'
import App from '../App'
// loaders

// pages
import {
	AccountPage,
	PersonalPage,
	SecurityPage,
	SessionsPage,
} from '@/pages/settings'
import {
	CreatePage,
	ForgotPassPage,
	LoginPage,
	RegisterPage,
	ResetPassPage,
	VerifyPage,
} from '../pages/auth'
// Layouts
import SettingsLayout from '@/layouts/SettingsLayout'
import AuthLayout from '../layouts/AuthLayout'
import MainLayout from '../layouts/MainLayout'

export const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route element={<MainLayout />}>
				<Route index path='/' element={<App />} />
				<Route path='settings' element={<SettingsLayout />}>
					<Route path='' element={<Navigate to={'personal'} replace />} />
					<Route path='personal' element={<PersonalPage />} />
					<Route path='security' element={<SecurityPage />} />
					<Route path='sessions' element={<SessionsPage />} />
					<Route path='account' element={<AccountPage />} />
				</Route>
				<Route element={<AuthLayout />}>
					<Route path='login' element={<LoginPage />} />
					<Route path='register' element={<RegisterPage />} />
					<Route path='forgot-password' element={<ForgotPassPage />} />
					<Route path='create/:token' element={<CreatePage />} />
					<Route path='verify/:token' element={<VerifyPage />} />
					<Route path='reset/:token' element={<ResetPassPage />} />
				</Route>
			</Route>
		</>
	)
)

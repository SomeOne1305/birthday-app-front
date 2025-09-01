import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from 'react-router'
import App from './App'
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'
import {
	CreatePage,
	ForgotPassPage,
	LoginPage,
	RegisterPage,
	ResetPassPage,
	VerifyPage,
} from './pages/auth'

export const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route element={<MainLayout />}>
				<Route index path='/' element={<App />} />
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

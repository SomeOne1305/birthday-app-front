import { GuestOnly } from '@/routes/guards'

const AuthLayout = () => {
	return (
		<div className='w-full min-h-screen'>
			<GuestOnly />
		</div>
	)
}

export default AuthLayout

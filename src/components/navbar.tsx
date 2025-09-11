import { useAuthStore } from '@/stores/auth.store'
import { CalendarCheck2, LogIn, UserPlus } from 'lucide-react'
import { ProfileMenu } from './profile-menu'
import { Button } from './ui/button'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from './ui/navigation-menu'
const Navbar = () => {
	const { isAuthenticated } = useAuthStore()

	return (
		<div className='w-full fixed top-0 left-0 z-30 bg-white/80 backdrop-blur-sm shadow-md'>
			<div className='container px-6 py-3 flex justify-between items-center'>
				<a href='/' className='flex items-center gap-3'>
					<CalendarCheck2 className='text-[#3F72AF]' size={28} />
					<span className='text-3xl font-veronica-scripts text-[#3F72AF]'>
						Birthmark
					</span>
				</a>
				{isAuthenticated ? (
					<ProfileMenu />
				) : (
					<NavigationMenu>
						<NavigationMenuList className='flex gap-5'>
							<NavigationMenuItem>
								<NavigationMenuLink
									href='/login'
									className='inline-flex items-center flex-row gap-1 text-[#112D4E] hover:text-[#3F72AF] transition font-semibold'
								>
									<LogIn size={18} />
									<span>Login</span>
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<Button
									variant='default'
									className='flex items-center gap-2 bg-[#3F72AF] text-white hover:bg-[#112D4E]'
									asChild
								>
									<a href='/register'>
										<UserPlus size={18} /> Sign Up
									</a>
								</Button>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				)}
			</div>
		</div>
	)
}

export default Navbar

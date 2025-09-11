import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthStore } from '@/stores/auth.store'
import { Cake, Gift, LogOut, Settings, User } from 'lucide-react'
import { useNavigate } from 'react-router'

export function ProfileMenu() {
	const { user } = useAuthStore()
	const navigate = useNavigate()
	const initials = `${user?.first_name?.[0] ?? ''}${
		user?.last_name?.[0] ?? ''
	}`.toUpperCase()
	const handleSettings = () => navigate('/settings/')

	const handleLogout = () => {
		console.log('Logout user')
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					className='relative h-11 w-11 rounded-full border border-[#3F72AF] 
                 hover:bg-[#3F72AF]/20 transition shadow-sm cursor-pointer'
				>
					<Avatar className='h-11 w-11'>
						<AvatarFallback
							className='bg-gradient-to-br from-[#3F72AF] to-[#112D4E] 
                     text-white font-semibold flex items-center justify-center'
						>
							{initials}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				className='w-64 rounded-xl shadow-lg border border-[#3F72AF]/20'
				align='end'
				forceMount
			>
				{/* Header */}
				<DropdownMenuLabel className='font-normal px-4 py-3'>
					<div className='flex items-center space-x-3'>
						<Avatar className='h-9 w-9 border border-[#3F72AF]/20'>
							<AvatarFallback className='bg-[#3F72AF]/10 text-[#3F72AF]'>
								<User className='h-4 w-4' />
							</AvatarFallback>
						</Avatar>
						<div className='flex flex-col'>
							<p className='text-sm font-semibold leading-none text-[#112D4E]'>
								{`${user?.first_name} ${user?.last_name}`}
							</p>
							<p className='text-xs text-muted-foreground'>{user?.email}</p>
						</div>
					</div>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />

				{/* Fun Birthday Feature */}
				<DropdownMenuItem className='cursor-pointer hover:bg-[#3F72AF]/10 transition'>
					<Cake className='mr-2 h-4 w-4 text-[#3F72AF]' />
					<span>Upcoming Birthdays</span>
				</DropdownMenuItem>
				<DropdownMenuItem className='cursor-pointer hover:bg-[#3F72AF]/10 transition'>
					<Gift className='mr-2 h-4 w-4 text-[#3F72AF]' />
					<span>Send a Gift</span>
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					onClick={handleSettings}
					className='cursor-pointer hover:bg-[#3F72AF]/10 transition'
				>
					<Settings className='mr-2 h-4 w-4 text-[#3F72AF]' />
					<span>Settings</span>
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					onClick={handleLogout}
					className='cursor-pointer text-destructive focus:text-destructive'
				>
					<LogOut className='mr-2 h-4 w-4' />
					<span>Logout</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

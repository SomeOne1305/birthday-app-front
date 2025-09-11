import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { motion } from 'framer-motion'
import {
	Copy as CopyIcon,
	Gift,
	MoreVertical,
	PartyPopper,
	Share2,
	Trash2,
} from 'lucide-react'
import { useMemo } from 'react'

// ————————————————————————————————————————————————————————————————————————
// Types
// ————————————————————————————————————————————————————————————————————————
export type BirthdayCardProps = {
	name: string
	birth_date: string // ISO string or any Date-parsable string
	relation: string
	notes?: string
	className?: string
	onSendWishes?: (payload: { name: string; nextBirthday: Date }) => void
	onEdit?: () => void
	onDelete?: () => void
	onReminderToggle?: (nextBirthday: Date, enabled: boolean) => void
}

// ————————————————————————————————————————————————————————————————————————
// Utilities
// ————————————————————————————————————————————————————————————————————————
const toDate = (input: string) => new Date(input)

const formatFullDate = (d: Date) =>
	d.toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

const getAgeNow = (birth: Date, today = new Date()) => {
	let age = today.getFullYear() - birth.getFullYear()
	const beforeBirthday =
		today.getMonth() < birth.getMonth() ||
		(today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
	if (beforeBirthday) age -= 1
	return age
}

const getNextBirthday = (birth: Date, today = new Date()) => {
	const year = today.getFullYear()
	const candidate = new Date(year, birth.getMonth(), birth.getDate())
	if (
		candidate < new Date(today.getFullYear(), today.getMonth(), today.getDate())
	) {
		return new Date(year + 1, birth.getMonth(), birth.getDate())
	}
	return candidate
}

const daysBetween = (a: Date, b: Date) => {
	const ms =
		Date.UTC(b.getFullYear(), b.getMonth(), b.getDate()) -
		Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
	return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)))
}

const isLeap = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0
const daysInYear = (y: number) => (isLeap(y) ? 366 : 365)

const getZodiac = (d: Date) => {
	const m = d.getMonth() + 1
	const day = d.getDate()
	// Western zodiac
	const signs = [
		{
			name: 'Capricorn',
			emoji: '♑',
			from: [12, 22] as const,
			to: [1, 19] as const,
		},
		{
			name: 'Aquarius',
			emoji: '♒',
			from: [1, 20] as const,
			to: [2, 18] as const,
		},
		{
			name: 'Pisces',
			emoji: '♓',
			from: [2, 19] as const,
			to: [3, 20] as const,
		},
		{
			name: 'Aries',
			emoji: '♈',
			from: [3, 21] as const,
			to: [4, 19] as const,
		},
		{
			name: 'Taurus',
			emoji: '♉',
			from: [4, 20] as const,
			to: [5, 20] as const,
		},
		{
			name: 'Gemini',
			emoji: '♊',
			from: [5, 21] as const,
			to: [6, 20] as const,
		},
		{
			name: 'Cancer',
			emoji: '♋',
			from: [6, 21] as const,
			to: [7, 22] as const,
		},
		{ name: 'Leo', emoji: '♌', from: [7, 23] as const, to: [8, 22] as const },
		{
			name: 'Virgo',
			emoji: '♍',
			from: [8, 23] as const,
			to: [9, 22] as const,
		},
		{
			name: 'Libra',
			emoji: '♎',
			from: [9, 23] as const,
			to: [10, 22] as const,
		},
		{
			name: 'Scorpio',
			emoji: '♏',
			from: [10, 23] as const,
			to: [11, 21] as const,
		},
		{
			name: 'Sagittarius',
			emoji: '♐',
			from: [11, 22] as const,
			to: [12, 21] as const,
		},
	]

	const within = (
		from: readonly [number, number],
		to: readonly [number, number]
	) => {
		if (from[0] === 12 && to[0] === 1) {
			return (m === from[0] && day >= from[1]) || (m === to[0] && day <= to[1])
		}
		if (m === from[0] && day >= from[1]) return true
		if (m === to[0] && day <= to[1]) return true
		return m > from[0] && m < to[0]
	}

	return signs.find(s => within(s.from, s.to)) || signs[0]
}

const initialsOf = (full: string) =>
	full
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map(w => w[0]?.toUpperCase())
		.join('') || '?'

const weekday = (d: Date) =>
	d.toLocaleDateString(undefined, { weekday: 'long' })

// ————————————————————————————————————————————————————————————————————————
// Component
// ————————————————————————————————————————————————————————————————————————
export default function BirthdayCard({
	name,
	birth_date,
	relation,
	notes,
	className,
	onSendWishes,
	onDelete,
}: BirthdayCardProps) {
	const birth = useMemo(() => toDate(birth_date), [birth_date])
	const today = useMemo(() => new Date(), [])
	const next = useMemo(() => getNextBirthday(birth, today), [birth, today])
	const daysLeft = useMemo(() => daysBetween(today, next), [today, next])
	const isToday = daysLeft === 0
	const ageNow = useMemo(() => getAgeNow(birth, today), [birth, today])
	const turning = isToday ? ageNow : ageNow + 1
	const zodiac = useMemo(() => getZodiac(birth), [birth])
	const week = weekday(next)
	const birthWeek = weekday(birth)
	const progress = useMemo(() => {
		const y = next.getFullYear()
		const dYear = daysInYear(y)
		const pct = Math.round(((dYear - daysLeft) / dYear) * 100)
		return isFinite(pct) ? Math.min(100, Math.max(0, pct)) : 0
	}, [daysLeft, next])

	const handleCopy = async () => {
		try {
			const text = `${name} — ${relation}\nBorn: ${formatFullDate(
				birth
			)}\nNext birthday: ${formatFullDate(
				next
			)} (${week})\nTurning ${turning} — ${daysLeft} day${
				daysLeft === 1 ? '' : 's'
			} left\nZodiac: ${zodiac.emoji} ${zodiac.name}${
				notes ? `\nNotes: ${notes}` : ''
			}`
			await navigator.clipboard.writeText(text)
		} catch (err) {
			console.log(err)
		}
	}

	const handleShare = async () => {
		const text = `🎂 ${name} turns ${turning} on ${formatFullDate(
			next
		)} (${week}). ${
			daysLeft === 0 ? 'It’s today!' : `${daysLeft} days left.`
		} ${notes ? `\n\n“${notes}”` : ''}`
		// Best effort share
		if (navigator?.share) {
			try {
				await navigator.share({ title: `Birthday: ${name}`, text })
				return
			} catch (err) {
				console.log(err)
			}
		}
		try {
			await navigator.clipboard.writeText(text)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<TooltipProvider>
			<motion.div
				initial={{ opacity: 0, y: 8 }}
				animate={{ opacity: 1, y: 0 }}
				whileHover={{ y: -2 }}
				transition={{ type: 'spring', stiffness: 260, damping: 20 }}
			>
				<Card
					className={
						'border border-[#DBE2EF] shadow-sm hover:shadow-md transition-shadow rounded-2xl bg-white ' +
						(className ?? '')
					}
					role='article'
					aria-label={`Birthday card for ${name}`}
				>
					<CardHeader className='flex flex-row items-center gap-3 pb-2'>
						<Avatar className='h-12 w-12 border border-[#DBE2EF]'>
							<AvatarFallback className='text-[#112D4E] bg-[#DBE2EF]'>
								{initialsOf(name)}
							</AvatarFallback>
						</Avatar>

						<div className='flex-1 min-w-0'>
							<CardTitle className='truncate text-2xl font-semibold tracking-tight text-[#112D4E]'>
								{name}
							</CardTitle>
							<div className='flex items-center gap-2 mt-1'>
								<Badge
									variant='secondary'
									className='bg-[#DBE2EF] text-[#112D4E] border border-[#C7D3E9]'
								>
									{relation}
								</Badge>
								{isToday && (
									<Badge className='bg-[#3F72AF] text-white flex items-center gap-1'>
										<PartyPopper className='h-3.5 w-3.5' /> Today!
									</Badge>
								)}
							</div>
						</div>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant='ghost' size='icon' aria-label='More options'>
									<MoreVertical className='h-5 w-5' />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end' className='w-44'>
								<DropdownMenuItem onClick={handleCopy} className='gap-2'>
									<CopyIcon className='h-4 w-4' /> Copy details
								</DropdownMenuItem>
								<DropdownMenuItem onClick={handleShare} className='gap-2'>
									<Share2 className='h-4 w-4' /> Share
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={onDelete}
									className='gap-2 text-red-600'
								>
									<Trash2 className='h-4 w-4' /> Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</CardHeader>

					<CardContent className='pt-0'>
						{/* Top row: date + ring */}
						<div className='flex items-center justify-between gap-4'>
							<div className='min-w-0'>
								<p className='text-sm text-[#3F72AF]'>Born</p>
								<p className='text-base font-medium text-[#112D4E]'>
									{formatFullDate(birth)} ({birthWeek})
								</p>
								<p className='text-sm text-muted-foreground'>
									Next: {formatFullDate(next)} ({week})
								</p>
							</div>

							{/* Countdown ring */}
							<Tooltip>
								<TooltipTrigger asChild>
									<div
										className='relative grid place-items-center shrink-0'
										aria-label={`${daysLeft} days left`}
									>
										<div
											className='h-16 w-16 rounded-full p-[3px]'
											style={{
												background: `conic-gradient(#3F72AF ${progress}%, #DBE2EF ${progress}% 100%)`,
											}}
										>
											<div className='h-full w-full rounded-full bg-white grid place-items-center border border-[#DBE2EF]'>
												<div className='text-center'>
													<div className='text-sm font-bold leading-4 text-[#112D4E]'>
														{daysLeft}
													</div>
													<div className='text-[10px] uppercase tracking-wide text-[#3F72AF]'>
														days
													</div>
												</div>
											</div>
										</div>
										<span className='absolute -bottom-1 text-[10px] px-2 py-0.5 rounded-full bg-[#DBE2EF] text-[#112D4E] border border-[#C7D3E9]'>
											{isToday ? 'Today' : 'Left'}
										</span>
									</div>
								</TooltipTrigger>
								<TooltipContent>
									{isToday
										? 'Party time 🎉'
										: `${daysLeft} day(s) until next birthday`}
								</TooltipContent>
							</Tooltip>
						</div>

						<Separator className='my-4' />

						{/* Indexes grid */}
						<div className='grid grid-cols-2 gap-3'>
							<div className='rounded-xl border border-[#DBE2EF] p-3'>
								<div className='text-xs text-[#3F72AF]'>Age now</div>
								<div className='text-lg font-semibold text-[#112D4E]'>
									{ageNow}
								</div>
							</div>
							<div className='rounded-xl border border-[#DBE2EF] p-3'>
								<div className='text-xs text-[#3F72AF]'>Turning</div>
								<div className='text-lg font-semibold text-[#112D4E]'>
									{turning}
								</div>
							</div>
							<div className='rounded-xl border border-[#DBE2EF] p-3'>
								<div className='text-xs text-[#3F72AF]'>Zodiac</div>
								<div className='text-lg font-semibold text-[#112D4E] flex items-center gap-1'>
									<span aria-hidden>{zodiac.emoji}</span> {zodiac.name}
								</div>
							</div>
							<div className='rounded-xl border border-[#DBE2EF] p-3'>
								<div className='text-xs text-[#3F72AF]'>Weekday</div>
								<div className='text-lg font-semibold text-[#112D4E]'>
									{week}
								</div>
							</div>
						</div>

						{notes && (
							<div className='mt-4 rounded-xl bg-[#F6F8FD] border border-[#DBE2EF] p-3 text-sm text-[#112D4E]'>
								<span className='text-[#3F72AF] mr-2'>“</span>
								<span className='italic line-clamp-2'>{notes}</span>
							</div>
						)}
					</CardContent>

					<CardFooter className='flex items-center gap-2 pt-0'>
						<Button
							className='bg-[#3F72AF] text-white hover:bg-[#112D4E] w-full'
							onClick={() => onSendWishes?.({ name, nextBirthday: next })}
						>
							<Gift className='h-4 w-4 mr-2' /> Send Wishes
						</Button>
					</CardFooter>
				</Card>
			</motion.div>
		</TooltipProvider>
	)
}

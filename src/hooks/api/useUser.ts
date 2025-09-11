import { UserService } from '@/services/user.service'
import { useQuery } from '@tanstack/react-query'

export function useUser() {
	return useQuery({
		queryKey: ['user'],
		queryFn: () => UserService.get_me,
	})
}

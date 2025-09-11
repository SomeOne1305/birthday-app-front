import { queryClient } from '@/lib/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'

const QueryProvider = (props: PropsWithChildren) => {
	return (
		<QueryClientProvider client={queryClient}>
			{props.children}
		</QueryClientProvider>
	)
}

export default QueryProvider

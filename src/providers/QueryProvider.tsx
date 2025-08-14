import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'

export const queryClient = new QueryClient({
    defaultOptions:{
      queries:{
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false
      }  
    }
})

const QueryProvider = (props:PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
        {props.children}
    </QueryClientProvider>
  )
}

export default QueryProvider
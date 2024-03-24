"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const Providers = ({children}:{ children: ReactNode}) => {
    const queryClient = new QueryClient()

    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </SessionProvider>
    )
}

export default Providers
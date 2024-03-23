"use client"

import { SessionProvider, SessionProviderProps } from "next-auth/react"
import { ReactNode } from "react"

const Providers = ({children}:{ children: ReactNode}) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default Providers
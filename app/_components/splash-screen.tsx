"use client"

import React, { useState, useEffect } from "react"
import { InfinitySpin } from 'react-loader-spinner'

function SplashScreen({ finishLoading }:{finishLoading: any}) {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsMounted(true);
            finishLoading();
        }, 10);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="flex min-h-screen items-center justify-center">
            {isMounted && 
            <InfinitySpin
            width="200"
            color="#1d4ed8"
            />}
        </div>
    )
}

export default SplashScreen

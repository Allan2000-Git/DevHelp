import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

function RoomsSkeletonLoader() {
    return (
        <>
            {
                [1,2,3,4].map((_,i)=>(
                    <Skeleton className="w-[300px] h-[350px] rounded-xl" />
                ))
            }
        </>
    )
}

export default RoomsSkeletonLoader


import React from 'react'
import RoomCard from '../_components/room-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import SearchRoom from '../_components/search-room';
import { getAllRooms } from '@/actions/room';
import RoomsSkeletonLoader from '../_components/rooms-skeleton-loader';
import { Skeleton } from '@/components/ui/skeleton';

async function AllRooms({
    searchParams,
}: {
    searchParams: {
        query: string;
    };
}) {
    const data = await getAllRooms(searchParams.query);

    return (
        <div className="max-w-screen-xl mx-auto py-5">
            <div className="flex items-center justify-between mt-5 mb-10">
                <SearchRoom />
                <Link href="/create-room">
                    <Button>Create Room</Button>
                </Link>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5">
            {
                data.length > 0 ? (
                    data.map((room) => (
                        <RoomCard key={room.id} room={room} />
                    ))
                ) : (
                    <RoomsSkeletonLoader />
                )}
            </div>
        </div>
    )
}

export default AllRooms

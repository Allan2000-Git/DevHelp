
import React from 'react'
import RoomCard from '../_components/room-card';
import { getAllRooms } from '@/data/rooms';

async function AllRooms() {
    const data = await getAllRooms();

    return (
        <div className="max-w-screen-xl mx-auto py-5">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5">
                {
                    data?.map((room) => (
                        <RoomCard key={room.id} room={room} />
                    ))
                }
            </div>
        </div>
    )
}

export default AllRooms

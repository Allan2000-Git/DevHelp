
import React from 'react'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import SearchRoom from '../_components/search-room';
import Image from 'next/image';
import MyRoomCard from '../_components/my-room-card';
import { getMyRooms } from '@/actions/room';

async function MyRooms() {
    const data = await getMyRooms();

    return (
        <div className="max-w-screen-xl mx-auto py-5">
            {
                data.length > 0 ? (
                    <>
                        <div className="flex items-center justify-between mt-5 mb-10">
                            <SearchRoom />
                            <Link href="/create-room">
                                <Button>Create Room</Button>
                            </Link>
                        </div>
                        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5">
                            {
                                data?.map((room) => (
                                    <MyRoomCard key={room.id} room={room} />
                                ))
                            }
                        </div>
                    </>
                ):(
                    <div className="w-full h-full flex flex-col items-center justify-center gap-7 mt-20">
                        <Image src="/empty.svg" width={280} height={400} alt="No Data" />
                        <h1 className="text-xl font-semibold">You don't have any rooms. Create one.</h1>
                        <Link href="/create-room">
                            <Button>Create Room</Button>
                        </Link>
                    </div>
                )
            }
        </div>
    )
}

export default MyRooms

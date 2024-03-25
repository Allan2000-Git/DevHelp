import VideoClient from '@/app/_components/stream-video-client';
import { getRoom } from '@/data/rooms';
import React from 'react'

async function Room(props: {params: {roomId: string}}) {
    const roomId = props.params.roomId;
    const room = await getRoom(roomId);

    return (
        <div className="max-w-screen-xl mx-auto p-4 min-h-screen">
            <div className="grid grid-cols-5 gap-4">
                <div className="col-span-3 flex flex-col justify-between rounded-lg border bg-card text-card-foreground shadow-md p-3">
                    {room && <VideoClient room={room} />}
                </div>
                <div className="col-span-2 flex flex-col justify-between rounded-lg border bg-card text-card-foreground shadow-md p-3">
                    CHAT
                </div>
            </div>
        </div>
    )
}

export default Room

import { getRoom } from '@/data/rooms';
import React from 'react'

async function Room(props: {params: {roomId: string}}) {
    const roomId = props.params.roomId;
    const room = await getRoom(roomId);

    return (
        <div className="max-w-screen-xl mx-auto p-4 min-h-screen">
            <div className="grid grid-cols-5">
                <div className="col-span-3 bg-red-500">
                    VIDEO
                </div>
                <div className="col-span-2 bg-blue-500">
                    CHAT
                </div>
            </div>
        </div>
    )
}

export default Room

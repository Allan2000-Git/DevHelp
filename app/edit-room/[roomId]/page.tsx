import React from 'react'
import EditRoomForm from './_components/edit-room-form'
import { getRoom } from '@/actions/room';

async function EditRoom(props: {params: {roomId: string}}) {
    const roomId = props.params.roomId;
    const room = await getRoom(roomId);

    if(!room) return <h1>No room found.</h1>

    return (
        <div className="max-w-screen-xl mx-auto p-4">
            <h1 className="text-3xl font-bold"> Update your Room </h1>
            <EditRoomForm room={room} />
        </div>
    )
}

export default EditRoom

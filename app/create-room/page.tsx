import React from 'react'
import CreateRoomForm from './_components/create-room-form'

function CreateRoom() {
    return (
        <div className="max-w-screen-xl mx-auto p-4">
            <h1 className="text-3xl font-bold"> Let's Hear It!</h1>
            <CreateRoomForm />
        </div>
    )
}

export default CreateRoom

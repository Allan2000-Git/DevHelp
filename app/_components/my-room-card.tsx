'use client'

import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Room } from '@/types/types'
import { FaGithub } from "react-icons/fa";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import GetTags from './get-tags';
import { PencilIcon, TrashIcon } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteRoom } from '@/actions/room';
import { toast } from 'sonner';

function MyRoomCard({room}:{room: Room}) {
    const handleDeleteRoom = async (roomId: string) => {
        await deleteRoom(roomId);
        toast.success("Room deleted successfully.");
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{room.roomName}</CardTitle>
                <CardDescription>{room.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 w-full">
                <GetTags tags={room.tags} />
                <div className="flex items-center w-full gap-2">
                    <FaGithub size={20} />
                    {
                        room.repoLink ? <Link href={room.repoLink} className="text-gray-500 text-[13px]">{room.repoLink}</Link> : "Repository link not provided."
                    }
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Link href={`/room/${room.id}`}>
                    <Button>Join Room</Button>
                </Link>
                <div className="flex gap-2">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button size="icon" variant="destructive"><TrashIcon size={18} /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader className="space-y-4">
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                This action cannot be undone. This room will be permanently removed and you will not have access to this room once deleted.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="justify-end mt-5">
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction asChild>
                                    <Button onClick={() => handleDeleteRoom(room.id)} className="bg-red-500 hover:bg-red-600 transition duration-150">Delete Room</Button>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <Link href={`/edit-room/${room.id}`}>
                        <Button size="icon" className="bg-gray-400 text-black hover:text-white hover:bg-gray-500"><PencilIcon size={18} /></Button>
                    </Link>
                </div>
            </CardFooter>
        </Card>

    )
}

export default MyRoomCard
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
import { TrashIcon } from 'lucide-react';
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
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="px-3 py-1" variant="destructive"><TrashIcon size={18} /></Button>
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
                                <Button onClick={() => handleDeleteRoom(room.id)} variant="destructive">Delete Room</Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </CardFooter>
        </Card>

    )
}

export default MyRoomCard
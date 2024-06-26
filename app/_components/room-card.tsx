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

function RoomCard({room}:{room: Room}) {

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
            <CardFooter>
                <Link href={`/room/${room.id}`}>
                    <Button>Join Room</Button>
                </Link>
            </CardFooter>
        </Card>

    )
}

export default RoomCard

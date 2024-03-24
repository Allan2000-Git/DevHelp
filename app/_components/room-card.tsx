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

function RoomCard({room}:{room: Room}) {
    const techStack = room.language.split(",");

    return (
        <Card>
            <CardHeader>
                <CardTitle>{room.roomName}</CardTitle>
                <CardDescription>{room.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 w-full">
                <div className="flex gap-1 w-full flex-wrap">
                    <span className="font-semibold text-sm text-gray-500">Tech Stach Used:</span>
                    {
                        techStack.map(item => (
                            <span className="bg-slate-950 px-2 py-1 text-white rounded-md text-[12px]" key={item}>{item}</span>
                        ))
                    }
                </div>
                <div className="flex items-center w-full gap-2">
                    <FaGithub size={20} />
                    {
                        room.repoLink ? <Link href={room.repoLink} className="text-gray-500 text-[13px]">{room.repoLink}</Link> : "Repository link not provided."
                    }
                </div>
            </CardContent>
            <CardFooter>
                <Button>Join Room</Button>
            </CardFooter>
        </Card>

    )
}

export default RoomCard

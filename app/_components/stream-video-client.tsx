'use client'

import { Room } from '@/types/types';
import {
    Call,
    CallControls,
    CallParticipantsList,
    SpeakerLayout,
    StreamCall,
    StreamTheme,
    StreamVideo,
    StreamVideoClient,
} from '@stream-io/video-react-sdk';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { generateToken } from '@/actions/token';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function VideoClient({room}:{room: Room}) {
    const {data: session} = useSession();
    const [client, setClient] = useState<StreamVideoClient>();
    const [call, setCall] = useState<Call>();

    const router = useRouter();

    const apiKey = process.env.NEXT_PUBLIC_GETSTREAM_KEY as string;

    useEffect(() => {
        if(!session || !room) return;

        const userId = session?.user.id;
        const client = new StreamVideoClient({ 
            apiKey, 
            user:{ 
                id: userId,
                name: session.user.name ?? "User",
                image: session.user.image!,
            },
            tokenProvider: () => generateToken(userId),
        });
        setClient(client);

        const call = client.call('default', room.id);
        call.join({ create: true });
        setCall(call);

        // return () => {
        //     call.leave()
        //     .then(() => client.disconnectUser())
        //     .catch((error) => toast.info(error.message));
        // }
        return () => {
            client.disconnectUser();
            call.leave().catch((err) => {
                console.error(`Failed to leave the call`, err);
            });
            setClient(undefined);
            setCall(undefined);
        };
    }, [session, room])

    return (
        client && call &&
        <StreamVideo client={client}>
            <StreamCall call={call}>
                <StreamTheme>
                    <SpeakerLayout />
                    <CallControls onLeave={() => router.push("/all-rooms")} />
                </StreamTheme>
                <CallParticipantsList onClose={function (): void {
                        throw new Error('Function not implemented.');
                    } } />
            </StreamCall>
        </StreamVideo>
    );
};

export default VideoClient;
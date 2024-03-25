"use server"

import { StreamChat } from 'stream-chat';

export async function generateToken(userId: string) {
    const apiKey = process.env.NEXT_PUBLIC_GETSTREAM_KEY!;
    const secret = process.env.NEXT_PUBLIC_GETSTREAM_SECRET!;

    const serverClient = StreamChat.getInstance(apiKey, secret);

    // generate a token for the user with id
    const token = serverClient.createToken(userId);

    return token;
}
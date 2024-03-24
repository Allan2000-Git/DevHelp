"use server"

import { db } from "@/app/db";
import { rooms } from "@/app/db/schema";
import { getSession } from "@/lib/auth";
import { Room } from "@/types/types";

export async function createRoom(room: Omit<Room, "id" | "userId">) {
    try {
        const session = await getSession();
        if (!session) {
            throw new Error("You must be logged in to create a room.");
        }
        const newRoom = await db.insert(rooms).values({ ...room, userId: session.user.id });
        return newRoom;
    } catch (error) {
        throw new Error('Something went wrong while creating your room.')
    }
}
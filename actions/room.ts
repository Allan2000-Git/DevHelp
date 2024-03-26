"use server"

import { db } from "@/app/db";
import { rooms } from "@/app/db/schema";
import { getSession } from "@/lib/auth";
import { Room } from "@/types/types";
import { eq, ilike } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { unstable_noStore as noStore } from 'next/cache';

export async function createRoom(room: Omit<Room, "id" | "userId">) {
    try {
        const session = await getSession();
        if (!session) {
            throw new Error("You must be logged in to create a room.");
        }
        const newRoom = await db.insert(rooms).values({ ...room, userId: session.user.id });

        revalidatePath("/all-rooms");
        
        return newRoom;
    } catch (error) {
        throw new Error('Something went wrong while creating your room.')
    }
}

export const getAllRooms = async (query: string) => {
    noStore();
    let data;
    if(query){
        data = await db.select().from(rooms).where(ilike(rooms.tags, `%${query}%`));
    }else{
        data = await db.select().from(rooms);
    }
    return data;
}

export const getRoom = async (roomId: string) => {
    noStore();
    const data = await db.query.rooms.findFirst({
        where: (rooms, { eq }) => eq(rooms.id, roomId),
    });
    return data;
}

export const getMyRooms = async () => {
    noStore();
    const session = await getSession();
    if(!session){
        throw new Error("Log in to view your rooms.")
    }
    const data = await db.select().from(rooms).where(eq(rooms.userId, session?.user.id));
    return data;
}

export const deleteRoom = async (roomId: string) => {
    noStore();
    await db.delete(rooms).where(eq(rooms.id, roomId));
    revalidatePath("/my-rooms");
    revalidatePath("/all-rooms");
}

export async function updateRoom(room: Room, roomId: string) {
    noStore();
    try {
        const session = await getSession();
        if (!session) {
            throw new Error("You must be logged in to edit a room.");
        }

        const currentRoom = await getRoom(room.id);

        if (!currentRoom) {
            throw new Error("Room not found.");
        }

        if (currentRoom?.userId !== session.user.id) {
            throw new Error("You are not authorized to edit this room.");
        }

        await db.update(rooms).set(room).where(eq(rooms.id, roomId));

        revalidatePath("/my-rooms");
        revalidatePath("/all-rooms");
        revalidatePath(`/edit-room/${roomId}`);   
        
    } catch (error) {
        throw new Error('Something went wrong while editing your room contents.')
    }
}
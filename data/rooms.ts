
import { db } from "@/app/db"
import { rooms } from "@/app/db/schema"
import { eq } from "drizzle-orm";
import { unstable_noStore as noStore } from 'next/cache';

export const getAllRooms = async () => {
    noStore();
    const data = await db.select().from(rooms);
    return data;
}

export const getRoom = async (roomId: string) => {
    noStore();
    const data = await await db.query.rooms.findFirst({
        where: (rooms, { eq }) => eq(rooms.id, roomId),
    });
    return data;
}

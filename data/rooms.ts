
import { db } from "@/app/db"
import { rooms } from "@/app/db/schema"
import { eq, ilike } from "drizzle-orm";
import { unstable_noStore as noStore } from 'next/cache';

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
    const data = await await db.query.rooms.findFirst({
        where: (rooms, { eq }) => eq(rooms.id, roomId),
    });
    return data;
}

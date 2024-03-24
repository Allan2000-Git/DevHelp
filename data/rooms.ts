
import { db } from "@/app/db"
import { rooms } from "@/app/db/schema"
import { unstable_noStore as noStore } from 'next/cache';

export const getAllRooms = async () => {
    noStore();
    const data = await db.select().from(rooms);
    return data;
}

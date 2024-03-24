import { rooms, users } from "@/app/db/schema";

export type Room = typeof rooms.$inferSelect;
export type User = typeof users.$inferSelect;
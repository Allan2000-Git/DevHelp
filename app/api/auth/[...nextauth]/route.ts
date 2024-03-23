import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/app/db"
import type { Adapter } from "next-auth/adapters";

export const handler = NextAuth({
    adapter: DrizzleAdapter(db) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
        }),
    ],
})

export { handler as GET, handler as POST }
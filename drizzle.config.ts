import type { Config } from "drizzle-kit";

export default {
    schema: "./app/db/schema.ts",
    out: "./app/db/migrations",
    driver: "pg",
    dbCredentials: {
        connectionString:
        process.env.DATABASE_URL || "postgres://postgres:allan@localhost:5432/devhelp",
    },
} satisfies Config;
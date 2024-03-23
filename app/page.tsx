import { db } from "./db";

export default async function Home() {

  const users = await db.query.user.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {
        users.map(user => (
          <h1>{user.name}</h1>
        ))
      }
    </main>
  );
}

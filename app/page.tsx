import Link from "next/link";

export default async function Home() {
  return (
    <main className="max-w-screen-xl flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/all-rooms">All Rooms</Link>
    </main>
  );
}

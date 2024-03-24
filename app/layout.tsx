import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./_components/providers";
import Navbar from "./_components/navbar";
import { Toaster } from "@/components/ui/sonner"
import NextTopLoader from 'nextjs-toploader';
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevHelp - Collaborative Assistance for Developers",
  description: "Get unstuck with your code by creating a streaming link where fellow developers can join in and offer their expertise in real-time.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <NextTopLoader color="#1d4ed8" height={3} />
          {children}
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}

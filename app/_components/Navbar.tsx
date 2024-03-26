"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteUserAccount } from '@/actions/room'

function Navbar() {
    const {data: session} = useSession();

    const handleDeleteUserAccount = async () => {
        await deleteUserAccount();
        signOut({ callbackUrl: '/' });
    }

    // useEffect(() => {
    //     if(session?.user){
    //         redirect("/create-room");
    //     }
    // }, [session]);

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 border-b shadow-md sticky top-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="DevHelp Logo" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">DevHelp</span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {
                        session?.user ?
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src={session.user.image ?? undefined} />
                                    <AvatarFallback>{session.user.name}</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <Link href="/my-rooms">
                                    <DropdownMenuItem className="capitalize cursor-pointer">My Rooms</DropdownMenuItem>
                                </Link>

                                <DropdownMenuSeparator />

                                <Button 
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="auth_btns bg-blue-700 hover:bg-blue-800">
                                    Sign Out
                                </Button>

                                <DropdownMenuSeparator />

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                        className="bg-red-500 hover:bg-red-600 rounded-lg">
                                            Delete Account
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader className="space-y-4">
                                            <AlertDialogTitle>Are you sure you want to delete your account?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. All your data and settings will be permanently removed, and you will not be able to recover them.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter className="justify-end mt-5">
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction asChild>
                                                <Button 
                                                onClick={handleDeleteUserAccount}
                                                className="bg-red-500 hover:bg-red-600 transition duration-150">
                                                    Yes, delete my account
                                                </Button>
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        :
                        <Button 
                        onClick={() => signIn("google")}
                        className="auth_btns bg-main-700 hover:bg-main-800">
                            Sign In
                        </Button>
                    }
                    <Button className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </Button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <Link href="/" className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500" aria-current="page">Home</Link>
                    </li>
                    <li>
                        <Link href="/create-room" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Create Room</Link>
                    </li>
                    <li>
                        <Link href="/all-rooms" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">All Rooms</Link>
                    </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar

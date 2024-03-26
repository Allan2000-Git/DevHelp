"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createRoom } from "@/actions/room"
import { toast } from "sonner";
import { useRouter } from "next/navigation"
import { Loader2Icon } from "lucide-react"
import { useState } from "react"

const formSchema = z.object({
    roomName: z.string().min(2, {
        message: "Room name must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "Description must be at least 2 characters long.",
    }),
    tags: z.string().min(2, {
        message: "Atleast ONE tag must be specified",
    }),
    repoLink: z.string()
})

function CreateRoomForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            roomName: "",
            description: "",
            tags: "",
            repoLink: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        try {
            setIsLoading(true);
            await createRoom(values);
            setIsLoading(false);
            router.push("/all-rooms");
            toast.success("Room created successfully.");
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unknown error occurred.");
            }
        }
    }

    return (
        <>
            <div className="mt-10">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                        control={form.control}
                        name="roomName"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Room Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Give your room a name" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Briefly describe your project" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Tech Stack</FormLabel>
                            <FormControl>
                                <Input placeholder="Select your tech stack" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="repoLink"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Project Repository Link <span>(if any)</span></FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your repository link" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        {
                            isLoading ? 
                            <Button disabled>
                                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                                Creating Room
                            </Button>
                            : <Button type="submit">Create Room</Button>
                        }
                    </form>
                </Form>
            </div>
        </>
    )
}

export default CreateRoomForm

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
import { useMutation } from "react-query"
import { Room } from "@/types/types"
import { Loader2Icon } from "lucide-react"

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "Description must be at least 2 characters long.",
    }),
    language: z.string().min(2, {
        message: "Atleast ONE language must be specified",
    }),
    repoLink: z.string()
})

function CreateRoomForm() {
    const router = useRouter();

    const {mutate, isLoading} = useMutation({
        mutationFn: createRoom
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            description: "",
            language: "",
            repoLink: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        try {
            // await createRoom(values);
            mutate({
                username: values.username,
                description: values.description,
                language: values.language,
                repoLink: values.repoLink
            });
            toast.success("Room created successfully.");
            router.push("/");
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
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your username" {...field} />
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
                        name="language"
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

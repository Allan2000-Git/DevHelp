'use client'

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
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Loader2Icon } from "lucide-react"

const formSchema = z.object({
    query: z.string()
})

function SearchRoom() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            query: searchParams.get("query") ?? "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if(values.query){
            setIsLoading(true); 
            router.push(`/all-rooms/?query=${values.query}`);
            setIsLoading(false);
        }else{
            router.push("/all-rooms");
        }
    }

    useEffect(() => {
        form.setValue("query", searchParams.get("query") ?? "");
    }, [searchParams])

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex  gap-3">
                    <FormField
                    control={form.control}
                    name="query"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input autoComplete="off" className="min-w-72" placeholder="Search by tags" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    {
                        isLoading ? 
                        <Button disabled>
                            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                            Searching
                        </Button>
                        : <Button type="submit">Search</Button>
                    }
                </form>
            </Form>
        </>
    )
}

export default SearchRoom

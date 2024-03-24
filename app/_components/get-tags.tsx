import React from 'react'
import { Badge } from "@/components/ui/badge"

function GetTags({tags}:{tags: string}) {
    const tagsList = tags.split(",");
    return(
        <div className="flex gap-1 w-full flex-wrap">
            {
                tagsList.map(tag => (
                    <Badge className="bg-slate-950 px-2 py-1 text-white text-[12px]" key={tag}>{tag}</Badge>
                ))
            }
        </div>
    );
}

export default GetTags

"use client";

import{Plus} from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";

import{
    Dialog,
    DialogContent,
    DialogTrigger,
}from "@/components/ui/dialog";
import { Hint } from "../hint";

export const NewButton=()=>{
    return(
        <Dialog>
            <DialogTrigger asChild>
                <div className="aspect-square flex items-center justify-center w-full">
                    <Hint
                        label="Create organization"
                        side="right"
                        align="start"
                        sideOffset={18}
                    >
                        <button className="bg-white/25 h-[100%] w-[100%] rounded-md
                            flex items-center justify-center opacity-60 
                            hover:opacity-100 transition p-1">
                                <Plus className="text-white"/>
                        </button> 
                    </Hint>  
                </div>
            </DialogTrigger>

            <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
                <CreateOrganization/>
            </DialogContent>
        </Dialog>
    )
}


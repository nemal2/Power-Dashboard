"use client";

import { toast } from "sonner";
import { Plus, Router } from "lucide-react";
import {cn} from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useRouter } from "next/navigation";

interface NewBoardButtonProps {
    orgId: string;
    disabled? : boolean;

}


export const NewBoardButton = ({ 
    orgId,
    disabled,
}: NewBoardButtonProps) => {
    const router = useRouter();
    const {mutate,pending} = useApiMutation(api.board.create);

    const onClick =() => {
        mutate({
            orgId,
            title : "Untitled"
        })

        .then((id) => {
            toast.success("Board Created");
            //TODO: redirect to /board/{id}
            router.push('/board/${id}');
        })

        .catch(() => toast.error("failed to create board"));
    }


    return (
        <button
            disabled = {pending ||disabled}
            onClick = {onClick}
            className = {cn(
                "col-span-1 aspect-[100/127] bg-teal-800 rounded-lg hover:bg-yellow-500 hover:opacity-75 flex flex-col items-center justify-center py-6",
                (pending || disabled) && "opacity-75   hover:bg-teal-800  cursor-not-allowed"
            )}
        >   
        <div />
        <Plus className="h-12 w-12 text-white stroke-1" />
        <p className="text-sm text-white font-light ">
            New Board
        </p>
        
        </button>
    )

}
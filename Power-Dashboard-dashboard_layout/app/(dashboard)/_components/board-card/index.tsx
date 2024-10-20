"use client"

import  Link from "next/link";
import  Image from "next/image";

import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import { MoreHorizontal } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";

import { Overlay } from "./overlay";
import { Footer } from "./footer";
import { Actions } from "@/components/action";
import { toast } from "sonner";

import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";

interface BoardCardProps {
    id : string;
    title : string;
    authorName:string;
    authorID: string;
    createdAt: number;
    imageUrl: string;
    orgId : string;
    isFavourite: boolean;
}

export const BoardCard = ({
    id,
    title,
    authorName,
    authorID,
    createdAt,
    imageUrl,
    orgId,
    isFavourite,
}:BoardCardProps) => {
    const {userId} = useAuth();

    const authorLabel = userId === authorID ? "You" : authorName;
    const createdAtLabel = formatDistanceToNow(createdAt, {
        addSuffix: true,
    });

    

    const {
        mutate: onFavorite,
        pending: pendingFavorite,
    } = useApiMutation(api.board.favorite);

    const {
        mutate: onUnFavorite,
        pending: pendingUnFavorite,
    } = useApiMutation(api.board.unfavorite);

    const toggleFavorite = () => {
        if (isFavourite){
            onUnFavorite({id})
                .catch(() => toast.error("Dailed to unfavorite"))
        }else{
            onFavorite({id, orgId})
            .catch(() => toast.error("Dailed to favorite"))
        }
    };
    
    return (
        <Link href={`/board/${id}`}>
            <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
                <div className="relative flex-1 bg-amber-50">
                    <Image 
                        src = {imageUrl}
                        alt = {title}
                        fill
                        className="object-fit"
                    />
                    <Overlay/>
                    
                    <Actions
                        id={id}
                        title={title}
                        side="right"
                    >
                        <button
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none"
                        >
                            <MoreHorizontal
                                className="text-white opacity-75 hover:opacity-100 transition-opacity"
                                />
                        </button>
                    </Actions>
                </div>
                <Footer
                    isFavourite = {isFavourite}
                    title = {title}
                    authorLabel ={authorLabel}
                    createdAtLabel = {createdAtLabel}
                    onClick ={toggleFavorite}
                    disabled = {pendingFavorite ||pendingUnFavorite}
                />
            </div>
        </Link >
    );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
    return (
        <div className= "aspect-[100/127] border rounded-lg overflow-hidden">
            <Skeleton className="h-full w-full"/>
        </div>
    );
};
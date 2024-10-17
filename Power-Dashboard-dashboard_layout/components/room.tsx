"use client";

import { Children, ReactNode } from "react";
import { RoomProvider} from "@/liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";

interface RoomProps {
    children: ReactNode
    roomId:string;
    fallback:NonNullable<ReactNode> | null;
};

export const Room = ({
    Children,
    roomId,
    fallback,
}: {
    Children:ReactNode
    roomId:string;
}) => {
    return(
        <RoomProvider id ={roomId} initialPresence={{}}>
            <ClientSideSuspense fallback ={fallback}>
                {() => Children}
            </ClientSideSuspense>

        </RoomProvider>
    )
}
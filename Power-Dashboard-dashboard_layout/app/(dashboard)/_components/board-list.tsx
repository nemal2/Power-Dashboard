"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { EmptyBoard } from "./empty-board";
import { EmptyFav } from "./empty-fav";
import { EmptySearch } from "./empty-search";
import { BoardCard } from "./board-card";
import { NewBoardButton } from "./new-board-button";

interface BoardListProps {
    orgId: string; // Organization ID for querying boards
    query: {
        search?: string; // Optional search query
        favorites?: boolean; // Boolean to check if favorites are being queried
    };
}

export const BoardList = ({
    orgId,
    query,
}: BoardListProps) => {
    // Call the boards query with orgId
    const data = useQuery(api.boards.get, { 
        orgId, search:query.search
        
    });

    // Check for loading state
    if (data === undefined) {
        return (
            <div>
                <h2 className="text-3xl">
                    {query.favorites? "Favourite boards" : "Team boards"}

                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 
                lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                    <NewBoardButton orgId={orgId} disabled />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                </div>
            </div>
        )
    }

    // Check if no boards are returned and handle different cases
    if (!data.length) {
        if (query.search) {
            return <EmptySearch />;
        }
        if (query.favorites) {
            return <EmptyFav />;
        }
        return <EmptyBoard />;
    }

    // Render the boards if data is available
    return (
        <div>
            <h2 className="text-3xl">
                {query.favorites? "Favourite boards" : "Team boards"}

            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 
            lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                <NewBoardButton  orgId = {orgId}/>
                {data?.map((board)=> (
                    <BoardCard 
                        key = {board._id}
                        id = {board._id}
                        title = {board.title}
                        imageUrl = {board.imageUrl}
                        authorID = {board.authorId}
                        authorName = {board.authorName}
                        createdAt= {board._creationTime}
                        orgId={board.orgId}
                        isFavourite ={board.isFavorite}
                    
                    />
                ))}
            </div>
            {/* {JSON.stringify(query)} */}
        </div>
    );
};

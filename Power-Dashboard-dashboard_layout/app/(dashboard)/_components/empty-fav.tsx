import Image from "next/image";

export const EmptyFav = ( ) => {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <Image 
                src="/faavv.png"
                height={140}
                width={140}
                alt="Empty"
            />
            <h2 className="text-2xl font-semibold mt-6">
                No favorite boards!
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Try favoriting a board
            </p>
        </div>
    );
};
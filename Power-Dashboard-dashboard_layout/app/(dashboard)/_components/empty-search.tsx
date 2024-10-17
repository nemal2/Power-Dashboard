import Image from "next/image";

export const EmptySearch = ( ) => {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <Image 
                src="/nr.png"
                height={140}
                width={140}
                alt="Empty"
            />
            <h2 className="text-2xl font-semibold mt-6">
                No result found!
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Try Searching somthing else
            </p>
        </div>
    );
};
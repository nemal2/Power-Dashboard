import Image from "next/image";
import { CreateOrganization } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";


export const EmptyOrg  = () =>{
    return (
        <div className="h-screen flex items-center justify-center">
    <div className="flex flex-col items-center">
        <Image 
            src="/96.png"
            alt="Empty"
            height={150}
            width={150}
        />
        <h2 className="text-2xl font-semibold mt-4">
            Welcome to Board
        </h2>
        <p className="text-muted-foreground text-sm mt-2">
            Create an Organixation to get start
        </p>
        <div className="mt-6">
            <Dialog>
                <DialogTrigger>
                    <Button size="lg">
                        Create Organization
                    </Button>

                </DialogTrigger>
                <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
                    <CreateOrganization/>
                </DialogContent>
            </Dialog>
        </div>
    </div>
</div>
    );

};
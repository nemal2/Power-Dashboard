"use client";


import{
    useOrganization,
    useOrganizationList,
}from "@clerk/nextjs";

import { Hint } from "../hint";
import{cn} from "@/lib/utils";
import Image from "next/image";

interface ItemProps{
    id:string;
    name:string;
    imgUrl:string;
};

export const Item = ({
    id,
    name,
    imgUrl,
  }: ItemProps) => {
    const{organization}=useOrganization();
    const{setActive}=useOrganizationList();
    const isActive=organization?.id===id;
    const onClick=()=>{
        if(!setActive) return;

        setActive({organization:id});
    };

    return (
      <div className="aspect-square relative">
        <Hint
          label={name}
          side="right"
          align="start"
          sideOffset={50}
        >
        <Image
        fill
          alt={name}
          src={imgUrl}
          onClick={onClick}
          className={cn(
            "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
            isActive && "opacity-100"
          )}
          
        />
        </Hint>
      </div>
    );
  };
  

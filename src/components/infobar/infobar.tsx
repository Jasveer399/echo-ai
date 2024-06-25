import React from "react";
import Breadcrumpb from "./breadcrumpb";
import { Card } from "../ui/card";
import { Headphones, Star, Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {};

const Infobar = (props: Props) => {
  return (
    <div className="flex w-full justify-between items-center py-1 mb-8">
      <Breadcrumpb />
      <div className="flex gap-3 items-center">
        <div>
          <Card className="flex rounded-xl gap-3 py-3 px-4 text-ghost">
            <Trash className="hover:text-red-500 cursor-pointer" />
            <Star className="hover:text-orange cursor-pointer" />
          </Card>
        </div>
        <Avatar>
          <AvatarFallback className="bg-orange text-white">
            <Headphones />
          </AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Infobar;

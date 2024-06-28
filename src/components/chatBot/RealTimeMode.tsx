import React, { SetStateAction } from "react";
import { Card } from "../ui/card";

type Props = {
  chatRoom: string;
  setChats: React.Dispatch<
    SetStateAction<
      {
        role: "user" | "assistant";
        content: string;
        link?: string | undefined;
      }[]
    >
  >;
};

const RealTimeMode = ({ chatRoom, setChats }: Props) => {
  //WIP:setup Real time Mode
  return (
    <Card className="px-3 rounded-full py-1 bg-orange font-bold text-white text-sm">
      Real time
    </Card>
  );
};

export default RealTimeMode;

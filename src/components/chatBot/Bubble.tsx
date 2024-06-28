import { cn, extractUUIDFromString, getMonthName } from "@/lib/utils";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  message: {
    content: string;
    role: "assistant" | "user";
    link?: string;
  };
  createdAt?: Date;
};

const Bubble = ({ createdAt, message }: Props) => {
  const image = extractUUIDFromString(message.content);
  let date = new Date();
  return (
    <div
      className={cn(
        "flex gap-2 items-end",
        message.role == "assistant" ? "self-start" : "self-end flex-row-reverse"
      )}
    >
      {message.role == "assistant" ? (
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ) : (
        <Avatar className="w-5 h-5">
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "flex flex-col gap-3 min-w-[200px] max-w-[300px] p-4 rounded-t-md",
          message.role == "assistant"
            ? "bg-muted rounded-r-md"
            : "bg-grandis da rounded-l-md"
        )}
      >
        {createdAt ? (
          <div>
            <p>
              {createdAt.getDate()}
              {getMonthName(createdAt.getMonth())}
            </p>
            <p>
              {createdAt.getHours()}:{createdAt.getMinutes()}
              {createdAt.getHours() > 12 ? "pm" : "am"}
            </p>
          </div>
        ) : (
          <p>
            {`${date.getHours()}:${date.getMinutes()} ${
              date.getHours() > 12 ? "pm" : "am"
            }`}
          </p>
        )}

        {image ? (
          <div className="relative aspect-square">
            <Image src={image[0]} fill alt="image" />
          </div>
        ) : (
          <p className="text-sm">
            {message.content.replace("(complete)", "")}
            {message.link && (
              <Link
                className="underline font-bold pl-2"
                href={message.link}
                target="_blank"
              >
                Your Link
              </Link>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default Bubble;

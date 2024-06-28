import { ChatBotMessageProps } from "@/schemas/conversation.schema";
import React, { forwardRef } from "react";
import { UseFormRegister } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import RealTimeMode from "./RealTimeMode";
import Image from "next/image";
import TabsMenu from "../tabs";
import { BOT_TABS_MENU } from "@/contents/manu";
import ChatIcon from "@/icons/chat-icon";
import { TabsContent } from "../ui/tabs";
import { Separator } from "../ui/separator";
import Bubble from "./Bubble";
import Responding from "./Responding";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Paperclip, Send } from "lucide-react";
import { Label } from "../ui/label";
import { CardDescription, CardTitle } from "../ui/card";
import Accordio from "../accordion";

type Props = {
  errors?: any;
  register: UseFormRegister<ChatBotMessageProps>;
  chats: { role: "assistant" | "user"; content: string; link?: string }[];
  onChat(): void;
  onResponding: boolean;
  domainName: string;
  theme?: string | null;
  textColor?: string | null;
  help?: boolean;
  realtimeMode:
    | {
        chatroom: string;
        mode: boolean;
      }
    | undefined;
  helpdesk: {
    id: string;
    question: string;
    answer: string;
    domainId: string | null;
  }[];
  setChat: React.Dispatch<
    React.SetStateAction<
      {
        role: "user" | "assistant";
        content: string;
        link?: string | undefined;
      }[]
    >
  >;
};

const Botwindow = forwardRef<HTMLDivElement, Props>(
  (
    {
      errors,
      register,
      chats,
      onChat,
      onResponding,
      domainName,
      theme,
      textColor,
      help,
      realtimeMode,
      helpdesk,
      setChat,
    },
    ref
  ) => {
    return (
      <div className="h-[670px] w-[450px] flex flex-col bg-white rounded-xl mr-[80px] border-[1px] overflow-hidden">
        <div className="flex justify-between px-4 pt-4">
          <div className="flex gap-2">
            <Avatar className="w-20 h-20">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadch" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex items-start flex-col">
              <h3 className="text-lg font-bold leading-none">
                Sales Rep - Damian A
              </h3>
              <p className="text-sm">{domainName.split(".com")[0]}</p>
              {realtimeMode?.mode && (
                <RealTimeMode
                  setChats={setChat}
                  chatRoom={realtimeMode.chatroom}
                />
              )}
            </div>
          </div>
          <div className="relative w-16 h-16">
            <Image
              src="https://res.cloudinary.com/dwak3dznr/image/upload/v1719336106/next-images/gcsx6lfl3wrm4b9rslwr.png"
              fill
              alt="users"
              objectFit="contain"
            />
          </div>
        </div>
        <TabsMenu
          triggers={
            // help ? BOT_TABS_MENU : [{ label: "chat", icon: <ChatIcon /> }]
            BOT_TABS_MENU
          }
          className="bg-transparent bottom-[1px] border-border"
        >
          <TabsContent value="chat">
            <Separator orientation="horizontal" />
            <div className="flex flex-col h-full">
              <div
                style={{ background: theme || "", color: textColor || "" }}
                className="px-3 flex h-[350px] flex-col py-5 gap-3 chat-window overflow-y-auto"
                ref={ref}
              >
                {chats.map((chat, key) => (
                  <Bubble key={key} message={chat} />
                ))}
                {onResponding && <Responding />}
              </div>
              <form
                onSubmit={onChat}
                className="flex px-3 py-1 flex-col flex-1 bg-porcelain absolute -bottom-0 w-[450px] rounded-b-md"
              >
                <div className="flex justify-between items-center">
                  <Input
                    {...register("content")}
                    placeholder="Type your message..."
                    className="focus-visible:ring-0 flex-1 p-0 focus-visible:ring-offset-0 bg-porcelain rounded-none outline-none border-none pl-2 ml-2"
                  />
                  <Button onClick={onChat} type="submit" className="my-2 rounded-full p-3 h-12">
                    <Send className="mt-[1px] mr-[2px]" />
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>
          <TabsContent value="helpdesk">
            <div className="h-[485px] overflow-y-auto overflow-x-hidden p-4 flex flex-col gap-4">
              <div>
                <CardTitle>Help Desk</CardTitle>
                <CardDescription>
                  Browse From a list of question peple usually ask
                </CardDescription>
              </div>
              <Separator orientation="horizontal" />
              {helpdesk.map((desk) => (
                <Accordio
                  key={desk.id}
                  trigger={desk.question}
                  content={desk.answer}
                />
              ))}
            </div>
          </TabsContent>
        </TabsMenu>
      </div>
    );
  }
);

export default Botwindow;

Botwindow.displayName = "BoTWindow";

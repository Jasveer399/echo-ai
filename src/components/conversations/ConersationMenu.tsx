"use client";
import { useConversations } from "@/hooks/conversations/use-conversation";
import React from "react";
import TabsMenu from "../tabs";
import { TABS_MENU } from "@/contents/manu";
import { TabsContent } from "../ui/tabs";
import ConversationSearch from "./ConversationSearch";
import { Loader } from "../loader";
import { CardDescription } from "../ui/card";
import ChatCard from "./ChatCard";
import { Separator } from "../ui/separator";

type Props = {
  domains?:
    | {
        name: string;
        id: string;
        icon: string;
      }[]
    | undefined;
};

const ConersationMenu = ({ domains }: Props) => {
  const { chatRooms, loading, onGetActiveChatMessages, register } =
    useConversations();
  return (
    <div className="py-3 px-0">
      <TabsMenu triggers={TABS_MENU}>
        <TabsContent value="unread">
          <ConversationSearch domains={domains} register={register} />

          <div className="flex flex-col">
            <Loader loading={loading}>
              {chatRooms.length ? (
                chatRooms.map((chatRoom) => (
                  <ChatCard
                    seen={chatRoom.chatRoom[0].message[0].seen}
                    id={chatRoom.chatRoom[0].id}
                    onChat={() =>
                      onGetActiveChatMessages(chatRoom.chatRoom[0].id)
                    }
                    key={chatRoom.chatRoom[0].id}
                    title={chatRoom.email!}
                    description={chatRoom.chatRoom[0].message[0]?.message}
                    createdAt={chatRoom.chatRoom[0].message[0]?.createdAt}
                  />
                ))
              ) : (
                <CardDescription>No chats for your doamins</CardDescription>
              )}
            </Loader>
          </div>
        </TabsContent>
        <TabsContent value="all">
          <Separator orientation="horizontal" className="mt-5" />
          All
        </TabsContent>
        <TabsContent value="expired">
          <Separator orientation="horizontal" className="mt-5" />
          Expired
        </TabsContent>
        <TabsContent value="starred">
          <Separator orientation="horizontal" className="mt-5" />
          Starred
        </TabsContent>
      </TabsMenu>
    </div>
  );
};

export default ConersationMenu;

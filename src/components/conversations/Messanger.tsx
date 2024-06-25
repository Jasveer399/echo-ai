"use client";
import { useChatWindow } from "@/hooks/conversations/use-conversation";
import React from "react";
import { Loader } from "../loader";

type Props = {};

const Messanger = (props: Props) => {
  const {
    messageWindowRef,
    register,
    onHandleSentMessage,
    chats,
    loading,
    chatRoom,
  } = useChatWindow();
  return (
    <div className="flex flex-col h-0 relative">
      <div className="flex-1 h-0 w-full flex flex-col">
        <Loader loading={loading}>
          <div
            ref={messageWindowRef}
            className="w-full flex-1 h-0 flex flex-col gap-3 pl-5 chat-window overflow-y-auto"
          >
            {chats.length ? (
              chats.map((chat) => <>/////////////</>)
            ) : (
              <div>No Chat Selected</div>
            )}
          </div>
        </Loader>
      </div>
    </div>
  );
};

export default Messanger;

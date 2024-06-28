"use client";
import { useChatBot } from "@/hooks/chatbot/use-chatbot";
import React from "react";
import Botwindow from "./window";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {};

const AiChatBot = (props: Props) => {
  const {
    botOpened,
    currentBot,
    loading,
    messagesWindowRef,
    onAiTypeing,
    onOpenedChatBot,
    onRealtime,
    onStartChatting,
    onchats,
    register,
    setOnchats,
  } = useChatBot();
  return (
    <div className="h-screen flex flex-col justify-end items-end">
      {botOpened && (
        <Botwindow
          setChat={setOnchats}
          realtimeMode={onRealtime}
          helpdesk={currentBot?.helpdesk!}
          domainName={currentBot?.name!}
          ref={messagesWindowRef}
          help={currentBot?.chatBot?.helpdesk}
          theme={currentBot?.chatBot?.background}
          textColor={currentBot?.chatBot?.textColor}
          chats={onchats}
          register={register}
          onChat={onStartChatting}
          onResponding={onAiTypeing}
        />
      )}

      <div
        className={cn(
          "absolute cursor-pointer w-16 h-16 items-center justify-center ",
          loading ? "invisible" : "visible"
        )}
        onClick={onOpenedChatBot}
      >
        {currentBot?.chatBot?.icon ? (
          <Image src={currentBot.chatBot.icon} alt="bot" fill />
        ) : (
          <div>Image</div>
        )}
      </div>
    </div>
  );
};

export default AiChatBot;

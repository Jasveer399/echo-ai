import { onAichatBotAssistent, onGetCurrenthatbot } from "@/actions/bot";
import { postToPresent, pusherCilent } from "@/lib/utils";
import {
  ChatBotMessageProps,
  ChatBotMessageSchema,
} from "@/schemas/conversation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { register } from "module";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export const useChatBot = () => {
  const { register, handleSubmit, reset } = useForm<ChatBotMessageProps>({
    resolver: zodResolver(ChatBotMessageSchema),
  });

  const [currentBot, setCurrentBot] = useState<
    | {
        name: string;
        chatBot: {
          id: string;
          icon: string | null;
          welcomeMessage: string | null;
          background: string | null;
          textColor: string | null;
          helpdesk: boolean;
        } | null;
        helpdesk: {
          id: string;
          question: string;
          answer: string;
          domainId: string | null;
        }[];
      }
    | undefined
  >();
  const [botOpened, setBotOpened] = useState<boolean>(false);
  const messagesWindowRef = useRef<HTMLDivElement | null>(null);
  const onOpenedChatBot = () => setBotOpened((prev) => !prev);
  const [loading, setLoading] = useState<boolean>(true);
  const [onchats, setOnchats] = useState<
    {
      role: "assistant" | "user";
      content: string;
      link?: string;
    }[]
  >([]);
  const [onAiTypeing, setOnAiTypeing] = useState<boolean>(false);
  const [currentBotId, setCurrentbotId] = useState<string>();
  const [onRealtime, setOnRealTime] = useState<
    | {
        chatroom: string;
        mode: boolean;
      }
    | undefined
  >(undefined);
  let url: string = "";

  const onScrolltoBottom = () => {
    messagesWindowRef.current?.scroll({
      top: messagesWindowRef.current.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    onScrolltoBottom();
  }, [onchats, messagesWindowRef]);

  useEffect(() => {
    postToPresent(
      JSON.stringify({
        width: botOpened ? 550 : 80,
        heigth: botOpened ? 800 : 80,
      })
    );
  }, [botOpened]);

  let limitRequest = 0;

  useEffect(() => {
    window.addEventListener("message", (e) => {
      const bothid = e.data;
      if (limitRequest < 1 && typeof bothid == "string") {
        onGetDomainChatBot(bothid);
        limitRequest++;
      }
    });
  }, []);

  const onGetDomainChatBot = async (id: string) => {
    setCurrentbotId(id);
    const chatbot = await onGetCurrenthatbot(id);
    if (chatbot) {
      setOnchats((prev) => [
        ...prev,
        { role: "assistant", content: chatbot.chatBot?.welcomeMessage! },
      ]);
      setCurrentBot(chatbot);
      setLoading(false);
    }
  };

  const onStartChatting = handleSubmit(async (values) => {
    reset();
    // if (values.image.length) {
    //   const image = values.image[0];
    //   if (!image) return;

    //   try {
    //     const formData = new FormData();
    //     formData.append("image", image);
    //     const response = await axios.post("/api/uploadimage", formData);
    //     const data = await response.data;

    //     console.log(data);
    //     url = data.data.secure_url;
    //   } catch (error) {
    //     console.error("Upload failed:", error);
    //   }

    //   if (url) {
    //     setOnchats((prev) => [...prev, { role: "user", content: url }]);
    //     setOnAiTypeing(true);
    //     const response = await onAichatBotAssistent(
    //       currentBotId!,
    //       onchats,
    //       "user",
    //       url
    //     );
    //     if (response) {
    //       setOnAiTypeing(true);
    //       if (response.live) {
    //         setOnRealTime((prev) => ({
    //           ...prev,
    //           chatroom: response.chatRoom,
    //           mode: response.live,
    //         }));
    //       } else {
    //         setOnchats((prev: any) => [...prev, response.response]);
    //       }
    //     }
    //   }
    // }
    if (values.content) {
      setOnchats((prev: any) => [
        ...prev,
        { role: "user", content: values.content },
      ]);
      setOnAiTypeing(true);

      const response = await onAichatBotAssistent(
        currentBotId!,
        onchats,
        "user",
        values.content
      );

      if (response) {
        setOnAiTypeing(false);
        if (response.live) {
          setOnRealTime((prev) => ({
            ...prev,
            chatroom: response.chatRoom,
            mode: response.live,
          }));
        } else {
          setOnchats((prev: any) => [...prev, response.response]);
        }
      }
    }
  });
  return {
    botOpened,
    onOpenedChatBot,
    onStartChatting,
    onchats,
    register,
    onAiTypeing,
    messagesWindowRef,
    currentBot,
    loading,
    setOnchats,
    onRealtime,
  };
};

// export const useRealTime = (
//   chatRoom: string,
//   setChats: React.Dispatch<
//     SetStateAction<
//       {
//         role: "user" | "assistant";
//         content: string;
//         link?: string | undefined;
//       }[]
//     >
//   >
// ) => {
//   useEffect(() => {
//     pusherCilent.subscribe(chatRoom);
//     pusherCilent.bind("realtime-mode", (date: any) => {
//       setChats((prev: any) => [
//         ...prev,
//         {
//           role: date.chat.role,
//           content: date.chat.message,
//         },
//       ]);
//       return ()=>pusherCilent.unsubscribe('realtime-mode');
//     });
//   }, []);
// };

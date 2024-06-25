import Section from "@/components/section_lable/Section";
import UploadButton from "@/components/upload-Button";
import { BotIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  chatBot: {
    id: string;
    icon: string | null;
    welcomeMessage: string | null;
  } | null;
};

const EditChatBoticon = ({ register, errors, chatBot }: Props) => {
  return (
    <div className="py-5 flex flex-col gap-5 items-start">
      <Section
        lable="ChatBot icon"
        message="Change the icon for the  chatbot"
      />
      <UploadButton label="Edit image" register={register} errors={errors} />
      {chatBot?.icon ? (
        <>
          <div className="rounded-full overflow-hidden">
            <Image
              src={chatBot.icon}
              alt="ChatBot Icon"
              width={80}
              height={80}
            />
          </div>
        </>
      ) : (
        <>
          <div className="rounded-full cursor-pointer shadow-md w-14 flex items-center justify-center bg-grandis py-4">
            <BotIcon className="text-white"/>
          </div>
        </>
      )}
    </div>
  );
};

export default EditChatBoticon;

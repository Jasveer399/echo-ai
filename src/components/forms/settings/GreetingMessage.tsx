import Section from "@/components/section_lable/Section";
import UploadButton from "@/components/upload-Button";
import { BotIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import FormGenertor from "../form-generator";

type Props = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  message: string;
};

const GreetingMessage = ({ register, errors, message }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <Section
        lable="Greeting Message"
        message="Customize your welcome Message"
      /> 

      <div className="lg:w-[500px]">
           <FormGenertor
           placholder={message}
           name="welcomeMessage"
           register={register}
           errors={errors}
           lines={2}
           inputType="textarea"
           type="text"
           />
      </div>

    </div>
  );
};

export default GreetingMessage;

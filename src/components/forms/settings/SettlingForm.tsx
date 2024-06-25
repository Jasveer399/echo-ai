"use client";
import { useSettings } from "@/hooks/settings/use-settings";
import React from "react";
import { Separator } from "@/components/ui/separator";
import DomainUpdate from "./DomainUpdate";
import CodeSnippet from "./code-snippet";
import PremiumBadge from "@/icons/premium-badge";
import EditChatBoticon from "./EditChatBoticon";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";
const WelcomeMessage = dynamic(() =>
  import("./GreetingMessage").then((props) => props.default)
);

type Props = {
  id: string;
  name: string;
  plan: "STANDARD" | "PRO" | "ULTIMATE";
  chatBot: {
    id: string;
    icon: string | null;
    welcomeMessage: string | null;
  } | null;
};

const SettlingForm = ({ id, name, plan, chatBot }: Props) => {
  const {
    deleting,
    errors,
    loading,
    onDeleteDomain,
    onUpdateDomainSetting,
    register,
  } = useSettings(id);
  return (
    <form
      className="flex flex-col gap-8 pb-10"
      onSubmit={onUpdateDomainSetting}
    >
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-2xl">Domain Settings</h2>
        <Separator orientation="horizontal" />
        <DomainUpdate name={name} errors={errors} register={register} />
        <CodeSnippet id={id} />
      </div>
      <div className="flex flex-col gap-3 mt-5">
        <div className="flex items-center gap-4">
          <h2 className="font-bold text-2xl">ChatBot Settings</h2>
          <div className="text-xl bg-cream flex gap-1 rounded-lg items-center">
            <PremiumBadge />
            Premium
          </div>
        </div>
        <Separator orientation="horizontal" />
        <div className="grid md:grid-cols-2">
          <div className="col-span-1 flex flex-col gap-5 order-last md:order-first">
            <EditChatBoticon
              chatBot={chatBot}
              register={register}
              errors={errors}
            />
            <WelcomeMessage
              message={chatBot?.welcomeMessage!}
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-1 relative">
            <Image
              src="/images/bot-ui.png"
              alt="bot-ui"
              className="sticky top-0"
              width={530}
              height={769}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-5 justify-end">
        <Button
          onClick={onDeleteDomain}
          variant="destructive"
          type="button"
          className="px-10 h-12"
        >
          <Loader loading={deleting}>Delete Domain</Loader>
        </Button>
        <Button type="submit" className="px-10 h-12">
          <Loader loading={loading}>Save</Loader>
        </Button>
      </div>
    </form>
  );
};

export default SettlingForm;

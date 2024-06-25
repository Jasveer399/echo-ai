import { OnGetAllAccountDomains } from "@/actions/settings";
import ConersationMenu from "@/components/conversations/ConersationMenu";
import Messanger from "@/components/conversations/Messanger";
import Infobar from "@/components/infobar/infobar";
import { Separator } from "@/components/ui/separator";
import React from "react";

type Props = {};

const ConversationPage = async (props: Props) => {
  const domains = await OnGetAllAccountDomains();
  return <div className="flex w-full h-full">
    <ConersationMenu domains={domains?.domains}/>
    <Separator orientation="vertical"/>
    <div className="w-full flex flex-col">
       <div className="px-5">
        <Infobar/>
       </div>
       <Messanger/>
    </div>
  </div>;
};

export default ConversationPage;

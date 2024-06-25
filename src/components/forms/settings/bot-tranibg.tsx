import TabsMenu from "@/components/tabs";
import { TabsContent } from "@/components/ui/tabs";
import { HELP_DESK_TABS_MENU } from "@/contents/manu";
import React from "react";
import Helpdesk from "./Helpdesk";
import Section from "@/components/section_lable/Section";
import FilterQuestion from "./FilterQuestion";

type Props = {
  id: string;
};

const BotTrainingForm = ({ id }: Props) => {
  return (
    <div className="py-5 mb-10 flex flex-col gap-5 items-start">
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-2xl">Bot Training</h2>
        <p>
          Set FAQ questions,create qusetions for capturing lead information and
          train your bot to act the way you wnat it to
        </p>
      </div>
      <TabsMenu triggers={HELP_DESK_TABS_MENU}>
        <TabsContent value="help desk" className="w-full">
          <Helpdesk id={id} />
        </TabsContent>
        <TabsContent value="questions">
          <FilterQuestion id={id} />
        </TabsContent>
      </TabsMenu>
    </div>
  );
};

export default BotTrainingForm;

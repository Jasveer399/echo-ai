import Infobar from "@/components/infobar/infobar";
import ChangePassword from "@/components/settings/ChangePassword";
import DarkModeToggle from "@/components/settings/DarkModeToggle";
import Billingsetting from "@/components/settings/bill_setting";
import useSidebar from "@/context/use-sidebar";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {};

const SettingsPage = (props: Props) => {
  // const {expand} = useSidebar();
  return (
    <div  className="overflow-auto w-full chat-window flex-1 h-0">
      <Infobar />
      {/* <div className="overflow-y-auto w-full chat-window flex-1 h-0 flex flex-col gap-10"> */}
        <Billingsetting />
        <DarkModeToggle />
        <ChangePassword />
      {/* </div> */}
    </div>
  );
};

export default SettingsPage;

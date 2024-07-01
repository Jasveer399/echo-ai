import Infobar from "@/components/infobar/infobar";
import ChangePassword from "@/components/settings/ChangePassword";
import DarkModeToggle from "@/components/settings/DarkModeToggle";
import Billingsetting from "@/components/settings/bill_setting";
import useSidebar from "@/context/use-sidebar";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {};

const SettingsPage = (props: Props) => {
  return (
    <div  className="overflow-auto w-full chat-window flex-1 h-0">
      <Infobar />
        <Billingsetting />
        <DarkModeToggle />
        <ChangePassword />
    </div>
  );
};

export default SettingsPage;

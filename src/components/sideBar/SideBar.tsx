"use client";
import { cn } from "@/lib/utils";
import React from "react";
import MaxMenu from "./maxmanu-sidebar";
import { MinMenu } from "./minmanu-sidebar";
import useSidebar from "@/context/use-sidebar";

type Props = {
  domains:
    | {
        id: string;
        name: string;
        icon: string;
      }[]
    | null
    | undefined;
};

const SideBar = ({ domains }: Props) => {
  const { expand, onExpand, page, onSignOut } = useSidebar();

  return (
    <div
      className={cn(
        "bg-cream dark:bg-neutral-950 h-full w-[60px] fill-mode-forwards fixed z-10 md:relative",
        expand === undefined && "",
        expand === true ? "animate-open-sidebar" : "animate-close-sidebar"
      )}
    >
      {expand ? (
        <MaxMenu
          domains={domains}
          current={page!}
          onExpand={onExpand}
          onSignOut={onSignOut}
        />
      ) : (
        <MinMenu
          domains={domains}
          current={page!}
          onShrink={onExpand}
          onSignOut={onSignOut}
        />
      )}
    </div>
  );
};

export default SideBar;

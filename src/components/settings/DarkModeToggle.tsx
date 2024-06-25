"use client";
import React from "react";
import Section from "../section_lable/Section";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { SystemMode } from "../themes-placeholder/systemmode";
import { LightMode } from "../themes-placeholder/lightmode";
import { DarkMode } from "../themes-placeholder/darkmode";

type Props = {};

const DarkModeToggle = (props: Props) => {
  const { setTheme, theme } = useTheme();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mt-10">
      <div className="lg:col-span-1">
        <Section lable="InterFace Theme" message="Select you UI theme" />
      </div>

      <div className="lg:col-span-4 flex lg:flex-row flex-col items-start gap-5">
        <div className="flex flex-col gap-2">
          <h3 className={cn(
              "font-semibold",
              theme == "system" && "text-orange"
            )}>
            System Theme
          </h3>
          <div
            className={cn(
              "rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent",
              theme == "system" && "border-orange"
            )}
            onClick={() => setTheme("system")}
          >
            <SystemMode />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className={cn(
              "font-semibold dark:text-cream",
              theme == "light" && "text-orange"
            )}>
            Light Theme
          </h3>
          <div
            className={cn(
              "rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent",
              theme == "light" && "border-orange"
            )}
            onClick={() => setTheme("light")}
          >
            <LightMode />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3
            className={cn(
              "font-semibold text-slate-900",
              theme == "dark" && "text-orange"
            )}
          >
            Dark Theme
          </h3>
          <div
            className={cn(
              "rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent",
              theme == "dark" && "border-orange"
            )}
            onClick={() => setTheme("dark")}
          >
            <DarkMode />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DarkModeToggle;

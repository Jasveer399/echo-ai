import React from "react";

type Props = {
  title: string;
  value: number;
  icon: JSX.Element;
  sales?: boolean;
};

const DashBoardCard = ({ icon, value, title, sales }: Props) => {
  return (
    <div className="bg-cream rounded-lg flex flex-col gap-3 pr-10 py-10 md:pl-10 md:pr-20 shadow-lg md:w-fit w-full dark:bg-neutral-950">
      <div className="ml-5">
      <div className="flex gap-3 items-center justify-center">
        {icon}
        <h2 className="font-bold text-xl">{title}</h2>
      </div>
      <p className="font-bold text-xl">
        {sales && "$"}
        {value}
      </p>
      </div>
    </div>
  );
};

export default DashBoardCard;

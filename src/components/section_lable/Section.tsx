import React from "react";

type Props = {
  lable: string;
  message: string;
};

const Section = ({ lable, message }: Props) => {
  return (
    <div>
      <h1 className="text-[16px] font-semibold">{lable}</h1>
      <p className="text-sm font-light">{message}</p>
    </div>
  );
};

export default Section;

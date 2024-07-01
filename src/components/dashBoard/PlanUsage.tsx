import React from "react";
import { number } from "zod";
import ProgressBar from "./ProgressBar";

type Props = {
  plan: "STANDARD" | "PRO" | "ULTIMATE";
  credits: number;
  domains: number;
  client: number;
};

const PlanUsage = ({ client, credits, domains, plan }: Props) => {
  return (
    <div className="flex flex-col gap-5 py-5">
      <ProgressBar
        end={plan == "STANDARD" ? 10 : plan == "PRO" ? 50 : 500}
        lable="Contacts"
        credits={client}
      />
      <ProgressBar
        end={plan == "STANDARD" ? 1 : plan == "PRO" ? 2 : 100}
        lable="Domains"
        credits={domains}
      />
    </div>
  );
};

export default PlanUsage;

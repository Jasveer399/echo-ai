import { CheckCircle2Icon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import StripeConnect from "../settings/StripeConnect";

type Props = {
  type: string;
  connections: {
    [key in "stripe"]: boolean;
  };
};

const IntegrationModelBody = ({ connections, type }: Props) => {
  switch (type) {
    case "stripe":
      return (
        <div className="flex flex-col gap-2 mt-5">
          <h2 className="font-bold">
            Stripe would like to access
            {[
              "Payment and bank information",
              "Products and services you sell",
              "Business and tax information",
              "Create and update Products",
            ].map((item, key) => (
              <div key={key} className="flex gap-2 items-center pl-3 mt-2">
                <CheckCircle2Icon />
                <p className="font-normal">{item}</p>
              </div>
            ))}
            <div className="flex justify-between mt-10">
              <Button variant="outline">Learn more</Button>
              <StripeConnect connections={connections[type]} />
            </div>
          </h2>
        </div>
      );
    default:
      return null;
  }
};

export default IntegrationModelBody;

import React from "react";
import Model from "./Model";
import { Card } from "../ui/card";
import { CloudIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import IntegrationModelBody from "./IntegrationModelBody";

type Props = {
  name: "stripe";
  logo: string;
  title: string;
  description: string;
  connections: {
    [key in "stripe"]: boolean;
  };
};

const IntegrationsTrigger = ({
  connections,
  description,
  logo,
  name,
  title,
}: Props) => {
  return (
    <Model
      title={title}
      type="Integration"
      logo={logo}
      description={description}
      trigger={
        <Card className="px-3 py-2 cursor-pointer flex gap-2">
          <CloudIcon />
          {connections[name] ? "connected" : "connect"}
        </Card>
      }
    >
      <Separator orientation="horizontal" />
      <IntegrationModelBody connections={connections} type={name} />
    </Model>
  );
};

export default IntegrationsTrigger;

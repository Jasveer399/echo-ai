"use client";
import { INTEGRATION_LIST_ITEMS } from "@/contents/integration";
import React from "react";
import { Card, CardContent, CardDescription } from "../ui/card";
import Image from "next/image";
import IntegrationsTrigger from "./IntegrationsTrigger";

type Props = {
  connections: {
    stripe: boolean;
  };
};

const IntegrationList = ({ connections }: Props) => {
  return (
    <div className="flex-1 h-0 grid grid-cols-1 content-start lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {INTEGRATION_LIST_ITEMS.map((item) => (
        <Card key={item.id} className="max-w-[400px]">
          <CardContent className="flex flex-col p-5 gap-2">
            <div className="flex w-full justify-between items-start gap-x-4">
              <div>
                <div className="w-12 h-12 relative">
                  <Image
                    src={item.logo}
                    alt="Logo"
                    fill
                    sizes="100w"
                  />
                </div>
                <h2 className="font-bold capitalize">{item.name}</h2>
              </div>
              <IntegrationsTrigger
                name={item.name}
                logo={item.logo}
                title={item.title}
                description={item.modalDescription}
                connections={connections}
              />
            </div>
            <CardDescription>{item.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default IntegrationList;

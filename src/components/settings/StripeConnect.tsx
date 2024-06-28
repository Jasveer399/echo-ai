"use client";

import React from "react";
import { Button } from "../ui/button";
import { Loader } from "../loader";
import { useStripe } from "@/hooks/billing/use-billing";

type Props = {
  connections: boolean;
};

const StripeConnect = ({ connections }: Props) => {
  const { onStripeAcceptedPendind, onStripeConnect } = useStripe();
  return (
    <Button disabled={connections} onClick={onStripeConnect}>
      <Loader loading={onStripeAcceptedPendind}>
        {" "}
        {connections ? "Connected" : "Connect to stripe"}
      </Loader>
    </Button>
  );
};

export default StripeConnect;

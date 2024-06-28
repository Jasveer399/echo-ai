import { ongetStripeConnect } from "@/actions/settings";
import IntegrationList from "@/components/Integration/IntegrationList";
import Infobar from "@/components/infobar/infobar";
import React from "react";

type Props = {};

const Integration = async (props: Props) => {
  const payment = await ongetStripeConnect();
  const connections = {
    stripe: payment ? true : false,
  };
  return (
    <>
      <Infobar />
      <IntegrationList connections={connections} />
    </>
  );
};

export default Integration;

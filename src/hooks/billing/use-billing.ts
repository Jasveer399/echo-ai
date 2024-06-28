import axios from "axios";
import { useState } from "react";

export const useStripe = () => {
  const [onStripeAcceptedPendind, setOnStripeAcceptedPendind] =
    useState<boolean>(false);

  const onStripeConnect = async () => {
    try {
      setOnStripeAcceptedPendind(true);
      const account = await axios.get("/api/stripe/connect");
      console.log("Stripe account =>", account);
      if (account) {
        setOnStripeAcceptedPendind(false);
        if (account) {
          window.location.href = account.data.url;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    onStripeConnect,
    onStripeAcceptedPendind,
  };
};

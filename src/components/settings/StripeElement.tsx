'use client'
import { useStripeElemnt } from "@/hooks/billing/use-billing";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { Loader } from "../loader";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../forms/settings/PaymentForm";

type Props = {
  payment: "STANDARD" | "PRO" | "ULTIMATE";
};

const StripeElement = ({ payment }: Props) => {
  const StripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!);
  const { loading, stripeSecret } = useStripeElemnt(payment);

  return (
    stripeSecret &&
    StripePromise &&
    (payment == "PRO" || payment == "ULTIMATE") && (
      <Loader loading={loading}>
        <Elements
          stripe={StripePromise}
          options={{ clientSecret: stripeSecret }}
        />
        <PaymentForm plan={payment} />
      </Loader>
    )
  );
};

export default StripeElement;

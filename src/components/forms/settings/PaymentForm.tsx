"use client";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { useCompletePayment } from "@/hooks/billing/use-billing";
import { PaymentElement } from "@stripe/react-stripe-js";
import React from "react";

type Props = {
  plan: "STANDARD" | "PRO" | "ULTIMATE";
};

const PaymentForm = ({ plan }: Props) => {
  const { loading, onMakePayment } = useCompletePayment(plan);
  return (
    <form className="flex flex-col gap-5">
      <div>
        <h2 className="font-semibold text-xl text-black">Payment Method</h2>
        <CardDescription>Enter your card details</CardDescription>
      </div>
      <PaymentElement />
      <Button type="submit">
        <Loader loading={loading}>Pay</Loader>
      </Button>
    </form>
  );
};

export default PaymentForm;

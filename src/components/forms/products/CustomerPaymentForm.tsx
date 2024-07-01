'use client'
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { useColpleteCustomerPayent } from "@/hooks/billing/use-billing";
import { PaymentElement } from "@stripe/react-stripe-js";
import React from "react";

type Props = {
  onNext(): void;
};

const CustomerPaymentForm = ({ onNext }: Props) => {
  const {loading,onMakePayment} = useColpleteCustomerPayent(onNext);
  return (
    <div className="flex flex-col">
      <PaymentElement />
      <Button className="w-full mt-5" onClick={onMakePayment} type="submit">
        <Loader loading={loading}>Pay</Loader>
      </Button>
    </div>
  );
};

export default CustomerPaymentForm;

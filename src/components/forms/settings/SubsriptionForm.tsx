"use client";
import { Loader } from "@/components/loader";
import StripeElement from "@/components/settings/StripeElement";
import SubscriptionCard from "@/components/settings/SubscriptionCard";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/billing/use-billing";
import React from "react";

type Props = {
  plan: "STANDARD" | "PRO" | "ULTIMATE";
};

const SubsriptionForm = ({ plan }: Props) => {
  const { loading, onSetPayment, onUpdateTofreeTier, payment } =
    useSubscription(plan);
  return (
    <Loader loading={loading}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <SubscriptionCard
            title="STANDARD"
            description="Perfect if you're just getting Started With Echo AI"
            id="STANDARD"
            price="0"
            payment={payment}
            onPayment={onSetPayment}
          />
          <SubscriptionCard
            title="PRO"
            description="Perfect if you're just getting Started With Echo AI"
            id="PRO"
            price="0"
            payment={payment}
            onPayment={onSetPayment}
          />
          <SubscriptionCard
            title="ULTIMATE"
            description="Perfect if you're just getting Started With Echo AI"
            id="ULTIMATE"
            price="0"
            payment={payment}
            onPayment={onSetPayment}
          />
        </div>
        <StripeElement payment={payment} />
        {payment === "STANDARD" && (
          <Button onClick={onUpdateTofreeTier}>
            <Loader loading={loading}>Confirm</Loader>
          </Button>
        )}
      </div>
    </Loader>
  );
};

export default SubsriptionForm;

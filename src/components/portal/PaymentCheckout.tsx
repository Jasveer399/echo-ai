"use client";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useStripeCustomer } from "@/hooks/billing/use-billing";
import { Loader } from "../loader";
import { Card } from "../ui/card";
import { Elements } from "@stripe/react-stripe-js";
import Image from "next/image";
import CustomerPaymentForm from "../forms/products/CustomerPaymentForm";
type Props = {
  products:
    | {
        name: string;
        image: string;
        price: number;
      }[]
    | undefined;
  stripeId?: string;
  onBack(): void;
  onNext(): void;
  amount?: number;
};

const PaymentCheckout = ({
  products,
  onBack,
  onNext,
  amount,
  stripeId,
}: Props) => {
  const StripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!,
    {
      stripeAccount: stripeId!,
    }
  );

  const { loading, stripeSecert } = useStripeCustomer(amount!, stripeId!);
  return (
    <Loader loading={loading}>
      <div className="flex flex-col gap-5 justify-center">
        <div className="flex justify-center">
          <h2 className="text-4xl font-bold mb-5">Payment</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="col-span-1 border-r-2 pr-5 flex flex-col">
            <h2 className="text-3xl font-bold mb-5">${amount}</h2>
            {products?.length &&
              products.map((product, key) => (
                <Card key={key} className="w-full flex gap-2 p-3 mt-1">
                  <div className="w-2/12 aspect-square relative">
                    <Image src={product.image} alt="Product Image" fill />
                  </div>
                  <div className="flex-1 flex justify-between">
                    <p className="text-xl font-semibold">{product.name}</p>
                    <p className="text-2xl font-bold">${product.price}</p>
                  </div>
                </Card>
              ))}
          </div>
          <div>
            <div className="col-span-1 pl-5">
              {stripeSecert && StripePromise && (
                <Elements
                  stripe={StripePromise}
                  options={{ clientSecret: stripeSecert }}
                >
                  <CustomerPaymentForm onNext={onNext} />
                </Elements>
              )}
            </div>
          </div>
        </div>
      </div>
    </Loader>
  );
};

export default PaymentCheckout;

import { onGetSubscriptionPlan } from "@/actions/settings";
import React from "react";
import Section from "../section_lable/Section";
import { Card, CardContent, CardDescription } from "../ui/card";
import { CheckCircle2, Plus } from "lucide-react";
import { pricingCards } from "@/contents/price_data";
import Model from "../Integration/Model";
import SubsriptionForm from "../forms/settings/SubsriptionForm";
import Image from "next/image";

type Props = {};

const Billingsetting = async (props: Props) => {
  const plan = await onGetSubscriptionPlan();

  const palnfeatures = pricingCards.find(
    (card) => card.title.toUpperCase() === plan
  )?.features;

  if (!palnfeatures) {
    return;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
      <div className="lg:col-span-1">
        <Section
          lable="Billing Settings"
          message="Add payment information, upgrade and modify you plan"
        />
      </div>
      <div className="lg:col-span-2 flex justify-start lg:justify-center">
        <Model
          title="Choose A Plan"
          description="Tell us about youself! What do you do? Let's tailor your experience so it best suits you"
          trigger={
            plan && plan === "STANDARD" ? (
              <Card className="border-dashed bg-cream border-gray-400 w-full h-[270px] flex justify-center items-center cursor-pointer dark:bg-neutral-900 dark:shadow-neutral-950 dark:border-neutral-800">
                <CardContent className="flex gap-2 items-center">
                  <div className="rounded-full border-2 p-1">
                    <Plus className="text-gray-400" />
                  </div>
                  <CardDescription className="font-semibold">
                    Upgrade Plan
                  </CardDescription>
                </CardContent>
              </Card>
            ) : (
              <Image
                src={"/images/creditcard.png"}
                alt="creditcard Image"
                width={400}
                height={400}
              />
            )
          }
        >
          <SubsriptionForm plan={plan!} />
        </Model>
      </div>
      <div className="lg:col-span-2 shadow-md p-4 dark:bg-neutral-900 rounded-md dark:shadow-neutral-950">
        <h1 className="text-xl font-semibold mb-2">Current Plan</h1>
        <p className="text-[16px] font-semibold text-orange bg-slate-800 py-2 px-4 rounded w-[119px] dark:bg-cream dark:text-slate-900">
          {plan}
        </p>
        <div className="flex gap-2 flex-col mt-5 ml-2">
          {palnfeatures.map((feature) => (
            <div key={feature} className="flex gap-2">
              <CheckCircle2 />
              <p className="text-slate-900 dark:text-cream">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Billingsetting;

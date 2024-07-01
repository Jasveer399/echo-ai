import { OnGetCurrentDomainInfo } from "@/actions/settings";
import ProductTable from "@/components/Product/ProductTable";
import SettlingForm from "@/components/forms/settings/SettlingForm";
import BotTrainingForm from "@/components/forms/settings/bot-tranibg";
import Infobar from "@/components/infobar/infobar";
import { redirect } from "next/navigation";
import React from "react";

type Props = { params: { domain: string } };

const page = async ({ params }: Props) => {
  const domain = await OnGetCurrentDomainInfo(params.domain);
  if (!domain) {
    redirect("/dashboard");
  }

  return (
    <>
      <Infobar />
      <div className="overflow-auto w-full chat-window flex-1 h-0">
        <SettlingForm
          plan={domain.subscription?.plan!}
          chatBot={domain.domains[0].chatBot}
          id={domain.domains[0].id}
          name={domain.domains[0].name}
        />
        <BotTrainingForm id={domain.domains[0].id} />
        <ProductTable
          id={domain.domains[0].id}
          products={domain.domains[0].products || []}
        />
      </div>
    </>
  );
};

export default page;

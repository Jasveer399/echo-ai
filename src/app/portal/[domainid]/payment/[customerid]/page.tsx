import { onDomainCustomerResponse } from "@/actions/appointment";
import { onGetDomainAllprodutAndConnectId } from "@/actions/stripe";
import PortalForm from "@/components/forms/portal/portal-form";
import React from "react";

type Props = {
  params: { domainid: string; customerid: string };
};

const CustomerPaymentPage = async ({ params }: Props) => {
  const questions = await onDomainCustomerResponse(params.customerid);
  const products = await onGetDomainAllprodutAndConnectId(params.domainid);

  if (!questions) {
    return null;
  }
  return (
    <PortalForm
      email={questions.email!}
      domainid={params.domainid}
      customerId={params.customerid}
      questions={questions.questions}
      type="Payment"
      products={products?.products}
      amount={products?.amount}
      stripeId={products?.stripeId!}
    />
  );
};

export default CustomerPaymentPage;

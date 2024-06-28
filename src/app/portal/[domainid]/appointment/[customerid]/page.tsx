import {
  onDomainCustomerResponse,
  onGetAllDomainBooking,
} from "@/actions/appointment";
import PortalForm from "@/components/forms/portal/portal-form";
import React from "react";

type Props = {
  params: { domainid: string; customerid: string };
};

const CustomerSignUpForm = async ({ params }: Props) => {
  const bookings = await onGetAllDomainBooking(params.domainid);
  const questions = await onDomainCustomerResponse(params.customerid);
  if (!questions) {
    return null;
  }
  return (
    <PortalForm
      bookings={bookings}
      email={questions.email!}
      domainid={params.domainid}
      customerId={params.customerid}
      questions={questions.questions}
      type="Appointment"
    />
  );
};

export default CustomerSignUpForm;

"use client";
import PortalSteps from "@/components/portal/PortalSteps";
import { usePortal } from "@/hooks/portal/use-portal";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";

type PortalFormProps = {
  questions: {
    id: string;
    question: string;
    answered: string | null;
  }[];
  type: "Appointment" | "Payment";
  customerId: string;
  domainid: string;
  email: string;
  bookings?:
    | {
        date: Date;
        slot: string;
      }[]
    | undefined;
  products?:
    | {
        name: string;
        image: string;
        price: number;
      }[]
    | undefined;
  amount?: number;
  stripeId?: string;
};

const PortalForm = ({
  customerId,
  domainid,
  email,
  bookings,
  products,
  amount,
  stripeId,
  questions,
  type,
}: PortalFormProps) => {
  const {
    step,
    onNext,
    onPrev,
    register,
    errors,
    date,
    setDate,
    onBookAppointment,
    onSelectedTimeSlot,
    selectedSlot,
    loading,
  } = usePortal(customerId, domainid, email);

  useEffect(() => {
    if (questions.every((question) => question.answered)) {
      onNext();
    }
  }, [questions]);
  return (
    <form
      onSubmit={onBookAppointment}
      className="h-full flex flex-col gap-10 justify-center"
    >
      <PortalSteps
        loading={loading}
        slot={selectedSlot}
        bookings={bookings}
        onSlot={onSelectedTimeSlot}
        date={date}
        onBooking={setDate}
        step={step}
        type={type}
        questions={questions}
        error={errors}
        register={register}
        onNext={onNext}
        products={products}
        onBack={onPrev}
        amount={amount}
        stripeId={stripeId}
      />
      {(step == 1 || step == 2) && (
        <div className="w-full flex justify-center">
          <div className="w-[400px] grid grid-cols-2 gap-3">
            <div
            onClick={()=>onPrev()}
              className={cn(
                "rounded-full h-2 col-span-1 cursor-pointer",
                step == 1 ? "bg-orange" : "bg-platinum"
              )}
            ></div>
            <div
            onClick={()=>onNext()}
              className={cn(
                "rounded-full h-2 col-span-1 cursor-pointer",
                step == 2 ? "bg-orange" : "bg-platinum"
              )}
            ></div>
          </div>
        </div>
      )}
    </form>
  );
};

export default PortalForm;

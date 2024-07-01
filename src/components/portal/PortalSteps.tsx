import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import QuestionForm from "./QuestionForm";
import BookAppointmentData from "./BookAppointmentData";
import PaymentCheckout from "./PaymentCheckout";

type Props = {
  questions: {
    id: string;
    question: string;
    answered: string | null;
  }[];
  type: "Appointment" | "Payment";
  register: UseFormRegister<FieldValues>;
  error: FieldErrors<FieldValues>;
  onNext(): void;
  step: number;
  date: Date | undefined;
  onBooking: React.Dispatch<React.SetStateAction<Date | undefined>>;
  onBack(): void;
  onSlot(slot: string): void;
  slot?: string;
  loading: boolean;
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

const PortalSteps = ({
  date,
  error,
  loading,
  onBack,
  questions,
  onBooking,
  onNext,
  onSlot,
  register,
  step,
  type,
  amount,
  bookings,
  products,
  slot,
  stripeId,
}: Props) => {
  if (step == 1) {
    return (
      <QuestionForm
        register={register}
        error={error}
        onNext={onNext}
        questions={questions}
      />
    );
  }
  if (step == 3 && type == "Appointment") {
    return (
      <BookAppointmentData
        register={register}
        onBack={onBack}
        onSlot={onSlot}
        date={date}
        bookings={bookings}
        loading={loading}
        onBooking={onBooking}
        currentSlot={slot}
      />
    );
  }

  if (step == 2 && type == "Payment") {
    return (
      <PaymentCheckout
        products={products}
        stripeId={stripeId}
        onBack={onBack}
        onNext={onNext}
        amount={amount}
      />
    );
  }
  return (
    <div className="flex flex-col items-center gap-3">
      <h2 className="font-bold text-gray-600 text-4xl">Thank You</h2>
      <p className="text-center">
        Thank you for taking the time to fill in this form. We look forward to
        <br /> speaking to you soon.
      </p>
    </div>
  );
};

export default PortalSteps;

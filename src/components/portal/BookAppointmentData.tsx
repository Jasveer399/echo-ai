import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { Card, CardDescription } from "../ui/card";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { AppointmentTimeSlotTypeList } from "@/contents/timeslot";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader } from "../loader";

type Props = {
  date: Date | undefined;
  onBooking: React.Dispatch<React.SetStateAction<Date | undefined>>;
  onBack(): void;
  register: UseFormRegister<FieldValues>;
  onSlot(slot: string): void;
  currentSlot?: string;
  loading: boolean;
  bookings:
    | {
        date: Date;
        slot: string;
      }[]
    | undefined;
};

const BookAppointmentData = ({
  bookings,
  date,
  loading,
  onBack,
  onBooking,
  onSlot,
  register,
  currentSlot,
}: Props) => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <div className="flex justify-center">
        <h2 className="text-4xl font-bold mb-5">Book a Meeting</h2>
      </div>
      <div className="flex gap-10 flex-col sm:flex-row">
        <div className="w-[300px]">
          <h6>Discovey Cell</h6>
          <CardDescription>
            During this call, we aim to explore potential avenues for
            partnership, promotional opportunities, or any other means through
            which we can contribute to the success of your company.X
          </CardDescription>
        </div>
        <div className="sm:max-w-[280px]">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onBooking}
            className="rounded-md border"
          />
        </div>
        <div className="flex flex-col gap-5">
          {AppointmentTimeSlotTypeList.map((slot, key) => (
            <Label htmlFor={`slot-${key}`} key={key}>
              <Card
                onClick={() => onSlot(slot.slot)}
                className={cn(
                  currentSlot == slot.slot ? "bg-orange" : "bg-peach",
                  "px-10 py-4",
                  bookings &&
                    bookings.some(
                      (booking) =>
                        `${booking.date.getDate()}/${booking.date.getMonth()}` ===
                          `${date?.getDate()}/${date?.getMonth()}` &&
                        booking.slot == slot.slot
                    )
                    ? "bg-platinum"
                    : "cursor-pointer border-orange hover:bg-grandis transition duration-150 ease-in-out"
                )}
              >
                <Input
                  {...(bookings &&
                  bookings.some(
                    (booking) =>
                      booking.date == date && booking.slot == slot.slot
                  )
                    ? {
                        disabled: true,
                      }
                    : {
                        disabled: false,
                      })}
                  className="hidden"
                  type="radio"
                  value={slot.slot}
                  {...register('slot')}
                  id={`slot-${key}`}
                />
                {slot.slot}
              </Card>
            </Label>
          ))}
        </div>
      </div>
      <div className="flex gap-5">
        <Button
          className=" bg-gray-200 hover:bg-gray-100 shadow-2xl text-black"
          onClick={onBack}
          type="button"
        >
          EditQuestions
        </Button>
        <Button>
          <Loader loading={loading}>Book Now</Loader>
        </Button>
      </div>
    </div>
  );
};

export default BookAppointmentData;

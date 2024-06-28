import { onGelAllBookingsForCuurentUser } from "@/actions/appointment";
import AllAppPointment from "@/components/appointment/AllPointment";
import AllPointment from "@/components/appointment/AllPointment";
import Infobar from "@/components/infobar/infobar";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@clerk/nextjs";
import { AvatarFallback } from "@radix-ui/react-avatar";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const user = await currentUser();
  if (!user) return null;
  const domainbookings = await onGelAllBookingsForCuurentUser(user.id);
  const today = new Date();

  if (!domainbookings) {
    <div className="w-full h-full flex justify-center items-center">
      <h2 className="bg-orange py-3 px-4 font-bold text-lg text-black">
        No Appointments
      </h2>
    </div>;
  }
  const todaysAppointmrnts = domainbookings?.bookings.filter(
    (booking) => booking.date.getTime() === today.getTime()
  );
  return (
    <>
      <Infobar />
      <div className="grid grid-cols-1 lg:grid-cols-3 flex-1 h-0 gap-5">
        <div className="lg:col-span-2 overflow-y-auto">
          <AllAppPointment bookings={domainbookings?.bookings} />
        </div>
        <div className="col-span-1">
          {todaysAppointmrnts?.length ? (
            todaysAppointmrnts.map((booking) => (
                <Card key={booking.id} className="rounded-xl overflow-hidden my-5">
                <CardContent className="p-0 flex">
                  <div className="w-4/12 text-xl bg-grandis py-10 flex justify-center items-center font-bold">
                    {booking.slot}
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-center w-full p-3">
                      <p className="text-sm mr-4">
                        Created <br />
                        {booking.createdAt.getHours()}
                        {":"}
                        {booking.createdAt.getMinutes()}{" "}
                        {booking.createdAt.getHours() > 12 ? "PM" : "AM"}
                      </p>
                      <Separator orientation="vertical"/>
                      <p className="text-sm ml-4">
                        Domain <br />
                        {booking.Customer?.Domain?.name}
                      </p>
                    </div>
                    <Separator orientation="horizontal" />
                    <div className="w-full flex items-center p-3 gap-2 justify-center">
                      <p className="text-sm">{booking.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default page;

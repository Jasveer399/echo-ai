import React from "react";
import DataTable from "./DataTable";
import { APPOINTMENT_TABLE_HEADER } from "@/contents/manu";
import { TableCell, TableRow } from "../ui/table";
import { getMonthName } from "@/lib/utils";
import { CardDescription } from "../ui/card";

type Props = {
  bookings:
    | {
        Customer: {
          Domain: {
            name: string;
          } | null;
        } | null;
        id: string;
        email: string;
        domainId: string | null;
        date: Date;
        slot: string;
        createdAt: Date;
      }[]
    | undefined;
};

const AllAppPointment = ({ bookings }: Props) => {
  return (
    <DataTable header={APPOINTMENT_TABLE_HEADER}>
      {bookings ? (
        bookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell>{booking.email}</TableCell>
            <TableCell>
              <div>
                {getMonthName(booking.date.getMonth())} {booking.date.getDate()}{" "}
                {booking.date.getFullYear()}
              </div>
              <div className="uppercase">{booking.slot}</div>
            </TableCell>
            <TableCell>
              <div>
                {booking.createdAt.getHours()}{":"}
                {booking.createdAt.getMinutes()}{" "}
                {booking.createdAt.getHours() > 12 ? "PM" : "AM"}
              </div>
            </TableCell>
            <TableCell className="text-right">
              {booking.Customer?.Domain?.name}
            </TableCell>
          </TableRow>
        ))
      ) : (
        <CardDescription className="text-lg">No Appointment</CardDescription>
      )}
    </DataTable>
  );
};

export default AllAppPointment;
0;

"use server";

import { client } from "@/lib/prisma";

export const onDomainCustomerResponse = async (customerId: string) => {
  console.log("customerId=>", customerId);
  try {
    const customerquestions = await client.customer.findUnique({
      where: {
        id: customerId,
      },
      select: {
        email: true,
        questions: {
          select: {
            id: true,
            question: true,
            answered: true,
          },
        },
      },
    });
    if (customerquestions) {
      return customerquestions;
    }
  } catch (error) {
    console.log(error);
  }
};

export const onGetAllDomainBooking = async (domainId: string) => {
  try {
    const bookings = await client.bookings.findMany({
      where: {
        domainId,
      },
      select: {
        slot: true,
        date: true,
      },
    });
    if (bookings) {
      return bookings;
    }
  } catch (error) {
    console.log(error);
  }
};

export const onBookNewAppointment = async (
  domainId: string,
  customerId: string,
  slot: string,
  date: string,
  email: string
) => {
  try {
    const booking = await client.customer.update({
      where: {
        id: customerId,
      },
      data: {
        booking: {
          create: {
            domainId,
            slot,
            date,
            email,
          },
        },
      },
    });
    if (booking) {
      return { status: 200, message: "Booking Created" };
    }
  } catch (error) {
    console.log(error);
  }
};

export const saveAnswers = async (
  questions: [qusetion: string],
  customId: string
) => {
  try {
    for (const qus in questions) {
      await client.customer.update({
        where: {
          id: customId,
        },
        data: {
          questions: {
            update: {
              where: {
                id: qus,
              },
              data: {
                answered: questions[qus],
              },
            },
          },
        },
      });
    }
    return {
      status: 200,
      message: "Answers Saved",
    };
  } catch (error) {
    console.log(error);
  }
};

export const onGelAllBookingsForCuurentUser = async (clerkId: string) => {
  try {
    const bookings = await client.bookings.findMany({
      where: {
        Customer: {
          Domain: {
            User: {
              clerkId,
            },
          },
        },
      },
      select: {
        id: true,
        slot: true,
        createdAt: true,
        date: true,
        email: true,
        domainId: true,
        Customer: {
          select: {
            Domain: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    if (bookings) {
      return { bookings };
    }
  } catch (error) {
    console.log(error);
  }
};


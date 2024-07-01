"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  typescript: true,
  apiVersion: "2024-06-20",
});

export const getUserClient = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return;
    }
    const clients = await client.customer.count({
      where: {
        Domain: {
          User: {
            clerkId: user.id,
          },
        },
      },
    });
    if (clients) {
      return clients;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserSeles = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return;
    }
    const connecttoStripe = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        stripeId: true,
      },
    });

    if (connecttoStripe) {
      const transaction = await stripe.balance.retrieve({
        stripeAccount: connecttoStripe.stripeId!,
      });
      if (transaction) {
        const sales = transaction.pending.reduce((total, next) => {
          return total + next.amount;
        }, 0);

        return sales / 100;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserAppointment = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return;
    }
    const appointments = await client.bookings.count({
      where: {
        Customer: {
          Domain: {
            User: {
              clerkId: user.id,
            },
          },
        },
      },
    });

    if (appointments) {
      return appointments;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserPlan = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return;
    }
    const plan = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        _count: {
          select: {
            domains: true,
          },
        },
        subscription: {
          select: {
            plan: true,
            credits: true,
          },
        },
      },
    });
    if (plan) {
      return {
        plan: plan.subscription?.plan,
        credits: plan.subscription?.credits,
        domains: plan._count.domains,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserTotalProductPrice = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return;
    }
    const products = await client.product.findMany({
      where: {
        Domain: {
          User: {
            clerkId: user.id,
          },
        },
      },
      select: {
        price: true,
      },
    });

    if (products) {
      const total = products.reduce((total, next) => {
        return total + next.price;
      }, 0);

      return total;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserAllTranScetions = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return;
    }
    const connecttoStripe = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        stripeId: true,
      },
    });

    if (connecttoStripe) {
      const transaction = await stripe.charges.list({
        stripeAccount: connecttoStripe.stripeId!,
      });
      if (transaction) {
        return transaction;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

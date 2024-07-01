"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  typescript: true,
  apiVersion: "2024-06-20",
});

export const onGetDomainAllprodutAndConnectId = async (id: string) => {
  try {
    const connectAccount = await client.domain.findUnique({
      where: {
        id,
      },
      select: {
        User: {
          select: {
            stripeId: true,
          },
        },
      },
    });

    const products = await client.product.findMany({
      where: {
        domainId: id,
      },
      select: {
        price: true,
        name: true,
        image: true,
      },
    });

    if (products) {
      const totalAmount = products.reduce((current, next) => {
        return current + next.price;
      }, 0);
      return {
        products: products,
        amount: totalAmount,
        stripeId: connectAccount?.User?.stripeId,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export const onCreateCustomerPaymentIntent = async (
  amount: number,
  stripeId: string
) => {
  try {
    const paymentintent = await stripe.paymentIntents.create(
      {
        currency: "usd",
        amount: amount * 100,
        automatic_payment_methods: {
          enabled: true,
        },
      },
      { stripeAccount: stripeId }
    );

    if (paymentintent) {
      return { secret: paymentintent.client_secret };
    }
  } catch (error) {
    console.log(error);
  }
};

export const onUpdateSubscription = async (
  plan: "STANDARD" | "PRO" | "ULTIMATE"
) => {
  try {
    const user = await currentUser();
    if (!user) {
      return;
    }
    const update = await client.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        subscription: {
          update: {
            data: {
              plan,
              credits: plan == "PRO" ? 50 : plan == "ULTIMATE" ? 500 : 10,
            },
          },
        },
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });
    if (update) {
      return {
        status: 200,
        message: "subscription updated",
        plan: update.subscription?.plan,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const setPlanAmount = (item: "STANDARD" | "PRO" | "ULTIMATE") => {
  if (item == "PRO") {
    return 1500;
  }
  if (item == "ULTIMATE") {
    return 3500;
  }
  return 500;
};

export const onGetStripeClientSecret = async (
  item: "STANDARD" | "PRO" | "ULTIMATE"
) => {
  try {
    const amount = setPlanAmount(item);
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: amount,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    if (paymentIntent) {
      return { secret: paymentIntent.client_secret };
    }
  } catch (error) {
    console.log(error);
  }
};

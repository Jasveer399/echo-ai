import {
  onCreateCustomerPaymentIntent,
  onGetStripeClientSecret,
  onUpdateSubscription,
} from "@/actions/stripe";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  useElements,
  useStripe as useStripehook,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";

export const useStripe = () => {
  const [onStripeAcceptedPendind, setOnStripeAcceptedPendind] =
    useState<boolean>(false);

  const onStripeConnect = async () => {
    try {
      setOnStripeAcceptedPendind(true);
      const account = await axios.get("/api/stripe/connect");
      console.log("Stripe account =>", account);
      if (account) {
        setOnStripeAcceptedPendind(false);
        if (account) {
          window.location.href = account.data.url;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    onStripeConnect,
    onStripeAcceptedPendind,
  };
};

export const useStripeCustomer = (amount: number, stripeId: string) => {
  const [stripeSecert, setStripeSecret] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const onGetCustomerIntent = async (amount: number) => {
    try {
      setLoading(true);
      const intent = await onCreateCustomerPaymentIntent(amount, stripeId);
      if (intent) {
        setLoading(false);
        setStripeSecret(intent.secret!);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onGetCustomerIntent(amount);
  }, []);

  return {
    stripeSecert,
    loading,
  };
};

export const useColpleteCustomerPayent = (onNext: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const stripe = useStripehook();
  const elements = useElements();

  const onMakePayment = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return null;
    }
    try {
      setLoading(true);
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.HOST_URL}/dashboard`,
        },
        redirect: "if_required",
      });
      if (paymentIntent?.status === "succeeded") {
        toast({
          title: "Success",
          description: "Payment Complete",
        });
        onNext();
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    onMakePayment,
    loading,
  };
};

export const useSubscription = (plan: "STANDARD" | "PRO" | "ULTIMATE") => {
  const [loading, setLoading] = useState<boolean>(false);
  const [payment, setPayment] = useState<"STANDARD" | "PRO" | "ULTIMATE">(plan);
  const { toast } = useToast();
  const router = useRouter();

  const onUpdateTofreeTier = async () => {
    try {
      setLoading(true);
      const free = await onUpdateSubscription("STANDARD");
      if (free) {
        setLoading(false);
        toast({ title: "Success", description: free.message });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSetPayment = (payment: "STANDARD" | "PRO" | "ULTIMATE") => {
    setPayment(payment);
  };
  return {
    loading,
    onSetPayment,
    onUpdateTofreeTier,
    payment,
  };
};

export const useStripeElemnt = (payment: "STANDARD" | "PRO" | "ULTIMATE") => {
  const [loading, setLoading] = useState<boolean>(false);
  const [stripeSecret, setStripeSecret] = useState<string>("");

  const onBillingIntent = async (plan: "STANDARD" | "PRO" | "ULTIMATE") => {
    try {
      setLoading(true);
      const intent = await onGetStripeClientSecret(plan);
      console.log("Imtent Secret=>",intent?.secret);

      if (intent) {
        setLoading(false);
        setStripeSecret(intent?.secret!);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onBillingIntent(payment);
  }, []);

  return {
    loading,
    stripeSecret,
  };
};

export const useCompletePayment = (
  payment: "STANDARD" | "PRO" | "ULTIMATE"
) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const stripe = useStripehook();
  const elements = useElements();
  const router = useRouter();

  const onMakePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return null;
    }

    try {
      setLoading(true);
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.HOST_URL}/dashboard`,
        },
        redirect: "if_required",
      });
      if (error) {
        console.log(error);
      }

      if (paymentIntent?.status === "succeeded") {
        const plan = await onUpdateSubscription(payment);
        if (plan) {
          toast({
            title: "Success",
            description: plan.message,
          });
        }
      }
      setLoading(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    loading,
    onMakePayment,
  };
};

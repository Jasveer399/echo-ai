'use client'
import { oncomleleUserRegistration } from "@/actions/auth";
import { useToast } from "@/components/ui/use-toast";
import {
  UserRegistrationProps,
  UserRegistrationSchema,
} from "@/schemas/auth.schema";
import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export const useSignUpform = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const { signUp, isLoaded, setActive } = useSignUp();
  const router = useRouter();

  const mathods = useForm<UserRegistrationProps>({
    resolver: zodResolver(UserRegistrationSchema),
    defaultValues: {
      type: "owner",
    },
    mode: "onChange",
  });

  const onGenerateOtp = async (
    email: string,
    password: string,
    onNext: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (!isLoaded) return

    try {
      await signUp.create({
        emailAddress: email,
        password: password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      onNext((prev) => prev + 1)
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.errors[0].longMessage,
      })
    }
  }

  const onHandelSubmit = mathods.handleSubmit(
    async (values: UserRegistrationProps) => {
      if (!isLoaded) {
        return;
      }
      try {
        setLoading(true);
        const comleteSignUp = await signUp.attemptEmailAddressVerification({
          code: values.otp,
        });
        if (comleteSignUp.status !== "complete") {
          return { message: "SomeThing Went Wrong!" };
        }
        if (comleteSignUp.status === "complete") {
          if (!signUp.createdUserId) {
            return;
          }
          const registered = await oncomleleUserRegistration(
            values.fullname,
            signUp.createdUserId,
            values.type
          );

          if (registered?.status == 200 && registered.user) {
            await setActive({
              session: comleteSignUp.createdSessionId,
            });
            setLoading(false);
            router.replace("/dashboard");
          }
          
          if (registered?.status === 400) {
            toast({
              title: "Error",
              description: "Something went wrong",
            });
          }
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
        });
      }
    }
  );
  return {
    mathods,
    onGenerateOtp,
    onHandelSubmit,
    loading,
  };
};

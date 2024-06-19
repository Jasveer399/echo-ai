'use client'
import { Loader } from "@/components/loader";
import { AuthContextProvider } from "@/context/use-authcontex";
import { useSignUpform } from "@/hooks/sign-up/use-sihm-up";
import React from "react";
import { FormProvider } from "react-hook-form";

type Props = {
  children: React.ReactNode;
};

const SignupFormProviderr = ({ children }: Props) => {
  const { mathods, onHandelSubmit, loading } = useSignUpform();
  return (
    <AuthContextProvider>
      <FormProvider {...mathods}>
        <form onSubmit={onHandelSubmit} className="h-full">
          <div className="flex flex-col justify-center gap-3 h-full">
            <Loader loading={loading}>{children}</Loader>
          </div>
        </form>
      </FormProvider>
    </AuthContextProvider>
  );
};

export default SignupFormProviderr;

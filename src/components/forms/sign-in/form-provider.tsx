"use client";
import { Loader } from "@/components/loader";
import { AuthContextProvider } from "@/context/use-authcontex";
import { userSignInForm } from "@/hooks/sign-in/use-sign-in";
import React from "react";
import { FormProvider } from "react-hook-form";

type Props = {
  children: React.ReactNode;
};

const SignInFormProvider = ({ children }: Props) => {
  const { mathods, loading, onHandelSubmit } = userSignInForm();
  console.log(loading);
  return (
    <div>
      <AuthContextProvider>
        <FormProvider {...mathods}>
          <form className="h-full" onSubmit={onHandelSubmit}>
            <div className="flex flex-col justify-center gap-3 h-full">
              <Loader loading={loading}>{children}</Loader>
            </div>
          </form>
        </FormProvider>
      </AuthContextProvider>
    </div>
  );
};

export default SignInFormProvider;

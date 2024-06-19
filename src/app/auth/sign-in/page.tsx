import SignInFormProvider from "@/components/forms/sign-in/form-provider";
import LoginForm from "@/components/forms/sign-in/login-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Props = {};

const SignIn = (props: Props) => {
  return (
    <div className="flex-1 md:pl-14 px-10  w-full">
      <div className="flex flex-col h-full gap-3">
        <SignInFormProvider>
          <div className="flex flex-col gap-3">
            <LoginForm />
            <div className="w-full flex flex-col gap-3 items-center">
              <Button className="w-full" type="submit">
                Submit
              </Button>
              <p>
                Don't have an Account?{" "}
                <Link href="/auth/sign-up" className="font-bold">
                  Create One
                </Link>
              </p>
            </div>
          </div>
        </SignInFormProvider>
      </div>
    </div>
  );
};

export default SignIn;

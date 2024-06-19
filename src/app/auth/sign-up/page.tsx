import ButtonHandler from "@/components/forms/sign-up/button-handler";
import SignupFormProviderr from "@/components/forms/sign-up/form-provider";
import HighLightBar from "@/components/forms/sign-up/highLightBar";
import RegistartionFormStep from "@/components/forms/sign-up/registration-step";
import React from "react";

type Props = {};

const SignUp = (props: Props) => {
  return (
    <div className="flex-1 md:px-16 w-full">
      <div className="flex flex-col h-full gap-3">
        <SignupFormProviderr>
          <div className="flex flex-col gap-3 px-10 md:p-0 -mt-40 md:-mt-32">
            <RegistartionFormStep/>
            <ButtonHandler/>
          </div>
          <HighLightBar/>
        </SignupFormProviderr>
      </div>
    </div>
  );
};

export default SignUp;

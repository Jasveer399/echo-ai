"use client";

import { useAuthContextHook } from "@/context/use-authcontex";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import TypeSelectionForm from "./typeselectionForm";
import dynamic from "next/dynamic";
import { Spinner } from "@/components/spinner";

const DetailForm = dynamic(() => import("./acount-details-form"), {
  ssr: false,
  loading: () => <Spinner />,
});

const OtpForm = dynamic(() => import("./otp-form"), {
  ssr: false,
  loading: () => <Spinner />,
});

type Props = {};

const RegistartionFormStep = (props: Props) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  const { currentStep } = useAuthContextHook();
  const [onOtp, setOnOtp] = useState<string>("");
  const [onUserType, setOnUserType] = useState<"owner" | "student">("owner");

  setValue("otp", onOtp);

  switch (currentStep) {
    case 1:
      return (
        <TypeSelectionForm
          register={register}
          userType={onUserType}
          setUserType={setOnUserType}
        />
      );

    case 2:
      return <DetailForm register={register} errors={errors} />;

    case 3:
      return <OtpForm setOtp={setOnOtp} otp={onOtp} />;
  }

  return <div>RegistartionFormStep</div>;
};

export default RegistartionFormStep;

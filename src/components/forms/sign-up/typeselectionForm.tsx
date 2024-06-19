"use client";
import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import UsrtypeCard from "./user-type-card";

type Props = {
  register: UseFormRegister<FieldValues>;
  userType: "owner" | "student";
  setUserType: React.Dispatch<React.SetStateAction<"owner" | "student">>;
};

const TypeSelectionForm = ({ register, userType, setUserType }: Props) => {
  return (
    <>
      <h2 className="text-gravel md:text-4xl text-2xl font-bold">Create an Account</h2>
      <p className="text-iridium md:text-sm">
        Tell us about Yourself! what do you do? Let's tailor your
      </p> experience so it best suite you.
      <UsrtypeCard
        register={register}
        setUserType={setUserType}
        userType={userType}
        value="owner"
        title="i Own a Buisness"
        text="Setting up my account for my Conpany"
      />
      <UsrtypeCard
        register={register}
        setUserType={setUserType}
        userType={userType}
        value="student"
        title="i am a student"
        text="Looking to learn about the Tool"
      />
    </>
  );
};

export default TypeSelectionForm;

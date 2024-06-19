import { USER_REGISTRATION_FORM } from "@/contents/forms";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import FormGenertor from "../form-generator";

type Props = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

const AccountDeailsForm = ({ register, errors }: Props) => {
  return (
    <div className="mt-20">
      <h2 className="text-gravel md:text-4xl font-bold">Account details</h2>
      <p className="text-iridium md:text-sm">Enter your Email and Password</p>
      {USER_REGISTRATION_FORM.map((field) => (
        <FormGenertor
          key={field.id}
          {...field}
          errors={errors}
          register={register}
          name={field.name}
        />
      ))}
    </div>
  );
};

export default AccountDeailsForm;

"use client";

import { USER_LOGIN_FORM } from "@/contents/forms";
import React from "react";
import { useFormContext } from "react-hook-form";
import FormGenertor from "../form-generator";

type Props = {};

const LoginForm = (props: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <h2 className="text-gravel md:text-4xl font-bold">Login</h2>
      <p className="text-iridium md:text-sm">
        you will receive a one time password on this email
      </p>
      {USER_LOGIN_FORM.map((field) => (
        <FormGenertor
          key={field.id}
          {...field}
          errors={errors}
          register={register}
          name={field.name}
        />
      ))}
    </>
  );
};

export default LoginForm;

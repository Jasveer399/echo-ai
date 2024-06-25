"use client";
import { useChanhePasswodr } from "@/hooks/settings/use-settings";
import React from "react";
import Section from "../section_lable/Section";
import FormGenertor from "../forms/form-generator";
import { Button } from "../ui/button";
import { Loader } from "../loader";

type Props = {};

const ChangePassword = (props: Props) => {
  const { register, onChangePassword, loading, errors } = useChanhePasswodr();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mt-10 pb-10">
      <div className="lg:col-span-1">
        <Section lable="Change Password" message="Reset your password" />
      </div>

      <form onSubmit={onChangePassword} className="lg:col-span-4">
        <div className="flex flex-col gap-3 lg:w-[500px]">
          <FormGenertor
            register={register}
            errors={errors}
            name="Password"
            placholder="Enter New Password"
            type="password"
            inputType="input"
          />
          <FormGenertor
            register={register}
            errors={errors}
            name="ConfirmPassword"
            placholder="Enter Confirm Password"
            type="password"
            inputType="input"
          />

          <Button type="submit" className="bg-grandis text-gray-700 font-semibold hover:text-grandis hover:border-grandis border dark:bg-neutral-900 dark:border-none">
            <Loader loading={loading}>Change Password</Loader>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;

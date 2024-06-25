import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import FormGenertor from "../form-generator";

type Props = {
  name: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

const DomainUpdate = ({ name, register, errors }: Props) => {
  return (
    <div className="flex gap-2 pt-5 items-end w-[400px]">
      <FormGenertor
        register={register}
        errors={errors}
        name="domain"
        placholder={name}
        type="text"
        inputType="input"
        label="Domain Name "
      />
    </div>
  );
};

export default DomainUpdate;

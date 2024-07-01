"use client";
import React from "react";
import FormGenertor from "../form-generator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { register } from "module";
import { UploadIcon } from "lucide-react";
import { ErrorMessage } from "@hookform/error-message";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";
import { useProducts } from "@/hooks/settings/use-settings";

type Props = {
  id: string;
};

const CreateProductForm = ({ id }: Props) => {
  const { errors, loading, onCreateProduct, register } = useProducts(id);
  return (
    <form
      className="mt-3 w-full flex flex-col gap-5 py-10"
      onSubmit={onCreateProduct}
    >
      <FormGenertor
        inputType="input"
        register={register}
        label="Product Name"
        name="name"
        errors={errors}
        placholder="Your Product Name"
        type="text"
      />
      <div className="flex flex-col">
        <Label>Product Image</Label>
        <Label
          htmlFor="upload-product"
          className="flex gap-2 rounded-lg bg-peach text-gray-600 cursor-pointer font-semibold text-sm items-center w-full py-2 justify-center border border-dashed bottom-4 border-orange mt-2"
        >
          <Input
            {...register("image")}
            className="hidden"
            type="file"
            id="upload-product"
          />
          <UploadIcon/>
        </Label>
        <ErrorMessage
          errors={errors}
          name="image"
          render={({ message }) => (
            <p className="text-red-500">
              {message === "Required" ? "" : message}
            </p>
          )}
        />
      </div>
      <FormGenertor
        inputType="input"
        register={register}
        label="Product Price"
        name="price"
        errors={errors}
        placholder="0.00"
        type="text"
      />
      <Button className="w-full" type="submit">
        <Loader loading={loading}>Create Product</Loader>
      </Button>
    </form>
  );
};

export default CreateProductForm;

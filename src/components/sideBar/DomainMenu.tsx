import { useDomain } from "@/hooks/sidebar/use-domain";
import { cn } from "@/lib/utils";
import React from "react";
import AppDrawer from "../drawer";
import { Plus } from "lucide-react";
import { Loader } from "../loader";
import FormGenertor from "../forms/form-generator";
import UploadButton from "../upload-Button";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

type Props = {
  min?: boolean;
  domains:
    | {
        id: string;
        name: string;
        icon: string | null;
      }[]
    | null
    | undefined;
};

const DomainMenu = ({ min, domains }: Props) => {
  const { register, onAddDomain, loading, errors, isDomain, url } =
    useDomain();
  return (
    <div className={cn("flex flex-col gap-3", min ? "mt-6" : "mt-3")}>
      <div className="flex justify-between w-full items-center">
        {!min && <p className="text-xs text-gray-500">DOMAINS</p>}
        <AppDrawer
          description="add in your domain address to integrate your chatbot"
          title="Add your business domain"
          onOpen={
            <div className={`cursor-pointer text-gray-500 rounded-full hover:bg-white p-1 border  ${min && 'ml-2'}`}>
              <Plus />
            </div>
          }
        >
          <Loader loading={loading}>
            <form
              onSubmit={onAddDomain}
              className="mt-3 w-6/12 flex flex-col gap-3"
            >
              <FormGenertor
                inputType="input"
                register={register}
                label="Domain"
                name="domain"
                errors={errors}
                placholder="mydomain.com"
                type="text"
              />

              <UploadButton
                register={register}
                label="Uplaod Icon"
                errors={errors}
              />

              <Button type="submit" className="w-full">
                Add Domain
              </Button>
            </form>
          </Loader>
        </AppDrawer>
      </div>
      <divclassName={`flex flex-col gap-1 text-ironside font-medium`}>
        {domains &&
          domains.map((domain) => (
            <Link
              href={`settings/${domain.name.split(".")[0]}`}
              key={domain.id}
              className={cn(
                "flex gap-3 items-center hover:bg-white rounded-lg transition duration-200 ease-in-out cursor-pointer",
                !min ? "p-2" : "py-2",
                domain.name.split(".")[0] == isDomain && "bg-white"
              )}
            >
              <Image
                src={domain.icon!}
                alt="Logo"
                width={min?40:70}
                height={min?40:70}
              />
              {!min && <p className="texts">{domain.name}</p>}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default DomainMenu;

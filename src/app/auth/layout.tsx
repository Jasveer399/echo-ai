import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const user = await currentUser();

  if (user) redirect("/");
  return (
    <div className="h-screen w-full flex justify-center">
      <div className="w-[600px] flex-col  flex items-start p-0">
        <Image
          src="/images/logo.png"
          alt="Logo Image"
          sizes="100vw"
          className="mt-10 ml-16 mb-20"
          style={{ width: "30%", height: "auto" }}
          width={0}
          height={0}
        />
        {children}
      </div>
      <div className="hidden lg:flex flex-1 w-full max-h-full max-w-4000px overflow-hidden relative flex-col pt-10 pl-24 gap-3">
      <h2 className='text-gravel md:text-4xl font-bold'>Hi, I&apos;m AI Powered sales assistant, Echo!</h2>
        <p>
          Echo is capable of capturing lead information without a form...
          <br />
          Something never done before 😉
        </p>
        <Image
          src="/images/app-ui.png"
          alt="App Image"
          loading="lazy"
          sizes="20"
          className="absolute shrink-0 !w-[1600px] top-48 -mt-10"
          width={0}
          height={0}
        />
      </div>
    </div>
  );
};

export default Layout;

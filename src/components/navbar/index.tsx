"use client";
import Image from "next/image";
import * as React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Settings } from "lucide-react";

function NavBar() {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("/auth/sign-up"); // Redirect to home page or any other page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const gotosetting = ()=>{
    router.push("/settings")
  }
  return (
    <div className="flex gap-5 justify-between items-center px-7 py-1 font-bold border-b border-solid border-zinc-100 leading-[154.5%] max-md:flex-wrap max-md:px-5">
      <div className="flex gap-1.5 justify-center self-stretch my-auto text-2xl tracking-tighter text-neutral-700">
        <Image
          src="/images/logo.png"
          alt="LOGO"
          sizes="100vw"
          style={{
            width: "100px",
            height: "auto",
          }}
          width={0}
          height={0}
        />
      </div>
      <ul className="gap-5 justify-between self-stretch my-auto text-sm leading-5 text-neutral-700 max-md:flex-wrap max-md:max-w-full font-normal hidden md:flex">
        <li>Home</li>
        <li>Pricing</li>
        <li>News Room</li>
        <li>Features</li>
        <li>Contact us</li>
      </ul>
      <div className="gap-4 flex">
        <Link
          href="/settings"
          className="bg-orange hover:bg-orange/95 px-4 py-2 rounded-sm text-white"
        >
          Free Trial
        </Link>
        <Button
          onClick={gotosetting}
          className="bg-orange px-4 py-2 text-white font-bold hover:bg-orange/95"
        >
          Settings
        </Button>
      </div>
    </div>
  );
}

export default NavBar;

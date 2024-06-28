import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  trigger: React.ReactNode;
  children?: React.ReactNode;
  title: string;
  description: string;
  type?: "Integration";
  logo?: string;
};

const Model = ({
  children,
  description,
  title,
  trigger,
  logo,
  type,
}: Props) => {
  switch (type) {
    case "Integration":
      return (
        <Dialog>
          <DialogTrigger asChild>{trigger}</DialogTrigger>
          <DialogContent>
            <div className="flex justify-center gap-3">
              <div className="w-12 h-12 relative">
                <Image
                  src={
                    "https://res.cloudinary.com/dwak3dznr/image/upload/v1719578915/next-images/ccn6uujzl0dgcjgbsqtu.png"
                  }
                  alt="Echo"
                  fill
                />
              </div>
              <div className="text-gray-400">
                <ArrowLeft size={20} />
                <ArrowRight size={20} />
              </div>
              <div className="w-12 h-12 relative">
                  <Image
                    src={logo!}
                    alt="Logo"
                    fill
                    sizes="100w"
                  />
                </div>
            </div>
            <DialogHeader className="flex items-center">
              <DialogTitle className="text-xl">{title}</DialogTitle>
              <DialogDescription className="text-center">
                {description}
              </DialogDescription>
            </DialogHeader>
            {children}
          </DialogContent>
        </Dialog>
      );
    default:
      return (
        <Dialog>
          <DialogTrigger asChild>{trigger}</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl">{title}</DialogTitle>
              <DialogDescription className="text-center">
                {description}
              </DialogDescription>
            </DialogHeader>
            {children}
          </DialogContent>
        </Dialog>
      );
  }
};

export default Model;

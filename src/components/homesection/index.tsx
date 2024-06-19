import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { pricingCards } from "@/contents/price_data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Link from "next/link";

type Props = {};

const HomeSection = (props: Props) => {
  return (
    <>
      <div className="bg-orange w-20 items-center rounded-full h-[50%] mt-60 fixed ml-8 hidden md:flex flex-col gap-8">
          <Link href="#home" className="text-white font-bold hover:bg-white/15 shadow-lg rounded-lg py-1 px-2">Home</Link>
          <Link href="#price" className="text-white font-bold hover:bg-white/15 shadow-lg rounded-lg py-1 px-3">Price</Link>
      </div>
      <section id="home" className="">
        <div className="flex items-center justify-center flex-col mt-20 gap-8">
          <h1 className="text-orange bg-orange/20 px-4 py-2 rounded-full text-sm">
            An AI Powered slaes assistant chatbot
          </h1>
          <Image
            src="/images/echo.png"
            alt="EchoAI logo"
            width={500}
            height={100}
            className="max-w-lg object-contain"
          />
          <p className="text-center max-w-[500px]">
            Your AI powered sales assistant! Enbed Echo AI into any website
          </p>
          <Button className="bg-orange font-bold text-white px-4">
            Start For Free
          </Button>
          <Image
            src="/images/iphonecorinna.png"
            alt="EchoAI logo"
            width={400}
            height={100}
            className="max-w-lg max-h-[30rem] object-contain"
          />
        </div>
      </section>
      <section id="price" className="flex justify-center items-center flex-col gap-4 mt-10">
        <h2 className="text-4xl text-center">Choose what fits you right</h2>
        <p className="text-muted-foreground text-center max-w-lg">
          Our straightforward pricing plans are tailored to meet your needs. If
          {" you're"} not ready to commit you can get started for free.
        </p>
        <div className="flex flex-wrap mt-6 justify-center gap-6 mb-32">
          {pricingCards.map((card, index) => (
            <Card
              key={index}
              className={cn(
                "w-[300px] flex flex-col justify-between border-none shadow-lg gap-3",
                {
                  "border border-orange": card.title === "Ultimate",
                }
              )}
            >
              <CardHeader>
                <CardTitle className="text-orange">{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-4xl font-bold">{card.price}</span>
                <span className="text-muted-foreground">/month</span>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                <div>
                  {card.features.map((feature) => (
                    <div key={feature} className="flex gap-2">
                      <Check />
                      {feature}
                    </div>
                  ))}
                </div>
              </CardFooter>
              <Link
                href={`/dashbord?plan=${card.title}`}
                className="text-2xl text-white bg-orange text-center mx-8 mb-4 rounded-lg py-2 px-4 shadow-sm font-semibold"
              >
                Get Started
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
};

export default HomeSection;

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
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
import { Sidenavitem } from "@/contents/sidenav";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards"; // Ensure this is imported correctly
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { useUser } from "@clerk/nextjs";
import { toast } from "../ui/use-toast";
import axios from "axios";
import { Spinner } from "../spinner";
import UploadImage from "./UploadImage";

type itemProps = {
  quote: string;
  name: string;
  title: string;
  imageUrl: string;
};

type Props = {};

const HomeSection = (props: Props) => {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  const imageUrl = user?.imageUrl;

  const itemsRef = useRef<itemProps[]>([]);
  const [itemid, setItemId] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [commentsFetched, setCommentsFetched] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const handelSubmitComment = async () => {
    try {
      if (!name || !description) {
        toast({
          title: "Error",
          description: "Name and description are required",
        });
        return;
      }

      const response = await axios.post("/api/comments/add", {
        name,
        description,
        email,
        imageUrl,
      });

      if (response.data.status === 400) {
        toast({
          title: "Error",
          description: response.data.message,
        });
      } else if (response.data.status === 200) {
        toast({
          title: "Success",
          description: "Comment added successfully",
        });
        console.log(response.data);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
      });
    }
  };

  const getAllComments = async () => {
    try {
      const allCommentsResponse: any = await axios.get("/api/comments/get");
      if (!allCommentsResponse.data || !allCommentsResponse.data.data) {
        toast({
          title: "Error",
          description: "Failed to fetch comments",
        });
        return;
      }

      const allComments = allCommentsResponse.data.data;
      const com = allComments.map((item: any) => ({
        quote: item.description,
        name: item.name,
        title: item.title,
        imageUrl: item.imageUrl,
      }));

      itemsRef.current = com; // Update ref with fetched comments
      setCommentsFetched(true); // Update state to trigger re-render
      console.log(itemsRef.current);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
      });
    }
  };
  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <>
      <div className="bg-orange/40 w-96 items-center rounded-full h-10 bottom-5 left-[35%] fixed ml-8 hidden md:flex gap-8 justify-evenly z-10">
        {Sidenavitem.map((item) => (
          <Link
            key={item.id}
            href={item.link}
            className={`text-orange font-bold py-1 px-3 ${
              item.id === itemid ? "bg-white rounded-full" : ""
            }`}
            onClick={() => setItemId(item.id)}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <section id="home">
        <div className="flex items-center justify-center flex-col mt-20 gap-8">
          <h1 className="text-orange bg-orange/20 px-4 py-2 rounded-full text-sm">
            An AI Powered Sales Assistant Chatbot
          </h1>
          <Image
            src="/images/echo.png"
            alt="EchoAI logo"
            width={500}
            height={100}
            className="max-w-lg object-contain"
          />
          <p className="text-center max-w-[500px]">
            Your AI powered sales assistant! Embed Echo AI into any website
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
      <section
        id="price"
        className="flex justify-center items-center flex-col gap-4 mt-20"
      >
        <h2 className="text-4xl text-center font-bold">
          Choose What Fits You Right
        </h2>
        <p className="text-muted-foreground text-center max-w-lg">
          Our straightforward pricing plans are tailored to meet your needs. If
          you're not ready to commit, you can get started for free.
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
                href={`/dashboard?plan=${card.title}`}
                className="text-2xl text-white bg-orange text-center mx-8 mb-4 rounded-lg py-2 px-4 shadow-sm font-semibold"
              >
                Get Started
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section
        id="blogs"
        className="flex justify-center items-center flex-col gap-4 mt-20 p-20"
      >
        <div className="md:flex w-screen justify-center">
        <div className="absolute left-20">
        </div>
          <h2 className="text-4xl text-center font-bold">
            What People Are Saying
          </h2>
          <div className="absolute right-20">
            <Dialog>
              <DialogTrigger>
                <div className="bg-orange/80 hover:bg-orange/60 px-4 py-2 text-white rounded-lg font-semibold">
                  Say About Echo
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share Your Experience about Echo AI</DialogTitle>
                  <DialogDescription>
                    {user ? (
                      <div className="p-5 pl-0 flex flex-col justify-center">
                        <Label className="flex flex-col text-black gap-3">
                          Name
                          <Input onChange={(e) => setName(e.target.value)} />
                        </Label>
                        <Label className="flex mt-5 flex-col text-black gap-3">
                          Description
                          <Textarea
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </Label>
                        <Button
                          className="mt-5 bg-orange hover:bg-orange/90"
                          onClick={handelSubmitComment}
                        >
                          Submit
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <p className="text-2xl text-center text-black font-bold">
                          You are not signed in.
                          <Link href="/auth/sign-in" className="ml-2 underline">
                            Sign In
                          </Link>
                        </p>
                      </div>
                    )}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <p className="text-muted-foreground text-center max-w-lg">
          Don't just take our word for it. Here's what real people are saying
          about Echo AI.
        </p>
        <div className="mb-10">
          {commentsFetched && itemsRef.current.length > 0 ? (
            <>
              <InfiniteMovingCards
                items={itemsRef.current}
                direction="right"
                speed="slow"
              />
              <InfiniteMovingCards
                items={itemsRef.current}
                direction="left"
                speed="slow"
              />
            </>
          ) : (
            <div className="flex justify-center items-center">
              <Spinner />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default HomeSection;

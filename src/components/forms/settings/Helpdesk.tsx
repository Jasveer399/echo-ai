"use client";
import Section from "@/components/section_lable/Section";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useHelpDesk } from "@/hooks/settings/use-settings";
import React, { useEffect } from "react";
import FormGenertor from "../form-generator";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";
import Accordio from "@/components/accordion";
import ShowQuestion from "./ShowQuestion";

type Props = {
  id: string;
};

const Helpdesk = ({ id }: Props) => {
  const { register, errors, isQuestion, loading, onSubmitQuestion,onDeleteQuestion,deleting} =
    useHelpDesk(id);

  return (
    <Card className="w-full grid grid-cols-1 lg:grid-cols-2">
      <CardContent className="p-6 border-r-[1px]">
        <CardTitle>Help Desk</CardTitle>
        <form onSubmit={onSubmitQuestion} className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Section
              lable="Question"
              message="Add a question that you believe is frequently asked."
            />

            <FormGenertor
              inputType="input"
              register={register}
              errors={errors}
              form="help-desk-form"
              name="question"
              placholder="Type your question"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Section
              lable="Answer"
              message="The answer for the question above."
            />

            <FormGenertor
              inputType="textarea"
              register={register}
              errors={errors}
              form="help-desk-form"
              name="answer"
              placholder="Type your answer"
              type="text"
              lines={5}
            />
          </div>
          <Button className="bg-orange hover:bg-orange hover:opacity-90 transition duration-150 ease-in-out text-white font-semibold">
            Create
          </Button>
        </form>
      </CardContent>
      <ShowQuestion isQuestions={isQuestion} loading={loading} onDeleteQuestion={onDeleteQuestion} deleting={deleting} />
    </Card>
  );
};

export default Helpdesk;

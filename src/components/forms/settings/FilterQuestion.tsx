'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useFilterQuestion } from "@/hooks/settings/use-settings";
import React from "react";
import FormGenertor from "../form-generator";
import { Button } from "@/components/ui/button";
import Section from "@/components/section_lable/Section";
import { Loader } from "@/components/loader";

type Props = {
  id: string;
};

const FilterQuestion = ({ id }: Props) => {
  const { errors, isQuestions, loading, onAddFilterQuestions, register } =
    useFilterQuestion(id);
  return (
    <Card className="w-full grid grid-cols-1 lg:grid-cols-2">
      <CardContent className="p-6 border-r-[1px]">
        <CardTitle>Help Desk</CardTitle>
        <form onSubmit={onAddFilterQuestions} className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Section
              lable="Question"
              message="Add a question that you believe is frequently asked."
            />

            <FormGenertor
              inputType="input"
              register={register}
              errors={errors}
              form="filter-question-form"
              name="question"
              placholder="Type your question"
              type="text"
            />
          </div>
          <Button className="bg-orange hover:bg-orange hover:opacity-90 transition duration-150 ease-in-out text-white font-semibold">
            Create
          </Button>
        </form>
      </CardContent>
      <CardContent className="p-6 overflow-y-auto chat-window">
        <Loader loading={loading}>
          {isQuestions.length ? (
            isQuestions.map((question,index) => (
              <div className="flex gap-2">
                {`${index+1}.`}
                <p className="font-bold" key={question.id}>
                {question.question}
              </p>
              </div>
            ))
          ) : (
            <CardDescription>No Question</CardDescription>
          )}
        </Loader>
      </CardContent>
    </Card>
  );
};

export default FilterQuestion;

"use client";
import React from "react";
import Accordio from "@/components/accordion";
import { Loader } from "@/components/loader";
import { CardContent, CardDescription } from "@/components/ui/card";

type Props = {
  isQuestions: {
    id: string;
    question: string;
    answer: string;
  }[];
  loading: boolean;
  onDeleteQuestion: (id: string) => Promise<void>;
  deleting: boolean;
};

const ShowQuestion = ({ isQuestions, loading, onDeleteQuestion, deleting }: Props) => {
  return (
    <CardContent className="p-6 overflow-y-auto chat-window">
      <Loader loading={loading}>
        {isQuestions.length ? (
          isQuestions.map((question) => (
            <Accordio
              key={question.id}
              id={question.id}
              trigger={question.question}
              content={question.answer}
              onDeleteQuestion={onDeleteQuestion}
              deleting={deleting}
            />
          ))
        ) : (
          <CardDescription>No Question</CardDescription>
        )}
      </Loader>
    </CardContent>
  );
};

export default ShowQuestion;

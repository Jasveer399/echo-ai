import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import FormGenertor from "../forms/form-generator";
import { Button } from "../ui/button";

type Props = {
  questions: {
    id: string;
    question: string;
    answered: string | null;
  }[];
  register: UseFormRegister<FieldValues>;
  error: FieldErrors<FieldValues>;
  onNext(): void;
};

const QuestionForm = ({ questions, error, onNext, register }: Props) => {
  return (
    <div className="flex flex-col gap-5 justify-center">
      <div className="flex justify-center">
        <h2 className="text-4xl font-bold mb-5">Account Details</h2>
      </div>
      {questions.map((question) => (
        <FormGenertor
          key={question.id}
          name={`question-${question.id}`}
          errors={error}
          register={register}
          label={question.question}
          type="text"
          inputType="input"
          placholder={question.answered || "Ansered This Question"}
        />
      ))}
      <Button type="button" onClick={onNext} className="mt-5">
        Next
      </Button>
    </div>
  );
};

export default QuestionForm;

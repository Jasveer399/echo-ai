import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion as ShadcnAccordion,
} from "../ui/accordion";
import { Delete } from "lucide-react";
import { Loader } from "@/components/loader";

type Props = {
  trigger: string;
  content: string;
  id: string;
  onDeleteQuestion: (id: string) => Promise<void>;
  deleting: boolean;
};

const Accordio = ({ trigger, content, id, onDeleteQuestion, deleting }: Props) => {
  return (
    <ShadcnAccordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>{trigger}</AccordionTrigger>
        <AccordionContent>
          <div className="flex justify-between">
            {content}
            <div className="flex gap-2 h-8">
              <button
                onClick={() => onDeleteQuestion(id)}
                className="flex gap-2 bg-red-600 textw items-center px-2 rounded-md cursor-pointer hover:bg-red-600 hover:opacity-90"
              >
                <Delete className="text-white w-4 h-4" />
                <Loader loading={deleting}>
                  <span className="text-white text-sm">Delete</span>
                </Loader>
              </button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </ShadcnAccordion>
  );
};

export default Accordio;

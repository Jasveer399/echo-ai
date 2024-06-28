import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { cn } from "@/lib/utils";

type Props = {
  header: string[];
  children: React.ReactNode;
};

const DataTable = ({ header, children }: Props) => {
  return (
    <Table className="rounded-t-xl overflow-hidden">
      <TableHeader>
        <TableRow className="bg-grandis">
          {header.map((head, key) => (
            <TableHead
              key={key}
              className={cn(
                key == head.length - 1 && "text-right",
                "text-black"
              )}
            >
              {head}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  );
};

export default DataTable;

import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { getAllDefMatrix } from "@/lib/_matrix";
import DefMatrixForm from "./defMatrixForm";
import DelDefMatrix from "./delDefMatrix";

const DefMatrix = async () => {
  const imp = await getAllDefMatrix();

  //console.log("Def", imp);

  return (
    <div>
      <div className="bg-gray-500/10 dark:bg-teal-200/10   max-md:w-full  p-4 rounded-xl">
        <ScrollArea className="h-96">
          <DefMatrixForm openDialog={false} type="A" />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left mx-0 px-0">
                  <p className="flex justify-between">
                    <span>Label</span>
                  </p>
                </TableHead>
                <TableHead className="text-left mx-0 px-0">1</TableHead>
                <TableHead className="text-left mx-0 px-0">2</TableHead>
                <TableHead className="text-left mx-0 px-0">3</TableHead>
                <TableHead className="text-left mx-0 px-0">4</TableHead>
                <TableHead className="text-left mx-0 px-0">5</TableHead>
                <TableHead className="text-left mx-0 px-0">6</TableHead>
                <TableHead className="text-left mx-0 px-0">7</TableHead>
                <TableHead className="text-left mx-0 px-0">8</TableHead>
                <TableHead className="text-left mx-0 px-0">9</TableHead>
                <TableHead className="text-left mx-0 px-0">10</TableHead>

                <TableHead className="text-left mx-0 px-0">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {imp?.data?.map((ic: any) => (
                <TableRow key={ic.id}>
                  <TableCell className="text-left mx-0 px-0">
                    {ic.label}
                  </TableCell>
                  <TableCell className="text-left mx-0 px-0">{ic.y1}</TableCell>
                  <TableCell className="text-left mx-0 px-0">{ic.y2}</TableCell>
                  <TableCell className="text-left mx-0 px-0">{ic.y3}</TableCell>
                  <TableCell className="text-left mx-0 px-0">{ic.y4}</TableCell>
                  <TableCell className="text-left mx-0 px-0">{ic.y5}</TableCell>
                  <TableCell className="text-left mx-0 px-0">{ic.y6}</TableCell>
                  <TableCell className="text-left mx-0 px-0">{ic.y7}</TableCell>
                  <TableCell className="text-left mx-0 px-0">{ic.y8}</TableCell>
                  <TableCell className="text-left mx-0 px-0">{ic.y9}</TableCell>
                  <TableCell className="text-left mx-0 px-0">
                    {ic.y10}
                  </TableCell>

                  <TableCell className="flex  items-center gap-4 text-right  mx-0 px-0 hover:cursor-pointer">
                    <DefMatrixForm openDialog={false} type="U" defIn={ic} />
                    <DelDefMatrix id={ic.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
};

export default DefMatrix;

import React from "react";
import { ScrollArea } from "../../ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { getAllTransMatrix } from "@/lib/_matrix";
import { getAllFinOpts } from "@/lib/_finActions";
import Link from "next/link";

const BatchesList = async () => {
  const trans = await getAllFinOpts();

  // console.log("trans", trans?.data);

  return (
    <div>
      <ScrollArea className="h-96 bg-gray-500/10 dark:bg-teal-200/10   max-md:w-full  p-4 rounded-xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left mx-0 px-0">
                <p className="flex justify-between">
                  <span>Label</span>
                </p>
              </TableHead>
              <TableHead className="text-left mx-0 px-0">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trans?.data?.map((ic: any) => (
              <TableRow key={ic.id}>
                <TableCell className="text-left mx-0 px-0">
                  <Link href={`/anadette/anaopfin/${ic.code}`}>{ic.code}</Link>
                </TableCell>
                {/*                 <TableCell className="text-left mx-0 px-0">
                    {ic.AAA}
                  </TableCell> */}

                <TableCell className="flex  items-center gap-4 text-right  mx-0 px-0 hover:cursor-pointer">
                  {/*                     <TransMatrixForm openDialog={false} type="U" transIn={ic} />
                    <DelTransMatrix id={ic.id} /> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default BatchesList;

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
import { getAllCroissances } from "@/lib/_croissanceActions";
import TransMatrixForm from "@/components/matrix/transMatrixForm";
import ScenRefForm from "./scenRefForm";
/*import DelTransMatrix from "./delTransMatrix"; */

const ScenRef = async () => {
  const trans = await getAllCroissances();

  console.log("trans", trans);

  return (
    <div>
      <div className="bg-gray-500/10 dark:bg-teal-200/10   max-md:w-full  p-4 rounded-xl">
        <ScrollArea className="h-96">
          <ScenRefForm
            openDialog={false}
            type="A"
            label={"Scénario de référence"}
            hasSubType={false}
          />

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left mx-0 px-0">
                  <p className="flex justify-between">
                    <span>Label</span>
                  </p>
                </TableHead>
                <TableHead className="text-left mx-0 px-0">AAA</TableHead>
                <TableHead className="text-left mx-0 px-0">AA</TableHead>
                <TableHead className="text-left mx-0 px-0">A</TableHead>
                <TableHead className="text-left mx-0 px-0">BBB</TableHead>
                <TableHead className="text-left mx-0 px-0">BB</TableHead>
                <TableHead className="text-left mx-0 px-0">B</TableHead>
                <TableHead className="text-left mx-0 px-0">CCC/C</TableHead>
                <TableHead className="text-left mx-0 px-0">D</TableHead>
                <TableHead className="text-left mx-0 px-0">NR</TableHead>

                <TableHead className="text-left mx-0 px-0">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trans?.data?.map((ic: any) => (
                <TableRow key={ic.id}>
                  <TableCell className="text-left mx-0 px-0">
                    {ic.label}
                  </TableCell>
                  <TableCell className="text-left mx-0 px-0">
                    {ic.AAA}
                  </TableCell>
                  <TableCell className="text-left mx-0 px-0">{ic.AA}</TableCell>
                  <TableCell className="text-left mx-0 px-0">{ic.A}</TableCell>
                  <TableCell className="text-left mx-0 px-0">
                    {ic.BBB}
                  </TableCell>
                  <TableCell className="text-left mx-0 px-0">{ic.BB}</TableCell>
                  <TableCell className="text-left mx-0 px-0">{ic.B}</TableCell>
                  <TableCell className="text-left mx-0 px-0">
                    {ic.CCC_C}
                  </TableCell>
                  <TableCell className="text-left mx-0 px-0">{ic.D}</TableCell>
                  <TableCell className="text-left mx-0 px-0">{ic.NR}</TableCell>

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
    </div>
  );
};

export default ScenRef;

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
import { computeDebt, getAllCroissances } from "@/lib/_croissanceActions";
import TransMatrixForm from "@/components/matrix/transMatrixForm";
import ScenRefForm from "./scenRefForm";
/*import DelTransMatrix from "./delTransMatrix"; */

const ScenRef = async () => {
  const trans = await getAllCroissances();

  //console.log("trans", trans);

  const getDebt = async (cr: any) => {
    const res = await computeDebt(cr);
    //console.log("RES", res);
    if (res?.data) {
      return (res.data * 100).toFixed(2);
    } else return 0;
  };

  return (
    <div>
      <div className="flex flex-col gap-4 max-md:w-full">
        <ScrollArea className="h-96 rounded-xl bg-gray-500/10 dark:bg-teal-200/10 p-4  ">
          <>
            <ScenRefForm
              openDialog={false}
              type="A"
              scenario="1"
              label={"Scénario de référence"}
              hasSubType={false}
            />

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left mx-0 px-0">
                    <p className="flex justify-between">
                      <span>Année</span>
                    </p>
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Croissance
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0 font-semibold text-sky-600">
                    Dette Ext.
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Tx International
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">Spread</TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Tx Intérieur
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Inf. Nat
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Inf. Mon
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Solde Prim
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Exportations
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Importations
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Rendement
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Dette Int.
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Variation
                  </TableHead>

                  <TableHead className="text-left mx-0 px-0">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trans?.data
                  ?.filter((el: any) => el.scenario == 1)
                  ?.map((ic: any) => (
                    <TableRow key={ic.id}>
                      <TableCell className="text-left mx-0 px-0">
                        {ic.year}
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic.croissance} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0  font-semibold text-sky-600">
                        {getDebt(ic)} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic.txInternational} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic.creditSpread} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic.txInterieur} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic.infNat} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic.infMon} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic.soldePrim} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic.exportation} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic.inportation} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic.rendement} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic.invest} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic.debtIntPIB} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic.variantion} %
                      </TableCell>

                      <TableCell className="flex  items-center gap-4 text-right  mx-0 px-0 hover:cursor-pointer">
                        {/*                     <TransMatrixForm openDialog={false} type="U" transIn={ic} />
                    <DelTransMatrix id={ic.id} /> */}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </>
        </ScrollArea>

        <ScrollArea className="h-96 rounded-xl  bg-gray-500/10 dark:bg-teal-200/10 p-4  ">
          <>
            <ScenRefForm
              openDialog={false}
              type="B"
              label={"Scénario de référence"}
              hasSubType={false}
            />

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left mx-0 px-0">
                    <p className="flex justify-between">
                      <span>Année</span>
                    </p>
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Croissance
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Dette Ext.
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Tx International
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">Spread</TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Tx Intérieur
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Inf. Nat
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Inf. Mon
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Solde Prim
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Exportations
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Importations
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Rendement
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Dette Int.
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Variation
                  </TableHead>

                  <TableHead className="text-left mx-0 px-0">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trans?.data?.map((ic: any) => (
                  <TableRow key={ic.id}>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.year}
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.croissance}
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.debtExtPIB}
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.txInternational}
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.creditSpread}
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.txInterieur}
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.infNat}
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.infMon}
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.soldePrim}
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.exportation}
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.inportation}
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.rendement}
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.invest}
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.debtIntPIB}
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.variantion}
                    </TableCell>

                    <TableCell className="flex  items-center gap-4 text-right  mx-0 px-0 hover:cursor-pointer">
                      {/*                     <TransMatrixForm openDialog={false} type="U" transIn={ic} />
                    <DelTransMatrix id={ic.id} /> */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        </ScrollArea>

        <ScrollArea className="h-96 rounded-xl   bg-gray-500/10 dark:bg-teal-200/10 p-4  ">
          <>
            <ScenRefForm
              openDialog={false}
              type="C"
              label={"Scénario de référence"}
              hasSubType={false}
            />

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left mx-0 px-0">
                    <p className="flex justify-between">
                      <span>Année</span>
                    </p>
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Croissance
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Dette Ext.
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Tx International
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">Spread</TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Tx Intérieur
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Inf. Nat
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Inf. Mon
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Solde Prim
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Exportations
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Importations
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Rendement
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Dette Int.
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">
                    Variation
                  </TableHead>

                  <TableHead className="text-left mx-0 px-0">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trans?.data?.map((ic: any) => (
                  <TableRow key={ic.id}>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.year}
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.croissance}
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.debtExtPIB}
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.txInternational}
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.creditSpread}
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.txInterieur}
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.infNat}
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.infMon}
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.soldePrim}
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.exportation}
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.inportation}
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.rendement}
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.invest}
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.debtIntPIB}
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.variantion}
                    </TableCell>

                    <TableCell className="flex  items-center gap-4 text-right  mx-0 px-0 hover:cursor-pointer">
                      {/*                     <TransMatrixForm openDialog={false} type="U" transIn={ic} />
                    <DelTransMatrix id={ic.id} /> */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ScenRef;

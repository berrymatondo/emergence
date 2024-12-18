"use client";
import React, { ChangeEvent, useState } from "react";
import { ScrollArea } from "../../ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  computeCroissance,
  computeDebt,
  getAllCroissances,
  getCroissancesByYear,
} from "@/lib/_croissanceActions";
import TransMatrixForm from "@/components/matrix/transMatrixForm";
import ScenRefForm from "./scenRefForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
/*import DelTransMatrix from "./delTransMatrix"; */

type ScenRefProps = {
  scenRef: any;
  croisAcc: any;
  recLeg: any;
  recSev: any;
  chocLeg: any;
  chocSev: any;
};
const ScenRef = ({
  scenRef,
  croisAcc,
  recLeg,
  recSev,
  chocLeg,
  chocSev,
}: any) => {
  const [scen, setScen] = useState(scenRef);
  const [crois, setCrois] = useState(croisAcc);
  const [rl, setRl] = useState(recLeg);
  const [rs, setRs] = useState(recSev);
  const [cl, setCl] = useState(chocLeg);
  const [cs, setCs] = useState(chocSev);
  const [crois1, setCrois1] = useState<any>(4.7);
  const [crois2, setCrois2] = useState<any>(5.7);
  const [crois3, setCrois3] = useState<any>(5.2);
  const [crois4, setCrois4] = useState<any>(5.8);
  const [crois5, setCrois5] = useState<any>(4.4);

  const formAction = async (formData: FormData) => {
    let tt: any = [];
    let tt1: any = [];
    let tt3: any = [];
    let tt4: any = [];
    let tt5: any = [];
    let tt6: any = [];
    for (let i = 0; i < scenRef.length; i++) {
      // First YEAR (example: 2018...)
      //console.log("scenRef", scenRef);
      /*       console.log(
        "scenRef",
        scenRef?.find((x: any) => x.year == scenRef[i]?.year)
      ); */

      const res0 = await computeDebt(
        scenRef[i]?.year, // annee
        formData.get(scenRef[i]?.year), // croissance
        scenRef?.find((x: any) => x.year == scenRef[i]?.year) //tableau
      );

      // console.log("res0", res0);

      const fnd0 = scenRef?.find((el: any) => el?.year == scenRef[i]?.year);
      if (fnd0 != null) {
        fnd0.data.debtExtPIB = res0?.data ? res0?.data : 0;
        fnd0.data.croissance =
          i == 0
            ? crois1
            : i == 1
            ? crois2
            : i == 2
            ? crois3
            : i == 3
            ? crois4
            : i == 4
            ? crois5
            : 0;
      }

      //console.log("res0?.data", res0?.data);
      const x = await getCroissancesByYear(recLeg[i]?.year, 1);
      const ret0 = await computeCroissance(
        scenRef[i]?.year,
        res0?.data,
        x?.data
      );

      // console.log("ret0", ret0);

      if (ret0?.data) {
        const fnd1 = croisAcc?.find((el: any) => el?.year == croisAcc[i]?.year);
        if (fnd1 != null) {
          fnd1.data.debtExtPIB = res0?.data ? res0?.data : 0;
          const y = await getCroissancesByYear(recLeg[i]?.year, 2);
          const ret1 = await computeCroissance(
            croisAcc[i]?.year,
            res0?.data,
            y?.data
          );

          fnd1.data.croissance = ret1?.data;
        }

        const fnd2 = recLeg?.find((el: any) => el?.year == recLeg[i]?.year);
        if (fnd2 != null) {
          fnd2.data.debtExtPIB = res0?.data ? res0?.data : 0;
          const y = await getCroissancesByYear(recLeg[i]?.year, 3);
          //  console.log("y", y?.data);

          const ret2 = await computeCroissance(
            recLeg[i]?.year,
            res0?.data,
            y?.data
          );

          //console.log("do,", recLeg[i]?.year, res0?.data);

          fnd2.data.croissance = ret2?.data;
        }

        const fnd3 = recSev?.find((el: any) => el?.year == recSev[i]?.year);
        if (fnd3 != null) {
          fnd3.data.debtExtPIB = res0?.data ? res0?.data : 0;
          const y = await getCroissancesByYear(recLeg[i]?.year, 4);
          const ret3 = await computeCroissance(
            recSev[i]?.year,
            res0?.data,
            y?.data
          );

          fnd3.data.croissance = ret3?.data;
        }

        const fnd4 = chocLeg?.find((el: any) => el?.year == chocLeg[i]?.year);
        if (fnd4 != null) {
          fnd4.data.debtExtPIB = res0?.data ? res0?.data : 0;
          const y = await getCroissancesByYear(recLeg[i]?.year, 5);
          const ret4 = await computeCroissance(
            chocLeg[i]?.year,
            res0?.data,
            y?.data
          );

          fnd4.data.croissance = ret4?.data;
        }

        const fnd5 = chocSev?.find((el: any) => el?.year == chocSev[i]?.year);
        if (fnd5 != null) {
          fnd5.data.debtExtPIB = res0?.data ? res0?.data : 0;
          const y = await getCroissancesByYear(recLeg[i]?.year, 6);
          const ret5 = await computeCroissance(
            chocSev[i]?.year,
            res0?.data,
            y?.data
          );

          fnd5.data.croissance = ret5?.data;
        }
      }
      //console.log("ret0", ret0);

      tt = [...scenRef];
      setScen(tt);

      tt1 = [...croisAcc];
      setCrois(tt1);

      tt3 = [...recLeg];
      setRl(tt3);

      tt4 = [...recSev];
      setRs(tt4);

      tt5 = [...chocLeg];
      setCs(tt5);

      tt6 = [...chocSev];
      setCl(tt6);
    }
  };

  // console.log("crois", crois);

  return (
    <div>
      <div className="flex flex-col gap-4 max-md:w-full">
        <div className="p-2">
          <p className="text-xl px-2 font-semibold">
            Remplir les différents taux de croissance
          </p>
          <form action={formAction} className="flex gap-8 p-2">
            <div className="flex items-baseline gap-2">
              <p>{scenRef[0]?.year}</p>
              <Input
                value={crois1}
                onChange={(e: any) => setCrois1(e.target.value)}
                type="text"
                name={scenRef[0]?.year}
              />
            </div>
            <div className="flex items-baseline gap-2">
              <p>{scenRef[1]?.year}</p>
              <Input
                value={crois2}
                onChange={(e: any) => setCrois2(e.target.value)}
                type="text"
                name={scenRef[1]?.year}
              />
            </div>
            <div className="flex items-baseline gap-2">
              <p>{scenRef[2]?.year}</p>
              <Input
                value={crois3}
                onChange={(e: any) => setCrois3(e.target.value)}
                type="text"
                name={scenRef[2]?.year}
              />
            </div>
            <div className="flex items-baseline gap-2">
              <p>{scenRef[3]?.year}</p>
              <Input
                value={crois4}
                onChange={(e: any) => setCrois4(e.target.value)}
                type="text"
                name={scenRef[3]?.year}
              />
            </div>
            <div className="flex items-baseline gap-2">
              <p>{scenRef[4]?.year}</p>
              <Input
                value={crois5}
                onChange={(e: any) => setCrois5(e.target.value)}
                type="text"
                name={scenRef[4]?.year}
              />
            </div>
            <Button className="bg-sky-600 text-white" type="submit">
              Compute
            </Button>
          </form>
        </div>

        <ScrollArea className="h-96 rounded-xl  p-4  ">
          <>
            {/*             <ScenRefForm
              openDialog={false}
              type="A"
              scenario="1"
              label={"tt1"}
              hasSubType={false}
            />
 */}
            <p className="text-xl font-semibold text-sky-400">
              {"Scenario de référence"}
            </p>
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
                {scen
                  //   ?.filter((el: any) => el.scenario == 1)
                  ?.map((ic: any) => (
                    <TableRow key={ic.id}>
                      <TableCell className="text-left mx-0 px-0">
                        {ic.year}
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.croissance} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0  font-semibold text-sky-600">
                        {(ic?.data?.debtExtPIB * 100).toFixed(2)} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.txInternational} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.creditSpread} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.txInterieur} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.infNat} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.infMon} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.soldePrim} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.exportation} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.inportation} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.rendement} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.invest} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.debtIntPIB} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.variantion} %
                      </TableCell>

                      <TableCell className="flex  items-center gap-4 text-right  mx-0 px-0 hover:cursor-pointer"></TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </>
        </ScrollArea>

        <ScrollArea className="h-96 rounded-xl  p-4  ">
          <>
            <p className="text-xl font-semibold text-sky-400">
              {"Croissance accélérée"}
            </p>

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
                {crois?.map((ic: any) => (
                  <TableRow key={ic.id}>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.year}
                    </TableCell>
                    <TableCell
                      className={
                        +ic?.data?.croissance < 0
                          ? "text-left mx-0 px-0 text-red-400"
                          : "text-left mx-0 px-0 text-green-400"
                      }
                    >
                      {(ic?.data?.croissance * 100)?.toFixed(2)} %
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {(ic?.data?.debtExtPIB * 100)?.toFixed(2)} %
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic?.data?.txInternational} %
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic?.data?.creditSpread} %
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic?.data?.txInterieur} %
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic?.data?.infNat} %
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic?.data?.infMon} %
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic?.data?.soldePrim} %
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic?.data?.exportation} %
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic?.data?.inportation} %
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic?.data?.rendement} %
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic?.data?.invest} %
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic?.data?.debtIntPIB} %
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic?.data?.variantion} %
                    </TableCell>

                    <TableCell className="flex  items-center gap-4 text-right  mx-0 px-0 hover:cursor-pointer"></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        </ScrollArea>

        <Tabs defaultValue="legere" className="w-full  ">
          <TabsList className="w-full">
            <TabsTrigger value="legere">Récession Légère</TabsTrigger>
            <TabsTrigger value="severe"> Récession Sévère </TabsTrigger>
          </TabsList>
          <TabsContent value="legere" className="px-4">
            <ScrollArea className=" h-96 max-md:h-[20rem] pr-2">
              <p className="text-xl font-semibold text-sky-400">
                {"Récession Légère"}
              </p>

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
                    <TableHead className="text-left mx-0 px-0">
                      Spread
                    </TableHead>
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

                    <TableHead className="text-left mx-0 px-0">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rl?.map((ic: any) => (
                    <TableRow key={ic.id}>
                      <TableCell className="text-left mx-0 px-0">
                        {ic.year}
                      </TableCell>
                      <TableCell
                        className={
                          +ic?.data?.croissance < 0
                            ? "text-left mx-0 px-0 text-red-400"
                            : "text-left mx-0 px-0 text-green-400"
                        }
                      >
                        {(ic?.data?.croissance * 100)?.toFixed(2)} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {(ic?.data?.debtExtPIB * 100)?.toFixed(2)} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.txInternational} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.creditSpread} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.txInterieur} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.infNat} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.infMon} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.soldePrim} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.exportation} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.inportation} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.rendement} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.invest} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.debtIntPIB} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.variantion} %
                      </TableCell>

                      <TableCell className="flex  items-center gap-4 text-right  mx-0 px-0 hover:cursor-pointer"></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="severe" className="px-4">
            <ScrollArea className=" h-96 max-md:h-[20rem] pr-2">
              <p className="text-xl font-semibold text-sky-400">
                {"Récession Sévère"}
              </p>

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
                    <TableHead className="text-left mx-0 px-0">
                      Spread
                    </TableHead>
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

                    <TableHead className="text-left mx-0 px-0">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rs?.map((ic: any) => (
                    <TableRow key={ic.id}>
                      <TableCell className="text-left mx-0 px-0">
                        {ic.year}
                      </TableCell>
                      <TableCell
                        className={
                          +ic?.data?.croissance < 0
                            ? "text-left mx-0 px-0 text-red-400"
                            : "text-left mx-0 px-0 text-green-400"
                        }
                      >
                        {(ic?.data?.croissance * 100)?.toFixed(2)} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {(ic?.data?.debtExtPIB * 100)?.toFixed(2)} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.txInternational} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.creditSpread} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.txInterieur} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.infNat} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.infMon} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.soldePrim} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.exportation} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.inportation} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.rendement} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.invest} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.debtIntPIB} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.variantion} %
                      </TableCell>

                      <TableCell className="flex  items-center gap-4 text-right  mx-0 px-0 hover:cursor-pointer"></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <Tabs defaultValue="legere" className="w-full ">
          <TabsList className="w-full">
            <TabsTrigger value="legere">
              Choc sur Matières Premières - Sévère
            </TabsTrigger>
            <TabsTrigger value="severe">
              {" "}
              Choc sur Matières Premières - Léger{" "}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="legere" className="px-4">
            <ScrollArea className=" h-96 max-md:h-[20rem] pr-2">
              <p className="text-xl font-semibold text-sky-400">
                {"Choc sur Matières Premières - Sévère"}
              </p>

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
                    <TableHead className="text-left mx-0 px-0">
                      Spread
                    </TableHead>
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

                    <TableHead className="text-left mx-0 px-0">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cl?.map((ic: any) => (
                    <TableRow key={ic.id}>
                      <TableCell className="text-left mx-0 px-0">
                        {ic.year}
                      </TableCell>
                      <TableCell
                        className={
                          +ic?.data?.croissance < 0
                            ? "text-left mx-0 px-0 text-red-400"
                            : "text-left mx-0 px-0 text-green-400"
                        }
                      >
                        {(ic?.data?.croissance * 100)?.toFixed(2)} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {(ic?.data?.debtExtPIB * 100)?.toFixed(2)} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.txInternational} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.creditSpread} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.txInterieur} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.infNat} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.infMon} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.soldePrim} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.exportation} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.inportation} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.rendement} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.invest} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.debtIntPIB} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.variantion} %
                      </TableCell>

                      <TableCell className="flex  items-center gap-4 text-right  mx-0 px-0 hover:cursor-pointer"></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="severe" className="px-4">
            <ScrollArea className=" h-96 max-md:h-[20rem] pr-2">
              <p className="text-xl font-semibold text-sky-400">
                {"Choc sur Matières Premières - Léger"}
              </p>

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
                    <TableHead className="text-left mx-0 px-0">
                      Spread
                    </TableHead>
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

                    <TableHead className="text-left mx-0 px-0">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cs?.map((ic: any) => (
                    <TableRow key={ic.id}>
                      <TableCell className="text-left mx-0 px-0">
                        {ic.year}
                      </TableCell>
                      <TableCell
                        className={
                          +ic?.data?.croissance < 0
                            ? "text-left mx-0 px-0 text-red-400"
                            : "text-left mx-0 px-0 text-green-400"
                        }
                      >
                        {(ic?.data?.croissance * 100)?.toFixed(2)} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {(ic?.data?.debtExtPIB * 100)?.toFixed(2)} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.txInternational} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.creditSpread} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.txInterieur} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.infNat} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.infMon} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.soldePrim} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.exportation} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.inportation} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.rendement} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.invest} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.debtIntPIB} %
                      </TableCell>
                      <TableCell className="text-left mx-0 px-0">
                        {ic?.data?.variantion} %
                      </TableCell>

                      <TableCell className="flex  items-center gap-4 text-right  mx-0 px-0 hover:cursor-pointer"></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ScenRef;

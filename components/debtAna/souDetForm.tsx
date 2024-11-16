"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { computeDiscountCurve } from "@/lib/_sbActions";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { Currency } from "@prisma/client";
import {
  CouponBasisList,
  CouponFreqList,
  ModalityTypes,
  ratings,
  valuationTypes,
} from "@/lib/enums";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import {
  MdAdd,
  MdAutoGraph,
  MdDeleteOutline,
  MdEdit,
  MdUpdate,
} from "react-icons/md";
import { TbXxx } from "react-icons/tb";
import {
  computeCMA,
  computeDC,
  computeGeneralValuation,
  createFinOpt,
  deleteFinOpts,
  updateFinOpt,
} from "@/lib/_finActions";
import { Badge } from "../ui/badge";
import GeneralLayout from "../generalLayout";
import { usePathname, useRouter } from "next/navigation";
import ZCCurve from "../commonCurves/zcCurve";
import { getAllZC } from "@/lib/_ycAction";
import DCurve from "../commonCurves/dCurve";
import { getCurrency } from "@/lib/_otherActions";
import { ScrollArea } from "../ui/scroll-area";
import Cashflow from "../commonCurves/cashflow";
import { revalidatePath } from "next/cache";
import { duplicateReserve, getReserveByCode } from "@/lib/_reserveActions";
import ReserveForm from "./reserveForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import DelReserve from "./delReserve";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Info } from "lucide-react";
import { updateCashflow } from "@/lib/_cashflowActions";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { AnaCroissancechema } from "@/lib/schemas";
import {
  computeCroissance,
  computeRecomCroissance,
  computeRecomDetteCroissance,
  computeTxInternational,
  computeCreditSpread,
  computeTInterieur,
  computeInfNationale,
  computeInfMondiale,
  computeSoldePrim,
  computeExportations,
  computeImportations,
  computeRendement,
  computeInvest,
  computeDebtExterne,
  computeDebtInterne,
  computeVariation,
} from "@/lib/_debtSubsActions";
import { Label } from "../ui/label";

const initialDisc = [
  { id: 1, tenor: 0, rate: 0 },
  { id: 2, tenor: 0.5, rate: 0 },
  { id: 3, tenor: 1, rate: 0 },
  { id: 4, tenor: 2, rate: 0 },
  { id: 5, tenor: 3, rate: 0 },
  { id: 6, tenor: 4, rate: 0 },
  { id: 7, tenor: 5, rate: 0 },
  { id: 8, tenor: 6, rate: 0 },
  { id: 9, tenor: 7, rate: 0 },
  { id: 10, tenor: 8, rate: 0 },
  { id: 11, tenor: 9, rate: 0 },
  { id: 12, tenor: 10, rate: 0 },
  { id: 13, tenor: 15, rate: 0 },
  { id: 14, tenor: 20, rate: 0 },
  { id: 15, tenor: 30, rate: 0 },
];

type SouDetFormProps = {
  optIn?: any;
  type?: string;
  currencies?: any;
  openDialog?: any;
  code?: any;
  valType?: any;
};
const SouDetForm = ({
  optIn,
  type,
  openDialog,
  currencies,
  code,
  valType,
}: SouDetFormProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(openDialog);
  const router = useRouter();
  const pathname = usePathname();
  const [zcrates, setZcrates] = useState<any>();
  const [disc, setDisc] = useState<any>(initialDisc);
  const [curCode, setCurCode] = useState("");
  const [cashflow, setCashflow] = useState<any>();
  const [cma, setCma] = useState(0);
  //const [duration, setDuration] = useState(0);
  const [croissance, setCroissance] = useState();
  const [croissanceEsp, setCroissanceEsp] = useState(0);
  const [recoCroi, setRecoCroi] = useState("");
  const [recoDetCroi, setRecoDetCroi] = useState("");

  const [compTxInternational, setCompTxInternational] = useState(false);
  const [compCreditSpread, setCompCreditSpread] = useState(false);
  const [compTInterieur, setCompTInterieur] = useState(false);
  const [compInfNationale, setCompInfNationale] = useState(false);
  const [compInfMondiale, setCompInfMondiale] = useState(false);
  const [compSoldePrim, setCompSoldePrim] = useState(false);
  const [compExportations, setCompExportations] = useState(false);
  const [compImportations, setCompImportations] = useState(false);
  const [compRendement, setCompRendement] = useState(false);
  const [compInvest, setCompInvest] = useState(false);
  const [compDebtExterne, setCompDebtExterne] = useState(false);
  const [compDebtInterne, setCompDebtInterne] = useState(false);
  const [compVariation, setCompVariation] = useState(false);

  const [refinRisk, setRefinRisk] = useState(0);
  const [lastData, setLastData] = useState<any>();
  const [refresh, setRefresh] = useState(false);
  const [mat, setMat] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [defReco, setDefReco] = useState("");
  const [genReco, setGenReco] = useState("");
  const [anaParam, setAnaParam] = useState(false);
  const [parCal, setParCal] = useState(0);

  const form = useForm<z.infer<typeof AnaCroissancechema>>({
    resolver: zodResolver(AnaCroissancechema),
    defaultValues: {
      id: optIn?.id ? +optIn?.id : 0,
      code: pathname.split("/")[3],

      tInternational: "5.5",
      creditSpread: "4",
      tInterieur: "25",
      infNationale: "23",
      infMondiale: "6.8",
      soldePrim: "-2.1",
      exportations: "24",
      importations: "18",
      rendement: "1",
      invest: "10.8",
      debtExterne: "12",
      debtInterne: "2",
      variation: "22",
    },
  });

  const procesForm = async (values: z.infer<typeof AnaCroissancechema>) => {
    setLoading(true);

    //console.log("values", parCal, croissanceEsp, values);
    if (parCal == 0) {
      const res = await computeCroissance(values, parCal, croissanceEsp);

      if (res?.data) {
        setCroissance(res.data);
        setCroissanceEsp(res.data.toFixed(4));
        const defProbaf = await computeRecomCroissance(values, res?.data);
        if (defProbaf?.data) setRecoCroi(defProbaf.data);

        const defProba = await computeRecomDetteCroissance(values, res?.data);
        if (defProba?.data) setRecoDetCroi(defProba.data);
      }
    } else {
      if (parCal == 1) {
        const res = await computeTxInternational(values, croissanceEsp);
        form.setValue(
          "tInternational",
          (res?.data * 100).toFixed(2).toString()
        );
      }

      if (parCal == 2) {
        const res = await computeCreditSpread(values, croissanceEsp);
        form.setValue("creditSpread", (res?.data * 100).toFixed(2).toString());
      }

      if (parCal == 3) {
        const res = await computeTInterieur(values, croissanceEsp);
        form.setValue("tInterieur", (res?.data * 100).toFixed(2).toString());
      }

      if (parCal == 4) {
        const res = await computeInfNationale(values, croissanceEsp);
        form.setValue("infNationale", (res?.data * 100).toFixed(2).toString());
      }

      if (parCal == 5) {
        const res = await computeInfMondiale(values, croissanceEsp);
        form.setValue("infMondiale", (res?.data * 100).toFixed(2).toString());
      }

      if (parCal == 6) {
        const res = await computeSoldePrim(values, croissanceEsp);
        form.setValue("soldePrim", (res?.data * 100).toFixed(2).toString());
      }

      if (parCal == 7) {
        const res = await computeExportations(values, croissanceEsp);
        form.setValue("exportations", (res?.data * 100).toFixed(2).toString());
      }

      if (parCal == 8) {
        const res = await computeImportations(values, croissanceEsp);
        form.setValue("importations", (res?.data * 100).toFixed(2).toString());
      }

      if (parCal == 9) {
        const res = await computeRendement(values, croissanceEsp);
        form.setValue("rendement", (res?.data * 100).toFixed(2).toString());
      }

      if (parCal == 10) {
        const res = await computeInvest(values, croissanceEsp);
        form.setValue("invest", (res?.data * 100).toFixed(2).toString());
      }

      if (parCal == 11) {
        const res = await computeDebtExterne(values, croissanceEsp);
        form.setValue("debtExterne", (res?.data * 100).toFixed(2).toString());
      }

      if (parCal == 12) {
        const res = await computeDebtInterne(values, croissanceEsp);
        form.setValue("debtInterne", (res?.data * 100).toFixed(2).toString());
      }

      if (parCal == 13) {
        const res = await computeVariation(values, croissanceEsp);
        form.setValue("variation", (res?.data * 100).toFixed(2).toString());
      }
    }

    //   setValTxInternational(values?.tInternational ? +values?.tInternational : 0);

    /*     const risk = values.refinRisk ? +values.refinRisk : 0;
    const defProbaf = await getDefaultProba(risk / 100);
    if (defProbaf?.data) setDefReco(defProbaf.data);

    const refinRisk = await getGeneralReco(values); //const dcurve = await createFinOpt(values, code);
    if (refinRisk?.data) setGenReco(refinRisk.data); */

    //console.log("type", type);

    setLoading(false);
    // router.push(`/anadette/anaopfin/${values.code}`);
    // setOpen(false);
  };

  return (
    <div>
      <GeneralLayout
        title="Debt Sustainability"
        bred={
          <CustomBreadcrumb
            name={optIn ? `Debt Sustainability:${pathname.split("/")[3]}` : ""}
          />
        }
      >
        {/*         {JSON.stringify(optIn)}
         */}{" "}
        <div className="max-md:px-1 md:flex gap-4 w-full ">
          <div className="bg-gray-500/10 dark:bg-teal-200/10 w-full max-md:px-2 md:p-4 rounded-xl">
            <p className="text-center text-sky-400 font-semibold text-xl">
              {!anaParam
                ? "Analyse de la croissance économique"
                : "Analyse des paramètres de la croissance économique"}
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(procesForm)}
                className="space-y-6 w-full"
              >
                <div className="flex flex-col justify-between items-center gap-4">
                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="id"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-1/2 hidden">
                            <FormLabel>{"IDx"}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Entrer l'id"
                                type="number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-1/2 hidden">
                            <FormLabel>{"Code"}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Entrer l'id"
                                type="number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                  <div className="max-md:w-full flex gap-4">
                    <div className=" w-full flex flex-col gap-4 ">
                      <div className="flex flex-col justify-between items-center gap-4">
                        <div className="flex max-md:flex-col gap-4 ">
                          <div className="flex w-full gap-4 ">
                            <FormField
                              control={form.control}
                              name="tInternational"
                              render={({ field }) => {
                                return (
                                  <FormItem className="w-full">
                                    <div className="flex flex-col gap-2">
                                      {!compTxInternational && (
                                        <FormLabel
                                          className="hover:bg-sky-600 hover:p-1 hover:rounded-sm hover:cursor-pointer"
                                          onClick={() => {
                                            setCompTxInternational(true);
                                            setCompCreditSpread(false);
                                            setCompTInterieur(false);
                                            setCompInfNationale(false);
                                            setCompInfMondiale(false);
                                            setCompSoldePrim(false);
                                            setCompExportations(false);
                                            setCompImportations(false);
                                            setCompRendement(false);
                                            setCompInvest(false);
                                            setCompDebtExterne(false);
                                            setCompDebtInterne(false);
                                            setCompVariation(false);
                                            setAnaParam(true);
                                            setParCal(1);
                                            /*   form.setValue(
                                              "tInternational",
                                              "0"
                                            ); */
                                          }}
                                        >
                                          {"Tx international (%)"}
                                        </FormLabel>
                                      )}
                                      {compTxInternational && (
                                        <div className=" flex justify-between gap-2">
                                          <Badge
                                            className="bg-gray-400 hover:bg-gray-200 text-red-700"
                                            onClick={() => {
                                              setCompTxInternational(false);
                                              setAnaParam(false);
                                              setParCal(0);
                                            }}
                                          >
                                            Cancel
                                          </Badge>
                                          <Button
                                            type="submit"
                                            className="text-white bg-sky-600 px-4 text-xs rounded-full"
                                          >
                                            Compute
                                          </Button>
                                        </div>
                                      )}
                                    </div>

                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Entrer la valeur"
                                        type="number"
                                        step="0.01"
                                        disabled={compTxInternational}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />

                            <FormField
                              control={form.control}
                              name="creditSpread"
                              render={({ field }) => {
                                return (
                                  <FormItem className="w-full">
                                    <div className="flex flex-col gap-2">
                                      {!compCreditSpread && (
                                        <FormLabel
                                          className="hover:bg-sky-600 hover:p-1 hover:rounded-sm hover:cursor-pointer"
                                          onClick={() => {
                                            setCompTxInternational(false);
                                            setCompCreditSpread(true);
                                            setCompTInterieur(false);
                                            setCompInfNationale(false);
                                            setCompInfMondiale(false);
                                            setCompSoldePrim(false);
                                            setCompExportations(false);
                                            setCompImportations(false);
                                            setCompRendement(false);
                                            setCompInvest(false);
                                            setCompDebtExterne(false);
                                            setCompDebtInterne(false);
                                            setCompVariation(false);
                                            setAnaParam(true);
                                            setParCal(2);
                                            // form.setValue("creditSpread", "0");
                                          }}
                                        >
                                          {"Credit Spread (%)"}
                                        </FormLabel>
                                      )}
                                      {compCreditSpread && (
                                        <div className=" flex  justify-between   gap-2">
                                          <Badge
                                            className="bg-gray-400 hover:bg-gray-200 text-red-700"
                                            onClick={() => {
                                              setCompCreditSpread(false);
                                              setAnaParam(false);
                                              setParCal(0);
                                            }}
                                          >
                                            Cancel
                                          </Badge>
                                          <Button
                                            type="submit"
                                            className="text-white bg-sky-600 px-4 text-xs rounded-full"
                                          >
                                            Compute
                                          </Button>
                                        </div>
                                      )}
                                    </div>

                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Entrer la valeur"
                                        type="number"
                                        step="0.01"
                                        disabled={compCreditSpread}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />
                          </div>
                          <div className="flex w-full gap-4">
                            <FormField
                              control={form.control}
                              name="tInterieur"
                              render={({ field }) => {
                                return (
                                  <FormItem className="w-full">
                                    <div className="flex flex-col gap-2">
                                      {!compTInterieur && (
                                        <FormLabel
                                          className="hover:bg-sky-600 hover:p-1 hover:rounded-sm hover:cursor-pointer"
                                          onClick={() => {
                                            setCompTxInternational(false);
                                            setCompCreditSpread(false);
                                            setCompTInterieur(true);
                                            setCompInfNationale(false);
                                            setCompInfMondiale(false);
                                            setCompSoldePrim(false);
                                            setCompExportations(false);
                                            setCompImportations(false);
                                            setCompRendement(false);
                                            setCompInvest(false);
                                            setCompDebtExterne(false);
                                            setCompDebtInterne(false);
                                            setCompVariation(false);
                                            setAnaParam(true);
                                            setParCal(3);
                                            // form.setValue("creditSpread", "0");
                                          }}
                                        >
                                          {"Tx intérieur (%)"}
                                        </FormLabel>
                                      )}
                                      {compTInterieur && (
                                        <div className=" flex  justify-between   gap-2">
                                          <Badge
                                            className="bg-gray-400 hover:bg-gray-200 text-red-700"
                                            onClick={() => {
                                              setCompTInterieur(false);
                                              setAnaParam(false);
                                              setParCal(0);
                                            }}
                                          >
                                            Cancel
                                          </Badge>
                                          <Button
                                            type="submit"
                                            className="text-white bg-sky-600 px-4 text-xs rounded-full"
                                          >
                                            Compute
                                          </Button>
                                        </div>
                                      )}
                                    </div>

                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Entrer la valeur"
                                        type="number"
                                        step="0.01"
                                        disabled={compTInterieur}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />

                            <FormField
                              control={form.control}
                              name="infNationale"
                              render={({ field }) => {
                                return (
                                  <FormItem className="w-full">
                                    <div className="flex flex-col gap-2">
                                      {!compInfNationale && (
                                        <FormLabel
                                          className="hover:bg-sky-600 hover:p-1 hover:rounded-sm hover:cursor-pointer"
                                          onClick={() => {
                                            setCompTxInternational(false);
                                            setCompCreditSpread(false);
                                            setCompTInterieur(false);
                                            setCompInfNationale(true);
                                            setCompInfMondiale(false);
                                            setCompSoldePrim(false);
                                            setCompExportations(false);
                                            setCompImportations(false);
                                            setCompRendement(false);
                                            setCompInvest(false);
                                            setCompDebtExterne(false);
                                            setCompDebtInterne(false);
                                            setCompVariation(false);
                                            setAnaParam(true);
                                            setParCal(4);
                                            // form.setValue("creditSpread", "0");
                                          }}
                                        >
                                          {"Inf. Nationale (%)"}
                                        </FormLabel>
                                      )}
                                      {compInfNationale && (
                                        <div className=" flex  justify-between   gap-2">
                                          <Badge
                                            className="bg-gray-400 hover:bg-gray-200 text-red-700"
                                            onClick={() => {
                                              setCompInfNationale(false);
                                              setAnaParam(false);
                                              setParCal(0);
                                            }}
                                          >
                                            Cancel
                                          </Badge>
                                          <Button
                                            type="submit"
                                            className="text-white bg-sky-600 px-4 text-xs rounded-full"
                                          >
                                            Compute
                                          </Button>
                                        </div>
                                      )}
                                    </div>

                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Entrer la valeur"
                                        type="number"
                                        step="0.01"
                                        disabled={compInfNationale}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />
                          </div>
                          <div className="flex w-full gap-4">
                            <FormField
                              control={form.control}
                              name="infMondiale"
                              render={({ field }) => {
                                return (
                                  <FormItem className="w-full">
                                    <div className="flex flex-col gap-2">
                                      {!compInfMondiale && (
                                        <FormLabel
                                          className="hover:bg-sky-600 hover:p-1 hover:rounded-sm hover:cursor-pointer"
                                          onClick={() => {
                                            setCompTxInternational(false);
                                            setCompCreditSpread(false);
                                            setCompTInterieur(false);
                                            setCompInfNationale(false);
                                            setCompInfMondiale(true);
                                            setCompSoldePrim(false);
                                            setCompExportations(false);
                                            setCompImportations(false);
                                            setCompRendement(false);
                                            setCompInvest(false);
                                            setCompDebtExterne(false);
                                            setCompDebtInterne(false);
                                            setCompVariation(false);
                                            setAnaParam(true);
                                            setParCal(5);
                                            // form.setValue("creditSpread", "0");
                                          }}
                                        >
                                          {"Inf. Mondiale (%)"}
                                        </FormLabel>
                                      )}
                                      {compInfMondiale && (
                                        <div className=" flex  justify-between   gap-2">
                                          <Badge
                                            className="bg-gray-400 hover:bg-gray-200 text-red-700"
                                            onClick={() => {
                                              setCompInfMondiale(false);
                                              setAnaParam(false);
                                              setParCal(0);
                                            }}
                                          >
                                            Cancel
                                          </Badge>
                                          <Button
                                            type="submit"
                                            className="text-white bg-sky-600 px-4 text-xs rounded-full"
                                          >
                                            Compute
                                          </Button>
                                        </div>
                                      )}
                                    </div>

                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Entrer la valeur"
                                        type="number"
                                        step="0.01"
                                        disabled={compInfMondiale}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />

                            <FormField
                              control={form.control}
                              name="soldePrim"
                              render={({ field }) => {
                                return (
                                  <FormItem className="w-full">
                                    <div className="flex flex-col gap-2">
                                      {!compSoldePrim && (
                                        <FormLabel
                                          className="hover:bg-sky-600 hover:p-1 hover:rounded-sm hover:cursor-pointer"
                                          onClick={() => {
                                            setCompTxInternational(false);
                                            setCompCreditSpread(false);
                                            setCompTInterieur(false);
                                            setCompInfNationale(false);
                                            setCompInfMondiale(false);
                                            setCompSoldePrim(true);
                                            setCompExportations(false);
                                            setCompImportations(false);
                                            setCompRendement(false);
                                            setCompInvest(false);
                                            setCompDebtExterne(false);
                                            setCompDebtInterne(false);
                                            setCompVariation(false);
                                            setAnaParam(true);
                                            setParCal(6);
                                            // form.setValue("creditSpread", "0");
                                          }}
                                        >
                                          {"Solde Primaire (%)"}
                                        </FormLabel>
                                      )}
                                      {compSoldePrim && (
                                        <div className=" flex  justify-between   gap-2">
                                          <Badge
                                            className="bg-gray-400 hover:bg-gray-200 text-red-700"
                                            onClick={() => {
                                              setCompSoldePrim(false);
                                              setAnaParam(false);
                                              setParCal(0);
                                            }}
                                          >
                                            Cancel
                                          </Badge>
                                          <Button
                                            type="submit"
                                            className="text-white bg-sky-600 px-4 text-xs rounded-full"
                                          >
                                            Compute
                                          </Button>
                                        </div>
                                      )}
                                    </div>

                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Entrer la valeur"
                                        type="number"
                                        step="0.01"
                                        disabled={compSoldePrim}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex  max-md:flex-col gap-4">
                          <div className="flex w-full gap-4">
                            <FormField
                              control={form.control}
                              name="exportations"
                              render={({ field }) => {
                                return (
                                  <FormItem className="w-full">
                                    <div className="flex flex-col gap-2">
                                      {!compExportations && (
                                        <FormLabel
                                          className="hover:bg-sky-600 hover:p-1 hover:rounded-sm hover:cursor-pointer"
                                          onClick={() => {
                                            setCompTxInternational(false);
                                            setCompCreditSpread(false);
                                            setCompTInterieur(false);
                                            setCompInfNationale(false);
                                            setCompInfMondiale(false);
                                            setCompSoldePrim(false);
                                            setCompExportations(true);
                                            setCompImportations(false);
                                            setCompRendement(false);
                                            setCompInvest(false);
                                            setCompDebtExterne(false);
                                            setCompDebtInterne(false);
                                            setCompVariation(false);
                                            setAnaParam(true);
                                            setParCal(7);
                                            // form.setValue("creditSpread", "0");
                                          }}
                                        >
                                          {"Exportations (%)"}
                                        </FormLabel>
                                      )}
                                      {compExportations && (
                                        <div className=" flex  justify-between   gap-2">
                                          <Badge
                                            className="bg-gray-400 hover:bg-gray-200 text-red-700"
                                            onClick={() => {
                                              setCompExportations(false);
                                              setAnaParam(false);
                                              setParCal(0);
                                            }}
                                          >
                                            Cancel
                                          </Badge>
                                          <Button
                                            type="submit"
                                            className="text-white bg-sky-600 px-4 text-xs rounded-full"
                                          >
                                            Compute
                                          </Button>
                                        </div>
                                      )}
                                    </div>

                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Entrer la valeur"
                                        type="number"
                                        step="0.01"
                                        disabled={compExportations}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />

                            <FormField
                              control={form.control}
                              name="importations"
                              render={({ field }) => {
                                return (
                                  <FormItem className="w-full">
                                    <div className="flex flex-col gap-2">
                                      {!compImportations && (
                                        <FormLabel
                                          className="hover:bg-sky-600 hover:p-1 hover:rounded-sm hover:cursor-pointer"
                                          onClick={() => {
                                            setCompTxInternational(false);
                                            setCompCreditSpread(false);
                                            setCompTInterieur(false);
                                            setCompInfNationale(false);
                                            setCompInfMondiale(false);
                                            setCompSoldePrim(false);
                                            setCompExportations(false);
                                            setCompImportations(true);
                                            setCompRendement(false);
                                            setCompInvest(false);
                                            setCompDebtExterne(false);
                                            setCompDebtInterne(false);
                                            setCompVariation(false);
                                            setAnaParam(true);
                                            setParCal(8);
                                            // form.setValue("creditSpread", "0");
                                          }}
                                        >
                                          {"Importations (%)"}
                                        </FormLabel>
                                      )}
                                      {compImportations && (
                                        <div className=" flex  justify-between   gap-2">
                                          <Badge
                                            className="bg-gray-400 hover:bg-gray-200 text-red-700"
                                            onClick={() => {
                                              setCompImportations(false);
                                              setAnaParam(false);
                                              setParCal(0);
                                            }}
                                          >
                                            Cancel
                                          </Badge>
                                          <Button
                                            type="submit"
                                            className="text-white bg-sky-600 px-4 text-xs rounded-full"
                                          >
                                            Compute
                                          </Button>
                                        </div>
                                      )}
                                    </div>

                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Entrer la valeur"
                                        type="number"
                                        step="0.01"
                                        disabled={compImportations}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />
                          </div>
                          <div className=" flex w-full gap-4">
                            <FormField
                              control={form.control}
                              name="rendement"
                              render={({ field }) => {
                                return (
                                  <FormItem className="w-full">
                                    <div className="flex flex-col gap-2">
                                      {!compRendement && (
                                        <FormLabel
                                          className="hover:bg-sky-600 hover:p-1 hover:rounded-sm hover:cursor-pointer"
                                          onClick={() => {
                                            setCompTxInternational(false);
                                            setCompCreditSpread(false);
                                            setCompTInterieur(false);
                                            setCompInfNationale(false);
                                            setCompInfMondiale(false);
                                            setCompSoldePrim(false);
                                            setCompExportations(false);
                                            setCompImportations(false);
                                            setCompRendement(true);
                                            setCompInvest(false);
                                            setCompDebtExterne(false);
                                            setCompDebtInterne(false);
                                            setCompVariation(false);
                                            setAnaParam(true);
                                            setParCal(9);
                                            // form.setValue("creditSpread", "0");
                                          }}
                                        >
                                          {"Rendement espéré (%)"}
                                        </FormLabel>
                                      )}
                                      {compRendement && (
                                        <div className=" flex  justify-between   gap-2">
                                          <Badge
                                            className="bg-gray-400 hover:bg-gray-200 text-red-700"
                                            onClick={() => {
                                              setCompRendement(false);
                                              setAnaParam(false);
                                              setParCal(0);
                                            }}
                                          >
                                            Cancel
                                          </Badge>
                                          <Button
                                            type="submit"
                                            className="text-white bg-sky-600 px-4 text-xs rounded-full"
                                          >
                                            Compute
                                          </Button>
                                        </div>
                                      )}
                                    </div>

                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Entrer la valeur"
                                        type="number"
                                        step="0.01"
                                        disabled={compRendement}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />

                            <FormField
                              control={form.control}
                              name="invest"
                              render={({ field }) => {
                                return (
                                  <FormItem className="w-full">
                                    <div className="flex flex-col gap-2">
                                      {!compInvest && (
                                        <FormLabel
                                          className="hover:bg-sky-600 hover:p-1 hover:rounded-sm hover:cursor-pointer"
                                          onClick={() => {
                                            setCompTxInternational(false);
                                            setCompCreditSpread(false);
                                            setCompTInterieur(false);
                                            setCompInfNationale(false);
                                            setCompInfMondiale(false);
                                            setCompSoldePrim(false);
                                            setCompExportations(false);
                                            setCompImportations(false);
                                            setCompRendement(false);
                                            setCompInvest(true);
                                            setCompDebtExterne(false);
                                            setCompDebtInterne(false);
                                            setCompVariation(false);
                                            setAnaParam(true);
                                            setParCal(10);
                                            // form.setValue("creditSpread", "0");
                                          }}
                                        >
                                          {"Investissement (%)"}
                                        </FormLabel>
                                      )}
                                      {compInvest && (
                                        <div className=" flex  justify-between   gap-2">
                                          <Badge
                                            className="bg-gray-400 hover:bg-gray-200 text-red-700"
                                            onClick={() => {
                                              setCompInvest(false);
                                              setAnaParam(false);
                                              setParCal(0);
                                            }}
                                          >
                                            Cancel
                                          </Badge>
                                          <Button
                                            type="submit"
                                            className="text-white bg-sky-600 px-4 text-xs rounded-full"
                                          >
                                            Compute
                                          </Button>
                                        </div>
                                      )}
                                    </div>

                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Entrer la valeur"
                                        type="number"
                                        step="0.01"
                                        disabled={compInvest}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />
                          </div>
                          <div className=" flex w-full gap-4">
                            <FormField
                              control={form.control}
                              name="debtExterne"
                              render={({ field }) => {
                                return (
                                  <FormItem className="w-full">
                                    <div className="flex flex-col gap-2">
                                      {!compDebtExterne && (
                                        <FormLabel
                                          className="hover:bg-sky-600 hover:p-1 hover:rounded-sm hover:cursor-pointer"
                                          onClick={() => {
                                            setCompTxInternational(false);
                                            setCompCreditSpread(false);
                                            setCompTInterieur(false);
                                            setCompInfNationale(false);
                                            setCompInfMondiale(false);
                                            setCompSoldePrim(false);
                                            setCompExportations(false);
                                            setCompImportations(false);
                                            setCompRendement(false);
                                            setCompInvest(false);
                                            setCompDebtExterne(true);
                                            setCompDebtInterne(false);
                                            setCompVariation(false);
                                            setAnaParam(true);
                                            setAnaParam(true);
                                            setParCal(11);
                                            // form.setValue("creditSpread", "0");
                                          }}
                                        >
                                          {"Dette Externe (%)"}
                                        </FormLabel>
                                      )}
                                      {compDebtExterne && (
                                        <div className=" flex  justify-between   gap-2">
                                          <Badge
                                            className="bg-gray-400 hover:bg-gray-200 text-red-700"
                                            onClick={() => {
                                              setCompDebtExterne(false);
                                              setAnaParam(false);
                                              setParCal(0);
                                            }}
                                          >
                                            Cancel
                                          </Badge>
                                          <Button
                                            type="submit"
                                            className="text-white bg-sky-600 px-4 text-xs rounded-full"
                                          >
                                            Compute
                                          </Button>
                                        </div>
                                      )}
                                    </div>

                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Entrer la valeur"
                                        type="number"
                                        step="0.01"
                                        disabled={compDebtExterne}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />

                            <FormField
                              control={form.control}
                              name="debtInterne"
                              render={({ field }) => {
                                return (
                                  <FormItem className="w-full">
                                    <div className="flex flex-col gap-2">
                                      {!compDebtInterne && (
                                        <FormLabel
                                          className="hover:bg-sky-600 hover:p-1 hover:rounded-sm hover:cursor-pointer"
                                          onClick={() => {
                                            setCompTxInternational(false);
                                            setCompCreditSpread(false);
                                            setCompTInterieur(false);
                                            setCompInfNationale(false);
                                            setCompInfMondiale(false);
                                            setCompSoldePrim(false);
                                            setCompExportations(false);
                                            setCompImportations(false);
                                            setCompRendement(false);
                                            setCompInvest(false);
                                            setCompDebtExterne(false);
                                            setCompDebtInterne(true);
                                            setCompVariation(false);

                                            setAnaParam(true);
                                            setAnaParam(true);
                                            setParCal(12);
                                            // form.setValue("creditSpread", "0");
                                          }}
                                        >
                                          {"Dette Interne (%)"}
                                        </FormLabel>
                                      )}
                                      {compDebtInterne && (
                                        <div className=" flex  justify-between   gap-2">
                                          <Badge
                                            className="bg-gray-400 hover:bg-gray-200 text-red-700"
                                            onClick={() => {
                                              setCompDebtInterne(false);
                                              setAnaParam(false);
                                              setParCal(0);
                                            }}
                                          >
                                            Cancel
                                          </Badge>
                                          <Button
                                            type="submit"
                                            className="text-white bg-sky-600 px-4 text-xs rounded-full"
                                          >
                                            Compute
                                          </Button>
                                        </div>
                                      )}
                                    </div>

                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Entrer la valeur"
                                        type="number"
                                        step="0.01"
                                        disabled={compDebtInterne}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />
                          </div>
                          <div className=" flex w-full gap-4">
                            <FormField
                              control={form.control}
                              name="variation"
                              render={({ field }) => {
                                return (
                                  <FormItem className="w-1/2">
                                    <div className="flex flex-col gap-2">
                                      {!compVariation && (
                                        <FormLabel
                                          className="hover:bg-sky-600 hover:p-1 hover:rounded-sm hover:cursor-pointer"
                                          onClick={() => {
                                            setCompTxInternational(false);
                                            setCompCreditSpread(false);
                                            setCompTInterieur(false);
                                            setCompInfNationale(false);
                                            setCompInfMondiale(false);
                                            setCompSoldePrim(false);
                                            setCompExportations(false);
                                            setCompImportations(false);
                                            setCompRendement(false);
                                            setCompInvest(false);
                                            setCompDebtExterne(false);
                                            setCompDebtInterne(false);
                                            setCompVariation(true);
                                            setAnaParam(true);
                                            setAnaParam(true);
                                            setParCal(13);
                                            // form.setValue("creditSpread", "0");
                                          }}
                                        >
                                          {"Tx Variation (%)"}
                                        </FormLabel>
                                      )}
                                      {compVariation && (
                                        <div className=" flex  justify-between   gap-2">
                                          <Badge
                                            className="bg-gray-400 hover:bg-gray-200 text-red-700"
                                            onClick={() => {
                                              setCompVariation(false);
                                              setAnaParam(false);
                                              setParCal(0);
                                            }}
                                          >
                                            Cancel
                                          </Badge>
                                          <Button
                                            type="submit"
                                            className="text-white bg-sky-600 px-4 text-xs rounded-full"
                                          >
                                            Compute
                                          </Button>
                                        </div>
                                      )}
                                    </div>

                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Entrer la valeur"
                                        type="number"
                                        step="0.01"
                                        disabled={compVariation}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4   justify-between pt-8">
                  {!anaParam && (
                    <Button
                      type="button"
                      variant="outline"
                      className=" w-full md:w-1/3 max-md:w-1/2"
                      onClick={() => {
                        // console.log("ICI");
                        form.reset();
                        setOpen(false);
                        router.back();
                      }}
                    >
                      Cancel
                    </Button>
                  )}

                  {!anaParam && (
                    <Button
                      type="submit"
                      className=" w-full max-md:w-1/2 md:w-1/3 hover:bg-sky-800 bg-sky-600 text-white uppercase"
                    >
                      {loading ? "Evaluating ..." : "Evaluate"}
                    </Button>
                  )}

                  {/*                 {lastData?.length < 1 && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info size={40} className="text-yellow-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>To be able to compute:</p>
                          <p>
                            1. Save your analysis (This will drive you to your
                            batch)
                          </p>
                          <p>
                            2. In your batch, ensure to have coherence between
                            the Reserves and the maturity
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
 */}
                  {/*                   {zcrates?.length < 1 && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info size={40} className="text-yellow-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-center text-red-600 p-4">
                            No zero coupon found for the chosen valuation date{" "}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )} */}
                </div>
              </form>
            </Form>
          </div>
        </div>
        <div className="flex max-md:flex-col gap-2 justify-between mt-4">
          <Card x-chunk="dashboard-07-chunk-5" className="md:w-2/5">
            <CardHeader>
              <CardTitle className="text-sky-600">
                Analyse macroéconomique
              </CardTitle>
              {recoCroi && <CardDescription>{recoCroi}</CardDescription>}
            </CardHeader>
            <CardContent>
              <div></div>
              {/*               <Button size="sm" variant="secondary">
                Archive Product
              </Button> */}
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4 md:w-1/6">
            <Card x-chunk="dashboard-07-chunk-5" className="">
              <CardHeader>
                <CardTitle className="text-center text-sky-100 text-xl">
                  Croissance estimée
                </CardTitle>
                {croissance && (
                  <CardDescription className="text-green-500 text-4xl text-center">
                    {(croissance * 100)?.toFixed(2)}
                    {" %"}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div></div>
                {/*               <Button size="sm" variant="secondary">
                Archive Product
              </Button> */}
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-5" className="">
              <CardHeader>
                <CardTitle className="text-sky-100 text-xl text-center">
                  Croissance espérée
                </CardTitle>
                <CardDescription>
                  <Input
                    className="text-center text-2xl"
                    step="0.01"
                    type="number"
                    value={croissanceEsp}
                    onChange={(e: any) => setCroissanceEsp(e.target.value)}
                  />
                  <p className="text-center m-1 text-yellow-400">
                    {" "}
                    {(croissanceEsp * 100).toFixed(2)} %
                  </p>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div></div>
                {/*               <Button size="sm" variant="secondary">
                            Archive Product
                          </Button> */}
              </CardContent>
            </Card>
          </div>

          <Card x-chunk="dashboard-07-chunk-5" className="md:w-2/5">
            <CardHeader>
              <CardTitle className="text-sky-600">
                Analyse de la dette{" "}
              </CardTitle>
              {recoDetCroi && <CardDescription>{recoDetCroi}</CardDescription>}
            </CardHeader>
            <CardContent>
              <div></div>
              {/*               <Button size="sm" variant="secondary">
                Archive Product
              </Button> */}
            </CardContent>
          </Card>
        </div>
      </GeneralLayout>
    </div>
  );
};

export default SouDetForm;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2 ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home Page</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {/*         <BreadcrumbItem>
            <BreadcrumbLink href="/zones">Zones</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator /> */}
        <BreadcrumbItem>
          <BreadcrumbLink
            className="text-sky-600"
            href={
              name ? `/anadette/anaopfin/${name.split(":")[1]}` : "evaopfin"
            }
          >
            {name ? name : " Draft"}
          </BreadcrumbLink>
          {/*           <BreadcrumbPage href={} className="font-semibold">{name}</BreadcrumbPage>
           */}{" "}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

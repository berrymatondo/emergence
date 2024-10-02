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
import { anaEvaSchema, AnaFinOptSchema } from "@/lib/schemas";
import { getDefaultProba, getGeneralReco } from "@/lib/_analysisActions";

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

type OptAnaFormProps = {
  optIn?: any;
  type?: string;
  currencies?: any;
  openDialog?: any;
  code?: any;
  valType?: any;
};
const AnalysisForm = ({
  optIn,
  type,
  openDialog,
  currencies,
  code,
  valType,
}: OptAnaFormProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(openDialog);
  const router = useRouter();
  const pathname = usePathname();
  const [zcrates, setZcrates] = useState<any>();
  const [disc, setDisc] = useState<any>(initialDisc);
  const [curCode, setCurCode] = useState("");
  const [cashflow, setCashflow] = useState<any>();
  const [cma, setCma] = useState(0);
  const [duration, setDuration] = useState(0);
  const [defProba, setDefProba] = useState(0);
  const [refinRisk, setRefinRisk] = useState(0);
  const [lastData, setLastData] = useState<any>();
  const [refresh, setRefresh] = useState(false);
  const [mat, setMat] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [defReco, setDefReco] = useState("");
  const [genReco, setGenReco] = useState("");

  //console.log("Pathname: ", pathname.split("/")[3]);
  console.log("opts:", optIn);

  /**
 * 
 *       valuationType: "",
      modality: "",
      couponRate: 1,
      maturity: 1,
      rating: "4",
      notional: 1000000,
      valuationDate: "2024-07-01",
      currency: "1",
      recovering: "40",
 */

  //console.log("optIn: ", optIn);
  //console.log("refresh:", refresh);

  const form = useForm<z.infer<typeof AnaFinOptSchema>>({
    resolver: zodResolver(AnaFinOptSchema),
    defaultValues: {
      id: optIn?.id ? +optIn?.id : 0,
      code: pathname.split("/")[3],
      valuationType: optIn?.valType ? optIn?.valType : "1",
      maturityDate: optIn?.maturityDate as string,
      issueDate: optIn?.issueDate as string,
      firstCouponDate: optIn?.firstCouponDate as string,
      modality: valuationTypes
        .find((va: any) => va.id == (optIn?.valType ? optIn?.valType : "1"))
        ?.modality.toString(),
      couponBasis: optIn?.couponBasis ? optIn.couponBasis.toString() : "AA",
      couponRate: optIn?.couponRate ? optIn.couponRate.toString() : "1",
      maturity: optIn?.maturity ? optIn?.maturity.toString() : "1",
      rating: optIn?.rating as string,
      couponFrequency: optIn?.couponFrequency
        ? optIn?.couponFrequency.toString()
        : "1",
      notional: optIn?.notional ? optIn?.notional.toString() : "1000000",
      valuationDate: optIn?.valuationDate as string,
      currency: optIn?.couponCurrency ? optIn?.couponCurrency.toString() : "1",
      recovering: optIn?.recovering ? optIn?.recovering.toString() : "40",
      duration: optIn?.duration ? optIn?.duration.toFixed(2).toString() : "0",
      defProba: optIn?.defProba ? optIn?.defProba.toString() : "8",
      refinRisk: optIn?.refinRisk ? optIn?.refinRisk.toString() : "5",
    },
  });

  useEffect(() => {
    form.setValue("id", optIn?.id);
    form.setValue("code", pathname.split("/")[3]);
    form.setValue("valuationType", optIn?.valType);
    form.setValue("maturityDate", optIn?.maturityDate);
    form.setValue("issueDate", optIn?.issueDate);
    form.setValue("firstCouponDate", optIn?.firstCouponDate);
    /*     form.setValue(
      "modality",
      valuationTypes.find((va: any) => va.id == optIn?.valType)?.modality
    ); */
    form.setValue("modality", optIn?.modality.toString());
    form.setValue("couponRate", optIn?.couponRate.toString());
    form.setValue("couponBasis", optIn?.couponBasis.toString());

    form.setValue("maturity", optIn?.maturity?.toString());
    form.setValue("rating", optIn?.rating?.toString());
    form.setValue("notional", optIn?.notional?.toString());
    //form.setValue("valuationDate", optIn?.valuationDate.toString());
    //form.setValue("currency", optIn?.couponCurrency.toString());
    form.setValue("duration", optIn?.duration?.toFixed(2).toString());
    form.setValue("recovering", optIn?.recovering?.toString());
  }, [optIn, form]);

  const maturityDate = form.watch("maturityDate");
  const issueDate = form.watch("issueDate");
  const valuationType = form.watch("valuationType");
  const currency = form.watch("currency");
  const valuationDate = form.watch("valuationDate");

  useEffect(() => {
    const mati = getYears(
      maturityDate ? maturityDate : "0",
      issueDate ? issueDate : "0"
    );

    form.setValue("maturity", Math.floor(+mati).toString());
    setMat(Math.floor(+mati));
  }, [maturityDate, issueDate]);

  useEffect(() => {
    const mati = valuationTypes.find(
      (va: any) => va.id == valuationType
    )?.modality;
    form.setValue("modality", mati ? mati.toString() : "1");
  }, [valuationType]);

  useEffect(() => {
    console.log("log");

    // Fetch ZC Rates
    const fetchZC = async (id: any, date: any) => {
      //  console.log("id", id, date);

      const resu = await getAllZC(+id, date);
      const data = resu?.data;
      //console.log("data ", data);

      setZcrates(data);
    };
    fetchZC(currency, valuationDate);

    // Fetch Currency name
    const fetchCur = async (currency: any) => {
      const resu = await getCurrency(+currency);
      const dat = resu?.data;

      console.log("dat?.code", dat?.code);

      setCurCode(dat?.code ? dat?.code : "");
    };
    fetchCur(currency);
  }, [currency, valuationDate]);

  // Fetch Last Reserve
  useEffect(() => {
    const fetchLastReserve = async () => {
      // console.log("optIn?.reserve ", optIn?.reserve);

      if (optIn?.reserve) {
        const res = await getReserveByCode(optIn?.reserve);
        const data2 = res?.data;
        if (data2)
          setLastData(data2.sort((a: any, b: any) => a.tenor - b.tenor));
        console.log("Reserve ", data2);
      } else {
        if (type == "U") {
          const res = await getReserveByCode(pathname.split("/")[3]);
          const data2 = res?.data;
          if (data2)
            setLastData(data2.sort((a: any, b: any) => a.tenor - b.tenor));
          // console.log("Reserve ", data2);
        }
      }

      //setYieldcurve(data);
    };
    fetchLastReserve();
  }, [refresh]);

  const getYears = (date1: string, date2: string) => {
    const millisecondsDiff =
      new Date(date1).getTime() - new Date(date2).getTime();

    const years = Math.round(millisecondsDiff / (24 * 60 * 60 * 1000));
    return (years / 365).toFixed(2);
  };

  const procesForm = async (values: z.infer<typeof anaEvaSchema>) => {
    setLoading(true);

    //console.log("values", values);

    const risk = values.refinRisk ? +values.refinRisk : 0;
    const defProbaf = await getDefaultProba(risk / 100);
    if (defProbaf?.data) setDefReco(defProbaf.data);

    const refinRisk = await getGeneralReco(values); //const dcurve = await createFinOpt(values, code);
    if (refinRisk?.data) setGenReco(refinRisk.data);

    //console.log("type", type);

    setLoading(false);
    // router.push(`/anadette/anaopfin/${values.code}`);
    // setOpen(false);
  };

  return (
    <div>
      <GeneralLayout
        title="Evaluation of a Financing Option"
        bred={
          <CustomBreadcrumb
            name={`Financing Options Analysis:${pathname.split("/")[3]}`}
          />
        }
      >
        {/*         {JSON.stringify(optIn)}
         */}{" "}
        <div className="max-md:px-1 md:flex gap-4 w-full ">
          <div className="bg-gray-500/10 dark:bg-teal-200/10 w-full  p-4 rounded-xl">
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

                    <FormField
                      control={form.control}
                      name="valuationType"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-full">
                            <FormLabel
                              onClick={() =>
                                router.push(
                                  `/anadette/anaopfin/${
                                    pathname.split("/")[3]
                                  }/update?id=${optIn?.id}`
                                )
                              }
                              className="hover:cursor-pointer text-sky-400 p-4 text-xl"
                            >
                              {`Option - ${optIn?.id}`}
                            </FormLabel>
                            {/*                             <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger id="framework">
                                <SelectValue placeholder="Select a valuation type" />
                              </SelectTrigger>
                              <SelectContent position="popper">
                                {valuationTypes?.map((ctr: any) => (
                                  <SelectItem
                                    key={ctr.id}
                                    value={ctr.id.toString()}
                                  >
                                    {ctr.label}{" "}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select> */}

                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                  <div className="flex gap-4 ">
                    <div className=" w-full flex flex-col gap-4 ">
                      <div className="flex justify-between items-center gap-4">
                        <FormField
                          control={form.control}
                          name="couponRate"
                          render={({ field }) => {
                            return (
                              <FormItem className="w-1/2">
                                <FormLabel>{"Coupon Rate (%)"}</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Entrer la valeur"
                                    type="number"
                                    step="0.01"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                        <FormField
                          control={form.control}
                          name="maturity"
                          render={({ field }) => {
                            return (
                              <FormItem className="w-1/2">
                                <FormLabel>Maturity (years)</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Entrer la valeur"
                                    type="number"
                                    step="1"
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                        {/*                           <FormField
                            control={form.control}
                            name="rating"
                            render={({ field }) => {
                              return (
                                <FormItem className="w-1/2">
                                  <FormLabel>Rating</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <SelectTrigger id="framework">
                                      <SelectValue placeholder="Sélectionner un rating" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                      {ratings?.map((ctr: any) => (
                                        <SelectItem
                                          key={ctr.id}
                                          value={ctr.id.toString()}
                                        >
                                          {ctr.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>

                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          /> */}
                        <FormField
                          control={form.control}
                          name="notional"
                          render={({ field }) => {
                            return (
                              <FormItem className="w-1/2">
                                <FormLabel>{"Notional"}</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Entrer la valeur"
                                    type="number"
                                    step="0.01"
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                        <FormField
                          control={form.control}
                          name="couponFrequency"
                          render={({ field }) => {
                            return (
                              <FormItem className="w-1/2">
                                <FormLabel>Coupon Frequency</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger id="framework">
                                    <SelectValue placeholder="Select a frequency" />
                                  </SelectTrigger>
                                  <SelectContent position="popper">
                                    {Object.values(CouponFreqList)?.map(
                                      (ur: any) => (
                                        <SelectItem key={ur} value={ur}>
                                          {ur}
                                        </SelectItem>
                                      )
                                    )}
                                  </SelectContent>
                                </Select>

                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                        <FormField
                          control={form.control}
                          name="currency"
                          render={({ field }) => {
                            return (
                              <FormItem className="w-1/2">
                                <FormLabel>Currency</FormLabel>

                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger id="framework">
                                    <SelectValue placeholder="Sélectionner une devise" />
                                  </SelectTrigger>
                                  <SelectContent position="popper">
                                    {currencies?.map((ctr: Currency) => (
                                      <SelectItem
                                        key={ctr.id}
                                        value={ctr.id.toString()}
                                      >
                                        {ctr.code} -{" "}
                                        <span className="text-xs">
                                          {ctr.name}
                                        </span>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>

                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                        <FormField
                          control={form.control}
                          name="modality"
                          render={({ field }) => {
                            return (
                              <FormItem className="w-1/2">
                                <FormLabel>{"Modality"}</FormLabel>
                                {/*                               <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Entrer la valeur"
                                    type="text"
                                  />
                                </FormControl>
 */}
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger id="framework">
                                    <SelectValue placeholder="Select a modality" />
                                  </SelectTrigger>
                                  <SelectContent position="popper">
                                    {ModalityTypes?.map((ctr: any) => (
                                      <SelectItem
                                        key={ctr.id}
                                        value={ctr.id.toString()}
                                      >
                                        {ctr.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                        {/*                       </div>
                    </div>
                    <div className="max-md:hidden">
                      <Separator orientation="vertical" />
                    </div> */}
                        {/*                     <div className="w-1/2 flex flex-col gap-4">
                      <div className="flex justify-between items-center gap-4">
                      */}{" "}
                        <FormField
                          control={form.control}
                          name="couponRate"
                          render={({ field }) => {
                            return (
                              <FormItem className="w-1/2">
                                <FormLabel>{"Issue Price (%)"}</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Entrer la valeur"
                                    type="number"
                                    step="0.01"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                        <FormField
                          control={form.control}
                          name="couponRate"
                          render={({ field }) => {
                            return (
                              <FormItem className="w-1/2">
                                <FormLabel>{"Observed Price (%)"}</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Entrer la valeur"
                                    type="number"
                                    step="0.01"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                        {/*                       </div>
                      <div className="flex justify-between items-center gap-4">
                     */}{" "}
                        <FormField
                          control={form.control}
                          name="duration"
                          render={({ field }) => {
                            return (
                              <FormItem className="w-1/2">
                                <FormLabel>{"Duration"}</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Entrer la valeur"
                                    type="number"
                                    step="0.01"
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                        <FormField
                          control={form.control}
                          name="defProba"
                          render={({ field }) => {
                            return (
                              <FormItem className="w-1/2">
                                <FormLabel>
                                  {"Default Probability (%)"}
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Entrer la valeur"
                                    type="number"
                                    step="0.01"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                        <FormField
                          control={form.control}
                          name="refinRisk"
                          render={({ field }) => {
                            return (
                              <FormItem className="w-1/2">
                                <FormLabel>{"Refinancing Risk (%)"}</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Entrer la valeur"
                                    type="number"
                                    step="0.01"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                        {/*                       </div>

                      <div className="flex justify-between items-center gap-4">
                     */}{" "}
                        {/*                         <FormField
                          control={form.control}
                          name="issueDate"
                          render={({ field }) => {
                            return (
                              <FormItem className="w-1/2">
                                <FormLabel>{"Issue Date "}</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Entrer la date"
                                    type="date"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        /> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4  justify-between pt-8">
                  <Button
                    type="button"
                    variant="outline"
                    className=" w-full md:w-1/3"
                    onClick={() => {
                      // console.log("ICI");
                      form.reset();
                      setOpen(false);
                      router.back();
                    }}
                  >
                    Cancel
                  </Button>
                  {/*                   {!confirmDelete && (
                    <Button
                      type="button"
                      variant="secondary"
                      className="text-red-600 w-full md:w-1/3"
                      onClick={async () => {
                        setConfirmDelete(true);
                      }}
                    >
                      Delete
                    </Button>
                  )} */}

                  {/*                   {confirmDelete && (
                    <Button
                      type="button"
                      variant="secondary"
                      className=" w-full md:w-1/3 bg-red-600 hover:bg-red-600"
                      onClick={async () => {

                        const res = await deleteFinOpts(
                          optIn?.id,
                          form.getValues().code!
                        );

                        router.push(
                          `/anadette/anaopfin/${form.getValues().code}`
                        );
                        setOpen(false);
                      }}
                    >
                      Confirm Delete
                    </Button>
                  )} */}

                  {/*                   <Button
                    type="button"
                    variant="secondary"
                    className="w-full md:w-1/3 bg-green-600 hover:bg-green-800"
                    onClick={async () => {

                      if (type == "U") {
                        const reso = await updateCashflow(
                          cashflow,
                          pathname.split("/")[3],
                          optIn?.id
                        );

                        const res = await updateFinOpt(
                          form.getValues(),
                          cma,
                          duration,
                          defProba,
                          refinRisk
                        );
                      } else {
                        const res = await createFinOpt(
                          form.getValues(),
                          lastData,
                          cma,
                          duration,
                          defProba,
                          refinRisk
                        );



                        const reso = await updateCashflow(
                          cashflow,
                          pathname.split("/")[3],
                          res?.data?.id
                        );

                        const rs = await duplicateReserve(
                          pathname.split("/")[3],
                          lastData
                        );
                      }

                      router.push(
                        `/anadette/anaopfin/${form.getValues().code}`
                      );
                      setOpen(false);
                    }}
                  >
                    Save
                  </Button> */}

                  <Button
                    type="submit"
                    className=" w-full md:w-1/3 hover:bg-sky-800 bg-sky-600 text-white uppercase"
                  >
                    {loading ? "Evaluating ..." : "Evaluate"}
                  </Button>

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
        <div className="flex justify-between mt-8">
          {genReco && (
            <Card x-chunk="dashboard-07-chunk-5" className="w-2/5">
              <CardHeader>
                <CardTitle className="text-sky-600">
                  General Recommendations
                </CardTitle>
                <CardDescription>{genReco}</CardDescription>
              </CardHeader>
              <CardContent>
                <div></div>
                {/*               <Button size="sm" variant="secondary">
                Archive Product
              </Button> */}
              </CardContent>
            </Card>
          )}

          {defReco && (
            <Card x-chunk="dashboard-07-chunk-5" className="w-2/5">
              <CardHeader>
                <CardTitle className="text-sky-600">
                  Default Probability Recommendations{" "}
                </CardTitle>
                <CardDescription>{defReco}</CardDescription>
              </CardHeader>
              <CardContent>
                <div></div>
                {/*               <Button size="sm" variant="secondary">
                Archive Product
              </Button> */}
              </CardContent>
            </Card>
          )}
        </div>
      </GeneralLayout>
    </div>
  );
};

export default AnalysisForm;

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
            href={`/anadette/anaopfin/${name.split(":")[1]}`}
          >
            {name}
          </BreadcrumbLink>
          {/*           <BreadcrumbPage href={} className="font-semibold">{name}</BreadcrumbPage>
           */}{" "}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

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
import { FinOptSchema } from "@/lib/schemas";
import { Separator } from "../ui/separator";
import { Currency } from "@prisma/client";
import {
  CouponBasisList,
  CouponFreqList,
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
import { MdAdd, MdDeleteOutline, MdEdit, MdUpdate } from "react-icons/md";
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
const OptAnaForm = ({
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

  //console.log("Pathname: ", pathname.split("/")[3]);
  //console.log("opts: ", optIn);

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

  const form = useForm<z.infer<typeof FinOptSchema>>({
    resolver: zodResolver(FinOptSchema),
    defaultValues: {
      id: optIn?.id ? +optIn?.id : 0,
      code: pathname.split("/")[3],
      valuationType: optIn?.valType ? optIn?.valType : "1",
      maturityDate: optIn?.maturityDate as string,
      issueDate: optIn?.issueDate as string,
      firstCouponDate: optIn?.firstCouponDate as string,
      modality: valuationTypes.find(
        (va: any) => va.id == (optIn?.valType ? optIn?.valType : "1")
      )?.modality,
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
    },
  });

  useEffect(() => {
    form.setValue("id", optIn?.id);
    form.setValue("code", pathname.split("/")[3]);
    form.setValue("valuationType", optIn?.valType);
    form.setValue("maturityDate", optIn?.maturityDate);
    form.setValue("issueDate", optIn?.issueDate);
    form.setValue("firstCouponDate", optIn?.firstCouponDate);
    form.setValue(
      "modality",
      valuationTypes.find((va: any) => va.id == optIn.valType)?.modality
    );
    form.setValue("couponRate", optIn?.couponRate.toString());
    form.setValue("couponBasis", optIn?.couponBasis.toString());

    form.setValue("maturity", optIn?.maturity?.toString());
    form.setValue("rating", optIn?.rating?.toString());
    form.setValue("notional", optIn?.notional?.toString());
    //form.setValue("valuationDate", optIn?.valuationDate.toString());
    //form.setValue("currency", optIn?.couponCurrency.toString());
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

    //console.log("mati", mati);

    form.setValue("maturity", Math.floor(+mati).toString());
    setMat(Math.floor(+mati));
  }, [maturityDate, issueDate]);

  useEffect(() => {
    const mati = valuationTypes.find(
      (va: any) => va.id == valuationType
    )?.modality;
    form.setValue("modality", mati as string);
  }, [valuationType]);

  useEffect(() => {
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

  const procesForm = async (values: z.infer<typeof FinOptSchema>) => {
    setLoading(true);

    //const dcurve = await createFinOpt(values, code);

    //console.log("type", type);

    //console.log("Values  ", values, type);

    /*     const mati = getYears(
      values?.maturityDate ? values?.maturityDate : "0",
      values?.issueDate ? values?.issueDate : "0"
    );

    console.log("mati", mati); */

    /*     if (type == "U") {
      const res = await updateFinOpt(values);
    } else {
      const res = await createFinOpt(values);
    }
 */
    const dcurve = await computeDC(values, disc, zcrates);
    if (dcurve?.data) setDisc(dcurve?.data);
    // console.log("dcurve", dcurve?.data);

    const global = await computeGeneralValuation(values, dcurve?.data);
    //if (global?.data) console.log("global", global?.data);

    if (global?.data) setDuration(global?.data.duration);

    const val = values?.notional ? +values?.notional : 0;
    const first = values.firstCouponDate ? values.firstCouponDate : "";
    // console.log("VAL", val);

    let cashflowFin = [];
    for (let i = 0; i < global?.data?.cash_flow?.length; i++) {
      cashflowFin.push({
        gross: val + val * +global?.data?.cash_flow[i],
        date: getYears(
          global?.data?.date[i].split("/").reverse().join("-"),
          first
        ),
        discounted: global?.data?.discounted_cash_flow[i],
      });
    }
    //console.log("cashflowFin", cashflowFin);

    setCashflow(cashflowFin);

    //console.log("lastData", lastData);

    // COMPUTE DMA
    const CMA = await computeCMA(
      values?.maturity,
      cashflowFin,
      lastData,
      zcrates
    );

    //console.log("CMA DATA", CMA?.data);

    if (CMA) setCma(CMA?.data);

    setLoading(false);
    // router.push(`/anadette/anaopfin/${values.code}`);
    // setOpen(false);
  };

  return (
    <div>
      <GeneralLayout
        title="Financing Options Analysis"
        bred={
          <CustomBreadcrumb
            name={`Financing Options Analysis:${pathname.split("/")[3]}`}
          />
        }
      >
        <div className="max-md:px-1 md:flex gap-4 w-full ">
          <div className="bg-gray-500/10 dark:bg-teal-200/10 w-1/2  max-md:w-full  p-4 rounded-xl">
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
                            <FormLabel className="text-sky-400 p-4 text-xl">
                              {`Option - ${optIn?.id}`}
                            </FormLabel>
                            <Select
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
                            </Select>

                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                  <div className="flex gap-4 ">
                    <div className="w-1/2 flex flex-col gap-4 ">
                      <>
                        <div className="flex justify-between items-center gap-4">
                          <FormField
                            control={form.control}
                            name="maturityDate"
                            render={({ field }) => {
                              return (
                                <FormItem className="w-1/2">
                                  <FormLabel>{"Maturity Date "}</FormLabel>
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
                          />

                          <FormField
                            control={form.control}
                            name="firstCouponDate"
                            render={({ field }) => {
                              return (
                                <FormItem className="w-1/2">
                                  <FormLabel>{"First Coupon Date "}</FormLabel>
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
                          />
                        </div>
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
                                      disabled
                                    />
                                  </FormControl>

                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                        </div>
                        <div className="flex gap-4">
                          <FormField
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
                          />
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
                        </div>
                      </>
                    </div>
                    <div className="max-md:hidden">
                      <Separator orientation="vertical" />
                    </div>
                    <div className="w-1/2 flex flex-col gap-4">
                      <div className="flex justify-between items-center gap-4">
                        <FormField
                          control={form.control}
                          name="valuationDate"
                          render={({ field }) => {
                            return (
                              <FormItem className="w-1/2">
                                <FormLabel>{"Valuation Date "}</FormLabel>
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
                      </div>

                      <div className="flex justify-between items-center gap-4">
                        <FormField
                          control={form.control}
                          name="recovering"
                          render={({ field }) => {
                            return (
                              <FormItem className="w-1/2">
                                <FormLabel>{"Recovering (%)"}</FormLabel>
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
                          name="modality"
                          render={({ field }) => {
                            return (
                              <FormItem className="w-1/2">
                                <FormLabel>{"Modality"}</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Entrer la valeur"
                                    type="text"
                                    disabled
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      </div>

                      <div className="flex justify-between items-center gap-4">
                        <FormField
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
                      </div>
                      <div className="flex justify-between items-center gap-4">
                        <FormField
                          control={form.control}
                          name="couponBasis"
                          render={({ field }) => {
                            return (
                              <FormItem className="w-1/2">
                                <FormLabel>Coupon Basis</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger id="framework">
                                    <SelectValue placeholder="Select a coupon basis" />
                                  </SelectTrigger>
                                  <SelectContent position="popper">
                                    {Object.values(CouponBasisList)?.map(
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
                  {!confirmDelete && (
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
                  )}

                  {confirmDelete && (
                    <Button
                      type="button"
                      variant="secondary"
                      className=" w-full md:w-1/3 bg-red-600 hover:bg-red-600"
                      onClick={async () => {
                        // console.log("optIn?.id", optIn?.id);

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
                  )}

                  <Button
                    type="button"
                    variant="secondary"
                    className="w-full md:w-1/3 bg-green-600 hover:bg-green-800"
                    onClick={async () => {
                      //console.log("Type", type);

                      const reso = await updateCashflow(
                        cashflow,
                        pathname.split("/")[3],
                        optIn?.id
                      );

                      if (type == "U") {
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
                  </Button>
                  {lastData?.length > 0 &&
                    lastData.length >= Math.floor(+mat) && (
                      <Button
                        type="submit"
                        className=" w-full md:w-1/3 hover:bg-sky-800 bg-sky-600 text-white uppercase"
                      >
                        {loading ? "Computing ..." : "Compute"}
                      </Button>
                    )}
                  {lastData?.length < 1 && (
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
                </div>
              </form>
            </Form>
          </div>

          <div className="flex flex-col w-1/2 gap-2">
            <div className="flex gap-2 bg-gray-500/10 dark:bg-teal-200/10 w-full rounded-xl p-4">
              <div className="bg-gray-500/10 dark:bg-teal-200/10 w-1/2 rounded-xl p-4">
                <p className="text-orange-600">
                  CMA:{" "}
                  <span className="text-white font-semibold">
                    {new Intl.NumberFormat(undefined, {
                      currency: curCode ? curCode : "USD",
                      style: "currency",
                    }).format(+cma?.toFixed(2))}
                  </span>
                </p>
                <p className="text-orange-600">
                  Duration:{" "}
                  <span className="text-white font-semibold">
                    {duration.toFixed(2)}
                  </span>
                </p>
              </div>
              <div className="bg-gray-500/10 dark:bg-teal-200/10 w-1/2 rounded-xl p-4">
                <p className="text-orange-600">Default Probability:</p>
                <p className="text-orange-600">Credit Risk:</p>
              </div>
            </div>
            <div className="flex gap-2 w-full">
              <>
                <div className=" border rounded-xl p-4 bg-sky-400/20 dark:bg-sky-400/30 md:w-1/3">
                  <ScrollArea className="h-96">
                    <p className="font-semibold">Reserves</p>
                    {/*                     <ReserveForm
                      code={optIn?.reserve}
                      openDialog={false}
                      refresh={refresh}
                      setRefresh={setRefresh}
                      type="A"
                    /> */}
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-left mx-0 px-0">
                            <p className="flex justify-between">
                              <span>Tenor</span>
                            </p>
                          </TableHead>
                          <TableHead className="text-right mx-0 px-0">
                            Value
                          </TableHead>

                          {/*   <TableHead className="text-left mx-0 px-0">
                            Actions
                          </TableHead> */}
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {lastData?.map((ic: any) => (
                          <TableRow key={ic.id}>
                            <TableCell className="text-left mx-0 px-0">
                              {ic.tenor}
                            </TableCell>
                            <TableCell className="text-right  mx-0 px-0">
                              <span className="text-white font-semibold">
                                {new Intl.NumberFormat(undefined, {
                                  currency: curCode ? curCode : "USD",
                                  style: "currency",
                                }).format(+ic.value?.toFixed(2))}
                              </span>
                            </TableCell>

                            {/*               <TableCell className="flex  items-center gap-4 text-right  mx-0 px-0 hover:cursor-pointer">
                                                         <ReserveForm
                                code={optIn?.reserve}
                                openDialog={false}
                                type="U"
                                reserveIn={ic}
                                refresh={refresh}
                                setRefresh={setRefresh}
                              />
                              <DelReserve
                                id={ic.id}
                                refresh={refresh}
                                setRefresh={setRefresh}
                                code={code}
                              /> 
                            </TableCell> */}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </div>
              </>
              {/*               <div className=" border rounded-xl p-4 bg-sky-400/20 dark:bg-sky-400/30 md:w-1/3">
                <ScrollArea className="flex h-96 gap-4">
                  <DCurve disc={disc} setDisc={setDisc} add={false} />
                </ScrollArea>
              </div> */}

              <div className=" border rounded-xl p-4 bg-neutral-400/20 md:w-1/3 ">
                <ScrollArea className="flex h-96 gap-4">
                  <p className="font-semibold">
                    ZC Curve - <span>{curCode}</span>
                  </p>
                  <ZCCurve zccurve={zcrates} />
                </ScrollArea>
              </div>

              <div className=" border rounded-xl p-4 bg-gray-500/10 dark:bg-teal-400/10 md:w-1/3 ">
                <ScrollArea className="flex h-96 gap-4  ">
                  <p className="font-semibold">Cashflow</p>
                  <Cashflow
                    cashflow={cashflow}
                    type="fin"
                    curCode={curCode}
                    fraction={true}
                  />
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </GeneralLayout>
    </div>
  );
};

export default OptAnaForm;

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

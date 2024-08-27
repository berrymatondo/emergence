"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
import { SBSchema } from "@/lib/schemas";
import {
  computeAccruedInterest,
  computeDuration,
  computeStraightBondPrice,
  computeYieldToMaturity,
  computeStraight_bond_cash_flow,
  computeDiscountCurve,
  computeGeneralStraightBond,
} from "@/lib/_sbActions";
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
import { Country, CountryList, Currency, DataTypeList } from "@prisma/client";
import { CouponBasisList, CouponFreqList, CurrencyList } from "@/lib/enums";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import GeneralLayout from "../generalLayout";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Separator } from "../ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { MdAdd, MdDelete, MdOutlineRemoveCircleOutline } from "react-icons/md";
import { getAllYC, getAllZC } from "@/lib/_ycAction";
import { getCurrency } from "@/lib/_otherActions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import InputCurve from "./inputCurve";

const initialCreditSpread = [
  { id: 1, tenor: 0, rate: 0.0 },
  { id: 2, tenor: 0.5, rate: 0.0 },
  { id: 3, tenor: 1.0, rate: 0.0 },
  { id: 4, tenor: 2.0, rate: 0.0 },
  { id: 5, tenor: 3.0, rate: 0.0 },
  { id: 6, tenor: 4.0, rate: 0.0 },
  { id: 7, tenor: 5.0, rate: 0.0 },
  { id: 8, tenor: 7.0, rate: 0.0 },
  { id: 9, tenor: 10.0, rate: 0.0 },
  { id: 10, tenor: 15.0, rate: 0.0 },
  { id: 11, tenor: 20.0, rate: 0.0 },
  { id: 12, tenor: 30.0, rate: 0.0 },
];

/* const initialInputCurve = [
  { id: 1, tenor: 0, rate: 0.0 },
  { id: 2, tenor: 0.5, rate: 0.0 },
  { id: 3, tenor: 1.0, rate: 0.0 },
  { id: 4, tenor: 2.0, rate: 0.0 },
  { id: 5, tenor: 3.0, rate: 0.0 },
  { id: 6, tenor: 4.0, rate: 0.0 },
  { id: 7, tenor: 5.0, rate: 0.0 },
  { id: 8, tenor: 7.0, rate: 0.0 },
  { id: 9, tenor: 10.0, rate: 0.0 },
  { id: 10, tenor: 15.0, rate: 0.0 },
  { id: 11, tenor: 20.0, rate: 0.0 },
  { id: 12, tenor: 30.0, rate: 0.0 },
]; */

const initialInputCurve: any[] = [{ id: 1, tenor: 0, rate: 0.0 }];

const newTab = [
  { date: "2024-04-02", usdcdf: 2780, usdeur: 0.931, dateOut: "Apr 2" },
  { date: "2024-04-03", usdcdf: 2780, usdeur: 0.929, dateOut: "Apr 3" },
  { date: "2024-04-04", usdcdf: 2780, usdeur: 0.923, dateOut: "Apr 4" },
  { date: "2024-04-05", usdcdf: 2775, usdeur: 0.923, dateOut: "Apr 5" },
  { date: "2024-04-08", usdcdf: 2775, usdeur: 0.923, dateOut: "Apr 8" },
  { date: "2024-04-09", usdcdf: 2760, usdeur: 0.921, dateOut: "Apr 9" },
  {
    date: "2024-04-10",
    usdcdf: 2760,
    usdeur: 0.921,
    dateOut: "Apr 10",
  },
  {
    date: "2024-04-11",
    usdcdf: 2763,
    usdeur: 0.931,
    dateOut: "Apr 11",
  },
  {
    date: "2024-04-12",
    usdcdf: 2763,
    usdeur: 0.932,
    dateOut: "Apr 12",
  },
  {
    date: "2024-04-15",
    usdcdf: 2760,
    usdeur: 0.939,
    dateOut: "Apr 15",
  },
  {
    date: "2024-04-16",
    usdcdf: 2760,
    usdeur: 0.941,
    dateOut: "Apr 16",
  },
  {
    date: "2024-04-17",
    usdcdf: 2760,
    usdeur: 0.941,
    dateOut: "Apr 17",
  },
  {
    date: "2024-04-18",
    usdcdf: 2755,
    usdeur: 0.937,
    dateOut: "Apr 18",
  },
  {
    date: "2024-04-19",
    usdcdf: 2781,
    usdeur: 0.939,
    dateOut: "Apr 19",
  },
  {
    date: "2024-04-22",
    usdcdf: 2781,
    usdeur: 0.938,
    dateOut: "Apr 22",
  },
  {
    date: "2024-04-23",
    usdcdf: 2792,
    usdeur: 0.932,
    dateOut: "Apr 23",
  },
  {
    date: "2024-04-24",
    usdcdf: 2780,
    usdeur: 0.932,
    dateOut: "Apr 24",
  },
  {
    date: "2024-04-25",
    usdcdf: 2780,
    usdeur: 0.935,
    dateOut: "Apr 25",
  },
  {
    date: "2024-04-26",
    usdcdf: 2770,
    usdeur: 0.934,
    dateOut: "Apr 26",
  },
  {
    date: "2024-04-27",
    usdcdf: 2783.379883,
    usdeur: 0.939,
    dateOut: "Apr 27",
  },
];

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

type StraightBondProps = {
  countries: any;
  currencies: any;
};

const StraightBond = ({ countries, currencies }: StraightBondProps) => {
  const [price, setPrice] = useState(0);
  const [bondPrice, setBondPrice] = useState(0);
  const [accruedInterest, setAccruedInterest] = useState(0);
  const [yieldToMaturity, setYieldToMaturity] = useState(0);
  const [duration, setDuration] = useState(0);
  const [show, setShow] = useState(false);
  const [yieldcurve, setYieldcurve] = useState<any>();
  const [zcrates, setZcrates] = useState<any>();
  const [inputCurve, setInputCurve] = useState(initialInputCurve);
  const [creditSpread, setCreditSpread] = useState<any>(initialCreditSpread);

  const [cur, setCur] = useState<any>();
  const [cashflow, setCashflow] = useState<any>();
  const [disc, setDisc] = useState<any>(initialDisc);
  const [loading, setLoading] = useState(false);
  const [notional, setNotional] = useState(0);

  const form = useForm<z.infer<typeof SBSchema>>({
    resolver: zodResolver(SBSchema),
    defaultValues: {
      //bondMaturityDate: new Date().toISOString(),
      price: "0",
      //bondMaturityDate: new Date().toISOString().split("T")[0],
      bondMaturityDate: "2030-07-30",
      couponCurrency: "1",
      //couponRate: "0.00",
      couponRate: "5",
      couponFrequency: "1",
      //firstCouponDate: new Date().toISOString().split("T")[0],
      firstCouponDate: "2023-07-30",
      couponBasis: "AA",
      //valuationDate: new Date().toISOString().split("T")[0],
      valuationDate: "2024-07-01",
      notional: "",
      forcedBondPrice: false,
      curveType: "zcc",
      curveTypeName: "",
      liquidityPremium: "0.00",
      defaultCountry: "1",
    },
  });

  const forcedBondPrice = form.watch("forcedBondPrice");
  const curveType = form.watch("curveType");
  const defaultCountry = form.watch("defaultCountry");
  const couponCurrency = form.watch("couponCurrency");

  useEffect(() => {
    const fetchYC = async (id: any) => {
      const resu = await getAllYC(true, +id);
      const data = resu?.data;
      setYieldcurve(data);
    };
    fetchYC(defaultCountry);

    // Fetch ZC Rates
    const fetchZC = async (id: any) => {
      const resu = await getAllZC(+id);
      const data = resu?.data;

      //console.log("ZC:", data);

      setZcrates(data);
    };
    fetchZC(couponCurrency);

    // Fetch Currency name
    const fetchCur = async (id: any) => {
      const resu = await getCurrency(+id);
      const dat = resu?.data;

      setCur(dat?.code);
    };
    fetchCur(couponCurrency);
  }, [defaultCountry, couponCurrency]);

  const procesForm = async (values: z.infer<typeof SBSchema>) => {
    setLoading(true);
    //console.log("Value:", values);
    setShow(false);

    /** START COMPUTE DISCOUNT CURVE */

    //console.log("zcc tp ", zcrates);
    //console.log("disci tp ", disc);

    //console.log("creditSpread", creditSpread);

    const dcurve = await computeDiscountCurve(
      values,
      disc,
      yieldcurve,
      zcrates,
      inputCurve,
      creditSpread,
      curveType
    );
    //console.log("DCurve", dcurve?.data);

    if (dcurve?.data) setDisc(dcurve?.data);

    /** END COMPUTE DISCOUNT CURVE */

    /** COMPUTE Straigth bond price, cashflow, duration and accrued interest */

    let tmp;
    const global = await computeGeneralStraightBond(values, dcurve?.data);
    if (global?.data) {
      // console.log("vAL", values);
      // console.log("GLOBAL", global?.data);

      /*       console.log("price", global?.data.price.toFixed(2));
      console.log("notional", values.notional);
      if (values.notional) {
        console.log("notional", +values?.notional * global?.data.price);
      } */

      //  console.log("values.forcedBondPrice", values.forcedBondPrice);

      let ttt = values?.price ? +values?.price : 0;
      const prix = values.forcedBondPrice
        ? ttt.toFixed(2)
        : (global?.data.price * 100).toFixed(2);
      /*       console.log("prix:", prix);
      if (values.notional) {
        console.log("NOT:", +prix * +values.notional);
        console.log("NOT:", (+prix * +values.notional) / 100.0);
      } */

      setBondPrice(global?.data.price);
      setPrice(global?.data.price);
      setAccruedInterest(global?.data.accrued_interest);
      setDuration(global?.data.duration);

      if (values?.notional) {
        // console.log("values?.notional", +values?.notional);

        if (+values?.notional > 0) {
          const tmpVal = (+prix * +values.notional) / 100.0;
          //    console.log("tmpVal:", tmpVal);

          setNotional(+tmpVal);
        } else {
          setNotional(0);
        }
      } else {
        // console.log("values?.notional", values?.notional);
        setNotional(0);
      }

      let cashflowFin = [];
      for (let i = 0; i < global?.data?.cash_flow?.length; i++) {
        cashflowFin.push({
          gross: global?.data?.cash_flow[i],
          date: global?.data?.date[i],
          discounted: global?.data?.discounted_cash_flow[i],
        });
      }
      setCashflow(cashflowFin);

      tmp = global?.data.price;
    }

    /*     let tmp;
    const result = await computeStraightBondPrice(values, dcurve?.data);
    if (result?.data) {
      setBondPrice(result?.data);
      setPrice(result?.data);
      tmp = result?.data;
    } */

    //console.log("PRIX", result?.data);

    /* const interest = await computeAccruedInterest(values, dcurve?.data);
    if (interest?.data) setAccruedInterest(interest?.data); */

    /*     if (forcedBondPrice) {
      console.log("values.price", values.price);

      setBondPrice(values.price ? +values.price : 0);
    } */

    //console.log("TMP", tmp);

    const yieldToMaturit = await computeYieldToMaturity(
      values,
      tmp,
      dcurve?.data
    );
    //console.log("values.price", values.price);

    //console.log("yieldToMaturity?.data ", yieldToMaturit?.data);
    if (yieldToMaturit?.data) {
      setYieldToMaturity(yieldToMaturit?.data);
      if (forcedBondPrice) {
        setBondPrice(values.price ? +values.price : 0);
        setShow(true);
      }
    }

    //Notional
    //console.log("price ", global?.data.price);
    //console.log("notional ", values.notional);

    //
    // console.log("yieldToMaturity?.data", yieldToMaturity?.data);

    /*  const duration = await computeDuration(values, dcurve?.data);
    if (duration?.data) setDuration(duration?.data); */

    /*     const cashflowOut = await computeStraight_bond_cash_flow(
      values,
      dcurve?.data
    ); */
    /*     console.log("cashflowOut?.data", cashflowOut?.data);
    let cashflowFin = [];
    for (let i = 0; i < cashflowOut?.data?.cash_flow?.length; i++) {
      cashflowFin.push({
        gross: cashflowOut?.data?.cash_flow[i],
        date: cashflowOut?.data?.date[i],
        discounted: cashflowOut?.data?.discounted_cash_flow[i],
      });
    }
    setCashflow(cashflowFin); */

    // Build Discounted curve
    //console.log("ici");

    /*     const dcurve = await computeDiscountCurve(
      values,
      disc,
      yieldcurve,
      zcrates,
      inputCurve,
      creditSpread,
      curveType
    ); */
    //console.log("DCurve", dcurve);

    // if (dcurve?.data) setDisc(dcurve?.data);

    // console.log("cashflowFin.data", cashflowFin);

    // if (cashflowOut?.data) setDuration(duration?.data);

    /*     if (result?.error) {
      toast.error(result?.error.toString());
    } */
    // console.log("result registerForm:", result);
    //console.log("result registerForm:", result?.success);

    setLoading(false);
  };

  return (
    <GeneralLayout
      title="Straight Bond Valuation"
      bred={<CustomBreadcrumb name="Straight Bond Valuation" />}
    >
      <div className="max-md:px-1 md:flex gap-4 w-full ">
        <div className="bg-gray-500/10 dark:bg-teal-200/10 w-2/3  max-md:w-full  p-4 rounded-xl">
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(procesForm)}
                className="space-y-6"
              >
                <div className="flex max-md:flex-col gap-4">
                  <div className="md:w-1/2 space-y-4">
                    <div className="flex justify-between items-center gap-4">
                      <FormField
                        control={form.control}
                        name="bondMaturityDate"
                        render={({ field }) => {
                          return (
                            <FormItem className=" w-1/2">
                              <FormLabel>{"Bond Maturity Date"}</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Entrer la valeur"
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
                        name="couponCurrency"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-1/2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <FormLabel>Currency</FormLabel>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Principal / Coupon Currency</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              {/*                         <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger id="framework">
                                  <SelectValue placeholder="Select a currency" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                  {Object.values(CurrencyList)?.map(
                                    (ur: any) => (
                                      <SelectItem key={ur} value={ur}>
                                        {ur}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select> */}

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
                        name="firstCouponDate"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-1/2">
                              <FormLabel>{"First Coupon Date"}</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Entrer la valeur"
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
                        name="notional"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-1/2">
                              <FormLabel className="w-1/2">
                                {"Notional"} ({cur})
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Entrer le montant"
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
                    <div>
                      <FormField
                        control={form.control}
                        name="forcedBondPrice"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-full">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  // onCheckedChange={field.onChange}
                                  onCheckedChange={() => {
                                    field.onChange(!field.value);
                                    setBondPrice(0);
                                  }}
                                />
                              </FormControl>
                              <Label className="ml-2" htmlFor="isIcc">
                                Forced Bond Price ?
                              </Label>

                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      {forcedBondPrice && (
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => {
                            return (
                              <FormItem className="w-1/2">
                                <FormLabel className="w-1/2">
                                  {"Forced Bond Price (%)"}
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Entrer le montant"
                                    type="number"
                                    step="0.01"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <div className="max-md:hidden">
                    <Separator orientation="vertical" />
                  </div>

                  <div className="w-full">
                    <div className="flex justify-between max-md:gap-4 gap-2">
                      <FormField
                        control={form.control}
                        name="curveType"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-1/3  max-md:w-1/2">
                              <FormLabel className="w-1/3">
                                {"Curve Type"}
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select curve type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="zcc">ZC Curve</SelectItem>
                                  <SelectItem value="yic">
                                    Yield Curve
                                  </SelectItem>
                                  <SelectItem value="inc">
                                    Input Curve
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      {curveType === "yic" && (
                        <FormField
                          control={form.control}
                          name="defaultCountry"
                          render={({ field }) => {
                            return (
                              <FormItem className="w-1/3  max-md:w-1/2 max-md:hidden">
                                <FormLabel className="w-1/3">
                                  {"Yield Country Curve"}
                                </FormLabel>

                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger id="framework">
                                    <SelectValue placeholder="Sélectionner un pays" />
                                  </SelectTrigger>
                                  <SelectContent position="popper">
                                    {countries?.map((ctr: Country) => (
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
                      )}

                      <FormField
                        control={form.control}
                        name="liquidityPremium"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-1/3  max-md:w-1/2">
                              <FormLabel className="w-1/3">
                                {"Liquidity premium (%) "}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter the value"
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
                    <div className="py-4 md:hidden">
                      {curveType === "yic" && (
                        <FormField
                          control={form.control}
                          name="defaultCountry"
                          render={({ field }) => {
                            return (
                              <FormItem className="w-1/3  max-md:w-1/2">
                                <FormLabel className="w-1/3">
                                  {"Yield Country Curve"}
                                </FormLabel>
                                {/*                               <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select country" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="zcc">
                                      ZC Curve
                                    </SelectItem>
                                    <SelectItem value="yic">
                                      Yield Curve
                                    </SelectItem>
                                    <SelectItem value="inc">
                                      Input Curve
                                    </SelectItem>
                                  </SelectContent>
                                </Select> */}
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger id="framework">
                                    <SelectValue placeholder="Sélectionner un pays" />
                                  </SelectTrigger>
                                  <SelectContent position="popper">
                                    {countries?.map((ctr: Country) => (
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
                      )}
                    </div>
                    <div className="w-full">
                      <ScrollArea className="flex h-72 w-full my-4 p-1 md:p-4 dark:bg-teal-400/10 ">
                        <div className="md:flex md:gap-2 max-md:grid max-md:grid-cols-2 max-md:gap-2">
                          <div className="border rounded-xl p-4 bg-sky-400/20 dark:bg-sky-400/30 md:w-1/3">
                            {/* <p className="font-semibold">Discount Curve</p> */}
                            <DCurve disc={disc} setDisc={setDisc} />
                          </div>
                          {curveType === "zcc" && (
                            <div className=" border rounded-xl p-4 bg-neutral-400/20 md:w-1/3 ">
                              <p className="font-semibold">
                                ZC Curve - <span>{cur}</span>
                              </p>
                              <ZCCurve zccurve={zcrates} />
                            </div>
                          )}
                          {curveType === "yic" && (
                            <div className=" border rounded-xl p-4 bg-neutral-400/20  md:w-1/3">
                              <p className="font-semibold">Yield Curve</p>
                              <YieldCurve yieldcurve={yieldcurve} />
                            </div>
                          )}
                          {curveType === "inc" && (
                            <div className=" border rounded-xl p-4 bg-card  md:w-1/3">
                              <InputCurve
                                inputCurve={inputCurve}
                                setInputCurve={setInputCurve}
                              />
                            </div>
                          )}
                          {curveType !== "yic" && (
                            <div className=" border rounded-xl p-4 bg-card  md:w-1/3">
                              {/*                               <p className="font-semibold">Credit Spread</p>
                               */}{" "}
                              <CreditSpread
                                creditSpread={creditSpread}
                                setCreditSpread={setCreditSpread}
                              />
                            </div>
                          )}
                        </div>
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                    </div>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full hover:bg-sky-800 bg-sky-600 text-white uppercase"
                >
                  {loading ? "Computing ..." : "Compute"}
                </Button>
              </form>
            </Form>
          </div>

          {bondPrice > 0 && (
            <div className="md:flex md:items-center md:justify-around border rounded-xl mt-4 p-4 bg-sky-400/20 dark:bg-sky-400/30">
              <div className="flex md:flex-col  justify-between items-center md:items-start gap-4">
                {!forcedBondPrice && (
                  <div className="flex gap-8">
                    <div className="grid flex-1 auto-rows-min gap-0.5 mt-4">
                      <div className=" text-muted-foreground">Bond Price</div>
                      <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                        {forcedBondPrice
                          ? bondPrice.toFixed(2)
                          : (bondPrice * 100).toFixed(2)}
                        <span className="text-sm font-normal text-muted-foreground">
                          %
                        </span>
                      </div>
                    </div>
                    <div className="grid flex-1 auto-rows-min gap-0.5 mt-4 dark:text-yellow-400">
                      <div className=" text-muted-foreground">Value</div>
                      <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                        {forcedBondPrice ? bondPrice.toFixed(2) : notional}
                        <span className="text-sm font-normal text-muted-foreground">
                          {cur}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {show && forcedBondPrice && (
                  <div className="flex gap-8">
                    <div className="grid flex-1 auto-rows-min gap-0.5 mt-4">
                      <div className="text-red-600 text-muted-foreground">
                        Forced Price
                      </div>
                      <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                        {forcedBondPrice
                          ? bondPrice.toFixed(2)
                          : (bondPrice * 100).toFixed(2)}
                        <span className="text-sm font-normal text-muted-foreground">
                          %
                        </span>
                      </div>
                    </div>
                    <div className="grid flex-1 auto-rows-min gap-0.5 mt-4 dark:text-yellow-400">
                      <div className=" text-muted-foreground">Value</div>
                      <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                        {notional}
                        <span className="text-sm font-normal text-muted-foreground">
                          {cur} ***
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className=" grid flex-1 auto-rows-min gap-0.5 mt-4">
                  <div className=" text-muted-foreground">Accrued Interest</div>
                  <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                    {(accruedInterest * 100).toFixed(2)}
                    <span className="text-sm font-normal text-muted-foreground">
                      %
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex md:flex-col justify-between items-center md:items-start gap-4">
                <div className="grid flex-1 auto-rows-min gap-0.5 mt-4">
                  <div className=" text-muted-foreground">
                    Yield to Maturity
                  </div>
                  <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                    {(yieldToMaturity * 100).toFixed(2)}
                    <span className="text-sm font-normal text-muted-foreground">
                      %
                    </span>
                  </div>
                </div>
                <div className="grid flex-1 auto-rows-min gap-0.5 mt-4">
                  <div className=" text-muted-foreground">Duration</div>
                  <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                    {duration ? duration.toFixed(2) : duration}
                    <span className="text-sm font-normal text-muted-foreground">
                      Years
                    </span>
                  </div>
                </div>
              </div>

              {/*               <div className="flex md:flex-col justify-between items-center md:items-start gap-4">
                <div className="grid flex-1 auto-rows-min gap-0.5 mt-4 bg-teal-400 dark:bg-teal-800 p-4 rounded-lg">
                  <div className=" text-muted-foreground">Value</div>
                  <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                    {notional.toFixed(2)}
                    <span className="text-sm font-normal text-muted-foreground">
                      {cur}
                    </span>
                  </div>
                </div>

              </div> */}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 max-md:gap-1 max-md:mt-1  w-1/3 max-md:w-full">
          <div>
            <p className="font-semibold max-md:p-2 pb-2 max-md:mt-4">
              Cashflows MAP
            </p>
            <ScrollArea className="flex h-72 w-full p-2 md:px-4 md:pb-4 rounded-lg bg-gray-500/10 dark:bg-teal-400/10 ">
              <Cashflow cashflow={cashflow} />
            </ScrollArea>
          </div>

          <p className="font-semibold px-2 pt-2 max-md:mt-4">Discount Curve</p>
          <Card
            className="border-none bg-gray-500/10 dark:bg-teal-200/10 flex flex-col max-md:w-full"
            x-chunk="charts-01-chunk-7"
          >
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
              <div className="flex justify-between items-center text-orange-400">
                {/*                 <Badge className="bg-orange-500 text-white">USDCDF</Badge>
                 */}{" "}
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 items-center">
              <ChartContainer
                config={{
                  usdcdf: {
                    label: "USDCDF",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="w-full"
              >
                <AreaChart
                  accessibilityLayer
                  margin={{
                    left: 14,
                    right: 14,
                    top: 10,
                  }}
                  data={disc}
                >
                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke="hsl(var(--muted-foreground))"
                    strokeOpacity={0.5}
                  />

                  <XAxis
                    dataKey="tenor"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    label={{
                      value: "Tenor",
                      angle: 0,
                      position: "insideTop",
                    }}
                  />

                  <YAxis
                    dataKey="rate"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    label={{
                      value: "Rate(%)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />

                  {/*                   <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
                   */}
                  <defs>
                    <linearGradient id="fillTime" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="var(--color-usdcdf)"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-usdcdf)"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey="rate"
                    type="linear"
                    fill="url(#fillTime)"
                    stroke="var(--color-usdcdf)"
                    strokeWidth={1}
                    activeDot={{
                      r: 4,
                    }}
                    dot={false}
                    fillOpacity={0.4}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                    formatter={(value) => (
                      <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                        Rate
                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                          {value}
                          <span className="font-normal text-muted-foreground">
                            %
                          </span>
                        </div>
                      </div>
                    )}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </GeneralLayout>
  );
};

export default StraightBond;

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
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const CurveType = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Curve Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">ZC Curve</SelectItem>
        <SelectItem value="dark">Yield Curve</SelectItem>
        <SelectItem value="system">Input Curve</SelectItem>
      </SelectContent>
    </Select>
  );
};

type YieldCurveProps = {
  yieldcurve: any;
};
const YieldCurve = ({ yieldcurve }: YieldCurveProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left mx-0 px-0">Tenor</TableHead>

          <TableHead className="text-right  mx-0 px-0">Yield</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {yieldcurve?.map((yc: any) => (
          <TableRow key={yc.id}>
            <TableCell className="font-medium  mx-0 px-0">{yc.tenor}</TableCell>

            <TableCell className="text-right  mx-0 px-0">{yc.yield}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

type ZCCurveProps = {
  zccurve: any;
};
const ZCCurve = ({ zccurve }: ZCCurveProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left mx-0 pl-0 pr-2">Tenor</TableHead>

          <TableHead className="text-right  mx-0 px-0">Rate</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {zccurve?.map((yc: any) => (
          <TableRow key={yc.id}>
            <TableCell className="font-medium  mx-0 px-0">{yc.tenor}</TableCell>

            <TableCell className="text-right  mx-0 px-0">{yc.rate} %</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

type CreditSpreadProps = {
  creditSpread: any;
  setCreditSpread: (el: any) => void;
};
const CreditSpread = ({ creditSpread, setCreditSpread }: CreditSpreadProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-semibold">Credit Spread</p>
        <AddCreditSpread creditSpread={creditSpread} openDialog={false} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left mx-0 px-0">
              <p className="flex justify-between">
                <span>Tenor</span>
                <span> Rate</span>
              </p>
            </TableHead>
            {/*           <TableHead className="text-right  mx-0 px-0">Rate</TableHead>
             */}{" "}
          </TableRow>
        </TableHeader>
        <TableBody>
          {creditSpread?.map((yc: any) => (
            <TableRow key={yc.id}>
              {/*             <TableCell className="font-medium  mx-0 px-0">{yc.tenor}</TableCell>
               */}
              <TableCell className="text-right  mx-0 px-0">
                {/*               {yc.yield}
                 */}{" "}
                <UpdateCreditSpread
                  creditSpread={creditSpread}
                  cs={yc}
                  openDialog={false}
                  setCreditSpread={setCreditSpread}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

type UpdateCreditSpreadProps = {
  creditSpread: any;
  cs: any;
  openDialog: boolean;
  setCreditSpread: (el: any) => void;
};
const UpdateCreditSpread = ({
  creditSpread,
  cs,
  openDialog,
  setCreditSpread,
}: UpdateCreditSpreadProps) => {
  const [open, setOpen] = useState(openDialog);
  const [tenor, setTenor] = useState(cs.tenor);
  const [rate, setRate] = useState(cs.rate);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <div className="flex justify-between">
          <span>{cs?.tenor}</span>
          <span>{cs?.rate} %</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will update the credit spread.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // console.log("New Tenor:", tenor);
            // console.log("New Rate:", rate);
            /*             console.log("creditSpread", creditSpread); */

            //Find index of specific object using findIndex method.
            const objIndex = creditSpread.findIndex(
              (obj: any) => obj.id == cs.id
            );

            //Log object to Console.
            //console.log("Before update: ", creditSpread[objIndex]);

            //Update object's name property.
            creditSpread[objIndex].tenor = +tenor;
            creditSpread[objIndex].rate = +rate;

            creditSpread.sort((a: any, b: any) => a.tenor - b.tenor);
            //Log object to console again.
            // console.log("After update: ", creditSpread[objIndex]);
            //console.log("After update: ", creditSpread);
            setOpen(!open);
          }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div>
                <Label>Tenor:</Label>
                <Input
                  //defaultValue={cs.tenor}
                  value={tenor}
                  type="number"
                  step="0.01"
                  onChange={(e: any) => setTenor(e.target.value)}
                />
              </div>
              <div>
                <Label>Rate:</Label>
                <Input
                  //defaultValue={cs.yield}
                  value={rate}
                  type="number"
                  step="0.01"
                  onChange={(e: any) => setRate(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                type="button"
                onClick={() => {
                  creditSpread = creditSpread
                    .filter((el: any) => el.id != cs.id)
                    .sort((a: any, b: any) => a.tenor - b.tenor);

                  //inputCurve.sort((a: any, b: any) => a.tenor - b.tenor);
                  //Log object to console again.
                  // console.log("After update: ", creditSpread[objIndex]);
                  setCreditSpread(creditSpread);
                  // console.log("After update: ", creditSpread);
                  setOpen(!open);
                }}
              >
                Delete
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </div>
          {/*           <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter> */}
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// Add Credit Spread
// Add Input

type AddCreditSpreadProps = {
  creditSpread: any;

  openDialog: boolean;
};

const AddCreditSpread = ({
  creditSpread,
  openDialog,
}: AddCreditSpreadProps) => {
  const [open, setOpen] = useState(openDialog);
  const [tenor, setTenor] = useState(0);
  const [rate, setRate] = useState(0);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <MdAdd className="bg-sky-600 rounded-full" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will add a data into the credit spread curve.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            creditSpread.push({
              id: creditSpread.length + 1,
              tenor: +tenor,
              rate: +rate,
            });

            creditSpread.sort((a: any, b: any) => a.tenor - b.tenor);

            setOpen(!open);
          }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div>
                <Label>Tenor:</Label>
                <Input
                  //defaultValue={cs.tenor}
                  value={tenor}
                  type="number"
                  step="0.01"
                  onChange={(e: any) => setTenor(e.target.value)}
                />
              </div>
              <div>
                <Label>Rate:</Label>
                <Input
                  //defaultValue={cs.yield}
                  value={rate}
                  type="number"
                  step="0.01"
                  onChange={(e: any) => setRate(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <Button type="submit">Save</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// Cashflows Maps
type CashflowProps = {
  cashflow: any;
};
const Cashflow = ({ cashflow }: CashflowProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left mx-0 pl-0 pr-2">
            Payment Date
          </TableHead>
          <TableHead className="mx-0 pl-0">Gross Payment</TableHead>

          <TableHead className="text-right  mx-0 px-0">
            Discounted Payment
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cashflow?.map((yc: any) => (
          <TableRow key={yc.id}>
            <TableCell className="font-medium  mx-0 px-0">
              {yc.date.split("-").reverse().join("-")}
            </TableCell>
            <TableCell className="  mx-0 px-0">
              {(yc.gross * 100).toFixed(2)}%
            </TableCell>

            <TableCell className="text-right  mx-0 px-0">
              {(yc.discounted * 100).toFixed(2)}%
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

type DCurveProps = {
  disc: any;
  setDisc: (el: any) => void;
};

const DCurve = ({ disc, setDisc }: DCurveProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-semibold">Discount Curve</p>
        <AddDisc disc={disc} openDialog={false} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left mx-0 pl-0 pr-2">
              {" "}
              <p className="flex justify-between">
                <span>Tenor</span>
                <span> Rate</span>
              </p>
            </TableHead>
            {/*             <TableHead className="text-right  mx-0 px-0">Rate</TableHead>
             */}{" "}
          </TableRow>
        </TableHeader>
        <TableBody>
          {disc?.map((yc: any) => (
            <TableRow key={yc.id}>
              {/*               <TableCell className="font-medium  mx-0 px-0">
                {yc.tenor}
              </TableCell> */}

              <TableCell className="text-right  mx-0 px-0">
                {/*                 {yc.rate.toFixed(2)} %

 */}
                <UpdateDCurve
                  disc={disc}
                  dc={yc}
                  openDialog={false}
                  setDisc={setDisc}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// ADD ZC
type AddDiscProps = {
  disc: any;

  openDialog: boolean;
};

const AddDisc = ({ disc, openDialog }: AddDiscProps) => {
  const [open, setOpen] = useState(openDialog);
  const [tenor, setTenor] = useState(0);
  const [rate, setRate] = useState(0);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <MdAdd className="bg-sky-600 rounded-full" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will add a data into the credit spread curve.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            disc.push({
              id: disc.length + 1,
              tenor: +tenor,
              rate: 0,
            });

            disc.sort((a: any, b: any) => a.tenor - b.tenor);

            //console.log("DISC", disc);

            setOpen(!open);
          }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div>
                <Label>Tenor:</Label>
                <Input
                  //defaultValue={cs.tenor}
                  value={tenor}
                  type="number"
                  step="0.01"
                  onChange={(e: any) => setTenor(e.target.value)}
                />
              </div>
              {/*               <div>
                <Label>Rate:</Label>
                <Input
                  //defaultValue={cs.yield}
                  value={rate}
                  type="number"
                  step="0.01"
                  onChange={(e: any) => setRate(e.target.value)}
                />
              </div> */}
            </div>
            <div className="flex justify-between">
              <Button type="submit">Save</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

//Update DCurve
type UpdateDCurveProps = {
  disc: any;
  dc: any;
  openDialog: boolean;
  setDisc: (el: any) => void;
};
const UpdateDCurve = ({
  disc,
  dc,
  openDialog,
  setDisc,
}: //setCreditSpread,
UpdateDCurveProps) => {
  const [open, setOpen] = useState(openDialog);
  const [tenor, setTenor] = useState(dc.tenor);
  const [rate, setRate] = useState(dc.rate);
  //console.log("DC: ", dc);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <div className="flex justify-between">
          <span>{dc?.tenor}</span>
          <span>{dc?.rate.toFixed(2)} %</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will update the credit spread.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // console.log("New Tenor:", tenor);
            // console.log("New Rate:", rate);
            /*             console.log("creditSpread", creditSpread); */

            //Find index of specific object using findIndex method.
            //console.log("disc", disc);
            //console.log("dc.id", dc.id);

            const objIndex = disc.findIndex((obj: any) => obj.id == dc.id);

            //Log object to Console.
            //console.log("Before update: ", creditSpread[objIndex]);

            //Update object's name property.
            disc[objIndex].tenor = +tenor;
            disc[objIndex].rate = +rate;

            disc.sort((a: any, b: any) => a.tenor - b.tenor);
            //Log object to console again.
            // console.log("After update: ", creditSpread[objIndex]);
            //console.log("After update: ", creditSpread);
            setOpen(!open);
          }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div>
                <Label>Tenor:</Label>
                <Input
                  //defaultValue={cs.tenor}
                  value={tenor}
                  type="number"
                  step="0.01"
                  onChange={(e: any) => setTenor(e.target.value)}
                />
              </div>
              {/*               <div>
                <Label>Rate:</Label>
                <Input
                  //defaultValue={cs.yield}
                  value={rate}
                  type="number"
                  step="0.01"
                  onChange={(e: any) => setRate(e.target.value)}
                />
              </div> */}
            </div>
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                type="button"
                onClick={() => {
                  disc = disc
                    .filter((el: any) => el.id != dc.id)
                    .sort((a: any, b: any) => a.tenor - b.tenor);

                  //inputCurve.sort((a: any, b: any) => a.tenor - b.tenor);
                  //Log object to console again.
                  // console.log("After update: ", creditSpread[objIndex]);
                  setDisc(disc);
                  // console.log("After update: ", creditSpread);
                  setOpen(!open);
                }}
              >
                Delete
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </div>
          {/*           <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter> */}
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

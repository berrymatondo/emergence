"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../ui/breadcrumb";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { computeDiscountCurve, computeDiscountCurve2 } from "@/lib/_sbActions";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Country, CountryList, Currency, DataTypeList } from "@prisma/client";
import {
  CouponBasisList,
  CouponFreqList,
  CurrencyList,
  LabelList,
  SwapFreqList,
} from "@/lib/enums";
import { Checkbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";
import GeneralLayout from "../../generalLayout";

import { Separator } from "../../ui/separator";

import { ScrollArea, ScrollBar } from "../../ui/scroll-area";

import { getAllYC, getAllZC } from "@/lib/_ycAction";
import { getAllForwardRates, getCurrency } from "@/lib/_otherActions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import InputCurve from "../../commonCurves/inputCurve";
import CreditSpread from "../../commonCurves/creditSpread";
import YieldCurve from "../../commonCurves/yieldCurve";
import ZCCurve from "../../commonCurves/zcCurve";
import Cashflow from "../../commonCurves/cashflow";
import DCurve from "../../commonCurves/dCurve";
import GrapheValue from "../../commonCurves/grapheValue";
import {
  computeDualYieldToMaturity,
  computeGeneralDualBond,
} from "@/lib/_dualActions";
import {
  computeCrossCurrencySwap,
  computeCrossDiscountCurve,
} from "@/lib/_bankActions";
import UserInputs from "../userInputs";
import { CrossPriceSchema } from "@/lib/schemas";
import LegCashflow from "@/components/commonCurves/legCashFlow";

const initialCreditSp = [
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

const initialCreditSp2 = [
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
const initialInputCurve2: any[] = [{ id: 1, tenor: 0, rate: 0.0 }];

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

const initialDisc2 = [
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
const initialInputs: any[] = [{ id: 1, tenor: 0, rate: 2 }];

type CrossSwapProps = {
  countries: any;
  currencies: any;
};

const CrossSwap = ({ countries, currencies }: CrossSwapProps) => {
  const [price, setPrice] = useState(0);
  const [bondPrice, setBondPrice] = useState(0);
  const [accruedInterest, setAccruedInterest] = useState(0);
  const [yieldToMaturity, setYieldToMaturity] = useState(0);
  const [duration, setDuration] = useState(0);
  const [show, setShow] = useState(false);
  const [yieldcurve, setYieldcurve] = useState<any>();
  const [yieldcurve2, setYieldcurve2] = useState<any>();
  const [zcrates, setZcrates] = useState<any>();
  const [zcrates2, setZcrates2] = useState<any>();
  const [forwardrates, setForwardrates] = useState<any>();
  const [inputCurve, setInputCurve] = useState(initialInputCurve);
  const [inputCurve2, setInputCurve2] = useState(initialInputCurve2);
  const [creditSpread, setCreditSpread] = useState<any>(initialCreditSp);
  const [creditSpread2, setCreditSpread2] = useState<any>(initialCreditSp2);
  const [inputs, setInputs] = useState<any>(initialInputs);
  const [cur, setCur] = useState<any>();
  const [cur2, setCur2] = useState<any>();
  const [cashflow, setCashflow] = useState<any>();
  const [disc, setDisc] = useState<any>(initialDisc);
  const [disc2, setDisc2] = useState<any>(initialDisc2);
  const [loading, setLoading] = useState(false);
  const [notional, setNotional] = useState(0);
  const [fixed, setFixed] = useState<any>();
  const [swapValue, setSwapValue] = useState(0);
  const [swapNotional1, setSwapNotional1] = useState(0);
  const [floating, setFloating] = useState<any>();

  const form = useForm<z.infer<typeof CrossPriceSchema>>({
    resolver: zodResolver(CrossPriceSchema),
    defaultValues: {
      //bondMaturityDate: new Date().toISOString(),
      //price: "0",
      //bondMaturityDate: new Date().toISOString().split("T")[0],
      //bondMaturityDate: "2030-07-30",
      startDate: "2023-12-30",
      endDate: "2030-01-01",
      swapNotional1: "100000",
      swapNotional2: "100000",
      fixedRate1: "3",
      exchangeRate: "1.1",

      fixedCurrency: "1",
      floatingCurrency: "1",
      //couponRate: "0.00",

      curveType: "zcc",
      curveType2: "zcc2",

      liquidityPremium: "0.00",
      liquidityPremium2: "0.00",

      fixedFrequency: "6 months",
      floatingFrequency: "6 months",

      curveTypeName: "",

      defaultCountry: "1",
      defaultCountry2: "1",

      swapPayer: "fixedLeg",
      swapReceiver: "floatingLeg",

      valuationDate: "2024-07-01",
      //label: "1M",
    },
  });

  const curveType = form.watch("curveType");
  const curveType2 = form.watch("curveType2");
  const defaultCountry = form.watch("defaultCountry");
  const defaultCountry2 = form.watch("defaultCountry2");
  const fixedCurrency = form.watch("fixedCurrency");
  const floatingCurrency = form.watch("floatingCurrency");
  const valuationDate = form.watch("valuationDate");
  const swapPayer = form.watch("swapPayer");
  //const label = form.watch("label");

  useEffect(() => {
    if (swapPayer == "fixedLeg") form.setValue("swapReceiver", "Floating Leg");
    else form.setValue("swapReceiver", "Fixed Leg");
  }, [swapPayer]);

  useEffect(() => {
    const fetchYC = async (id: any, date: any) => {
      const resu = await getAllYC(true, +id, date);
      const data = resu?.data;
      setYieldcurve(data);
    };
    fetchYC(defaultCountry, valuationDate);

    const fetchYC2 = async (id: any, date: any) => {
      const resu = await getAllYC(true, +id, date);
      const data = resu?.data;
      setYieldcurve2(data);
    };
    fetchYC2(defaultCountry2, valuationDate);

    // Fetch ZC Rates
    const fetchZC = async (id: any, date: any) => {
      const resu = await getAllZC(+id, date);
      const data = resu?.data;

      //console.log("ZC:", data);

      setZcrates(data);
    };
    fetchZC(fixedCurrency, valuationDate);

    const fetchZC2 = async (id: any, date: any) => {
      const resu = await getAllZC(+id, date);
      const data = resu?.data;

      //console.log("ZC:", data);

      setZcrates2(data);
    };
    fetchZC2(floatingCurrency, valuationDate);

    // Fetch Forward Rates
    /*     const fetchFR = async (id: any, label: string) => {
      const resu = await getAllForwardRates(+id, label);
      const data = resu?.data;

      //console.log("ZC:", data);

      setForwardrates(data);
    };
    fetchFR(couponCurrency, label ? label : "1M");
 */
    // Fetch Currency name
    const fetchCur = async (id: any) => {
      const resu = await getCurrency(+id);
      const dat = resu?.data;

      setCur(dat?.code);

      // console.log("fixedCurrency", fixedCurrency);
    };
    fetchCur(fixedCurrency);

    const fetchCur2 = async (id: any) => {
      const resu = await getCurrency(+id);
      const dat = resu?.data;

      setCur2(dat?.code);
    };
    fetchCur2(floatingCurrency);
  }, [
    defaultCountry,
    fixedCurrency,
    defaultCountry2,
    floatingCurrency,
    valuationDate,
  ]);

  // }, [defaultCountry, couponCurrency, label]);

  const procesForm = async (values: z.infer<typeof CrossPriceSchema>) => {
    setLoading(true);
    //console.log("Value:", values);
    setShow(false);

    /** START COMPUTE DISCOUNT CURVE */

    //console.log("zcc  ", curveType);
    //console.log("zcc 2 ", curveType2);
    //console.log("disci tp ", disc);

    //console.log("creditSpread", creditSpread);

    const dcurve = await computeCrossDiscountCurve(
      values,
      disc,
      yieldcurve,
      zcrates,
      inputCurve,
      creditSpread,
      curveType
    );

    const dcurve2 = await computeCrossDiscountCurve(
      values,
      disc2,
      yieldcurve2,
      zcrates2,
      inputCurve2,
      creditSpread2,
      curveType2
    );
    //console.log("DCurve", dcurve?.data);
    //console.log("DCurve2", dcurve2?.data);

    if (dcurve?.data) setDisc(dcurve?.data);
    if (dcurve2?.data) setDisc2(dcurve2?.data);

    /** END COMPUTE DISCOUNT CURVE */

    /** COMPUTE Straigth bond price, cashflow, duration and accrued interest */

    let tmp;
    const dcurvex = await computeCrossCurrencySwap(
      values,
      dcurve?.data,
      dcurve2?.data,
      inputs
    );

    if (dcurvex?.data) {
      //console.log("dcurvex?.data.swap_value", dcurvex?.data.swap_value);

      setSwapValue(dcurvex?.data.swap_value);
      setSwapNotional1(values.swapNotional1 ? +values.swapNotional1 : 0);
      setFixed(dcurvex?.data.leg_1_cashflows);
      setFloating(dcurvex?.data.leg_2_cashflows);
    }

    //console.log("GLOBAL", global?.data);

    /*     if (global?.data) {
      let ttt = values?.price ? +values?.price : 0;
      const prix = values.forcedBondPrice
        ? ttt.toFixed(2)
        : (global?.data.price * 100).toFixed(2);

      setBondPrice(global?.data.price);
      setPrice(global?.data.price);
      setAccruedInterest(global?.data.accrued_interest);
      setDuration(global?.data.duration);

      if (values?.notional) {
        if (+values?.notional > 0) {
          const tmpVal = (+prix * +values.notional) / 100.0;

          setNotional(+tmpVal);
        } else {
          setNotional(0);
        }
      } else {
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
    } */

    /*     const yieldToMaturit = await computeDualYieldToMaturity(
      values,
      tmp,
      dcurve?.data
    );

    if (yieldToMaturit?.data) {
      setYieldToMaturity(yieldToMaturit?.data);
      if (forcedBondPrice) {
        setBondPrice(values.price ? +values.price : 0);
        setShow(true);
      }
    }
 */
    setLoading(false);
  };

  return (
    <GeneralLayout
      title="Cross Currency Swap Valuation"
      bred={<CustomBreadcrumb name="Cross Currency Swap Valuation" />}
    >
      <div className="max-md:px-1 md:flex gap-4 w-full ">
        <div className="bg-gray-500/10 dark:bg-teal-200/10 w-full  max-md:w-full  p-4 rounded-xl">
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(procesForm)}
                className="space-y-6"
              >
                <div className="flex max-md:flex-col gap-4">
                  <div className="md:w-1/4 space-y-4">
                    <div className="flex justify-between items-center gap-4">
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => {
                          return (
                            <FormItem className=" w-1/2">
                              <FormLabel>{"Start Date"}</FormLabel>
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
                        name="endDate"
                        render={({ field }) => {
                          return (
                            <FormItem className=" w-1/2">
                              <FormLabel>{"End Date"}</FormLabel>
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
                    </div>

                    <div className="flex justify-between items-center gap-4">
                      <FormField
                        control={form.control}
                        name="fixedCurrency"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-1/2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <FormLabel>Fixed Leg Currency</FormLabel>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Fixed Leg Currency</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

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
                        name="floatingCurrency"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-1/2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <FormLabel>Floating Currency</FormLabel>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Floating Currency</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

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
                        name="exchangeRate"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-1/2">
                              <FormLabel>{"Exchange Rate (%)"}</FormLabel>
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
                        name="fixedRate1"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-1/2">
                              <FormLabel>{"Fixed Rate (%)"}</FormLabel>
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
                        name="fixedFrequency"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-1/2">
                              <FormLabel>Payment Frequency</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger id="framework">
                                  <SelectValue placeholder="Select a frequency" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                  {Object.values(SwapFreqList)?.map(
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
                        name="floatingFrequency"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-1/2 hidden">
                              <FormLabel>Floating Frequency</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger id="framework">
                                  <SelectValue placeholder="Select a frequency" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                  {Object.values(SwapFreqList)?.map(
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
                        name="swapPayer"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-1/2">
                              <FormLabel>Swap Payer</FormLabel>
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
                                  <SelectItem value="fixedLeg">
                                    Fixed Leg
                                  </SelectItem>
                                  <SelectItem value="floatingLeg">
                                    Floating Leg
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      {/*                       <FormField
                        control={form.control}
                        name="swapReceiver"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-1/2">
                              <FormLabel>Swap Receiver</FormLabel>
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
                                  <SelectItem value="fixedLeg">
                                    Fixed Leg
                                  </SelectItem>
                                  <SelectItem value="floatingLeg">
                                    Floating Leg
                                  </SelectItem>
                                </SelectContent>
                              </Select>

                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      /> */}

                      <FormField
                        control={form.control}
                        name="swapReceiver"
                        render={({ field }) => {
                          return (
                            <FormItem className=" w-1/2">
                              <FormLabel>{"Swap Receiver"}</FormLabel>
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

                    <div className="flex   md:justify-between md:items-center gap-2">
                      <FormField
                        control={form.control}
                        name="swapNotional1"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-1/2">
                              <FormLabel className="w-1/2">
                                {"Notional Fixed"} ({cur})
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

                      <FormField
                        control={form.control}
                        name="swapNotional2"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-1/2">
                              <FormLabel className="w-1/2">
                                {"Notional Floating"} ({cur})
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
                  </div>
                  <div className="max-md:hidden">
                    <Separator orientation="vertical" />
                  </div>

                  <div className="w-full">
                    <div className="max-md:grid max-md:grid-cols-2 md:flex md:justify-between max-md:gap-4 gap-2">
                      <FormField
                        control={form.control}
                        name="curveType"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-1/3  max-md:w-full">
                              <FormLabel className="w-1/3">
                                {"Fixed Curve Type"}
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

                      <FormField
                        control={form.control}
                        name="curveType2"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-1/3  max-md:w-full">
                              <FormLabel className="w-1/3">
                                {"Floating Curve Type"}
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
                                  <SelectItem value="zcc2">ZC Curve</SelectItem>
                                  <SelectItem value="yic2">
                                    Yield Curve
                                  </SelectItem>
                                  <SelectItem value="inc2">
                                    Input Curve
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      {/*                       <FormField
                        control={form.control}
                        name="label"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-1/3  max-md:w-1/2 max-md:hidden">
                              <FormLabel className="w-1/3">{"Label"}</FormLabel>

                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger id="framework">
                                  <SelectValue placeholder="Sélectionner un label" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                  {Object.values(LabelList)?.map((ur: any) => (
                                    <SelectItem key={ur} value={ur}>
                                      {ur}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      /> */}

                      {curveType === "yic" && (
                        <FormField
                          control={form.control}
                          name="defaultCountry"
                          render={({ field }) => {
                            return (
                              <FormItem className="w-1/3  max-md:w-1/2 max-md:hidden">
                                <FormLabel className="w-1/3">
                                  {"Country"}
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

                      {curveType2 === "yic2" && (
                        <FormField
                          control={form.control}
                          name="defaultCountry2"
                          render={({ field }) => {
                            return (
                              <FormItem className="w-1/3  max-md:w-1/2 max-md:hidden">
                                <FormLabel className="w-1/3">
                                  {"Country 2"}
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
                            <FormItem className="w-1/3  max-md:w-full">
                              <FormLabel className="w-1/3">
                                {"Fixed Liq. premium (%) "}
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

                      <FormField
                        control={form.control}
                        name="liquidityPremium2"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-1/3  max-md:w-full">
                              <FormLabel className="w-1/3">
                                {"Floating Liq. premium (%) "}
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
                    <div className="py-4 md:hidden flex gap-4 ">
                      {curveType === "yic" && (
                        <FormField
                          control={form.control}
                          name="defaultCountry"
                          render={({ field }) => {
                            return (
                              <FormItem className="w-1/3  max-md:w-full">
                                <FormLabel className="w-1/3">
                                  {"Country"}
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
                      {curveType2 === "yic2" && (
                        <FormField
                          control={form.control}
                          name="defaultCountry2"
                          render={({ field }) => {
                            return (
                              <FormItem className="w-1/3  max-md:w-full">
                                <FormLabel className="w-1/3">
                                  {"Country 2"}
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
                    </div>
                    <div className="w-full md:max-w-fit">
                      <div className="flex flex-col justify-end max-w-full overflow-hidden md:container">
                        <ScrollArea className="max-md:hidden flex w-full h-72 my-4 p-1 md:p-4 dark:bg-teal-400/10 whitespace-nowrap rounded-md border ">
                          {/*                         <div className="md:flex md:gap-2 max-md:grid max-md:grid-cols-2 max-md:gap-2">
                           */}{" "}
                          <div className="flex max-md:grid w-max space-x-4 p-4">
                            <div className=" border rounded-xl p-4 bg-neutral-400/20 md:w-1/3 ">
                              <UserInputs
                                inputs={inputs}
                                setInputs={setInputs}
                                title="Floating Leg"
                                label={true}
                                labelName="Rate"
                              />
                            </div>
                            <div className="border rounded-xl p-4 bg-sky-400/20 dark:bg-sky-400/30 md:w-1/3">
                              {/* <p className="font-semibold">Discount Curve</p> */}
                              <DCurve
                                disc={disc}
                                setDisc={setDisc}
                                title="Dis. Curve Fixed"
                              />
                            </div>
                            <div className="border rounded-xl p-4 bg-sky-400/20 dark:bg-sky-400/30 md:w-1/3">
                              {/* <p className="font-semibold">Discount Curve</p> */}
                              <DCurve
                                disc={disc2}
                                setDisc={setDisc2}
                                title="Dis. Curve Floating"
                              />
                            </div>
                            {curveType === "zcc" && (
                              <div className=" border rounded-xl p-4 bg-neutral-400/20 ">
                                <p className="font-semibold text-sm mr-2">
                                  ZC Curve Fixed - <span>{cur}</span>
                                </p>
                                <ZCCurve zccurve={zcrates} />
                              </div>
                            )}
                            {curveType2 === "zcc2" && (
                              <div className=" border rounded-xl p-4 bg-neutral-400/20 ">
                                <p className="font-semibold  text-sm mr-2">
                                  ZC Curve Floating - <span>{cur2}</span>
                                </p>
                                <ZCCurve zccurve={zcrates2} />
                              </div>
                            )}
                            {curveType === "yic" && (
                              <div className=" border rounded-xl p-4 bg-neutral-400/20  ">
                                <p className="font-semibold  text-sm mr-2">
                                  Yield Curve Fixed
                                </p>
                                <YieldCurve yieldcurve={yieldcurve} />
                              </div>
                            )}
                            {curveType2 === "yic2" && (
                              <div className=" border rounded-xl p-4 bg-neutral-400/20 ">
                                <p className="font-semibold  text-sm mr-2">
                                  Yield Curve Floating
                                </p>
                                <YieldCurve yieldcurve={yieldcurve2} />
                              </div>
                            )}
                            {curveType === "inc" && (
                              <div className=" border rounded-xl p-4 bg-card  ">
                                <InputCurve
                                  inputCurve={inputCurve}
                                  setInputCurve={setInputCurve}
                                  title="Input Curve Fixed"
                                />
                              </div>
                            )}
                            {curveType2 === "inc2" && (
                              <div className=" border rounded-xl p-4 bg-card  ">
                                <InputCurve
                                  inputCurve={inputCurve2}
                                  setInputCurve={setInputCurve2}
                                  title="Input Curve Floating"
                                />
                              </div>
                            )}
                            {curveType !== "yic" && (
                              <div className=" border rounded-xl p-4 bg-card  ">
                                {/*                               <p className="font-semibold">Credit Spread</p>
                                 */}{" "}
                                <CreditSpread
                                  creditSpread={creditSpread}
                                  setCreditSpread={setCreditSpread}
                                  title="Fixed Credit Spread"
                                />
                              </div>
                            )}
                            {curveType2 !== "yic2" && (
                              <div className=" border rounded-xl p-4 bg-card ">
                                {/*                               <p className="font-semibold">Credit Spread</p>
                                 */}{" "}
                                <CreditSpread
                                  creditSpread={creditSpread2}
                                  setCreditSpread={setCreditSpread2}
                                  title="Floating Credit Spread"
                                />
                              </div>
                            )}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>

                        <ScrollArea className="md:hidden flex h-72 w-full my-4 p-1 md:p-4 dark:bg-teal-400/10 ">
                          {/*                         <div className="md:flex md:gap-2 max-md:grid max-md:grid-cols-2 max-md:gap-2">
                           */}{" "}
                          <div className="md:flex md:gap-2 max-md:grid max-md:grid-cols-2 max-md:gap-2">
                            <div className="border rounded-xl p-4 bg-sky-400/20 dark:bg-sky-400/30 md:w-[200px]">
                              {/* <p className="font-semibold">Discount Curve</p> */}
                              <DCurve
                                disc={disc}
                                setDisc={setDisc}
                                title="Dis. Curve Fixed"
                              />
                            </div>
                            <div className="border rounded-xl p-4 bg-sky-400/20 dark:bg-sky-400/30 md:w-[200px]">
                              {/* <p className="font-semibold">Discount Curve</p> */}
                              <DCurve
                                disc={disc2}
                                setDisc={setDisc2}
                                title="Dis. Curve Floating"
                              />
                            </div>
                            {curveType === "zcc" && (
                              <div className=" border rounded-xl p-4 bg-neutral-400/20 md:w-[200px] ">
                                <p className="font-semibold">
                                  ZC Curve Fixed - <span>{cur}</span>
                                </p>
                                <ZCCurve zccurve={zcrates} />
                              </div>
                            )}
                            {curveType2 === "zcc2" && (
                              <div className=" border rounded-xl p-4 bg-neutral-400/20 md:w-[200px] ">
                                <p className="font-semibold">
                                  ZC Curve Floating - <span>{cur2}</span>
                                </p>
                                <ZCCurve zccurve={zcrates2} />
                              </div>
                            )}
                            {curveType === "yic" && (
                              <div className=" border rounded-xl p-4 bg-neutral-400/20  md:w-[200px]">
                                <p className="font-semibold">
                                  Yield Curve Fixed
                                </p>
                                <YieldCurve yieldcurve={yieldcurve} />
                              </div>
                            )}
                            {curveType2 === "yic2" && (
                              <div className=" border rounded-xl p-4 bg-neutral-400/20  md:w-[200px]">
                                <p className="font-semibold">
                                  Yield Curve Floating
                                </p>
                                <YieldCurve yieldcurve={yieldcurve2} />
                              </div>
                            )}
                            {curveType === "inc" && (
                              <div className=" border rounded-xl p-4 bg-card  md:w-[200px]">
                                <InputCurve
                                  inputCurve={inputCurve}
                                  setInputCurve={setInputCurve}
                                  title="Input Curve Fixed"
                                />
                              </div>
                            )}
                            {curveType2 === "inc2" && (
                              <div className=" border rounded-xl p-4 bg-card  md:w-[200px]">
                                <InputCurve
                                  inputCurve={inputCurve2}
                                  setInputCurve={setInputCurve2}
                                  title="Input Curve Floating"
                                />
                              </div>
                            )}
                            {curveType !== "yic" && (
                              <div className=" border rounded-xl p-4 bg-card  md:w-[200px]">
                                {/*                               <p className="font-semibold">Credit Spread</p>
                                 */}{" "}
                                <CreditSpread
                                  creditSpread={creditSpread}
                                  setCreditSpread={setCreditSpread}
                                  title="Fixed Credit Spread"
                                />
                              </div>
                            )}
                            {curveType2 !== "yic2" && (
                              <div className=" border rounded-xl p-4 bg-card  md:w-[200px]">
                                {/*                               <p className="font-semibold">Credit Spread</p>
                                 */}{" "}
                                <CreditSpread
                                  creditSpread={creditSpread2}
                                  setCreditSpread={setCreditSpread2}
                                  title="Floating Credit Spread"
                                />
                              </div>
                            )}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>

                        <Button
                          type="submit"
                          className="w-full hover:bg-sky-800 bg-sky-600 text-white uppercase"
                        >
                          {loading ? "Computing ..." : "Compute"}
                        </Button>
                        <div className="w-fumm pt-4">
                          {" "}
                          <div className="flex max-md:flex-col justify-between gap-4">
                            <div className="max-md:px-4 max-md:pb-4 mt-4 w-full md:flex md:items-center md:justify-around border rounded-xl bg-sky-400/20 dark:bg-sky-400/30">
                              <div className="flex  justify-between items-center md:items-start gap-8">
                                <div className="grid flex-1 auto-rows-min gap-0.5 mt-4">
                                  <div className=" text-muted-foreground">
                                    Swap Price
                                  </div>
                                  <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                                    {swapPayer == "fixedLeg"
                                      ? (
                                          (swapValue * 100) /
                                          swapNotional1
                                        ).toFixed(2)
                                      : (
                                          (-1 * (swapValue * 100)) /
                                          swapNotional1
                                        ).toFixed(2)}
                                    <span className="text-sm font-normal text-muted-foreground">
                                      %
                                    </span>
                                  </div>
                                </div>
                                <div className="grid flex-1 auto-rows-min gap-0.5 mt-4">
                                  <div className=" text-muted-foreground">
                                    Swap Value
                                  </div>
                                  {cur && (
                                    <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                                      {swapPayer == "fixedLeg"
                                        ? new Intl.NumberFormat(undefined, {
                                            currency: cur,
                                            style: "currency",
                                          }).format(+swapValue.toFixed(2))
                                        : new Intl.NumberFormat(undefined, {
                                            currency: cur,
                                            style: "currency",
                                          }).format(-1 * +swapValue.toFixed(2))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between max-md:flex-col gap-4 max-md:gap-1 max-md:mt-1  w-full max-md:w-full">
                              <div className="pt-2 md:w-1/2 bg-red-40">
                                <p className="font-semibold max-md:p-2 max-md:pb-2 max-md:mt-4">
                                  Cashflows MAP
                                </p>
                                <ScrollArea className="flex h-72 w-full p-2 md:px-4 md:pb-4 rounded-lg bg-gray-500/10 dark:bg-teal-400/10 ">
                                  <LegCashflow
                                    fixed={fixed}
                                    floating={floating}
                                    cur={cur}
                                  />
                                </ScrollArea>
                              </div>
                              <div className=" h-72 w-full">
                                <GrapheValue disc={disc} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*                 <Button
                  type="submit"
                  className="w-full hover:bg-sky-800 bg-sky-600 text-white uppercase"
                >
                  {loading ? "Computing ..." : "Compute"}
                </Button> */}
              </form>
            </Form>
          </div>
        </div>

        {/*         <div className="flex flex-col gap-4 max-md:gap-1 max-md:mt-1  w-1/3 max-md:w-full">
          <div>
            <p className="font-semibold max-md:p-2 pb-2 max-md:mt-4">
              Cashflows MAP
            </p>
            <ScrollArea className="flex h-72 w-full p-2 md:px-4 md:pb-4 rounded-lg bg-gray-500/10 dark:bg-teal-400/10 ">
              <Cashflow cashflow={cashflow} />
            </ScrollArea>
          </div>

          <GrapheValue disc={disc} />
        </div> */}
      </div>
    </GeneralLayout>
  );
};

export default CrossSwap;

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

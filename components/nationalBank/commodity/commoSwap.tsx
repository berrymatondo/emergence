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

import DCurve from "@/components/commonCurves/dCurve";
import ZCCurve from "@/components/commonCurves/zcCurve";
import YieldCurve from "@/components/commonCurves/yieldCurve";
import InputCurve from "@/components/commonCurves/inputCurve";
import CreditSpread from "@/components/commonCurves/creditSpread";
import Cashflow from "@/components/commonCurves/cashflow";
import GrapheValue from "@/components/commonCurves/grapheValue";
import UserInputs from "../userInputs";
import LegCashflow from "@/components/commonCurves/legCashFlow";
import { CommoPriceSchema } from "@/lib/schemas";
import {
  computeCommoDiscountCurve,
  computeCommoPriceSwap,
} from "@/lib/_bankActions";

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

const initialInputCurve: any[] = [{ id: 1, tenor: 0, rate: 0.0 }];
const initialInputs: any[] = [{ id: 1, tenor: 0, rate: 0.0 }];
//const initialIndexes: any[] = [{ id: 1, tenor: 0.5, rate: 3 }];

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

type InterestRateProps = {
  countries: any;
  currencies: any;
};

const CommoSwap = ({ countries, currencies }: InterestRateProps) => {
  const [price, setPrice] = useState(0);
  const [bondPrice, setBondPrice] = useState(0);
  const [accruedInterest, setAccruedInterest] = useState(0);
  const [yieldToMaturity, setYieldToMaturity] = useState(0);
  const [swapValue, setSwapValue] = useState(0);
  const [show, setShow] = useState(false);
  const [yieldcurve, setYieldcurve] = useState<any>();
  const [zcrates, setZcrates] = useState<any>();
  const [forwardrates, setForwardrates] = useState<any>();
  const [inputCurve, setInputCurve] = useState(initialInputCurve);
  const [creditSpread, setCreditSpread] = useState<any>(initialCreditSpread);
  const [inputs, setInputs] = useState<any>(initialInputs);
  //const [indexes, setIndexes] = useState<any>(initialIndexes);

  const [cur, setCur] = useState<any>("USD");
  const [cashflow, setCashflow] = useState<any>();
  const [fixed, setFixed] = useState<any>();
  const [floating, setFloating] = useState<any>();
  const [disc, setDisc] = useState<any>(initialDisc);
  const [loading, setLoading] = useState(false);
  const [swapNotional, setSwapNotional] = useState(0);

  //console.log("disc", disc);

  const form = useForm<z.infer<typeof CommoPriceSchema>>({
    resolver: zodResolver(CommoPriceSchema),
    defaultValues: {
      startDate: "2023-12-30",
      endDate: "2030-01-01",
      fixedCurrency: "1",
      floatingCurrency: "1",
      fixedPrice: "30.50",
      fixedFrequency: "6 months",
      floatingFrequency: "6 months",
      swapPayer: "fixedLeg",
      swapReceiver: "floatingLeg",
      swapNotional: "1000",
      curveType: "zcc",
      curveTypeName: "",
      liquidityPremium: "0.00",
      defaultCountry: "1",
      valuationDate: "2024-07-01",
    },
  });

  const curveType = form.watch("curveType");
  const defaultCountry = form.watch("defaultCountry");
  const fixedCurrency = form.watch("fixedCurrency");
  const swapPayer = form.watch("swapPayer");
  const swapReceiver = form.watch("swapReceiver");
  const floatingCurrency = form.watch("floatingCurrency");
  const valuationDate = form.watch("valuationDate");
  //const label = form.watch("label");

  useEffect(() => {
    if (swapPayer == "fixedLeg") form.setValue("swapReceiver", "Floating Leg");
    else form.setValue("swapReceiver", "Fixed Leg");
  }, [swapPayer]);

  useEffect(() => {
    /*     const fetchYC = async (id: any) => {
      const resu = await getAllYC(true, +id);
      const data = resu?.data;
      setYieldcurve(data);
    };
    fetchYC(defaultCountry); */

    const fetchYC = async (id: any, date: any) => {
      const resu = await getAllYC(true, +id, date);
      const data = resu?.data;
      setYieldcurve(data);
    };
    fetchYC(defaultCountry, valuationDate);

    // Fetch ZC Rates
    /*     const fetchZC = async (id: any) => {
      const resu = await getAllZC(+id);
      const data = resu?.data;

      //console.log("ZC:", data);

      setZcrates(data);
    };
    fetchZC(fixedCurrency); */

    const fetchZC = async (id: any, date: any) => {
      //const resu = await getAllZC(+id);
      const resu = await getAllZC(+id, date);
      const data = resu?.data;

      //console.log("ZC:", data);

      setZcrates(data);
    };
    fetchZC(fixedCurrency, valuationDate);

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
    };
    fetchCur(fixedCurrency);
  }, [defaultCountry, fixedCurrency, valuationDate]);
  // }, [defaultCountry, couponCurrency, label]);

  const procesForm = async (values: z.infer<typeof CommoPriceSchema>) => {
    setLoading(true);
    // console.log("Value:", values);
    setShow(false);

    /** START COMPUTE DISCOUNT CURVE */

    //console.log("zcc tp ", zcrates);
    //console.log("disci tp ", disc);

    //console.log("creditSpread", creditSpread);

    const dcurve = await computeCommoDiscountCurve(
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

    // if (dcurve?.data) setDisc(dcurve?.data);

    const dcurvex = await computeCommoPriceSwap(values, dcurve?.data, inputs);
    //console.log("dcurvex", dcurvex?.data);
    if (dcurvex?.data) {
      //console.log("dcurvex?.data.swap_value", dcurvex?.data.swap_value);

      setSwapValue(dcurvex?.data.swap_value);
      setSwapNotional(values.swapNotional ? +values.swapNotional : 0);
      setFixed(dcurvex?.data.fixed_leg_cashflows);
      setFloating(dcurvex?.data.floating_leg_cashflows);
    }

    //console.log("DCurve", dcurve?.data);

    //  if (dcurvex?.data) setDisc(dcurvex?.data);

    /** END COMPUTE DISCOUNT CURVE */

    /** COMPUTE Straigth bond price, cashflow, duration and accrued interest */

    /*     const yieldToMaturit = await computeStepUpYieldToMaturity(
      values,
      tmp,
      dcurve?.data,
      stepuprates
    );

    if (yieldToMaturit?.data) {
      setYieldToMaturity(yieldToMaturit?.data);
      if (forcedBondPrice) {
        setBondPrice(values.price ? +values.price : 0);
        setShow(true);
      }
    } */

    setLoading(false);
  };

  return (
    <GeneralLayout
      title="Commodity Swap Valuation"
      bred={<CustomBreadcrumb name="Commodity Swap Valuation" />}
    >
      <div className="max-md:px-1 md:flex gap-4 w-full ">
        <div className="bg-gray-500/10 dark:bg-teal-200/10 w-3/4  max-md:w-full  p-4 rounded-xl">
          <div className="">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(procesForm)}
                className="space-y-6"
              >
                <div className="flex max-md:flex-col gap-4">
                  <div className="md:w-1/3 space-y-4">
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
                                    <FormLabel>Commo Leg Currency</FormLabel>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Floating Leg Currency</p>
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
                        name="fixedPrice"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-1/2">
                              <FormLabel>{"Fixed Price "}</FormLabel>
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
                        name="swapNotional"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-1/2">
                              <FormLabel className="w-1/2">
                                {"Swap Notional"} ({cur})
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

                      <FormField
                        control={form.control}
                        name="liquidityPremium"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-1/3  max-md:w-1/2">
                              <FormLabel className="w-1/3">
                                {"Liq. premium (%) "}
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
                          {/*                           <div className=" border rounded-xl p-4 bg-neutral-400/20 md:w-1/3 ">
                            <UserInputs
                              inputs={indexes}
                              setInputs={setIndexes}
                              title="Commo Index"
                              label={true}
                            />
                          </div> */}
                          <div className=" border rounded-xl p-4 bg-neutral-400/20 md:w-1/3 ">
                            <UserInputs
                              inputs={inputs}
                              setInputs={setInputs}
                              title="Commo Curve"
                              label={true}
                              labelName="Value"
                            />
                          </div>
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
                <div className="flex gap-4">
                  <Button
                    type="submit"
                    className="w-full hover:bg-sky-800 bg-sky-600 text-white uppercase"
                  >
                    {loading ? "Computing ..." : "Compute"}
                  </Button>

                  <div className=" w-full md:flex md:items-center md:justify-around border rounded-xl  p-4 bg-sky-400/20 dark:bg-sky-400/30">
                    <div className="flex  justify-between items-center md:items-start gap-4">
                      <div className="grid flex-1 auto-rows-min gap-0.5 mt-4">
                        <div className=" text-muted-foreground">Swap Price</div>
                        <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                          {swapPayer == "fixedLeg"
                            ? ((swapValue * 100) / swapNotional).toFixed(2)
                            : ((-1 * (swapValue * 100)) / swapNotional).toFixed(
                                2
                              )}
                          {/*         <span className="text-sm font-normal text-muted-foreground">
                            %
                          </span> */}
                        </div>
                      </div>
                      <div className="grid flex-1 auto-rows-min gap-0.5 mt-4">
                        <div className=" text-muted-foreground">Swap Value</div>
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
                          {/*     <span className="text-sm font-normal text-muted-foreground">
                            Years
                          </span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>

        <div className="flex flex-col gap-4 max-md:gap-1 max-md:mt-1  w-1/4 max-md:w-full">
          <div>
            <p className="font-semibold max-md:p-2 pb-2 max-md:mt-4">
              Cashflows MAP
            </p>
            <ScrollArea className="flex h-72 w-full p-2 md:px-4 md:pb-4 rounded-lg bg-gray-500/10 dark:bg-teal-400/10 ">
              <LegCashflow fixed={fixed} floating={floating} cur={cur} />
            </ScrollArea>
          </div>

          <GrapheValue disc={disc} />
        </div>
      </div>
    </GeneralLayout>
  );
};

export default CommoSwap;

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

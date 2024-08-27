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
import { CouponBasisList, CouponFreqList, CurrencyList } from "@/lib/enums";
import { Checkbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";
import GeneralLayout from "../../generalLayout";

import { Separator } from "../../ui/separator";

import { ScrollArea, ScrollBar } from "../../ui/scroll-area";

import { getAllYC, getAllZC } from "@/lib/_ycAction";
import { getCurrency } from "@/lib/_otherActions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import InputCurve from "../inputCurve";
import CreditSpread from "../creditSpread";
import YieldCurve from "../yieldCurve";
import ZCCurve from "../zcCurve";
import Cashflow from "../cashflow";
import DCurve from "../dCurve";
import GrapheValue from "../grapheValue";

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
    }

    const yieldToMaturit = await computeYieldToMaturity(
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
                        {forcedBondPrice
                          ? bondPrice.toFixed(2)
                          : notional.toFixed(2)}
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
                        {notional.toFixed(2)}
                        <span className="text-sm font-normal text-muted-foreground">
                          {cur}
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

          <GrapheValue disc={disc} />
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

"use client";
import React, { useState } from "react";
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
import { CountryList, DataTypeList } from "@prisma/client";
import { CouponBasisList, CouponFreqList, CurrencyList } from "@/lib/enums";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import GeneralLayout from "../generalLayout";
import { Badge } from "../ui/badge";
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

const creditSpread = [
  { tenor: 0, yield: 0.0 },
  { tenor: 0.5, yield: 0.0 },
  { tenor: 1.0, yield: 0.0 },
  { tenor: 2.0, yield: 0.0 },
  { tenor: 3.0, yield: 0.0 },
  { tenor: 4.0, yield: 0.0 },
  { tenor: 5.0, yield: 0.0 },
  { tenor: 7.0, yield: 0.0 },
  { tenor: 10.0, yield: 0.0 },
  { tenor: 15.0, yield: 0.0 },
  { tenor: 20.0, yield: 0.0 },
  { tenor: 30.0, yield: 0.0 },
];
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

type StraightBondProps = {
  yieldcurve: any;
};

const StraightBond = ({ yieldcurve }: StraightBondProps) => {
  const [price, setPrice] = useState(0);
  const [bondPrice, setBondPrice] = useState(0);
  const [accruedInterest, setAccruedInterest] = useState(0);
  const [yieldToMaturity, setYieldToMaturity] = useState(0);
  const [duration, setDuration] = useState(0);
  const [show, setShow] = useState(false);

  const form = useForm<z.infer<typeof SBSchema>>({
    resolver: zodResolver(SBSchema),
    defaultValues: {
      //bondMaturityDate: new Date().toISOString(),
      price: "0",
      //bondMaturityDate: new Date().toISOString().split("T")[0],
      bondMaturityDate: "2030-07-30",
      couponCurrency: "USD",
      //couponRate: "0.00",
      couponRate: "0.05",
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

      /*       couponCurrency: "USD",
      couponRate: "",
      couponFrequency: "",
      firstCouponDate: "",
      valuationDate: "",
      notional: "", */
    },
  });

  const forcedBondPrice = form.watch("forcedBondPrice");
  const curveType = form.watch("curveType");

  const procesForm = async (values: z.infer<typeof SBSchema>) => {
    //setLoading(true);
    //console.log("Value:", values);
    setShow(false);

    let tmp;
    const result = await computeStraightBondPrice(values);
    if (result?.data) {
      setBondPrice(result?.data);
      setPrice(result?.data);
      tmp = result?.data;
    }

    //console.log("PRIX", result?.data);

    const interest = await computeAccruedInterest(values);
    if (interest?.data) setAccruedInterest(interest?.data);

    /*     if (forcedBondPrice) {
      console.log("values.price", values.price);

      setBondPrice(values.price ? +values.price : 0);
    } */

    //console.log("TMP", tmp);

    const yieldToMaturity = await computeYieldToMaturity(values, tmp);
    //console.log("values.price", values.price);
    console.log("yieldToMaturity?.data", yieldToMaturity?.data);
    if (yieldToMaturity?.data) {
      setYieldToMaturity(yieldToMaturity?.data);
      if (forcedBondPrice) {
        setBondPrice(values.price ? +values.price : 0);
        setShow(true);
      }
    }
    console.log("yieldToMaturity?.data", yieldToMaturity?.data);

    const duration = await computeDuration(values);
    if (duration?.data) setDuration(duration?.data);

    /*     if (result?.error) {
      toast.error(result?.error.toString());
    } */
    // console.log("result registerForm:", result);
    //console.log("result registerForm:", result?.success);

    // setLoading(false);
  };

  return (
    <GeneralLayout
      title="Straight Bond Valuation"
      bred={<CustomBreadcrumb name="Straight Bond Valuation" />}
    >
      <div className="max-md:px-1 md:flex gap-4 w-full">
        <div className="bg-gray-500/10 dark:bg-teal-200/10 w-2/3  max-md:w-full border p-4 rounded-xl">
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
                              <FormLabel>Coupon Currency</FormLabel>
                              <Select
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
                                {"Notional "}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Entrer le montant"
                                  type="number"
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
                                  {"Forced Bond Price"}
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Entrer le montant"
                                    type="number"
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
                    <div className="flex justify-between max-md:gap-4">
                      <FormField
                        control={form.control}
                        name="curveType"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-1/3  max-md:w-1/2">
                              <FormLabel className="w-1/2">
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

                      <FormField
                        control={form.control}
                        name="liquidityPremium"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-1/3  max-md:w-1/2">
                              <FormLabel className="w-1/2 ">
                                {"Liquidity premium (%) "}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter the value"
                                  type="number"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                    <div className="w-full">
                      <ScrollArea className="flex h-72 w-full my-4 p-1 md:p-4 dark:bg-teal-400/10 ">
                        <div className="md:flex md:gap-2 max-md:grid max-md:grid-cols-2 max-md:gap-2">
                          <div className="border rounded-xl p-4 bg-sky-400/20 dark:bg-sky-400/30 md:w-1/3">
                            Discount Curve
                          </div>
                          {curveType === "zcc" && (
                            <div className=" border rounded-xl p-4 bg-neutral-400/20 md:w-1/3 ">
                              <p className="font-semibold">ZC Curve</p>
                              <ZCCurve zccurve={yieldcurve} />
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
                              <p className="font-semibold">Input Curve</p>
                              <InputCurve />
                            </div>
                          )}
                          {curveType !== "yic" && (
                            <div className=" border rounded-xl p-4 bg-card  md:w-1/3">
                              <p className="font-semibold">Credit Spread</p>
                              <CreditSpread />
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
                  className="w-full hover:bg-sky-800 bg-sky-600 text-white"
                >
                  {/*                 {loading ? "En cours de connexion ..." : "Se Connecter"}
                   */}{" "}
                  Compute
                </Button>
              </form>
            </Form>
          </div>
          {/*           <div className="flex justify-between gap-2">
            {bondPrice > 0 && (
              <div className="w-1/2 border rounded-xl mt-4 p-4 bg-sky-400/20 dark:bg-sky-400/30">
                <div className="flex justify-between items-center gap-4">
                  {!forcedBondPrice && (
                    <div className="grid flex-1 auto-rows-min gap-0.5">
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
                  )}

                  {show && forcedBondPrice && (
                    <div className="grid flex-1 auto-rows-min gap-0.5">
                      <div className="text-red-600 text-muted-foreground">
                        Forced Bond Price
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
                  )}

                  <div className=" grid flex-1 auto-rows-min gap-0.5">
                    <div className=" text-muted-foreground">
                      Accrued Interest
                    </div>
                    <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                      {(accruedInterest * 100).toFixed(2)}
                      <span className="text-sm font-normal text-muted-foreground">
                        %
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-4">
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
            <Card
              className="border-none bg-gray-500/10 dark:bg-teal-200/10 flex flex-col max-md:w-full w-1/2 mt-4"
              x-chunk="charts-01-chunk-7"
            >
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
                <div className="flex justify-between items-center text-orange-400">
                  <Badge className="bg-orange-500 text-white">USDCDF</Badge>
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
                    data={newTab}
                  >
                    <CartesianGrid
                      strokeDasharray="4 4"
                      vertical={false}
                      stroke="hsl(var(--muted-foreground))"
                      strokeOpacity={0.5}
                    />

                    <XAxis
                      dataKey="dateOut"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />

                    <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />

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
                      dataKey="usdcdf"
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
          </div> */}
        </div>

        <div className="flex flex-col gap-4 max-md:gap-1 max-md:mt-1  w-1/3 max-md:w-full">
          {bondPrice > 0 && (
            <div className="border rounded-xl p-4 bg-sky-400/20 dark:bg-sky-400/30">
              <div className="flex justify-between items-center gap-4">
                {!forcedBondPrice && (
                  <div className="grid flex-1 auto-rows-min gap-0.5">
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
                )}

                {show && forcedBondPrice && (
                  <div className="grid flex-1 auto-rows-min gap-0.5">
                    <div className="text-red-600 text-muted-foreground">
                      Forced Bond Price
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
                )}

                <div className=" grid flex-1 auto-rows-min gap-0.5">
                  <div className=" text-muted-foreground">Accrued Interest</div>
                  <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                    {(accruedInterest * 100).toFixed(2)}
                    <span className="text-sm font-normal text-muted-foreground">
                      %
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center gap-4">
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
          <Card
            className="border-none bg-gray-500/10 dark:bg-teal-200/10 flex flex-col max-md:w-full"
            x-chunk="charts-01-chunk-7"
          >
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
              <div className="flex justify-between items-center text-orange-400">
                <Badge className="bg-orange-500 text-white">USDCDF</Badge>
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
                  data={newTab}
                >
                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke="hsl(var(--muted-foreground))"
                    strokeOpacity={0.5}
                  />

                  <XAxis
                    dataKey="dateOut"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />

                  <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />

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
                    dataKey="usdcdf"
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

            <TableCell className="text-right  mx-0 px-0">{yc.yield}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const CreditSpread = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left mx-0 px-0">Tenor</TableHead>

          <TableHead className="text-right  mx-0 px-0">Rate</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {creditSpread?.map((yc: any) => (
          <TableRow key={yc.id}>
            <TableCell className="font-medium  mx-0 px-0">{yc.tenor}</TableCell>

            <TableCell className="text-right  mx-0 px-0">{yc.yield}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const InputCurve = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left mx-0 px-0">Tenor</TableHead>

          <TableHead className="text-right  mx-0 px-0">Yield</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {creditSpread?.map((yc: any) => (
          <TableRow key={yc.id}>
            <TableCell className="font-medium  mx-0 px-0">{yc.tenor}</TableCell>

            <TableCell className="text-right  mx-0 px-0">{yc.yield}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

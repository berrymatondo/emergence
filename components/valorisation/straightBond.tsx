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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CountryList, DataTypeList } from "@prisma/client";
import { CouponBasisList, CouponFreqList, CurrencyList } from "@/lib/enums";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import GeneralLayout from "../generalLayout";

const StraightBond = () => {
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
      /*       couponCurrency: "USD",
      couponRate: "",
      couponFrequency: "",
      firstCouponDate: "",
      valuationDate: "",
      notional: "", */
    },
  });

  const forcedBondPrice = form.watch("forcedBondPrice");

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
      <div className="w-1/4 lg:w-1/3 max-md:w-full border p-4 rounded-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(procesForm)} className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center gap-4">
                <FormField
                  control={form.control}
                  name="bondMaturityDate"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-1/2">
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
                            {Object.values(CurrencyList)?.map((ur: any) => (
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
                />
              </div>

              <div className="flex justify-between items-center gap-4">
                <FormField
                  control={form.control}
                  name="couponRate"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-1/2">
                        <FormLabel>{"Coupon Rate (in %)"}</FormLabel>
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
                            {Object.values(CouponFreqList)?.map((ur: any) => (
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
                            {Object.values(CouponBasisList)?.map((ur: any) => (
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
                        <FormLabel className="w-1/2">{"Notional "}</FormLabel>
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
      {bondPrice > 0 && (
        <div className="md:w-1/4 lg:w-1/3 border rounded-xl mt-4 p-4 bg-sky-400/20 dark:bg-sky-400/30">
          <div className="flex justify-between items-center gap-4">
            {/*   <CardTitle>Results</CardTitle> */}
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

            <div className="grid flex-1 auto-rows-min gap-0.5 mt-4">
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
              <div className=" text-muted-foreground">Yield to Maturity</div>
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

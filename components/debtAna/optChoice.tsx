"use client";
import { Checkbox } from "@/components/ui/checkbox";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { MdContentCopy, MdDone } from "react-icons/md";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Link from "next/link";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

type OptChoiceProps = {
  countries?: any;
  currencies?: any;
  optIn: any;
};

const OptChoice = () => {
  const [straight, setStraight] = useState(true);
  const [amortized, setAmortized] = useState(false);

  const searchParams = useSearchParams();

  // console.log("MatDate", searchParams.get("maturityDate"));

  return (
    <>
      <GeneralLayout
        title="Financing Options Analysis"
        bred={<CustomBreadcrumb name="Financing Options Analysis" />}
      >
        <div className="max-md:px-1 md:flex gap-4 w-full ">
          <div className="bg-gray-500/10 dark:bg-teal-200/10 w-2/3  max-md:w-full  p-4 rounded-xl">
            <div className="max-md:mx-1 flex justify-center p-2 rounded-full border-yellow-400 gap-4 border ">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={straight}
                  onCheckedChange={() => {
                    setAmortized(!amortized);
                    setStraight(!straight);
                  }}
                />
                <label
                  htmlFor="terms"
                  className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                    !straight ? "text-neutral-400" : ""
                  }`}
                >
                  Load Existing Debt Analysis
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={amortized}
                  onCheckedChange={() => {
                    setStraight(!straight);
                    setAmortized(!amortized);
                  }}
                />
                <label
                  htmlFor="terms"
                  className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                    !amortized ? "text-neutral-400" : ""
                  }`}
                >
                  Start New Debt Analysis
                </label>
              </div>
            </div>

            {straight ? (
              <div>
                <LoadOpt
                  optIn={{
                    couponBasis: searchParams.get("couponBasis"),
                    valType: searchParams.get("valType"),
                    maturityDate: searchParams.get("maturityDate"),
                    issueDate: searchParams.get("issueDate"),
                    firstCouponDate: searchParams.get("firstCouponDate"),
                    valuationDate: searchParams.get("valuationDate"),
                    couponRate: searchParams.get("couponRate"),
                    couponFrequency: searchParams.get("couponFrequency"),
                    notional: searchParams.get("notional"),
                    couponCurrency: searchParams.get("couponCurrency"),
                    rating: searchParams.get("rating"),
                    recovering: searchParams.get("recovering"),
                  }}
                />
              </div>
            ) : (
              <StartAna
                optIn={{
                  couponBasis: searchParams.get("couponBasis"),
                  valType: searchParams.get("valType"),
                  maturityDate: searchParams.get("maturityDate"),
                  issueDate: searchParams.get("issueDate"),
                  firstCouponDate: searchParams.get("firstCouponDate"),
                  valuationDate: searchParams.get("valuationDate"),
                  couponRate: searchParams.get("couponRate"),
                  couponFrequency: searchParams.get("couponFrequency"),
                  notional: searchParams.get("notional"),
                  couponCurrency: searchParams.get("couponCurrency"),
                  rating: searchParams.get("rating"),
                  recovering: searchParams.get("recovering"),
                }}
              />
            )}
          </div>
        </div>
      </GeneralLayout>
    </>
  );
};

export default OptChoice;

type StartAnaProps = {
  optIn: any;
};
export function StartAna({ optIn }: StartAnaProps) {
  const [show, setShow] = useState();
  const [code, setCode] = useState<any>();
  const [copy, setCopy] = useState(false);
  const [loadReserve, setLoadReserve] = useState(true);
  const [lastCode, setLastCode] = useState("");
  const [lastData, setLastData] = useState<any>();

  //console.log("OTP", optIn);

  const generateCode = () => {
    setCode(Date.now());
    setCopy(false);
  };

  useEffect(() => {
    setCode(Date.now());

    const fetchLastReserve = async () => {
      const resu = await getLastReserve();
      const data = resu?.data[0];
      if (data) {
        setLastCode(data.code);
        const res = await getReserveByCode(data.code);
        const data2 = res?.data;
        if (data2) setLastData(data2);
      }
      //console.log("Reserve", data);

      //setYieldcurve(data);
    };
    fetchLastReserve();
  }, []);

  useEffect(() => {}, []);

  return (
    <div className="container flex justify-center gap-20 p-8">
      <div className="flex flex-col items-center justify-center gap-8  ">
        <Button onClick={generateCode}>
          {code ? "Regenerate" : "Confirm"}
        </Button>
        {code && (
          <div className="flex flex-col items-center gap-4">
            {!copy && "First copy this code before continuing:"}
            <strong className="">{code}</strong>{" "}
            <CopyToClipboard text={code}>
              <button onClick={() => setCopy(true)}>
                {copy ? (
                  <span className="flex gap-2 text-green-600">
                    Copied !
                    {/* <MdDone className="text-green-600" size={25} /> */}
                  </span>
                ) : (
                  <MdContentCopy className="text-yellow-500" size={25} />
                )}
              </button>
            </CopyToClipboard>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <Checkbox
            checked={loadReserve}
            onCheckedChange={() => {
              setLoadReserve(!loadReserve);
            }}
          />
          <label
            htmlFor="terms"
            className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
              true ? "text-neutral-400" : ""
            }`}
          >
            {loadReserve
              ? `Use last reserve found - ${lastCode}`
              : `Do not use last reserve found`}
          </label>
        </div>

        {copy && ((lastCode && loadReserve) || !loadReserve) && (
          <Link
            className="bg-sky-800 p-2 rounded-lg text-white"
            href={{
              pathname: `/anadette/anaopfin/${code}/new`,
              query: {
                couponBasis: optIn.couponBasis,
                valType: optIn.valType,
                maturityDate: optIn.maturityDate,
                issueDate: optIn.issueDate,
                firstCouponDate: optIn.firstCouponDate,
                valuationDate: optIn.valuationDate,
                couponRate: optIn.couponRate,
                couponFrequency: optIn.couponFrequency,
                notional: optIn.notional,
                couponCurrency: optIn.couponCurrency,
                rating: optIn.rating,
                recovering: optIn.recovering,
                reserve: loadReserve ? lastCode : code,
              },
            }}
          >
            Start Analysis
          </Link>
        )}
      </div>
      {loadReserve && (
        <div className="flex flex-col bg-gray-500/10 dark:bg-teal-200/10 p-4 rounded-xl">
          <strong className="m-2">Reserves</strong>
          <ScrollArea className="h-44">
            {/*             {lastData?.map((dat: any) => (
              <div key={dat.id}>
                {dat.tenor} - {dat.value}
              </div>
            ))} */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left mx-0 px-0">
                    <p className="flex justify-between">
                      <span>Tenor </span>
                      <span>Value</span>
                    </p>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lastData?.map((yc: any) => (
                  <TableRow key={yc.id}>
                    <TableCell className="flex justify-between  mx-0 px-0">
                      <span>{yc.tenor} </span>
                      <span> {yc.value}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { LoadOptSchema } from "@/lib/schemas";
import { getFinOpts } from "@/lib/_finActions";
import { useRouter, useSearchParams } from "next/navigation";
import GeneralLayout from "../generalLayout";
import { getLastReserve, getReserveByCode } from "@/lib/_reserveActions";
import { ScrollArea } from "../ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type LoadOptProps = {
  optIn: any;
};
export function LoadOpt({ optIn }: LoadOptProps) {
  const [loading, setLoading] = useState(false);
  const [find, setFind] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof LoadOptSchema>>({
    resolver: zodResolver(LoadOptSchema),
    defaultValues: {
      code: "",
    },
  });

  const code = form.watch("code");

  const procesForm = async (values: z.infer<typeof LoadOptSchema>) => {
    setLoading(true);
    setErrorMsg("");
    const finOpt = await getFinOpts(code);
    const out = finOpt?.data ? finOpt?.data.length : 0;

    //console.log("out", out);

    if (out > 0) {
      setLoading(false);

      //  router.push(`/anadette/anaopfin/${code}`);

      setFind(true);
    } else {
      setErrorMsg("No record found");
    }

    setLoading(false);
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(procesForm)}
          className="space-y-6 w-full"
        >
          <div className="flex flex-col justify-between items-center gap-4">
            <div className="flex gap-4 mt-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>Fill your code</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Fill you code ..."
                          type="text"
                        />
                      </FormControl>

                      <FormMessage />
                      <p className="text-red-600 text-center">{errorMsg}</p>
                    </FormItem>
                  );
                }}
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            {code && (
              <Button
                type="submit"
                className="w-full md:w-1/3 hover:bg-sky-800 bg-sky-600 text-white uppercase"
              >
                {loading ? "Loading ..." : "Load"}
              </Button>
            )}

            {find && (
              <div className="flex gap-4 justify-center">
                <Link
                  className="bg-sky-800 p-2 rounded-lg text-white"
                  href={{
                    pathname: `/anadette/anaopfin/${code}/new`,
                    query: {
                      couponBasis: optIn.couponBasis,
                      valType: optIn.valType,
                      maturityDate: optIn.maturityDate,
                      issueDate: optIn.issueDate,
                      firstCouponDate: optIn.firstCouponDate,
                      valuationDate: optIn.valuationDate,
                      couponRate: optIn.couponRate,
                      couponFrequency: optIn.couponFrequency,
                      notional: optIn.notional,
                      couponCurrency: optIn.couponCurrency,
                      rating: optIn.rating,
                      recovering: optIn.recovering,
                      reserve: code,
                    },
                  }}
                >
                  Start New Analysis
                </Link>
                <Link
                  className="bg-yellow-800 p-2 rounded-lg text-white"
                  href={`/anadette/anaopfin/${code}`}
                >
                  Check the batch
                </Link>
              </div>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}

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

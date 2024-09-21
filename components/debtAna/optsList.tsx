import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Country, CountryList, Currency, DataTypeList } from "@prisma/client";
import {
  CouponBasisList,
  CouponFreqList,
  CurrencyList,
  LabelList,
  ratings,
  valuationTypes,
} from "@/lib/enums";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import GeneralLayout from "../generalLayout";

import { Separator } from "../ui/separator";

import { ScrollArea, ScrollBar } from "../ui/scroll-area";

import { getAllYC, getAllZC } from "@/lib/_ycAction";
import {
  getAllCurrencies,
  getAllForwardRates,
  getCurrency,
} from "@/lib/_otherActions";

import { FinOptSchema, StepUpSchema } from "@/lib/schemas";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { computeCMA, createFinOpt, getFinOpts } from "@/lib/_finActions";

import OptAnaForm from "./optAnaForm";
import ReserveForm from "./reserveForm";
import { deleteReserve, getReserveByCode } from "@/lib/_reserveActions";
import { MdAdd, MdDelete, MdUpdate } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DelReserve from "./delReserve";

type FinOptAnaProps = {
  countries?: any;
  code?: any;
  opts?: any;
  reserve?: any;
  currencies?: any;
};

const OptsList = ({
  countries,
  code,
  opts,
  reserve,
  currencies,
}: FinOptAnaProps) => {
  /*   const [opts, setOpts] = useState(optss);
  const [reserve, setReserve] = useState(reserveIn);
  const [refresh, setRefresh] = useState(false);
  const [currencies, setCurrencies] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    const fetchOpt = async (code: any) => {
      const resu = await getFinOpts(code);
      const data = resu?.data;
      if (data) setOpts(data);

      const res = await getReserveByCode(code);
      const data2 = res?.data;
      if (data2) {
        setReserve(data2.sort((a: any, b: any) => a.tenor - b.tenor));
      }

      const res3 = await getAllCurrencies();
      const data3 = res3?.data;
      if (data3) {
        setCurrencies(data3);
      }
    };
    fetchOpt(code);
  }, []); */

  const getValuationType = (id: any) => {
    const found = valuationTypes.find((v) => v.id === +id);
    return found?.label;
  };

  const getCurrency = (id: any) => {
    const found = currencies?.find((v: any) => v.id === +id);
    return found?.code;
  };

  const getRating = (id: any) => {
    const found = ratings?.find((v: any) => v.id === +id);
    return found?.label;
  };

  return (
    <GeneralLayout
      title="Financing Options Analysis"
      bred={<CustomBreadcrumb name="Financing Options Analysis" code={code} />}
    >
      <div className="max-md:px-1 md:flex gap-4 w-full ">
        <div className="bg-gray-500/10 dark:bg-teal-200/10 w-3/4  max-md:w-full  p-4 rounded-xl">
          {/*           <MdAdd
            className="bg-sky-600 rounded-full hover:cursor-pointer"
            size={40}
            onClick={() => router.push(`/anadette/anaopfin/${code}/new`)}
          /> */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left mx-0 px-0">Option</TableHead>
                <TableHead className="text-left mx-0 px-0">
                  <p className="flex justify-between">
                    <span>Valution Type</span>
                  </p>
                </TableHead>
                <TableHead className="text-left mx-0 px-0">
                  Coupon Rate
                </TableHead>
                <TableHead className="text-left mx-0 px-0">Maturity</TableHead>
                <TableHead className="text-left mx-0 px-0">Notional</TableHead>
                <TableHead className="text-left mx-0 px-0">Currency</TableHead>
                <TableHead className="text-left mx-0 px-0">Rating</TableHead>
                <TableHead className="text-left mx-0 px-0">
                  Recovering
                </TableHead>
                <TableHead className="text-left mx-0 px-0">Modality</TableHead>
                <TableHead className="text-left mx-0 px-0">Actions</TableHead>
                <TableHead className="text-orange-600 text-left mx-0 px-0">
                  CMA
                </TableHead>
                <TableHead className="text-orange-600 text-left mx-0 px-0">
                  Duration
                </TableHead>
                <TableHead className="text-orange-600 text-left mx-0 px-0">
                  Default probability
                </TableHead>
                <TableHead className="text-orange-600 text-left mx-0 px-0">
                  Financing Risk
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {opts?.map((ic: any) => (
                <TableRow key={ic.id}>
                  <TableCell className="text-left font-semibold text-sky-600 mx-0 px-0">
                    Option-{ic.id}
                  </TableCell>
                  <TableCell className="text-left mx-0 px-0">
                    {getValuationType(ic.valuationType)}
                  </TableCell>
                  <TableCell className="text-left mx-0 px-0">
                    {ic.couponRate} %
                  </TableCell>
                  <TableCell className="text-left mx-0 px-0">
                    {ic.maturity}
                  </TableCell>
                  <TableCell className="text-left mx-0 px-0">
                    {ic.notional}
                  </TableCell>
                  <TableCell className="text-left mx-0 px-0">
                    {getCurrency(ic.currency)}
                  </TableCell>
                  <TableCell className="text-left mx-0 px-0">
                    {getRating(ic.rating)}
                  </TableCell>
                  <TableCell className="text-left mx-0 px-0">
                    {ic.recovering} %
                  </TableCell>
                  <TableCell className="text-left mx-0 px-0">
                    {ic.modality}
                  </TableCell>
                  <TableCell className="text-right  mx-0 px-0 hover:cursor-pointer">
                    {/*                     <OptAnaForm
                      optIn={ic}
                      type="U"
                      currencies={currencies}
                      openDialog={false}
                      code={code}
                      refresh={refresh}
                      setRefresh={setRefresh}
                    /> */}
                    <Link
                      href={{
                        pathname: `/anadette/anaopfin/${code}/update/`,
                        query: { id: ic.id },
                      }}
                    >
                      <MdUpdate className="text-yellow-600" size={25} />
                    </Link>
                  </TableCell>
                  <TableCell className="text-left mx-0 px-0">
                    {ic.cma}
                  </TableCell>
                  <TableCell className="text-left mx-0 px-0">
                    {ic.duration.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>

        <div className="bg-gray-500/10 dark:bg-teal-200/10 w-1/4  max-md:w-full  p-4 rounded-xl">
          <ScrollArea className="h-96">
            <ReserveForm
              code={code}
              openDialog={false}
              /*             refresh={refresh}
              setRefresh={setRefresh} */
              type="A"
            />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left mx-0 px-0">
                    <p className="flex justify-between">
                      <span>Tenor</span>
                    </p>
                  </TableHead>
                  <TableHead className="text-left mx-0 px-0">Value</TableHead>

                  <TableHead className="text-left mx-0 px-0">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reserve?.map((ic: any) => (
                  <TableRow key={ic.id}>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.tenor}
                    </TableCell>
                    <TableCell className="text-left mx-0 px-0">
                      {ic.value}
                    </TableCell>

                    <TableCell className="flex  items-center gap-4 text-right  mx-0 px-0 hover:cursor-pointer">
                      <ReserveForm
                        code={code}
                        openDialog={false}
                        /*             refresh={refresh}
                        setRefresh={setRefresh} */
                        type="U"
                        reserveIn={ic}
                      />
                      <DelReserve id={ic.id} code={code} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </div>
    </GeneralLayout>
  );
};

export default OptsList;

const CustomBreadcrumb = ({ name, code }: { name: string; code?: string }) => {
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
          <BreadcrumbPage className="font-semibold">
            {name}: <strong className="text-lg text-sky-700">{code}</strong>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

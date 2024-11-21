"use client";
import React, { useEffect, useState } from "react";
import GeneralLayout from "../generalLayout";
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
import { finCapSchema } from "@/lib/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { computeFaitHisto, computeFinCap } from "@/lib/_finCapActions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FcIdea } from "react-icons/fc";

type FinancingProps = {
  fxList: any;
};
const FinCapForm = ({ fxList }: FinancingProps) => {
  const [loading, setLoading] = useState(false);
  const [finCap, setFinCap] = useState(0);
  const [anaCon, setAnaCon] = useState("");
  const [faiHis, setFaiHis] = useState("");
  const [entete, setEntete] = useState("");
  // Initi Form
  const form = useForm<z.infer<typeof finCapSchema>>({
    resolver: zodResolver(finCapSchema),
    defaultValues: {
      taux_interet: "5.0",
      taux_interet_ref: "3.0",
      spread_souverain: "2.5",
      spread_ref: "2.0",
      taux_change: fxList
        ?.find((el: any) => el.label == "USD-CDF")
        ?.taux.toString(),
      taux_change_ref: "1.0",
      inflation: "4.5",
      inflation_ref: "2.0",
      performance_matieres: "-3.0",
      cours: "1",
    },
  });

  const cours = form.watch("cours");

  useEffect(() => {
    const tempo = fxList?.find((el: any) => el.id == cours)?.taux;

    form.setValue("taux_change", tempo.toString());
  }, [cours]);

  const procesForm = async (values: z.infer<typeof finCapSchema>) => {
    //  console.log("Values: ", values);

    setLoading(true);

    const res = await computeFinCap(values);

    if (res?.data) {
      setFinCap(res.data.capacite_financement);
      setAnaCon(res.data.analyse_contextuelle);
    }

    const res1 = await computeFaitHisto(values);

    if (res1?.data) {
      setEntete(res1.data.entete);
      setFaiHis(res1.data.fait_historique);
    }

    setLoading(false);
  };

  return (
    <div>
      <GeneralLayout
        title={"Financing Capacity"}
        bred={<CustomBreadcrumb name="Financing Capacity" />}
      >
        <div className="max-md:px-2 gap-2 grid md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(procesForm)}
              className="space-y-6 w-full  col-span-2"
            >
              <div className="bg-gray-500/10 dark:bg-teal-200/10 rounded-lg w-full flex flex-col justify-between items-center p-4">
                <div className="flex justify-between gap-4 w-full">
                  <FormField
                    control={form.control}
                    name="taux_interet"
                    render={({ field }) => {
                      return (
                        <FormItem className="max-md:w-1/2 w-1/3 ">
                          <FormLabel>{"Taux d'intérêt (%)"}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Entrer l'id"
                              type="number"
                              disabled={true}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="taux_interet_ref"
                    render={({ field }) => {
                      return (
                        <FormItem className="max-md:w-1/2 w-1/3 ">
                          <FormLabel>
                            {"Taux d'intérêt référence (%)"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Entrer le taux de référence"
                              type="number"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <div className="flex justify-between  gap-4  w-full">
                  <FormField
                    control={form.control}
                    name="spread_souverain"
                    render={({ field }) => {
                      return (
                        <FormItem className="max-md:w-1/2 w-1/3 ">
                          <FormLabel>
                            {"Spread de crédit souverain (%)"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Entrer l'id"
                              type="number"
                              disabled={true}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="spread_ref"
                    render={({ field }) => {
                      return (
                        <FormItem className="max-md:w-1/2 w-1/3 ">
                          <FormLabel>
                            {"Spread de crédit référence (%)"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Entrer le spread de référence"
                              type="number"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <div className="flex justify-between  gap-4 w-full">
                  <FormField
                    control={form.control}
                    name="taux_change"
                    render={({ field }) => {
                      return (
                        <FormItem className="max-md:w-1/2 w-1/3 ">
                          <FormLabel>{"Taux de change"}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Entrer l'id"
                              type="number"
                              disabled={true}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <div className="flex max-md:flex-col items-center max-md:w-1/2 w-1/3 ">
                    <FormField
                      control={form.control}
                      name="taux_change_ref"
                      render={({ field }) => {
                        return (
                          <FormItem className="md:w-1/2">
                            <FormLabel>{"Taux de change réf. "}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Entrer le spread de référence"
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
                      name="cours"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-full md:w-1/2">
                            <FormLabel>Devise</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger id="framework">
                                <SelectValue placeholder="Sélectionner une devise" />
                              </SelectTrigger>
                              <SelectContent position="popper">
                                {fxList?.map((ctr: any) => (
                                  <SelectItem key={ctr.id} value={ctr.id}>
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
                  </div>
                </div>
                <div className="flex justify-between  gap-4  w-full">
                  <FormField
                    control={form.control}
                    name="inflation"
                    render={({ field }) => {
                      return (
                        <FormItem className="max-md:w-1/2 w-1/3 ">
                          <FormLabel>{"Inflation (%)"}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Entrer l'id"
                              type="number"
                              disabled={true}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="inflation_ref"
                    render={({ field }) => {
                      return (
                        <FormItem className="max-md:w-1/2 w-1/3 ">
                          <FormLabel>{"Inflation référence  (%)"}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Entrer le taux de référence"
                              type="number"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                <div className="flex justify-end  gap-4 w-full">
                  <FormField
                    control={form.control}
                    name="performance_matieres"
                    render={({ field }) => {
                      return (
                        <FormItem className="max-md:w-1/2 w-1/3 ">
                          <FormLabel>
                            {"Performance des matières premières  (%)"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Entrer le spread de référence"
                              type="number"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <div className="flex gap-4 w-full   justify-between pt-8">
                  {/*                   <Button
                    type="button"
                    variant="outline"
                    className=" w-full md:w-1/3 max-md:w-1/2"
                    onClick={() => {
                      // console.log("ICI");
                      form.reset();
                      //   setOpen(false);
                      //  router.back();
                    }}
                  >
                    Cancel
                  </Button> */}

                  <Button
                    type="submit"
                    className=" w-full  hover:bg-sky-800 bg-sky-600 text-white uppercase"
                  >
                    {loading ? "Computing ..." : "Compute"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
          <div className="col-span-2 flex flex-col justify-between gap-2">
            <div className="rounded-full text-center flex flex-col justify-center p-4 gap-4 ">
              <p className={`text-sky-500 text-xl font-semibold`}>
                Capacité de financement
              </p>
              <div className="flex justify-center">
                <div
                  className={`h-36 w-36 rounded-full bg-sky-800/20 font-semibold text-5xl flex justify-center items-center ${
                    +finCap < 5 ? " text-red-400 " : " text-green-400"
                  }`}
                >
                  {finCap.toFixed(2)}
                </div>
              </div>
              {/*               <span
                className={
                  +finCap < 5
                    ? "text-7xl text-red-600 bg-green-800"
                    : "text-7xl text-green-600"
                }
              >
                {finCap.toFixed(2)}
              </span> */}
            </div>
            {anaCon && (
              <Card x-chunk="dashboard-07-chunk-5" className="md:w-full ">
                <CardHeader>
                  <CardTitle className="text-sky-600">
                    Analyse Contextuelle{" "}
                  </CardTitle>
                  <CardDescription>{anaCon}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div></div>
                  {/*               <Button size="sm" variant="secondary">
                Archive Product
              </Button> */}
                </CardContent>
              </Card>
            )}
            {/*             <div className="bg-sky-600/20  rounded-lg text-center flex flex-col gap-4 p-4">
              <p className={`text-sky-500 text-xl font-semibold`}>
                Analyse Contextuelle
              </p>
              <p>{anaCon}</p>
            </div> */}
          </div>
        </div>
        <div className="max-md:px-2 py-4">
          {anaCon && (
            <>
              {" "}
              <p className="flex items-center my-2">
                <FcIdea size={40} />
                <span>Le saviez-vous ?</span>
              </p>
              <Card x-chunk="dashboard-07-chunk-5" className="md:w-full ">
                <CardHeader>
                  <CardTitle className="text-sky-600">{entete}</CardTitle>
                  <CardDescription>{faiHis}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div></div>
                  {/*               <Button size="sm" variant="secondary">
                Archive Product
              </Button> */}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </GeneralLayout>
    </div>
  );
};

export default FinCapForm;

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

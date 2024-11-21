"use client";
import React, { useEffect, useState } from "react";

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
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/alert-dialog";
import {
  MdAdd,
  MdAddCircleOutline,
  MdDeleteOutline,
  MdEdit,
  MdUpdate,
} from "react-icons/md";

import { croissanceSchema } from "@/lib/schemas";

import {
  createTransMatrix,
  deleteTransMatrix,
  updateTransMatrix,
} from "@/lib/_matrix";
import { createCroissance, updateCroissance } from "@/lib/_croissanceActions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { scenList } from "@/lib/enums";

type ScenRefFormProps = {
  transIn?: any;
  type: any;
  openDialog: any;
  label: string;
  hasSubType: boolean;
};
const ScenRefForm = ({
  openDialog,
  transIn,
  type,
  label,
  hasSubType,
}: ScenRefFormProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(openDialog);

  console.log("code: ", label);

  const form = useForm<z.infer<typeof croissanceSchema>>({
    resolver: zodResolver(croissanceSchema),
    defaultValues: {
      id: type == "U" ? +transIn.id : undefined,
      type: transIn?.type ? transIn.type.toString() : label,
      subType: transIn?.subType ? transIn.subType.toString() : "",
      year: transIn?.year ? transIn.year.toString() : "0",
      croissance: transIn?.croissance ? transIn.croissance.toString() : "0",
      debtExtPIB: transIn?.debtExtPIB ? transIn.debtExtPIB.toString() : "0",
      txInternational: transIn?.txInternational
        ? transIn.txInternational.toString()
        : "0",
      creditSpread: transIn?.creditSpread
        ? transIn.creditSpread.toString()
        : "0",
      txInterieur: transIn?.txInterieur ? transIn.txInterieur.toString() : "0",
      infNat: transIn?.infNat ? transIn.infNat.toString() : "0",
      infMon: transIn?.infMon ? transIn.infMon.toString() : "0",
      soldePrim: transIn?.soldePrim ? transIn.soldePrim.toString() : "0",
      exportation: transIn?.exportation ? transIn.exportation.toString() : "0",
      inportation: transIn?.inportation ? transIn.inportation.toString() : "0",
      rendement: transIn?.rendement ? transIn?.rendement.toString() : "0",
      invest: transIn?.invest ? transIn.invest.toString() : "0",
      debtIntPIB: transIn?.debtIntPIB ? transIn.debtIntPI.toString() : "0",
      variantion: transIn?.variantion ? transIn.variantion.toString() : "0",
    },
  });

  // const autoFill = form.watch("autoFill");

  const procesForm = async (values: z.infer<typeof croissanceSchema>) => {
    setLoading(true);

    //const dcurve = await createFinOpt(values, code);
    //console.log("type", type);

    //console.log("Values  ", values);

    if (type == "U") {
      const res = await updateCroissance(values);
    } else {
      const res = await createCroissance(values);
    }

    setLoading(false);
    setOpen(false);
  };

  return (
    <div className="pr-4">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <div className="flex justify-between">
            {type == "U" ? (
              <MdUpdate size={20} className="text-yellow-600" />
            ) : (
              <div className="w-full flex items-center justify-between">
                <strong>{"Scénario de référence"}</strong>
                <MdAddCircleOutline size={25} className="text-sky-600" />
              </div>
            )}
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className=" max-w-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will update the input curve data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {/*           <MdUpdate size={30} />
           */}{" "}
          {/*           <Button type="button" onClick={() => setOpen(false)}>
            <MdUpdate size={30} />
          </Button> */}
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
                    name="type"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
                          <FormLabel>{"Type"}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter the value"
                              type="text"
                              disabled={true}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  {hasSubType && (
                    <FormField
                      control={form.control}
                      name="subType"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-1/2">
                            <FormLabel>Sous-Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger id="framework">
                                <SelectValue placeholder="Sélectionner un rating" />
                              </SelectTrigger>
                              <SelectContent position="popper">
                                {scenList?.map((ctr: any) => (
                                  <SelectItem
                                    key={ctr.id}
                                    value={ctr.id.toString()}
                                  >
                                    {ctr.type}
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
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"Année"}</FormLabel>
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
                    name="croissance"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"Croissance"}</FormLabel>
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
                    name="debtExtPIB"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"Dette externe"}</FormLabel>
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
                    name="txInternational"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"Tx international"}</FormLabel>
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
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="creditSpread"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"Spread de crédit"}</FormLabel>
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
                    name="txInterieur"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"Tx intérieur"}</FormLabel>
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
                    name="infNat"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"Inf. nationale"}</FormLabel>
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
                    name="infMon"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"Inf. mondiale"}</FormLabel>
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
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="soldePrim"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"Solde primaire"}</FormLabel>
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
                    name="exportation"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"Exportations"}</FormLabel>
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
                    name="inportation"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"Importations"}</FormLabel>
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
                    name="rendement"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"Rendement"}</FormLabel>
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
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="invest"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"Investissement"}</FormLabel>
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
                    name="debtIntPIB"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"Dette interne"}</FormLabel>
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
                    name="variantion"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"Variation"}</FormLabel>
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
              </div>
              <div className="flex justify-between pt-8 gap-4">
                {type == "U" && (
                  <Button
                    type="button"
                    variant="outline"
                    className="text-red-600 w-full md:w-1/3"
                    onClick={async () => {
                      //  console.log("ID: ", reserveIn?.id);

                      await deleteTransMatrix(transIn?.id);

                      //   setRefresh(!refresh);

                      setOpen(false);
                    }}
                  >
                    Delete
                  </Button>
                )}
                <Button
                  type="button"
                  variant="outline"
                  className="text-gray-400 w-full md:w-1/3"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className=" w-full md:w-1/3 hover:bg-sky-800 bg-sky-600 text-white uppercase"
                >
                  {type == "U"
                    ? loading
                      ? "Updating ..."
                      : "Update"
                    : loading
                    ? "Adding ..."
                    : "Add"}
                </Button>
              </div>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ScenRefForm;

"use client";
import React, { useEffect, useState } from "react";

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
import { Separator } from "../ui/separator";
import { Currency } from "@prisma/client";
import { ratings, valuationTypes } from "@/lib/enums";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import {
  MdAdd,
  MdAddCircleOutline,
  MdDeleteOutline,
  MdEdit,
  MdUpdate,
} from "react-icons/md";
import { TbXxx } from "react-icons/tb";
import { createFinOpt, updateFinOpt } from "@/lib/_finActions";
import { ReserveSchema } from "@/lib/schemas";
import {
  autoFillReserve,
  createReserve,
  deleteReserve,
  updateReserve,
} from "@/lib/_reserveActions";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

type ReserveFormProps = {
  type: any;
  reserveIn?: any;
  openDialog: any;
  refresh?: any;
  code: any;
  setRefresh?: (el: any) => void;
};
const ReserveForm = ({
  type,
  reserveIn,
  openDialog,
  refresh,
  setRefresh,
  code,
}: ReserveFormProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(openDialog);

  //console.log("code: ", code);

  const form = useForm<z.infer<typeof ReserveSchema>>({
    resolver: zodResolver(ReserveSchema),
    defaultValues: {
      id: type == "U" ? +reserveIn.id : undefined,
      tenor: reserveIn?.tenor ? reserveIn.tenor.toString() : "0",
      value: reserveIn?.value ? reserveIn.value.toString() : "0",
      code: code,
      autoFill: true,
      amount: "1000000",
    },
  });

  const autoFill = form.watch("autoFill");

  const procesForm = async (values: z.infer<typeof ReserveSchema>) => {
    setLoading(true);

    //const dcurve = await createFinOpt(values, code);
    //console.log("type", type);

    //console.log("Values  ", values);

    if (autoFill) {
      const res = await autoFillReserve(
        values?.code,
        values.amount ? values.amount : "1000000"
      );
    } else {
      if (type == "U") {
        const res = await updateReserve(values);
      } else {
        const res = await createReserve(values);
      }
    }

    // Compute Discount curve
    /*     const dcurve = await computeDiscountCurve(
        values,
        disc,
        [],
        zcrates,
        [],
        [],
        curveType
      ); */

    // setRefresh(!refresh);
    setLoading(false);
    setOpen(false);
  };

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <div className="flex justify-between">
            {type == "U" ? (
              <MdUpdate size={20} className="text-yellow-600" />
            ) : (
              <div className="w-full flex items-center justify-between">
                <strong>Réserve Annuelle</strong>
                <MdAddCircleOutline size={25} className="text-sky-600" />
              </div>
            )}
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
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
                <FormField
                  control={form.control}
                  name="autoFill"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-1/2 ">
                        <FormControl>
                          <div className="flex gap-2">
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <Label className="ml-2" htmlFor="autoFill">
                              <span className="">
                                {autoFill
                                  ? "Auto-generate constant values"
                                  : "Add values manually"}
                              </span>
                            </Label>
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                {!autoFill && (
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
                      name="code"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-1/2 hidden">
                            <FormLabel>{"Code"}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Entrer le code"
                                type="text"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name="tenor"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-1/2">
                            <FormLabel>{"Tenor"}</FormLabel>
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
                      name="value"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-1/2">
                            <FormLabel>{"Value"}</FormLabel>
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
                )}

                {autoFill && (
                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => {
                        return (
                          <FormItem className="">
                            <FormLabel>{"Constant Amount"}</FormLabel>
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
                )}
              </div>
              <div className="flex justify-between pt-8 gap-4">
                {type == "U" && (
                  <Button
                    type="button"
                    variant="outline"
                    className="text-red-600 w-full md:w-1/3"
                    onClick={async () => {
                      //  console.log("ID: ", reserveIn?.id);

                      await deleteReserve(reserveIn?.id, code);

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

export default ReserveForm;

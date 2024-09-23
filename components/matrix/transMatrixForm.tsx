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

import { transMatrixSchema } from "@/lib/schemas";
import {
  autoFillReserve,
  createReserve,
  deleteReserve,
  updateReserve,
} from "@/lib/_reserveActions";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import {
  createTransMatrix,
  deleteTransMatrix,
  updateTransMatrix,
} from "@/lib/_matrix";

type TransMatrixFormProps = {
  /*   type: any;
  reserveIn?: any;
  openDialog: any;
  refresh?: any;
  code: any;
  setRefresh?: (el: any) => void; */
  transIn?: any;
  type: any;
  openDialog: any;
};
const TransMatrixForm = ({
  openDialog,
  transIn,
  type,
}: /*   type,
  reserveIn,
  openDialog,
  refresh,
  setRefresh,
  code, */
TransMatrixFormProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(openDialog);

  //console.log("code: ", code);

  const form = useForm<z.infer<typeof transMatrixSchema>>({
    resolver: zodResolver(transMatrixSchema),
    defaultValues: {
      id: type == "U" ? +transIn.id : undefined,
      label: transIn?.tenor ? transIn.tenor.toString() : "",
      AAA: transIn?.AAA ? transIn.AAA.toString() : "0",
      AA: transIn?.AA ? transIn.AA.toString() : "0",
      A: transIn?.A ? transIn.A.toString() : "0",
      BBB: transIn?.BBB ? transIn.BBB.toString() : "0",
      BB: transIn?.BB ? transIn.BB.toString() : "0",
      B: transIn?.B ? transIn.B.toString() : "0",
      CCC_C: transIn?.CCC_C ? transIn.CCC_C.toString() : "0",
      D: transIn?.D ? transIn.D.toString() : "0",
      NR: transIn?.NR ? transIn.NR.toString() : "0",
    },
  });

  // const autoFill = form.watch("autoFill");

  const procesForm = async (values: z.infer<typeof transMatrixSchema>) => {
    setLoading(true);

    //const dcurve = await createFinOpt(values, code);
    //console.log("type", type);

    //console.log("Values  ", values);

    if (type == "U") {
      const res = await updateTransMatrix(values);
    } else {
      const res = await createTransMatrix(values);
    }

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
                <strong>Transition Matrix</strong>
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
                    name="label"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"Label"}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Entrer la valeur"
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
                    name="AAA"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"AAA"}</FormLabel>
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
                    name="AA"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"AA"}</FormLabel>
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
                    name="A"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"A"}</FormLabel>
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
                    name="BBB"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"BBB"}</FormLabel>
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
                    name="BB"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"BB"}</FormLabel>
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
                    name="B"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"B"}</FormLabel>
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
                    name="CCC_C"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"CCC/C"}</FormLabel>
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
                    name="D"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"D"}</FormLabel>
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
                    name="NR"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"NR"}</FormLabel>
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

export default TransMatrixForm;

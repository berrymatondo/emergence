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
import { defMatrixSchema } from "@/lib/schemas";
import {
  createDefMatrix,
  deleteDefMatrix,
  updateDefMatrix,
} from "@/lib/_matrix";

type DefMatrixFormProps = {
  /*   type: any;
  reserveIn?: any;
  openDialog: any;
  refresh?: any;
  code: any;
  setRefresh?: (el: any) => void; */
  defIn?: any;
  type: any;
  openDialog: any;
};
const DefMatrixForm = ({
  defIn,
  openDialog,
  type,
}: /*   type,
  reserveIn,
  openDialog,
  refresh,
  setRefresh,
  code, */
DefMatrixFormProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(openDialog);

  //console.log("code: ", code);

  const form = useForm<z.infer<typeof defMatrixSchema>>({
    resolver: zodResolver(defMatrixSchema),
    defaultValues: {
      id: type == "U" ? +defIn.id : undefined,
      label: defIn?.tenor ? defIn.tenor.toString() : "",
      y1: defIn?.y1 ? defIn?.y1.toString() : "0",
      y2: defIn?.y2 ? defIn?.y2.toString() : "0",
      y3: defIn?.y3 ? defIn?.y3.toString() : "0",
      y4: defIn?.y4 ? defIn?.y4.toString() : "0",
      y5: defIn?.y5 ? defIn?.y5.toString() : "0",
      y6: defIn?.y6 ? defIn?.y6.toString() : "0",
      y7: defIn?.y7 ? defIn?.y7.toString() : "0",
      y8: defIn?.y8 ? defIn?.y8.toString() : "0",
      y9: defIn?.y9 ? defIn?.y9.toString() : "0",
      y10: defIn?.y10 ? defIn?.y10.toString() : "0",
    },
  });

  // const autoFill = form.watch("autoFill");

  const procesForm = async (values: z.infer<typeof defMatrixSchema>) => {
    setLoading(true);

    //const dcurve = await createFinOpt(values, code);
    //console.log("type", type);

    //console.log("Values  ", values);

    if (type == "U") {
      const res = await updateDefMatrix(values);
    } else {
      const res = await createDefMatrix(values);
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
                <strong>Default Probability Matrix</strong>
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
                    name="y1"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"Y1"}</FormLabel>
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
                    name="y2"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"Y2"}</FormLabel>
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
                    name="y3"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"Y3"}</FormLabel>
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
                    name="y4"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"Y4"}</FormLabel>
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
                    name="y5"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"Y5"}</FormLabel>
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
                    name="y6"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"Y6"}</FormLabel>
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
                    name="y7"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"Y7"}</FormLabel>
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
                    name="y8"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"Y8"}</FormLabel>
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
                    name="y9"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"Y9"}</FormLabel>
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
                    name="y10"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"Y10"}</FormLabel>
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

                      await deleteDefMatrix(defIn?.id);

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

export default DefMatrixForm;

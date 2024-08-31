"use client";
import { MdAdd } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useState } from "react";

type InputCurveProps = {
  inputCurve: any;
  setInputCurve: (el: any) => void;
  title?: string;
};

const InputCurve = ({ inputCurve, setInputCurve, title }: InputCurveProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        {title ? (
          <p className="font-semibold  text-sm mr-2">{title}</p>
        ) : (
          <p className="font-semibold text-sm mr-2">Input Curve</p>
        )}
        <AddInputCurve inputCurve={inputCurve} openDialog={false} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left mx-0 px-0">
              <p className="flex justify-between">
                <span>Tenor</span>
                <span> Rate</span>
              </p>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inputCurve?.map((ic: any) => (
            <TableRow key={ic.id}>
              <TableCell className="text-right  mx-0 px-0">
                <UpdateInputCurve
                  inputCurve={inputCurve}
                  ic={ic}
                  openDialog={false}
                  setInputCurve={setInputCurve}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InputCurve;

// Add Input

type AddInputCurveProps = {
  inputCurve: any;

  openDialog: boolean;
};

const AddInputCurve = ({ inputCurve, openDialog }: AddInputCurveProps) => {
  const [open, setOpen] = useState(openDialog);
  const [tenor, setTenor] = useState(0);
  const [rate, setRate] = useState(0);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <MdAdd className="bg-sky-600 rounded-full" size={25} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will add a data into the input curve.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            inputCurve.push({
              id: inputCurve.length + 1,
              tenor: +tenor,
              rate: +rate,
            });

            inputCurve.sort((a: any, b: any) => a.tenor - b.tenor);

            setOpen(!open);
          }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div>
                <Label>Tenor:</Label>
                <Input
                  value={tenor}
                  type="number"
                  step="0.01"
                  onChange={(e: any) => setTenor(e.target.value)}
                />
              </div>
              <div>
                <Label>Rate:</Label>
                <Input
                  value={rate}
                  type="number"
                  step="0.01"
                  onChange={(e: any) => setRate(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <Button type="submit">Save</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

type UpdateInputCurveProps = {
  inputCurve: any;
  ic: any;
  openDialog: boolean;
  setInputCurve: (el: any) => void;
};
const UpdateInputCurve = ({
  inputCurve,
  ic,
  openDialog,
  setInputCurve,
}: UpdateInputCurveProps) => {
  const [open, setOpen] = useState(openDialog);
  const [tenor, setTenor] = useState(ic.tenor);
  const [rate, setRate] = useState(ic.rate);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <div className="flex justify-between">
          <span>{ic?.tenor}</span>
          <span>{ic?.rate} %</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will update the input curve data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const objIndex = inputCurve.findIndex(
              (obj: any) => obj.id == ic.id
            );

            inputCurve[objIndex].tenor = +tenor;
            inputCurve[objIndex].rate = +rate;

            inputCurve.sort((a: any, b: any) => a.tenor - b.tenor);

            setOpen(!open);
          }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div>
                <Label>Tenor:</Label>
                <Input
                  value={tenor}
                  type="number"
                  step="0.01"
                  onChange={(e: any) => setTenor(e.target.value)}
                />
              </div>
              <div>
                <Label>Rate:</Label>
                <Input
                  value={rate}
                  type="number"
                  step="0.01"
                  onChange={(e: any) => setRate(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                type="button"
                onClick={() => {
                  inputCurve = inputCurve
                    .filter((el: any) => el.id != ic.id)
                    .sort((a: any, b: any) => a.tenor - b.tenor);

                  setInputCurve(inputCurve);
                  console.log("After update: ", inputCurve);
                  setOpen(!open);
                }}
              >
                Delete
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

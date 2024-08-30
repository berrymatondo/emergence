"use client";
import { MdAdd } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/alert-dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { useState } from "react";

type DividendCurveProps = {
  dividend: any;
  setDividend: (el: any) => void;
};

const DividendCurve = ({ dividend, setDividend }: DividendCurveProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-semibold">Dividend Yield</p>
        <AddDividendCurve dividend={dividend} openDialog={false} />
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
          {dividend?.map((ic: any) => (
            <TableRow key={ic.id}>
              <TableCell className="text-right  mx-0 px-0">
                <UpdateDividendCurve
                  dividend={dividend}
                  ic={ic}
                  openDialog={false}
                  setDividend={setDividend}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DividendCurve;

// Add Input

type AddDividendCurveProps = {
  dividend: any;
  openDialog: boolean;
};

const AddDividendCurve = ({ dividend, openDialog }: AddDividendCurveProps) => {
  const [open, setOpen] = useState(openDialog);
  const [tenor, setTenor] = useState(0);
  const [rate, setRate] = useState(0);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <MdAdd className="bg-sky-600 rounded-full" />
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
            dividend.push({
              id: dividend.length + 1,
              tenor: +tenor,
              rate: +rate,
            });

            dividend.sort((a: any, b: any) => a.tenor - b.tenor);

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

type UpdateDividendCurveProps = {
  dividend: any;
  ic: any;
  openDialog: boolean;
  setDividend: (el: any) => void;
};
const UpdateDividendCurve = ({
  dividend,
  ic,
  openDialog,
  setDividend,
}: UpdateDividendCurveProps) => {
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
            const objIndex = dividend.findIndex((obj: any) => obj.id == ic.id);

            dividend[objIndex].tenor = +tenor;
            dividend[objIndex].rate = +rate;

            dividend.sort((a: any, b: any) => a.tenor - b.tenor);

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
                  dividend = dividend
                    .filter((el: any) => el.id != ic.id)
                    .sort((a: any, b: any) => a.tenor - b.tenor);

                  setDividend(dividend);
                  console.log("After update: ", dividend);
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

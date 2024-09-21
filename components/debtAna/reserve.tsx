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

type ReserveProps = {
  creditSpread: any;
  setCreditSpread: (el: any) => void;
  title?: string;
  currencies?: any;
};
const Reserve = ({ creditSpread, setCreditSpread, title }: ReserveProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        {title ? (
          <p className="font-semibold text-sm mr-2">{title}</p>
        ) : (
          <p className="font-semibold  text-sm mr-2">Credit Spread</p>
        )}
        <AddReserve creditSpread={creditSpread} openDialog={false} />
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
          {creditSpread?.map((yc: any) => (
            <TableRow key={yc.id}>
              <TableCell className="text-right  mx-0 px-0">
                <UpdateReserve
                  creditSpread={creditSpread}
                  cs={yc}
                  openDialog={false}
                  setCreditSpread={setCreditSpread}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default Reserve;

type UpdateReserveProps = {
  creditSpread: any;
  cs: any;
  openDialog: boolean;
  setCreditSpread: (el: any) => void;
};
const UpdateReserve = ({
  creditSpread,
  cs,
  openDialog,
  setCreditSpread,
}: UpdateReserveProps) => {
  const [open, setOpen] = useState(openDialog);
  const [tenor, setTenor] = useState(cs.tenor);
  const [rate, setRate] = useState(cs.rate);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <div className="flex justify-between">
          <span>{cs?.tenor}</span>
          <span>{cs?.rate} %</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will update the credit spread.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const objIndex = creditSpread.findIndex(
              (obj: any) => obj.id == cs.id
            );

            creditSpread[objIndex].tenor = +tenor;
            creditSpread[objIndex].rate = +rate;

            creditSpread.sort((a: any, b: any) => a.tenor - b.tenor);

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
                  creditSpread = creditSpread
                    .filter((el: any) => el.id != cs.id)
                    .sort((a: any, b: any) => a.tenor - b.tenor);

                  setCreditSpread(creditSpread);
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

type AddReserveProps = {
  creditSpread: any;

  openDialog: boolean;
};

const AddReserve = ({ creditSpread, openDialog }: AddReserveProps) => {
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
            This will add a data into the credit spread curve.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            creditSpread.push({
              id: creditSpread.length + 1,
              tenor: +tenor,
              rate: +rate,
            });

            creditSpread.sort((a: any, b: any) => a.tenor - b.tenor);

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

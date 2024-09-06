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

type UserInputsProps = {
  inputs: any;
  setInputs: (el: any) => void;
  title?: string;
  label: boolean;
  labelName: string;
};
const UserInputs = ({
  inputs,
  setInputs,
  title,
  label,
  labelName,
}: UserInputsProps) => {
  //console.log("OUT", inputs);
  // let colTitle = "Rate";
  // if (label) colTitle = "Label";

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-semibold text-sm mr-2">{title}</p>

        <AddInputs inputs={inputs} openDialog={false} labelName={labelName} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left mx-0 px-0">
              <p className="flex justify-between">
                <span>Tenor</span>
                <span> {labelName}</span>
              </p>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inputs?.map((yc: any) => (
            <TableRow key={yc.id}>
              <TableCell className="text-right  mx-0 px-0">
                <UpdateInputs
                  inputs={inputs}
                  cs={yc}
                  openDialog={false}
                  setInputs={setInputs}
                  labelName={labelName}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default UserInputs;

type UpdateInputsProps = {
  inputs: any;
  cs: any;
  openDialog: boolean;
  setInputs: (el: any) => void;
  labelName: any;
};
const UpdateInputs = ({
  inputs,
  cs,
  openDialog,
  setInputs,
  labelName,
}: UpdateInputsProps) => {
  const [open, setOpen] = useState(openDialog);
  const [tenor, setTenor] = useState(cs.tenor);
  const [rate, setRate] = useState(cs.rate);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <div className="flex justify-between">
          <span>{cs?.tenor}</span>
          {labelName !== "Rate" ? (
            <span>{cs?.rate} </span>
          ) : (
            <span>{cs?.rate} %</span>
          )}
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

            const objIndex = inputs.findIndex((obj: any) => obj.id == cs.id);

            inputs[objIndex].tenor = +tenor;
            inputs[objIndex].rate = +rate;

            inputs.sort((a: any, b: any) => a.tenor - b.tenor);

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
                <Label>{labelName}:</Label>
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
                  inputs = inputs
                    .filter((el: any) => el.id != cs.id)
                    .sort((a: any, b: any) => a.tenor - b.tenor);

                  setInputs(inputs);
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

type AddInputsdProps = {
  inputs: any;

  openDialog: boolean;
  labelName: string;
};

const AddInputs = ({ inputs, openDialog, labelName }: AddInputsdProps) => {
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
            inputs.push({
              id: inputs.length + 1,
              tenor: +tenor,
              rate: +rate,
            });

            inputs.sort((a: any, b: any) => a.tenor - b.tenor);

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
                <Label>{labelName}:</Label>
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

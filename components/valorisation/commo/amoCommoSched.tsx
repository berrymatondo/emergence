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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";

type AmoCommoSchedProps = {
  amoSchedules: any;
  setAmoSchedules: (el: any) => void;
  title?: string;
};
const AmoCommoSched = ({
  amoSchedules,
  setAmoSchedules,
  title,
}: AmoCommoSchedProps) => {
  // console.log("ICIC ", inputCurve);

  return (
    <div>
      <div className="flex items-center justify-between">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {title ? (
                <p className="font-semibold">{title}</p>
              ) : (
                <p className="font-semibold">Am. Schedule</p>
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>Amortization Schedule</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <AddAmoSchedule amoSchedules={amoSchedules} openDialog={false} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left mx-0 px-0">
              <p className="flex justify-between">
                <span>Date</span>
                <span> Rate</span>
              </p>
            </TableHead>
            {/*             <TableHead className="text-right  mx-0 px-0"></TableHead>
             */}{" "}
          </TableRow>
        </TableHeader>
        <TableBody>
          {amoSchedules?.map((ic: any) => (
            <TableRow key={ic.id}>
              {/*             <TableCell className="font-medium  mx-0 px-0">{yc.tenor}</TableCell>
               */}
              <TableCell className="text-right  mx-0 px-0">
                {/*               {yc.yield}
                 */}{" "}
                <UpdateAmoSchedule
                  amoSchedules={amoSchedules}
                  ic={ic}
                  openDialog={false}
                  setAmoSchedules={setAmoSchedules}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AmoCommoSched;

type AddAmoScheduleProps = {
  amoSchedules: any;

  openDialog: boolean;
};

const AddAmoSchedule = ({ amoSchedules, openDialog }: AddAmoScheduleProps) => {
  const [open, setOpen] = useState(openDialog);
  const [date, setDate] = useState("");
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
            // console.log("New Tenor:", tenor);
            // console.log("New Rate:", rate);
            /*             console.log("creditSpread", creditSpread); */

            //Find index of specific object using findIndex method.
            amoSchedules.push({
              id: amoSchedules.length + 1,
              date: date,
              rate: +rate,
            });
            /*            const objIndex = inputCurve.findIndex(
                (obj: any) => obj.id == ic.id
              );
   */
            //Log object to Console.
            //console.log("Before update: ", creditSpread[objIndex]);

            //Update object's name property.
            /*        inputCurve[objIndex].tenor = tenor;
              inputCurve[objIndex].rate = rate; */

            amoSchedules.sort((a: any, b: any) => a.date - b.tenor);
            //Log object to console again.
            // console.log("After update: ", creditSpread[objIndex]);
            //console.log("After update: ", inputCurve);
            setOpen(!open);
          }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div>
                <Label>Date:</Label>
                <Input
                  //defaultValue={cs.tenor}
                  value={date}
                  type="date"
                  step="0.01"
                  onChange={(e: any) => setDate(e.target.value)}
                />
              </div>
              <div>
                <Label>Rate:</Label>
                <Input
                  //defaultValue={cs.yield}
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
          {/*           <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter> */}
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

type UpdateAmoScheduleProps = {
  amoSchedules: any;
  ic: any;
  openDialog: boolean;
  setAmoSchedules: (el: any) => void;
};
const UpdateAmoSchedule = ({
  amoSchedules,
  ic,
  openDialog,
  setAmoSchedules,
}: UpdateAmoScheduleProps) => {
  const [open, setOpen] = useState(openDialog);
  const [date, setDate] = useState(ic.date);
  const [rate, setRate] = useState(ic.rate);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <div className="flex justify-between">
          <span>{ic?.date.split("-").reverse().join("-")}</span>
          <span>{ic?.rate}</span>
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
            // console.log("New Tenor:", tenor);
            // console.log("New Rate:", rate);
            /*             console.log("creditSpread", creditSpread); */

            //Find index of specific object using findIndex method.
            const objIndex = amoSchedules.findIndex(
              (obj: any) => obj.id == ic.id
            );

            //Log object to Console.
            //console.log("Before update: ", creditSpread[objIndex]);

            //Update object's name property.
            amoSchedules[objIndex].date = date;
            amoSchedules[objIndex].rate = +rate;

            amoSchedules.sort((a: any, b: any) => a.date - b.tenor);
            //Log object to console again.
            // console.log("After update: ", creditSpread[objIndex]);
            //console.log("After update: ", creditSpread);
            setOpen(!open);
          }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div>
                <Label>Date:</Label>
                <Input
                  //defaultValue={cs.tenor}
                  value={date}
                  type="date"
                  step="0.01"
                  onChange={(e: any) => setDate(e.target.value)}
                />
              </div>
              <div>
                <Label>Rate:</Label>
                <Input
                  //defaultValue={cs.yield}
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
                  amoSchedules = amoSchedules
                    .filter((el: any) => el.id != ic.id)
                    .sort((a: any, b: any) => a.date - b.date);

                  //inputCurve.sort((a: any, b: any) => a.tenor - b.tenor);
                  //Log object to console again.
                  // console.log("After update: ", creditSpread[objIndex]);
                  setAmoSchedules(amoSchedules);
                  // console.log("After update: ", inputCurve);
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

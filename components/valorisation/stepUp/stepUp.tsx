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

type StepUpProps = {
  stepuprates: any;
  setStepuprates: (el: any) => void;
};
const StepUp = ({ stepuprates, setStepuprates }: StepUpProps) => {
  // console.log("ICIC ", inputCurve);

  return (
    <div>
      <div className="flex items-center justify-between">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="font-semibold">Step Up Coupon</p>
            </TooltipTrigger>
            <TooltipContent>
              <p>Step Up Coupon</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <AddStepUp stepuprates={stepuprates} openDialog={false} />
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
            {/*             <TableHead className="text-right  mx-0 px-0"></TableHead>
             */}{" "}
          </TableRow>
        </TableHeader>
        <TableBody>
          {stepuprates?.map((ic: any) => (
            <TableRow key={ic.id}>
              {/*             <TableCell className="font-medium  mx-0 px-0">{yc.tenor}</TableCell>
               */}
              <TableCell className="text-right  mx-0 px-0">
                {/*               {yc.yield}
                 */}{" "}
                <UpdateStepUp
                  stepuprates={stepuprates}
                  ic={ic}
                  openDialog={false}
                  setStepuprates={setStepuprates}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StepUp;

type AddStepUpProps = {
  stepuprates: any;

  openDialog: boolean;
};

const AddStepUp = ({ stepuprates, openDialog }: AddStepUpProps) => {
  const [open, setOpen] = useState(openDialog);
  const [tenor, setTenor] = useState("");
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
            // console.log("New Tenor:", tenor);
            // console.log("New Rate:", rate);
            /*             console.log("creditSpread", creditSpread); */

            //Find index of specific object using findIndex method.
            stepuprates.push({
              id: stepuprates.length + 1,
              tenor: +tenor,
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

            stepuprates.sort((a: any, b: any) => a.tenor - b.tenor);
            //Log object to console again.
            // console.log("After update: ", creditSpread[objIndex]);
            //console.log("After update: ", inputCurve);
            setOpen(!open);
          }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div>
                <Label>Tenor:</Label>
                <Input
                  //defaultValue={cs.tenor}
                  value={tenor}
                  type="number"
                  step="0.01"
                  onChange={(e: any) => setTenor(e.target.value)}
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

type UpdateStepUpProps = {
  stepuprates: any;
  ic: any;
  openDialog: boolean;
  setStepuprates: (el: any) => void;
};
const UpdateStepUp = ({
  stepuprates,
  ic,
  openDialog,
  setStepuprates,
}: UpdateStepUpProps) => {
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
            // console.log("New Tenor:", tenor);
            // console.log("New Rate:", rate);
            /*             console.log("creditSpread", creditSpread); */

            //Find index of specific object using findIndex method.
            const objIndex = stepuprates.findIndex(
              (obj: any) => obj.id == ic.id
            );

            //Log object to Console.
            //console.log("Before update: ", creditSpread[objIndex]);

            //Update object's name property.
            stepuprates[objIndex].tenor = tenor;
            stepuprates[objIndex].rate = +rate;

            stepuprates.sort((a: any, b: any) => a.tenor - b.tenor);
            //Log object to console again.
            // console.log("After update: ", creditSpread[objIndex]);
            //console.log("After update: ", creditSpread);
            setOpen(!open);
          }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div>
                <Label>Tenor:</Label>
                <Input
                  //defaultValue={cs.tenor}
                  value={tenor}
                  type="number"
                  step="0.01"
                  onChange={(e: any) => setTenor(e.target.value)}
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
                  stepuprates = stepuprates
                    .filter((el: any) => el.id != ic.id)
                    .sort((a: any, b: any) => a.tenor - b.tenor);

                  //inputCurve.sort((a: any, b: any) => a.tenor - b.tenor);
                  //Log object to console again.
                  // console.log("After update: ", creditSpread[objIndex]);
                  setStepuprates(stepuprates);
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

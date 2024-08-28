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

type DCurveProps = {
  disc: any;
  setDisc: (el: any) => void;
  title?: string;
};

const DCurve = ({ disc, setDisc, title }: DCurveProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        {title ? (
          <p className="font-semibold">{title}</p>
        ) : (
          <p className="font-semibold">Discount Curve</p>
        )}
        <AddDisc disc={disc} openDialog={false} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left mx-0 pl-0 pr-2">
              {" "}
              <p className="flex justify-between">
                <span>Tenor</span>
                <span> Rate</span>
              </p>
            </TableHead>
            {/*             <TableHead className="text-right  mx-0 px-0">Rate</TableHead>
             */}{" "}
          </TableRow>
        </TableHeader>
        <TableBody>
          {disc?.map((yc: any) => (
            <TableRow key={yc.id}>
              {/*               <TableCell className="font-medium  mx-0 px-0">
                  {yc.tenor}
                </TableCell> */}

              <TableCell className="text-right  mx-0 px-0">
                {/*                 {yc.rate.toFixed(2)} %
  
   */}
                <UpdateDCurve
                  disc={disc}
                  dc={yc}
                  openDialog={false}
                  setDisc={setDisc}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// ADD Disc
type AddDiscProps = {
  disc: any;

  openDialog: boolean;
};

const AddDisc = ({ disc, openDialog }: AddDiscProps) => {
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
            This will add a data into the credit spread curve.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            disc.push({
              id: disc.length + 1,
              tenor: +tenor,
              rate: 0,
            });

            disc.sort((a: any, b: any) => a.tenor - b.tenor);

            //console.log("DISC", disc);

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
              {/*               <div>
                  <Label>Rate:</Label>
                  <Input
                    //defaultValue={cs.yield}
                    value={rate}
                    type="number"
                    step="0.01"
                    onChange={(e: any) => setRate(e.target.value)}
                  />
                </div> */}
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

//Update DCurve
type UpdateDCurveProps = {
  disc: any;
  dc: any;
  openDialog: boolean;
  setDisc: (el: any) => void;
};
const UpdateDCurve = ({
  disc,
  dc,
  openDialog,
  setDisc,
}: //setCreditSpread,
UpdateDCurveProps) => {
  const [open, setOpen] = useState(openDialog);
  const [tenor, setTenor] = useState(dc.tenor);
  const [rate, setRate] = useState(dc.rate);
  //console.log("DC: ", dc);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <div className="flex justify-between">
          <span>{dc?.tenor}</span>
          <span>{dc?.rate.toFixed(2)} %</span>
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
            // console.log("New Tenor:", tenor);
            // console.log("New Rate:", rate);
            /*             console.log("creditSpread", creditSpread); */

            //Find index of specific object using findIndex method.
            //console.log("disc", disc);
            //console.log("dc.id", dc.id);

            const objIndex = disc.findIndex((obj: any) => obj.id == dc.id);

            //Log object to Console.
            //console.log("Before update: ", creditSpread[objIndex]);

            //Update object's name property.
            disc[objIndex].tenor = +tenor;
            disc[objIndex].rate = +rate;

            disc.sort((a: any, b: any) => a.tenor - b.tenor);
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
              {/*               <div>
                  <Label>Rate:</Label>
                  <Input
                    //defaultValue={cs.yield}
                    value={rate}
                    type="number"
                    step="0.01"
                    onChange={(e: any) => setRate(e.target.value)}
                  />
                </div> */}
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
                  disc = disc
                    .filter((el: any) => el.id != dc.id)
                    .sort((a: any, b: any) => a.tenor - b.tenor);

                  //inputCurve.sort((a: any, b: any) => a.tenor - b.tenor);
                  //Log object to console again.
                  // console.log("After update: ", creditSpread[objIndex]);
                  setDisc(disc);
                  // console.log("After update: ", creditSpread);
                  setOpen(!open);
                }}
              >
                Delete
              </Button>
              <Button type="submit">Save</Button>
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

export default DCurve;

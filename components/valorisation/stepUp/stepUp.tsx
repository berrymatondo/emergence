import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type StepUpProps = {
  stepuprates: any;
};
const StepUp = ({ stepuprates }: StepUpProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left mx-0 pl-0 pr-2">Tenor</TableHead>
          {/*           <TableHead className="  mx-0 px-0">Rate</TableHead>
           */}{" "}
          <TableHead className="text-right  mx-0 px-0">Rate</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stepuprates?.map((yc: any) => (
          <TableRow key={yc.id}>
            <TableCell className="font-medium  mx-0 px-0">{yc.tenor}</TableCell>
            {/*             <TableCell className="  mx-0 px-0">{yc.rate} %</TableCell>
             */}{" "}
            <TableCell className="text-right  mx-0 px-0">
              {(yc.rate * 100).toFixed(2)} %
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StepUp;

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type CommoForwardRateProps = {
  commoFRates: any;
};
const CommoForwardRate = ({ commoFRates }: CommoForwardRateProps) => {
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
        {commoFRates?.map((yc: any) => (
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

export default CommoForwardRate;

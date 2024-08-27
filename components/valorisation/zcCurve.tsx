import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type ZCCurveProps = {
  zccurve: any;
};
const ZCCurve = ({ zccurve }: ZCCurveProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left mx-0 pl-0 pr-2">Tenor</TableHead>

          <TableHead className="text-right  mx-0 px-0">Rate</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {zccurve?.map((yc: any) => (
          <TableRow key={yc.id}>
            <TableCell className="font-medium  mx-0 px-0">{yc.tenor}</TableCell>

            <TableCell className="text-right  mx-0 px-0">{yc.rate} %</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ZCCurve;

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type YieldCurveProps = {
  yieldcurve: any;
};
const YieldCurve = ({ yieldcurve }: YieldCurveProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left mx-0 px-0">Tenor</TableHead>

          <TableHead className="text-right  mx-0 px-0">Yield</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {yieldcurve?.map((yc: any) => (
          <TableRow key={yc.id}>
            <TableCell className="font-medium  mx-0 px-0">{yc.tenor}</TableCell>

            <TableCell className="text-right  mx-0 px-0">{yc.yield}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default YieldCurve;

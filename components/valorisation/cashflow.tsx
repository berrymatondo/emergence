import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

// Cashflows Maps
type CashflowProps = {
  cashflow: any;
};
const Cashflow = ({ cashflow }: CashflowProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left mx-0 pl-0 pr-2">
            Payment Date
          </TableHead>
          <TableHead className="text-center mx-0 pl-0">Gross Payment</TableHead>

          <TableHead className="text-right  mx-0 px-0">
            Discounted Payment
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cashflow?.map((yc: any) => (
          <TableRow key={yc.id}>
            <TableCell className="font-medium  mx-0 px-0">
              {yc.date.split("-").reverse().join("-")}
            </TableCell>
            <TableCell className="text-center    mx-0 px-0">
              {(yc.gross * 100).toFixed(2)} %
            </TableCell>

            <TableCell className="text-right  mx-0 px-0">
              {(yc.discounted * 100).toFixed(2)} %
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Cashflow;

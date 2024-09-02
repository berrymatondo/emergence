import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

// Cashflows Maps
type LegCashflowProps = {
  fixed: any;
  floating: any;
  cur: any;
};
const LegCashflow = ({ fixed, floating, cur }: LegCashflowProps) => {
  let fusion = [];
  for (let i = 0; i < fixed?.length; i++) {
    fusion.push({ id: i + 1, fixed: fixed[i], floating: floating[i] });
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left mx-0 pl-0 pr-2">Fixed Leg</TableHead>
          {/*           <TableHead className="text-center mx-0 pl-0">Gross Payment</TableHead>
           */}
          <TableHead className="text-right  mx-0 px-0">Floating Leg</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fusion?.map((yc: any) => (
          <TableRow key={yc.id}>
            <TableCell className="font-medium  mx-0 px-0">
              {new Intl.NumberFormat(undefined, {
                currency: cur,
                style: "currency",
              }).format(+yc.fixed.toFixed(2))}
            </TableCell>
            {/*  <TableCell className="text-center    mx-0 px-0">
              {(yc.gross * 100).toFixed(2)} %
            </TableCell> */}

            <TableCell className="text-right  mx-0 px-0">
              {new Intl.NumberFormat(undefined, {
                currency: cur,
                style: "currency",
              }).format(+yc.floating.toFixed(2))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LegCashflow;

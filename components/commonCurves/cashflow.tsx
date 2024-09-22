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
  type?: any;
  curCode?: any;
  fraction?: any;
};
const Cashflow = ({ cashflow, type, curCode, fraction }: CashflowProps) => {
  let cash = [];
  for (let i = 0; cashflow && i < cashflow.length; i++) {
    cash.push({
      date: cashflow[i].date.toString(),
      gross: cashflow[i].value,
    });
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left mx-0 pl-0 pr-2">Date</TableHead>
          <TableHead className="text-center mx-0 pl-0">Gross Payment</TableHead>

          {type != "fin" && (
            <TableHead className="text-right  mx-0 px-0">
              Discounted Payment
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {cash?.map((yc: any) => (
          <TableRow key={yc.id}>
            <TableCell className="font-medium  mx-0 px-0">
              {yc.date.split("-").reverse().join("-")}
            </TableCell>
            {type == "fin" && (
              <TableCell className="text-center    mx-0 px-0">
                {/*               //  {yc.gross.toFixed(2)}
                 */}{" "}
                <span className="text-white font-semibold">
                  {new Intl.NumberFormat(undefined, {
                    currency: curCode ? curCode : "USD",
                    style: "currency",
                  }).format(+yc.gross?.toFixed(2))}
                </span>
              </TableCell>
            )}

            {type != "fin" && (
              <TableCell className="text-center    mx-0 px-0">
                {(yc.gross * 100).toFixed(2)} %
              </TableCell>
            )}

            {type != "fin" && (
              <TableCell className="text-right  mx-0 px-0">
                {(yc.discounted * 100).toFixed(2)} %
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Cashflow;

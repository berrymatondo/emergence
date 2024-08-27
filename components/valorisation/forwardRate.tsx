import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type ForwardRateProps = {
  forwardrates: any;
};
const ForwardRate = ({ forwardrates }: ForwardRateProps) => {
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
        {forwardrates?.map((yc: any) => (
          <TableRow key={yc.id}>
            <TableCell className="font-medium  mx-0 px-0">{yc.tenor}</TableCell>
            {/*             <TableCell className="  mx-0 px-0">{yc.rate} %</TableCell>
             */}{" "}
            <TableCell className="text-right  mx-0 px-0">{yc.rate} %</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ForwardRate;

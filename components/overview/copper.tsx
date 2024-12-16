"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  LabelList,
  Line,
  LineChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  Rectangle,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Badge } from "../ui/badge";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
import GeneralLayout from "../generalLayout";
import Image from "next/image";
import avatar from "../../public/rdc.png";
import { ScrollArea } from "../ui/scroll-area";

const copperData = [
  { date: "2023-12-01", chili: 494.7, rdc: 255.82, perou: 255.14 },
  { date: "2023-11-01", chili: 442.9, rdc: 255.93, perou: 253.58 },
  { date: "2023-10-01", chili: 459.7, rdc: 277.65, perou: 240.2 },
  { date: "2023-09-01", chili: 457.4, rdc: 252.64, perou: 235.25 },
  { date: "2023-08-01", chili: 436.5, rdc: 258.71, perou: 222.8 },
  { date: "2023-07-01", chili: 433.9, rdc: 215.17, perou: 229.74 },
  { date: "2023-06-01", chili: 457.2, rdc: 263.53, perou: 241.85 },
  { date: "2023-05-01", chili: 408.7, rdc: 291.79, perou: 234.78 },
  { date: "2023-04-01", chili: 412.8, rdc: 200.97, perou: 222.07 },
  { date: "2023-03-01", chili: 436.2, rdc: 201.3, perou: 219.3 },
  { date: "2023-02-01", chili: 380.0, rdc: 180.73, perou: 192.38 },
  { date: "2023-01-01", chili: 431.6, rdc: 187.79, perou: 207.97 },
  { date: "2022-12-01", chili: 497.5, rdc: 169.01, perou: 251.76 },
  { date: "2022-11-01", chili: 453.4, rdc: 185.84, perou: 228.66 },
  { date: "2022-10-01", chili: 478.3, rdc: 204.35, perou: 235.73 },
  { date: "2022-09-01", chili: 434.6, rdc: 223.71, perou: 229.49 },
  { date: "2022-08-01", chili: 415.5, rdc: 247.07, perou: 207.59 },
  { date: "2022-07-01", chili: 423.7, rdc: 241.49, perou: 195.23 },
  { date: "2022-06-01", chili: 454.7, rdc: 203.75, perou: 198.47 },
  { date: "2022-05-01", chili: 474.8, rdc: 178.57, perou: 174.26 },
  { date: "2022-04-01", chili: 420.0, rdc: 158.97, perou: 170.17 },
  { date: "2022-03-01", chili: 457.7, rdc: 194.08, perou: 182.17 },
  { date: "2022-02-01", chili: 394.6, rdc: 186.57, perou: 172.34 },
  { date: "2022-01-01", chili: 425.7, rdc: 166.43, perou: 199.26 },
  { date: "2021-12-01", chili: 498.3, rdc: 189.94, perou: 210.11 },
  { date: "2021-11-01", chili: 482.1, rdc: 164.42, perou: 195.12 },
  { date: "2021-10-01", chili: 470.5, rdc: 163.63, perou: 214.62 },
  { date: "2021-09-01", chili: 447.4, rdc: 163.2, perou: 202.68 },
  { date: "2021-08-01", chili: 462.8, rdc: 140.05, perou: 210.92 },
  { date: "2021-07-01", chili: 465.0, rdc: 163.61, perou: 209.08 },
  { date: "2021-06-01", chili: 477.3, rdc: 150.13, perou: 182.71 },
  { date: "2021-05-01", chili: 487.2, rdc: 152.0, perou: 196.26 },
  { date: "2021-04-01", chili: 461.2, rdc: 130.67, perou: 173.16 },
  { date: "2021-03-01", chili: 488.8, rdc: 125.53, perou: 183.04 },
  { date: "2021-02-01", chili: 426.5, rdc: 123.71, perou: 171.59 },
  { date: "2021-01-01", chili: 457.8, rdc: 130.51, perou: 176.74 },
];

const tempo = [...copperData].reverse();

const Copper = () => {
  return (
    <Card
      className="border-none bg-gray-500/10 dark:bg-teal-200/10 flex flex-col max-md:w-full col-span-1"
      x-chunk="charts-01-chunk-1"
    >
      <CardHeader className=" gap-4 space-y-0 pb-2 [&>div]:flex-1">
        <CardTitle>World Top 3 Copper Producer</CardTitle>

        <div className="grid grid-cols-3 w-full gap-2">
          <Badge className="col-span-1 bg-[hsl(var(--chart-1))] text-white">
            Chili
          </Badge>
          <Badge className="col-span-1 bg-[hsl(var(--chart-2))] text-white">
            DRC
          </Badge>
          <Badge className="col-span-1 bg-[hsl(var(--chart-3))] text-white">
            Peru
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 items-center  ">
        <ChartContainer
          config={{
            chili: {
              label: "Chili Copper Curve",
              color: "hsl(var(--chart-1))",
            },
            rdc: {
              label: "DRC Copper Curve",
              color: "hsl(var(--chart-2))",
            },
            perou: {
              label: "Peru Coppoer Curve",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="w-full"
        >
          <LineChart
            accessibilityLayer
            margin={{
              left: 14,
              right: 14,
              top: 10,
            }}
            data={tempo}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="hsl(var(--muted-foreground))"
              strokeOpacity={0.5}
            />
            <YAxis hide domain={["dataMin - 3", "dataMax + 3"]} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <Line
              dataKey="chili"
              type="natural"
              fill="var(--color-chili)"
              stroke="var(--color-chili)"
              strokeWidth={1}
              dot={false}
              activeDot={{
                fill: "var(--color-chili)",
                stroke: "var(--color-chili)",
                r: 4,
              }}
            />
            <Line
              dataKey="rdc"
              type="natural"
              fill="var(--color-rdc)"
              stroke="var(--color-rdc)"
              strokeWidth={1}
              dot={false}
              activeDot={{
                fill: "var(--color-rdc)",
                stroke: "var(--color-rdc)",
                r: 4,
              }}
            />
            <Line
              dataKey="perou"
              type="natural"
              fill="var(--color-perou)"
              stroke="var(--color-perou)"
              strokeWidth={1}
              dot={false}
              activeDot={{
                fill: "var(--color-perou)",
                stroke: "var(--color-perou)",
                r: 4,
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    });
                  }}
                />
              }
              cursor={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default Copper;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2 ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home Page</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {/*         <BreadcrumbItem>
          <BreadcrumbLink href="/zones">Zones</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator /> */}
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

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
import Copper from "./copper";
import Flag from "../flag";
import { Suspense } from "react";

type OverViewProps = {
  country: string;
  overs: any;
  yieldcurve: any;
  fxrs: any;
  bccrates: any;
};

export default function OverView({
  country,
  overs,
  yieldcurve,
  fxrs,
  bccrates,
}: OverViewProps) {
  /*   console.log(
    "xx:",
    overs.data.find((item: any) => item.key.includes("Growth")).value
  );
 */
  const tempo = overs.data.find((item: any) =>
    item.key.includes("Growth")
  ).value;
  const tempoPour = parseFloat(tempo.replace(/,/g, ""));
  // console.log("Pu", tempoPour / 10);

  //console.log("Overs", fxrs.data);
  const tt = [...fxrs.data];
  let newTab = [];
  for (let i = 0; i < tt.length; i++) {
    let tr = {
      ...fxrs.data[i],
      dateOut: new Date(fxrs.data[i].date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      }),
    };
    newTab.push(tr);
  }

  //console.log("tab", newTab);

  const yc = [...yieldcurve.data];
  /*   let newYC = [];
  for (let i = 0; i < yc.length; i++) {
    let tr = {
      date: yc[i].tenor + "Y",
      rdc: yc[i].yield,
      africa: yc[i].yield - i,
      rdcChange: yc[i].change,
      africaChange: yc[i].change,
    };
    newYC.push(tr);
  }
 */
  let newYC = [
    {
      date: "1Y",
      rdc: 8.642,
      africa: 8.776,
      rdcChange: 0.35,
      africaChange: 0.35,
    },
    {
      date: "2Y",
      rdc: 9.258,
      africa: 8.49693,
      rdcChange: 0.06,
      africaChange: 0.35,
    },
    {
      date: "3Y",
      rdc: 9.501,
      africa: 9.2356885,
      rdcChange: 0.34,
      africaChange: 0.35,
    },
    {
      date: "5Y",
      rdc: 9.694,
      africa: 9.7597285,
      rdcChange: -0.33,
      africaChange: 0.35,
    },
    {
      date: "6Y",
      rdc: 9.846,
      africa: 9.8785015,
      rdcChange: -0.69,
      africaChange: 0.35,
    },
    {
      date: "7Y",
      rdc: 9.967,
      africa: 10.239566,
      rdcChange: -0.91,
      africaChange: 0.35,
    },
    {
      date: "8Y",
      rdc: 10.069,
      africa: 10.55757825,
      rdcChange: -0.5,
      africaChange: 0.35,
    },
    {
      date: "9Y",
      rdc: 10.248,
      africa: 10.75172425,
      rdcChange: 0.35,
      africaChange: 0.35,
    },
    {
      date: "10Y",
      rdc: 10.487,
      africa: 10.945569,
      rdcChange: 0.35,
      africaChange: 0.35,
    },
    {
      date: "15Y",
      rdc: 10.793,
      africa: 11.331017,
      rdcChange: 0.35,
      africaChange: 0.35,
    },
    {
      date: "20Y",
      rdc: 10.94,
      africa: 11.594614,
      rdcChange: 0.35,
      africaChange: 0.35,
    },
    {
      date: "25Y",
      rdc: 10.951,
      africa: 11.5869435,
      rdcChange: 0.35,
      africaChange: 0.35,
    },
  ];

  // BCC Int
  const tbcc = [...bccrates.data];
  let newBCC = [];
  for (let i = 0; i < tbcc.length; i++) {
    let tr = {
      ...bccrates.data[i],
      dateOut: new Date(bccrates.data[i].date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      }),
    };
    newBCC.push(tr);
  }
  //console.log("newBCC", newBCC);

  return (
    <GeneralLayout
      title={"General Overview"}
      bred={<CustomBreadcrumb name="General Overview" />}
    >
      <div className="max-md:px-2 max-md:flex max-md:flex-col   md:container gap-2 md:grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 ">
        <Card
          className="bg-green-400 border-none bg-gray-500/10 dark:bg-teal-200/10 max-md:w-full"
          x-chunk="charts-01-chunk-3"
        >
          <CardHeader className="p-4 pb-0">
            <CardTitle className="flex items-center  gap-2 text-sky-600 dark:text-white">
              <div className="overflow-hidden relative  w-10 h-10 rounded-full">
                <Image
                  alt="bcg"
                  src={avatar}
                  placeholder="blur"
                  quality={100}
                  fill
                  sizes="100vw"
                  className="object-cover z-10 rounded-lg"
                />
              </div>
              {country}
            </CardTitle>
            <CardDescription>
              {overs?.data?.map((data: any, index: number) => (
                <span
                  key={index}
                  className="mb-1 flex justify-between items-baseline gap-1 text-3xl font-bold tabular-nums leading-none"
                >
                  <span className="text-sm font-normal text-muted-foreground">
                    {data.key}
                  </span>
                  <span className="text-sm   font-semibold text-black dark:text-white">
                    {data.key.includes("Growth") ||
                    data.key.includes("GDP") ||
                    data.key.includes("Interest") ||
                    data.key.includes("Interbanking Rate")
                      ? parseFloat(data.value.replace(/,/g, "")) / 10 + " %"
                      : data.value}
                  </span>
                </span>
              ))}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-0"></CardContent>
        </Card>
        <Card
          className="md:container border-none bg-gray-500/10 dark:bg-teal-200/10 flex flex-col max-md:w-full col-span-2"
          x-chunk="charts-01-chunk-1"
        >
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
            <div>
              <div className="flex gap-2 items-center">
                <div className="w-2 h-12 bg-orange-600"></div>
                <div className="flex flex-col justify-between">
                  <span className="text-xs font-semibold">DRC Yield Curve</span>
                  <div className="flex justify-between items-end gap-2 ">
                    <span className="text-3xl font-semibold">
                      {newYC[newYC.length - 1].rdc.toFixed(2)}
                    </span>
                    <span
                      className={` ${
                        newYC[newYC.length - 1].rdc <
                        newYC[newYC.length - 2].rdc
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                      {newYC[newYC.length - 1].rdc > newYC[newYC.length - 2].rdc
                        ? "+"
                        : ""}
                      {(
                        ((newYC[newYC.length - 1].rdc -
                          newYC[newYC.length - 2].rdc) *
                          100) /
                        newYC[newYC.length - 2].rdc
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex gap-2 items-center">
                <div className="w-2 h-12 bg-green-600"></div>
                <div className="flex flex-col justify-between">
                  <span className="text-xs font-semibold">
                    AVG Afr. Yield Curve
                  </span>
                  <div className="flex justify-between items-end gap-2 ">
                    <span className="text-3xl font-semibold">
                      {newYC[newYC.length - 1].africa.toFixed(2)}
                    </span>
                    <span
                      className={` ${
                        newYC[newYC.length - 1].africa <
                        newYC[newYC.length - 2].africa
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                      {newYC[newYC.length - 1].africa >
                      newYC[newYC.length - 2].africa
                        ? "+"
                        : ""}
                      {(
                        ((newYC[newYC.length - 1].africa -
                          newYC[newYC.length - 2].africa) *
                          100) /
                        newYC[newYC.length - 2].africa
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 items-center  ">
            <ChartContainer
              config={{
                rdc: {
                  label: "DRC Yield Curve",
                  color: "hsl(var(--chart-3))",
                },
                africa: {
                  label: "AVG African Yield Curve",
                  color: "hsl(var(--chart-2))",
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
                data={newYC}
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
                  dataKey="africa"
                  type="natural"
                  fill="var(--color-africa)"
                  stroke="var(--color-africa)"
                  strokeWidth={1}
                  dot={false}
                  activeDot={{
                    fill: "var(--color-africa)",
                    stroke: "var(--color-africa)",
                    r: 4,
                  }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      indicator="line"
                      labelFormatter={(value) => {
                        return "16-12-2024";
                      }}
                    />
                  }
                  cursor={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card
          className="border-none bg-gray-500/10 dark:bg-teal-200/10"
          x-chunk="charts-01-chunk-3"
        >
          <CardHeader className="p-4 pb-0">
            <CardTitle>Fixed Income Market</CardTitle>
            <CardDescription>Data from last tenor.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row items-baseline gap-4 md:p-4 pt-0 ">
            <ScrollArea className="max-md:w-full h-80">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Tenor</TableHead>
                    <TableHead>Yield</TableHead>
                    <TableHead className="">Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {newYC?.map((yc: any) => (
                    <TableRow key={yc.date}>
                      <TableCell className="font-medium text-xs">
                        {yc.date}Y
                      </TableCell>
                      <TableCell className="text-xs">{yc.rdc}%</TableCell>
                      <TableCell
                        className={`text-right text-xs ${
                          yc.rdcChange < 0
                            ? "text-red-600"
                            : yc.rdcChange == 0
                            ? ""
                            : "text-green-400"
                        }`}
                      >
                        {yc.rdcChange < 0 ? (
                          <div className="flex items-center gap-1">
                            <TbTriangleInvertedFilled />
                            {yc.rdcChange}%
                          </div>
                        ) : yc.rdcChange == 0 ? (
                          <div className="pl-4 flex items-center gap-1">
                            {yc.rdcChange}%
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <TbTriangleFilled />+{yc.rdcChange}%
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        <Copper />

        <Card
          className="md:container border-none bg-gray-500/10 dark:bg-teal-200/10 flex flex-col max-md:w-full col-span-2"
          x-chunk="charts-01-chunk-7"
        >
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
            <div className="flex justify-between items-center text-orange-400">
              {/*               <Badge className="bg-orange-500 text-white">USDCDF</Badge>
               */}
              <div className="flex items-end">
                <div className="rounded-full overflow-hidden">
                  <img
                    src="https://flagcdn.Com/w40/cd.png"
                    alt="Flag"
                    style={{ width: "1.75rem", height: "1.75rem" }}
                  />
                </div>

                <div className="-mx-1 rounded-full overflow-hidden">
                  <img
                    src="https://flagcdn.Com/w40/us.png"
                    alt="Flag"
                    style={{ width: "1.75rem", height: "1.75rem" }}
                  />
                </div>
                <span className="text-white ml-2 text-xl">USD/CDF</span>
              </div>

              <span className="dark:text-white">
                <strong className="text-2xl">
                  {newTab[newTab.length - 1]?.usdcdf?.toFixed(1)}
                </strong>
              </span>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 items-center">
            <ChartContainer
              config={{
                usdcdf: {
                  label: "USDCDF",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="w-full"
            >
              <AreaChart
                accessibilityLayer
                margin={{
                  left: 14,
                  right: 14,
                  top: 10,
                }}
                height={100}
                data={newTab}
              >
                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                  stroke="hsl(var(--muted-foreground))"
                  strokeOpacity={0.5}
                />

                <XAxis
                  dataKey="dateOut"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />

                <YAxis hide domain={["dataMin", "dataMax"]} />

                <defs>
                  <linearGradient id="fillTime" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-usdcdf)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-usdcdf)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="usdcdf"
                  type="linear"
                  fill="url(#fillTime)"
                  stroke="var(--color-usdcdf)"
                  strokeWidth={1}
                  activeDot={{
                    r: 4,
                  }}
                  dot={false}
                  fillOpacity={0.4}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                  formatter={(value) => (
                    <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                      Rate
                      <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                        {value}
                        <span className="font-normal text-muted-foreground">
                          %
                        </span>
                      </div>
                    </div>
                  )}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
        {/*         <Card
          className="border-none bg-gray-500/10 dark:bg-teal-200/10 flex flex-col max-md:w-full"
          x-chunk="charts-01-chunk-7"
        >
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
            <CardTitle>BCC Interest Rates</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-1 items-center">
            <ChartContainer
              config={{
                time: {
                  label: "Rate",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="w-full"
            >
              <AreaChart
                accessibilityLayer
                data={newBCC}
                margin={{
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                }}
              >
                <XAxis
                  dataKey="dateOut"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />

                <defs>
                  <linearGradient id="fillTime" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-time)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-time)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="rate"
                  type="natural"
                  fill="url(#fillTime)"
                  fillOpacity={0.4}
                  stroke="var(--color-time)"
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                  formatter={(value) => (
                    <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                      Rate
                      <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                        {value}
                        <span className="font-normal text-muted-foreground">
                          %
                        </span>
                      </div>
                    </div>
                  )}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card> */}
      </div>
    </GeneralLayout>
  );
}

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

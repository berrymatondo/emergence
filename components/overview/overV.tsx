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
      date: "1",
      rdc: 8.642,
      africa: 8.776,
      rdcChange: 0.35,
      africaChange: 0.35,
    },
    {
      date: "2",
      rdc: 9.258,
      africa: 8.49693,
      rdcChange: 0.35,
      africaChange: 0.35,
    },
    {
      date: "3",
      rdc: 9.501,
      africa: 9.2356885,
      rdcChange: 0.35,
      africaChange: 0.35,
    },
    {
      date: "5",
      rdc: 9.694,
      africa: 9.7597285,
      rdcChange: 0.35,
      africaChange: 0.35,
    },
    {
      date: "6",
      rdc: 9.846,
      africa: 9.8785015,
      rdcChange: 0.35,
      africaChange: 0.35,
    },
    {
      date: "7",
      rdc: 9.967,
      africa: 10.239566,
      rdcChange: 0.35,
      africaChange: 0.35,
    },
    {
      date: "8",
      rdc: 10.069,
      africa: 10.55757825,
      rdcChange: 0.35,
      africaChange: 0.35,
    },
    {
      date: "9",
      rdc: 10.248,
      africa: 10.75172425,
      rdcChange: 0.35,
      africaChange: 0.35,
    },
    {
      date: "10",
      rdc: 10.487,
      africa: 10.945569,
      rdcChange: 0.35,
      africaChange: 0.35,
    },
    {
      date: "15",
      rdc: 10.793,
      africa: 11.331017,
      rdcChange: 0.35,
      africaChange: 0.35,
    },
    {
      date: "20",
      rdc: 10.94,
      africa: 11.594614,
      rdcChange: 0.35,
      africaChange: 0.35,
    },
    {
      date: "25",
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
      <div className="gap-2 grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 ">
        <Card
          className="border-none bg-gray-500/10 dark:bg-teal-200/10 max-md:w-full"
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
              {overs?.data?.map((data: any) => (
                <span
                  key={data.id}
                  className="mb-1 flex justify-between items-baseline gap-1 text-3xl font-bold tabular-nums leading-none"
                >
                  <span className="text-sm font-normal text-muted-foreground">
                    {data.key}
                  </span>
                  <span className="text-sm   font-normal text-black dark:text-white">
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
          <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-0">
            <div className=" text-orange-500 flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
              {tempoPour / 10}%
              <span className="text-sm font-normal text-muted-foreground">
                {"Economic Growth Rate"}
              </span>
            </div>
            <ChartContainer
              config={{
                steps: {
                  label: "Steps",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="ml-auto w-[72px]"
            >
              <BarChart
                accessibilityLayer
                margin={{
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                }}
                data={[
                  {
                    date: "2024-01-01",
                    steps: 2000,
                  },
                  {
                    date: "2024-01-02",
                    steps: 2100,
                  },
                  {
                    date: "2024-01-03",
                    steps: 2200,
                  },
                  {
                    date: "2024-01-04",
                    steps: 1300,
                  },
                  {
                    date: "2024-01-05",
                    steps: 1400,
                  },
                  {
                    date: "2024-01-06",
                    steps: 2500,
                  },
                  {
                    date: "2024-01-07",
                    steps: 1600,
                  },
                ]}
              >
                <Bar
                  dataKey="steps"
                  fill="var(--color-steps)"
                  radius={2}
                  fillOpacity={0.2}
                  activeIndex={6}
                  activeBar={<Rectangle fillOpacity={0.8} />}
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                  hide
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card
          className="p-4 border-none bg-gray-500/10 dark:bg-teal-200/10 flex flex-col max-md:w-full col-span-2"
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
                      {/*                       {newYC[0].africaChange}
                       */}{" "}
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
          <CardContent className="flex flex-1 items-center m-12 ">
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
        <Card
          className="border-none bg-gray-500/10 dark:bg-teal-200/10 max-md:w-full"
          x-chunk="charts-01-chunk-3"
        >
          <CardHeader className="p-4 pb-0">
            <CardTitle>Fixed Income Market</CardTitle>
            <CardDescription>Data from last tenor.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Tenor</TableHead>
                  <TableHead>Yield</TableHead>
                  <TableHead className="">Change</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {yieldcurve?.data?.map((yc: any) => (
                  <TableRow key={yc.id}>
                    <TableCell className="font-medium text-xs">
                      {yc.tenor}Y
                    </TableCell>
                    <TableCell className="text-xs">{yc.yield}%</TableCell>
                    <TableCell
                      className={`text-right text-xs ${
                        yc.change < 0
                          ? "text-red-600"
                          : yc.change == 0
                          ? ""
                          : "text-green-400"
                      }`}
                    >
                      {yc.change < 0 ? (
                        <div className="flex items-center gap-1">
                          <TbTriangleInvertedFilled />
                          {yc.change}%
                        </div>
                      ) : yc.change == 0 ? (
                        <div className="pl-4 flex items-center gap-1">
                          {yc.change}%
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <TbTriangleFilled />+{yc.change}%
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card
          className="border-none bg-gray-500/10 dark:bg-teal-200/10  max-md:w-full"
          x-chunk="charts-01-chunk-5"
        >
          <CardHeader>
            <CardTitle>
              DRC Commodity Production Percentage of World Total{" "}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4 p-4">
            <div className="grid items-center gap-2">
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-sm text-muted-foreground">Cobalt</div>
                <div className="text-blue-400 flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                  60
                  <span className="text-sm font-normal text-muted-foreground">
                    %
                  </span>
                </div>
              </div>
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-sm text-muted-foreground">Copper</div>
                <div className="text-orange-300 flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                  13
                  <span className="text-sm font-normal text-muted-foreground">
                    %
                  </span>
                </div>
              </div>
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-sm text-muted-foreground">Diamond</div>
                <div className="text-teal-300 flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                  18
                  <span className="text-sm font-normal text-muted-foreground">
                    %
                  </span>
                </div>
              </div>
            </div>
            <ChartContainer
              config={{
                cobalt: {
                  label: "Cobalt",
                  color: "hsl(var(--chart-1))",
                },
                copper: {
                  label: "Copper",
                  color: "hsl(var(--chart-2))",
                },
                diamond: {
                  label: "Diamond",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="mx-auto aspect-square w-full max-w-[80%]"
            >
              <RadialBarChart
                margin={{
                  left: -10,
                  right: -10,
                  top: -10,
                  bottom: -10,
                }}
                data={[
                  {
                    activity: "diamond",
                    value: 0.18 * 100,
                    fill: "var(--color-diamond)",
                  },
                  {
                    activity: "copper",
                    value: 0.13 * 100,
                    fill: "var(--color-copper)",
                  },
                  {
                    activity: "cobalt",
                    value: 0.6 * 100,
                    fill: "var(--color-cobalt)",
                  },
                ]}
                innerRadius="20%"
                barSize={24}
                startAngle={90}
                endAngle={450}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  dataKey="value"
                  tick={false}
                />
                <RadialBar dataKey="value" background cornerRadius={5} />
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card
          className="border-none bg-gray-500/10 dark:bg-teal-200/10 flex flex-col max-md:w-full col-span-2"
          x-chunk="charts-01-chunk-7"
        >
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
            <div className="flex justify-between items-center text-orange-400">
              <Badge className="bg-orange-500 text-white">USDCDF</Badge>
              <span className="dark:text-white">
                today:{" "}
                <strong className="text-2xl">
                  {newTab[newTab.length - 1].usdcdf.toFixed(1)}
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
                {/*        <YAxis
                  dataKey="rate"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                /> */}
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
                  /*                   dataKey="usdcdf"
                  type="natural"
                  fill="url(#fillTime)"
                  fillOpacity={0.4}
                  stroke="var(--color-usdcdf)" */

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
        <Card
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
                {/*                 <YAxis
                  dataKey="rate"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                /> */}

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
        </Card>

        {/*         <Card
          className="border-none bg-gray-500/10 dark:bg-teal-200/10 max-md:w-full"
          x-chunk="charts-01-chunk-2"
        >
          <CardHeader>
            <CardTitle>Progress</CardTitle>
            <CardDescription>
              {"You're average more steps a day this year than last year."}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid auto-rows-min gap-2">
              <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                12,453
                <span className="text-sm font-normal text-muted-foreground">
                  steps/day
                </span>
              </div>
              <ChartContainer
                config={{
                  steps: {
                    label: "Steps",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="aspect-auto h-[32px] w-full"
              >
                <BarChart
                  accessibilityLayer
                  layout="vertical"
                  margin={{
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                  }}
                  data={[
                    {
                      date: "2024",
                      steps: 12435,
                    },
                  ]}
                >
                  <Bar
                    dataKey="steps"
                    fill="var(--color-steps)"
                    radius={4}
                    barSize={32}
                  >
                    <LabelList
                      position="insideLeft"
                      dataKey="date"
                      offset={8}
                      fontSize={12}
                      fill="white"
                    />
                  </Bar>
                  <YAxis dataKey="date" type="category" tickCount={1} hide />
                  <XAxis dataKey="steps" type="number" hide />
                </BarChart>
              </ChartContainer>
            </div>
            <div className="grid auto-rows-min gap-2">
              <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                10,103
                <span className="text-sm font-normal text-muted-foreground">
                  steps/day
                </span>
              </div>
              <ChartContainer
                config={{
                  steps: {
                    label: "Steps",
                    color: "hsl(var(--muted))",
                  },
                }}
                className="aspect-auto h-[32px] w-full"
              >
                <BarChart
                  accessibilityLayer
                  layout="vertical"
                  margin={{
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                  }}
                  data={[
                    {
                      date: "2023",
                      steps: 10103,
                    },
                  ]}
                >
                  <Bar
                    dataKey="steps"
                    fill="var(--color-steps)"
                    radius={4}
                    barSize={32}
                  >
                    <LabelList
                      position="insideLeft"
                      dataKey="date"
                      offset={8}
                      fontSize={12}
                      fill="hsl(var(--muted-foreground))"
                    />
                  </Bar>
                  <YAxis dataKey="date" type="category" tickCount={1} hide />
                  <XAxis dataKey="steps" type="number" hide />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        <Card
          className="border-none bg-gray-500/10 dark:bg-teal-200/10  max-md:w-full"
          x-chunk="charts-01-chunk-4"
        >
          <CardContent className="flex gap-4 p-4 pb-2">
            <ChartContainer
              config={{
                cobalt: {
                  label: "Cobalt",
                  color: "hsl(var(--chart-1))",
                },
                copper: {
                  label: "Copper",
                  color: "hsl(var(--chart-2))",
                },
                diamond: {
                  label: "Diamond",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[140px] w-full"
            >
              <BarChart
                margin={{
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 10,
                }}
                data={[
                  {
                    activity: "diamond",
                    value: 0.18 * 100,
                    label: "8/12 hr",
                    fill: "var(--color-diamond)",
                  },
                  {
                    activity: "copper",
                    value: 0.13 * 100,
                    label: "46/60 min",
                    fill: "var(--color-copper)",
                  },
                  {
                    activity: "Cobalt",
                    value: 0.6 * 100,
                    label: "245/360 kcal",
                    fill: "var(--color-cobalt)",
                  },
                ]}
                layout="vertical"
                barSize={32}
                barGap={2}
              >
                <XAxis type="number" dataKey="value" hide />
                <YAxis
                  dataKey="activity"
                  type="category"
                  tickLine={false}
                  tickMargin={4}
                  axisLine={false}
                  className="capitalize"
                />
                <Bar dataKey="value" radius={5}>
                  <LabelList
                    position="insideLeft"
                    dataKey="label"
                    fill="white"
                    offset={8}
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex flex-row border-t p-4">
            <div className="flex w-full items-center gap-2">
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">Cobalt</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  562
                  <span className="text-sm font-normal text-muted-foreground">
                    kcal
                  </span>
                </div>
              </div>
              <Separator orientation="vertical" className="mx-2 h-10 w-px" />
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">Exercise</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  73
                  <span className="text-sm font-normal text-muted-foreground">
                    min
                  </span>
                </div>
              </div>
              <Separator orientation="vertical" className="mx-2 h-10 w-px" />
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">Stand</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  14
                  <span className="text-sm font-normal text-muted-foreground">
                    hr
                  </span>
                </div>
              </div>
            </div>
          </CardFooter>
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

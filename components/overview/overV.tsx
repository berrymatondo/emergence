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
  /*   const tempoPour = parseFloat(tempo.replace(/,/g, ""));
  console.log("Pu", tempoPour);
 */
  return (
    <Card className="border-none max-md:my-4 my-auto w-full m-0">
      <CardHeader>
        <CardTitle className="text-2xl">{"General Overview"}</CardTitle>
        {/*         <CardDescription className=" ">
          {"Vue générale de la RD Congo"}
        </CardDescription> */}
        <CustomBreadcrumb name="General Overview" />
      </CardHeader>
      <CardContent className="grid">
        <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-8 max-sm:p-6 sm:flex-row">
          <div className="grid w-full gap-6 sm:grid-cols-3 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
            <Card className="lg:max-w-md" x-chunk="charts-01-chunk-3">
              <CardHeader className="p-4 pb-0">
                <CardTitle className="text-sky-600 dark:text-yellow-300">
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
                        {data.value}
                      </span>
                    </span>
                  ))}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-0">
                <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
                  {tempo}%
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
              className="flex flex-col lg:max-w-md"
              x-chunk="charts-01-chunk-1"
            >
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
                <div>
                  <CardDescription className="text-orange-400">
                    DRC Yield Curve
                  </CardDescription>
                  {/*                   <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                    62
                    <span className="text-sm font-normal tracking-normal text-muted-foreground">
                      bpm
                    </span>
                  </CardTitle> */}
                </div>
                <div>
                  <CardDescription className="text-green-400">
                    AVG African Yield Curve
                  </CardDescription>
                  {/*                   <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                    35
                    <span className="text-sm font-normal tracking-normal text-muted-foreground">
                      ms
                    </span>
                  </CardTitle> */}
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 items-center">
                <ChartContainer
                  config={{
                    resting: {
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
                    data={[
                      {
                        date: "1Y",
                        resting: 93.7,
                        africa: 79.2,
                      },
                      {
                        date: "2Y",
                        resting: 98.4,
                        africa: 104.4,
                      },
                      {
                        date: "3Y",
                        resting: 89.5,
                        africa: 106.2,
                      },
                      {
                        date: "4Y",
                        resting: 92.2,
                        africa: 111.1,
                      },
                      {
                        date: "5Y",
                        resting: 83,
                        africa: 115.1,
                      },
                      {
                        date: "7Y",
                        resting: 82.6,
                        africa: 119.0,
                      },
                      {
                        date: "8Y",
                        resting: 80.1,
                        africa: 120.6,
                      },
                      {
                        date: "10Y",
                        resting: 103.8,
                        africa: 120.4,
                      },
                      {
                        date: "15Y",
                        resting: 107.1,
                        africa: 129.2,
                      },
                      {
                        date: "20Y",
                        resting: 153.8,
                        africa: 130.7,
                      },
                      {
                        date: "30Y",
                        resting: 152.1,
                        africa: 130.1,
                      },
                    ]}
                  >
                    <CartesianGrid
                      strokeDasharray="4 4"
                      vertical={false}
                      stroke="hsl(var(--muted-foreground))"
                      strokeOpacity={0.5}
                    />
                    <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      /*                       tickFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          weekday: "short",
                        });
                      }} */
                    />
                    <Line
                      dataKey="resting"
                      type="natural"
                      fill="var(--color-resting)"
                      stroke="var(--color-resting)"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{
                        fill: "var(--color-resting)",
                        stroke: "var(--color-resting)",
                        r: 4,
                      }}
                    />
                    <Line
                      dataKey="africa"
                      type="natural"
                      fill="var(--color-africa)"
                      stroke="var(--color-africa)"
                      strokeWidth={2}
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
              className="flex flex-col lg:max-w-md"
              x-chunk="charts-01-chunk-1"
            >
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
                <div>
                  <CardDescription className="flex justify-between items-center text-orange-400">
                    -USDCDF-{" "}
                    <span className="text-white">
                      TODAY:{" "}
                      <strong>
                        {fxrs.data[fxrs.data.length - 1].usdcdf.toFixed(1)}
                      </strong>
                    </span>
                  </CardDescription>
                  {/*                   <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                    62
                    <span className="text-sm font-normal tracking-normal text-muted-foreground">
                      bpm
                    </span>
                  </CardTitle> */}
                </div>
                {/*                 <div>
                  <CardDescription className="text-green-400">
                    -USDEUR-
                  </CardDescription>

                </div> */}
              </CardHeader>
              <CardContent className="flex flex-1 items-center">
                <ChartContainer
                  config={{
                    usdcdf: {
                      label: "USDCDF",
                      color: "hsl(var(--chart-3))",
                    } /* ,
                    usdeur: {
                      label: "USDEUR",
                      color: "hsl(var(--chart-2))",
                    }, */,
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
                    data={fxrs.data}
                    /*                     data={[
                      {
                        date: "1Y",
                        resting: 93.7,
                        africa: 79.2,
                      },
                      {
                        date: "2Y",
                        resting: 98.4,
                        africa: 104.4,
                      },
                      {
                        date: "3Y",
                        resting: 89.5,
                        africa: 106.2,
                      },
                      {
                        date: "4Y",
                        resting: 92.2,
                        africa: 111.1,
                      },
                      {
                        date: "5Y",
                        resting: 83,
                        africa: 115.1,
                      },
                      {
                        date: "7Y",
                        resting: 82.6,
                        africa: 119.0,
                      },
                      {
                        date: "8Y",
                        resting: 80.1,
                        africa: 120.6,
                      },
                      {
                        date: "10Y",
                        resting: 103.8,
                        africa: 120.4,
                      },
                      {
                        date: "15Y",
                        resting: 107.1,
                        africa: 129.2,
                      },
                      {
                        date: "20Y",
                        resting: 153.8,
                        africa: 130.7,
                      },
                      {
                        date: "30Y",
                        resting: 152.1,
                        africa: 130.1,
                      },
                    ]} */
                  >
                    <CartesianGrid
                      strokeDasharray="4 4"
                      vertical={false}
                      stroke="hsl(var(--muted-foreground))"
                      strokeOpacity={0.5}
                    />
                    <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      /*                       tickFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          weekday: "short",
                        });
                      }} */
                    />
                    <Line
                      dataKey="usdcdf"
                      type="natural"
                      fill="var(--color-usdcdf)"
                      stroke="var(--color-usdcdf)"
                      strokeWidth={2}
                      /*                       dot={{
                        fill: "var(--color-usdcdf)",
                      }} */
                      activeDot={{
                        /*                         fill: "var(--color-usdcdf)",
                        stroke: "var(--color-usdcdf)", */
                        r: 4,
                      }}
                    />
                    {/*                       <LabelList
                        position="top"
                        offset={12}
                        className="fill-foreground"
                        fontSize={12}
                      />
                    </Line> */}
                    {/*                     <Line
                      dataKey="usdeur"
                      type="natural"
                      fill="var(--color-usdeur)"
                      stroke="var(--color-usdeur)"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{
                        fill: "var(--color-usdeur)",
                        stroke: "var(--color-usdeur)",
                        r: 4,
                      }}
                    /> */}
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
            {/*             <Card className="lg:max-w-md" x-chunk="charts-01-chunk-0">
              <CardHeader className="space-y-0 pb-2">
                <CardDescription>Today</CardDescription>
                <CardTitle className="text-4xl tabular-nums">
                  12,584{" "}
                  <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                    steps
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    steps: {
                      label: "Steps",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                >
                  <BarChart
                    accessibilityLayer
                    margin={{
                      left: -4,
                      right: -4,
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
                      radius={5}
                      fillOpacity={0.6}
                      activeBar={<Rectangle fillOpacity={0.8} />}
                    />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={4}
                      tickFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          weekday: "short",
                        });
                      }}
                    />
                    <ChartTooltip
                      defaultIndex={2}
                      content={
                        <ChartTooltipContent
                          hideIndicator
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
                    <ReferenceLine
                      y={1200}
                      stroke="hsl(var(--muted-foreground))"
                      strokeDasharray="3 3"
                      strokeWidth={1}
                    >
                      <Label
                        position="insideBottomLeft"
                        value="Average Steps"
                        offset={10}
                        fill="hsl(var(--foreground))"
                      />
                      <Label
                        position="insideTopLeft"
                        value="12,343"
                        className="text-lg"
                        fill="hsl(var(--foreground))"
                        offset={10}
                        startOffset={100}
                      />
                    </ReferenceLine>
                  </BarChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col items-start gap-1">
                <CardDescription>
                  Over the past 7 days, you have walked{" "}
                  <span className="font-medium text-foreground">53,305</span>{" "}
                  steps.
                </CardDescription>
                <CardDescription>
                  You need{" "}
                  <span className="font-medium text-foreground">12,584</span>{" "}
                  more steps to reach your goal.
                </CardDescription>
              </CardFooter>
            </Card> */}
          </div>
          <div className="grid w-full flex-1 gap-6 lg:max-w-[20rem]">
            <Card className="max-w-xs" x-chunk="charts-01-chunk-3">
              <CardHeader className="p-4 pb-0">
                <CardTitle>Fixed Income Market</CardTitle>
                <CardDescription>Data from last tenor.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-0">
                <Table>
                  <TableCaption>A list last recent tenor values .</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Tenor</TableHead>
                      <TableHead>Yield</TableHead>
                      <TableHead className="text-right">Change</TableHead>
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
                            yc.change < 0 ? "text-red-600" : ""
                          }`}
                        >
                          {yc.change}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {/*                <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
                  12.5
                  <span className="text-sm font-normal text-muted-foreground">
                    miles/day
                  </span>
                </div> */}
                {/*                 <ChartContainer
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
                </ChartContainer> */}
              </CardContent>
            </Card>
            <Card className="max-w-xs" x-chunk="charts-01-chunk-2">
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
                      <YAxis
                        dataKey="date"
                        type="category"
                        tickCount={1}
                        hide
                      />
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
                      <YAxis
                        dataKey="date"
                        type="category"
                        tickCount={1}
                        hide
                      />
                      <XAxis dataKey="steps" type="number" hide />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
            {/*             <Card className="max-w-xs" x-chunk="charts-01-chunk-3">
              <CardHeader className="p-4 pb-0">
                <CardTitle>Walking Distance</CardTitle>
                <CardDescription>
                  Over the last 7 days, your distance walked and run was 12.5
                  miles per day.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-0">
                <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
                  12.5
                  <span className="text-sm font-normal text-muted-foreground">
                    miles/day
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
            </Card> */}
            <Card className="max-w-xs" x-chunk="charts-01-chunk-4">
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
                  <Separator
                    orientation="vertical"
                    className="mx-2 h-10 w-px"
                  />
                  <div className="grid flex-1 auto-rows-min gap-0.5">
                    <div className="text-xs text-muted-foreground">
                      Exercise
                    </div>
                    <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                      73
                      <span className="text-sm font-normal text-muted-foreground">
                        min
                      </span>
                    </div>
                  </div>
                  <Separator
                    orientation="vertical"
                    className="mx-2 h-10 w-px"
                  />
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
            </Card>
          </div>
          <div className="grid w-full flex-1 gap-6">
            <Card className="max-w-xs" x-chunk="charts-01-chunk-5">
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
            <Card className="max-w-xs" x-chunk="charts-01-chunk-7">
              <CardHeader className="p-4">
                <CardTitle>BCC Interest Rates</CardTitle>
                {/*                <CardDescription>
                  {
                    "You're burning an average of 754 calories per day. Good job!"
                  }
                </CardDescription> */}
              </CardHeader>
              <CardContent className="p-0">
                <ChartContainer
                  config={{
                    time: {
                      label: "Rate",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <AreaChart
                    accessibilityLayer
                    data={bccrates.data}
                    /*                     data={[
                      {
                        date: "2024-01-01",
                        time: 8.5,
                      },
                      {
                        date: "2024-01-02",
                        time: 7.2,
                      },
                      {
                        date: "2024-01-03",
                        time: 8.1,
                      },
                      {
                        date: "2024-01-04",
                        time: 6.2,
                      },
                      {
                        date: "2024-01-05",
                        time: 5.2,
                      },
                      {
                        date: "2024-01-06",
                        time: 8.1,
                      },
                      {
                        date: "2024-01-07",
                        time: 7.0,
                      },
                    ]} */
                    margin={{
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                    }}
                  >
                    {/*                     <XAxis dataKey="date" hide />
                     */}{" "}
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <YAxis
                      dataKey="rate"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={4}
                    />
                    {/*                     <YAxis domain={["dataMin - 5", "dataMax + 2"]} hide />
                     */}{" "}
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
            {/*             <Card className="max-w-xs" x-chunk="charts-01-chunk-6">
              <CardHeader className="p-4 pb-0">
                <CardTitle>Active Energy</CardTitle>
                <CardDescription>
                  {
                    "You're burning an average of 754 calories per day. Good job!"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-2">
                <div className="flex items-baseline gap-2 text-3xl font-bold tabular-nums leading-none">
                  1,254
                  <span className="text-sm font-normal text-muted-foreground">
                    kcal/day
                  </span>
                </div>
                <ChartContainer
                  config={{
                    calories: {
                      label: "Calories",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="ml-auto w-[64px]"
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
                        calories: 354,
                      },
                      {
                        date: "2024-01-02",
                        calories: 514,
                      },
                      {
                        date: "2024-01-03",
                        calories: 345,
                      },
                      {
                        date: "2024-01-04",
                        calories: 734,
                      },
                      {
                        date: "2024-01-05",
                        calories: 645,
                      },
                      {
                        date: "2024-01-06",
                        calories: 456,
                      },
                      {
                        date: "2024-01-07",
                        calories: 345,
                      },
                    ]}
                  >
                    <Bar
                      dataKey="calories"
                      fill="var(--color-calories)"
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
            </Card> */}
          </div>
        </div>
      </CardContent>
      {/*           <CardFooter>
            <Button className="w-full">Se Connecter</Button>
          </CardFooter> */}
    </Card>
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

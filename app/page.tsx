"use client";
import Link from "next/link";
import React from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
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
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { GiSuspensionBridge } from "react-icons/gi";

const HomePage = () => {
  return (
    /*     <div className="flex min-h-screen flex-col items-center justify-between p-24">
     */
    <div className="relative h-full  w-full md:container flex max-md:flex-col justify-start items-center my-auto max-md:gap-8">
      <div className=" md:container md:py-24 max-md:pt-10 flex flex-col gap-4 justify-center md:my-auto  dark:bg-transparent">
        <div className="flex justify-center text-teal-700 text-xl font-bold">
          <strong className="text-9xl max-md:text-7xl">E</strong>
          <div className="leading-10 flex flex-col items-start justify-center">
            <span className="pt-1 text-6xl max-md:text-2xl">merging</span>
            <span className="text-4xl max-md:text-xl md:py-4">
              <strong>M</strong>arkets
            </span>
          </div>
        </div>
        <p className="text-sm max-md:text-xs text-center text-yellow-400">
          {"Boosting your activity on the financial markets"}
        </p>

        <p className="text-center my-4">
          <Link
            href="/auth/login"
            className="text-white py-4 px-20 max-md:px-4 max-md:py-2 font-semibold bg-gradient-to-r from-purple-600 to-orange-600 rounded-full"
          >
            Login
          </Link>
        </p>
        <p className="text-center">
          <span className="text-xs">{"No account yet ?"}</span>
          <Link href="/auth/register" className="px-2 underline">
            {"Sign up here"}
          </Link>
        </p>
      </div>

      <div className=" w-full max-md:p-2">
        <Conte />
      </div>

      {/*       <div className="max-md:hidden opacity-80 absolute flex justify-center items-center left-1/2 bottom-0 w-1/3  rounded-bl-full">
        <Card
          className="bg-transparent/20 flex flex-col w-3/4 border-none -translate-x-40"
          x-chunk="charts-01-chunk-1"
        >
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
            <div>
              <CardDescription className="text-orange-400">
                DRC Yield Curve
              </CardDescription>
            </div>
            <div>
              <CardDescription className="text-green-400">
                AVG African Yield Curve
              </CardDescription>
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
                  content={<ChartTooltipContent indicator="line" />}
                  cursor={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div> */}

      {/*       <GiSuspensionBridge
        className="max-md:hidden  text-sky-700 dark:text-sky-500"
        size={80}
      />

      <TrendingUp className="h-4 w-4 max-md:h-36 max-md:w-36 max-md:opacity-20" />
      <p className="text-xs md:hidden">
        {" "}
        {"          Connecting You To Tomorrow’s Market Leaders"}
      </p> */}
    </div>
  );
};

export default HomePage;

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

/* const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig */

const Conte = () => {
  return (
    <Card className="border-none bg-gray-100 dark:bg-transparent">
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-center gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
};

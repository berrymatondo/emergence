"use client";
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
import { TrendingUp } from "lucide-react";
import React from "react";
import { GiSuspensionBridge } from "react-icons/gi";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Rectangle,
  XAxis,
  YAxis,
} from "recharts";

import { ChartConfig } from "@/components/ui/chart";
import Link from "next/link";
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
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const HomePage = () => {
  return (
    <div className="md:p-12  h-full w-full rounded-2xl relative  ">
      <div className="max-md:px-2 md:w-full md:absolute md:flex md:flex-col md:ml-4 ">
        <div
          className={`hover:cursor-pointer flex items-start gap-2 overflow-hidden transition-all`}
        >
          <GiSuspensionBridge size={40} className="text-sky-600" />{" "}
          <div className=" flex text-teal-700 text-xl font-semibold">
            <strong className="text-4xl">E</strong>
            <div className="leading-4 flex flex-col items-start justify-center">
              <span className="pt-1">merging</span>
              <span className="text-sm">
                <strong>M</strong>arkets
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-md:pt-10 md:absolute md:right-0 flex flex-col md:ml-4 z-10 ">
        <p className="text-center my-4">
          <Link
            href="/auth/login"
            className="text-white py-4 px-8 max-md:px-4 max-md:py-2 font-semibold bg-gradient-to-r from-purple-600 to-orange-600 rounded-full"
          >
            Se Connecter
          </Link>
        </p>
        <p className="text-center">
          <span className="text-xs">{"Vous n'avez pas de compte ?"}</span>
          <Link href="/auth/register" className="px-2 underline">
            {"S'inscrire"}
          </Link>
        </p>
      </div>
      <div className=" max-md:absolute max-md:top-0 max-md:-z-10 flex flex-col justify-center max-md:justify-end items-center h-full gap-8  rounded-tr-full  bg-gradient-to-br from-card to-sky-400/30">
        <Card
          className=" bg-transparent border-none"
          x-chunk="charts-01-chunk-6"
        >
          <CardHeader className="p-4 pb-0 relative">
            <CardTitle className="text-6xl">Emerging Markets</CardTitle>
            <CardDescription className="container text-lg py-8 text-yellow-400">
              {"Boosting DRC's activity on the financial markets"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center  md:px-28  ">
            <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
              6.1%
              <span className="text-sm font-normal text-muted-foreground">
                Economic Growth Rate
              </span>
              <strong>
                <TrendingUp className="h-8 w-8" />
              </strong>
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
        <div className="max-md:py-4 flex max-md:flex-col justify-center max-md:justify-end items-center w-full gap-12 ">
          <Card
            className="bg-transparent/20 flex flex-col border-none "
            x-chunk="charts-01-chunk-1"
          >
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
              <div>
                <CardDescription className="text-orange-400">
                  DRC Yield Cur{" "}
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

          {/*        <Card className=" bg-transparent/20 flex flex-col border-none">
            <CardHeader></CardHeader>
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
                  <Bar
                    dataKey="desktop"
                    fill="var(--color-desktop)"
                    radius={4}
                  />
                  <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
            </CardFooter>
          </Card> */}
        </div>
      </div>

      {/*       <div className="absolute top-0 left-0 -z-10 h-full w-full flex justify-center items-center">
        <TrendingUp className="h-full w-1/2 opacity-5" />
      </div> */}
    </div>
  );
};

export default HomePage;

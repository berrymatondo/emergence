"use client";
import Link from "next/link";

export default function Home() {
  return (
    /*     <div className="flex min-h-screen flex-col items-center justify-between p-24">
     */
    <div className="w-full md:container flex max-md:flex-col justify-between items-center my-auto">
      <div className="container py-24 max-md:py-4 flex flex-col gap-4 justify-center my-auto bg-gray-100 dark:bg-transparent">
        <div className="flex justify-center text-teal-700 text-xl font-bold">
          <strong className="text-9xl max-md:text-7xl">E</strong>
          <div className="leading-10 flex flex-col items-start justify-center">
            <span className="pt-1 text-6xl max-md:text-2xl">merging</span>
            <span className="text-4xl max-md:text-xl md:py-4">
              <strong>M</strong>arkets
            </span>
          </div>
        </div>
        <p className="text-sm max-md:text-xs text-center">
          Connecting You To Tomorrow’s Market Leaders
        </p>

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
      <div className="w-full max-md:p-2">
        <ComponentChart />
      </div>
    </div>
  );
}

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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

export function ComponentChart() {
  return (
    <div className="">
      <Card className="">
        {/*       <CardHeader>
        <CardTitle>Bar Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader> */}
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
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          {/*         <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div> */}
        </CardFooter>
      </Card>
    </div>
  );
}

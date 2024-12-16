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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import rdc from "../public/rdc5.jpg";

const HomePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  //console.log("Session", session);

  /*  if (session?.user) router.push("/overview"); */

  return (
    /*     <div className="flex min-h-screen flex-col items-center justify-between p-24">
     */
    <div className="">
      <div className=" relative min-h-full  w-full flex max-md:flex-col justify-start items-center my-auto max-md:gap-8">
        <div className=" md:container md:py-24 max-md:pt-10 flex flex-col gap-4 justify-center md:my-auto  dark:bg-transparent">
          {/*         <div className="flex justify-center text-teal-700 text-xl font-bold">
  
          <div className="leading-10 flex flex-col items-start justify-center">
            <span className="pt-1 text-8xl max-md:text-4xl">Emergence</span>

          </div>
        </div> */}
          <p className="md:hidden container text-4xl max-md:text-sm text-center mt-48 ">
            {/*  {"xxBoosting your activity on the financial markets"} */}
            <span className="text-5xl bg-gradient-to-r from-sky-300 to-teal-300 bg-clip-text text-transparent ">
              Unleash
            </span>{" "}
            <span className="text-xl">
              <strong className="font-semibold text-7xl">{"Congo's"}</strong>{" "}
              Full Commodity Potential to{" "}
            </span>
            <span className="bg-gradient-to-r from-sky-300 to-teal-300 bg-clip-text text-transparent text-5xl">
              Break into
              <br />
            </span>{" "}
            <span className="text-4xl">Financial Markets</span>.
          </p>

          <div className=" max-md:hidden pt-24">
            <p className="text-4xl max-md:text-sm text-start ">
              {/*  {"xxBoosting your activity on the financial markets"} */}
              <span className="text-7xl bg-gradient-to-r from-sky-300 to-teal-300 bg-clip-text text-transparent ">
                Unleash
              </span>{" "}
              <strong className="font-semibold text-8xl">{"Congo's"}</strong>{" "}
              <br />
              Full Commodity Potential <br /> to{" "}
              <span className="bg-gradient-to-r from-sky-300 to-teal-300 bg-clip-text text-transparent text-7xl">
                Break into <br />{" "}
              </span>{" "}
              <span className="text-6xl">Financial Markets.</span>
            </p>
            {!session?.user && (
              <p className="text-start my-16">
                <Link
                  href="/auth/login"
                  className="text-white py-4 px-32 max-md:w-full max-md:py-2 font-semibold bg-gradient-to-r from-purple-600 to-orange-600 rounded-full"
                >
                  Login
                </Link>
              </p>
            )}
          </div>

          {!session?.user && (
            <p className="md:hidden text-center mt-8">
              <Link
                href="/auth/login"
                className="text-white py-4 px-32 max-md:w-full max-md:py-2 font-semibold bg-gradient-to-r from-purple-600 to-orange-600 rounded-full"
              >
                Login
              </Link>
            </p>
          )}
          {!session?.user && (
            <p className="text-center">
              <span className="text-xs">{"No account yet ?"}</span>
              <Link href="/auth/register" className="px-2 underline">
                {"Sign up here"}
              </Link>
            </p>
          )}
        </div>
      </div>
      <Image alt="bg" src={rdc} fill quality={100} className=" -z-50 " />
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

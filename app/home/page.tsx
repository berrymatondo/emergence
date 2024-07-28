"use client";
import {
  Card,
  CardContent,
  CardDescription,
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

const HomePage = () => {
  return (
    <div className="m-2 bg-white/5 h-full w-full rounded-2xl overflow-hidden relative">
      <div className="absolute flex flex-col ml-4 ">
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

      <div className="flex justify-center items-center w-3/5 h-full rounded-tr-full translate-y-20  bg-gradient-to-br from-card to-sky-400/30">
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
          <CardContent className="flex justify-center  px-28 ">
            <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
              0.061
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
      </div>
      <div className="absolute flex justify-center items-center right-0 top-0 w-3/4 h-full translate-x-60 rounded-bl-full bg-gradient-to-bl from-purple-600/20 to-transparent">
        <Card
          className="bg-transparent/20 flex flex-col w-3/4 border-none -translate-x-40"
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
                  content={<ChartTooltipContent indicator="line" />}
                  cursor={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;

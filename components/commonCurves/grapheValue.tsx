import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

type GrapheValueProps = {
  disc: any;
};
const GrapheValue = ({ disc }: GrapheValueProps) => {
  return (
    <div>
      <p className="font-semibold px-2 pt-2 max-md:mt-4">Discount Curve</p>
      <Card
        className="border-none bg-gray-500/10 dark:bg-teal-200/10 flex flex-col max-md:w-full"
        x-chunk="charts-01-chunk-7"
      >
        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
          <div className="flex justify-between items-center text-orange-400"></div>
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
              data={disc}
            >
              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="hsl(var(--muted-foreground))"
                strokeOpacity={0.5}
              />

              <XAxis
                dataKey="tenor"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                label={{
                  value: "Tenor",
                  angle: 0,
                  position: "insideTop",
                }}
              />

              <YAxis
                dataKey="rate"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                label={{
                  value: "Rate(%)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />

              {/*                   <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
               */}
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
                dataKey="rate"
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
    </div>
  );
};

export default GrapheValue;

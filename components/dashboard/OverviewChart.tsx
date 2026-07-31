"use client";

import { useMemo, useState } from "react";
import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const data = [
  { month: "Jan", Revenue: 18000, Orders: 12000, Profit: 8000 },
  { month: "Feb", Revenue: 22000, Orders: 15000, Profit: 10000 },
  { month: "Mar", Revenue: 19500, Orders: 13500, Profit: 9200 },
  { month: "Apr", Revenue: 27500, Orders: 18500, Profit: 12800 },
  { month: "May", Revenue: 32000, Orders: 21000, Profit: 15500 },
  { month: "Jun", Revenue: 29800, Orders: 19800, Profit: 14200 },
  { month: "Jul", Revenue: 36500, Orders: 24000, Profit: 17800 },
  { month: "Aug", Revenue: 41200, Orders: 27500, Profit: 20100 },
  { month: "Sep", Revenue: 38700, Orders: 25800, Profit: 18900 },
  { month: "Oct", Revenue: 45800, Orders: 30200, Profit: 22400 },
  { month: "Nov", Revenue: 49500, Orders: 32800, Profit: 24200 },
  { month: "Dec", Revenue: 54800, Orders: 36500, Profit: 27100 },
];

const tabs = ["Revenue", "Orders", "Profit"] as const;

type Tab = (typeof tabs)[number];

export function OverviewChart() {
  const [active, setActive] = useState<Tab>("Revenue");

  const latestValue = useMemo(() => {
    return data[data.length - 1][active];
  }, [active]);

  return (
    <Card className="border shadow-sm">
      <CardHeader className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <CardTitle className="text-lg">
            Business Overview
          </CardTitle>

          <CardDescription>
            Performance over the last 12 months
          </CardDescription>

          <div className="mt-6">
            <p className="text-sm text-muted-foreground">
              Total {active}
            </p>

            <h2 className="mt-1 text-4xl font-bold tracking-tight">
              ${latestValue.toLocaleString()}
            </h2>

            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                <TrendingUp className="mr-1 h-3 w-3" />
                +18.2%
              </span>

              <span className="text-xs text-muted-foreground">
                Compared with last year
              </span>
            </div>
          </div>
        </div>

        <Tabs
          value={active}
          onValueChange={(value) => setActive(value as Tab)}
        >
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent>
        <div className="h-105 w-full">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart
              data={data}
              margin={{
                top: 20,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="overview-gradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0.45}
                  />

                  <stop
                    offset="70%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0.12}
                  />

                  <stop
                    offset="100%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                strokeDasharray="4 4"
                opacity={0.3}
              />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                fontSize={12}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                width={55}
                fontSize={12}
                tickFormatter={(value) => `$${value / 1000}k`}
              />

              <Tooltip
                cursor={{
                  stroke: "hsl(var(--border))",
                  strokeDasharray: "4 4",
                }}
                formatter={(value) => [
                  `$${Number(value).toLocaleString()}`,
                  active,
                ]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--background))",
                  boxShadow:
                    "0 10px 30px rgba(0,0,0,.08)",
                }}
              />

              <Area
                type="natural"
                dataKey={active}
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                fill="url(#overview-gradient)"
                dot={false}
                activeDot={{
                  r: 6,
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>

      <CardFooter className="border-t text-xs text-muted-foreground">
        Updated 2 minutes ago
      </CardFooter>
    </Card>
  );
}
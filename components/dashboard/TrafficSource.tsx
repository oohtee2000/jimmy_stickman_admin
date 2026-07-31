"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type TrafficSource = {
  name: string;
  value: number;
  color: string;
};

const data: TrafficSource[] = [
  {
    name: "Direct",
    value: 35,
    color: "hsl(var(--chart-1))",
  },
  {
    name: "Organic",
    value: 28,
    color: "hsl(var(--chart-2))",
  },
  {
    name: "Referral",
    value: 22,
    color: "hsl(var(--chart-3))",
  },
  {
    name: "Social",
    value: 15,
    color: "hsl(var(--chart-4))",
  },
];

export function TrafficSources() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle>Traffic Sources</CardTitle>

        <CardDescription>
          Where your visitors come from
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Donut Chart */}
        <div className="relative mx-auto h-56 w-full max-w-60">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={65}
                outerRadius={90}
                paddingAngle={3}
                stroke="none"
              >
                {data.map((item) => (
                  <Cell
                    key={item.name}
                    fill={item.color}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-3xl font-bold tracking-tight">
              284K
            </p>

            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Visits
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-4">
          {data.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />

                <span className="text-sm font-medium">
                  {item.name}
                </span>
              </div>

              <span className="text-sm font-semibold">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
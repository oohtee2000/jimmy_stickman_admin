"use client";

import { LucideIcon, DollarSign, Users, ShoppingBag, Eye, TrendingUp, TrendingDown } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

import { Card } from "@/components/ui/card";

type KPI = {
  label: string;
  value: string;
  delta: number;
  icon: LucideIcon;
  tint: string;
  color: string;
  data: { v: number }[];
};

const spark = (seed: number[]) => seed.map((v) => ({ v }));

const kpis: KPI[] = [
  {
    label: "Total Revenue",
    value: "$48,295",
    delta: 12.5,
    icon: DollarSign,
    tint: "bg-emerald-50 text-emerald-600",
    color: "hsl(var(--chart-1))",
    data: spark([12, 18, 14, 22, 20, 28, 26, 34, 32, 40, 44, 52]),
  },
  {
    label: "Active Users",
    value: "2,847",
    delta: 8.2,
    icon: Users,
    tint: "bg-sky-50 text-sky-600",
    color: "hsl(var(--chart-2))",
    data: spark([20, 24, 22, 28, 26, 32, 30, 34, 32, 38, 36, 42]),
  },
  {
    label: "Total Orders",
    value: "1,432",
    delta: -3.1,
    icon: ShoppingBag,
    tint: "bg-rose-50 text-rose-600",
    color: "hsl(var(--chart-5))",
    data: spark([40, 38, 42, 36, 34, 38, 32, 30, 34, 28, 30, 26]),
  },
  {
    label: "Page Views",
    value: "284K",
    delta: 24.7,
    icon: Eye,
    tint: "bg-amber-50 text-amber-600",
    color: "hsl(var(--chart-4))",
    data: spark([10, 14, 12, 18, 22, 20, 28, 32, 30, 38, 42, 48]),
  },
];

export function KpiCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        const isPositive = kpi.delta >= 0;
        const gradientId = `gradient-${kpi.label.replace(/\s+/g, "")}`;

        return (
          <Card
            key={kpi.label}
            className="flex flex-col gap-3 p-5"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  {kpi.label}
                </p>

                <h3 className="mt-1 text-2xl font-bold tracking-tight">
                  {kpi.value}
                </h3>
              </div>

              <div
                className={`grid h-10 w-10 place-items-center rounded-lg ${kpi.tint}`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-end justify-between gap-3">
              <div
                className={`flex items-center gap-1 text-xs font-semibold ${
                  isPositive ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}

                {isPositive && "+"}
                {kpi.delta}%

                <span className="ml-1 font-normal text-muted-foreground">
                  vs last month
                </span>
              </div>

              <div className="h-10 w-24">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <AreaChart data={kpi.data}>
                    <defs>
                      <linearGradient
                        id={gradientId}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor={kpi.color}
                          stopOpacity={0.3}
                        />

                        <stop
                          offset="100%"
                          stopColor={kpi.color}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke={kpi.color}
                      strokeWidth={2}
                      fill={`url(#${gradientId})`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
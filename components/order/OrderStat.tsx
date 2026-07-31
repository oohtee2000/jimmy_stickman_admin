import { Minus, TrendingDown } from "lucide-react";

type Trend = "down" | "up" | "flat" | "neg";

const stats = [
  {
    label: "Total Orders",
    value: "2,40,120",
    sub: "Total Orders last 365 days",
    trend: "neg",
  },
  {
    label: "New Orders",
    value: "1,70,190",
    sub: "New Orders last 365 days",
    trend: "flat",
  },
  {
    label: "Completed Orders",
    value: "1,40,530",
    sub: "Completed Orders last 365 days",
    trend: "neg",
  },
  {
    label: "Cancelled Orders",
    value: "99,349",
    sub: "Cancelled Orders last 365 days",
    trend: "down",
  },
] as const satisfies ReadonlyArray<{
  label: string;
  value: string;
  sub: string;
  trend: Trend;
}>;

export default function OrdersStats() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const trendIcon =
          stat.trend === "down" ? (
            <TrendingDown className="h-4 w-4 text-rose-500" />
          ) : stat.trend === "neg" ? (
            <Minus className="h-4 w-4 text-rose-500" />
          ) : (
            <Minus className="h-4 w-4 text-amber-500" />
          );

        return (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>{stat.label}</span>
              {trendIcon}
            </div>

            <div className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              {stat.value}
            </div>

            <div className="mt-1 text-xs text-slate-400">
              {stat.sub}
            </div>
          </div>
        );
      })}
    </div>
  );
}
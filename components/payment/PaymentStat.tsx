// components/payment/PaymentStats.tsx

import { ArrowUpRight, Minus, TrendingDown } from "lucide-react";

type Trend = "up" | "down" | "flat" | "neg";

const stats = [
  {
    label: "Total Revenue",
    value: "$1,842,560",
    sub: "Revenue generated in the last 365 days",
    trend: "up",
  },
  {
    label: "Successful Payments",
    value: "18,542",
    sub: "Payments completed successfully",
    trend: "up",
  },
  {
    label: "Pending Payments",
    value: "284",
    sub: "Awaiting customer payment",
    trend: "flat",
  },
  {
    label: "Refunded Payments",
    value: "$42,810",
    sub: "Refunds issued in the last 365 days",
    trend: "down",
  },
] as const satisfies ReadonlyArray<{
  label: string;
  value: string;
  sub: string;
  trend: Trend;
}>;

export default function PaymentStats() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const trendIcons = {
  up: <ArrowUpRight className="h-4 w-4 text-emerald-500" />,
  down: <TrendingDown className="h-4 w-4 text-rose-500" />,
  neg: <Minus className="h-4 w-4 text-rose-500" />,
  flat: <Minus className="h-4 w-4 text-amber-500" />,
} satisfies Record<Trend, React.ReactNode>;
        return (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center gap-2 text-sm text-slate-500">
  <span>{stat.label}</span>
  {trendIcons[stat.trend]}
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
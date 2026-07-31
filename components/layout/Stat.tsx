import { Minus, TrendingDown, TrendingUp } from "lucide-react";

export type Trend = "down" | "up" | "flat" | "neg";

export interface StatItem {
  label: string;
  value: string;
  sub: string;
  trend: Trend;
}

interface StatProps {
  stats: StatItem[];
}

export default function Stat({ stats }: StatProps) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const trendIcon =
          stat.trend === "down" ? (
            <TrendingDown className="h-4 w-4 text-rose-500" />
          ) : stat.trend === "up" ? (
            <TrendingUp className="h-4 w-4 text-emerald-500" />
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
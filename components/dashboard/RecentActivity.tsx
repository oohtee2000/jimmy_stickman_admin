"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  ShoppingCart,
  AlertTriangle,
  UserPlus,
  CreditCard,
  Star,
  LucideIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

type Activity = {
  title: string;
  description: string;
  time: string;
  icon: LucideIcon;
  color: string;
  bg: string;
};

const activities: Activity[] = [
  {
    title: "New order placed",
    description: "#ORD-9122 by James Wilson",
    time: "2 min ago",
    icon: ShoppingCart,
    color: "text-emerald-600",
    bg: "bg-emerald-100 dark:bg-emerald-500/15",
  },
  {
    title: "Low stock alert",
    description: "MacBook Pro M3 · 3 units left",
    time: "24 min ago",
    icon: AlertTriangle,
    color: "text-amber-600",
    bg: "bg-amber-100 dark:bg-amber-500/15",
  },
  {
    title: "New customer signed up",
    description: "Ava Chen from Singapore",
    time: "1 hour ago",
    icon: UserPlus,
    color: "text-sky-600",
    bg: "bg-sky-100 dark:bg-sky-500/15",
  },
  {
    title: "Payment received",
    description: "$1,204.50 from Sarah Miller",
    time: "3 hours ago",
    icon: CreditCard,
    color: "text-violet-600",
    bg: "bg-violet-100 dark:bg-violet-500/15",
  },
  {
    title: "New 5-Star Review",
    description: "Smart Watch Pro",
    time: "5 hours ago",
    icon: Star,
    color: "text-rose-600",
    bg: "bg-rose-100 dark:bg-rose-500/15",
  },
];

export function RecentActivity() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Activity</CardTitle>

          <CardDescription>
            Latest events from your store
          </CardDescription>
        </div>

        <Link
  href="/activity"
  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
>
  View all
  <ArrowUpRight className="h-4 w-4" />
</Link>
      </CardHeader>

      <CardContent>
        <div className="space-y-5">
          {activities.map((activity) => {
            const Icon = activity.icon;

            return (
              <div
                key={activity.title}
                className="flex items-start gap-4"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${activity.bg}`}
                >
                  <Icon className={`h-5 w-5 ${activity.color}`} />
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-sm font-semibold">
                    {activity.title}
                  </h4>

                  <p className="truncate text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                </div>

                <span className="whitespace-nowrap text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
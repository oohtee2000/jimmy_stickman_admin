"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type Goal = {
  label: string;
  progress: number;
  current: string;
  target: string;
};

const goals: Goal[] = [
  {
    label: "Monthly Revenue",
    progress: 88,
    current: "$48,295",
    target: "$55,000",
  },
  {
    label: "New Customers",
    progress: 85,
    current: "847",
    target: "1,000",
  },
  {
    label: "Conversion Rate",
    progress: 76,
    current: "3.8%",
    target: "5%",
  },
];

export function MonthlyGoals() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle>Monthly Goals</CardTitle>

        <CardDescription>
          Track progress toward your monthly targets.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {goals.map((goal) => (
          <div key={goal.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">
                {goal.label}
              </h4>

              <span className="text-sm font-semibold text-primary">
                {goal.progress}%
              </span>
            </div>

            <Progress
              value={goal.progress}
              className="h-2"
            />

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{goal.current}</span>

              <span>Target: {goal.target}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
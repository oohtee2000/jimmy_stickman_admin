import { KpiCards } from "@/components/dashboard/KpiCards";
import { OverviewChart } from "@/components/dashboard/OverviewChart";
import { MonthlyGoals } from "@/components/dashboard/MonthlyGoals";
import { TrafficSources } from "@/components/dashboard/TrafficSource";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <KpiCards />

      <OverviewChart />

      <TrafficSources/>

      <MonthlyGoals/>

      <RecentActivity/>
    </div>
  );
}
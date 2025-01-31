import { Skeleton } from "@/components/ui/skeleton";
import ExecutionStatusChart from "@/features/analytics/components/execution-status-chart";
import PeriodSelector from "@/features/analytics/components/period-selector";
import StatsCard from "@/features/analytics/components/stats-card";
import { Period } from "@/features/analytics/types";
import CreditsUsageChart from "@/features/billing/components/credits-usage-chart";
import { GetCreditUsageInPeriod } from "@/server/analytics/actions/get-credit-usage-in-period";
import { GetPeriods } from "@/server/analytics/actions/get-periods";
import { GetStatsCardsValues } from "@/server/analytics/actions/get-stats-cards-values";
import { GetWorkflowExecutionStats } from "@/server/analytics/actions/get-workflow-execution-stats";
import { CirclePlayIcon, CoinsIcon, WaypointsIcon } from "lucide-react";
import React, { Suspense } from "react";

const HomePage = ({
  searchParams,
}: {
  searchParams: { month?: string; year?: string };
}) => {
  const currentDate = new Date();
  const { month, year } = searchParams;

  const period: Period = {
    month: month ? parseInt(month) : currentDate.getMonth(),
    year: year ? parseInt(year) : currentDate.getFullYear(),
  };

  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Home</h1>
        <Suspense fallback={<Skeleton className="w-[180px] h-[40px]" />}>
          <PeriosSelectorWrapper selectedPeriod={period} />
        </Suspense>
      </div>

      <div className="h-full py-6 flex flex-col gap-4">
        <Suspense fallback={<StatsCardSkeleton />}>
          <StatsCards selectedPeriod={period} />
        </Suspense>
        <Suspense fallback={<Skeleton className="w-full h-[300px] " />}>
          <StatsExecutionStatus selectedPeriod={period} />
        </Suspense>
        <Suspense fallback={<Skeleton className="w-full h-[300px] " />}>
          <CreditsUsageInPeriod selectedPeriod={period} />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;

async function PeriosSelectorWrapper({
  selectedPeriod,
}: {
  selectedPeriod: Period;
}) {
  const periods = await GetPeriods();

  return <PeriodSelector selectedPeriod={selectedPeriod} periods={periods} />;
}

async function StatsCards({ selectedPeriod }: { selectedPeriod: Period }) {
  const data = await GetStatsCardsValues(selectedPeriod);

  return (
    <div className="grid gap-3 lg:gap-8 lg:grid-cols-3 min-h-[120px]">
      <StatsCard
        title="Workflow exexcutions"
        value={data.workflowExecutions}
        icon={CirclePlayIcon}
      />
      <StatsCard
        title="Phase exexcutions"
        value={data.phaseExecutions}
        icon={WaypointsIcon}
      />
      <StatsCard
        title="Credits consumed"
        value={data.creditsConsumed}
        icon={CoinsIcon}
      />
    </div>
  );
}

function StatsCardSkeleton() {
  return (
    <div className="grid gap-3 lg:gap-8 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="w-full min-h-[120px]" />
      ))}
    </div>
  );
}

async function StatsExecutionStatus({
  selectedPeriod,
}: {
  selectedPeriod: Period;
}) {
  const data = await GetWorkflowExecutionStats(selectedPeriod);

  return <ExecutionStatusChart data={data} />;
}

async function CreditsUsageInPeriod({
  selectedPeriod,
}: {
  selectedPeriod: Period;
}) {
  const data = await GetCreditUsageInPeriod(selectedPeriod);

  return (
    <CreditsUsageChart
      data={data}
      title="Daily credits spent"
      description="Daily credit consumed in selected period"
    />
  );
}

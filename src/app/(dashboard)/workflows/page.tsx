import {
  UserWorkflows,
  UserWorkFlowsSkeleton,
  WorkflowHeader,
} from "@/features/workflows/components";
import { Suspense } from "react";

export default async function WorkflowsPage() {
  return (
    <div className="flex flex-col h-full">
      <WorkflowHeader />

      <div className="h-full py-6">
        <Suspense fallback={<UserWorkFlowsSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  );
}

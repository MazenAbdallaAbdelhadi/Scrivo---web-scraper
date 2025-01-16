import { WorkflowExecutionStatus } from "@/features/workflow-editor/types";
import { cn } from "@/lib/utils";
import React from "react";

const indicatorColors: Record<WorkflowExecutionStatus, string> = {
  PENDING: "bg-slate-400",
  RUNNING: "bg-yellow-400",
  FAILED: "bg-red-400",
  COMPLETED: "bg-emerald-600",
};

export function ExecutionStatusIndicator({
  status,
}: {
  status: WorkflowExecutionStatus;
}) {
  return <div className={cn("size-2 rounded-full", indicatorColors[status])} />;
}

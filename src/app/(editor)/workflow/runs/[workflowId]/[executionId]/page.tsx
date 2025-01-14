import { ExecutionViewer } from "@/features/execution-viewer";
import Topbar from "@/features/workflow-editor/components/topbar/topbar";
import { GetWorkflowExecutionWithPhases } from "@/server/workflows/data";
import { Loader2Icon } from "lucide-react";
import React, { Suspense } from "react";

interface ExecutionViewerPageProps {
  params: {
    workflowId: string;
    executionId: string;
  };
}

export default function ExecutionViewerPage({
  params,
}: ExecutionViewerPageProps) {
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <Topbar
        workflowId={params.workflowId}
        title="Workflow run details"
        subtitle={`Run ID: ${params.executionId}`}
        hideButtons
      />

      <section className="flex h-full overflow-auto">
        <Suspense
          fallback={
            <div className="flex w-full h-full justify-center items-center">
              <Loader2Icon className="size-10 animate-spin stroke-primary" />
            </div>
          }
        >
          <ExecutionViewerWrapper executionId={params.executionId} />
        </Suspense>
      </section>
    </div>
  );
}

interface ExecutionViewerWrapperProps {
  executionId: string;
}
async function ExecutionViewerWrapper({
  executionId,
}: ExecutionViewerWrapperProps) {
  const workflowExecution = await GetWorkflowExecutionWithPhases(executionId);

  if (!workflowExecution) {
    return <div>Not Found</div>;
  }

  return <ExecutionViewer initialData={workflowExecution} />;
}

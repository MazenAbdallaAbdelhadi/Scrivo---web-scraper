"use client";
import { Workflow } from "@prisma/client";
import { ReactFlowProvider } from "@xyflow/react";

import { FlowEditor } from "./flow-editor";
import Topbar from "./topbar/topbar";
import TaskMenu from "./task-menu";
import { FlowValidationContextProvider } from "./context/flow-validationContextType";
import { WorkflowStatus } from "@/features/workflows/types";

interface WorkflowEditorProps {
  workflow: Workflow;
}

export function WorkflowEditor({ workflow }: WorkflowEditorProps) {
  return (
    <FlowValidationContextProvider>
      <ReactFlowProvider>
        <div className="flex flex-col h-full w-full overflow-hidden">
          <Topbar
            workflowId={workflow.id}
            title="Workflow editor"
            subtitle={workflow.name}
            isPublished={workflow.status === WorkflowStatus.PUBLISHED}
          />
          <section className="flex h-full overflow-auto">
            <TaskMenu />
            <FlowEditor workflow={workflow} />
          </section>
        </div>
      </ReactFlowProvider>
    </FlowValidationContextProvider>
  );
}

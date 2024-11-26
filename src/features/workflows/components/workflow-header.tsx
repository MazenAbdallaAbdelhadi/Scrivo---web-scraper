import React from "react";
import { CreateWorkflowDialog } from "./create-workflow-dialog";

export const WorkflowHeader = () => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Workflows</h1>
        <p className="text-muted-foreground">Manage your workflows</p>
      </div>

      <CreateWorkflowDialog />
    </div>
  );
};

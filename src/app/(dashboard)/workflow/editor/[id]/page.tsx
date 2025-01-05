import { WorkflowEditor } from "@/features/workflow-editor/components";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";

const WorkflowEditorPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const user = await currentUser();

  const workflow = await db.workflow.findUnique({
    where: {
      id,
      userId: user?.id,
    },
  });

  if (!workflow) {
    return <div>Workflow not found</div>;
  }

  return <WorkflowEditor workflow={workflow}/>;
};

export default WorkflowEditorPage;

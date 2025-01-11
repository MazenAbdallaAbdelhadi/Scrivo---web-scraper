"use server";
import { redirect } from "next/navigation";

import { WorkflowStatus } from "@/features/workflows/types";
import {
  createWorkflowSchema,
  ICreateWorkflowSchema,
} from "@/features/workflows/schemas";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { AppNode, TaskType } from "@/features/workflow-editor/types";
import { Edge } from "@xyflow/react";
import { CreateFlowNode } from "@/features/workflow-editor/lib/create-flow-node";

export async function createWorkflowAction(values: ICreateWorkflowSchema) {
  const user = await currentUser();

  if (!user || !user?.id) {
    throw new Error("unAuthorized");
  }

  const { success, data } = createWorkflowSchema.safeParse(values);

  if (!success) {
    throw new Error("Invalid form data");
  }

  const initialFlow: { nodes: AppNode[]; edges: Edge[] } = {
    nodes: [],
    edges: [],
  };

  initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER));

  const result = await db.workflow.create({
    data: {
      userId: user.id,
      status: WorkflowStatus.DRAFT,
      definition: JSON.stringify(initialFlow),
      ...data,
    },
  });

  if (!result) {
    throw new Error("failed to create workflow");
  }

  redirect(`/workflow/editor/${result.id}`);
}

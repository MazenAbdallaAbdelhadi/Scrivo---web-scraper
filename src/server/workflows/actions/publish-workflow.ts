"use server";

import { FlowToExecutionPlan } from "@/features/workflow-editor/lib/execution-plan";
import { CalculateWorkflowCost } from "@/features/workflow-editor/lib/helper";
import { WorkflowStatus } from "@/features/workflows/types";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function PublishWorkflow({
  id,
  flowDefinition,
}: {
  id: string;
  flowDefinition: string;
}) {
  const user = await currentUser();

  if (!user || !user.id) {
    throw new Error("unauthenticated");
  }

  const workflow = await db.workflow.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!workflow) {
    throw new Error("workflow not found");
  }

  if (workflow.status !== WorkflowStatus.DRAFT) {
    throw new Error("workflow is not a draft");
  }

  const flow = JSON.parse(flowDefinition);
  const result = FlowToExecutionPlan(flow.nodes, flow.edges);

  if (result.error) {
    throw new Error("flow definition not valid");
  }

  if (!result.executionPlan) {
    throw new Error("no execution plan generated");
  }

  const creditsCost = CalculateWorkflowCost(flow.nodes);

  await db.workflow.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      definition: flowDefinition,
      executionPlan: JSON.stringify(result.executionPlan),
      creditsCost,
      status: WorkflowStatus.PUBLISHED,
    },
  });

  revalidatePath(`/workflow/editor/${id}`);
}

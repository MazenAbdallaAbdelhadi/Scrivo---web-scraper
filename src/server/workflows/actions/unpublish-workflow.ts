"use server";

import { FlowToExecutionPlan } from "@/features/workflow-editor/lib/execution-plan";
import { CalculateWorkflowCost } from "@/features/workflow-editor/lib/helper";
import { WorkflowStatus } from "@/features/workflows/types";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function UnpublishWorkflow({ id }: { id: string }) {
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

  if (workflow.status !== WorkflowStatus.PUBLISHED) {
    throw new Error("workflow is not a published");
  }

  await db.workflow.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      executionPlan: null,
      creditsCost: 0,
      status: WorkflowStatus.DRAFT,
    },
  });

  revalidatePath(`/workflow/editor/${id}`);
}

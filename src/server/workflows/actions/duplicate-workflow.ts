"use server";

import {
  duplicateWorkflowSchema,
  IDuplicateWorkflowSchema,
} from "@/features/workflows/schemas";
import { WorkflowStatus } from "@/features/workflows/types";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function DuplicateWorkflow(form: IDuplicateWorkflowSchema) {
  const { success, data } = duplicateWorkflowSchema.safeParse(form);

  if (!success) {
    throw new Error("Invalid form data");
  }

  const user = await currentUser();
  if (!user || !user.id) {
    throw new Error("unauthenticated");
  }

  const sourceWorkflow = await db.workflow.findUnique({
    where: { id: data.workflowId, userId: user.id },
  });

  if (!sourceWorkflow) {
    throw new Error("Workflow not found");
  }

  const result = await db.workflow.create({
    data: {
      userId: user.id,
      name: data.name,
      description: data.description,
      status: WorkflowStatus.DRAFT,
      definition: sourceWorkflow.definition,
    },
  });

  if (!result) {
    throw new Error("Failed to duplicate workflow");
  }

  revalidatePath("/workflows");
}

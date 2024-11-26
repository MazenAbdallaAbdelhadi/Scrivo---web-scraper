"use server";
import { redirect } from "next/navigation";

import { WorkflowStatus } from "@/features/types";
import {
  createWorkflowSchema,
  ICreateWorkflowSchema,
} from "@/features/workflows/schemas";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function createWorkflowAction(values: ICreateWorkflowSchema) {
  const user = await currentUser();

  if (!user || !user?.id) {
    throw new Error("unAuthorized");
  }

  const { success, data } = createWorkflowSchema.safeParse(values);

  if (!success) {
    throw new Error("Invalid form data");
  }

  const result = await db.workflow.create({
    data: {
      userId: user.id,
      status: WorkflowStatus.DRAFT,
      defination: "TODO",
      ...data,
    },
  });

  if (!result) {
    throw new Error("failed to create workflow");
  }

  redirect(`/workflow/editor/${result.id}`);
}

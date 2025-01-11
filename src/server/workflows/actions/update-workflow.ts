"use server";

import { WorkflowStatus } from "@/features/workflows/types";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateWorkflow({
  id,
  definition,
}: {
  id: string;
  definition: string;
}) {
  const user = await currentUser();

  if (!user) throw new Error("unauthenticated");

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
    throw new Error("workflow is not draft");
  }

  await db.workflow.update({
    data: {
      definition,
    },
    where: {
      id,
      userId: user.id,
    },
  });

  revalidatePath("/workflows")
}

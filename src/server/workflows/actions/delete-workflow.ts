"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteWorkflowAction(workflowId: string) {
  const user = await currentUser();

  if (!user || !user?.id) {
    throw new Error("unAuthorized");
  }

  await db.workflow.delete({
    where: {
      userId: user.id,
      id: workflowId,
    },
  });

  revalidatePath("/workflow");
}

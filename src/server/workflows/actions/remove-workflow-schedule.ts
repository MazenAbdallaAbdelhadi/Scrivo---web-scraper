"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function RemoveWorkflowSchedule(id: string) {
  const user = await currentUser();

  if (!user || !user.id) {
    throw new Error("unauthenticated");
  }
  const userId = user.id;

  await db.workflow.update({
    where: { id, userId },
    data: {
      cron: null,
      nextRunAt: null,
    },
  });

  revalidatePath("/workflows");
}

"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import parser from "cron-parser";
import { revalidatePath } from "next/cache";

export async function UpdateWorkflowCron({
  id,
  cron,
}: {
  id: string;
  cron: string;
}) {
  const user = await currentUser();

  if (!user || !user.id) {
    throw new Error("unauthenticated");
  }
  const userId = user.id;

  try {
    const interval = parser.parseExpression(cron, { utc: true });

    await db.workflow.update({
      where: { id, userId },
      data: {
        cron,
        nextRunAt: interval.next().toDate(),
      },
    });
    revalidatePath("/workflows");
  } catch {
    throw new Error("invalid cron expression");
  }
}

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GetWorkflowExecutions(workflowId: string) {
  const user = await currentUser();

  if (!user || !user.id) {
    throw new Error("unauthenticated");
  }

  return db.workflowExecution.findMany({
    where: {
      workflowId,
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const GetWorkflowExecutionWithPhases = async (executionId: string) => {
  const user = await currentUser();

  if (!user || !user?.id) {
    throw new Error("unauthenticated");
  }

  return db.workflowExecution.findUnique({
    where: {
      id: executionId,
      userId: user.id,
    },
    include:{
        phases: {
            orderBy:{
                number: "asc"
            }
        }
    }
  });
};

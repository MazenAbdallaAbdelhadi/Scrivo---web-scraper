import { db } from "@/lib/db";

export const getWorkflowsForUser = async (userId: string) => {
  try {
    return await db.workflow.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

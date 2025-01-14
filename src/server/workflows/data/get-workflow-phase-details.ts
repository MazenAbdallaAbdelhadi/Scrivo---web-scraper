"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GetWorkflowPhaseDetails(phaseId: string) {
  const user = await currentUser();

  if (!user || !user?.id) {
    throw new Error("unauthenticated");
  }

  return db.executionPhase.findUnique({
    where: {
      id: phaseId,
      execution: { userId: user.id },
    },
  });
}

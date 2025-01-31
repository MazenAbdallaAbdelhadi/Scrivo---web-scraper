"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Period } from "@/features/analytics/types";

export async function GetPeriods() {
  const user = await currentUser();

  if (!user || !user.id) {
    throw new Error("unauthenticated");
  }

  const years = await db.workflowExecution.aggregate({
    where: { userId: user.id },
    _min: { startedAt: true },
  });

  const currentYear = new Date().getFullYear();

  const minYear = years._min.startedAt
    ? years._min.startedAt.getFullYear()
    : currentYear;

  const periods: Period[] = [];

  for (let year = minYear; year <= currentYear; year++) {
    for (let month = 0; month <= 11; month++) {
      periods.push({
        year,
        month,
      });
    }
  }

  return periods;
}

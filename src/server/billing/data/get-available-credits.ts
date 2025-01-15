"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GetAvailableCredits() {
  const user = await currentUser();

  if (!user || !user.id) {
    throw new Error("unauthenticated");
  }

  const balance = await db.userBalance.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!balance) return -1;

  return balance.credits;
}

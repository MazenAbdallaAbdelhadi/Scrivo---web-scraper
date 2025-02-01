"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GetUserPurchaseHistory() {
  const user = await currentUser();

  if (!user || !user.id) {
    throw new Error("unauthenticated");
  }

  return db.userPurchase.findMany({
    where: { userId: user.id },
    orderBy: {
      date: "desc",
    },
  });
}

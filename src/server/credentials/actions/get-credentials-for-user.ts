"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GetCredentialsForUser() {
  const user = await currentUser();

  if (!user || !user.id) {
    throw new Error("unauthenticated");
  }

  return db.credential.findMany({
    where: { userId: user.id },
    orderBy: {
      name: "asc",
    },
  });
}

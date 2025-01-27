"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function DeleteCredentialAction(name: string) {
  const user = await currentUser();

  if (!user || !user.id) {
    throw new Error("unauthenticated");
  }

  await db.credential.delete({
    where: {
      userId_name: {
        userId: user.id,
        name: name,
      },
    },
  });

  revalidatePath("/credentials");
}

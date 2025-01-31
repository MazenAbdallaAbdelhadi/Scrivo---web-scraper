"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export async function SetupUser() {
  const user = await currentUser();

  if (!user || !user.id) {
    throw new Error("unauthenticated");
  }

  const balance = await db.userBalance.findUnique({
    where: { userId: user.id },
  });

  if (!balance) {
    await db.userBalance.create({
      data: {
        userId: user.id,
        credits: 100,
      },
    });
  }

  redirect("/");
}

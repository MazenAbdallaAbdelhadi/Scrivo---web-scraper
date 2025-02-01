import { getCreditsPack, PackId } from "@/features/billing/types";
import "server-only";
import Stripe from "stripe";
import { db } from "../db";

export async function HandleCheckoutSessionCompleted(
  event: Stripe.Checkout.Session
) {
  if (!event.metadata) {
    throw new Error("missing metadata");
  }

  const { userId, packId } = event.metadata;

  if (!userId) {
    throw new Error("missing user id");
  }

  if (!packId) {
    throw new Error("missing pack id");
  }

  const purchasedPack = getCreditsPack(packId as PackId);
  if (!purchasedPack) {
    throw new Error("purchased pack not found");
  }

  await db.userBalance.upsert({
    where: { userId },
    create: {
      userId,
      credits: purchasedPack.credits,
    },
    update: {
      credits: {
        increment: purchasedPack.credits,
      },
    },
  });

  await db.userPurchase.create({
    data: {
      userId,
      stripeId: event.id,
      description: `${purchasedPack.name} - ${purchasedPack.credits} credits`,
      amount: event.amount_total!,
      currency: event.currency!,
    },
  });
}

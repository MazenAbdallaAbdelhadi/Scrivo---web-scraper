"use server";

import { getCreditsPack, PackId } from "@/features/billing/types";
import { currentUser } from "@/lib/auth";
import { getAppUrl } from "@/lib/helper/app-url";
import { stripe } from "@/lib/stripe/stripe";
import { redirect } from "next/navigation";

export async function PurchaseCredits(packId: PackId) {
  const user = await currentUser();

  if (!user || !user.id) {
    throw new Error("unauthenticated");
  }

  const selectedPack = getCreditsPack(packId);

  if (!selectedPack) {
    throw new Error("invalid pack");
  }

  const priceId = selectedPack.priceId;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    invoice_creation: {
      enabled: true,
    },
    success_url: getAppUrl("billing"),
    cancel_url: getAppUrl("billing"),
    metadata: {
      userId: user.id,
      packId,
    },
    line_items: [
      {
        quantity: 1,
        price: priceId,
      },
    ],
  });

  if (!session.url) {
    throw new Error("cannot create stripe session");
  }

  redirect(session.url);
}

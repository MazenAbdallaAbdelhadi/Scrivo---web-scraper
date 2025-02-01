"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe/stripe";

export async function DownloadInvoice(id: string) {
  const user = await currentUser();

  if (!user || !user.id) {
    throw new Error("unauthenticated");
  }

  const purchase = await db.userPurchase.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!purchase) {
    throw new Error("bad request");
  }

  const session = await stripe.checkout.sessions.retrieve(purchase.stripeId);

  if (!session.invoice) {
    throw new Error("invoice not found");
  }

  const invoice = await stripe.invoices.retrieve(session.invoice.toString());

  return invoice.hosted_invoice_url;
}

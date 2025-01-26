"use server";

import {
  createCredentialSchema,
  ICreateCredentialSchema,
} from "@/features/credentials/schemas";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { symmetricEncrypt } from "@/lib/encryption";
import { revalidatePath } from "next/cache";

export async function CreateCredentialAction(form: ICreateCredentialSchema) {
  const { success, data } = createCredentialSchema.safeParse(form);

  if (!success) {
    throw new Error("Invalid form data");
  }

  const user = await currentUser();
  if (!user || !user.id) {
    throw new Error("unauthenticated");
  }

  const encryptedValue = symmetricEncrypt(data.value);

  const result = await db.credential.create({
    data: {
      userId: user.id,
      name: data.name,
      value: encryptedValue,
    },
  });

  if (!result) {
    throw new Error("Failed to create credential");
  }

  revalidatePath("/credentials");
}

"use server";
import bcrypt from "bcryptjs";

import {
  IResetPasswordSchema,
  resetPasswordSchema,
} from "@/features/auth/schemas";
import { getUserByEmail } from "@/server/auth/data/user";
import { getPasswordResetTokenByToken } from "@/server/auth/data/password-reset-token";
import { db } from "@/lib/db";

export const resetPassword = async (
  values: IResetPasswordSchema,
  token: string | null
) => {
  if (!token) {
    return { error: "Missing token" };
  }

  const validatedFields = resetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email doesn't exist!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password updated!" };
};

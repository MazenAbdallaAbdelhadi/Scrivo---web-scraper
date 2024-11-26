import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
  code: z.optional(z.string()),
});

export type ILoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export type IRegisterSchema = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export type IForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const confirmResetSchema = z.object({
  resetCode: z.string().length(6),
});

export type IConfirmResetSchema = z.infer<typeof confirmResetSchema>;

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Minmum 8 characters required"),
    passwordConfirm: z.string().min(8, "Minmum 8 characters required"),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["passwordConfirm"],
      });
    }
  });

export type IResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

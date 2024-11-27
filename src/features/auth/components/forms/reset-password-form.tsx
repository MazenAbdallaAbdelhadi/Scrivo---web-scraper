"use client";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";

import FormProvider, { RHFField } from "@/components/hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { paths } from "@/routes/paths";
import { resetPassword } from "@/server/auth/actions";

import { IResetPasswordSchema, resetPasswordSchema } from "../../schemas";
import { CardWrapper } from "../card-wrapper";

export const ResetPasswordForm = () => {
  const [success, setSuccess] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isPending, transaction] = useTransition();

  const form = useForm<IResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  function onSubmit(data: IResetPasswordSchema) {
    transaction(() => {
      resetPassword(data, token)
        .then((res) => {
          if (res?.error) {
            form.reset();
            toast.error(res.error);
            return;
          }
          if (res?.success) {
            form.reset();
            toast.success(res.success);
            setSuccess(true);
          }
        })
        .catch(() => {
          toast.error("Something went wrong!");
        });
    });
  }

  return (
    <CardWrapper
      headerLabel="Secure Your Account 🔒"
      headerCaption="Almost there! Create a new password for your account to keep it secure. Remember to choose a strong and unique password."
      backButtonLabel="Back to login"
      backButtonHref={paths.auth.login}
    >
      {!token && (
        <Alert variant="destructive" className="my-8">
          <AlertCircle className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Token not found</AlertDescription>
        </Alert>
      )}

      {!success && !!token && (
        <FormProvider methods={form} onSubmit={onSubmit}>
          <RHFField name="password">
            {(field) => (
              <div className="mb-4">
                <Label>Password</Label>
                <Input
                  disabled={isPending}
                  placeholder="•••••••••"
                  className="my-2"
                  type="password"
                  {...field}
                />
                <FormMessage />
              </div>
            )}
          </RHFField>

          <RHFField name="passwordConfirm">
            {(field) => (
              <div className="mb-4">
                <Label>Password Confirm</Label>
                <Input
                  disabled={isPending}
                  placeholder="•••••••••"
                  className="my-2"
                  type="password"
                  {...field}
                />
                <FormMessage />
              </div>
            )}
          </RHFField>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full mt-2"
            size="lg"
          >
            {isPending ? (
              <Loader2 className="animate-spin size-5" />
            ) : (
              "Save new Password"
            )}
          </Button>
        </FormProvider>
      )}
    </CardWrapper>
  );
};

"use client";
import { useTransition } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import FormProvider, { RHFField } from "@/components/hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form";

import { paths } from "@/routes/paths";
import { reset } from "@/server/auth/actions";

import { CardWrapper } from "../card-wrapper";
import { forgotPasswordSchema, IForgotPasswordSchema } from "../../schemas";

export const ForgotPasswordForm = () => {
  const [isPending, transaction] = useTransition();

  const form = useForm<IForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: IForgotPasswordSchema) {
    transaction(() => {
      reset(data)
        .then((res) => {
          if (res?.error) {
            form.reset();
            toast.error(res.error);
            return;
          }
          if (res?.success) {
            form.reset();
            toast.success(res.success);
          }
        })
        .catch((err) => {
          toast.error("Something went wrong!");
        });
    });
  }

  return (
    <CardWrapper
      headerLabel="Forgot Your Password? 🔑"
      headerCaption="We've got you covered. Enter your registered email to reset your password . We will send a reset password link to your email for the next steps"
      backButtonHref={paths.auth.login}
      backButtonLabel="Back to login"
    >
      <FormProvider methods={form} onSubmit={onSubmit}>
        <RHFField name="email">
          {(field) => (
            <div className="mb-4">
              <Label>Email</Label>
              <Input
                disabled={isPending}
                placeholder="example@domain.com"
                className="my-2"
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
            "Send reset link"
          )}
        </Button>
      </FormProvider>
    </CardWrapper>
  );
};

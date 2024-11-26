"use client";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import FormProvider, { RHFField } from "@/components/hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form";

import { register } from "@/server/auth/actions";
import { paths } from "@/routes/paths";

import { IRegisterSchema, registerSchema } from "../../schemas";
import { CardWrapper } from "../card-wrapper";

export function RegisterForm() {
  const [isPending, transaction] = useTransition();

  const form = useForm<IRegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(data: IRegisterSchema) {
    transaction(() => {
      register(data)
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
        .catch(() => {
          toast.error("Something went wrong!");
        });
    });
  }

  return (
    <CardWrapper
      headerLabel="Create account 👤"
      headerCaption="Let's start our journey"
      backButtonLabel="Already have an account?"
      backButtonHref={paths.auth.login}
      showSocial
    >
      <FormProvider methods={form} onSubmit={onSubmit}>
        <RHFField name="name">
          {(field) => (
            <div className="mb-4">
              <Label>Name</Label>
              <Input
                disabled={isPending}
                placeholder="Joe Doe"
                className="my-2"
                {...field}
              />
              <FormMessage />
            </div>
          )}
        </RHFField>

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

        <RHFField name="password">
          {(field) => (
            <div className="my-4">
              <Label>Password</Label>
              <Input
                disabled={isPending}
                type="password"
                placeholder="•••••••••"
                className="my-2"
                {...field}
              />
              <FormMessage />
            </div>
          )}
        </RHFField>

        <Button
          disabled={isPending}
          type="submit"
          className="w-full mt-2"
          size="lg"
        >
          {isPending ? <Loader2 className="animate-spin size-5" /> : "Register"}
        </Button>
      </FormProvider>
    </CardWrapper>
  );
}

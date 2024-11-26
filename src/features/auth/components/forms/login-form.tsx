"use client";
import { useEffect, useTransition } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import FormProvider, { RHFField } from "@/components/hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form";

import { login } from "@/server/auth/actions";
import { paths } from "@/routes/paths";

import { ILoginSchema, loginSchema } from "../../schemas";
import { CardWrapper } from "../card-wrapper";

export function LoginForm() {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const [isPending, transaction] = useTransition();

  const form = useForm<ILoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: ILoginSchema) {
    transaction(() => {
      login(data, returnTo)
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

  useEffect(() => {
    if (urlError) toast.error(urlError);
  }, [urlError]);

  return (
    <CardWrapper
      headerLabel="Welcome Back 👋"
      headerCaption="Happy to see you again"
      backButtonLabel="Don't have an account?"
      backButtonHref={paths.auth.register}
      showSocial
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

        <Button asChild variant="link" size="sm" className="px-0">
          <Link href={paths.auth.forgotPassword}>Forgot Password?</Link>
        </Button>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full mt-2"
          size="lg"
        >
          {isPending ? <Loader2 className="animate-spin size-5" /> : "Login"}
        </Button>
      </FormProvider>
    </CardWrapper>
  );
}

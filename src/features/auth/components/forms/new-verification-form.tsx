"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { AlertCircle, Loader2 } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { newVerification } from "@/server/auth/actions";
import { paths } from "@/routes/paths";

import { CardWrapper } from "../card-wrapper";

export const NewVerificationForm = () => {
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      toast.error("Missing token!");
      setLoading(false);
      return;
    }

    newVerification(token)
      .then((data) => {
        if (data.success) {
          toast.success(data.success);
        }
        if (data.error) {
          toast.error(data.error);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification 🕵️‍♂️"
      headerCaption="Let's start our journey"
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
      {!!token && (
        <div className="flex justify-center items-center my-4">
          {loading && <Loader2 className="size-10 animate-spin" />}
        </div>
      )}
    </CardWrapper>
  );
};

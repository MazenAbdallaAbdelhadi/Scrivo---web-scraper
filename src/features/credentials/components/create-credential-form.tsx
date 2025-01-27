"use client";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { FormDescription, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import FormProvider, { RHFField } from "@/components/hook-form";

import { ICreateCredentialSchema, createCredentialSchema } from "../schemas";
import { CreateCredentialAction } from "@/server/credentials/actions/create-credential";

export const CreateCredentialForm = ({
  setOpen,
}: {
  setOpen: (v: boolean) => void;
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: CreateCredentialAction,
    onSuccess: () => {
      toast.success("Credential created", { id: "create-credential" });
      setOpen(false);
    },
    onError: () => {
      toast.error("Failed to create credential", { id: "create-credential" });
    },
  });

  const form = useForm<ICreateCredentialSchema>({
    resolver: zodResolver(createCredentialSchema),
    defaultValues: {},
  });

  const onSubmit = useCallback(
    (values: ICreateCredentialSchema) => {
      toast.loading("Creating credetial...", { id: "create-credential" });
      mutate(values);
    },
    [mutate]
  );

  return (
    <FormProvider methods={form} onSubmit={onSubmit}>
      <RHFField name="name">
        {(field) => (
          <div className="my-4">
            <Label className="flex gap-1 items-center">
              Name <p className="text-xs text-primary">(required)</p>
            </Label>
            <Input
              disabled={isPending}
              placeholder="unique name"
              className="my-2"
              {...field}
            />
            <FormDescription>
              Enter a unique and descriptive name for the credential <br />
              This name will be used to identify the credential
            </FormDescription>
            <FormMessage />
          </div>
        )}
      </RHFField>

      <RHFField name="value">
        {(field) => (
          <div className="my-4">
            <Label className="flex gap-1 items-center">
              Value <p className="text-xs text-primary">(required)</p>
            </Label>
            <Textarea
              disabled={isPending}
              placeholder="..."
              className="my-2 resize-none"
              {...field}
            />
            <FormDescription>
              Enter the value associated with this credential
              <br />
              this value will be securely encrypted and stored
            </FormDescription>
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
        {isPending ? <Loader2 className="animate-spin size-5" /> : "Proceed"}
      </Button>
    </FormProvider>
  );
};

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

import { createWorkflowAction } from "@/server/workflows/actions/create-workflow";

import { createWorkflowSchema, ICreateWorkflowSchema } from "../schemas";

export const CreateWorkflowForm = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: createWorkflowAction,
    onSuccess: () => {
      toast.success("Workflow created", { id: "create-workflow" });
    },
    onError: () => {
      toast.error("Failed to create workflow", { id: "create-workflow" });
    },
  });

  const form = useForm<ICreateWorkflowSchema>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {},
  });

  const onSubmit = useCallback((values: ICreateWorkflowSchema) => {
    toast.loading("Creating workflow", { id: "create-workflow" });
    mutate(values);
  }, []);

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
              placeholder="First workflow"
              className="my-2"
              {...field}
            />
            <FormDescription>
              Choose a descriptive and unique name
            </FormDescription>
            <FormMessage />
          </div>
        )}
      </RHFField>

      <RHFField name="description">
        {(field) => (
          <div className="my-4">
            <Label className="flex gap-1 items-center">
              Description{" "}
              <p className="text-xs text-muted-foreground">(optional)</p>
            </Label>
            <Textarea
              disabled={isPending}
              placeholder="..."
              className="my-2 resize-none"
              {...field}
            />
            <FormDescription>
              Provide a brief description of what your worklow does <br /> This
              is optional but can help you rmeber the workflow&apos;s purpose
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

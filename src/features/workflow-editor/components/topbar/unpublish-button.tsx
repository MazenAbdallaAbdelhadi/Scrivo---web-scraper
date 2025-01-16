"use client";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import {  DownloadIcon } from "lucide-react";
import { toast } from "sonner";
import { UnpublishWorkflow } from "@/server/workflows/actions/unpublish-workflow";

export function UnpublishButton({ workflowId }: { workflowId: string }) {

  const saveMutation = useMutation({
    mutationFn: UnpublishWorkflow,
    onSuccess: () => {
      toast.success("Workflow unpublished", { id: workflowId });
    },
    onError: () => {
      toast.error("Something wend wrong", { id: workflowId });
    },
  });
  return (
    <Button
      disabled={saveMutation.isPending}
      variant="outline"
      className="flex items-center gap-2"
      onClick={() => {

        toast.loading("unpublishing workflow...", { id: workflowId });
        saveMutation.mutate({
          id: workflowId,
        });
      }}
    >
      <DownloadIcon size={16} className="stroke-orange-500" />
      Unpublish
    </Button>
  );
}

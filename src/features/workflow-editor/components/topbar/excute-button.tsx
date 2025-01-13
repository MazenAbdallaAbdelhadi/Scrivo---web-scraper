"use client";

import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";
import { useExecutionPlan } from "../../hooks/use-execution-plan";
import { useMutation } from "@tanstack/react-query";
import { RunWorkflow } from "@/server/workflows/actions/run-workflow";
import { toast } from "sonner";
import { useReactFlow } from "@xyflow/react";

interface ExcuteButtonProps {
  workflowId: string;
}

export function ExcuteButton({ workflowId }: ExcuteButtonProps) {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();

  const mutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: () => {
      toast.success("Execution started", { id: "flow-execution" });
    },
    onError: () => {
      toast.error("Something went wrong", { id: "flow-execution" });
    },
  });

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      disabled={mutation.isPending}
      onClick={() => {
        const plan = generate();
        if (!plan) {
          // Client sid validation
          return;
        }

        mutation.mutate({
          workflowId: workflowId,
          flowDefinition: JSON.stringify(toObject()),
        });
      }}
    >
      <PlayIcon size={16} className="stroke-orange-400" />
      Excute
    </Button>
  );
}

"use client";

import { CustomDialogHeader } from "@/components/custom-dialog-header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { UpdateWorkflowCron } from "@/server/workflows/actions/update-workflow-cron";
import { useMutation } from "@tanstack/react-query";
import { CalendarIcon, ClockIcon, TriangleAlertIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import cronstrue from "cronstrue";
import parser from "cron-parser";
import { RemoveWorkflowSchedule } from "@/server/workflows/actions/remove-workflow-schedule";
import { Separator } from "@/components/ui/separator";

export default function SchedulerDialog(props: {
  workflowId: string;
  cron: string;
}) {
  const [cron, setCron] = useState(props.cron || "");
  const [validCron, setValidCron] = useState(false);
  const [readableCron, setReadableCron] = useState("");

  const mutation = useMutation({
    mutationFn: UpdateWorkflowCron,
    onSuccess: () => {
      toast.success("Schedule updated successfully", { id: "cron" });
    },
    onError: () => {
      toast.success("Something went wrong", { id: "cron" });
    },
  });

  const removeScheduleMutaion = useMutation({
    mutationFn: RemoveWorkflowSchedule,
    onSuccess: () => {
      toast.success("Schedule updated successfully", { id: "cron" });
    },
    onError: () => {
      toast.success("Something went wrong", { id: "cron" });
    },
  });

  useEffect(() => {
    try {
      parser.parseExpression(cron);
      const humanCronStr = cronstrue.toString(cron);
      setValidCron(true);
      setReadableCron(humanCronStr);
    } catch (error) {
      setValidCron(false);
    }
  }, [cron]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          size="sm"
          className={cn(
            "text-sm p-0 h-auto text-orange-500",
            validCron && "text-primary"
          )}
        >
          {validCron && (
            <div className="flex items-center gap-2">
              <ClockIcon />
              {readableCron}
            </div>
          )}
          {!validCron && (
            <div className="flex items-center gap-1">
              <TriangleAlertIcon className="size-3" /> Set schedule
            </div>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="px-0">
        <CustomDialogHeader
          title="Schedule workflow execution"
          icon={CalendarIcon}
        />

        <div className="p-6 space-y-4">
          <p className="text-muted-foreground text-sm">
            Specify a cron expression to schedule periodic workflow execution.
            All times are in UTC
          </p>
          <Input
            placeholder="E.g. * * * * *"
            value={cron}
            onChange={(e) => setCron(e.target.value)}
          />

          <div
            className={cn(
              "bg-accent rounded-md p-4 border text-sm",
              validCron
                ? "border-primary text-primary"
                : "border-destructive text-destructive"
            )}
          >
            {validCron ? readableCron : "Not a valid cron expression"}
          </div>

          {validCron && (
            <DialogClose asChild>
              <div>
                <Button
                  variant="outline"
                  className="w-full text-destructive border-destructive hover:text-destructive"
                  disabled={
                    mutation.isPending || removeScheduleMutaion.isPending
                  }
                  onClick={() => {
                    toast.loading("Removing schedule...", { id: "cron" });
                    removeScheduleMutaion.mutate(props.workflowId);
                  }}
                >
                  Remove current schedule
                </Button>
                <Separator className="my-4" />
              </div>
            </DialogClose>
          )}
        </div>
        <DialogFooter className="px-6 gap-2">
          <DialogClose asChild>
            <Button variant="secondary" className="w-full">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="w-full"
              disabled={mutation.isPending || !validCron}
              onClick={() => {
                toast.loading("Saving...", { id: "cron" });

                mutation.mutate({
                  id: props.workflowId,
                  cron,
                });
              }}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

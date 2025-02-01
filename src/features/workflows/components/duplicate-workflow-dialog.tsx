"use client";
import { useState } from "react";
import { CopyIcon, Layers2Icon } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CustomDialogHeader } from "@/components/custom-dialog-header";
import { Button } from "@/components/ui/button";

import { DuplicateWorkflowForm } from "./duplicate-workflow-form";
import { cn } from "@/lib/utils";

interface ICreateWorkflowDialogProps {
  triggerText?: string;
  workflowId?: string;
}

export const DuplicateWorkflowDialog = ({
  workflowId,
}: ICreateWorkflowDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "ml-2 transition-opacity duration-200 opacity-0 group-hover/card:opacity-100"
          )}
        >
          <CopyIcon className="size-4 text-muted-foreground cursor-pointer" />
        </Button>
      </DialogTrigger>

      <DialogContent className="px-0">
        <CustomDialogHeader icon={Layers2Icon} title="Duplicate workflow" />

        <div className="p-6">
          {open && (
            <DuplicateWorkflowForm
              workflowId={workflowId}
              setOpen={() => {
                setOpen((prev) => !prev);
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

"use client";
import { useState } from "react";
import { Layers2Icon } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CustomDialogHeader } from "@/components/custom-dialog-header";
import { Button } from "@/components/ui/button";

import { CreateWorkflowForm } from "./create-workflow-form";

interface ICreateWorkflowDialogProps {
  triggerText?: string;
}

export const CreateWorkflowDialog = ({
  triggerText,
}: ICreateWorkflowDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create workflow"}</Button>
      </DialogTrigger>

      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={Layers2Icon}
          title="Create workflow"
          subTitle="Start building your workflow"
        />

        <div className="p-6">{open && <CreateWorkflowForm />}</div>
      </DialogContent>
    </Dialog>
  );
};

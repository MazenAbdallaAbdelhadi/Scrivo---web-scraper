"use client";
import { useState } from "react";
import { ShieldEllipsis } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CustomDialogHeader } from "@/components/custom-dialog-header";
import { Button } from "@/components/ui/button";

import { CreateCredentialForm } from "./create-credential-form";

interface ICreateWorkflowDialogProps {
  triggerText?: string;
}

export const CreateCredentialDialog = ({
  triggerText,
}: ICreateWorkflowDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create"}</Button>
      </DialogTrigger>

      <DialogContent className="px-0">
        <CustomDialogHeader icon={ShieldEllipsis} title="Create credential" />

        <div className="p-6">
          {open && <CreateCredentialForm setOpen={(v) => setOpen(v)} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

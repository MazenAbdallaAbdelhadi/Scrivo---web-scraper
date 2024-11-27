import { AlertCircle, InboxIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

import { currentUser } from "@/lib/auth";

import { getWorkflowForUser } from "@/server/workflows/data";

import { CreateWorkflowDialog } from "./create-workflow-dialog";
import { WorkflowCard } from "./workflow-card";

export const UserWorkflows = async () => {
  const user = await currentUser();
  if (!user || !user.id) {
    return;
  }

  const workflows = await getWorkflowForUser(user.id);

  if (!workflows) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="size-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again later
        </AlertDescription>
      </Alert>
    );
  }

  if (workflows.length === 0) {
    return <EmptyWorkflows />;
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {workflows.map((workflow) => (
        <WorkflowCard key={workflow.id} workflow={workflow} />
      ))}
    </div>
  );
};

export const UserWorkFlowsSkeleton = () => {
  return (
    <div className="space-y-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </div>
  );
};

const EmptyWorkflows = () => {
  return (
    <div className="flex flex-col gap-4 h-full items-center justify-center">
      <div className="rounded-full bg-accent size-20 flex items-center justify-center">
        <InboxIcon className="stroke-primary size-10" />
      </div>

      <div className="flex flex-col gap-1 text-center">
        <p className="font-bold">No workflows created yet</p>
        <p className="text-sm text-muted-foreground">
          Click the button to create your first workflow
        </p>
      </div>

      <CreateWorkflowDialog triggerText="Create your first workflow" />
    </div>
  );
};

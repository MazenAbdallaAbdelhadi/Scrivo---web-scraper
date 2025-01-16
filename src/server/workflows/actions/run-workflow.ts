"use server";

import { ExecuteWorkflow } from "@/features/execution-viewer/lib/execute-workflow";
import { TaskRegistry } from "@/features/workflow-editor/components/tasks/task-registry";
import { FlowToExecutionPlan } from "@/features/workflow-editor/lib/execution-plan";
import {
  ExecutionPhaseStatus,
  WorkflowExcutionPlan,
  WorkflowExecutionStatus,
  WorkflowExecutionTrigger,
} from "@/features/workflow-editor/types";
import { WorkflowStatus } from "@/features/workflows/types";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface IRunWorkflowForm {
  workflowId: string;
  flowDefinition?: string;
}
export async function RunWorkflow(form: IRunWorkflowForm) {
  const user = await currentUser();

  if (!user || !user?.id) {
    throw new Error("unAuthorized");
  }

  const { workflowId, flowDefinition } = form;

  if (!workflowId) {
    throw new Error("workflowId is required");
  }

  if (!flowDefinition) {
    throw new Error("flowDefinition is not defined");
  }

  const workflow = await db.workflow.findUnique({
    where: {
      id: workflowId,
      userId: user.id,
    },
  });

  if (!workflow) {
    throw new Error("workflow not found");
  }

  let executionPlan: WorkflowExcutionPlan;
  if (workflow.status === WorkflowStatus.PUBLISHED) {
    executionPlan = JSON.parse(workflow.executionPlan!);
  }

  const flow = JSON.parse(flowDefinition);

  const result = FlowToExecutionPlan(flow.nodes, flow.edges);
  if (result.error) {
    throw new Error("flow definition not valid");
  }

  if (!result.executionPlan) {
    throw new Error("no execution plan generated");
  }

  executionPlan = result.executionPlan;

  const execution = await db.workflowExecution.create({
    data: {
      workflowId,
      userId: user.id,
      status: WorkflowExecutionStatus.PENDING,
      startedAt: new Date(),
      trigger: WorkflowExecutionTrigger.MANUAL,
      definition: flowDefinition,
      phases: {
        create: executionPlan.flatMap((phase) => {
          return phase.nodes.flatMap((node) => {
            return {
              userId: user.id!,
              status: ExecutionPhaseStatus.CREATED,
              number: phase.phase,
              node: JSON.stringify(node),
              name: TaskRegistry[node.data.type].label,
            };
          });
        }),
      },
    },
    select: {
      id: true,
      phases: true,
    },
  });

  if (!execution) {
    throw new Error("workflow execution not created");
  }

  ExecuteWorkflow(execution.id); // run this on background

  redirect(`/workflow/runs/${workflowId}/${execution.id}`);
}

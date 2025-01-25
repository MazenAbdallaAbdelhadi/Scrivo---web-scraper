import { ExecuteWorkflow } from "@/features/execution-viewer/lib/execute-workflow";
import { TaskRegistry } from "@/features/workflow-editor/components/tasks/task-registry";
import {
  ExecutionPhaseStatus,
  WorkflowExcutionPlan,
  WorkflowExecutionStatus,
  WorkflowExecutionTrigger,
} from "@/features/workflow-editor/types";
import { db } from "@/lib/db";
import { timingSafeEqual } from "crypto";
import parser from "cron-parser";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return Response.json({ error: "Unuthorized" }, { status: 401 });
  }

  const secret = authHeader.split(" ")[1];

  if (!isValidSecret(secret)) {
    return Response.json({ error: "Unuthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const workflowId = searchParams.get("workflowId") as string;

  if (!workflowId) {
    return Response.json({ error: "bad request" }, { status: 400 });
  }

  const workflow = await db.workflow.findUnique({ where: { id: workflowId } });

  if (!workflow) {
    return Response.json({ error: "bad request" }, { status: 400 });
  }

  const executionPlan = JSON.parse(
    workflow.executionPlan!
  ) as WorkflowExcutionPlan;

  if (!executionPlan) {
    return Response.json({ error: "bad request" }, { status: 400 });
  }

  let nextRun;
  try {
    const cron = parser.parseExpression(workflow.cron!, { utc: true });
    nextRun = cron.next().toDate();

    const execution = await db.workflowExecution.create({
      data: {
        workflowId,
        userId: workflow.userId,
        definition: workflow.definition,
        status: WorkflowExecutionStatus.PENDING,
        startedAt: new Date(),
        trigger: WorkflowExecutionTrigger.CRON,
        phases: {
          create: executionPlan.flatMap((phase) => {
            return phase.nodes.flatMap((node) => {
              return {
                userId: workflow.userId,
                status: ExecutionPhaseStatus.CREATED,
                number: phase.phase,
                node: JSON.stringify(node),
                name: TaskRegistry[node.data.type].label,
              };
            });
          }),
        },
      },
    });

    await ExecuteWorkflow(execution.id, nextRun);

    return new Response(null, { status: 200 });
  } catch (error) {
    return Response.json({ error: "internal server error" }, { status: 500 });
  }
}

function isValidSecret(secret: string) {
  const API_SECRET = process.env.API_SECRET;

  if (!API_SECRET) return false;

  try {
    return timingSafeEqual(Buffer.from(secret), Buffer.from(API_SECRET));
  } catch (error) {
    return false;
  }
}

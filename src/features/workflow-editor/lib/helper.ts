import { TaskRegistry } from "../components/tasks/task-registry";
import { AppNode } from "../types";

export function CalculateWorkflowCost(nodes: AppNode[]) {
  return nodes.reduce((acc, node) => {
    return acc + TaskRegistry[node.data.type].credits;
  }, 0);
}

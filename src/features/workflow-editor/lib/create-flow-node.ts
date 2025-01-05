import { AppNode, TaskType } from "../types";

export function CreateFlowNode(
  nodeType: TaskType,
  position?: { x: number; y: number }
): AppNode {
  return {
    id: crypto.randomUUID(),
    position: position ?? { x: 0, y: 0 },
    type: "FlowScrapeNode",
    dragHandle: ".drag-handle",
    data: {
      type: nodeType,
      inputs: {},
    },
  };
}

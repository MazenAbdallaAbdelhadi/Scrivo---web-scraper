import { Handle, Position } from "@xyflow/react";
import { cn } from "@/lib/utils";

import { TaskParam } from "../../types";
import { NodeParamField } from "./node-param-field";

interface NodeInputsProps {
  children: React.ReactNode;
}

export function NodeInputs({ children }: NodeInputsProps) {
  return <div className="flex flex-col divide-y gap-2">{children}</div>;
}

interface NodeInputProps {
  input: TaskParam;
  nodeId: string;
}

export function NodeInput({ input, nodeId }: NodeInputProps) {
  return (
    <div className="flex justify-start relative p-3 bg-secondary w-full">
      <NodeParamField param={input} nodeId={nodeId} />

      {!input.hideHandle && (
        <Handle
          id={input.name}
          type="target"
          position={Position.Left}
          className={cn(
            "!bg-muted-foreground !border-2 !border-background !-left-2 !size-4"
          )}
        />
      )}
    </div>
  );
}

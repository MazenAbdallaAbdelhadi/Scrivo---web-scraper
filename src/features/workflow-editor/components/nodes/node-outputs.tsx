import React from "react";
import { TaskParam } from "../../types";
import { Handle, Position } from "@xyflow/react";
import { cn } from "@/lib/utils";
import { ColorsForHandle } from "./common";

interface NodeOutputsProps {
  children: React.ReactNode;
}

export function NodeOutputs({ children }: NodeOutputsProps) {
  return <div className="flex flex-col divide-y gap-1">{children}</div>;
}

interface NodeOutputProps {
  output: TaskParam;
}
export function NodeOutput({ output }: NodeOutputProps) {
  return (
    <div className="flex justify-end relative p-3 bg-secondary">
      <p className="text-xs text-muted-foreground">{output.name}</p>
      <Handle
        id={output.name}
        type="source"
        position={Position.Right}
        className={cn(
          "!bg-muted-foreground !border-2 !border-background !-right-2 !size-4",
          ColorsForHandle[output.type]
        )}
      />
    </div>
  );
}

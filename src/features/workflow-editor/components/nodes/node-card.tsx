"use client";

import { useReactFlow } from "@xyflow/react";

import { cn } from "@/lib/utils";
import { useFlowValidation } from "../../hooks/use-flow-validation-context";

interface NodeCardProps {
  nodeId: string;
  children: React.ReactNode;
  isSelected: boolean;
}

export default function NodeCard({
  children,
  nodeId,
  isSelected,
}: NodeCardProps) {
  const { getNode, setCenter } = useReactFlow();
  const { invalidInputs } = useFlowValidation();
  const hasInvalidInputs = invalidInputs.some((node) => node.nodeId === nodeId);

  function handleDoubleClick() {
    const node = getNode(nodeId);
    if (!node) return;

    const { measured, position } = node;

    if (!measured || !position) return;

    const { width, height } = measured;
    const { x, y } = position;

    if (x === undefined || y === undefined) return;

    setCenter(x + width! / 2, y + height! / 2, {
      zoom: 1,
      duration: 500,
    });
  }

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className={cn(
        "rounded-md cursor-pointer bg-background border-2 border-separate w-[420px] text-xs flex flex-col gap-1",
        isSelected && "border-primary",
        hasInvalidInputs && "border-destructive border-2"
      )}
    >
      {children}
    </div>
  );
}

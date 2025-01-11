"use client";
import { TaskParam } from "@/features/workflow-editor/types";

interface BrowserInstanceParamProps {
  param: TaskParam;
  value?: string;
  updateNodeParamValue: (value: string) => void;
}

export default function BrowserInstanceParam({
  param,
  value,
  updateNodeParamValue,
}: BrowserInstanceParamProps) {
  return <p className="text-xs">{param.name}</p>;
}

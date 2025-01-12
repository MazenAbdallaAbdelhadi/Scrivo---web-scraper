"use client";
import { useEffect, useId, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TaskParam } from "@/features/workflow-editor/types";
import { Textarea } from "@/components/ui/textarea";

interface ParamProps {
  param: TaskParam;
  value?: string;
  updateNodeParamValue: (value: string) => void;
  disabled: boolean;
}

export function StringParam({
  param,
  updateNodeParamValue,
  disabled,
  value,
}: ParamProps) {
  const [internalValue, setInternalValue] = useState(value);
  const id = useId();

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  let Component: any = Input;
  if (param.variant === "textarea") Component = Textarea;

  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="text-red-400 px-2">*</p>}
      </Label>
      <Component
        id={id}
        disabled={disabled}
        className="bg-background text-xs"
        placeholder="Enter value here"
        value={internalValue}
        onChange={(e: any) => setInternalValue(e.target.value)}
        onBlur={(e: any) => updateNodeParamValue(e.target.value)}
      />
      {param.helperText && (
        <p className="text-muted-foreground px-2">{param.helperText}</p>
      )}
    </div>
  );
}

import { useReactFlow } from "@xyflow/react";
import { AppNode, TaskParam } from "../../types";
import { StringParam } from "./param/string-param";
import { useCallback } from "react";

interface NodeParamFieldProps {
  param: TaskParam;
  nodeId: string;
}

export function NodeParamField({ param, nodeId }: NodeParamFieldProps) {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as AppNode;
  const value = node?.data?.inputs?.[param.name];

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node?.data?.inputs,
          [param.name]: newValue,
        },
      });
    },
    [nodeId, updateNodeData, param.name, node?.data.inputs]
  );

  switch (param.type) {
    case "STRING":
      return (
        <StringParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
        />
      );

    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">Not implemented</p>
        </div>
      );
  }
}

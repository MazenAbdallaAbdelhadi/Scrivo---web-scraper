import { Node } from "@xyflow/react";

export enum TaskParamType {
  STRING = "STRING",
}

export enum TaskType {
  LAUNCH_BROWSER = "LAUNCH_BROWSER",
}

export interface TaskParam {
  name: string;
  type: TaskParamType;
  helperText?: string;
  required?: boolean;
  hideHandle?: boolean;
  value?: string;
  [key: string]: any;
}

export interface AppNodeData {
  type: TaskType;
  inputs: Record<string, string>;
  [key: string]: any;
}

export interface AppNode extends Node {
  data: AppNodeData;
}

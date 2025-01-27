import { DatabaseIcon, FileJson2Icon, LucideProps } from "lucide-react";
import { TaskParamType, TaskType, WorkflowTask } from "../../types";

export const AddPropertyToJson = {
  type: TaskType.ADD_PROPERTY_TO_JSON,
  label: "Add property to JSON",
  icon: (props: LucideProps) => (
    <DatabaseIcon className="stroke-orange-400" {...props} />
  ),
  isEntryPoint: false,
  credits: 1,
  inputs: [
    {
      name: "JSON",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Property name",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Property value",
      type: TaskParamType.STRING,
      required: true,
    },
  ] as const,
  outputs: [{ name: "Updated JSON", type: TaskParamType.STRING }] as const,
} satisfies WorkflowTask;

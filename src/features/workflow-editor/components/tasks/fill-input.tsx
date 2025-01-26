import { Edit3Icon, LucideProps } from "lucide-react";
import { TaskParamType, TaskType, WorkflowTask } from "../../types";

export const FillInput = {
  type: TaskType.FILL_INPUT,
  label: "Fill input",
  icon: (props: LucideProps) => (
    <Edit3Icon className="stroke-orange-400" {...props} />
  ),
  isEntryPoint: false,
  credits: 1,
  inputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
    {
      name: "Selector",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Value",
      type: TaskParamType.STRING,
      required: true,
    },
  ] as const,
  outputs: [
    { name: "Web page", type: TaskParamType.BROWSER_INSTANCE },
  ] as const,
} satisfies WorkflowTask;

import { LucideProps, MousePointerClickIcon } from "lucide-react";
import { TaskParamType, TaskType, WorkflowTask } from "../../types";

export const ClickElement = {
  type: TaskType.CLICK_ELEMENT,
  label: "Click Element",
  icon: (props: LucideProps) => (
    <MousePointerClickIcon className="stroke-orange-400" {...props} />
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
  ] as const,
  outputs: [
    { name: "Web page", type: TaskParamType.BROWSER_INSTANCE },
  ] as const,
} satisfies WorkflowTask;

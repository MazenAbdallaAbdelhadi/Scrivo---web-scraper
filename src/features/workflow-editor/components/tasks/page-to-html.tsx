import { CodeIcon, LucideProps } from "lucide-react";
import { TaskParamType, TaskType, WorkflowTask } from "../../types";

export const PageToHtml = {
  type: TaskType.PAGE_TO_HTML,
  label: "Get HTML from page",
  icon: (props: LucideProps) => (
    <CodeIcon className="stroke-rose-400" {...props} />
  ),
  isEntryPoint: false,
  inputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
  ],
  outputs: [
    { name: "HTML", type: TaskParamType.STRING },
    { name: "Web page", type: TaskParamType.BROWSER_INSTANCE },
  ],
  credits: 2,
} satisfies WorkflowTask;

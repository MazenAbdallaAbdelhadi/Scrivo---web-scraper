import { GlobeIcon, LucideProps } from "lucide-react";
import { TaskParamType, TaskType, WorkflowTask } from "../../types";

export const LaunchBrowser = {
  type: TaskType.LAUNCH_BROWSER,
  label: "Launch Browser",
  icon: (props: LucideProps) => (
    <GlobeIcon className="stroke-pink-400" {...props} />
  ),
  isEntryPoint: true,
  inputs: [
    {
      name: "Website URL",
      type: TaskParamType.STRING,
      helperText: "eg: https://www.google.com",
      required: true,
      hideHandle: true,
    },
  ] as const,
  outputs: [
    { name: "Web page", type: TaskParamType.BROWSER_INSTANCE },
  ] as const,
  credits: 5,
} satisfies WorkflowTask;

import { TaskType, WorkflowTask } from "../../types";
import { ExtractTextFromElement } from "./extract-text-from-element";
import { LaunchBrowser } from "./launch-browser";
import { PageToHtml } from "./page-to-html";

type Registry = {
  [K in TaskType]: WorkflowTask & { type: K };
};

export const TaskRegistry: Registry = {
  LAUNCH_BROWSER: LaunchBrowser,
  PAGE_TO_HTML: PageToHtml,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElement,
};

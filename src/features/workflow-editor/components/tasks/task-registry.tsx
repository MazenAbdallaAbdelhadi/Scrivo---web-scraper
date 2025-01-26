import { TaskType, WorkflowTask } from "../../types";
import { ClickElement } from "./click-element";
import { DeliverViaWebhook } from "./deliver-via-webhook";
import { ExtractTextFromElement } from "./extract-text-from-element";
import { FillInput } from "./fill-input";
import { LaunchBrowser } from "./launch-browser";
import { PageToHtml } from "./page-to-html";
import { WaitForElement } from "./wait-for-element";

type Registry = {
  [K in TaskType]: WorkflowTask & { type: K };
};

export const TaskRegistry: Registry = {
  LAUNCH_BROWSER: LaunchBrowser,
  PAGE_TO_HTML: PageToHtml,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElement,
  FILL_INPUT: FillInput,
  CLICK_ELEMENT: ClickElement,
  WAIT_FOR_ELEMENT: WaitForElement,
  DELIVER_VIA_WEBHOOK: DeliverViaWebhook,
};

import { TaskType, WorkflowTask } from "../../types";
import { AddPropertyToJson } from "./add-property-to-json";
import { ClickElement } from "./click-element";
import { DeliverViaWebhook } from "./deliver-via-webhook";
import { ExtractDataWithAI } from "./extract-data-with-ai";
import { ExtractTextFromElement } from "./extract-text-from-element";
import { FillInput } from "./fill-input";
import { LaunchBrowser } from "./launch-browser";
import { NavigateUrl } from "./navigate-url";
import { PageToHtml } from "./page-to-html";
import { ReadPropertyFromJson } from "./read-property-from-json";
import { ScrollToElement } from "./scroll-to-element";
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
  EXTRACT_DATA_WITH_AI: ExtractDataWithAI,
  READ_PROPERTY_FROM_JSON: ReadPropertyFromJson,
  ADD_PROPERTY_TO_JSON: AddPropertyToJson,
  NAVIGATE_URL: NavigateUrl,
  SCROLL_TO_ELEMENT: ScrollToElement,
};

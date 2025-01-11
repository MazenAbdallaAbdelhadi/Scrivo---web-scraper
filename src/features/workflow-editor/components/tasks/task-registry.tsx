import { ExtractTextFromElement } from "./extract-text-from-element";
import { LaunchBrowser } from "./launch-browser";
import { PageToHtml } from "./page-to-html";

export const TaskRegistry = {
  LAUNCH_BROWSER: LaunchBrowser,
  PAGE_TO_HTML: PageToHtml,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElement,
};

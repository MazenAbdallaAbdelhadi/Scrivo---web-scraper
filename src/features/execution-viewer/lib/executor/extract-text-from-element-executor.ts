import * as cheerio from "cheerio";
import { ExecutionEnvironment } from "../../types";
import { ExtractTextFromElement } from "@/features/workflow-editor/components/tasks/extract-text-from-element";

export async function ExtractTextFromElementExecutor(
  environment: ExecutionEnvironment<typeof ExtractTextFromElement>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");

    if (!selector) {
      environment.log.error("selector not found");
      return false;
    }

    const html = environment.getInput("HTML");

    if (!html) {
      environment.log.error("html not found");
      return false;
    }

    const $ = cheerio.load(html);
    const element = $(selector);

    if (!element) {
      environment.log.error("Element is not found");
      return false;
    }

    const extractedText = $.text(element);
    if (!extractedText) {
      environment.log.error("Element has no text");
      return false;
    }

    environment.setOutput("Extracted text", extractedText);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}

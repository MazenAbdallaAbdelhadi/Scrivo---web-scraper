import * as cheerio from "cheerio";
import { ExecutionEnvironment } from "../../types";
import { ExtractTextFromElement } from "@/features/workflow-editor/components/tasks/extract-text-from-element";

export async function ExtractTextFromElementExecutor(
  environment: ExecutionEnvironment<typeof ExtractTextFromElement>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");

    if (!selector) {
      return false;
    }

    const html = environment.getInput("HTML");

    if (!html) {
      return false;
    }

    const $ = cheerio.load(html);
    const element = $(selector);

    if (!element) {
      console.log("Element is not found");

      return false;
    }

    const extractedText = $.text(element);
    if (!extractedText) {
      console.log("Elment has no text");
      return false;
    }

    environment.setOutput("Extracted text", extractedText);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

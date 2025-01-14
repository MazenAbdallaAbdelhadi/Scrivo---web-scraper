import puppeteer from "puppeteer";
import { ExecutionEnvironment } from "../../types";
import { LaunchBrowser } from "@/features/workflow-editor/components/tasks/launch-browser";

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowser>,
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website URL");
    
    const browser = await puppeteer.launch({
      headless: true, // for testing
    });

    environment.setBrowser(browser);
    const page = await browser.newPage();
    await page.goto(websiteUrl);
    environment.setPage(page);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

import puppeteer from "puppeteer";
import { ExecutionEnvironment } from "../../types";
import { LaunchBrowser } from "@/features/workflow-editor/components/tasks/launch-browser";

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowser>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website URL");

    const browser = await puppeteer.launch({
      headless: true, // for testing
    });
    environment.log.info("Browser started successfully");
    environment.setBrowser(browser);
    const page = await browser.newPage();
    await page.goto(websiteUrl);
    environment.setPage(page);
    environment.log.info(`Opened page at: ${websiteUrl}`);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}

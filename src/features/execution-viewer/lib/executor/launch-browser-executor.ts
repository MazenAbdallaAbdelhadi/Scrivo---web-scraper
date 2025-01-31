import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import AdblockerPlugin  from "puppeteer-extra-plugin-adblocker";
// import blockResourcesPlugin  from "puppeteer-extra-plugin-block-resources";

import { LaunchBrowser } from "@/features/workflow-editor/components/tasks/launch-browser";
import { ExecutionEnvironment } from "../../types";

puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin());
// puppeteer.use(blockResourcesPlugin());

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

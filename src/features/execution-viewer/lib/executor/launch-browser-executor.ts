// import puppeteer from "puppeteer-extra";
// import StealthPlugin from "puppeteer-extra-plugin-stealth";
// import AdblockerPlugin  from "puppeteer-extra-plugin-adblocker";
// import blockResourcesPlugin  from "puppeteer-extra-plugin-block-resources";

import { LaunchBrowser } from "@/features/workflow-editor/components/tasks/launch-browser";
import { ExecutionEnvironment } from "../../types";
import puppeteer, { type Browser } from "puppeteer";
import puppeteerCore, { type Browser as BrowserCore } from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";

// puppeteer.use(StealthPlugin());
// puppeteer.use(AdblockerPlugin());
// puppeteer.use(blockResourcesPlugin());

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowser>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website URL");
    let browser: Browser | BrowserCore;
    if (
      process.env.NODE_ENV === "production" ||
      process.env.VERCEL_ENV === "production"
    ) {
      const executablePath = await chromium.executablePath(
        "https://github.com/Sparticuz/chromium/releases/download/v132.0.0/chromium-v132.0.0-pack.tar"
      );
      browser = await puppeteerCore.launch({
        executablePath,
        // You can pass other configs as required
        args: chromium.args,
        headless: true,
        defaultViewport: chromium.defaultViewport,
      });
    } else {
      browser = await puppeteer.launch({
        headless: true, // for testing
      });
    }

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

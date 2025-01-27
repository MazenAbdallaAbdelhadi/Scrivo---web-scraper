import { ScrollToElement } from "@/features/workflow-editor/components/tasks/scroll-to-element";
import { ExecutionEnvironment } from "../../types";
import { ClickElement } from "@/features/workflow-editor/components/tasks/click-element";

export async function ScrollToElementExecutor(
  environment: ExecutionEnvironment<typeof ScrollToElement>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("input->selector not defined");
    }

    await environment.getPage()!.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (!element) {
        throw new Error("element not found");
      }

      const top = element.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({ top });
    }, selector);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}

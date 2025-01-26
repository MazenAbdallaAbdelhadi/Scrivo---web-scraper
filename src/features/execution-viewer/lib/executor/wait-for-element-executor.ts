import { WaitForElement } from "@/features/workflow-editor/components/tasks/wait-for-element";
import { ExecutionEnvironment } from "../../types";

export async function WaitForElementExecutor(
  environment: ExecutionEnvironment<typeof WaitForElement>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("input->selector not defined");
    }
    const visibility = environment.getInput("Visibility");
    if (!visibility) {
      environment.log.error("input->visibilty not defined");
    }

    await environment.getPage()!.waitForSelector(selector, {
      visible: visibility === "visible",
      hidden: visibility === "hidden",
    });

    environment.log.info(`Element ${selector} became: ${visibility}`);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}

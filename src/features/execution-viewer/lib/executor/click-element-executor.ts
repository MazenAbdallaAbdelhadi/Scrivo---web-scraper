import { ExecutionEnvironment } from "../../types";
import { ClickElement } from "@/features/workflow-editor/components/tasks/click-element";

export async function ClickElementExecutor(
  environment: ExecutionEnvironment<typeof ClickElement>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("input->selector not defined");
    }


    await environment.getPage()!.click(selector );

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}

import { FillInput } from "@/features/workflow-editor/components/tasks/fill-input";
import { ExecutionEnvironment } from "../../types";

export async function FillInputExecutor(
  environment: ExecutionEnvironment<typeof FillInput>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("input->selector not defined");
    }

    const value = environment.getInput("Value");
    if (!value) {
      environment.log.error("input->value not defined");
    }

    await environment.getPage()!.type(selector, value);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}

import { NavigateUrl } from "@/features/workflow-editor/components/tasks/navigate-url";
import { ExecutionEnvironment } from "../../types";

export async function NavigateUrlExecutor(
  environment: ExecutionEnvironment<typeof NavigateUrl>
): Promise<boolean> {
  try {
    const url = environment.getInput("URL");
    if (!url) {
      environment.log.error("input->url not defined");
    }

    await environment.getPage()!.goto(url);
    environment.log.info(`visited ${url}`);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}

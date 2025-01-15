import { ExecutionEnvironment } from "../../types";
import { PageToHtml } from "@/features/workflow-editor/components/tasks/page-to-html";

export async function PageToHtmlExecutor(
  environment: ExecutionEnvironment<typeof PageToHtml>
): Promise<boolean> {
  try {
    const html = await environment.getPage()!.content();
    environment.setOutput("HTML", html);
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}

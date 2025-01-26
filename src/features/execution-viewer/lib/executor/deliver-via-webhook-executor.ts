import { DeliverViaWebhook } from "@/features/workflow-editor/components/tasks/deliver-via-webhook";
import { ExecutionEnvironment } from "../../types";

export async function DeliverViaWebhookExecutor(
  environment: ExecutionEnvironment<typeof DeliverViaWebhook>
): Promise<boolean> {
  try {
    const targetURL = environment.getInput("Target URL");
    if (!targetURL) {
      environment.log.error("input->targetURL not defined");
    }

    const body = environment.getInput("Body");
    if (!body) {
      environment.log.error("input->body not defined");
    }

    const response = await fetch(targetURL, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      environment.log.error(`status code: ${response.status}`);
      return false;
    }

    const resBody = await response.json();
    environment.log.info(JSON.stringify(resBody, null, 4));

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}

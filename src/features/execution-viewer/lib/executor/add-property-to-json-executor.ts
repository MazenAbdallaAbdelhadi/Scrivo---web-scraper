import { ExecutionEnvironment } from "../../types";
import { AddPropertyToJson } from "@/features/workflow-editor/components/tasks/add-property-to-json";

export async function AddPropertyToJsonExecutor(
  environment: ExecutionEnvironment<typeof AddPropertyToJson>
): Promise<boolean> {
  try {
    const jsonData = environment.getInput("JSON");
    if (!jsonData) {
      environment.log.error("input->JSON not defined");
    }

    const propertyName = environment.getInput("Property name");
    if (!propertyName) {
      environment.log.error("input->Property name not defined");
    }

    const propertyValue = environment.getInput("Property value");
    if (!propertyValue) {
      environment.log.error("input->Property value not defined");
    }

    const json = JSON.parse(jsonData);
    const updatedJson = { ...json, [propertyName]: propertyValue };

    environment.setOutput("Updated JSON", JSON.stringify(updatedJson));

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}

import { ExtractDataWithAI } from "@/features/workflow-editor/components/tasks/extract-data-with-ai";
import { ExecutionEnvironment } from "../../types";
import { db } from "@/lib/db";
import { symmetricDecrypt } from "@/lib/encryption";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function ExtractDataWithAIExecutor(
  environment: ExecutionEnvironment<typeof ExtractDataWithAI>
): Promise<boolean> {
  try {
    const credentials = environment.getInput("Credentials");
    if (!credentials) {
      environment.log.error("input->credentials not defined");
    }

    const prompt = environment.getInput("Prompt");
    if (!prompt) {
      environment.log.error("input->prompt not defined");
    }

    const content = environment.getInput("Content");
    if (!content) {
      environment.log.error("input->content not defined");
    }

    // get credentials from database
    const credential = await db.credential.findUnique({
      where: { id: credentials },
    });

    if (!credential) {
      environment.log.error("credential not found");
      return false;
    }

    const plainCredentialValue = symmetricDecrypt(credential.value);
    if (!plainCredentialValue) {
      environment.log.error("failed to decrypt credential value");
      return false;
    }

    const genAI = new GoogleGenerativeAI(plainCredentialValue);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const input = `You are a webscraper helper that extracts data from HTML or text. You will be givern a piece of text or HTML content as input and also prompt with the data you have to extract. The response should always be only the extracted data as a JSON array or object, without any additional words or explanations. Analyze the input carefully and extract data precisely based on the propt. If no data is found, return an empty JSON array. Workonly with the provided content and ensure the output is always a valid JSON array without any surrounding text
      return JSON as a text and don't format it
      this is the content: ${content} and this is the prompt: ${prompt}`;
    const { response } = await model.generateContent(input);

    const countResult = await model.countTokens(input);

    environment.log.info(`Propmt tokens: ${countResult.totalTokens}`);

    const result = response.text();
    if (!result) {
      environment.log.error("empty response from AI");
      return false;
    }

    environment.setOutput("Extracted data", result);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}

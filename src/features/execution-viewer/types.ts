import { Browser, Page } from "puppeteer";
import { WorkflowTask } from "../workflow-editor/types";

export type Environment = {
  browser?: Browser;
  page?: Page;
  phases: {
    [key: string]: {
      inputs: Record<string, string>;
      outputs: Record<string, string>;
    };
  };
};

export type ExecutionEnvironment<T extends WorkflowTask> = {
  getInput(name: T["inputs"][number]["name"]): string;
  setOutput(name: T["outputs"][number]["name"], value: string): void;
  getBrowser(): Browser | undefined;
  setBrowser(browser: Browser): void;
  getPage(): Page | undefined;
  setPage(page: Page): void;
  log: LogCollector;
};

export type LogCollector = {
  getAll(): Log[];
} & {
  [K in LogLevel]: LogFunction;
};

export type LogFunction = (message: string) => void;

export type Log = {
  message: string;
  level: LogLevel;
  timestamp: Date;
};

export const LogLevels = ["info", "error"] as const;

export type LogLevel = (typeof LogLevels)[number];

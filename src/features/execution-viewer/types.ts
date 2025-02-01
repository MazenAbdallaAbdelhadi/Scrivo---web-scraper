import { Browser, Page } from "puppeteer";
import { type Browser as BrowserCore, type Page as PageCore } from "puppeteer-core";
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
  getBrowser(): Browser | BrowserCore | undefined;
  setBrowser(browser: Browser | BrowserCore): void;
  getPage(): Page | PageCore | undefined;
  setPage(page: Page | PageCore): void;
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

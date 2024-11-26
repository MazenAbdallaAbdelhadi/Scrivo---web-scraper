import { useState, useEffect } from "react";

type ReturnType = boolean;
export type Query = "up" | "down" | "between" | "only";
type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl" | number;

const tailwindBreakpoints: Record<string, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

function resolveBreakpoint(value: Breakpoint): number {
  return typeof value === "number" ? value : tailwindBreakpoints[value];
}

export function useResponsive(
  query: Query,
  start?: Breakpoint,
  end?: Breakpoint
): ReturnType {
  const [matches, setMatches] = useState<ReturnType>(false);

  useEffect(() => {
    let mediaQueryList: MediaQueryList | null = null;

    const resolvedStart = start ? resolveBreakpoint(start) : undefined;
    const resolvedEnd = end ? resolveBreakpoint(end) : undefined;

    if (query === "up" && typeof resolvedStart === "number") {
      mediaQueryList = window.matchMedia(`(min-width: ${resolvedStart}px)`);
    } else if (query === "down" && typeof resolvedStart === "number") {
      mediaQueryList = window.matchMedia(`(max-width: ${resolvedStart - 1}px)`);
    } else if (
      query === "between" &&
      typeof resolvedStart === "number" &&
      typeof resolvedEnd === "number"
    ) {
      mediaQueryList = window.matchMedia(
        `(min-width: ${resolvedStart}px) and (max-width: ${resolvedEnd - 1}px)`
      );
    } else if (
      query === "only" &&
      typeof resolvedStart === "number" &&
      typeof resolvedEnd === "number"
    ) {
      mediaQueryList = window.matchMedia(
        `(min-width: ${resolvedStart}px) and (max-width: ${resolvedEnd}px)`
      );
    }

    const handleChange = () => {
      setMatches(mediaQueryList ? mediaQueryList.matches : false);
    };

    if (mediaQueryList) {
      handleChange(); // Initial check
      mediaQueryList.addEventListener("change", handleChange);
    }

    return () => {
      if (mediaQueryList) {
        mediaQueryList.removeEventListener("change", handleChange);
      }
    };
  }, [query, start, end]);

  return matches;
}

import { useTheme } from "next-themes";

export function useThemedValue<T>(lightValue: T, darkValue: T): T {
  const { theme } = useTheme();

  if (theme === "light") {
    return lightValue;
  }

  if (theme === "dark") {
    return darkValue;
  }

  if (theme === "system") {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    return isDark ? darkValue : lightValue;
  }

  return darkValue;
}

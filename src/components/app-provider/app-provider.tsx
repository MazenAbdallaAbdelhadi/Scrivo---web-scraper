"use client";
import { useSession } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/sonner";

import { ThemeProvider } from "../theme-provider";
import { SplashScreen } from "../loading-screen";
import { useState } from "react";
import NextTopLoader from "nextjs-toploader";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NextTopLoader color="#6d28d9" showSpinner={false} />
      <QueryClientProvider client={queryClient}>
        {status === "loading" ? <SplashScreen /> : children}
      </QueryClientProvider>
      <Toaster richColors />
    </ThemeProvider>
  );
}

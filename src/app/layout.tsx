import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import "./globals.css";

import { AppProvider } from "@/components/app-provider";
import { SessionProvider } from "next-auth/react";

const readexPro = Readex_Pro({
  subsets: ["latin"],
  variable: "--font-readexPro",
});

export const metadata: Metadata = {
  title: "Web Scraper",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={`${readexPro.variable} h-full antialiased`}>
          <AppProvider>{children}</AppProvider>
        </body>
      </html>
    </SessionProvider>
  );
}

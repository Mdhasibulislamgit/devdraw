import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ConvexClientProvider from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";
import AuthWrapper from "./_components/AuthWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevDraw",
  description: "Design you Dream",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "bg-neutral-900 text-white")}>
        <ConvexClientProvider>
          <AuthWrapper>
            {children}
            <Toaster />
          </AuthWrapper>
        </ConvexClientProvider>
      </body>
    </html>
  );
}

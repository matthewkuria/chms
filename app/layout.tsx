import type { Metadata } from "next";
import "./globals.css";
import {inter} from "./ui/fonts"
import { Toaster } from "@/components/ui/toaster";



export const metadata: Metadata = {
  title: "Church Management System",
  description: "Church Management System built by Matthew Kuria For New Creation Ministry International",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

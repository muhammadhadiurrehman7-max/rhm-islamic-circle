import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "../components/theme-provider";

export const metadata: Metadata = {
  title: "RHM Islamic Circle | Learn Quran Together",
  description: "A welcoming global space to read the Quran, learn Islam, build good habits, and grow together.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><ThemeProvider>{children}</ThemeProvider></body>
    </html>
  );
}

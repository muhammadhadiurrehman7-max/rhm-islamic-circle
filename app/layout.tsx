import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RHM Islamic Circle | Learn Quran Together",
  description: "A welcoming global space to read the Quran, learn Islam, build good habits, and grow together.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

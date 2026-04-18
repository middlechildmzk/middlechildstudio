import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Middle Child Studio",
  description: "A songwriting OS for body-first, room-first music."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

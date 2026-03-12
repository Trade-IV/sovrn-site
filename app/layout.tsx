import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "SOVRN",
  description: "Authority. Systems. Control.",
  icons: {
  icon: [
    { url: "/favicon.png?v=5", type: "image/png", sizes: "512x512" },
    { url: "/favicon.ico?v=5", rel: "shortcut icon" },
  ],
  apple: [{ url: "/favicon.png?v=5", sizes: "180x180", type: "image/png" }],
  shortcut: ["/favicon.ico?v=5"],
   },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
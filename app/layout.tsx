import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "SOVRN",
  description: "Authority. Systems. Control.",
  icons: {
  icon: [
    { url: "/favicon.png?v=8", type: "image/png", sizes: "512x512" },
    { url: "/favicon.ico?v=8", rel: "shortcut icon" },
  ],
  apple: [{ url: "/favicon.png?v=8", sizes: "180x180", type: "image/png" }],
  shortcut: ["/favicon.ico?v=8"],
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
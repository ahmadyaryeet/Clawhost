import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Best OpenClaw Hosting Providers 2026 | ClawCloud",
  description:
    "A comprehensive comparison of the best OpenClaw hosting providers in 2026. From managed platforms like ClawCloud to self-hosted options on Hetzner, find the right home for your AI agents.",
  openGraph: {
    title: "Best OpenClaw Hosting Providers 2026 | ClawCloud",
    description:
      "A comprehensive comparison of the best OpenClaw hosting providers in 2026. From managed platforms like ClawCloud to self-hosted options on Hetzner, find the right home for your AI agents.",
    type: "article",
    images: [
      {
        url: "https://placehold.co/1200x630/f2f2f2/999999?text=Best+OpenClaw+Hosting+2026",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best OpenClaw Hosting Providers 2026 | ClawCloud",
    description:
      "A comprehensive comparison of the best OpenClaw hosting providers in 2026.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

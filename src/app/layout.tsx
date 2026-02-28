import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Best OpenClaw Hosting Providers 2026 (Independently Reviewed)",
  description:
    "Compare the best OpenClaw hosting providers of 2026, independently reviewed on Docker isolation, TLS, uptime, and pricing. Find the right host for your agents.",
  keywords: [
    "OpenClaw hosting",
    "best OpenClaw hosting providers",
    "OpenClaw hosting 2026",
    "AI agent hosting",
    "ClawCloud",
    "OpenClaw Docker hosting",
    "OpenClaw self-hosted",
    "OpenClaw VPS",
    "OpenClaw rankings",
  ],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical:
      "https://clawcloud.dev/blog/best-openclaw-hosting-providers-2026",
  },
  openGraph: {
    title: "Best OpenClaw Hosting Providers 2026 (Independently Reviewed)",
    description:
      "Compare the best OpenClaw hosting providers of 2026, independently reviewed on Docker isolation, TLS, uptime, and pricing. Find the right host for your agents.",
    type: "article",
    publishedTime: "2026-01-15T00:00:00Z",
    modifiedTime: "2026-02-25T00:00:00Z",
    authors: ["OpenClaw Rankings"],
    tags: ["OpenClaw", "AI Agents", "Cloud Hosting", "DevOps", "Rankings"],
    images: [
      {
        url: "/openclaw.png",
        width: 512,
        height: 512,
        alt: "OpenClaw Rankings Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Best OpenClaw Hosting Providers 2026 (Independently Reviewed)",
    description:
      "Compare the best OpenClaw hosting providers of 2026, independently reviewed on Docker isolation, TLS, uptime, and pricing. Find the right host for your agents.",
    images: ["/openclaw.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best OpenClaw Hosting Providers in 2026",
    description:
      "Compare the best OpenClaw hosting providers of 2026, independently reviewed on Docker isolation, TLS, uptime, and pricing. Find the right host for your agents.",
    image: "/openclaw.png",
    datePublished: "2026-01-15",
    dateModified: "2026-02-25",
    author: {
      "@type": "Organization",
      name: "OpenClaw Rankings",
    },
    publisher: {
      "@type": "Organization",
      name: "OpenClaw Rankings",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the best OpenClaw hosting provider in 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ClawCloud is the best overall OpenClaw hosting provider in 2026. It offers managed Docker isolation per agent, auto-TLS via Caddy, built-in WhatsApp/Telegram/Discord/Slack integrations, and one-click deployment starting at $29/mo.",
        },
      },
      {
        "@type": "Question",
        name: "What is the cheapest way to host OpenClaw agents?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Self-hosting on a Hetzner VPS is the cheapest option at $27/month for a CX22 instance. Use ClawCloud's open-source repo to automate Docker and Caddy setup.",
        },
      },
      {
        "@type": "Question",
        name: "Which OpenClaw hosting providers support WhatsApp and Telegram?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ClawCloud is the only hosting provider with built-in WhatsApp, Telegram, Discord, and Slack integrations. All other providers require manual webhook configuration.",
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`}>
      <head>
        {/* Google Ads gtag.js */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17958663178" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17958663178');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

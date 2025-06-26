import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Issues2Action – Turn GitHub Issues into Clear Action Plans with AI",
  description:
    "Issues2Action helps developers and teams transform cluttered GitHub issues into structured, actionable sprint plans using AI. Get clear PR suggestions, estimated timelines, and task breakdowns instantly.",
  keywords: [
    "GitHub Issues",
    "AI Project Planning",
    "Sprint Planning Tool",
    "Developer Productivity",
    "AI Developer Tools",
    "Next.js Tools",
    "Open Source Planning",
    "Task Estimation AI",
    "Software Team Tools",
    "Engineering Workflow Automation"
  ],
  authors: [{ name: "Aman Janwani", url: "https://amanjanwani.me" }],
  creator: "Aman Janwani",
  applicationName: "Issues2Action",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Issues2Action – AI-Powered Sprint Planning from GitHub Issues",
    description:
      "Generate development plans from GitHub issues using AI. Ideal for dev teams, freelancers, and open-source maintainers.",
    url: "https://issue2action.nrbuilt.live", // Replace with your actual domain
    siteName: "Issues2Action",
    images: [
      {
        url: "https://issue2action.nrbuilt.live/og.png", // Replace with a real OG image
        width: 1200,
        height: 630,
        alt: "Issues2Action – AI Sprint Planning from GitHub Issues",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Issues2Action – AI Sprint Planning from GitHub Issues",
    description:
      "Convert GitHub issues into structured plans with PRs, tasks, and timelines. A productivity booster for modern developers.",
    creator: "@amanjanwani14", // Optional
    images: ["https://issue2action.nrbuilt.live/og.png"], // Replace with actual image
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}

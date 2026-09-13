import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { getAssetUrl } from "@/lib/utils";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "V36 Suites Athens — Boutique Luxury in the Heart of Athens",
  description:
    "Boutique suites in the heart of Athens, designed for those who want to experience the city differently. A quieter way to experience Athens.",
  keywords: [
    "V36 Suites",
    "Athens boutique hotel",
    "luxury suites Athens",
    "Acropolis hotel",
    "Syntagma Square",
    "boutique luxury Athens",
  ],
  authors: [{ name: "V36 Suites Athens" }],
  icons: {
    icon: [
      { url: getAssetUrl("/favicon.ico"), sizes: "32x32" },
      { url: getAssetUrl("/icon.svg"), type: "image/svg+xml" },
      { url: getAssetUrl("/icon.png"), type: "image/png", sizes: "48x48" },
    ],
    shortcut: getAssetUrl("/favicon.ico"),
    apple: getAssetUrl("/apple-touch-icon.png"),
  },
  openGraph: {
    title: "V36 Suites Athens — Boutique Luxury in the Heart of Athens",
    description:
      "Boutique suites in the heart of Athens, designed for those who want to experience the city differently.",
    url: "https://v36suites.gr",
    siteName: "V36 Suites Athens",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "V36 Suites Athens",
    description:
      "Boutique suites in the heart of Athens, designed for those who want to experience the city differently.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href={getAssetUrl("/favicon.ico")} sizes="any" />
        <link rel="icon" href={getAssetUrl("/icon.svg")} type="image/svg+xml" />
        <link rel="icon" href={getAssetUrl("/icon.png")} type="image/png" sizes="48x48" />
        <link rel="apple-touch-icon" href={getAssetUrl("/apple-touch-icon.png")} />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

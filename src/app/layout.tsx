import type { Metadata } from "next";
import { Inter, Playfair_Display, Alex_Brush } from "next/font/google";
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

const alexBrush = Alex_Brush({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aginteriors.in"),
  title: "AG Interior — Design Beyond Spaces. For a Better You.",
  description:
    "Thoughtfully designed residential and commercial interiors that blend aesthetics, functionality and your unique lifestyle. Chennai based, serving across Tamil Nadu.",
  keywords: [
    "AG Interior",
    "Interior Designers Chennai",
    "Luxury Home Interiors",
    "Modular Kitchens Chennai",
    "Turnkey Interior Solutions",
    "False Ceilings",
    "Wardrobe Design",
  ],
  authors: [{ name: "AG Interior" }],
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
    title: "AG Interior — Design Beyond Spaces. For a Better You.",
    description:
      "Thoughtfully designed residential and commercial interiors that blend aesthetics, functionality and your unique lifestyle.",
    url: "https://aginteriors.in",
    siteName: "AG Interior",
    images: [
      {
        url: getAssetUrl("/images/ag-official-logo-transparent.png"),
        width: 1024,
        height: 1024,
        alt: "AG Interior Official Logo",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AG Interior — Design Beyond Spaces",
    description:
      "Thoughtfully designed residential and commercial interiors that blend aesthetics, functionality and your unique lifestyle.",
    images: [getAssetUrl("/images/ag-official-logo-transparent.png")],
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
        className={`${inter.variable} ${playfair.variable} ${alexBrush.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lokantara.space"),
  title: "Lokantara Space - Space-native compute",
  description:
    "Lokantara Space is building a new compute layer for satellites: radiation-resilient, low-power, low-thermal intelligence for orbit.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml", sizes: "any" }],
    shortcut: "/icon.svg",
  },
  openGraph: {
    title: "Lokantara Space",
    description: "Space-native compute for orbit.",
    url: "https://www.lokantara.space",
    siteName: "Lokantara Space",
    images: [
      {
        url: "https://www.lokantara.space/lokantara-share-preview-space-tight-v2.png",
        width: 1200,
        height: 630,
        alt: "Lokantara Space",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lokantara Space",
    description: "Space-native compute for orbit.",
    images: ["https://www.lokantara.space/lokantara-share-preview-space-tight-v2.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

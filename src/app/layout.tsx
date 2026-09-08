import type { Metadata } from "next";
import { Geist_Mono, Instrument_Serif, Archivo_Black, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "5TH_ROW — Master Command Center",
    template: "%s · 5TH_ROW",
  },
  description: "The complete 5th_row toolkit: control center, guide, and global Supabase backend.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "5TH_ROW — Master Command Center",
    description: "The complete 5th_row toolkit: control center, guide, and global Supabase backend.",
    type: "website",
    siteName: "5TH_ROW",
  },
  twitter: {
    card: "summary",
    title: "5TH_ROW — Master Command Center",
    description: "The complete 5th_row toolkit: control center, guide, and global Supabase backend.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "dark h-full antialiased",
        geistMono.variable,
        archivoBlack.variable,
        instrumentSerif.variable,
        inter.variable,
        "font-sans"
      )}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

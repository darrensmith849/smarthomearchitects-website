import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter, SiteHeader } from "./components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "smarthomearchitects.co.za";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const baseUrl = `${protocol}://${host}`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: "Smart Home Architects — Technology, beautifully resolved",
      template: "%s — Smart Home Architects",
    },
    description:
      "Whole-home technology designed around architecture, atmosphere and the way you live.",
    keywords: [
      "smart home design",
      "home automation",
      "lighting control",
      "architectural technology",
      "Cape Town",
      "Johannesburg",
    ],
    openGraph: {
      title: "Smart Home Architects — Technology, beautifully resolved",
      description: "A home that notices. Never announces.",
      type: "website",
      images: [{ url: `${baseUrl}/og.png`, width: 1200, height: 632, alt: "A home that notices. Never announces." }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Smart Home Architects",
      description: "A home that notices. Never announces.",
      images: [`${baseUrl}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

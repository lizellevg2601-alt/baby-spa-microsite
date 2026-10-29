import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { ClientHeader, ClientFooter } from "@/components/layout/client-header";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Twinkle Toe Love – Baby Wellness Spa",
  description:
    "Premium baby development and sensory studio. Thoughtfully designed sensory play, gentle movement and meaningful bonding for babies and their parents in Nottingham / West Bridgford. Little wonders. Big discoveries.",
  openGraph: {
    title: "Twinkle Toe Love – Baby Wellness Spa",
    description:
      "Premium baby development and sensory studio. Little wonders. Big discoveries.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-warm-ivory text-foreground">
        <SkipLink />
        <ClientHeader />
        <main className="flex-1">{children}</main>
        <ClientFooter />
      </body>
    </html>
  );
}

function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-forest-green focus:ring focus:ring-forest-green rounded-md"
    >
      Skip to main content
    </a>
  );
}

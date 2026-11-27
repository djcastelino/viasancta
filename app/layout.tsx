import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "./pilgrim.css";
import "./scripture.css";
import "./journeys.css";
import Navigation from "./components/Navigation";
import { DarkModeProvider } from "./components/DarkModeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.divinepilgrim.com"),
  title: {
    default: "Divine Pilgrim — Catholic Sacred Pilgrimages, Saints & Doctors",
    template: "%s | Divine Pilgrim",
  },
  description:
    "Explore Eucharistic miracles, sacred architecture, saint mystery trails, Doctors of the Church, and daily Scripture study on Divine Pilgrim.",
  alternates: {
    canonical: "https://www.divinepilgrim.com",
  },
  openGraph: {
    type: "website",
    url: "https://www.divinepilgrim.com",
    siteName: "Divine Pilgrim",
    title: "Divine Pilgrim — Catholic Sacred Pilgrimages, Saints & Doctors",
    description:
      "Explore Eucharistic miracles, sacred architecture, saint mystery trails, Doctors of the Church, and daily Scripture study.",
    images: [
      {
        url: "/feature_graphic.png",
        width: 1024,
        height: 500,
        alt: "Divine Pilgrim — Virtual Sacred Pilgrimages",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Divine Pilgrim — Catholic Sacred Pilgrimages, Saints & Doctors",
    description:
      "Explore Eucharistic miracles, sacred architecture, saint mystery trails, Doctors of the Church, and daily Scripture study.",
    images: ["/feature_graphic.png"],
  },
  other: {
    "p:domain_verify": "bef772ff7e4a0c3f4866147b0994a4c2",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Divine Pilgrim",
  url: "https://www.divinepilgrim.com",
  description:
    "Interactive Catholic pilgrimages, Eucharistic miracles archive, sacred architecture, saint trails, and Doctors of the Church study library.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Y9BMLBXK0T"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Y9BMLBXK0T');
          `}
        </Script>
        <Script
          src="/api/umami/script"
          data-host-url="/api/umami"
          data-website-id="722f5bca-d797-4466-8481-393aa336273b"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors`}
      >
        <DarkModeProvider>
          <Navigation />
          {children}
        </DarkModeProvider>
      </body>
    </html>
  );
}

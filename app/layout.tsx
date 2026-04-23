import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://browngroup.it.com"),
  title: {
    default: "Brown Group | נדל״ן יוקרתי בתל אביב",
    template: "%s | Brown Group",
  },
  description:
    "Brown Group מתמחה בנדל״ן יוקרתי בתל אביב: דירות למכירה, נכסים להשכרה, פנטהאוזים, השקעות וליווי אישי ברמה גבוהה.",
  keywords: [
    "Brown Group",
    "נדל״ן בתל אביב",
    "נדל״ן יוקרתי",
    "דירות למכירה בתל אביב",
    "דירות להשכרה בתל אביב",
    "פנטהאוז תל אביב",
    "תיווך נדל״ן",
    "נכסי יוקרה",
  ],
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "Wa_FcKZ5oUluCkLY4piSlJOtjcWBiW3ZUif5ucfmiNk",
  },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: "https://browngroup.it.com",
    siteName: "Brown Group",
    title: "Brown Group | נדל״ן יוקרתי בתל אביב",
    description:
      "דירות למכירה, נכסים להשכרה, פנטהאוזים והשקעות בתל אביב עם שירות אישי, מדויק ומקצועי.",
    images: [
      {
        url: "/hero/hero-6.jpg",
        width: 1200,
        height: 630,
        alt: "Brown Group Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brown Group | נדל״ן יוקרתי בתל אביב",
    description:
      "דירות למכירה, נכסים להשכרה, פנטהאוזים והשקעות בתל אביב.",
    images: ["/hero/hero-6.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-black">
        {children}
      </body>
    </html>
  );
}
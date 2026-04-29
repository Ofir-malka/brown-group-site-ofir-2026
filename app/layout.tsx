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
default: "קבוצת בראון גרופ | דירות יוקרה בתל אביב",
template: "%s | קבוצת בראון גרופ",
},

applicationName: "בראון גרופ",
 creator: "בראון גרופ",
publisher: "בראון גרופ",

  description:
  "קבוצת בראון גרופ המתמחה בדירות יוקרה להשכרה ולמכירה בתל אביב, פנטהאוזים ונכסי נדל״ן להשקעה עם ליווי אישי ומקצועי.",
  keywords: [
"בראון גרופ",
"בראון גרופ נדלן",
"בראון גרופ נדל״ן",
"Brown Group",
"Brown Group Real Estate",
"בראון גרופ תל אביב",
"בראון גרופ נכסים",
 "Brown Group",
"בראון גרופ",
"נדל״ן בתל אביב",
"נדל״ן יוקרתי",
"דירות למכירה בתל אביב",
"דירות להשכרה בתל אביב",
"פנטהאוז תל אביב",
"תיווך נדל״ן",
"נכסי יוקרה",
],
alternates: {
  canonical: "https://browngroup.it.com",
},

icons: {
  icon: "/favicon.ico",
  shortcut: "/favicon.ico",
  apple: "/icon.png",
},
verification: {
    google: "Wa_FcKZ5oUluCkLY4piSlJOtjcWBiW3ZUif5ucfmiNk",
  },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: "https://browngroup.it.com",
    siteName: "בראון גרופ",
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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": "https://browngroup.it.com/#realestateagent",
  name: "בראון גרופ",
  alternateName: [
    "Brown Group",
    "Brown Group Real Estate",
    "בראון גרופ נדל״ן",
    "בראון גרופ נדלן",
  ],
  url: "https://browngroup.it.com",
  logo: "https://browngroup.it.com/logo.jpg",
  image: "https://browngroup.it.com/logo.jpg",
  description:
    "בראון גרופ הוא משרד תיווך נדל״ן בתל אביב המתמחה בדירות יוקרה להשכרה ולמכירה, פנטהאוזים ונכסים נבחרים.",
  telephone: "+972535994391",
  email: "info@browngroup.co.il",
  address: {
    "@type": "PostalAddress",
    addressLocality: "תל אביב",
    addressCountry: "IL",
  },
  areaServed: [
    {
      "@type": "City",
      name: "תל אביב",
    },
    {
      "@type": "Country",
      name: "ישראל",
    },
  ],
  sameAs: [
    "https://browngroup.it.com",
  ],
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
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(organizationSchema),
    }}
  />
  {children}
</body>
    </html>
  );
}
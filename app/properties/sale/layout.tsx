import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "דירות למכירה בתל אביב | Brown Group",
  description:
    "גלו דירות למכירה בתל אביב עם Brown Group – נכסי יוקרה, פנטהאוזים, דירות חדשות והשקעות נדל״ן עם ליווי אישי מקצועי.",
  openGraph: {
    title: "דירות למכירה בתל אביב | Brown Group",
    description:
      "דירות למכירה בתל אביב עם Brown Group – נכסים יוקרתיים וליווי מקצועי.",
    url: "https://browngroup.it.com/properties/sale",
    siteName: "Brown Group",
    locale: "he_IL",
    type: "website",
  },
};

export default function SaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
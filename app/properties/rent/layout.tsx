import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://browngroup.it.com"),
  title: "דירות להשכרה בתל אביב | נכסי יוקרה להשכרה | Brown Group",
  description:
    "מחפשים דירה להשכרה בתל אביב? Brown Group מציעה דירות יוקרה, פנטהאוזים ונכסים להשכרה באזורים המבוקשים בעיר, עם ליווי אישי ושירות מדויק.",
  alternates: {
    canonical: "https://browngroup.it.com/properties/rent",
  },
  keywords: [
    "דירות להשכרה בתל אביב",
    "נכסים להשכרה תל אביב",
    "פנטהאוז להשכרה תל אביב",
    "נדלן תל אביב להשכרה",
    "דירות יוקרה תל אביב",
  ],
  openGraph: {
    title: "דירות להשכרה בתל אביב | נכסי יוקרה להשכרה | Brown Group",
    description:
      "מחפשים דירה להשכרה בתל אביב? Brown Group מציעה דירות יוקרה, פנטהאוזים ונכסים להשכרה באזורים המבוקשים בעיר, עם ליווי אישי ושירות מדויק.",
    url: "https://browngroup.it.com/properties/rent",
    siteName: "Brown Group",
    locale: "he_IL",
    type: "website",
  },
};

export default function RentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
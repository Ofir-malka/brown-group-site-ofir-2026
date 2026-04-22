import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "דירות להשכרה בתל אביב | Brown Group",
  description:
    "מצאו דירות להשכרה בתל אביב עם Brown Group – נכסים איכותיים, דירות יוקרה, פנטהאוזים וליווי אישי מקצועי.",
  openGraph: {
    title: "דירות להשכרה בתל אביב | Brown Group",
    description:
      "דירות להשכרה בתל אביב עם Brown Group – נכסים איכותיים וליווי מקצועי.",
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
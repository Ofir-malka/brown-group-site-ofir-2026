"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense, useEffect, useMemo, useState } from "react";


const whatsappNumber = "972535994391";

type RentProperty = {
  id: string;
  title: string;
  area: string;
  details: string;
  price: string;
  tag: string;
  description: string;
  image?: string;
  images?: string[];
  features?: string;
image_note?: string;
};

const defaultRentProperties: RentProperty[] = [
  {
    id: "malan-penthouse",
    title: "פנטהאוז יוקרה בכרם התימנים",
    area: "כרם התימנים, תל אביב",
    details: '112 מ"ר בנוי • 3 חדרי שינה • 85 מ"ר מרפסות',
    price: "₪28,000 / חודש",
    tag: "נכס בולט",
    images: [
      "/properties/malan-penthouse/malan-1.jpg",
      "/properties/malan-penthouse/malan-2.jpg",
      "/properties/malan-penthouse/malan-3.jpg",
      "/properties/malan-penthouse/malan-4.jpg",
      "/properties/malan-penthouse/malan-5.jpg",
    ],
    description:
      "פנטהאוז יוקרה יוצא דופן בבניין בוטיק ברמה גבוהה, עם תכנון אדריכלי מוקפד, פרטיות מלאה, מרפסות רחבות ובריכת שחייה פרטית בלב תל אביב.",
  },
  {
    id: "tlv-port-luxury-rent",
    title: "דירת 2 חד׳ יוקרתית עם נוף פתוח לים",
    area: "תל אביב",
    details: '65 מ"ר + מרפסת 12 מ"ר • חניה רובוטית • מרוהטת קומפלט',
    price: "₪14,000 / חודש",
    tag: "להשכרה",
    images: [
      "/properties/tlv-port-luxury-rent/tlv-port-luxury-rent1.jpg",
      "/properties/tlv-port-luxury-rent/tlv-port-luxury-rent2.jpg",
      "/properties/tlv-port-luxury-rent/tlv-port-luxury-rent6.jpg",
      "/properties/tlv-port-luxury-rent/tlv-port-luxury-rent8.jpg",
      "/properties/tlv-port-luxury-rent/tlv-port-luxury-rent14.jpg",
    ],
    description:
      "דירת 2 חדרים יוקרתית עם נוף עוצר נשימה לים, עיצוב אדריכלי מוקפד, פרקט פישבון, מרפסת שמש של 12 מ״ר וחניה רובוטית. הדירה מרוהטת קומפלט ומתאימה לכניסה מיידית — רק להגיע עם מזוודות.",
  },
  {
    id: "dolphin-yafo-rent",
    title: "דירת 3 חדרים יפייפה ומעוצבת ליד נמל יפו",
    area: "רחוב הדולפין, יפו",
    details: '3 חדרים • כ-80 מ"ר + מרפסת שמש • קומה 2 עם מעלית',
    price: "₪12,000 / חודש",
    tag: "להשכרה",
    images: [
      "/properties/dolphin-rent/dolphin-rent1.jpg",
      "/properties/dolphin-rent/dolphin-rent2.jpg",
      "/properties/dolphin-rent/dolphin-rent3.jpg",
      "/properties/dolphin-rent/dolphin-rent4.jpg",
      "/properties/dolphin-rent/dolphin-rent5.jpg",
      "/properties/dolphin-rent/dolphin-rent6.jpg",
      "/properties/dolphin-rent/dolphin-rent7.jpg",
      "/properties/dolphin-rent/dolphin-rent8.jpg",
      "/properties/dolphin-rent/dolphin-rent9.jpg",
      "/properties/dolphin-rent/dolphin-rent10.jpg",
      "/properties/dolphin-rent/dolphin-rent11.jpg",
      "/properties/dolphin-rent/dolphin-rent12.jpg",
      "/properties/dolphin-rent/dolphin-rent13.jpg",
      "/properties/dolphin-rent/dolphin-rent14.jpg",
      "/properties/dolphin-rent/dolphin-rent15.jpg",
    ],
    description:
      "להשכרה ברחוב הדולפין, בקרבת נמל יפו, במרחק הליכה מהים ומשכונת שערי ניקנור. דירת 3 חדרים יפייפה ומעוצבת אדריכלית עד לפרטים הקטנים, כ-80 מ״ר בנוי עם מרפסת שמש הפונה לחזית ורואה ים. מגיעה עם מוצרי חשמל במטבח וארונות קיר, פרקט עץ אמיתי וגימורים ברמה גבוהה מאוד. דירה סופר שקטה, נעימה ומוארת, בקומה 2 עם מעלית, בבניין בוטיק מתוחזק עם קוד בכניסה.",
  },
  {
    id: "yarkon-penthouse-rent",
    title: "פנטהאוז יוקרתי להשכרה ברחוב הירקון",
    area: "רחוב הירקון, תל אביב",
    details: "פנטהאוז • נוף מלא לים • מרוהט קומפלט • בריכת שחייה",
    price: "מחיר גמיש",
    tag: "להשכרה",
    images: [
      "/properties/yarkon-penthouse-rent/yarkon-penthouse-rent2.jpg",
      "/properties/yarkon-penthouse-rent/yarkon-penthouse-rent3.jpg",
      "/properties/yarkon-penthouse-rent/yarkon-penthouse-rent4.jpg",
      "/properties/yarkon-penthouse-rent/yarkon-penthouse-rent5.jpg",
    ],
    description:
      "פנטהאוז ברמה אדריכלית מהגבוהות ביותר, מרוהט קומפלט, עם נוף פתוח ומלא לים ובריכת שחייה, לחוויית מגורים יוקרתית באחד המיקומים המבוקשים בתל אביב.",
  },
  {
    id: "gindi-tlv-rent",
    title: "דירת יוקרה בפרויקט גינדי תל אביב",
    area: "תל אביב",
    details: "4 חדרים • מרפסת גדולה • נוף פתוח • חניה",
    price: "₪22,000 / חודש",
    tag: "יוקרה",
    images: [
      "/properties/gindi-tlv/gindi-tlv1.jpg",
      "/properties/gindi-tlv/gindi-tlv2.jpg",
      "/properties/gindi-tlv/gindi-tlv3.jpg",
      "/properties/gindi-tlv/gindi-tlv4.jpg",
      "/properties/gindi-tlv/gindi-tlv5.jpg",
      "/properties/gindi-tlv/gindi-tlv6.jpg",
      "/properties/gindi-tlv/gindi-tlv7.jpg",
      "/properties/gindi-tlv/gindi-tlv8.jpg",
      "/properties/gindi-tlv/gindi-tlv9.jpg",
      "/properties/gindi-tlv/gindi-tlv10.jpg",
      "/properties/gindi-tlv/gindi-tlv11.jpg",
      "/properties/gindi-tlv/gindi-tlv12.jpg",
      "/properties/gindi-tlv/gindi-tlv13.jpg",
      "/properties/gindi-tlv/gindi-tlv14.jpg",
      "/properties/gindi-tlv/gindi-tlv15.jpg",
    ],
    description:
      "דירת יוקרה מרווחת בפרויקט גינדי המבוקש, עם חללים פתוחים, מטבח מעוצב, מרפסת גדולה, סוויטת הורים מפנקת ורמת גימור גבוהה במיוחד. שילוב מדויק של עיצוב מודרני, נוף פתוח ואווירה יוקרתית בלב תל אביב.",
  },
];

const upcomingCards = [
  {
    id: "upcoming-1",
    title: "נכסים חדשים בקרוב",
    subtitle: "דירות יוקרה ונכסים בלעדיים בדרך לאתר",
  },
  {
    id: "upcoming-2",
    title: "נכסים חדשים בקרוב",
    subtitle: "עוד הזדמנויות איכותיות להשכרה יעלו בקרוב",
  },
  {
    id: "upcoming-3",
    title: "נכסים חדשים בקרוב",
    subtitle: "אנחנו מעדכנים את המאגר עם נכסים נוספים",
  },
];

const propertyHighlights: Record<string, string[]> = {
  "malan-penthouse": [
    "בריכה פרטית",
    "85 מ״ר מרפסות",
    "בניין בוטיק",
    "מיקום מבוקש",
  ],
  "tlv-port-luxury-rent": [
    "נוף פתוח לים",
    "מרפסת 12 מ״ר",
    "חניה רובוטית",
    "מרוהטת קומפלט",
  ],
  "dolphin-yafo-rent": [
    "מרפסת שמש",
    "נוף לים",
    "פרקט עץ אמיתי",
    "בניין בוטיק",
  ],
  "yarkon-penthouse-rent": [
    "נוף מלא לים",
    "בריכת שחייה",
    "מרוהט קומפלט",
    "רמה אדריכלית גבוהה",
  ],
  "gindi-tlv-rent": [
    "נוף פתוח לים",
    "מרפסת גדולה",
    "מטבח יוקרתי",
    "חניה פרטית",
  ],
};

const propertyImageNotes: Record<string, string> = {
  "malan-penthouse": "בריכה פרטית • 85 מ״ר מרפסות",
  "tlv-port-luxury-rent": "נוף פתוח לים • מרוהטת קומפלט • חניה רובוטית",
  "dolphin-yafo-rent": "מרפסת שמש • נוף לים • בניין בוטיק",
  "yarkon-penthouse-rent": "נוף מלא לים • מרוהט קומפלט • בריכה",
  "gindi-tlv-rent": "נוף פתוח • מרפסת גדולה • סטנדרט גבוה",
};

const propertyCardNotes: Record<string, string> = {
  "malan-penthouse":
    "פנטהאוז נדיר עם בריכה פרטית, בניין בוטיק ומיקום מבוקש.",
  "tlv-port-luxury-rent":
    "דירת יוקרה מעוצבת עם נוף פתוח לים, מרפסת שמש וחניה רובוטית.",
  "dolphin-yafo-rent":
    "דירת 3 חדרים מעוצבת אדריכלית עם מרפסת שמש, נוף לים וגימורים ברמה גבוהה.",
  "yarkon-penthouse-rent":
    "פנטהאוז יוקרתי ברחוב הירקון עם נוף מלא לים, בריכה וריהוט מלא.",
  "gindi-tlv-rent":
    "דירת פרימיום בפרויקט גינדי עם נוף פתוח, מרחבים גדולים ועיצוב מודרני יוקרתי.",
};
const parseImageUrls = (value?: string) =>
  value
    ? value
        .split(",")
        .map((url) => url.trim())
        .filter((url) => url.startsWith("http"))
    : [];
function RentPropertiesContent() {
 const searchParams = useSearchParams(); 
 const [rentProperties, setRentProperties] =
  useState<RentProperty[]>(defaultRentProperties);
  const [selectedProperty, setSelectedProperty] = useState<RentProperty | null>(
    null
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeImages, setActiveImages] = useState<Record<string, number>>({});
  const [pausedSliders, setPausedSliders] = useState<Record<string, boolean>>(
    {}
  );
  const [activePopupImage, setActivePopupImage] = useState(0);
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
useEffect(() => {
  const fetchRentProperties = async () => {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/properties?select=*&deal_type=eq.rent&order=created_at.desc`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      }
    );

    const data = await res.json();
    console.log("rent properties from supabase:", data);

   const mapped = Array.isArray(data)
  ? data.map((p) => ({
      id: String(p.id),
      title: p.title || "",
      area: [p.city, p.address].filter(Boolean).join(", "),
      details: p.details || p.description || "",
      description: p.description || "",
      features: p.features || "",
      image_note: p.image_note || "",
      price: p.price || "",
      tag: "להשכרה",
      image: parseImageUrls(p.image_url)[0] || "",
      images: parseImageUrls(p.image_url),
    }))
  : [];
        

setRentProperties([...mapped, ...defaultRentProperties]);
};

fetchRentProperties();
}, []);
  const propertyImagesMap = useMemo(() => {
    return Object.fromEntries(
      rentProperties.map((property) => [
        property.id,
        property.images?.filter(Boolean) || [],
      ])
    ) as Record<string, string[]>;
  }, [rentProperties]);

  useEffect(() => {
    const intervals: ReturnType<typeof setInterval>[] = [];

    rentProperties.forEach((property) => {
      const images = propertyImagesMap[property.id] || [];
      if (images.length <= 1 || pausedSliders[property.id]) return;

      const interval = setInterval(() => {
        setActiveImages((prev) => ({
          ...prev,
          [property.id]: ((prev[property.id] || 0) + 1) % images.length,
        }));
      }, 3200);

      intervals.push(interval);
    });

    return () => {
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, [propertyImagesMap, pausedSliders]);
useEffect(() => {
  const propertyId = searchParams.get("property");
  if (!propertyId) return;

  const timer = setTimeout(() => {
    const property = rentProperties.find((item) => item.id === propertyId);

    if (property) {
      setSelectedProperty(property);
      setActivePopupImage(0);
    }
  }, 0);

  return () => clearTimeout(timer);
}, [searchParams]);
  const popupImages = useMemo(
    () => selectedProperty?.images?.filter(Boolean) || [],
    [selectedProperty]
  );

  useEffect(() => {
    if (!popupImages.length) return;

    const interval = setInterval(() => {
      setActivePopupImage((prev) => (prev + 1) % popupImages.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [popupImages]);

  useEffect(() => {
    if (!selectedProperty && !isMobileMenuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedProperty, isMobileMenuOpen]);

  const nextPopupImage = () => {
    if (!popupImages.length) return;
    setActivePopupImage((prev) => (prev + 1) % popupImages.length);
  };
const schemaData = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Brown Group",
  url: "https://browngroup.it.com",
  areaServed: {
    "@type": "City",
    name: "Tel Aviv",
  },
  description: "דירות להשכרה בתל אביב ונכסי יוקרה להשכרה עם ליווי אישי",
  telephone: "+972-53-599-4391",
};
  const prevPopupImage = () => {
    if (!popupImages.length) return;
    setActivePopupImage(
      (prev) => (prev - 1 + popupImages.length) % popupImages.length
    );
  };

  return (
    <div dir="rtl" className="min-h-screen overflow-x-hidden bg-white text-black">
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
/>
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <Link href="/" className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-neutral-200 bg-white shadow-sm sm:h-16 sm:w-16">
              <img
                src="/logo.jpg"
                alt="Brown Group"
                className="h-8 w-auto object-contain sm:h-11"
              />
            </div>

            <div className="min-w-0 leading-tight">
              <div className="truncate text-[0.92rem] font-semibold tracking-[0.06em] text-black sm:text-[1.05rem] sm:tracking-[0.08em]">
                BROWN GROUP
              </div>
              <div className="mt-1 truncate text-[10px] uppercase tracking-[0.22em] text-neutral-500 sm:text-xs sm:tracking-[0.28em]">
                REAL ESTATE
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className="text-sm font-medium text-neutral-700 transition hover:text-black"
            >
              דף הבית
            </Link>

            <Link
              href="/properties/sale"
              className="text-sm font-medium text-neutral-700 transition hover:text-black"
            >
              נכסים למכירה
            </Link>

            <Link
              href="/properties/rent"
              className="text-sm font-medium text-black"
            >
              נכסים להשכרה
            </Link>

            <Link
              href="/#contact"
              className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-black hover:text-white"
            >
              צור קשר
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-black shadow-sm transition hover:border-[#d9873b] hover:bg-[#fff8f1] md:hidden"
            aria-label="פתח תפריט"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="text-xl leading-none">
              {isMobileMenuOpen ? "×" : "☰"}
            </span>
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
              className="border-t border-black/5 bg-white/95 px-4 py-4 backdrop-blur-xl md:hidden"
            >
              <div className="mx-auto grid max-w-7xl gap-3">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-800 shadow-sm"
                >
                  דף הבית
                </Link>
                <Link
                  href="/properties/sale"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-800 shadow-sm"
                >
                  נכסים למכירה
                </Link>
                <Link
                  href="/properties/rent"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-800 shadow-sm"
                >
                  נכסים להשכרה
                </Link>
                <Link
                  href="/#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-2xl bg-black px-4 py-3 text-center text-sm font-medium text-white shadow-sm"
                >
                  צור קשר
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <motion.div
          className="mx-auto max-w-3xl text-right px-4 lg:mr-0 lg:ml-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="text-sm font-medium uppercase tracking-[0.24em] text-[#d9873b]">
            Properties For Rent
          </div>

   <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:mt-5 sm:text-4xl md:text-6xl">
     דירות להשכרה בתל אביב
       <br />
       ונכסי יוקרה להשכרה
        </h1>

     <p className="mt-5 text-base leading-7 text-neutral-700 sm:mt-6 sm:text-lg sm:leading-8">
       מחפשים דירה להשכרה בתל אביב? Brown Group מציעה דירות יוקרה, פנטהאוזים ונכסים להשכרה באזורים המבוקשים בעיר, עם התאמה אישית, ליווי צמוד ושירות ברמה גבוהה לאורך כל הדרך.
      </p>
        </motion.div>

        <motion.div
          className="mt-8 rounded-[24px] border border-neutral-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:mt-10 sm:rounded-[30px] sm:p-5"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
        >
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-600">
                אזור
              </label>
              <select className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#d9873b]">
                <option>כל תל אביב</option>
                <option>צפון תל אביב</option>
                <option>מרכז תל אביב</option>
                <option>לב העיר</option>
                <option>רמת אביב</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-600">
                סוג נכס
              </label>
              <select className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#d9873b]">
                <option>הכל</option>
                <option>דירה</option>
                <option>פנטהאוז</option>
                <option>משרד</option>
                <option>נכס יוקרה</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-600">
                תקציב חודשי
              </label>
              <select className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#d9873b]">
                <option>ללא הגבלה</option>
                <option>עד ₪10,000</option>
                <option>עד ₪15,000</option>
                <option>עד ₪20,000</option>
                <option>מעל ₪20,000</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-600">
                חדרים
              </label>
              <select className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#d9873b]">
                <option>כל הכמות</option>
                <option>2 חדרים</option>
                <option>3 חדרים</option>
                <option>4 חדרים</option>
                <option>5+ חדרים</option>
              </select>
            </div>

            <div className="flex items-end sm:col-span-2 md:col-span-1">
              <button className="w-full rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1a1a1a]">
                סינון נכסים
              </button>
            </div>
          </div>
        </motion.div>
<div className="mt-10 max-w-3xl text-right">
  <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
    דירות להשכרה בתל אביב עם ליווי אישי
  </h2>
  <p className="mt-3 text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8">
    בין אם אתם מחפשים דירת יוקרה להשכרה בתל אביב, פנטהאוז עם נוף לים או נכס להשכרה באזור מבוקש בעיר, הצוות של Brown Group מסייע לכם למצוא נכס שמתאים לצרכים, לתקציב ולסגנון החיים שלכם.
  </p>
</div>
        <div className="mt-10 grid gap-5 sm:mt-14 sm:gap-7 md:grid-cols-2 xl:grid-cols-3">
          {rentProperties.map((property, index) => {
            const safeImages = propertyImagesMap[property.id] || [];
            const hasImages = safeImages.length > 0;
            const activeIndex = activeImages[property.id] || 0;
            const currentImage = hasImages
              ? safeImages[activeIndex % safeImages.length]
              : null;
            const note = property.image_note || propertyImageNotes[property.id];
            const shortNote = propertyCardNotes[property.id] || property.description;
            const highlights =
            propertyHighlights[property.id] ||
            property.features?.split(",").map((item) => item.trim()).filter(Boolean) ||
            [];

            return (
              <motion.button
                key={property.id}
                type="button"
                onClick={() => {
                  setSelectedProperty(property);
                  setActivePopupImage(0);
                }}
                onMouseEnter={() =>
                  setPausedSliders((prev) => ({ ...prev, [property.id]: true }))
                }
                onMouseLeave={() =>
                  setPausedSliders((prev) => ({ ...prev, [property.id]: false }))
                }
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.07,
                  ease: "easeOut",
                }}
                whileHover={{ y: -10, scale: 1.012 }}
                whileTap={{ scale: 0.988 }}
                className="group relative overflow-hidden rounded-[28px] border border-neutral-200 bg-white text-right shadow-[0_12px_32px_rgba(15,23,42,0.06)] transition-all duration-500 hover:border-[#d9873b]/70 hover:shadow-[0_30px_70px_rgba(15,23,42,0.16)] sm:rounded-[32px]"
              >
                <div className="pointer-events-none absolute inset-0 rounded-[32px] ring-1 ring-transparent transition duration-500 group-hover:ring-[#d9873b]/20" />

                {hasImages ? (
                  <div className="relative h-60 overflow-hidden bg-neutral-100 sm:h-72">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImage}
                        src={currentImage || property.image || safeImages[0]}
                        alt={property.title}
                        className="absolute inset-0 h-full w-full object-cover"
                        initial={{ opacity: 0, scale: 1.08 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.04 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </AnimatePresence>

                    <motion.div
                      className="absolute inset-0"
                      animate={{ scale: 1.06 }}
                      transition={{
                        duration: 8,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />

                    <motion.div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/12 to-black/10" />

                    <motion.div
                      className="absolute -left-1/3 top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0"
                      initial={{ x: "-120%", opacity: 0 }}
                      whileHover={{ x: "260%", opacity: 1 }}
                      transition={{ duration: 0.95, ease: "easeOut" }}
                    />

                    <motion.div
                      className="absolute right-5 top-5 rounded-full border border-white/30 bg-white/90 px-3 py-1 text-xs font-medium text-neutral-800 shadow-sm backdrop-blur-md"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.3 }}
                    >
                      {property.tag}
                    </motion.div>

                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <motion.div
                        className="text-sm font-medium text-white"
                        transition={{ duration: 0.3 }}
                      >
                        {property.area}
                      </motion.div>

                      {note && (
                        <motion.div
                          className="mt-1 text-xs text-white/85"
                          transition={{ duration: 0.3 }}
                        >
                          {note}
                        </motion.div>
                      )}
                    </div>

                    {safeImages.length > 1 && (
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
                        <motion.div
                          key={`${property.id}-${activeIndex}`}
                          className="h-full bg-white/80"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 3.2, ease: "linear" }}
                        />
                      </div>
                    )}
                  </div>
                ) : null}

                <div className="p-5 sm:p-6">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="inline-flex rounded-full border border-[#f1d0aa] bg-[#fff6ee] px-3 py-1 text-xs font-medium text-[#b96b24]">
                      {property.area}
                    </div>

                    <div className="shrink-0 text-xs text-neutral-400 transition duration-300 group-hover:text-neutral-600">
                      Brown Group
                    </div>
                  </div>

                  <motion.h3
                    className="text-xl font-semibold tracking-tight sm:text-2xl"
                    transition={{ duration: 0.3 }}
                  >
                    {property.title}
                  </motion.h3>

                  <p className="mt-3 text-sm leading-7 text-neutral-500">
                    {property.details}
                  </p>

                  {shortNote && (
                    <p className="mt-3 text-sm leading-6 text-neutral-600">
                      {shortNote}
                    </p>
                  )}

                  {highlights.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {highlights.slice(0, 4).map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-700 transition duration-300 group-hover:border-[#efd4b4] group-hover:bg-[#fff8f1]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-neutral-100 pt-5">
                    <span className="text-xl font-semibold tracking-tight transition duration-300 group-hover:text-black sm:text-2xl">
                      {property.price}
                    </span>

                    <motion.span
                      className="shrink-0 rounded-2xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 transition-all duration-300 group-hover:border-[#d9873b] group-hover:bg-[#fff8f1] group-hover:text-black"
                      whileHover={{ x: -2 }}
                    >
                      לפרטים
                    </motion.span>
                  </div>
                </div>
              </motion.button>
            );
          })}

          {upcomingCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: (rentProperties.length + index) * 0.07,
                ease: "easeOut",
              }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="group relative overflow-hidden rounded-[28px] border border-dashed border-neutral-300 bg-white text-right shadow-[0_12px_32px_rgba(15,23,42,0.04)] transition-all duration-500 hover:border-[#d9873b]/60 hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)] sm:rounded-[32px]"
            >
              <div className="relative h-60 overflow-hidden bg-gradient-to-br from-neutral-100 via-[#f8f2eb] to-[#fff6ea] sm:h-72">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.95),transparent_35%)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                <div className="absolute right-5 top-5 rounded-full border border-neutral-200 bg-white/90 px-3 py-1 text-xs font-medium text-neutral-700 shadow-sm backdrop-blur-md">
                  בקרוב
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
                  <div className="rounded-full border border-[#efd4b4] bg-white/80 px-4 py-2 text-xs font-medium tracking-[0.18em] text-[#b96b24] backdrop-blur-sm">
                    BROWN GROUP
                  </div>
                  <h3 className="mt-6 text-3xl font-semibold tracking-tight text-neutral-900">
                    נכסים חדשים בקרוב
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-7 text-neutral-600">
                    מאגר הנכסים שלנו מתעדכן באופן שוטף עם דירות יוקרה ונכסים
                    בלעדיים נוספים.
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="mb-3 flex items-center justify-between">
                  <div className="inline-flex rounded-full border border-[#f1d0aa] bg-[#fff6ee] px-3 py-1 text-xs font-medium text-[#b96b24]">
                    עדכון בקרוב
                  </div>

                  <div className="text-xs text-neutral-400 transition duration-300 group-hover:text-neutral-600">
                    Brown Group
                  </div>
                </div>

                <h3 className="text-2xl font-semibold tracking-tight">
                  {card.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-neutral-500">
                  {card.subtitle}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-700">
                    דירות יוקרה
                  </span>
                  <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-700">
                    מיקומים נבחרים
                  </span>
                  <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-700">
                    נכסים בלעדיים
                  </span>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-5">
                  <span className="text-base font-medium text-neutral-500">
                    פרסום בקרוב
                  </span>

                  <a
                 href="/#contact"
                 className="rounded-2xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 transition-all duration-300 group-hover:border-[#d9873b] group-hover:bg-[#fff8f1] group-hover:text-black"
                  >
                 הישארו מעודכנים
                 </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/55 px-3 py-4 backdrop-blur-sm sm:px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedProperty(null)}
          >
            <motion.div
              className="relative max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/20 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.25)] sm:rounded-[36px]"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedProperty(null)}
                className="absolute left-3 top-3 z-20 rounded-full bg-black px-3 py-2 text-xs text-white transition hover:bg-[#1a1a1a] sm:left-5 sm:top-5 sm:px-4 sm:py-2 sm:text-sm"
              >
                סגור
              </button>

              <div className="grid max-h-[92vh] overflow-y-auto md:grid-cols-2">
                <div className="relative min-h-[280px] overflow-hidden bg-gradient-to-br from-neutral-100 via-[#f5ede6] to-[#ffe8cc] sm:min-h-[360px]">
                  {popupImages.length > 0 && (
                    <>
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={popupImages[activePopupImage % popupImages.length]}
                          src={popupImages[activePopupImage % popupImages.length]}
                          alt={selectedProperty.title}
                          className="absolute inset-0 h-full w-full object-cover"
                          initial={{ opacity: 0, scale: 1.06 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.03 }}
                          transition={{ duration: 0.75, ease: "easeOut" }}
                        />
                      </AnimatePresence>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />

                      {popupImages.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={prevPopupImage}
                            className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-lg text-black shadow-md backdrop-blur transition hover:bg-white sm:right-4 sm:h-11 sm:w-11"
                          >
                            ›
                          </button>

                          <button
                            type="button"
                            onClick={nextPopupImage}
                            className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-lg text-black shadow-md backdrop-blur transition hover:bg-white sm:left-4 sm:h-11 sm:w-11"
                          >
                            ‹
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>

                <div className="p-5 sm:p-8">
                  <div className="inline-flex rounded-full border border-[#f1d0aa] bg-[#fff6ee] px-3 py-1 text-xs font-medium text-[#b96b24]">
                    {selectedProperty.tag}
                  </div>

                  <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight sm:mt-5 sm:text-3xl">
                    {selectedProperty.title}
                  </h2>

                  <div className="mt-3 text-sm text-neutral-500">
                    {selectedProperty.area}
                  </div>

                  <div className="mt-5 rounded-2xl bg-[#faf7f3] p-4 text-sm leading-7 text-neutral-700 sm:mt-6">
                    {selectedProperty.details}
                  </div>

                  {(
                 propertyHighlights[selectedProperty.id] ||
                 selectedProperty.features?.split(",").map((item) => item.trim()).filter(Boolean) ||
                   []
                  ).length > 0 && (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                   {(
                   propertyHighlights[selectedProperty.id] ||
                   selectedProperty.features?.split(",").map((item) => item.trim()).filter(Boolean) ||
                    []
                  ).map((item) => (
                    <div
                    key={item}
                   className="rounded-2xl border border-neutral-200 bg-white p-4 text-sm text-neutral-700"
                    >
                    {item}
                   </div>
                   ))}
                    </div>
                   )}
     
                  <p className="mt-5 text-sm leading-7 text-neutral-700 sm:mt-6 sm:text-base sm:leading-8">
                    {selectedProperty.description}
                  </p>

                  <div className="mt-6 text-2xl font-semibold tracking-tight sm:mt-8 sm:text-3xl">
                    {selectedProperty.price}
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                        `היי Brown Group, אני מעוניין בנכס להשכרה: ${selectedProperty.title}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-2xl bg-black px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-[#1a1a1a]"
                    >
                      שליחה בוואטסאפ
                    </a>

                    <Link
                      href="/#contact"
                      className="rounded-2xl border border-neutral-300 px-5 py-3 text-center text-sm font-medium text-neutral-800 transition hover:border-[#d9873b] hover:bg-[#fff8f1]"
                    >
                      השאירו פרטים
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="border-t border-neutral-200 bg-[#faf8f5]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-14 md:grid-cols-4 md:gap-10">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-200 bg-white shadow-sm">
                <img
                  src="/logo.jpg"
                  alt="Brown Group"
                  className="h-8 w-auto object-contain"
                />
              </div>

              <div>
                <div className="text-sm font-semibold tracking-[0.08em] text-black">
                  BROWN GROUP
                </div>
                <div className="text-[11px] uppercase tracking-[0.28em] text-neutral-500">
                  Real Estate
                </div>
              </div>
            </div>

            <p className="mt-4 max-w-xs text-sm leading-7 text-neutral-600">
              משרד תיווך יוקרתי בתל אביב המתמחה בדירות, נכסי יוקרה, משרדים
              והשקעות, עם ליווי אישי ושירות ברמה גבוהה.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-black">ניווט</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-neutral-600">
              <Link href="/" className="transition hover:text-black">
                דף הבית
              </Link>
              <Link
                href="/properties/sale"
                className="transition hover:text-black"
              >
                נכסים למכירה
              </Link>
              <Link
                href="/properties/rent"
                className="transition hover:text-black"
              >
                נכסים להשכרה
              </Link>
              <Link href="/#contact" className="transition hover:text-black">
                צור קשר
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-black">אזורי פעילות</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-neutral-600">
              <span>תל אביב</span>
              <span>צפון תל אביב</span>
              <span>מרכז העיר</span>
              <span>רמת אביב</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-black">יצירת קשר</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-neutral-600">
              <a
                href="tel:+972535994391"
                className="transition hover:text-black"
              >
                053-599-4391
              </a>
              <a
                href="mailto:info@browngroup.co.il"
                className="transition hover:text-black"
              >
                info@browngroup.co.il
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-black"
              >
                וואטסאפ
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-200">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-neutral-500 sm:px-6 md:flex-row md:items-center md:justify-between">
            <span>© 2026 Brown Group. כל הזכויות שמורות.</span>
            <span>עיצוב נקי, יוקרתי ומותאם לנדל״ן בתל אביב.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default function RentPropertiesPage() {
  return (
    <Suspense fallback={null}>
      <RentPropertiesContent />
    </Suspense>
  );
}
"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { supabase } from "@/lib/supabase";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

type FeaturedProperty = {
  id: string;
  title: string;
  area: string;
  details: string;
  price: string;
  tag: string;
  description: string;
  type: "sale" | "rent";
  href: string;
  images: string[];
};

const whatsappNumber = "972535994391";

const featuredProperties: FeaturedProperty[] = [
  {
    id: "dorianov-tlv",
    title: "דירת 3.5 חדרים בלב תל אביב",
    area: "רחוב דוריאנוב, לב תל אביב",
    details: '89 מ"ר בנוי • 6 מ"ר מרפסת • קומה 2 • מעלית • חניה • מחסן',
    price: "₪6,400,000",
    tag: "למכירה",
    type: "sale",
    href: "/properties/sale",
    images: [
      "/properties/dorianov-tlv/dorianov-1.jpg",
      "/properties/dorianov-tlv/dorianov-4.jpg",
      "/properties/dorianov-tlv/dorianov-3.jpg",
      "/properties/dorianov-tlv/dorianov-7.jpg",
    ],
    description:
      "דירת 3.5 חדרים מתוכננת היטב בבניין בוטיק חדש בלב תל אביב, עם חניה רובוטית פרטית, מחסן, מרפסת שמש וחוויית מגורים מדויקת בפריים לוקיישן.",
  },
  {
    id: "malan-penthouse",
    title: "פנטהאוז יוקרה בכרם התימנים",
    area: "כרם התימנים, תל אביב",
    details: '112 מ"ר בנוי • 3 חדרי שינה • 85 מ"ר מרפסות',
    price: "₪28,000 / חודש",
    tag: "נכס בולט",
    type: "rent",
    href: "/properties/rent",
    images: [
      "/properties/malan-penthouse/malan-1.jpg",
      "/properties/malan-penthouse/malan-2.jpg",
      "/properties/malan-penthouse/malan-3.jpg",
      "/properties/malan-penthouse/malan-4.jpg",
      "/properties/malan-penthouse/malan-5.jpg",
    ],
    description:
      "פנטהאוז יוקרה יוצא דופן עם בריכה פרטית, מרפסות רחבות, פרטיות מלאה ותכנון אדריכלי מוקפד — בלב אחד האזורים המבוקשים בתל אביב.",
  },
  {
    id: "gindi-tlv-rent",
    title: "דירת יוקרה בפרויקט גינדי תל אביב",
    area: "תל אביב",
    details: "4 חדרים • מרפסת גדולה • נוף פתוח • חניה",
    price: "₪22,000 / חודש",
    tag: "יוקרה",
    type: "rent",
    href: "/properties/rent",
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
      "דירת פרימיום בפרויקט גינדי עם חללים גדולים, מטבח מעוצב, מרפסת מרשימה, נוף פתוח ורמת גימור גבוהה מאוד בלב תל אביב.",
  },
];

const featuredHighlights: Record<string, string[]> = {
  "dorianov-tlv": ["בניין בוטיק", "מרפסת שמש", "חניה פרטית", "מחסן"],
  "malan-penthouse": [
    "בריכה פרטית",
    "85 מ״ר מרפסות",
    "פרטיות מלאה",
    "נכס בולט",
  ],
  "gindi-tlv-rent": ["נוף פתוח", "מרפסת גדולה", "מטבח יוקרתי", "חניה פרטית"],
};

const featuredImageNotes: Record<string, string> = {
  "dorianov-tlv": "בניין בוטיק חדש • מרפסת שמש • חניה ומחסן",
  "malan-penthouse": "בריכה פרטית • 85 מ״ר מרפסות • סטנדרט גבוה",
  "gindi-tlv-rent": "נוף פתוח • מרפסת גדולה • פרויקט יוקרתי",
};

const revealUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65, ease: "easeOut" as const },
};
const heroRentProperties: FeaturedProperty[] = [
  {
    id: "malan-penthouse",
    title: "פנטהאוז יוקרה בכרם התימנים",
    area: "כרם התימנים, תל אביב",
    details: '112 מ"ר בנוי • 3 חדרי שינה • 85 מ"ר מרפסות',
    price: "₪28,000 / חודש",
    tag: "נכס בולט",
    type: "rent",
    href: "/properties/rent?property=malan-penthouse",
    images: [
      "/properties/malan-penthouse/malan-1.jpg",
      "/properties/malan-penthouse/malan-2.jpg",
      "/properties/malan-penthouse/malan-3.jpg",
      "/properties/malan-penthouse/malan-4.jpg",
      "/properties/malan-penthouse/malan-5.jpg",
    ],
    description:
      "פנטהאוז יוקרה יוצא דופן עם בריכה פרטית, מרפסות רחבות, פרטיות מלאה ותכנון אדריכלי מוקפד — בלב אחד האזורים המבוקשים בתל אביב.",
  },
  {
    id: "tlv-port-luxury-rent",
    title: "דירת 2 חד׳ יוקרתית עם נוף פתוח לים",
    area: "תל אביב",
    details: '65 מ"ר + מרפסת 12 מ"ר • חניה רובוטית • מרוהטת קומפלט',
    price: "₪14,000 / חודש",
    tag: "להשכרה",
    type: "rent",
    href: "/properties/rent?property=tlv-port-luxury-rent",
    images: [
      "/properties/tlv-port-luxury-rent/tlv-port-luxury-rent1.jpg",
      "/properties/tlv-port-luxury-rent/tlv-port-luxury-rent2.jpg",
      "/properties/tlv-port-luxury-rent/tlv-port-luxury-rent6.jpg",
      "/properties/tlv-port-luxury-rent/tlv-port-luxury-rent8.jpg",
      "/properties/tlv-port-luxury-rent/tlv-port-luxury-rent14.jpg",
    ],
    description:
      "דירת 2 חדרים יוקרתית עם נוף עוצר נשימה לים, עיצוב אדריכלי מוקפד, מרפסת שמש של 12 מ״ר וחניה רובוטית.",
  },
  {
    id: "dolphin-yafo-rent",
    title: "דירת 3 חדרים מעוצבת ליד נמל יפו",
    area: "רחוב הדולפין, יפו",
    details: '3 חדרים • כ-80 מ"ר + מרפסת שמש • קומה 2 עם מעלית',
    price: "₪12,000 / חודש",
    tag: "להשכרה",
    type: "rent",
    href: "/properties/rent?property=dolphin-yafo-rent",
    images: [
      "/properties/dolphin-rent/dolphin-rent1.jpg",
      "/properties/dolphin-rent/dolphin-rent2.jpg",
      "/properties/dolphin-rent/dolphin-rent3.jpg",
      "/properties/dolphin-rent/dolphin-rent4.jpg",
      "/properties/dolphin-rent/dolphin-rent5.jpg",
    ],
    description:
      "דירת 3 חדרים יפייפה ומעוצבת אדריכלית עם מרפסת שמש, נוף לים וגימורים ברמה גבוהה מאוד.",
  },
  {
    id: "yarkon-penthouse-rent",
    title: "פנטהאוז יוקרתי להשכרה ברחוב הירקון",
    area: "רחוב הירקון, תל אביב",
    details: "פנטהאוז • נוף מלא לים • מרוהט קומפלט • בריכת שחייה",
    price: "מחיר גמיש",
    tag: "להשכרה",
    type: "rent",
    href: "/properties/rent?property=yarkon-penthouse-rent",
    images: [
      "/properties/yarkon-penthouse-rent/yarkon-penthouse-rent2.jpg",
      "/properties/yarkon-penthouse-rent/yarkon-penthouse-rent3.jpg",
      "/properties/yarkon-penthouse-rent/yarkon-penthouse-rent4.jpg",
      "/properties/yarkon-penthouse-rent/yarkon-penthouse-rent5.jpg",
    ],
    description:
      "פנטהאוז ברמה אדריכלית גבוהה עם נוף פתוח ומלא לים, בריכת שחייה וריהוט מלא.",
  },
  {
    id: "gindi-tlv-rent",
    title: "דירת יוקרה בפרויקט גינדי תל אביב",
    area: "תל אביב",
    details: "4 חדרים • מרפסת גדולה • נוף פתוח • חניה",
    price: "₪22,000 / חודש",
    tag: "יוקרה",
    type: "rent",
    href: "/properties/rent?property=gindi-tlv-rent",
    images: [
      "/properties/gindi-tlv/gindi-tlv1.jpg",
      "/properties/gindi-tlv/gindi-tlv2.jpg",
      "/properties/gindi-tlv/gindi-tlv3.jpg",
      "/properties/gindi-tlv/gindi-tlv4.jpg",
      "/properties/gindi-tlv/gindi-tlv5.jpg",
    ],
    description:
      "דירת פרימיום בפרויקט גינדי עם חללים גדולים, מטבח מעוצב, מרפסת מרשימה ונוף פתוח.",
  },
];
export const metadata = {
  metadataBase: new URL("https://browngroup.it.com"),
  alternates: {
    canonical: "/",
  },
};
export default function RealEstateAIWebsite() {
  const shouldReduceMotion = useReducedMotion();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: 'היי, אני יועץ ה-AI של Brown Group. אפשר לכתוב לי למשל: "אני מחפש דירת 4 חדרים בתל אביב", "אני מחפש משרד להשקעה" או "אני רוצה נכס יוקרה".',
    },
  ]);

  const [activeHeroImage, setActiveHeroImage] = useState(0);
  const [activeHeroProperty, setActiveHeroProperty] = useState(0);
  const [selectedProperty, setSelectedProperty] =
    useState<FeaturedProperty | null>(null);
  const [activeImages, setActiveImages] = useState<Record<string, number>>({});
  const [pausedSliders, setPausedSliders] = useState<Record<string, boolean>>(
    {}
  );
  const [activePopupImage, setActivePopupImage] = useState(0);

  const heroImages = [
    "/hero/hero-6.jpg",
    "/hero/hero-2.jpg",
    "/hero/hero-3.jpg",
    "/hero/hero-7.jpg",
    "/hero/hero-5.jpg",
  ];

  const aiBlocks = [
    {
      name: "AI לשיווק",
      text: "יצירת מודעות, כותרות ותיאורי נכסים באופן אוטומטי לרשתות חברתיות, דפי נחיתה וקמפיינים.",
    },
    {
      name: "AI לשירות לקוחות",
      text: "מענה מהיר, סינון ראשוני של לקוחות, תיאום פגישות ושליחת נכסים רלוונטיים בזמן אמת.",
    },
    {
      name: "AI לניתוח נתונים",
      text: "ניתוח מגמות מחירים, אזורים מבוקשים, סוגי נכסים והעדפות משתמשים לקבלת החלטות טובות יותר.",
    },
    {
      name: "AI להצגת נכסים",
      text: "התאמה אישית של המלצות, הצגת נכסים דומים ויצירת חוויית גלישה חכמה ומדויקת יותר.",
    },
  ];

  const propertyImagesMap = useMemo(() => {
    return Object.fromEntries(
      featuredProperties.map((property) => [property.id, property.images || []])
    ) as Record<string, string[]>;
  }, []);

  useEffect(() => {
    if (!heroImages.length || shouldReduceMotion) return;

    const interval = setInterval(() => {
      setActiveHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [heroImages.length, shouldReduceMotion]);
useEffect(() => {
  if (!heroRentProperties.length || shouldReduceMotion) return;

  const interval = setInterval(() => {
    setActiveHeroProperty((prev) => (prev + 1) % heroRentProperties.length);
    setActivePopupImage(0);
  }, 12000);

  return () => clearInterval(interval);
}, [shouldReduceMotion]);

useEffect(() => {
  const activeProperty = heroRentProperties[activeHeroProperty];
  if (!activeProperty?.images?.length || shouldReduceMotion) return;

  const interval = setInterval(() => {
    setActivePopupImage((prev) => (prev + 1) % activeProperty.images.length);
  }, 6500);

  return () => clearInterval(interval);
}, [activeHeroProperty, shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const intervals: ReturnType<typeof setInterval>[] = [];

    featuredProperties.forEach((property) => {
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
  }, [propertyImagesMap, pausedSliders, shouldReduceMotion]);

  const popupImages = useMemo(
    () => selectedProperty?.images?.filter(Boolean) || [],
    [selectedProperty]
  );

  useEffect(() => {
    if (!popupImages.length || shouldReduceMotion) return;

    const interval = setInterval(() => {
      setActivePopupImage((prev) => (prev + 1) % popupImages.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [popupImages, shouldReduceMotion]);

  useEffect(() => {
  const isMobile = window.innerWidth < 768;

  if ((!selectedProperty && !isMobileMenuOpen) || !isMobile) return;

  const originalBodyOverflow = document.body.style.overflow;
  const originalHtmlOverflow = document.documentElement.style.overflow;

  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = originalBodyOverflow || "";
    document.documentElement.style.overflow = originalHtmlOverflow || "";
  };
}, [selectedProperty, isMobileMenuOpen]);

  const nextPopupImage = () => {
    if (!popupImages.length) return;
    setActivePopupImage((prev) => (prev + 1) % popupImages.length);
  };

  const prevPopupImage = () => {
    if (!popupImages.length) return;
    setActivePopupImage(
      (prev) => (prev - 1 + popupImages.length) % popupImages.length
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleWhatsAppSubmit = async () => {
const res = await fetch("/api/leads", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: formData.fullName,
    phone: formData.phone,
    email: formData.email,
    message: formData.message,
  }),
});

if (!res.ok) {
  const data = await res.json().catch(() => ({}));
  console.error("Lead API error:", data);
  alert("הייתה בעיה בשמירת הפרטים. נסו שוב.");
  return;
}

  const text = `היי Brown Group,
קיבלתי פנייה חדשה מהאתר:

שם מלא: ${formData.fullName || "-"}
טלפון: ${formData.phone || "-"}
אימייל: ${formData.email || "-"}
הודעה: ${formData.message || "-"}`;

  const encodedText = encodeURIComponent(text);
  const url = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
  window.open(url, "_blank", "noopener,noreferrer");

  setFormData({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });
};

  const sendChatMessage = async () => {
    const trimmed = chatInput.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      role: "user",
      text: trimmed,
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmed }),
      });

      const text = await res.text();
      let data: { reply?: string } = {};

      try {
        data = JSON.parse(text);
      } catch {
        data = {
          reply: "השרת לא החזיר JSON תקין. בדוק את route.ts ואת הטרמינל.",
        };
      }

      const assistantMessage: ChatMessage = {
        role: "assistant",
        text:
          data.reply ||
          "לא התקבלה תשובה מהשרת. בדוק את החיבור ל-AI ונסה שוב.",
      };

      setChatMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);

      const assistantMessage: ChatMessage = {
        role: "assistant",
        text: "יש כרגע בעיה זמנית בחיבור ל-AI. נסה שוב בעוד רגע.",
      };

      setChatMessages((prev) => [...prev, assistantMessage]);
    }
  };
  const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
  return (
    <div dir="rtl" className="min-h-screen overflow-x-hidden bg-white text-black">
      <h1 className="sr-only">
  קבוצת בראון גרופ נדל״ן בתל אביב - דירות למכירה ולהשכרה
</h1>
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-xl">
  <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
    <Link
      href="/"
      className="flex min-w-0 max-w-[calc(100%-64px)] items-center gap-3 sm:max-w-none sm:gap-4"
    >
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
          Real Estate
        </div>
      </div>
    </Link>

    <nav className="hidden items-center gap-3 md:flex">
      <a
        href="#about"
        className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-transparent bg-white/70 px-4 py-2.5 text-sm font-medium text-neutral-700 shadow-[0_4px_14px_rgba(15,23,42,0.04)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d9873b]/40 hover:bg-white hover:text-black hover:shadow-[0_14px_30px_rgba(217,135,59,0.10)]"
      >
        <span className="relative z-10">אודות</span>
        <span className="absolute inset-x-3 bottom-1 h-px origin-right scale-x-0 bg-[#d9873b] transition-transform duration-300 group-hover:scale-x-100" />
      </a>

      <a
        href="#ai"
        className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-transparent bg-white/70 px-4 py-2.5 text-sm font-medium text-neutral-700 shadow-[0_4px_14px_rgba(15,23,42,0.04)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d9873b]/40 hover:bg-white hover:text-black hover:shadow-[0_14px_30px_rgba(217,135,59,0.10)]"
      >
        <span className="relative z-10">פתרונות AI</span>
        <span className="absolute inset-x-3 bottom-1 h-px origin-right scale-x-0 bg-[#d9873b] transition-transform duration-300 group-hover:scale-x-100" />
      </a>

      <Link
        href="/properties/sale"
        className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-transparent bg-white/70 px-4 py-2.5 text-sm font-medium text-neutral-700 shadow-[0_4px_14px_rgba(15,23,42,0.04)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d9873b]/40 hover:bg-white hover:text-black hover:shadow-[0_14px_30px_rgba(217,135,59,0.10)]"
      >
        <span className="relative z-10">נכסים למכירה</span>
        <span className="absolute inset-x-3 bottom-1 h-px origin-right scale-x-0 bg-[#d9873b] transition-transform duration-300 group-hover:scale-x-100" />
      </Link>

      <Link
        href="/properties/rent"
        className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-transparent bg-white/70 px-4 py-2.5 text-sm font-medium text-neutral-700 shadow-[0_4px_14px_rgba(15,23,42,0.04)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d9873b]/40 hover:bg-white hover:text-black hover:shadow-[0_14px_30px_rgba(217,135,59,0.10)]"
      >
        <span className="relative z-10">נכסים להשכרה</span>
        <span className="absolute inset-x-3 bottom-1 h-px origin-right scale-x-0 bg-[#d9873b] transition-transform duration-300 group-hover:scale-x-100" />
      </Link>

<Link
  href="/apartments-tel-aviv"
  className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-transparent bg-white/70 px-4 py-2.5 text-sm font-medium text-neutral-800 shadow-sm transition hover:border-[#d9873b]/40 hover:bg-white"
>
  <span className="relative z-10">דירות למכירה בתל אביב</span>
  <span className="absolute inset-x-3 bottom-1 h-px origin-right scale-x-0 bg-[#d9873b] transition-transform duration-300 group-hover:scale-x-100" />
</Link>

      <a
        href="#contact"
        className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-transparent bg-white/70 px-4 py-2.5 text-sm font-medium text-neutral-700 shadow-[0_4px_14px_rgba(15,23,42,0.04)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d9873b]/40 hover:bg-white hover:text-black hover:shadow-[0_14px_30px_rgba(217,135,59,0.10)]"
      >
        <span className="relative z-10">צור קשר</span>
        <span className="absolute inset-x-3 bottom-1 h-px origin-right scale-x-0 bg-[#d9873b] transition-transform duration-300 group-hover:scale-x-100" />
      </a>
    </nav>

    <div className="hidden md:block">
      <a
        href="#contact"
        className="inline-flex items-center gap-3 rounded-2xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d9873b] hover:bg-[#fff8f1] hover:shadow-[0_16px_40px_rgba(217,135,59,0.12)]"
      >
        <span>פגישת ייעוץ</span>
        <span>←</span>
      </a>
    </div>

    <button
      type="button"
      onClick={() => setIsMobileMenuOpen((prev) => !prev)}
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-black shadow-sm transition hover:border-[#d9873b] hover:bg-[#fff8f1] md:hidden"
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
          <a
            href="#about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-800 shadow-sm"
          >
            אודות
          </a>
          <a
            href="#ai"
            onClick={() => setIsMobileMenuOpen(false)}
            className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-800 shadow-sm"
          >
            פתרונות AI
          </a>
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
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="rounded-2xl bg-black px-4 py-3 text-center text-sm font-medium text-white shadow-sm"
          >
            פגישת ייעוץ
          </a>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</header>

      <section className="relative min-h-[100svh] overflow-hidden bg-black md:min-h-[92vh]">
        <div className="absolute inset-0 bg-[#f8f8f8]">
          <AnimatePresence mode="wait">
            <motion.img
              key={heroImages[activeHeroImage]}
              src={heroImages[activeHeroImage]}
              alt="Brown Group Hero"
              className="absolute inset-0 h-full w-full object-cover"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? {} : { opacity: 0, scale: 1.02 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-l from-black/35 via-black/20 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/5" />
        </div>

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute right-[8%] top-[18%] h-[340px] w-[340px] rounded-full bg-[#d9873b]/20 blur-3xl"
            animate={
              shouldReduceMotion
                ? undefined
                : { y: [0, -20, 0], x: [0, 12, 0] }
            }
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-[8%] bottom-[12%] h-[280px] w-[280px] rounded-full bg-white/10 blur-3xl"
            animate={
              shouldReduceMotion
                ? undefined
                : { y: [0, 18, 0], x: [0, -10, 0] }
            }
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-14 md:min-h-[92vh] md:grid-cols-2 md:items-center md:gap-12 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            <div className="mb-4 inline-flex w-fit max-w-full rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] text-white/90 shadow-sm backdrop-blur sm:mb-5 sm:px-4 sm:text-sm">
              Brown Group • תל אביב • נדל״ן יוקרתי
            </div>

            <h1 className="max-w-3xl text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-7xl">
  בראון גרופ נדל״ן בתל אביב
  <br />
  דירות יוקרה להשכרה
  <br />
  ולמכירה
</h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:mt-7 sm:text-lg md:text-xl">
              Brown Group מציגה דירות יוקרה, פנטהאוזים, נכסים להשכרה והזדמנויות
              השקעה נבחרות בתל אביב — עם שירות אישי, נראות ברמה גבוהה וגישה
              מדויקת לכל עסקה.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
              <a
                href="#contact"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-6 py-3 text-sm font-medium text-black shadow-[0_14px_34px_rgba(255,255,255,0.16)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#f5e6d6] sm:w-auto sm:px-7 sm:py-3.5"
              >
                <span>קבעו פגישת ייעוץ</span>
                <span className="transition-transform duration-300 group-hover:-translate-x-1">
                  ←
                </span>
              </a>

              <a
                href="#listings"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#d9873b] hover:bg-white/15 sm:w-auto sm:px-7 sm:py-3.5"
              >
                <span>צפו בנכסים נבחרים</span>
                <span className="transition-transform duration-300 group-hover:-translate-x-1">
                  ←
                </span>
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2 sm:mt-10 sm:gap-3">
              {heroImages.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 sm:h-2.5 ${
                    index === activeHeroImage
                      ? "w-8 bg-[#d9873b] sm:w-9"
                      : "w-2 bg-white/45 sm:w-2.5"
                  }`}
                />
              ))}
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-1 gap-3 sm:mt-12 sm:gap-4 sm:grid-cols-3">
              {[
                {
                  title: "קנייה ומכירה",
                  text: "ליווי מלא לעסקאות נדל״ן מהשלב הראשון ועד הסגירה",
                },
                {
                  title: "השכרה וניהול",
                  text: "איתור שוכרים איכותיים וניהול נכסים בראש שקט",
                },
                {
                  title: "24/7",
                  text: "זמינות מלאה לכל לקוח, בכל זמן",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group rounded-[26px] border border-white/10 bg-white/10 p-5 text-white shadow-[0_10px_30px_rgba(15,23,42,0.18)] backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:border-[#d9873b] hover:shadow-[0_20px_50px_rgba(15,23,42,0.28)] sm:rounded-[30px] sm:p-6"
                >
                  <div className="mb-3 h-1.5 w-8 rounded-full bg-[#d9873b] transition-all duration-300 group-hover:w-14 sm:mb-4 sm:w-10 sm:group-hover:w-16" />
                  <div className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {item.title}
                  </div>
                  <div className="mt-2 text-xs leading-6 text-white/70 sm:mt-3 sm:text-sm sm:leading-7">
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
  initial={{ opacity: 0, y: 34 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
  className="relative"
>
  <AnimatePresence mode="wait">
    <motion.button
      key={heroRentProperties[activeHeroProperty].id}
      type="button"
      onClick={() => {
        setSelectedProperty(heroRentProperties[activeHeroProperty]);
        setActivePopupImage(0);
      }}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.98 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="group w-full overflow-hidden rounded-[30px] border border-white/10 bg-white/10 text-right shadow-[0_30px_90px_rgba(0,0,0,0.22)] backdrop-blur-xl"
    >
      <div className="relative h-[520px] overflow-hidden sm:h-[620px]">
        <AnimatePresence mode="wait">
  <motion.img
    key={`${heroRentProperties[activeHeroProperty].id}-${activePopupImage}`}
    src={
      heroRentProperties[activeHeroProperty].images[
        activePopupImage %
          heroRentProperties[activeHeroProperty].images.length
      ]
    }
    alt={heroRentProperties[activeHeroProperty].title}
    className="absolute inset-0 h-full w-full object-cover"
    initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.04 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={shouldReduceMotion ? {} : { opacity: 0, scale: 1.02 }}
    transition={{ duration: 0.75, ease: "easeOut" }}
  />
</AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="absolute bottom-0 p-6 text-white">
          <h3 className="text-2xl font-bold">
            {heroRentProperties[activeHeroProperty].title}
          </h3>

          <p className="mt-1 text-sm opacity-80">
            {heroRentProperties[activeHeroProperty].area}
          </p>

          <p className="mt-3 text-lg font-semibold">
            {heroRentProperties[activeHeroProperty].price}
          </p>
        </div>
      </div>
    </motion.button>
  </AnimatePresence>

  <div className="mt-4 flex justify-center gap-2">
    {heroRentProperties.map((property, index) => (
  <button
    key={property.id}
        onClick={() => {
          setActiveHeroProperty(index);
          setActivePopupImage(0);
        }}
        className={`h-2.5 rounded-full transition-all ${
          index === activeHeroProperty
            ? "w-8 bg-[#d9873b]"
            : "w-2.5 bg-white/40"
        }`}
      />
    ))}
  </div>
</motion.div>
        </div>
      </section>

      <motion.section
        id="about"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24"
        {...revealUp}
      >
        <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-14">
          <div>
            <div className="text-sm font-medium uppercase tracking-[0.24em] text-[#d9873b]">
              About Brown Group
            </div>

            <h2 className="mt-4 text-5xl font-semibold leading-tight tracking-tight">
  קבוצת בראון גרופ
</h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-700 sm:mt-6 sm:text-lg sm:leading-8">
              Brown Group מתמחה בדירות, נכסי יוקרה, משרדים והשקעות בתל אביב, עם
              ליווי אישי, הבנה עמוקה של השוק המקומי ושירות מדויק שמחבר בין
              אנשים, נכסים והזדמנויות אמיתיות.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-700 sm:text-lg sm:leading-8">
              השילוב בין ניסיון תיווך, חשיבה אסטרטגית ושימוש בכלים חכמים מאפשר
              לנו לנהל תהליך איכותי יותר — משלב האיתור ועד סגירת העסקה.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            {[
              {
                title: "היכרות עמוקה עם תל אביב",
                text: "עבודה ממוקדת באזורים המבוקשים בעיר, עם הבנה אמיתית של השוק, המחירים וההזדמנויות.",
              },
              {
                title: "ליווי אישי ודיסקרטי",
                text: "תהליך מסודר, אישי ונעים יותר — עם יחס קרוב, שקיפות מלאה ושמירה על הסטנדרט הגבוה ביותר.",
              },
              {
                title: "התאמה מדויקת ללקוח",
                text: "התאמת נכסים לפי צורך, סגנון חיים, מטרת רכישה או השקעה — ולא רק לפי נתונים יבשים.",
              },
              {
                title: "חשיבה חכמה לכל עסקה",
                text: "שילוב בין ניסיון תיווך, ניתוח הזדמנויות וגישה מדויקת יותר לניהול משא ומתן וסגירת עסקאות.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="group rounded-[26px] border border-neutral-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#d9873b] hover:shadow-[0_20px_45px_rgba(15,23,42,0.10)] sm:rounded-[28px] sm:p-7"
              >
                <div className="mb-3 h-1.5 w-10 rounded-full bg-[#d9873b] opacity-70 transition-all duration-300 group-hover:w-16 sm:mb-4" />
                <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-neutral-600">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <div className="relative h-16 overflow-hidden bg-white">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d9873b]/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d9873b]/25 to-transparent" />
        <motion.div
          className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d9873b]/10 blur-2xl"
          animate={shouldReduceMotion ? undefined : { scale: [1, 1.08, 1] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.section
        id="ai"
        className="relative overflow-hidden bg-[#fffaf5] py-16 sm:py-24"
        {...revealUp}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[8%] top-[10%] h-40 w-40 rounded-full bg-[#d9873b]/10 blur-3xl" />
          <div className="absolute left-[10%] bottom-[10%] h-44 w-44 rounded-full bg-[#f1d0aa]/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="text-sm font-medium uppercase tracking-[0.24em] text-[#d9873b]">
              AI Solutions
            </div>

            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:mt-5 sm:text-4xl md:text-5xl">
              טכנולוגיה חכמה
              <br />
              שמעצימה את שירות התיווך.
            </h2>

            <p className="mt-5 text-base leading-7 text-neutral-700 sm:mt-6 sm:text-lg sm:leading-8">
              ב־Brown Group אנחנו רואים ב־AI כלי שמחדד את העבודה, משפר את חוויית
              הלקוח ומאפשר תהליך מהיר, מדויק ואפקטיבי יותר — משלב ההתעניינות ועד
              התאמת הנכס הנכון.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-6 md:grid-cols-2 xl:grid-cols-4">
            {aiBlocks.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className="group rounded-[26px] border border-[#f3e3d2] bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-[#d9873b] hover:shadow-[0_20px_45px_rgba(15,23,42,0.10)] sm:rounded-[30px] sm:p-7"
              >
                <div className="mb-4 flex items-center justify-between sm:mb-5">
                  <div className="rounded-full border border-[#f1d0aa] bg-[#fff6ee] px-3 py-1 text-xs font-medium text-[#b96b24]">
                    {item.name}
                  </div>
                  <div className="h-2.5 w-2.5 rounded-full bg-[#d9873b] opacity-70 transition-all duration-300 group-hover:scale-125" />
                </div>

                <p className="text-sm leading-7 text-neutral-700 sm:text-base sm:leading-8">
                  {item.text}
                </p>

                <div className="mt-5 h-1.5 w-10 rounded-full bg-[#d9873b] opacity-60 transition-all duration-300 group-hover:w-16 sm:mt-6" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-sm font-medium uppercase tracking-[0.25em] text-[#d9873b]">
            Why Brown Group
          </div>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:mt-5 sm:text-4xl md:text-5xl">
            למה לבחור ב־Brown Group
          </h2>

          <p className="mt-5 text-base leading-7 text-neutral-600 sm:mt-6 sm:text-lg sm:leading-8">
            שילוב של ניסיון, הבנה עמוקה של השוק המקומי ושירות אישי ברמה גבוהה,
            כדי להוביל כל עסקה בצורה מדויקת ונכונה.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-16 sm:gap-8 md:grid-cols-3">
          {[
            {
              icon: "🏙️",
              title: "התמחות בתל אביב",
              text: "הכרות עמוקה עם השוק המקומי, רחוב אחרי רחוב, שמאפשרת לנו למצוא את הנכסים הנכונים באמת.",
            },
            {
              icon: "🤝",
              title: "ליווי אישי מלא",
              text: "אנחנו מלווים אותך מהשלב הראשון ועד סגירת העסקה — עם שקיפות מלאה ויחס אישי.",
            },
            {
              icon: "💎",
              title: "נכסים איכותיים בלבד",
              text: "אנחנו עובדים רק עם נכסים שעברו סינון קפדני — כדי להביא לך את ההזדמנויות הטובות ביותר.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group rounded-[28px] border border-neutral-200 bg-white p-5 text-right shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:rounded-[32px] sm:p-8"
            >
              <div className="mb-4 text-3xl">{item.icon}</div>
              <h3 className="text-lg font-semibold sm:text-xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-neutral-600">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="listings" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="text-sm font-medium uppercase tracking-[0.24em] text-[#d9873b]">
              Featured Properties
            </div>

            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:mt-5 sm:text-4xl md:text-5xl">
              נכסים נבחרים
              <br />
              בסטנדרט של Brown Group
            </h2>

            <p className="mt-5 text-base leading-7 text-neutral-700 sm:mt-6 sm:text-lg sm:leading-8">
              מבחר נכסים נבחרים באמת — נכס מכירה מוביל לצד שתי השכרות יוקרתיות
              שמציגות את הסטנדרט, העיצוב והאיכות של Brown Group.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex w-fit items-center gap-3 rounded-2xl border border-neutral-300 bg-white px-6 py-3 text-sm font-medium text-neutral-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d9873b] hover:bg-[#fff8f1]"
          >
            <span>לתיאום שיחה על נכסים</span>
            <span>←</span>
          </a>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-14 sm:gap-7 md:grid-cols-3">
  {featuredProperties.map((property, index) => {
    const safeImages = propertyImagesMap[property.id] || [];
    const activeIndex = activeImages[property.id] || 0;
    const currentImage =
      safeImages.length > 0
        ? safeImages[activeIndex % safeImages.length]
        : null;
    const note = featuredImageNotes[property.id];
    const highlights = featuredHighlights[property.id] || [];

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
          delay: index * 0.08,
          ease: "easeOut",
        }}
        whileHover={{ y: -10, scale: 1.012 }}
        whileTap={{ scale: 0.988 }}
        className="group relative overflow-hidden rounded-[32px] border border-neutral-200 bg-white text-right shadow-[0_12px_32px_rgba(15,23,42,0.06)] transition-all duration-500 hover:border-[#d9873b]/70 hover:shadow-[0_30px_70px_rgba(15,23,42,0.16)]"
      >
        <div className="pointer-events-none absolute inset-0 rounded-[32px] ring-1 ring-transparent transition duration-500 group-hover:ring-[#d9873b]/20" />

        <div className="relative h-64 overflow-hidden bg-neutral-100 sm:h-72">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              src={currentImage || safeImages[0]}
              alt={property.title}
              className="absolute inset-0 h-full w-full object-cover"
              initial={
                shouldReduceMotion ? false : { opacity: 0, scale: 1.05 }
              }
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? {} : { opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/12 to-black/10" />

          <motion.div
            className="absolute -left-1/3 top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0"
            initial={{ x: "-120%", opacity: 0 }}
            whileHover={{ x: "260%", opacity: 1 }}
            transition={{ duration: 0.95, ease: "easeOut" }}
          />

          <div className="absolute right-5 top-5 rounded-full border border-white/30 bg-white/90 px-3 py-1 text-xs font-medium text-neutral-800 shadow-sm backdrop-blur-md">
            {property.tag}
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="text-sm font-medium text-white">
              {property.area}
            </div>
            {note && (
              <div className="mt-1 text-xs text-white/85">{note}</div>
            )}
          </div>

          {safeImages.length > 1 && !shouldReduceMotion && (
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

        <div className="p-5 sm:p-6">
          <div className="mb-3 flex items-center justify-between">
            <div className="inline-flex rounded-full border border-[#f1d0aa] bg-[#fff6ee] px-3 py-1 text-xs font-medium text-[#b96b24]">
              {property.type === "sale" ? "נכס למכירה" : "נכס להשכרה"}
            </div>

            <div className="text-xs text-neutral-400 transition duration-300 group-hover:text-neutral-600">
              Brown Group
            </div>
          </div>

          <h3 className="text-2xl font-semibold tracking-tight">
            {property.title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-neutral-500">
            {property.details}
          </p>

          <p className="mt-3 text-sm leading-6 text-neutral-600">
            {property.description}
          </p>

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

          <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-5">
            <span className="text-xl font-semibold tracking-tight transition duration-300 group-hover:text-black sm:text-2xl">
              {property.price}
            </span>

            <span className="rounded-2xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 transition-all duration-300 group-hover:border-[#d9873b] group-hover:bg-[#fff8f1] group-hover:text-black">
              לפרטים נוספים
            </span>
          </div>
        </div>
      </motion.button>
    );
  })}
</div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-3xl">
          <div className="text-sm font-medium uppercase tracking-[0.24em] text-[#d9873b]">
            Property Categories
          </div>

          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:mt-5 sm:text-4xl md:text-5xl">
            סוגי הנכסים
            <br />
            שאנחנו מתמחים בהם
          </h2>

          <p className="mt-5 text-base leading-7 text-neutral-700 sm:mt-6 sm:text-lg sm:leading-8">
            Brown Group פועלת במגוון תחומים בשוק הנדל״ן בתל אביב, עם התאמה
            מדויקת יותר לכל צורך — ממגורים ועד מסחר והשקעה.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-14 sm:gap-7 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              icon: "🏡",
              title: "דירות יוקרה",
              text: "נכסים ברמה גבוהה עם דגש על מיקום, עיצוב, מפרט ואיכות חיים בלב תל אביב ובאזורים המבוקשים ביותר בעיר.",
            },
            {
              icon: "🏢",
              title: "משרדים ומסחר",
              text: "חללים מסחריים ומשרדים במיקומים מרכזיים, המתאימים לעסקים שמחפשים נוכחות, נגישות וסביבת עבודה איכותית.",
            },
            {
              icon: "📈",
              title: "נכסי השקעה",
              text: "הזדמנויות נבחרות למשקיעים שמחפשים פוטנציאל תשואה, מיקום נכון ונכסים עם ערך אסטרטגי לטווח קצר וארוך.",
            },
            {
              icon: "🔑",
              title: "השכרות איכותיות",
              text: "דירות, משרדים ונכסים נבחרים להשכרה, עם התאמה אישית יותר ללקוחות שמחפשים פתרון מדויק ונכון בעיר.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group rounded-[28px] border border-neutral-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-[#d9873b] hover:shadow-[0_24px_55px_rgba(15,23,42,0.12)] sm:rounded-[32px] sm:p-7"
            >
              <div className="mb-4 text-3xl sm:mb-5">{item.icon}</div>
              <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-neutral-600">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-3xl">
          <div className="text-sm font-medium uppercase tracking-[0.24em] text-[#d9873b]">
            Areas of Expertise
          </div>

          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:mt-5 sm:text-4xl md:text-5xl">
            אזורי הפעילות שלנו
            <br />
            בתל אביב
          </h2>

          <p className="mt-5 text-base leading-7 text-neutral-700 sm:mt-6 sm:text-lg sm:leading-8">
            Brown Group פועלת באזורים המבוקשים והאיכותיים ביותר בתל אביב, עם
            היכרות עמוקה של השוק המקומי והתאמה מדויקת יותר לכל לקוח ולכל נכס.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-14 sm:gap-7 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              area: "צפון תל אביב",
              title: "מגורים ברמה גבוהה",
              text: "אזור מבוקש עם דירות יוקרה, רחובות שקטים, קרבה למוקדי חינוך איכותיים וסביבה שמתאימה למי שמחפש סטנדרט מגורים גבוה יותר.",
            },
            {
              area: "מרכז תל אביב",
              title: "לב העיר",
              text: "מיקום מושלם למי שמחפש קרבה לעסקים, תרבות, מסעדות וחיי עיר דינמיים, עם נכסים בעלי ערך גבוה ופוטנציאל השקעה מצוין.",
            },
            {
              area: "רמת אביב",
              title: "איכות חיים ויוקרה",
              text: "שכונה מבוקשת עם אווירה שקטה, קהל איכותי ונכסים שמתאימים למשפחות, משקיעים ורוכשים שמחפשים סביבת מגורים מוקפדת.",
            },
            {
              area: "נווה צדק",
              title: "אופי, סגנון וייחוד",
              text: "אחד האזורים האייקוניים בעיר, עם נכסים בעלי אופי ייחודי, ביקוש גבוה ושילוב מיוחד בין יוקרה, תרבות ומיקום מעולה.",
            },
          ].map((item) => (
            <div
              key={item.area}
              className="group rounded-[28px] border border-neutral-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-[#d9873b] hover:shadow-[0_24px_55px_rgba(15,23,42,0.12)] sm:rounded-[32px] sm:p-7"
            >
              <div className="mb-4 inline-flex rounded-full border border-[#f1d0aa] bg-[#fff6ee] px-3 py-1 text-xs font-medium text-[#b96b24] sm:mb-5">
                {item.area}
              </div>
              <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-neutral-600">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="bg-black py-16 text-white sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 md:items-start md:gap-12">
          <div className="max-w-2xl">
            <div className="text-sm font-medium uppercase tracking-[0.24em] text-[#d9873b]">
              Contact
            </div>

            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:mt-5 sm:text-4xl md:text-5xl">
              בואו נדבר על
              <br />
              הנכס הבא שלכם.
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
              בין אם אתם מחפשים דירה, נכס יוקרה, משרד או הזדמנות השקעה בתל
              אביב — Brown Group כאן כדי ללוות אתכם בגישה אישית, מדויקת
              ודיסקרטית יותר.
            </p>

            <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="text-sm text-[#d9873b]">שירות אישי</div>
                <div className="mt-2 text-base font-medium sm:text-lg">
                  ליווי צמוד לאורך כל הדרך
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="text-sm text-[#d9873b]">זמינות גבוהה</div>
                <div className="mt-2 text-base font-medium sm:text-lg">
                  מענה מהיר וברור לכל פנייה
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.24)] backdrop-blur sm:rounded-[32px] sm:p-6">
            <div className="mb-6">
              <div className="text-sm uppercase tracking-[0.2em] text-[#d9873b]">
                צור קשר
              </div>
              <div className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                השאירו פרטים ונחזור אליכם
              </div>
            </div>

            <div className="grid gap-4">
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3.5 text-white placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-[#d9873b] focus:bg-white/15"
                placeholder="שם מלא"
              />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3.5 text-white placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-[#d9873b] focus:bg-white/15"
                placeholder="טלפון"
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3.5 text-white placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-[#d9873b] focus:bg-white/15"
                placeholder="אימייל"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3.5 text-white placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-[#d9873b] focus:bg-white/15"
                placeholder="ספרו לנו איזה נכס אתם מחפשים"
              />

              <button
                type="button"
                onClick={handleWhatsAppSubmit}
                className="mt-2 inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-6 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:-translate-y-1 hover:bg-[#f5e6d6]"
              >
                <span>שליחה בוואטסאפ</span>
                <span>←</span>
              </button>
            </div>
          </div>
        </div>
      </section>

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

      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/55 px-3 py-4 backdrop-blur-sm md:items-center sm:px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedProperty(null)}
          >
            <motion.div
              className="relative my-4 w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/20 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.25)] sm:my-0 sm:max-h-[92vh] sm:rounded-[36px]"
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

              <div className="grid max-h-[85vh] overflow-y-auto md:max-h-[92vh] md:grid-cols-2">
                <div className="relative min-h-[280px] overflow-hidden bg-gradient-to-br from-neutral-100 via-[#f5ede6] to-[#ffe8cc] sm:min-h-[360px]">
                  {popupImages.length > 0 && (
                    <>
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={popupImages[activePopupImage % popupImages.length]}
                          src={popupImages[activePopupImage % popupImages.length]}
                          alt={selectedProperty.title}
                          className="absolute inset-0 h-full w-full object-cover"
                          initial={
                            shouldReduceMotion ? false : { opacity: 0, scale: 1.04 }
                          }
                          animate={{ opacity: 1, scale: 1 }}
                          exit={shouldReduceMotion ? {} : { opacity: 0, scale: 1.02 }}
                          transition={{ duration: 0.7, ease: "easeOut" }}
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

                  {(featuredHighlights[selectedProperty.id] || []).length > 0 && (
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {featuredHighlights[selectedProperty.id].map((item) => (
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
                        `היי Brown Group, אני מעוניין בנכס: ${selectedProperty.title}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-2xl bg-black px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-[#1a1a1a]"
                    >
                      שליחה בוואטסאפ
                    </a>

                    <Link
                      href={selectedProperty.href}
                      className="rounded-2xl border border-neutral-300 px-5 py-3 text-center text-sm font-medium text-neutral-800 transition hover:border-[#d9873b] hover:bg-[#fff8f1]"
                    >
                      מעבר לעמוד הנכס
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
<button
  type="button"
  onClick={scrollToTop}
  className="fixed bottom-24 right-4 z-[998] inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-black shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur transition hover:scale-[1.03] sm:hidden"
  aria-label="חזרה למעלה"
>
  ↑
</button>
      <div className="fixed bottom-4 left-4 z-[999] flex max-w-[calc(100vw-2rem)] flex-col gap-2 sm:bottom-5 sm:left-5 sm:gap-3">
        <button
          type="button"
          onClick={() => setIsChatOpen((prev) => !prev)}
          className="rounded-full bg-black px-4 py-3 text-xs font-medium text-white shadow-[0_18px_40px_rgba(0,0,0,0.25)] transition hover:scale-[1.02] sm:px-6 sm:py-4 sm:text-sm"
        >
          ✨ דברו עם יועץ AI
        </button>

        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-black px-4 py-3 text-center text-xs font-medium text-white shadow-[0_18px_40px_rgba(0,0,0,0.25)] transition hover:scale-[1.02] sm:px-6 sm:py-4 sm:text-sm"
        >
          דברו איתנו בוואטסאפ
        </a>
      </div>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 left-3 z-[1000] w-[calc(100vw-1.5rem)] max-w-[360px] overflow-hidden rounded-[24px] border border-neutral-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.18)] sm:bottom-28 sm:left-5 sm:w-[360px] sm:max-w-[calc(100vw-2rem)] sm:rounded-[30px]"
          >
            <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-4 sm:px-5">
              <div>
                <div className="text-sm font-semibold text-black">
                  Brown Group AI
                </div>
                <div className="text-xs text-neutral-500">
                  יועץ חכם לזיהוי צרכים והתאמת נכסים
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700 transition hover:bg-neutral-200"
              >
                סגור
              </button>
            </div>

            <div className="max-h-[50vh] space-y-3 overflow-y-auto bg-[#faf8f5] p-4 sm:max-h-[360px]">
              {chatMessages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${
                    message.role === "user" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                      message.role === "user"
                        ? "rounded-tr-md bg-white text-neutral-700"
                        : "rounded-tl-md bg-black text-white"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-neutral-100 p-4">
              <div className="flex items-center gap-3">
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      sendChatMessage();
                    }
                  }}
                  placeholder="כתבו הודעה..."
                  className="flex-1 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#d9873b]"
                />
                <button
                  type="button"
                  onClick={sendChatMessage}
                  className="rounded-2xl bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-[#1a1a1a]"
                >
                  שלח
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}